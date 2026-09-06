# eGovTrace — T006 ExpectedControlPath Implementation Specification v1

**Status:** Proposed engineering specification for review  
**Task:** T006 — ExpectedControlPath implementation  
**Depends on:** T005 — ExpectedControlPath Specification v1  
**Architecture reference:** `docs/02-architecture/eGovTrace_Repository_and_Codebase_Architecture_v1.md`  
**Requirements reference:** `REQUIREMENTS.md`  
**Observed-event baseline:** T004 GovernmentEvent lifecycle on `main`

---

## 1. Purpose

This document translates the approved T005 ExpectedControlPath domain specification into a bounded implementation contract for T006.

T006 must make the ExpectedControlPath model executable as a validated domain and persistence capability without implementing downstream reconciliation, detection, case management, public projections, or AI-driven control interpretation.

The implementation must preserve the eGovTrace boundary:

```text
ExpectedControlPath = what the system expects
GovernmentEvent     = what the system has observed
Reconciliation      = later comparison of expected vs observed
Detection           = later deterministic signal generation
Finding             = later human-verified or otherwise governed determination
```

T006 is successful only when a reviewer can inspect a stored control-path definition, validate it deterministically, reproduce its historical version, and retrieve its steps and constraints without introducing downstream behavior prematurely.

---

## 2. Repository-Grounded Baseline

The implementation is grounded only in artifacts confirmed on `main` at T006 planning time.

Relevant baseline facts:

1. `packages/domain/src/index.ts` already defines shared domain primitives including `DomainId`, `ProvenanceReference`, `TemporalValidity`, `EntityType`, `Evidence`, and the current `GovernmentEventType` vocabulary.
2. The current `GovernmentEventType` vocabulary is:
   - `PROJECT_CREATED`
   - `BUDGET_APPROVED`
   - `PROCUREMENT_POSTED`
   - `CONTRACT_AWARDED`
   - `PAYMENT_OBLIGATED`
   - `PAYMENT_DISBURSED`
   - `PAYMENT_SETTLED`
   - `IMPLEMENTATION_REPORTED`
   - `VERIFICATION_RECORDED`
3. The repository uses PostgreSQL through the existing `PersistenceStore` and SQL migration mechanism.
4. T004 established the GovernmentEvent lifecycle and its source-identity/versioning semantics.
5. T005 defines ExpectedControlPath concepts, validation rules, historical semantics, provenance requirements, and the explicit implementation boundary.
6. The repository architecture orders work as:

```text
DOMAIN
→ DATA
→ EVENTS
→ CONTROL PATHS
→ RECONCILIATION
→ DETECTION
→ EVIDENCE
→ VERIFICATION
→ ACCOUNTABILITY
→ API
→ WEB
→ MOBILE
→ PUBLIC VIEW
```

T006 must remain within the CONTROL PATHS layer.

---

## 3. T006 Scope

### 3.1 In scope

T006 may implement:

- TypeScript domain types for ExpectedControlPath and ExpectedControlStep;
- explicit enum/string-union values for T005-defined classifications;
- constructors/factories where they materially improve invariant enforcement;
- pure validation functions;
- deterministic normalization that does not alter meaning;
- immutable/version-aware persistence;
- SQL migration(s) required for ExpectedControlPath storage;
- repository methods for creating, retrieving, and listing path definitions;
- repository methods for retrieving ordered steps and their constraints;
- persistence of provenance and source references required by T005;
- persistence of effective validity and status;
- persistence of alternatives, dependencies, event mappings, evidence expectations, responsibility, timing, and independence constraints;
- idempotent creation/update semantics where needed;
- optimistic concurrency where mutable draft operations require it;
- tests for domain validation and persistence behavior;
- migration safety and rollback-oriented tests where applicable;
- documentation limited to implementation notes required by this task.

### 3.2 Explicitly out of scope

T006 must not implement:

- reconciliation against GovernmentEvents;
- matching observed events to expected steps;
- anomaly detection;
- risk scoring;
- graph traversal;
- case assignment or case management;
- accountability decisions;
- legal findings;
- corruption classification;
- public UI or dashboard behavior;
- government user interface behavior;
- production agency connectors;
- automatic legal-rule inference;
- AI-generated normative control requirements;
- autonomous approval of control paths;
- automatic discovery of alternative paths from observations;
- broad redesign of the T004 GovernmentEvent model;
- breaking changes to existing domain or persistence APIs unless explicitly required by a reviewed compatibility change.

---

## 4. Implementation Principles

### 4.1 Specification is authoritative

The code must implement T005 semantics rather than reinterpret them opportunistically.

### 4.2 Deterministic first

A given input must produce the same validation outcome independent of AI, network state, database row ordering, or external model behavior.

### 4.3 No hidden semantics

The implementation must not infer legal obligations, actor independence, applicability, alternatives, or timing constraints from vague text.

### 4.4 Preserve history

Published historical definitions must not be destructively rewritten.

### 4.5 Expected data is not observed data

ExpectedControlPath tables must not store observed GovernmentEvent records as if they were evidence of occurrence.

### 4.6 Missing is not absent

Repository retrieval returning no matching observation is not a T006 concern and must not be modeled as absence of the real-world event.

### 4.7 Source authority remains external

A control-path record may preserve provenance and authority metadata but does not become legally authoritative because it is stored in eGovTrace.

---

## 5. Proposed Module Boundary

T006 should introduce a dedicated control-path module rather than placing all behavior directly in `packages/domain/src/index.ts`.

Recommended structure:

```text
packages/domain/src/expected-control-path.ts
packages/domain/src/index.ts                  # re-export only as needed
packages/database/src/expected-control-path.ts
migrations/003_expected_control_path.sql
 tests/expected-control-path.test.mjs
 tests/expected-control-path-persistence.test.mjs
```

The exact file names may change during implementation only when the change is justified and remains within T006 scope.

No new application layer is required for T006.

---

## 6. Canonical Domain Types

The implementation must represent at least the following concepts.

### 6.1 ExpectedControlPath

Required fields:

```ts
export interface ExpectedControlPath {
  readonly id: DomainId;
  readonly controlPathKey: string;
  readonly version: number;
  readonly status: ExpectedControlPathStatus;
  readonly scope: ControlPathScope;
  readonly classification: ControlPathClassification;
  readonly validity: TemporalValidity;
  readonly applicability: ControlPathApplicability;
  readonly steps: readonly ExpectedControlStep[];
  readonly provenance: readonly ProvenanceReference[];
  readonly metadata: Readonly<Record<string, unknown>>;
}
```

Implementation may use more strongly branded identifiers where useful, but must not weaken required semantics merely to simplify persistence.

### 6.2 ExpectedControlPathStatus

```text
DRAFT
REVIEW
APPROVED
ACTIVE
RETIRED
```

These values must be persisted without collapsing lifecycle state into a boolean such as `active`.

### 6.3 ControlPathClassification

Minimum V1 values:

```text
SYNTHETIC
NORMATIVE
INTERPRETED
```

`SYNTHETIC` explicitly marks demo/test expectations.

`NORMATIVE` means the expectation is represented as originating from an authoritative normative source; the source/provenance must still be preserved.

`INTERPRETED` means the expectation is normalized or interpreted from source material rather than presented as a literal copy.

The implementation must not auto-upgrade one classification into another.

---

## 7. Scope Model

### 7.1 ControlPathScope

The scope model must support optional restrictions without pretending unspecified fields match every possible value.

Recommended shape:

```ts
interface ControlPathScope {
  readonly institutionIds?: readonly DomainId<'INSTITUTION'>[];
  readonly officeIds?: readonly DomainId<'OFFICE'>[];
  readonly programIds?: readonly DomainId[];
  readonly projectTypes?: readonly string[];
  readonly procurementTypes?: readonly string[];
  readonly fundingSources?: readonly string[];
  readonly geographicScopes?: readonly string[];
  readonly transactionCategories?: readonly string[];
}
```

An empty scope means “no declared restriction at that dimension,” not “unknown.”

Do not add automatic wildcard semantics beyond what is explicitly represented.

### 7.2 ControlPathApplicability

Applicability must be declarative.

Recommended shape:

```ts
interface ControlPathApplicability {
  readonly conditions: readonly ApplicabilityCondition[];
}

interface ApplicabilityCondition {
  readonly field: string;
  readonly operator: ApplicabilityOperator;
  readonly value: string | number | boolean | readonly string[];
}
```

Initial supported operators should be deliberately small:

```text
EQUALS
NOT_EQUALS
IN
NOT_IN
PRESENT
ABSENT
```

Do not implement arbitrary expression languages in T006.

Applicability evaluation against project/event data is out of scope; T006 only stores and validates declarative conditions.

---

## 8. ExpectedControlStep Model

Each step must preserve the following information:

```ts
interface ExpectedControlStep {
  readonly id: DomainId;
  readonly key: string;
  readonly sequence: number;
  readonly description: string;
  readonly type: ExpectedControlStepType;
  readonly requiredness: ExpectedControlRequiredness;
  readonly dependencies: readonly ControlStepDependency[];
  readonly expectedEventTypes: readonly GovernmentEventType[];
  readonly evidenceExpectations: readonly EvidenceExpectation[];
  readonly responsibility: ControlResponsibility;
  readonly timing?: ControlTimingExpectation;
  readonly independence?: IndependenceRequirement;
  readonly applicability?: ApplicabilityConditionGroup;
  readonly alternativeGroup?: string;
  readonly completionModes: readonly CompletionMode[];
  readonly provenance: readonly ProvenanceReference[];
}
```

Each field has a specific semantic purpose. Arbitrary JSON must not replace typed constraints when a field has known semantics.

---

## 9. Step Type

The implementation must support exactly the V1 T005 step-type vocabulary unless a separate specification change is approved.

```text
AUTHORIZATION
BUDGET
PROCUREMENT
CONTRACT
PAYMENT
IMPLEMENTATION
VERIFICATION
AUDIT
ACCOUNTABILITY
OUTCOME
```

Unknown step types must fail validation rather than being silently persisted as free-form values.

---

## 10. Requiredness

Supported values:

```text
REQUIRED
OPTIONAL
CONDITIONAL
```

Validation requirements:

1. `REQUIRED` does not require an applicability condition.
2. `OPTIONAL` may exist without a condition.
3. `CONDITIONAL` must include an explicit applicability condition.
4. A step must not have mutually contradictory requiredness metadata.
5. Requiredness does not establish that the step happened.

---

## 11. Dependency Model

Each dependency references another step key in the same path version.

Recommended type:

```ts
interface ControlStepDependency {
  readonly stepKey: string;
  readonly kind:
    | 'REQUIRED_PREDECESSOR'
    | 'OPTIONAL_PREDECESSOR'
    | 'ALTERNATIVE_PREDECESSOR';
}
```

Validation requirements:

- dependency target must exist;
- self-dependency is forbidden;
- dependency graph must be acyclic;
- cross-path dependencies are forbidden;
- cross-version dependencies are forbidden;
- duplicate dependency entries are forbidden;
- deterministic topological validation must be used;
- sequence order may be validated for consistency but is not itself the authoritative dependency semantics.

---

## 12. Expected Event Mapping

The implementation must reuse the existing `GovernmentEventType` union.

Do not create a second incompatible event-type vocabulary for ExpectedControlPath.

Each step may declare zero or more compatible event types.

Validation rules:

1. Each event type must belong to the existing GovernmentEventType vocabulary.
2. Duplicate event types in one step are forbidden.
3. A step with `EVENT_OBSERVED` completion mode must declare at least one expected event type.
4. A documentary or human-confirmation step may have zero event mappings if another completion mode is declared.
5. T006 must not inspect actual GovernmentEvent rows to decide whether a mapping is valid.

---

## 13. Evidence Expectation Model

Recommended shape:

```ts
interface EvidenceExpectation {
  readonly evidenceType: string;
  readonly minimumCount: number;
  readonly sourceClass?: string;
  readonly requiredAttributes?: readonly string[];
  readonly acceptedAssertionKinds?: readonly AssertionKind[];
  readonly availabilityRequirement?: 'AVAILABLE' | 'MAY_BE_WITHHELD';
}
```

Validation requirements:

- `minimumCount >= 0`;
- evidence type must be non-empty;
- required attributes must be unique;
- accepted assertion kinds must use the shared `AssertionKind` vocabulary;
- evidence expectations do not embed actual Evidence entity IDs;
- evidence expectations do not prove that evidence exists.

---

## 14. Responsibility Model

Recommended shape:

```ts
interface ControlResponsibility {
  readonly institutionId?: DomainId<'INSTITUTION'>;
  readonly officeId?: DomainId<'OFFICE'>;
  readonly roles?: readonly string[];
  readonly permittedActorTypes?: readonly string[];
}
```

Validation requirements:

- role strings must be non-empty after normalization;
- duplicate roles are forbidden;
- T006 does not resolve a role to a specific person unless an explicit future identity model is introduced;
- responsibility declaration is not an allegation against any actor.

---

## 15. Independence Requirements

Initial declarative values:

```text
MUST_DIFFER_FROM_PREVIOUS_ACTOR
MUST_DIFFER_FROM_AUTHORIZING_ACTOR
MUST_BE_OUTSIDE_EXECUTING_OFFICE
```

The implementation must store these as typed values.

T006 must not evaluate whether actual actors satisfy them.

No automatic inference from names, offices, or organizational hierarchy is permitted.

---

## 16. Timing Model

Recommended shape:

```ts
interface ControlTimingExpectation {
  readonly earliestAfterStepKey?: string;
  readonly latestAfterStepKey?: string;
  readonly targetDurationSeconds?: number;
  readonly calendarBasis?: 'ELAPSED_TIME' | 'CALENDAR_DAYS' | 'BUSINESS_DAYS' | 'SOURCE_DEFINED';
}
```

Validation requirements:

- referenced step keys must exist in the same path;
- duration must not be negative;
- earliest/latest references must not create a semantic contradiction;
- no timing requirement may be auto-created from free-form prose;
- unspecified timing remains unspecified.

T006 does not calculate deadlines or compare timestamps.

---

## 17. Alternative Groups

An `alternativeGroup` identifies explicitly declared mutually sufficient alternatives.

Validation requirements:

- group identifiers must be non-empty;
- a step may belong to at most one alternative group;
- alternative-group membership alone is insufficient to define semantics; the containing path must declare that the group is a valid alternative construct;
- no alternative group may be inferred from observed events;
- an alternative group does not mean all members must occur.

The initial implementation may model the group identifier as a string and defer richer cardinality semantics until a later specification.

---

## 18. Completion Modes

Supported values:

```text
EVENT_OBSERVED
EVIDENCE_PRESENT
HUMAN_CONFIRMATION
DECLARATIVE_REFERENCE
```

Validation requirements:

1. A step must declare at least one completion mode.
2. Duplicate completion modes are forbidden.
3. `EVENT_OBSERVED` requires at least one expected event type.
4. `EVIDENCE_PRESENT` requires at least one evidence expectation.
5. `HUMAN_CONFIRMATION` does not automatically require a GovernmentEvent.
6. `DECLARATIVE_REFERENCE` must not be interpreted as observed occurrence.

---

## 19. Provenance

T006 must persist enough provenance to explain where a control expectation came from.

At minimum, each path version must preserve:

```text
provenance kind
recordedAt
method
source metadata when present
parent provenance IDs when present
```

The implementation should reuse existing `ProvenanceReference` semantics rather than creating an incompatible provenance model.

Required safeguards:

- `SYNTHETIC_FIXTURE` provenance is permitted for synthetic paths;
- `AI_ASSISTANCE` can appear in provenance but cannot itself confer authority;
- a path with `NORMATIVE` or `INTERPRETED` classification must retain source provenance sufficient for later inspection;
- provenance records are append/history oriented and must not be silently overwritten.

---

## 20. Version and Immutability Model

A unique logical path is identified by:

```text
controlPathKey + version
```

Database constraints must enforce uniqueness.

Material change means new version, not in-place mutation, once a path is `APPROVED` or `ACTIVE`.

### 20.1 Draft mutation

`DRAFT` definitions may be edited through explicit repository operations.

### 20.2 Review/approved/active mutation

For `REVIEW`, `APPROVED`, and `ACTIVE`, T006 should treat structural content as immutable unless the implementation explicitly creates a new version.

### 20.3 Retirement

Retirement changes lifecycle status but must preserve the definition and its validity metadata.

### 20.4 Historical retrieval

A repository query must be able to retrieve a specific `controlPathKey + version` without relying on current status.

---

## 21. Database Design

T006 should add a dedicated relational representation instead of storing the complete path as one opaque JSON document only.

Recommended core tables:

```text
expected_control_path
expected_control_step
expected_control_step_dependency
expected_control_step_event_type
expected_control_step_evidence
expected_control_step_role
expected_control_step_independence
expected_control_step_timing
expected_control_path_provenance
```

A JSON metadata column may be retained for non-semantic metadata, but core validation-relevant attributes must be queryable through typed relational columns.

### 21.1 expected_control_path

Suggested columns:

```text
id uuid primary key
control_path_key text not null
version integer not null
status text not null
classification text not null
scope jsonb not null
applicability jsonb not null
valid_from timestamptz not null
valid_to timestamptz null
metadata jsonb not null
record_version integer not null default 1
created_at timestamptz not null
authorized_at timestamptz null
retired_at timestamptz null
```

Constraint:

```text
unique(control_path_key, version)
```

### 21.2 expected_control_step

Suggested columns:

```text
id uuid primary key
path_id uuid not null references expected_control_path(id)
step_key text not null
sequence integer not null
description text not null
step_type text not null
requiredness text not null
alternative_group text null
completion_modes text[] not null
responsibility jsonb not null
timing jsonb null
independence text[] not null
applicability jsonb null
provenance jsonb not null
```

Constraint:

```text
unique(path_id, step_key)
```

### 21.3 Dependency table

Use a join table so dependency references are queryable and enforceable:

```text
expected_control_step_dependency
- step_id
- predecessor_step_id
- dependency_kind
```

A database-level foreign key should ensure both steps exist.

Cycle prevention remains an application/domain validation responsibility because ordinary relational foreign keys do not express arbitrary graph acyclicity.

### 21.4 Event type mapping

Use a join table:

```text
expected_control_step_event_type
- step_id
- event_type
```

The event type column must be constrained to the known GovernmentEventType vocabulary where practical.

### 21.5 Evidence expectation

Use a table:

```text
expected_control_step_evidence
- id
- step_id
- evidence_type
- minimum_count
- source_class
- required_attributes jsonb
- accepted_assertion_kinds text[]
- availability_requirement
```

### 21.6 Provenance

Prefer foreign keys to the existing provenance record table when the existing database schema can support the relationship cleanly.

Do not duplicate the complete provenance subsystem inside ExpectedControlPath.

---

## 22. Database Integrity Rules

At minimum:

- unique `(control_path_key, version)`;
- unique `(path_id, step_key)`;
- foreign keys from every child record to its path/step;
- valid temporal ranges where `valid_to` exists;
- positive integer version;
- positive or zero sequence according to the selected convention;
- nonnegative evidence minimum count;
- nonempty required textual identifiers;
- valid enumerated classifications/statuses;
- no nulls for semantics marked required by the domain model.

The implementation must prefer database constraints for local invariants and TypeScript validation for cross-row invariants such as dependency cycles.

---

## 23. Repository API

T006 should expose a narrow persistence interface.

Recommended operations:

```ts
createExpectedControlPath(input): Promise<ExpectedControlPath>
getExpectedControlPath(id): Promise<ExpectedControlPath | null>
getExpectedControlPathVersion(controlPathKey, version): Promise<ExpectedControlPath | null>
listExpectedControlPathVersions(controlPathKey): Promise<readonly ExpectedControlPath[]>
listActiveExpectedControlPaths(asOf): Promise<readonly ExpectedControlPath[]>
updateDraftExpectedControlPath(id, input, expectedRecordVersion): Promise<ExpectedControlPath>
transitionExpectedControlPathStatus(id, status, expectedRecordVersion): Promise<ExpectedControlPath>
```

Exact API names may vary, but the capability boundaries must remain.

T006 must not provide a repository operation named or behaving like:

```text
reconcile()
detect()
classifyCorruption()
assignCase()
verifyFinding()
```

---

## 24. Status Transition Rules

Allowed transitions:

```text
DRAFT → REVIEW
REVIEW → APPROVED
REVIEW → DRAFT
APPROVED → ACTIVE
ACTIVE → RETIRED
```

Any other transition must fail deterministically.

The implementation may support `DRAFT → RETIRED` only if a clear administrative use case is documented and tested; do not broaden the lifecycle casually.

A status transition must not mutate the structural content of an approved/active path.

---

## 25. Validation Architecture

Validation should be pure and composable.

Recommended pattern:

```ts
validateExpectedControlPath(path): ValidationResult
validateExpectedControlStep(step, path): ValidationResult
validateDependencies(path): ValidationResult
validateTemporalValidity(path.validity): ValidationResult
validateStatusTransition(from, to): ValidationResult
```

`ValidationResult` should make failures inspectable by callers rather than relying only on generic `Error` strings.

Recommended shape:

```ts
interface ValidationIssue {
  readonly code: string;
  readonly message: string;
  readonly path?: string;
}

interface ValidationResult {
  readonly valid: boolean;
  readonly issues: readonly ValidationIssue[];
}
```

Do not include external network calls inside validation.

---

## 26. Required Domain Validation Rules

T006 must implement at least:

### V6-01 — Path key is non-empty

Trimmed `controlPathKey` must not be empty.

### V6-02 — Version is positive

`version >= 1`.

### V6-03 — Path status is valid

Only defined lifecycle statuses are accepted.

### V6-04 — Path classification is valid

Only defined classifications are accepted.

### V6-05 — Temporal validity is valid

`validFrom <= validTo` when `validTo` exists.

### V6-06 — Active path is non-empty

`ACTIVE` requires at least one valid step.

### V6-07 — Step keys are unique

No duplicate step keys within a path version.

### V6-08 — Step descriptions are non-empty

Whitespace-only descriptions fail.

### V6-09 — Step type is valid

Unknown step types fail.

### V6-10 — Requiredness is valid

Unknown values fail.

### V6-11 — Conditional step requires condition

`CONDITIONAL` requires explicit applicability semantics.

### V6-12 — Completion modes are non-empty

Every step needs at least one completion mode.

### V6-13 — Event completion requires event mapping

`EVENT_OBSERVED` requires one or more compatible GovernmentEvent types.

### V6-14 — Evidence completion requires evidence expectation

`EVIDENCE_PRESENT` requires one or more evidence expectations.

### V6-15 — Dependency references are local

Dependency targets must exist within the same path version.

### V6-16 — No dependency cycles

The dependency graph must be acyclic.

### V6-17 — Timing references are local

Referenced steps must exist within the same path version.

### V6-18 — Event types are known

Mappings must use the existing GovernmentEventType vocabulary.

### V6-19 — Evidence counts are nonnegative

`minimumCount >= 0`.

### V6-20 — Alternative group identifiers are non-empty

When present, an alternative group must have a valid identifier.

### V6-21 — Provenance exists

At least one provenance reference is required for persisted path definitions.

### V6-22 — Synthetic classification is explicit

A synthetic path must use provenance compatible with synthetic/demo use and must not be persisted as normative solely because of status.

### V6-23 — Immutable-version rule

Approved/active definitions cannot be structurally updated in place.

### V6-24 — Deterministic ordering

Retrieved steps must be returned in deterministic order, preferably by `sequence`, then stable identifier.

---

## 27. Normalization Rules

T006 may normalize only representation-level differences that do not change meaning.

Allowed examples:

- trim path keys and role identifiers;
- normalize duplicate whitespace in descriptions if explicitly defined;
- canonicalize set-like arrays into deterministic ordering for persistence/comparison;
- normalize enum strings to their exact canonical representation.

Forbidden examples:

- inferring missing legal steps;
- changing REQUIRED to OPTIONAL based on observed frequency;
- inventing timing values;
- inventing alternative groups;
- mapping unknown event types by semantic similarity;
- converting AI suggestions into normative requirements automatically.

---

## 28. Idempotency

Creating the same immutable path version with an identical idempotency key and identical request content should replay the original result rather than create duplicate versions.

Reusing the same idempotency key with different content must fail with an explicit conflict.

The existing persistence idempotency mechanism should be reused or extended rather than replaced by a second unrelated mechanism.

---

## 29. Concurrency

Draft editing may use optimistic concurrency based on an existing `record_version` pattern.

Expected behavior:

```text
read version = 3
update with expected version = 3 → success, version 4
update with expected version = 3 → OptimisticConcurrencyError
```

Status transitions must also protect against stale writes.

No locking scheme may allow two concurrent writes to overwrite one another silently.

---

## 30. Read Semantics

Repository reads must reconstruct the domain aggregate without losing semantics.

A retrieved path must preserve:

- exact version;
- status;
- classification;
- validity;
- scope;
- applicability;
- step order;
- dependencies;
- event mappings;
- evidence expectations;
- responsibility;
- timing;
- independence;
- alternative groups;
- completion modes;
- provenance.

The read result must not inject observed GovernmentEvents or synthesize reconciliation state.

---

## 31. Active Path Selection

T006 may provide a read helper for retrieving active paths as of a point in time.

It must use validity and status rather than “latest row wins.”

Minimum selection requirements:

```text
status = ACTIVE
validFrom <= asOf
(validTo is null OR asOf <= validTo)
```

When multiple active versions overlap for the same logical control-path key, the implementation must reject the ambiguity or surface it explicitly rather than guessing.

The selection helper must not evaluate project-specific applicability unless a separate pure function is explicitly implemented as part of T006 and covered by this specification. Default T006 behavior should return applicable-by-validity candidates without event matching.

---

## 32. Security and Governance

The implementation must not expose sensitive source material merely because a control path references it.

ExpectedControlPath may contain source metadata and governance information, but it should not duplicate restricted evidence contents.

Classification values must not be treated as authorization decisions. Access control remains under the existing security architecture.

AI-assisted provenance must remain visible where used.

Synthetic data must remain visibly synthetic.

---

## 33. API Layer Boundary

T006 does not require HTTP endpoints.

A future API layer may expose the repository after the domain/persistence contract stabilizes.

Do not add a public API merely to prove the module works.

At most, existing internal test infrastructure may invoke the repository directly.

---

## 34. Migration Requirements

The implementation migration should be additive.

Migration rules:

1. Existing T001–T004/T005 data must remain readable.
2. T006 migration must not drop or rewrite GovernmentEvent tables.
3. Re-running migration must be safe according to the repository's current migration approach.
4. Constraints should fail invalid data early.
5. Existing tables should be referenced, not duplicated, when shared concepts already exist.
6. If a migration cannot safely represent a rule, keep that rule in deterministic domain validation rather than weakening semantics.

---

## 35. Test Strategy

T006 requires both pure-domain tests and database integration tests.

### 35.1 Domain tests

Must cover:

- minimal valid synthetic path;
- invalid empty key;
- invalid version;
- duplicate step keys;
- invalid step type;
- invalid requiredness;
- conditional step without condition;
- `EVENT_OBSERVED` without event mapping;
- `EVIDENCE_PRESENT` without evidence expectation;
- unknown event type;
- invalid dependency reference;
- self-dependency;
- dependency cycle;
- invalid timing reference;
- negative timing duration;
- duplicate event mappings;
- duplicate completion modes;
- invalid provenance;
- invalid temporal validity;
- invalid status transition;
- approved-path mutation rejection;
- deterministic topological/dependency validation.

### 35.2 Persistence tests

Must cover:

- create and retrieve path;
- reconstruct nested steps and constraints;
- unique key/version enforcement;
- duplicate step-key enforcement;
- dependency persistence;
- event mapping persistence;
- evidence expectation persistence;
- provenance persistence;
- active selection by `asOf` date;
- historical version retrieval;
- retirement preservation;
- idempotent replay;
- idempotency conflict;
- optimistic concurrency conflict;
- transaction rollback after synthetic failure;
- migration rerun safety.

### 35.3 Adversarial tests

At least these cases must be explicit:

1. Same `controlPathKey`, same version, materially different contents → reject.
2. Same idempotency key, different request body → conflict.
3. Step depends on itself → reject.
4. A → B → C → A dependency cycle → reject.
5. Conditional step without applicability condition → reject.
6. Event type typo or obsolete value → reject.
7. Approved path structural mutation → reject.
8. Two overlapping active versions → reject or explicitly surface ambiguity.
9. No observations must not create an “absent” state in the control-path record.
10. Synthetic classification must not silently become normative.
11. AI-assisted provenance must not be treated as authority.
12. Alternative group must not be created automatically from observed behavior.

---

## 36. Acceptance Criteria

T006 is implementation-complete only when all of the following are true.

### AC-01
A valid ExpectedControlPath can be constructed in TypeScript and passes deterministic validation.

### AC-02
The path can contain multiple typed steps with requiredness, ordering, and dependencies.

### AC-03
Dependency cycles and invalid references are rejected.

### AC-04
Existing GovernmentEventType values are reused without creating a competing event vocabulary.

### AC-05
Evidence expectations, responsibilities, timing, independence, alternatives, completion modes, applicability, and provenance can be stored and reconstructed.

### AC-06
`controlPathKey + version` is unique and historically retrievable.

### AC-07
Approved/active structural definitions cannot be silently rewritten in place.

### AC-08
Draft updates use optimistic concurrency or an equivalent deterministic stale-write guard.

### AC-09
Persistence is transaction-safe and idempotent under replay.

### AC-10
Active path selection respects status and temporal validity.

### AC-11
Synthetic, normative, and interpreted classifications remain explicit.

### AC-12
No T006 behavior emits a legal finding, corruption classification, anomaly signal, or accountability decision.

### AC-13
All T006 tests pass without weakening existing T001–T004/T005 test coverage.

### AC-14
Repository typecheck/build/lint/test and migration validation pass according to the current project scripts.

### AC-15
A code reviewer can trace every implementation behavior back to T005 or an explicitly documented implementation detail.

---

## 37. Forbidden Scope Creep During Implementation

The following changes are not allowed inside T006 unless a separate approved task explicitly expands the scope:

```text
add reconciliation engine
add detection rules
add anomaly scores
add graph traversal
add case management tables
add investigation workflow
add public endpoints
add web/mobile UI
rewrite GovernmentEvent semantics
introduce an ORM migration framework
replace PostgreSQL
introduce AI into validation
infer Philippine law automatically
build production government connectors
```

A developer or AI coding agent must stop and request a new specification when a requirement requires any of the above.

---

## 38. AI Coding Guardrails

AI may implement T006 after this specification is approved, but the implementation prompt must require:

1. inspect the live repository before editing;
2. use only verified existing files and APIs;
3. make the smallest coherent changes necessary;
4. do not invent missing files, services, or contracts;
5. do not weaken tests to make implementation pass;
6. do not change semantics merely to fit an ORM or database shortcut;
7. add tests before claiming completion;
8. show validation results;
9. stop on contradictory existing behavior rather than silently changing unrelated modules;
10. preserve existing domain semantics around provenance, temporal validity, and GovernmentEvent status.

AI-generated code is implementation assistance, not architectural authority.

---

## 39. Review Checklist

Before implementation approval, the reviewer should confirm:

```text
[ ] T006 implements only T005-defined semantics.
[ ] Domain types are explicit and typed.
[ ] Existing GovernmentEventType is reused.
[ ] Database design is relational for core semantics.
[ ] Historical versioning is preserved.
[ ] Draft concurrency is protected.
[ ] Status transitions are explicit.
[ ] Dependency cycles are rejected.
[ ] Evidence expectations are not evidence records.
[ ] Responsibility is not identity accusation.
[ ] Timing is declarative only.
[ ] Alternatives are explicit only.
[ ] Provenance remains visible.
[ ] Synthetic classification remains explicit.
[ ] No reconciliation/detection behavior was added.
[ ] Tests cover adversarial cases.
[ ] Existing tests remain green.
```

---

## 40. Definition of Done

T006 is ready to merge when:

1. this specification has been reviewed and explicitly approved;
2. implementation is isolated to a T006 branch/PR;
3. domain and persistence code implements the approved model;
4. migrations are safe and rerunnable according to repository conventions;
5. tests cover acceptance and adversarial scenarios;
6. repository validation passes;
7. no unrelated architectural cleanup is bundled into the change;
8. PR review documents the final implementation boundary;
9. merge is performed only after human approval.

---

## 41. Next Engineering Task

After T006 implementation is approved and merged, the next bounded task should be **T007 — Reconciliation Specification**.

T007 should first define how:

```text
ExpectedControlPath
        +
Observed GovernmentEvents
        ↓
ReconciliationResult
```

without prematurely implementing detection or findings.

Until T007 is specified and approved, T006 must not create reconciliation behavior implicitly.
