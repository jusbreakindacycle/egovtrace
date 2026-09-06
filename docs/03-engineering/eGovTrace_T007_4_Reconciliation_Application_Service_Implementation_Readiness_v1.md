# eGovTrace T007.4 — Reconciliation Application Service Implementation Readiness v1

**Status:** Proposed engineering artifact  
**Task:** T007.4  
**Parent capability:** T007 Reconciliation  
**Depends on:** T007.1 Reconciliation Domain and Matcher; T007.2 Reconciliation Persistence; T007.3 Reconciliation Application Service; approved T007.3 implementation specification and implementation task

---

## 1. Purpose

T007.4 converts the approved T007.3 implementation contract into a final implementation-readiness boundary before application code is introduced.

The artifact removes unresolved ambiguity around module ownership, dependency direction, ports, error translation, observation handling, test seams, implementation order, and acceptance gates.

T007.4 does **not** introduce new reconciliation semantics.

---

## 2. Target Boundary

```text
Transport / future adapter
        |
        v
ReconciliationApplicationService
        |
        +--> ExpectedControlPathResolver
        +--> ReconciliationObservationProvider
        +--> ReconciliationRepositoryPort
        +--> T007.1 reconcile()
```

Responsibilities remain separated:

```text
T007.1  = reconciliation semantics
T007.2  = reconciliation persistence
T007.3  = application orchestration
T007.4  = implementation readiness / boundary control
```

---

## 3. Package Placement

Logical application boundary:

```text
packages/application/
  src/
    reconciliation/
      contracts.ts
      errors.ts
      ports.ts
      service.ts
      index.ts
```

The physical location may follow existing repository conventions, but the logical dependency direction must remain:

```text
application -> domain
application -> persistence interfaces
transport   -> application
persistence -X-> application
```

The application layer must not contain SQL, PostgreSQL client calls, HTTP framework code, connector-specific parsing, or source-record mutation.

---

## 4. Required Public Contracts

### Execute

```ts
interface ExecuteReconciliationCommand {
  readonly reconciliationRunId: DomainId;
  readonly controlPathId: DomainId;
  readonly controlPathVersion: number;
  readonly expectedSubject?: { readonly entityType: string; readonly id: string };
  readonly observationScope: ReconciliationObservationScope;
  readonly stepInputs: readonly ReconciliationStepInput[];
  readonly events?: readonly GovernmentEvent[];
  readonly algorithmVersion: string;
  readonly executedAt: string;
  readonly idempotencyKey: string;
  readonly authorizationContext?: ReconciliationAuthorizationContext;
}
```

### Finalize

```ts
interface FinalizeReconciliationCommand {
  readonly reconciliationRunId: string;
  readonly expectedRecordVersion: number;
  readonly authorizationContext?: ReconciliationAuthorizationContext;
}
```

### Queries

```ts
interface GetReconciliationQuery {
  readonly reconciliationRunId: string;
}

interface ListReconciliationsByControlPathQuery {
  readonly controlPathId: string;
  readonly controlPathVersion?: number;
}
```

---

## 5. Dependency Ports

### 5.1 Exact control-path resolver

```ts
interface ExpectedControlPathResolver {
  getExact(
    controlPathId: string,
    controlPathVersion: number,
  ): Promise<ExpectedControlPath | null>;
}
```

No implicit newest-version fallback is permitted.

### 5.2 Observation provider

```ts
interface ReconciliationObservationProvider {
  getObservations(
    request: ReconciliationObservationRequest,
  ): Promise<ReconciliationObservationResponse>;
}
```

The response must preserve the distinction:

```text
AVAILABLE + [] = observations were available and none were returned
UNAVAILABLE    = observations could not be reliably obtained
```

### 5.3 Persistence port

The service must depend only on the T007.2 repository boundary:

```ts
interface ReconciliationRepositoryPort {
  create(result: ReconciliationResult, idempotencyKey: string): Promise<ReconciliationPersistedRun>;
  get(reconciliationRunId: string): Promise<ReconciliationPersistedRun | null>;
  listByControlPath(controlPathId: string, controlPathVersion?: number): Promise<readonly ReconciliationPersistedRun[]>;
  finalize(reconciliationRunId: string, expectedRecordVersion: number): Promise<number>;
}
```

The application service must not bypass this contract with direct SQL.

---

## 6. Stable Error Boundary

```ts
type ReconciliationApplicationErrorCode =
  | 'INVALID_COMMAND'
  | 'CONTROL_PATH_NOT_FOUND'
  | 'CONTROL_PATH_VERSION_INVALID'
  | 'OBSERVATION_UNAVAILABLE'
  | 'RECONCILIATION_NOT_FOUND'
  | 'IDEMPOTENCY_CONFLICT'
  | 'CONCURRENCY_CONFLICT'
  | 'RECONCILIATION_IMMUTABLE'
  | 'DOMAIN_VALIDATION_FAILED'
  | 'PERSISTENCE_FAILURE'
  | 'AUTHORIZATION_CONTEXT_INVALID';
```

Translation must be deterministic and must preserve an internal cause for diagnostics without leaking secrets.

The service must never convert infrastructure failure into observation absence.

---

## 7. Execute Orchestration Contract

The implementation sequence is fixed:

```text
1. validate command
2. validate authorization context when present
3. resolve exact control-path identity/version
4. validate resolved path identity/version
5. use supplied events when present
6. otherwise request observations
7. stop on observation UNAVAILABLE
8. construct T007.1 ReconciliationRun input
9. invoke T007.1 reconcile() exactly once
10. pass the complete result to T007.2 repository
11. return the persisted representation
```

A supplied `events: []` must bypass the observation provider.

The service must not mutate input events or the T007.1 result.

---

## 8. Idempotency Boundary

T007.2 remains the final authority for idempotency conflict determination.

The service must:

- pass the caller's idempotency key unchanged;
- never silently generate a replacement key;
- never reinterpret an idempotency conflict as success;
- never create a second persisted run after a conflict is returned.

A preflight idempotency optimization is not part of T007.4 and must not introduce a second request-hash algorithm.

---

## 9. Applicability Boundary

The application layer accepts caller-supplied:

```text
APPLICABLE
INAPPLICABLE
UNKNOWN
```

It must not infer applicability from event absence, source availability, role, amount, project type, historical patterns, or AI output.

T007.1 remains the domain authority for how the supplied decision affects reconciliation results.

---

## 10. Finalization Boundary

Finalization is a thin state-transition orchestration:

```text
validate
  -> repository.finalize()
  -> translate error
  -> return new record version
```

No domain reconciliation occurs during finalization.

No result field is recalculated.

---

## 11. Query Boundary

Queries are read-only delegations.

The service must not:

- reconstruct missing child rows;
- derive statuses from candidate counts;
- invent unavailable observations;
- reorder results by semantic importance;
- modify historical values.

---

## 12. Semantic Invariants

The implementation must preserve:

- connection is not corruption;
- not observed is not absent;
- unavailable is not false;
- identifier recovery is not proof;
- payment instruction is not payment settlement;
- applicability remains explicit;
- multiple candidates remain multiple candidates;
- historical control-path versions remain immutable;
- persistence is semantically lossless;
- AI cannot alter reconciliation decisions.

---

## 13. Test Seams

All service behavior must be testable with injected doubles for:

```text
ExpectedControlPathResolver
ReconciliationObservationProvider
ReconciliationRepositoryPort
clock/time source, when used
```

Minimum tests:

1. exact path/version resolution;
2. path-not-found short-circuit;
3. invalid version rejection;
4. supplied observations bypass provider;
5. available empty observations continue to T007.1;
6. unavailable observations stop before T007.1;
7. T007.1 invocation count is exactly one for a fresh execution;
8. T007.1 result is passed through unchanged;
9. idempotency key is preserved exactly;
10. repository errors map to stable application errors;
11. finalization never invokes T007.1;
12. queries remain read-only;
13. malformed authorization context is rejected;
14. no forbidden detection/accountability behavior exists.

---

## 14. Adversarial Cases

The test suite must challenge:

```text
correct control-path id + wrong version
wrong control-path id + plausible version
nonexistent future version
supplied events = []
provider UNAVAILABLE
provider infrastructure exception
UNKNOWN applicability
multiple candidate events
conflicting source observations
idempotency conflict
stale record version
already finalized run
repository failure after domain execution
attempted AI-derived reconciliation status
mutation of returned objects
```

Tests must defend invariants rather than weakening them for implementation convenience.

---

## 15. Forbidden Shortcuts

The implementation must not:

- duplicate T007.1 matching logic;
- access PostgreSQL directly;
- select the newest control-path version silently;
- turn unavailable observations into an empty list;
- select one event from multiple candidates;
- infer applicability;
- add risk or corruption scoring;
- add AI to the decision path;
- mutate source-system records;
- mix transport/UI concerns into the application package;
- change T007.2 semantics to simplify orchestration;
- weaken tests to accommodate defects.

---

## 16. Implementation Order

```text
A. establish application package boundary
B. implement contracts
C. implement ports
D. implement typed application errors
E. implement validation
F. implement exact path resolution
G. implement observation selection
H. invoke T007.1
I. persist through T007.2 port
J. implement finalization
K. implement queries
L. add unit/service/adversarial tests
M. run repository CI
N. perform invariant review
```

Each stage should remain small enough that failures are diagnosable without unrelated refactoring.

---

## 17. Acceptance Gates

T007.3 implementation can be accepted only when:

- application package boundary is isolated;
- T007.1 owns reconciliation semantics;
- T007.2 owns persistence semantics;
- exact path/version identity is preserved;
- observation availability is preserved;
- applicability is preserved;
- multiple candidates remain multiple candidates;
- idempotency behavior is delegated correctly;
- finalization does not recalculate;
- queries are read-only;
- stable errors are covered;
- adversarial tests pass;
- repository CI is green;
- no unrelated package refactor is introduced.

---

## 18. Definition of Done

T007.4 is complete when this readiness artifact is merged and the implementation task can proceed without unresolved architecture inside the T007.3 boundary.

T007.4 itself contains no executable application-service implementation.
