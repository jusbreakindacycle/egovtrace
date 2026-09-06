# eGovTrace — T007 Reconciliation Specification v1

**Status:** Proposed engineering specification for review  
**Task:** T007 — Expected-vs-Observed Reconciliation  
**Depends on:** T004 — GovernmentEvent lifecycle; T005 — ExpectedControlPath specification; T006 — ExpectedControlPath implementation  
**Architecture boundary:** CONTROL PATHS → RECONCILIATION  

---

## 1. Purpose

T007 defines the bounded reconciliation capability that compares an `ExpectedControlPath` with observed `GovernmentEvent` records.

The purpose is not to decide whether misconduct occurred. The purpose is to produce a deterministic, evidence-backed account of how the observed event record relates to the expected control path.

The core question becomes:

> Given an applicable expected control path, what expected steps have corresponding observations, what steps have no sufficient observation, what observations cannot be matched, and what information remains unavailable or ambiguous?

T007 must preserve the eGovTrace semantic boundary:

```text
ExpectedControlPath = what the system expects
GovernmentEvent     = what the system observed/reported
Reconciliation      = structured comparison of the two
Detection           = later signal generation from governed reconciliation results
Finding             = later human-verified or otherwise governed determination
```

A reconciliation result is not a finding, legal conclusion, corruption allegation, or proof of wrongdoing.

---

## 2. Repository-Grounded Baseline

The implementation must build on the artifacts already merged to `main`.

Relevant baseline contracts:

1. `packages/domain/src/index.ts` provides shared domain primitives, including `GovernmentEvent`, `GovernmentEventType`, `Evidence`, `ProvenanceReference`, `TemporalValidity`, and `AssertionKind`.
2. T004 defines the observed-event model and event lifecycle semantics.
3. T005 defines the `ExpectedControlPath` model and keeps expected requirements separate from observed records.
4. T006 implements validated, versioned persistence for expected control paths and their steps, constraints, event mappings, evidence expectations, responsibilities, timing, independence, and provenance.
5. Existing frozen rules include:
   - `CONNECTION IS NOT CORRUPTION`
   - `NOT OBSERVED != ABSENT`
   - `UNAVAILABLE != FALSE`
   - `AI OUTPUT != FACT OR LEGAL DETERMINATION`
   - material derivations require provenance
   - source systems remain authoritative

T007 must not redesign these foundations.

---

## 3. Scope

### 3.1 In scope

T007 may implement:

- a deterministic reconciliation domain model;
- explicit step-level and observation-level reconciliation statuses;
- selection of an applicable expected control-path version from already-persisted definitions;
- candidate matching between expected steps and GovernmentEvents using explicit typed criteria;
- one-to-one, one-to-many, and unmatched candidate semantics where explicitly defined;
- temporal-validity checks required to determine whether a path and event may participate in the same reconciliation;
- handling of unavailable or incomplete source observations without converting them into absence;
- recording of ambiguous matches rather than silently choosing one;
- provenance for reconciliation assertions and derivations;
- persistence of reconciliation runs/results and their source references;
- deterministic validation and idempotency for reconciliation execution;
- focused tests, including adversarial cases;
- documentation required for implementation and review.

### 3.2 Explicitly out of scope

T007 must not implement:

- anomaly or risk scoring;
- fraud detection;
- corruption classification;
- legal interpretation;
- automated findings;
- accountability assignment or disciplinary decisions;
- case management;
- public dashboard behavior;
- production agency connectors;
- broad entity-resolution systems;
- probabilistic identity inference;
- AI-based automatic adjudication;
- graph traversal or graph analytics;
- automatic rewriting of ExpectedControlPath definitions;
- automatic invention of missing control steps;
- automatic declaration that an event was absent because a source row was not found;
- automatic declaration that an unavailable source proves non-occurrence.

---

## 4. Core Semantics

### 4.1 Reconciliation is an assertion layer

A reconciliation result is a structured assertion about the relationship between an expected step and observed records.

It must preserve enough source references and provenance to reproduce why the assertion was produced.

### 4.2 Observation and expectation remain separate

The reconciliation engine may reference both objects, but must never mutate an expected path to reflect observations and must never rewrite an observed GovernmentEvent to make it fit the expected path.

### 4.3 Not observed is not absent

The absence of a matching GovernmentEvent in the queried observation set means only that no sufficient observation was found in the participating evidence scope.

It does not establish that the real-world action did not occur.

### 4.4 Unavailable is not false

If a required source cannot be accessed, a required record is unavailable, or the observation scope is explicitly incomplete, reconciliation must preserve that limitation rather than emit a failure claim that treats unavailability as non-occurrence.

### 4.5 Matching is not identity proof

A successful match based on stable identifiers is stronger than a fuzzy or recovered identifier relationship. Identifier recovery may create a candidate relationship but cannot by itself upgrade the relationship into proof of identity.

### 4.6 Payment distinctions remain intact

`PAYMENT_OBLIGATED`, `PAYMENT_DISBURSED`, and `PAYMENT_SETTLED` are different event types and cannot be collapsed into one generic “payment occurred” state.

### 4.7 Connection is not corruption

A matched contractor, person, institution, office, or event does not imply wrongdoing.

---

## 5. Reconciliation Unit

The canonical unit of comparison is:

```text
ExpectedControlPath version
        +
Applicable ExpectedControlStep
        +
Observation scope
        +
Observed GovernmentEvent candidates
        =
Step reconciliation result
```

A complete reconciliation run consists of one selected path version, one defined observation scope, and the deterministic set of step-level reconciliation results plus unmatched observations.

---

## 6. Reconciliation Run

A reconciliation run represents one reproducible execution of the comparison process.

Recommended shape:

```ts
interface ReconciliationRun {
  readonly id: DomainId;
  readonly expectedControlPathId: DomainId;
  readonly observationScope: ObservationScope;
  readonly startedAt: string;
  readonly completedAt?: string;
  readonly status: ReconciliationRunStatus;
  readonly resultCount: number;
  readonly provenance: readonly ProvenanceReference[];
  readonly metadata: Readonly<Record<string, unknown>>;
}
```

Supported run statuses:

```text
STARTED
COMPLETED
COMPLETED_WITH_LIMITATIONS
FAILED
```

`COMPLETED_WITH_LIMITATIONS` is required when the run finishes but known source limitations prevent a fully conclusive observation comparison.

A failed run must not be represented as a completed absence assessment.

---

## 7. Observation Scope

The observation scope must be explicit and persisted with the run.

Minimum concepts:

```ts
interface ObservationScope {
  readonly sourceIds?: readonly string[];
  readonly sourceClasses?: readonly string[];
  readonly eventTypes?: readonly GovernmentEventType[];
  readonly validFrom?: string;
  readonly validTo?: string;
  readonly projectId?: DomainId<'PROJECT'>;
  readonly institutionId?: DomainId<'INSTITUTION'>;
  readonly officeId?: DomainId<'OFFICE'>;
}
```

Additional dimensions may be introduced only when grounded in existing repository data and reviewed architecture.

The scope must distinguish:

```text
scope intentionally bounded
scope complete for declared source
scope incomplete / partially unavailable
scope unknown
```

No hidden default source scope is permitted.

---

## 8. Step Reconciliation Result

Recommended shape:

```ts
interface ReconciliationStepResult {
  readonly id: DomainId;
  readonly reconciliationRunId: DomainId;
  readonly stepKey: string;
  readonly result: ReconciliationResultStatus;
  readonly candidateEventIds: readonly DomainId[];
  readonly selectedEventIds: readonly DomainId[];
  readonly unmatchedReason?: UnmatchedReason;
  readonly matchingBasis: readonly MatchingBasis[];
  readonly evidenceReferences: readonly DomainId[];
  readonly limitations: readonly ReconciliationLimitation[];
  readonly provenance: readonly ProvenanceReference[];
}
```

The selected and candidate arrays serve different purposes:

- `candidateEventIds` preserve all events that satisfied the deterministic candidate criteria;
- `selectedEventIds` contain only events that may be asserted as the governing match under the permitted cardinality rules;
- when ambiguity prevents selection, candidate events remain recorded and `selectedEventIds` may remain empty.

---

## 9. Result Status Vocabulary

T007 must support the following explicit statuses:

```text
MATCHED
MULTIPLE_MATCHES
NOT_OBSERVED
UNAVAILABLE
OUT_OF_SCOPE
INAPPLICABLE
INSUFFICIENT_INFORMATION
CONFLICTING_OBSERVATIONS
```

Semantics:

### `MATCHED`

A deterministic match exists and satisfies the declared matching contract.

### `MULTIPLE_MATCHES`

More than one candidate satisfies the permitted criteria and the system cannot uniquely select one without unsupported inference.

### `NOT_OBSERVED`

No sufficient matching observation was found within the participating observation scope, and the scope was sufficient to state only that no observation was found.

This does not mean the event is proven absent in reality.

### `UNAVAILABLE`

A required source, record, field, or observation surface was unavailable such that reconciliation cannot determine the expected step's observational state.

### `OUT_OF_SCOPE`

The step or candidate observation is outside the explicitly declared reconciliation scope.

### `INAPPLICABLE`

The ExpectedControlStep's declared applicability conditions determine that the step does not apply to this subject/path instance. Applicability evaluation must remain deterministic and based only on explicitly supported attributes.

### `INSUFFICIENT_INFORMATION`

The available data is present but lacks required attributes or certainty for a governed match.

### `CONFLICTING_OBSERVATIONS`

Two or more authoritative or otherwise participating observations conflict in a way that the reconciliation layer is not permitted to adjudicate.

---

## 10. Matching Contract

T007 must use explicit matching rules rather than broad similarity heuristics.

### 10.1 Match dimensions

The initial V1 contract may use:

```text
EXPECTED EVENT TYPE
SUBJECT ID
PROJECT ID
CONTRACT ID
PAYMENT ID
SOURCE IDENTITY
TEMPORAL COMPATIBILITY
```

Only dimensions actually available on the participating GovernmentEvent record may be used.

### 10.2 Match strength

The engine must classify matching basis explicitly.

Recommended values:

```text
EXACT_STABLE_IDENTIFIER
EXACT_SOURCE_IDENTITY
DECLARED_RELATIONSHIP
TEMPORAL_AND_SUBJECT_MATCH
RECOVERED_IDENTIFIER_CANDIDATE
```

`RECOVERED_IDENTIFIER_CANDIDATE` may support candidate generation but must not alone produce a final `MATCHED` result when identity proof is required.

### 10.3 No fuzzy finalization

Name similarity, address similarity, free-text similarity, or AI-generated similarity scores must not silently produce a final governed match in T007.

Such signals may be preserved later as non-authoritative candidate assistance, but that is a separate approved capability.

---

## 11. Cardinality Rules

T007 must make match cardinality explicit.

Supported relationships:

```text
ZERO → NOT_OBSERVED / UNAVAILABLE / INSUFFICIENT_INFORMATION
ONE  → MATCHED
MANY → MULTIPLE_MATCHES or a permitted one-to-many result
```

A many-to-one or one-to-many relationship may be allowed only when the ExpectedControlPath step semantics explicitly permit it and the implementation contract defines the aggregation behavior.

Absent a defined cardinality rule, ambiguity must be preserved rather than resolved automatically.

---

## 12. Event-Type Compatibility

A step can only be reconciled against a GovernmentEvent whose `eventType` appears in the step's `expectedEventTypes`.

The engine must never infer compatibility from free-form descriptions.

Examples:

```text
PAYMENT_OBLIGATED != PAYMENT_DISBURSED
PAYMENT_DISBURSED != PAYMENT_SETTLED
IMPLEMENTATION_REPORTED != VERIFICATION_RECORDED
PROCUREMENT_POSTED != CONTRACT_AWARDED
```

A later detection layer may reason about combinations of these events, but T007 must preserve the exact event vocabulary.

---

## 13. Temporal Compatibility

Reconciliation may use temporal validity and event timestamps only through explicit rules.

At minimum:

1. the selected ExpectedControlPath version must be valid for the reconciliation subject/time context;
2. an event outside the declared temporal participation window must not be treated as an ordinary match;
3. timing expectations stored on the step may be surfaced as structured constraints but are not themselves a detection finding in T007;
4. missing timestamps must result in `INSUFFICIENT_INFORMATION` or another appropriate governed status rather than fabricated timing.

T007 does not invent deadlines from prose.

---

## 14. Applicability Handling

T007 may evaluate only the declarative applicability constructs defined by T006.

Supported initial operators remain:

```text
EQUALS
NOT_EQUALS
IN
NOT_IN
PRESENT
ABSENT
```

Applicability evaluation must be deterministic.

Unknown fields, unsupported operators, or missing required evaluation attributes must not be silently treated as false.

Possible outcome:

```text
applicability unknown
        ↓
INSUFFICIENT_INFORMATION
```

unless the contract explicitly supports a different state.

---

## 15. Dependencies and Path Context

Reconciliation must preserve the ExpectedControlPath dependency graph but must not reinterpret it.

For each step, the result may include the statuses of referenced predecessor steps as contextual data.

Dependency semantics:

- `REQUIRED_PREDECESSOR` means predecessor status may be relevant when interpreting the current step;
- `OPTIONAL_PREDECESSOR` does not make the current step failed merely because the predecessor is not matched;
- `ALTERNATIVE_PREDECESSOR` must remain part of the declared alternative structure.

T007 must not convert dependency breaks directly into anomalies or findings.

---

## 16. Unmatched Observations

A complete reconciliation run must preserve GovernmentEvents that were in the observation scope but did not match any expected step.

Recommended shape:

```ts
interface UnmatchedObservation {
  readonly reconciliationRunId: DomainId;
  readonly governmentEventId: DomainId;
  readonly reason: UnmatchedObservationReason;
  readonly provenance: readonly ProvenanceReference[];
}
```

Supported reasons may include:

```text
NO_EXPECTED_STEP_MAPPING
OUTSIDE_EXPECTED_PATH
INCOMPATIBLE_EVENT_TYPE
AMBIGUOUS_CONTEXT
CONFLICTING_CONTEXT
```

An unmatched observation is not an improper action by itself. Extra events may be legitimate, optional, parallel, or simply outside the chosen path definition.

---

## 17. Evidence Handling

Reconciliation may reference `Evidence` already stored in the repository, but it must not create proof merely by matching an event.

Where a step has evidence expectations:

1. the engine may inspect the explicitly participating evidence set;
2. evidence availability must be distinguished from evidence sufficiency;
3. evidence records must retain their own provenance and assertion kind;
4. evidence belonging to one assertion must not silently become evidence for another unrelated assertion;
5. missing evidence must not be represented as proof of non-occurrence.

A later verification layer may adjudicate evidence quality or sufficiency.

---

## 18. Provenance Requirements

Every persisted reconciliation run and result must preserve enough provenance to answer:

```text
Which path version was used?
Which observation scope was used?
Which GovernmentEvents were considered?
Which matching rule produced the result?
Which evidence references participated?
Which limitations were known?
When was the reconciliation produced?
```

Reconciliation provenance must identify whether an assertion was:

```text
SOURCE_OBSERVATION
NORMALIZATION
DERIVATION
HUMAN_ADJUDICATION
AI_ASSISTANCE
SYNTHETIC_FIXTURE
```

AI assistance may help surface candidate information in future implementations but cannot transform itself into a fact or legal determination.

---

## 19. Determinism

Given the same:

- ExpectedControlPath version;
- GovernmentEvent set;
- observation scope;
- evidence set;
- matching rules; and
- implementation version,

the same reconciliation result must be produced.

Results must not depend on:

- database row order;
- network timing;
- random selection;
- AI model output;
- unstable iteration ordering;
- wall-clock time except where the run timestamp itself is recorded.

Stable sort order must be specified wherever multiple records are returned.

---

## 20. Idempotency and Reproducibility

Executing the same reconciliation request with the same logical input identity should not create duplicate semantic runs unless an explicit re-run operation is requested.

A reconciliation request identity should include enough information to distinguish materially different executions, including at least:

```text
expectedControlPathId
observation scope
matching contract version
subject context
```

The implementation should support an idempotency key or equivalent deterministic request fingerprint.

A repeated request with the same identity and unchanged relevant inputs may return the existing run.

A repeated idempotency key with materially different inputs must fail with an explicit conflict.

---

## 21. Historical Integrity

A reconciliation result must point to the exact ExpectedControlPath version used.

Later publication of a new control-path version must not rewrite historical reconciliation results.

Historical GovernmentEvent versions must likewise remain reconstructable according to T004 semantics.

The engine must never reinterpret an old reconciliation merely because a new path version became active.

A new path version means a new reconciliation context.

---

## 22. Source Authority

eGovTrace is not the source of record for underlying government transactions merely because it has reconciled them.

Source authority rules remain:

```text
source record → authoritative source record
reconciliation → structured interpretation of participating observations
```

If two source systems disagree, T007 must preserve the disagreement as structured conflicting observations rather than choosing a winner without an explicit authority rule.

---

## 23. Limitations Model

Reconciliation must preserve limitations as first-class data.

Recommended values:

```text
SOURCE_UNAVAILABLE
SOURCE_PARTIAL
MISSING_IDENTIFIER
MISSING_TIMESTAMP
MISSING_SUBJECT
AMBIGUOUS_IDENTIFIER
CONFLICTING_SOURCE_RECORDS
INSUFFICIENT_EVENT_FIELDS
OUTSIDE_TIME_WINDOW
```

Limitations must be additive and provenance-linked.

A limitation does not automatically downgrade every result in a run; it affects only the step or observation claims to which it applies.

---

## 24. Security and Access Boundary

T007 must not broaden data access merely to improve matching.

The implementation must follow repository security rules and source-specific access boundaries.

A reconciliation service may only consider observations it is authorized to access.

Authorization failure must not be translated into `NOT_OBSERVED`.

The correct semantic result is `UNAVAILABLE` or an equivalent explicit limitation state.

---

## 25. Testing Requirements

T007 implementation must include at minimum:

### Domain tests

- exact event-type match;
- incompatible event-type rejection;
- stable identifier match;
- candidate-only recovered identifier behavior;
- multiple candidates remain ambiguous;
- not-observed versus unavailable distinction;
- applicability outcomes;
- temporal incompatibility;
- conflicting observations;
- unmatched observations;
- deterministic ordering;
- historical path-version reference integrity;
- idempotency behavior.

### Persistence tests

- reconciliation run persistence;
- step result persistence;
- unmatched observation persistence;
- limitations/provenance persistence;
- idempotent replay;
- idempotency conflict;
- foreign-key integrity with ExpectedControlPath and GovernmentEvent references.

### Adversarial tests

At minimum, challenge the implementation with:

```text
same person, different event
same project, wrong event type
same event type, different project
one expected step, two plausible events
no event because the source is down
no event because the query scope is incomplete
missing timestamp
recovered identifier without authoritative confirmation
conflicting source records
new control-path version after prior reconciliation
payment obligated but not settled
```

The test suite must verify that none of these cases silently become stronger claims than the evidence supports.

---

## 26. API and Persistence Boundary

T007 should introduce a dedicated reconciliation module.

Recommended structure:

```text
packages/domain/src/reconciliation.ts
packages/database/src/reconciliation.ts
migrations/004_reconciliation.sql
 tests/reconciliation.test.mjs
 tests/reconciliation-persistence.test.mjs
```

The exact filenames may change only when the implementation remains within this specification.

No UI is required for T007.

No external production connector is required for T007.

A service layer may be added only where needed to enforce orchestration and transaction boundaries; it must not become a hidden policy engine.

---

## 27. Proposed Persistence Model

At minimum, the persistence boundary should support:

```text
reconciliation_run
reconciliation_step_result
reconciliation_match
reconciliation_unmatched_observation
reconciliation_limitation
reconciliation_provenance
reconciliation_idempotency
```

The schema must preserve exact references to:

- ExpectedControlPath version;
- ExpectedControlStep;
- GovernmentEvent;
- Evidence where directly referenced;
- provenance records.

The schema must not duplicate full GovernmentEvent records into reconciliation tables unless there is an explicitly reviewed snapshot requirement.

---

## 28. Acceptance Criteria

T007 is ready for implementation review when all of the following are true:

1. The domain model distinguishes expectation, observation, and reconciliation assertions.
2. Step results preserve `MATCHED`, `MULTIPLE_MATCHES`, `NOT_OBSERVED`, `UNAVAILABLE`, `OUT_OF_SCOPE`, `INAPPLICABLE`, `INSUFFICIENT_INFORMATION`, and `CONFLICTING_OBSERVATIONS` semantics.
3. Matching uses an explicit typed contract and existing `GovernmentEventType` values.
4. Identifier recovery cannot silently become identifier proof.
5. Source unavailability cannot silently become non-occurrence.
6. Historical reconciliation points to an immutable path version.
7. Unmatched observations are preserved.
8. Limitations and provenance are persisted.
9. Determinism and stable ordering are tested.
10. Reconciliation does not produce anomaly scores, legal findings, corruption labels, or accountability decisions.
11. Reconciliation is reproducible and idempotent under the defined request identity.
12. Adversarial tests demonstrate the frozen semantic rules remain intact.

---

## 29. Explicit Non-Goals for T007

T007 must leave these capabilities for later governed work:

```text
RECONCILIATION
    ↓
DETECTION
    ↓
VERIFICATION
    ↓
ACCOUNTABILITY
    ↓
PUBLIC PROJECTION
```

In particular, this task must not convert:

```text
NOT_OBSERVED → VIOLATION
UNMATCHED → FRAUD
MULTIPLE_MATCHES → CORRUPTION
CONNECTION → WRONGDOING
CONTROL BREAK → FINDING
AI SUGGESTION → FACT
```

Those transformations require later specifications, evidence rules, and human-governed adjudication.

---

## 30. Next Implementation Step

After approval of this T007 specification, implementation should proceed as a separate bounded task:

```text
T007.1 — Reconciliation domain model and deterministic matcher
T007.2 — Reconciliation persistence boundary
T007.3 — Reconciliation integration tests and adversarial validation
```

Each implementation task must be reviewed against this specification before being merged into `main`.
