# eGovTrace T007.3 — Reconciliation Application Service Implementation Specification v1

**Status:** Proposed implementation specification  
**Task:** T007.3 implementation  
**Parent capability:** T007 Reconciliation  
**Depends on:** T007.1 Reconciliation Domain and Matcher; T007.2 Reconciliation Persistence; T007.3 Reconciliation Application Service Specification  
**Target branch:** `t007-3-reconciliation-application-service-implementation`  

---

## 1. Purpose

This specification converts the approved T007.3 application-service design into an implementation-ready boundary.

The implementation MUST orchestrate existing capabilities and MUST NOT introduce new reconciliation semantics.

The implementation path is:

```text
caller
  ↓
ReconciliationApplicationService
  ↓
control-path resolver
  ↓
observation provider / supplied observations
  ↓
T007.1 reconcile()
  ↓
T007.2 ReconciliationRepository.create()
  ↓
persisted result
```

Finalization follows a separate state-transition path:

```text
caller
  ↓
ReconciliationApplicationService.finalize()
  ↓
ReconciliationRepository.finalize()
```

Queries follow a read-only path:

```text
caller
  ↓
ReconciliationApplicationService.get()/listByControlPath()
  ↓
ReconciliationRepository
```

The service owns orchestration, validation, dependency coordination, error translation, and audit-context propagation. It does not own domain truth or persistence semantics.

---

## 2. Implementation Boundary

### 2.1 Allowed responsibilities

The implementation may:

- validate service command shape;
- resolve an exact `ExpectedControlPath` identity/version;
- request or accept observations through an explicit provider boundary;
- distinguish unavailable observation retrieval from an empty observation set;
- assemble the T007.1 `ReconciliationMatcherInput`;
- invoke `reconcile()` exactly once per non-replayed execution;
- pass the complete T007.1 result to T007.2 persistence;
- propagate the caller idempotency key;
- translate infrastructure/domain errors into stable application errors;
- attach authorization/audit context without changing reconciliation meaning;
- perform finalization through the persistence repository;
- expose deterministic query results.

### 2.2 Forbidden responsibilities

The implementation MUST NOT:

- add matching criteria;
- modify `ReconciliationStatus` semantics;
- infer applicability;
- invent missing observations;
- downgrade unavailable observations to `NOT_OBSERVED`;
- recover identifiers silently;
- perform probabilistic entity resolution;
- score corruption or misconduct;
- produce legal findings;
- make accountability decisions;
- mutate source-system records;
- let AI alter reconciliation output;
- infer that a connection represents corruption.

---

## 3. Package Placement

The implementation belongs in the application layer, not the domain package and not the persistence package.

Recommended structure:

```text
packages/
  domain/
    src/reconciliation.ts
  database/
    src/reconciliation.ts
  application/
    src/reconciliation/
      service.ts
      contracts.ts
      errors.ts
      ports.ts
```

If the repository does not yet contain an `application` package, create the smallest package boundary required by the existing monorepo conventions. Do not refactor unrelated packages as part of T007.3.

The application package may import domain contracts and database interfaces through explicit package boundaries. The database package MUST NOT import the application package.

---

## 4. Required Interfaces

### 4.1 Control-path resolver port

```ts
export interface ExpectedControlPathResolver {
  getExact(
    controlPathId: string,
    controlPathVersion: number,
  ): Promise<ExpectedControlPath | null>;
}
```

Required behavior:

- exact identity and exact version lookup;
- no implicit latest-version fallback;
- `null` means the requested version cannot be resolved;
- resolver errors propagate as infrastructure failures rather than observation absence.

### 4.2 Observation provider port

```ts
export interface ReconciliationObservationProvider {
  getObservations(
    request: ReconciliationObservationRequest,
  ): Promise<ReconciliationObservationResponse>;
}
```

```ts
export interface ReconciliationObservationRequest {
  readonly observationScope: ReconciliationObservationScope;
  readonly expectedSubject?: {
    readonly entityType: string;
    readonly id: string;
  };
}
```

```ts
export type ReconciliationObservationResponse =
  | {
      readonly availability: 'AVAILABLE';
      readonly events: readonly GovernmentEvent[];
    }
  | {
      readonly availability: 'UNAVAILABLE';
      readonly reasonCode: string;
      readonly sourceSystem?: string;
    };
```

The provider MUST distinguish:

```text
AVAILABLE + []      = available observation scope with no returned events
UNAVAILABLE         = observation could not be reliably obtained
```

The service MUST NOT reinterpret either state.

### 4.3 Persistence port

The service depends on the existing T007.2 repository contract or a compatible application-facing adapter.

Required operations:

```ts
create(
  result: ReconciliationResult,
  idempotencyKey: string,
): Promise<ReconciliationPersistedRun>;

get(
  reconciliationRunId: string,
): Promise<ReconciliationPersistedRun | null>;

listByControlPath(
  controlPathId: string,
  controlPathVersion?: number,
): Promise<readonly ReconciliationPersistedRun[]>;

finalize(
  reconciliationRunId: string,
  expectedRecordVersion: number,
): Promise<number>;
```

The service MUST NOT bypass this boundary by issuing reconciliation SQL directly.

---

## 5. Command Contracts

### 5.1 Execute command

```ts
export interface ExecuteReconciliationCommand {
  readonly reconciliationRunId: DomainId;
  readonly controlPathId: DomainId;
  readonly controlPathVersion: number;
  readonly expectedSubject?: {
    readonly entityType: string;
    readonly id: string;
  };
  readonly observationScope: ReconciliationObservationScope;
  readonly stepInputs: readonly ReconciliationStepInput[];
  readonly events?: readonly GovernmentEvent[];
  readonly algorithmVersion: string;
  readonly executedAt: string;
  readonly idempotencyKey: string;
}
```

The `events` field is optional only because observations may come through the observation-provider port. It is not a second source of truth.

Implementation rule:

- when `events` is supplied, the service uses those events as the explicit observation input;
- when `events` is omitted, the service invokes the observation provider;
- an empty array is valid supplied observation data and MUST NOT trigger provider lookup;
- provider `UNAVAILABLE` MUST not be represented as `NOT_OBSERVED`.

### 5.2 Finalize command

```ts
export interface FinalizeReconciliationCommand {
  readonly reconciliationRunId: string;
  readonly expectedRecordVersion: number;
}
```

### 5.3 Get query

```ts
export interface GetReconciliationQuery {
  readonly reconciliationRunId: string;
}
```

### 5.4 List query

```ts
export interface ListReconciliationsByControlPathQuery {
  readonly controlPathId: string;
  readonly controlPathVersion?: number;
}
```

---

## 6. Result Contracts

The execute operation returns the persisted representation, not an independently reconstructed application result.

```ts
export interface ReconciliationApplicationResult {
  readonly run: ReconciliationPersistedRun;
}
```

Finalization returns:

```ts
export interface FinalizeReconciliationResult {
  readonly reconciliationRunId: string;
  readonly recordVersion: number;
  readonly finalized: true;
}
```

Queries return repository values without semantic rewriting.

---

## 7. Application Error Taxonomy

Define stable application-level error categories.

```ts
export type ReconciliationApplicationErrorCode =
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

Application errors should contain:

```ts
export interface ReconciliationApplicationErrorShape {
  readonly code: ReconciliationApplicationErrorCode;
  readonly message: string;
  readonly cause?: unknown;
  readonly retryable: boolean;
}
```

Rules:

- `INVALID_COMMAND` is not retryable;
- `CONTROL_PATH_NOT_FOUND` is not retryable until the caller changes the requested path/version;
- `CONTROL_PATH_VERSION_INVALID` is not retryable without caller correction;
- `OBSERVATION_UNAVAILABLE` may be retryable depending on the provider error;
- `IDEMPOTENCY_CONFLICT` is not retryable with the same key and changed request;
- `CONCURRENCY_CONFLICT` may be retried by re-reading state and making an explicit new command;
- immutable-run errors are not silently retried;
- infrastructure failures retain enough cause information for diagnostics but do not expose secrets.

---

## 8. Service Construction

Recommended constructor:

```ts
export interface ReconciliationApplicationDependencies {
  readonly controlPaths: ExpectedControlPathResolver;
  readonly observations: ReconciliationObservationProvider;
  readonly repository: ReconciliationRepositoryPort;
  readonly now?: () => string;
}
```

```ts
export class ReconciliationApplicationService {
  constructor(
    private readonly dependencies: ReconciliationApplicationDependencies,
  ) {}
}
```

The optional clock is permitted for test determinism. Production behavior should use an injected time source where the existing project architecture supports dependency injection.

No global mutable state is permitted.

---

## 9. Execute Orchestration Algorithm

The implementation SHALL follow this sequence.

### Step 1 — Validate command shape

Validate:

- run identifier exists;
- control-path identifier exists;
- control-path version is a positive integer;
- idempotency key is non-empty;
- algorithm version is non-empty;
- executed timestamp is ISO-parseable;
- applicability inputs have valid values;
- step keys are non-empty and unique;
- observation scope timestamps, when supplied, are ISO-parseable;
- expected subject has both type and id when supplied.

No repository write occurs before command-shape validation succeeds.

### Step 2 — Resolve exact control path

Call:

```ts
controlPaths.getExact(controlPathId, controlPathVersion)
```

If no path is returned:

```text
CONTROL_PATH_NOT_FOUND
```

No T007.1 call occurs.

No completed run is persisted.

### Step 3 — Validate path identity

The resolved path MUST satisfy:

```text
path.id === command.controlPathId
path.version === command.controlPathVersion
```

Any inconsistency is a `CONTROL_PATH_VERSION_INVALID` or domain validation failure. The implementation MUST NOT correct the version automatically.

### Step 4 — Resolve observations

Decision:

```text
command.events present?
    yes → use exact supplied event array
    no  → call observation provider
```

If provider returns `AVAILABLE`:

```text
continue with returned events, including []
```

If provider returns `UNAVAILABLE`:

```text
stop
return OBSERVATION_UNAVAILABLE
```

The service MUST NOT invoke T007.1 when observations are unavailable unless and until the T007.3 contract explicitly adds a defined unavailable-observation representation. The initial implementation does not invent one.

### Step 5 — Construct T007.1 input

Construct:

```ts
const run: ReconciliationRun = {
  id: command.reconciliationRunId,
  controlPathId: command.controlPathId,
  observationScope: command.observationScope,
  stepInputs: command.stepInputs,
  algorithmVersion: command.algorithmVersion,
  executedAt: command.executedAt,
};
```

Then:

```ts
const result = reconcile({
  path,
  expectedSubject: command.expectedSubject,
  events,
  run,
});
```

The service MUST NOT alter the returned `stepResults`.

### Step 6 — Persist through T007.2

Call:

```ts
repository.create(result, command.idempotencyKey)
```

The service does not reserialize, normalize, sort, collapse, or otherwise reinterpret the result before persistence.

### Step 7 — Return persisted representation

Return the repository result.

The returned state MUST be the durable representation so callers know whether the operation actually produced a persistent run.

---

## 10. Idempotency Flow

Idempotency is primarily enforced by T007.2 persistence, but T007.3 must preserve the contract.

### Same key, same request

Expected behavior:

```text
first call  → reconcile + persist
retry       → repository replay
result      → same reconciliation run
```

The service MUST NOT call T007.1 again when the repository can safely replay an existing result before domain work is needed.

Because the current T007.2 repository computes its idempotency hash from the reconciliation result, the implementation may need an application-level preflight lookup by idempotency key before domain execution to avoid repeating reconciliation work on retries. If such a preflight is not available in the repository port, document that limitation explicitly and do not invent a second hash algorithm.

The implementation MUST preserve T007.2 as the final authority for idempotency conflict determination.

### Same key, materially different request

Expected result:

```text
IDEMPOTENCY_CONFLICT
```

The service MUST NOT create a second run.

---

## 11. Observation Semantics

### Supplied empty observations

```ts
events: []
```

means the caller explicitly supplied an empty observation set.

The application service passes the empty list to T007.1. T007.1 may produce `NOT_OBSERVED` according to its existing semantics.

### Observation provider unavailable

```ts
{ availability: 'UNAVAILABLE', ... }
```

means the observation boundary could not reliably provide data.

The service reports an application error instead of fabricating `NOT_OBSERVED`.

### Provider failure

Unhandled provider infrastructure exceptions are mapped to an observation/infrastructure failure according to the provider contract. The original cause should remain available for internal diagnostics.

---

## 12. Applicability Semantics

The service accepts explicit applicability decisions exactly as supplied.

Allowed values:

```text
APPLICABLE
INAPPLICABLE
UNKNOWN
```

The service MUST NOT infer applicability from:

- event absence;
- path version;
- source-system availability;
- user role;
- project type;
- amount;
- AI output;
- historical patterns.

T007.1 remains responsible for applying the existing caller decision to step outcomes.

---

## 13. Finalization Implementation

Finalization is intentionally thin.

Algorithm:

1. Validate run identifier.
2. Validate expected record version is a positive integer.
3. Call `repository.finalize(runId, expectedRecordVersion)`.
4. Translate repository concurrency/immutability errors.
5. Return the new record version.

The service MUST NOT recalculate reconciliation during finalization.

Expected transitions:

```text
COMPLETED → FINALIZED
```

Other transitions are rejected by the persistence layer and surfaced by the service.

---

## 14. Query Implementation

### Get

```text
validate id
↓
repository.get(id)
↓
return result or RECONCILIATION_NOT_FOUND
```

The service MUST NOT reconstruct missing child records or infer omitted values.

### List by control path

```text
validate controlPathId
↓
validate optional version
↓
repository.listByControlPath(...)
↓
return deterministic repository ordering
```

Application code MUST NOT resort results by status, candidate count, or other reconciliation semantics.

---

## 15. Authorization Context Boundary

The service may accept an authorization context through an application-layer request wrapper.

Recommended shape:

```ts
export interface ReconciliationAuthorizationContext {
  readonly actorId: string;
  readonly actorType: string;
  readonly scopes: readonly string[];
  readonly requestId: string;
}
```

Authorization decisions themselves belong to the surrounding application/security policy layer unless explicitly provided by an existing repository policy.

The service MUST NOT infer authority from:

- ownership of an email address;
- source-system identifiers;
- project relationships;
- government role strings without policy evaluation;
- graph connections.

Authorization context may be recorded for auditability but must never be persisted into semantic reconciliation fields unless a documented schema field exists for it.

---

## 16. Audit Metadata

T007.3 should propagate technical audit metadata separately from reconciliation data.

Recommended internal envelope:

```ts
export interface ReconciliationAuditContext {
  readonly requestId: string;
  readonly actorId?: string;
  readonly actorType?: string;
  readonly sourceAdapter?: string;
  readonly correlationId?: string;
}
```

Requirements:

- audit metadata must not change reconciliation matching;
- audit metadata must not be used as candidate-event criteria;
- audit metadata must not be presented as evidence of government action;
- audit metadata must not imply legal responsibility.

Whether audit metadata is persisted at T007.3 or a later audit subsystem is a separate architectural decision. T007.3 should keep the interface boundary ready for it without inventing a schema.

---

## 17. Transaction Boundary

The service itself should not open a database transaction around the entire orchestration.

Reason:

- control-path resolution may be read-only;
- observation retrieval may call an external provider;
- external calls should not hold database transactions;
- T007.2 owns atomic persistence for the reconciliation result.

The intended boundaries are:

```text
Application orchestration
    ├── path read
    ├── observation read
    ├── domain compute
    └── persistence call
                     ↓
              T007.2 transaction
```

The application service MUST NOT hold a database client while waiting on an external observation provider.

---

## 18. Failure Atomicity

Failure before persistence means:

```text
no completed reconciliation run
```

Possible failure points:

```text
invalid command
path not found
observation unavailable
domain validation failure
persistence failure
```

Only T007.2 transactionally persists the final result.

The service MUST NOT create a partially completed run through a separate preliminary insert.

---

## 19. Retry Rules

### Retryable

A provider outage or transient infrastructure failure may be retried by the caller according to the provider's retry policy.

### Non-retryable without command correction

- invalid command;
- control path not found;
- invalid control-path version;
- idempotency conflict;
- immutable finalized run.

### Concurrency

A concurrency conflict requires state re-read and an explicit caller decision. The service MUST NOT silently use the latest record version.

---

## 20. Determinism Requirements

For the same:

- control-path id;
- control-path version;
- expected subject;
- observation scope;
- observation set;
- applicability decisions;
- algorithm version;
- execution timestamp;

T007.3 MUST produce the same T007.1 reconciliation semantics.

The application layer cannot introduce non-deterministic sorting, random selection, or heuristic event choice.

Logging order is irrelevant to domain semantics.

---

## 21. Versioning Requirements

### Control path

The command explicitly identifies `controlPathVersion`.

The service MUST persist the exact version returned by the resolved path.

### Algorithm

`algorithmVersion` is part of the reconciliation run metadata and MUST be passed unchanged into T007.1.

### Application service contract

Changes that alter command semantics require a new contract version or an explicit backward-compatible extension. Do not silently change interpretation of existing fields.

---

## 22. Dependency Injection and Testability

The service MUST be testable without a live PostgreSQL instance or external government connector.

Tests should provide fake implementations for:

- `ExpectedControlPathResolver`;
- `ReconciliationObservationProvider`;
- `ReconciliationRepositoryPort`;
- clock/time provider where used.

The T007.1 matcher remains the real deterministic domain function in application-service integration tests unless a dedicated seam is required for failure-path testing.

Do not mock domain semantics so heavily that orchestration tests become tautological.

---

## 23. Required Test Matrix

At minimum, implement tests covering:

### Command validation

- missing run ID;
- missing control-path ID;
- zero/negative control-path version;
- empty idempotency key;
- empty algorithm version;
- malformed executed timestamp;
- duplicate step input;
- invalid applicability value;
- malformed observation-scope timestamp.

### Control-path resolution

- exact version resolves;
- requested version missing;
- newer version exists but requested older version must still be used;
- resolver failure is not converted into `NOT_OBSERVED`.

### Observation input

- supplied events are used directly;
- supplied empty event array is preserved;
- provider is used when events are omitted;
- provider returns available observations;
- provider returns available empty set;
- provider returns unavailable;
- provider throws infrastructure error;
- provider is not called when explicit events are supplied.

### Domain invocation

- exact path, subject, events, run metadata, and applicability inputs reach `reconcile()`;
- no service-layer candidate selection occurs;
- multiple candidates survive unchanged;
- historical path version is preserved.

### Persistence

- complete result is passed to repository;
- idempotency key is propagated unchanged;
- persisted result is returned;
- repository idempotency replay is surfaced correctly;
- repository idempotency conflict is surfaced correctly;
- persistence failure is not reported as observation absence.

### Finalization

- successful completion becomes finalized;
- expected record version is required;
- stale version maps to concurrency error;
- already finalized run maps to immutable error;
- finalization never invokes domain reconciliation.

### Queries

- existing run returned;
- missing run maps to not found;
- list by path;
- list by exact path version;
- repository ordering preserved.

---

## 24. Adversarial Tests

The implementation is not complete without adversarial cases.

### Path substitution attack

Request version 2 while only version 3 is conveniently available.

Expected:

```text
FAIL
```

The service must not substitute version 3.

### Empty-observation ambiguity

Provide `events: []`.

Expected:

```text
continue to T007.1
```

Do not map to provider unavailable.

### Provider outage ambiguity

Provider returns `UNAVAILABLE`.

Expected:

```text
FAIL WITH OBSERVATION_UNAVAILABLE
```

Do not create `NOT_OBSERVED` results.

### Duplicate-event simplification

T007.1 returns multiple candidates.

Expected:

```text
persist all candidates
```

Do not select the first candidate.

### Historical-version mutation

A newer control path version appears after the run.

Expected:

```text
existing run still references original version
```

### Idempotency collision

Same key with materially different command.

Expected:

```text
IDEMPOTENCY_CONFLICT
```

No second completed run.

### Finalization race

Two callers finalize the same run using the same old record version.

Expected:

```text
one succeeds
one receives concurrency conflict
```

### AI contamination

Inject a fake downstream AI result claiming that an event is suspicious.

Expected:

```text
T007.3 result unchanged
```

AI must not cross the reconciliation decision boundary.

---

## 25. Observability

Log technical lifecycle events, not accusations.

Recommended events:

```text
reconciliation.execute.requested
reconciliation.control_path.resolved
reconciliation.observation.available
reconciliation.observation.unavailable
reconciliation.domain.completed
reconciliation.persistence.completed
reconciliation.persistence.failed
reconciliation.finalization.completed
reconciliation.finalization.conflict
```

Recommended fields:

- request ID;
- reconciliation run ID;
- control-path ID;
- control-path version;
- algorithm version;
- outcome category;
- duration;
- dependency name;
- error code where applicable.

Do not log secrets, credentials, access tokens, or unrestricted raw government payloads merely for debugging.

Do not introduce metrics such as `corruption_count` at this stage.

---

## 26. Security Requirements

The service MUST:

- avoid logging sensitive observation payloads unnecessarily;
- validate external identifiers before use;
- use parameterized persistence calls through the repository boundary;
- preserve least-privilege dependency access;
- avoid accepting arbitrary SQL from callers;
- avoid trusting caller-provided roles as proof of authorization;
- avoid exposing internal exception stacks through public adapters;
- preserve request correlation for audit diagnostics.

Security failures must never be converted into `NOT_OBSERVED`.

---

## 27. Data Semantics Preservation Checklist

Before a result is persisted, verify that the service has not changed:

- run ID;
- control-path ID;
- control-path version;
- observation scope;
- step applicability;
- expected subject;
- event candidates;
- selected event;
- match explanations;
- status;
- reason codes;
- algorithm version;
- execution timestamp.

A failing check should fail fast rather than silently repair data.

---

## 28. Prohibited Convenience Behaviors

The implementation MUST NOT add convenience behavior such as:

```text
missing path version → use latest
empty events → call connector again
unavailable provider → treat as empty
multiple events → choose first
unknown applicability → assume applicable
stale version → retry with latest version
persistence failure → return computed result as successful
AI suggestion → overwrite deterministic result
```

These behaviors would change semantics and violate the application boundary.

---

## 29. Integration with Existing T007.1

The application service consumes the existing `reconcile()` contract.

It MUST NOT duplicate any of these concerns:

- event-type matching;
- subject identity matching;
- project context matching;
- source identity conflict handling;
- temporal compatibility;
- status derivation.

A future improvement to matching belongs in T007.1 or its own task, not in T007.3.

---

## 30. Integration with Existing T007.2

The application service delegates persistence behavior to `ReconciliationRepository`.

It MUST NOT duplicate:

- database transaction management;
- child-row insertion;
- idempotency-key uniqueness;
- finalized-run immutability;
- record-version concurrency checks;
- retrieval ordering semantics.

A persistence defect should be fixed in T007.2, not worked around in T007.3.

---

## 31. Implementation Sequence

Implement in this order:

1. application contracts;
2. stable application errors;
3. resolver/observation/repository ports;
4. service constructor and dependency injection;
5. command validation;
6. exact control-path resolution;
7. observation acquisition boundary;
8. T007.1 orchestration;
9. T007.2 persistence orchestration;
10. finalization;
11. queries;
12. unit tests;
13. adversarial tests;
14. package exports;
15. typecheck/lint/test/build validation.

Do not implement HTTP, message consumers, UI, or mobile clients as part of this task.

---

## 32. Acceptance Criteria

T007.3 implementation is acceptable only when all conditions hold.

### AC-01 — Exact path version

The service executes against the exact requested control-path version and never substitutes a newer version.

### AC-02 — Explicit observation semantics

The service distinguishes supplied empty observations from unavailable observations.

### AC-03 — Domain ownership preserved

All reconciliation statuses and candidate decisions originate from T007.1.

### AC-04 — Persistence ownership preserved

All durable reconciliation state is created and finalized through T007.2.

### AC-05 — Idempotency preserved

The service correctly propagates and surfaces T007.2 idempotency behavior.

### AC-06 — Semantic losslessness

The persisted result returned by the service preserves all T007.1 result fields and run metadata.

### AC-07 — Finalization is separate

Finalization performs no recalculation.

### AC-08 — Failures are explicit

Unavailable observation, persistence errors, authorization failures, and concurrency failures remain distinguishable from `NOT_OBSERVED`.

### AC-09 — No detection semantics

No anomaly, risk, corruption, legal, or accountability logic is introduced.

### AC-10 — Tests are adversarial

The test suite demonstrates that the service refuses semantic shortcuts and dangerous defaults.

### AC-11 — No transport coupling

Core application-service tests do not require HTTP or UI infrastructure.

### AC-12 — Main branch safety

All implementation work occurs on the feature branch and is proposed through a pull request. No implementation file is written directly to `main`.

---

## 33. Review Checklist

Reviewers should verify:

- Does the service truly orchestrate rather than reimplement domain logic?
- Can any missing information be silently converted into absence?
- Can a newer control path replace the requested version?
- Can a multiple-match result be collapsed?
- Can unavailable observation become `NOT_OBSERVED`?
- Can a failed persistence operation still look successful?
- Can AI output alter reconciliation?
- Are finalization and reconciliation separate?
- Are application errors stable and distinguishable?
- Are tests checking failure semantics rather than only happy paths?
- Are database and external-provider transactions kept separate?
- Is all implementation isolated from `main` until review and merge?

---

## 34. Explicit Non-Goals

This implementation does not include:

- government API connectors;
- PhilGEPS/COA/DBM/SEC/DOF integration;
- OCR or document extraction;
- entity resolution;
- graph storage;
- anomaly detection;
- risk scoring;
- investigation workflows;
- evidence credibility scoring;
- accountability workflow;
- public dashboard;
- mobile application;
- AI agents;
- model evaluation;
- automated legal conclusions.

Those belong to later capabilities and MUST remain outside this change.

---

## 35. Handoff to Implementation

The next implementation task may create the application-layer contracts and service described here.

The implementation agent MUST:

1. read T007.1 and T007.2 contracts before editing code;
2. inspect the current repository package conventions;
3. preserve existing public interfaces unless a compatibility change is explicitly required;
4. implement only the stated T007.3 boundary;
5. add tests before declaring completion;
6. run typecheck, tests, lint, and build;
7. report any contradiction between this specification and the repository before changing semantics;
8. never weaken tests merely to make the build pass;
9. never write implementation code directly to `main`;
10. produce the complete PR package before opening the PR.

---

## 36. Decision Boundary Summary

```text
APPLICATION SERVICE
-------------------
Validate
Resolve exact version
Acquire observations
Carry applicability
Invoke matcher
Persist result
Translate errors
Finalize
Query

NOT APPLICATION SERVICE
-----------------------
Match differently
Infer truth
Declare absence
Resolve identities
Score risk
Assess evidence
Find corruption
Make legal decisions
Choose accountability
Let AI adjudicate
```

The T007.3 implementation is successful when this boundary remains narrow, explicit, deterministic, and auditable.