# eGovTrace — T007.2 Reconciliation Persistence Implementation Specification v1

**Status:** Proposed implementation boundary  
**Task:** T007.2 — Reconciliation persistence  
**Depends on:** T007 — Expected-vs-Observed Reconciliation Specification v1; T007.1 — Reconciliation Domain and Deterministic Matcher  
**Observed-event baseline:** T004 GovernmentEvent lifecycle  
**Control-path baseline:** T006 ExpectedControlPath implementation

## 1. Purpose

T007.2 makes the T007 reconciliation model durable in PostgreSQL without changing reconciliation semantics or introducing downstream detection behavior.

The persistence layer must store enough information to reproduce and inspect a reconciliation run, its exact control-path version, observation scope, applicability inputs, step-level results, candidate event references, selected matches, explanations, reason codes, and limitations.

Persistence is a storage boundary. It must not infer reconciliation results from missing rows, rewrite historical observations, or convert reconciliation states into findings.

## 2. In Scope

- PostgreSQL schema for reconciliation runs.
- PostgreSQL schema for step-level reconciliation results.
- Persistence of observation scope and caller-supplied applicability decisions.
- Persistence of candidate and selected GovernmentEvent identifiers.
- Persistence of match explanations and reason codes.
- Persistence of reconciliation algorithm version and execution timestamp.
- Persistence of exact ExpectedControlPath identity and version.
- Repository methods for create, retrieve, and list operations.
- Idempotent run creation.
- Optimistic concurrency only where mutable run metadata requires it.
- Historical immutability after a reconciliation run is finalized.
- Referential integrity to ExpectedControlPath and GovernmentEvent identities.
- Focused persistence and adversarial tests.
- Migration integration with the existing database migration mechanism.

## 3. Explicitly Out of Scope

- Reconciliation matching logic changes.
- Applicability evaluation.
- Reconciliation scheduling or orchestration.
- Government source connectors.
- Connector availability determination.
- Entity resolution.
- Identifier recovery.
- Anomaly detection.
- Risk scoring.
- Evidence assessment.
- Verification workflows.
- Accountability decisions.
- Findings or corruption classification.
- Public or internal UI.
- AI adjudication.
- Automatic retry behavior that changes reconciliation semantics.

## 4. Persistence Principles

### 4.1 Domain model remains authoritative

T007.2 persists the T007.1 domain model. It must not create a second reconciliation vocabulary with incompatible meanings.

### 4.2 Historical reproducibility

A stored reconciliation result must identify the exact control-path version and algorithm version used at execution time.

### 4.3 Observation references are references

The persistence layer stores GovernmentEvent IDs used by reconciliation. It must not copy mutable event payloads into reconciliation rows as if the copied payload were authoritative.

### 4.4 Missing rows are not absence

Failure to retrieve an event row must not be silently converted into `NOT_OBSERVED`.

### 4.5 Access failure is not observation absence

Authorization, connector, timeout, or infrastructure failures must remain distinguishable from legitimate empty observation scopes.

### 4.6 Finalized runs are immutable

Once a reconciliation run is marked finalized, its control-path identity, observation scope, applicability inputs, step results, selected candidates, and explanations must not be destructively rewritten.

## 5. Canonical Persistence Model

The implementation must persist at least these logical records.

### 5.1 reconciliation_run

Required fields:

```text
id
control_path_id
control_path_version
observation_scope
algorithm_version
executed_at
status
record_version
created_at
updated_at
idempotency_key
```

The stored `control_path_version` is intentionally denormalized for historical inspection, while `control_path_id` maintains referential identity.

Initial run status:

```text
CREATED
COMPLETED
FAILED
FINALIZED
```

`FAILED` describes execution/persistence failure and must never be interpreted as `NOT_OBSERVED`.

### 5.2 reconciliation_step_result

Required fields:

```text
id
reconciliation_run_id
step_key
status
selected_event_id
reason_codes
```

`selected_event_id` must be nullable. A multiple-match or unresolved result must not be forced into a single event reference.

### 5.3 reconciliation_step_candidate

Required fields:

```text
step_result_id
event_id
candidate_ordinal
```

Candidate order is diagnostic only. Persistence order must never determine semantic selection.

### 5.4 reconciliation_match_explanation

Required fields:

```text
step_result_id
event_id
matched_criteria
```

The criteria vocabulary must reuse T007.1:

```text
EVENT_TYPE
SUBJECT_IDENTITY
PROJECT_CONTEXT
SOURCE_IDENTITY
TEMPORAL_COMPATIBILITY
```

### 5.5 reconciliation_step_input

Required fields:

```text
reconciliation_run_id
step_key
applicability
```

Supported values:

```text
APPLICABLE
INAPPLICABLE
UNKNOWN
```

## 6. Observation Scope Storage

Observation scope must preserve all declared filters from T007.1:

```ts
interface ReconciliationObservationScope {
  readonly eventIds?: readonly DomainId<'GOVERNMENT_EVENT'>[];
  readonly validFrom?: string;
  readonly validTo?: string;
  readonly sourceSystems?: readonly string[];
  readonly classification?: GovernmentEvent['classification'];
}
```

JSONB storage is acceptable for the scope object provided that:

- timestamps are validated before persistence;
- event IDs use the repository's canonical identifier format;
- duplicate IDs are rejected or normalized deterministically;
- retrieval returns semantically equivalent data.

## 7. Referential Integrity

The schema should maintain foreign keys where the referenced entity is guaranteed to exist inside the same persistence boundary.

At minimum:

- reconciliation step result → reconciliation run;
- reconciliation candidate → reconciliation step result;
- reconciliation explanation → reconciliation step result;
- reconciliation selected event → GovernmentEvent where the existing table is available;
- reconciliation run → ExpectedControlPath where the existing table is available.

The implementation must not require a foreign key to an unavailable source-system record that is intentionally outside the eGovTrace database.

## 8. Idempotency

Run creation must accept an explicit idempotency key.

For a repeated request:

- the same idempotency key with the same canonical request representation returns the existing run;
- the same idempotency key with a different request representation fails with a dedicated conflict error;
- no duplicate run is created.

The canonical request hash must include every input that can materially change the persisted run identity or result context.

## 9. Immutability and Finalization

Runs may be mutable while `CREATED` or `FAILED` according to explicit repository operations.

A `FINALIZED` run is immutable.

Materially changing a finalized reconciliation result requires a new reconciliation run rather than an in-place update.

The implementation must prevent:

- replacing the control-path version of an existing run;
- changing the observation scope after finalization;
- changing applicability decisions after finalization;
- changing step statuses after finalization;
- changing selected candidates after finalization;
- deleting finalized reconciliation results.

## 10. Serialization Rules

The persistence boundary must preserve:

- enum/string-union values exactly;
- null vs omitted values where the domain distinguishes them;
- ordering of reason codes only where ordering is semantically documented;
- ordering of candidate IDs only as diagnostic order;
- ISO timestamps in a normalized representation;
- immutable run identity.

JSON serialization must not introduce hidden semantics by dropping `UNKNOWN`, null, or empty collections.

## 11. Availability and Error Semantics

T007.2 must distinguish at least:

```text
EMPTY_RESULT_SET
RECORD_NOT_FOUND
PERSISTENCE_ERROR
AUTHORIZATION_ERROR
CONNECTION_UNAVAILABLE
CONCURRENCY_CONFLICT
IDEMPOTENCY_CONFLICT
```

A repository error must remain an error. It must never be mapped automatically to reconciliation status `NOT_OBSERVED`, `UNAVAILABLE`, or `CONFLICTING_OBSERVATIONS` unless the caller explicitly supplies the corresponding domain state under the approved T007 contract.

## 12. Transaction Boundaries

Creating a reconciliation run and all of its child rows must occur atomically.

The transaction must either:

1. create the complete logical run; or
2. create no durable run state except explicitly designed failure/audit metadata.

Partial child-row persistence must not result in a run that appears complete.

Finalization must use a transactional concurrency check so two writers cannot finalize or mutate the same run inconsistently.

## 13. Query Requirements

The repository must support at least:

- get reconciliation run by ID;
- get reconciliation run by idempotency key;
- list runs by control-path ID and version;
- retrieve all step results for a run in deterministic step order;
- retrieve candidate event IDs per step result;
- retrieve match explanations per step result;
- retrieve caller-supplied applicability inputs.

Query ordering must be explicit and deterministic.

## 14. Migration Requirements

The migration should be the next numbered migration after the current T006 persistence migration.

The migration must:

- be safe to apply to an existing development database;
- use explicit constraints for lifecycle/status values;
- create required indexes for run lookup and child retrieval;
- preserve foreign-key integrity where available;
- avoid changing existing GovernmentEvent or ExpectedControlPath tables except where a reviewed foreign-key compatibility adjustment is required.

## 15. Test Requirements

### 15.1 Persistence round-trip

Persist a complete reconciliation result and retrieve an equivalent domain representation.

### 15.2 Idempotency

Repeat the same create request and verify exactly one durable run exists.

### 15.3 Idempotency conflict

Reuse an idempotency key with materially different input and verify a conflict.

### 15.4 Historical version

Persist a run against one control-path version and verify retrieval preserves that exact version even when a newer control-path version exists.

### 15.5 Multiple matches

Persist multiple candidate event IDs without forcing a selected event.

### 15.6 Finalization immutability

Finalize a run, attempt mutation, and verify the operation fails.

### 15.7 Transaction atomicity

Force a child-row persistence failure and verify no apparently complete run remains.

### 15.8 Error semantics

Verify persistence failures and authorization/availability failures do not become `NOT_OBSERVED`.

### 15.9 Deterministic ordering

Retrieve the same run repeatedly and verify equivalent ordering of steps, candidates, and explanations.

## 16. Adversarial Cases

The implementation must prove that:

- missing event rows are not interpreted as absent events;
- a null selected event is preserved;
- multiple candidates remain multiple candidates;
- unknown applicability remains `UNKNOWN`;
- finalized results cannot be rewritten;
- changing an older control-path version does not alter a stored run's identity;
- idempotency keys cannot be reused for different requests;
- persistence transaction failure cannot create misleading partial state;
- database row ordering does not silently become reconciliation semantics.

## 17. Implementation Boundary

T007.2 may introduce:

```text
packages/database/src/reconciliation.ts
migrations/004_reconciliation.sql
tests/reconciliation-persistence.test.mjs
```

It may extend existing database exports and test scripts as required.

It must not modify the T007.1 matcher semantics except for compatibility fixes that are independently justified and documented.

## 18. Exit Criteria

T007.2 is complete when:

1. PostgreSQL can persist a complete reconciliation run and all child result structures.
2. Retrieval reconstructs the same domain-level reconciliation semantics.
3. Idempotent creation is enforced.
4. Finalized runs are immutable.
5. Historical control-path version identity is preserved.
6. Transaction boundaries prevent misleading partial completion.
7. Persistence and adversarial tests pass.
8. No detection, findings, accountability, AI adjudication, or UI behavior has been introduced.
