# eGovTrace T007.3 — Reconciliation Application Service Specification v1

**Status:** Proposed engineering specification  
**Task:** T007.3  
**Parent capability:** T007 Reconciliation  
**Depends on:** T007.1 Reconciliation Domain and Matcher; T007.2 Reconciliation Persistence  

---

## 1. Purpose

T007.3 defines the application-service boundary that orchestrates reconciliation without redefining reconciliation semantics.

The service is the controlled boundary between:

```text
caller input
    ↓
application validation
    ↓
expected control path retrieval
    ↓
observation retrieval / explicit observation input
    ↓
T007.1 deterministic reconciliation
    ↓
T007.2 durable persistence
    ↓
caller-visible reconciliation result
```

The service coordinates existing domain and persistence capabilities. It must not become a second matcher, a detection engine, an evidence assessor, or an accountability engine.

---

## 2. Architectural Position

```text
ExpectedControlPath
        │
        │ authoritative expected state
        ▼
ReconciliationApplicationService
        │
        ├── obtains applicable control-path version
        ├── accepts / obtains observation context
        ├── accepts caller applicability decisions
        ├── invokes deterministic domain reconciliation
        ├── persists complete result
        └── returns stable application result
        │
        ├───────────────┐
        ▼               ▼
GovernmentEvent     ReconciliationRepository
(observed state)    (durable result)
```

The application service does not own source-system truth. Source systems remain authoritative for their own records.

---

## 3. Scope

### 3.1 In scope

T007.3 shall define:

- application command and query contracts;
- service orchestration for one reconciliation run;
- control-path version selection;
- observation-input boundary;
- applicability-input boundary;
- invocation of T007.1 `reconcile`;
- persistence through T007.2 `ReconciliationRepository`;
- stable error classification;
- idempotency propagation;
- finalization orchestration;
- deterministic retrieval/query behavior;
- transaction boundary expectations;
- audit metadata requirements;
- validation and adversarial test requirements.

### 3.2 Explicitly out of scope

T007.3 shall not introduce:

- new matching criteria;
- probabilistic entity resolution;
- identifier recovery;
- connector-specific availability heuristics;
- anomaly detection;
- risk scoring;
- evidence credibility assessment;
- legal findings;
- corruption classification;
- accountability decisions;
- AI adjudication;
- public UI;
- agency replacement systems;
- source-record mutation.

---

## 4. Core Invariants

The application service MUST preserve the following semantics.

### 4.1 Connection is not corruption

A reconciliation result is an observation comparison. It is never by itself a corruption finding.

### 4.2 Not observed is not absent

The service must not convert an empty observation set into a claim that a real-world event did not occur.

### 4.3 Unavailable is not false

Source or retrieval failures must not be represented as `NOT_OBSERVED`.

### 4.4 Applicability is explicit

`APPLICABLE`, `INAPPLICABLE`, and `UNKNOWN` are caller-supplied inputs at this stage. The service must preserve them without inventing decisions.

### 4.5 Historical control-path version is immutable

A run is permanently associated with the exact control-path version used for reconciliation.

### 4.6 Multiple candidates remain multiple candidates

The service must not select a single event merely to simplify persistence or API output.

### 4.7 Persistence must be semantically lossless

The persisted result returned by the service must preserve status, candidates, selected event, match explanations, reason codes, scope, applicability, algorithm version, execution time, and control-path version.

### 4.8 Idempotency is request-level behavior

Retrying the same reconciliation command with the same idempotency key must safely replay the same persisted run. Reusing the key for a materially different request must fail.

### 4.9 AI is not part of the decision boundary

No AI output may modify a T007.3 reconciliation status, candidate set, selected event, applicability decision, or reason code.

---

## 5. Application Commands

### 5.1 Execute reconciliation

Conceptual command:

```ts
interface ExecuteReconciliationCommand {
  readonly reconciliationRunId: DomainId;
  readonly controlPathId: DomainId;
  readonly controlPathVersion: number;
  readonly expectedSubject?: {
    readonly entityType: string;
    readonly id: string;
  };
  readonly observationScope: ReconciliationObservationScope;
  readonly stepInputs: readonly ReconciliationStepInput[];
  readonly events: readonly GovernmentEvent[];
  readonly algorithmVersion: string;
  readonly executedAt: string;
  readonly idempotencyKey: string;
}
```

The command is a service-level contract. It may be represented differently by transport adapters later, but semantics must remain equivalent.

### 5.2 Finalize reconciliation

```ts
interface FinalizeReconciliationCommand {
  readonly reconciliationRunId: string;
  readonly expectedRecordVersion: number;
}
```

Finalization is a state transition only. It does not recalculate reconciliation.

### 5.3 Get reconciliation

```ts
interface GetReconciliationQuery {
  readonly reconciliationRunId: string;
}
```

### 5.4 List by control path

```ts
interface ListReconciliationsByControlPathQuery {
  readonly controlPathId: string;
  readonly controlPathVersion?: number;
}
```

Returned ordering must be deterministic and must never be interpreted as reconciliation semantics.

---

## 6. Control-Path Resolution

The application service must use an exact control-path identity and version.

Rules:

1. `controlPathId` is required.
2. `controlPathVersion` is required for execution.
3. The selected path must exist.
4. The selected path must be internally version-consistent.
5. The service must not silently substitute the newest path version.
6. A newer path version introduced after execution must not alter an existing run.

If the requested version cannot be resolved, execution fails before reconciliation and no completed run is persisted.

---

## 7. Observation Boundary

T007.3 accepts an already-defined observation set or an observation-provider abstraction.

The service must distinguish these states:

```text
OBSERVATIONS_RETURNED
OBSERVATIONS_EMPTY
OBSERVATIONS_UNAVAILABLE
OBSERVATIONS_INVALID
```

`OBSERVATIONS_EMPTY` may produce `NOT_OBSERVED` where T007.1 semantics require it.

`OBSERVATIONS_UNAVAILABLE` must not be converted into `NOT_OBSERVED`.

`OBSERVATIONS_INVALID` must fail the operation and must not create a semantically misleading completed result.

A future connector adapter may implement observation retrieval, but the adapter contract is outside T007.3.

---

## 8. Applicability Boundary

The service consumes applicability decisions supplied by the caller or an explicitly governed upstream component.

The service must not infer applicability from:

- missing events;
- missing source identifiers;
- a failed connector;
- event counts;
- AI output;
- historical frequency;
- a control-path default.

Missing applicability for a path step must remain a domain-level insufficiency according to T007.1 rather than being silently converted to `APPLICABLE`.

---

## 9. Domain Invocation

The service invokes T007.1 using the selected immutable path, execution run metadata, expected subject, and observation set.

Conceptually:

```ts
const result = reconcile({
  path,
  expectedSubject: command.expectedSubject,
  events: command.events,
  run,
});
```

T007.3 must not alter the resulting statuses after the domain function returns.

In particular, the service may not rewrite:

- `NOT_OBSERVED` → `UNAVAILABLE`;
- `MULTIPLE_MATCHES` → `MATCHED`;
- `INSUFFICIENT_INFORMATION` → `NOT_OBSERVED`;
- `CONFLICTING_OBSERVATIONS` → `MULTIPLE_MATCHES`;
- `INAPPLICABLE` → `NOT_OBSERVED`.

---

## 10. Persistence Invocation

A successful domain result must be persisted through `ReconciliationRepository.create(result, idempotencyKey)`.

The application service must not write reconciliation tables directly.

The persistence repository owns:

- child-record atomicity;
- idempotency-key uniqueness;
- request-hash comparison;
- finalized-run immutability;
- record-version concurrency control;
- deterministic reconstruction.

The application service owns orchestration and error translation, not persistence mechanics.

---

## 11. Idempotency Behavior

The service must propagate the caller's idempotency key unchanged to the persistence boundary.

Expected behavior:

```text
same key + materially same command
    → same persisted reconciliation run

same key + materially different command
    → idempotency conflict
```

Transport retries must not create duplicate completed runs.

A failed validation occurring before persistence does not consume an idempotency key.

A persistence failure must not be reported as a successful reconciliation result.

---

## 12. Finalization Behavior

Finalization is explicitly separate from execution.

```text
COMPLETED → FINALIZED
```

Required rules:

- caller supplies the expected `recordVersion`;
- repository enforces optimistic concurrency;
- only a `COMPLETED` run may be finalized;
- an already `FINALIZED` run is immutable;
- T007.3 must not expose any update path that edits finalized child records;
- finalization does not alter the reconciliation statuses themselves.

---

## 13. Error Model

Application-level error categories should be stable enough for transport adapters and tests.

Recommended categories:

```ts
type ReconciliationApplicationErrorCode =
  | 'INVALID_REQUEST'
  | 'CONTROL_PATH_NOT_FOUND'
  | 'CONTROL_PATH_VERSION_NOT_FOUND'
  | 'OBSERVATION_UNAVAILABLE'
  | 'OBSERVATION_INVALID'
  | 'IDEMPOTENCY_CONFLICT'
  | 'CONCURRENCY_CONFLICT'
  | 'FINALIZED_IMMUTABLE'
  | 'RECONCILIATION_NOT_FOUND'
  | 'PERSISTENCE_FAILURE';
```

Errors must retain causal information internally while transport adapters expose only approved stable codes and safe messages.

The service must never classify a generic database exception as `NOT_OBSERVED`.

---

## 14. Transaction Boundary

T007.3 expects one of two valid execution models:

### Model A — single persistence transaction

Domain reconciliation occurs first in memory, followed by one repository transaction that persists the complete result.

### Model B — explicit workflow transaction

If a future orchestration layer introduces additional durable steps, the application service must make commit boundaries explicit and preserve the invariant that a completed reconciliation run cannot expose incomplete child records.

T007.3 does not introduce distributed transactions.

---

## 15. Deterministic Result Contract

The service result must expose, at minimum:

- reconciliation run identifier;
- control-path identifier and version;
- execution metadata;
- observation scope;
- applicability inputs;
- algorithm version;
- run status;
- record version;
- step-level statuses;
- candidate event identifiers;
- selected event identifiers where present;
- match explanations;
- reason codes.

Ordering requirements:

- path steps follow control-path order at domain evaluation time;
- persisted retrieval may use deterministic database ordering;
- list queries must use stable ordering with explicit tie-breakers;
- ordering must never change status semantics.

---

## 16. Security and Authorization Boundary

T007.3 must assume authorization is required even though authorization policy itself is outside this task.

The service must support a future authorization context containing, at minimum:

```ts
interface ReconciliationAuthorizationContext {
  readonly actorId: string;
  readonly actorType: string;
  readonly purpose?: string;
  readonly scopes?: readonly string[];
}
```

Rules:

- authorization failures are not observation absence;
- unauthorized callers must not receive restricted source observations merely because reconciliation is being requested;
- audit metadata must identify the acting principal where the transport layer supplies it;
- no secret or credential material may be persisted into reconciliation reason codes or evidence fields.

---

## 17. Audit and Provenance Metadata

The application service must preserve enough metadata to answer:

> Who requested this reconciliation, against which control-path version, using which algorithm version, over which observation scope, and at what time?

Required execution metadata:

- run ID;
- control-path ID;
- control-path version;
- algorithm version;
- executed-at timestamp;
- idempotency key reference according to security policy;
- actor context where available.

The service must not fabricate source provenance for observations it did not retrieve or verify.

---

## 18. Concurrency Semantics

Execution itself is logically append-oriented: creating a new reconciliation run should not modify a prior run.

Concurrent finalization must be protected by optimistic concurrency.

Concurrent retries of the same idempotency key must converge on one persisted run.

Concurrent requests with distinct idempotency keys may create distinct runs and must not overwrite one another merely because they reference the same control path.

---

## 19. Testing Requirements

### 19.1 Happy paths

Test:

1. execute one complete reconciliation and persist it;
2. retrieve the persisted result without semantic loss;
3. execute the same command twice with the same idempotency key;
4. finalize a completed run;
5. list runs by control-path ID;
6. list runs by exact control-path version.

### 19.2 Adversarial cases

Test that:

- missing control-path version fails before domain invocation;
- empty observations remain distinguishable from unavailable observations;
- missing applicability is not auto-filled;
- multiple candidates remain multiple candidates;
- conflicting observations remain conflicts;
- finalized runs reject mutation;
- stale record versions reject finalization;
- idempotency-key reuse with a different request fails;
- persistence failure is not returned as successful reconciliation;
- database ordering cannot alter step semantics;
- a newer control-path version does not rewrite historical runs;
- unauthorized access is not transformed into source absence.

### 19.3 Contract tests

Application-service tests must verify the service calls the domain matcher with the exact caller-approved inputs and calls persistence only after a valid domain result is produced.

The tests must reject any implementation that duplicates matching logic inside the service.

---

## 20. Observability Requirements

At minimum, execution should emit structured telemetry for:

- reconciliation requested;
- control path resolved;
- domain reconciliation completed;
- persistence completed;
- idempotent replay;
- execution rejected;
- finalization succeeded;
- finalization conflicted;
- execution failed.

Telemetry must avoid leaking restricted event payloads or sensitive credentials.

Metrics may include counts by result status and error category, but metrics must not be described as corruption counts.

---

## 21. API Adapter Boundary

A future HTTP or message API may expose T007.3, but transport concerns must remain separate.

```text
HTTP / message adapter
        ↓
request DTO validation
        ↓
ReconciliationApplicationService
        ↓
Domain + Repository
```

HTTP status codes, authentication middleware, serialization format, pagination envelopes, and public API versioning are not defined by this task.

---

## 22. Failure Semantics

The failure matrix is normative.

| Condition | Service behavior | Reconciliation status |
|---|---|---|
| Invalid request | Reject | none |
| Path version missing | Reject | none |
| Observation retrieval unavailable | Fail | not a synthetic `NOT_OBSERVED` |
| Empty valid observation set | Continue | domain determines result |
| Missing applicability | Continue to domain | `INSUFFICIENT_INFORMATION` where defined |
| Multiple candidates | Persist | `MULTIPLE_MATCHES` |
| Source conflict | Persist | `CONFLICTING_OBSERVATIONS` |
| Idempotency replay | Return existing run | unchanged |
| Idempotency conflict | Reject | unchanged |
| Persistence failure before commit | Fail | no completed run |
| Finalization race | Reject stale request | unchanged |
| Finalized run mutation | Reject | unchanged |

---

## 23. Acceptance Criteria

T007.3 is complete when:

1. a single application service boundary exists for reconciliation execution;
2. it invokes the existing T007.1 matcher rather than duplicating matching logic;
3. it persists through the T007.2 repository rather than direct SQL;
4. exact control-path version identity is preserved;
5. applicability decisions remain explicit;
6. observation unavailable and observation empty remain distinct;
7. idempotency is preserved across retries;
8. finalized runs remain immutable;
9. concurrency failures are surfaced explicitly;
10. historical runs are stable across later control-path versions;
11. no detection, evidence, accountability, legal, corruption, or AI adjudication semantics are introduced;
12. automated tests cover normal, failure, and adversarial execution paths.

---

## 24. Implementation Order

The implementation should proceed in this order:

```text
1. Define application ports/interfaces
2. Define command/query DTOs
3. Define stable application error mapping
4. Implement execute orchestration
5. Implement finalize orchestration
6. Implement get/list queries
7. Add authorization-context plumbing without policy invention
8. Add service-level tests
9. Add adversarial tests
10. Run full repository validation
11. Review against this specification
```

No step may silently expand scope.

---

## 25. Non-Goals That Must Remain Explicit

T007.3 is not:

- a corruption detector;
- a government data lake;
- an ETL replacement;
- a connector marketplace;
- an AI investigation agent;
- a public accountability verdict engine;
- a legal findings engine.

It is an application orchestration boundary for a deterministic reconciliation capability backed by durable, version-aware persistence.
