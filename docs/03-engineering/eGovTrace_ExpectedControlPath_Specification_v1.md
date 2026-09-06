# eGovTrace — ExpectedControlPath Specification v1

**Status:** Proposed engineering specification for review  
**Task:** T005 — ExpectedControlPath specification  
**Architecture reference:** `docs/02-architecture/eGovTrace_Repository_and_Codebase_Architecture_v1.md`  
**Requirements reference:** `REQUIREMENTS.md`  
**Domain implementation baseline:** `main` through T004 GovernmentEvent lifecycle

---

## 1. Purpose

This specification defines the meaning, structure, versioning, validation, provenance, and execution boundary of `ExpectedControlPath` for eGovTrace V1.

`ExpectedControlPath` represents a declared control lifecycle against which observed `GovernmentEvent` records can later be compared.

It answers:

> Given a defined scope and control-path version, what steps are expected, in what order, under what dependencies, with what evidence, responsibility, timing, and alternative paths?

It does **not** decide whether an observed process was lawful, corrupt, fraudulent, irregular, or otherwise culpable.

This specification deliberately separates:

- expected control design from observed reality;
- expected steps from GovernmentEvents;
- control requirements from detection rules;
- control exceptions from legal findings;
- demo/test expectations from actual legal requirements;
- historical control-path versions from current configuration;
- optional steps from mandatory steps;
- absence of an observation from proof of non-occurrence.

---

## 2. Repository-Grounded Baseline

The current repository contains the following relevant foundations:

1. `GovernmentEvent` is the canonical observed-event record.
2. The domain contains typed entities for Institution, Office, Person, Official, Authority, LegalInstrument, Project, Budget, Procurement, Bidder, Contractor, Contract, Payment, Evidence, and GovernmentEvent.
3. `GovernmentEventType` currently contains:
   - `PROJECT_CREATED`
   - `BUDGET_APPROVED`
   - `PROCUREMENT_POSTED`
   - `CONTRACT_AWARDED`
   - `PAYMENT_OBLIGATED`
   - `PAYMENT_DISBURSED`
   - `PAYMENT_SETTLED`
   - `IMPLEMENTATION_REPORTED`
   - `VERIFICATION_RECORDED`
4. The live architecture document defines the implementation order as `DOMAIN → DATA → EVENTS → CONTROL PATHS → RECONCILIATION → DETECTION → EVIDENCE → VERIFICATION → ACCOUNTABILITY → API → WEB → MOBILE → PUBLIC VIEW`.
5. `REQUIREMENTS.md` defines the first prototype acceptance target as a reviewer being able to inspect expected and observed lifecycle information, followed later by reconciliation, explainable control signals, evidence, verification, accountability, outcome, and public projection.

`ExpectedControlPath` therefore sits between the already implemented observed-event layer and the later reconciliation layer. It consumes GovernmentEvent semantics without reimplementing them.

---

## 3. Scope

### 3.1 In scope

T005 defines:

- the canonical ExpectedControlPath aggregate;
- control-path identity and versioning;
- control-step structure;
- mandatory versus optional steps;
- dependencies and ordering;
- expected evidence requirements;
- responsible roles and institutional responsibility;
- timing expectations;
- independence/segregation expectations as explicit control attributes;
- alternative valid paths;
- applicability conditions;
- synthetic/demo versus normative expectations;
- provenance and authorship;
- validation rules;
- historical immutability semantics;
- execution/read semantics for later reconciliation;
- adversarial acceptance tests.

### 3.2 Explicitly out of scope

T005 does not implement:

- reconciliation;
- anomaly detection;
- risk scoring;
- legal conclusions;
- corruption classifications;
- case management;
- accountability decisions;
- graph traversal;
- production connectors;
- AI-generated control requirements;
- public UI;
- government UI;
- a universal Philippine legal rule engine.

---

## 4. Governing Semantics

### 4.1 Expected is not observed

An expectation is a control definition. It is not evidence that the corresponding real-world action occurred.

### 4.2 Not observed is not absent

If a later reconciliation search cannot find an event, that does not prove the event did not happen.

### 4.3 Control exception is not misconduct

A mismatch between an expected step and available observations may indicate missing information, a control exception, a data issue, or a legitimate alternative path. It is not itself a finding of wrongdoing.

### 4.4 Demo rule is not law

Synthetic fixtures may use simplified control expectations. They must carry explicit classification so the system never presents them as statutory, regulatory, or agency policy requirements without authoritative provenance.

### 4.5 Source authority remains external

The ExpectedControlPath is an eGovTrace control model. It does not replace the authoritative source of a legal, regulatory, administrative, or agency-specific requirement.

### 4.6 Historical control definitions matter

A control path is time-versioned. A later change to the expected path must not silently rewrite history for an earlier period.

### 4.7 Alternative valid path is not a failure

Where the control model explicitly allows alternatives, satisfying one valid alternative must not be classified as a missing mandatory step merely because another branch was not observed.

---

## 5. Conceptual Model

```text
ExpectedControlPath
├── id
├── controlPathKey
├── version
├── status
├── scope
├── classification
├── source/provenance
├── applicability
├── steps[]
└── metadata

ExpectedControlStep
├── id
├── sequence
├── key
├── type
├── requiredness
├── dependencies[]
├── expected event mapping[]
├── expected evidence[]
├── responsible roles[]
├── institutional responsibility?
├── timing expectation?
├── independence requirement?
├── applicability condition?
├── alternativeGroup?
├── completion semantics
└── provenance
```

The control path is the reusable definition. A control step is one expectation within that definition.

Observed `GovernmentEvent` records remain separate records and are not copied into the path definition.

---

## 6. Canonical Control Path Identity

### 6.1 Stable identity

Each logical control path has a stable `controlPathKey`.

Examples of synthetic keys may include:

```text
PROJECT_LIFECYCLE_STANDARD
PUBLIC_WORKS_PROJECT_STANDARD
PROCUREMENT_TO_VERIFICATION_STANDARD
```

These are identifiers, not legal claims.

### 6.2 Version

Each immutable definition has an integer or equivalent monotonically identifiable version.

Conceptually:

```text
PROJECT_LIFECYCLE_STANDARD v1
PROJECT_LIFECYCLE_STANDARD v2
```

A new version is created when the expected semantics materially change.

### 6.3 No destructive rewrites

Version `v1` must remain reproducible after `v2` is introduced.

### 6.4 Effective validity

A control-path version must carry validity dates when the scope requires historical interpretation.

A control-path definition used in later reconciliation must be selected according to the applicable validity period, not merely the latest stored version.

---

## 7. Control Path Status

The control-path lifecycle is:

```text
DRAFT
→ REVIEW
→ APPROVED
→ ACTIVE
→ RETIRED
```

### 7.1 DRAFT

Editable working definition. Not eligible for authoritative reconciliation.

### 7.2 REVIEW

Awaiting human approval or source-owner confirmation.

### 7.3 APPROVED

Accepted definition that may become active according to its effective validity.

### 7.4 ACTIVE

Eligible for normal downstream reconciliation within scope.

### 7.5 RETIRED

No longer applicable to newly evaluated periods but preserved for historical interpretation.

The status does not itself imply that a control path has legal force.

---

## 8. Scope and Applicability

An ExpectedControlPath must state where and when it applies.

Applicability dimensions may include:

```text
institution
office
program
project type
procurement type
funding source
geographic scope
transaction category
effective date range
```

A control path must not silently apply to every project merely because it exists in the database.

### 8.1 Applicability rule

A later implementation must evaluate applicability before comparing observations against the path.

### 8.2 Unknown applicability

When the system cannot establish applicability safely, the result must remain explicitly uncertain rather than selecting a path by guesswork.

---

## 9. Control Step Model

Every ExpectedControlStep requires:

- stable step key within its control-path version;
- human-readable description;
- step type;
- requiredness;
- deterministic ordering/dependency semantics;
- applicability semantics;
- provenance.

### 9.1 Step types

Initial V1 step types are intentionally narrow:

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

These correspond to the lifecycle categories already present in the live architecture and remain generic enough for synthetic-first implementation.

### 9.2 Requiredness

A step may be:

```text
REQUIRED
OPTIONAL
CONDITIONAL
```

`CONDITIONAL` means the step is required only when an explicit applicability condition evaluates true.

### 9.3 Sequence

Sequence is a human/system ordering aid. Dependency relationships are authoritative for execution semantics.

Do not infer legal chronology solely from an integer sequence if dependencies express a different valid ordering.

---

## 10. Dependencies

A step may depend on one or more prior steps.

Dependency relation:

```text
step B depends on step A
```

A dependency may be:

```text
REQUIRED_PREDECESSOR
OPTIONAL_PREDECESSOR
ALTERNATIVE_PREDECESSOR
```

V1 only needs acyclic dependencies among steps in one version. The implementation should avoid introducing arbitrary graph machinery here.

### 10.1 No cyclic paths

A control-path dependency graph must be acyclic.

Reject configurations such as:

```text
A → B → C → A
```

### 10.2 Dependency does not prove occurrence

A dependency describes the expected process. It does not establish that the predecessor occurred.

---

## 11. Expected Event Mapping

A control step may declare which GovernmentEvent types can satisfy the step.

Example:

| Step | Candidate GovernmentEvent types |
|---|---|
| Project initiation | `PROJECT_CREATED` |
| Budget | `BUDGET_APPROVED` |
| Procurement | `PROCUREMENT_POSTED` |
| Contract award | `CONTRACT_AWARDED` |
| Payment obligation | `PAYMENT_OBLIGATED` |
| Payment disbursement | `PAYMENT_DISBURSED` |
| Payment settlement | `PAYMENT_SETTLED` |
| Implementation | `IMPLEMENTATION_REPORTED` |
| Verification | `VERIFICATION_RECORDED` |

This mapping identifies candidate observation types. It does not itself establish that an event satisfies the step; later reconciliation must evaluate scope, identity, timing, evidence, and other control conditions.

### 11.1 Multiple acceptable event types

A step may accept more than one event type when the control definition explicitly allows alternatives.

### 11.2 Zero acceptable event types

A step with no event mapping is allowed only for expectations that are deliberately non-event based, such as a purely documentary control. Such a step must specify another completion criterion.

---

## 12. Evidence Expectations

A step may specify expected evidence requirements without embedding actual evidence.

An evidence expectation may identify:

```text
evidence type
minimum count
source class
required attribute
acceptable assertion kind
required availability
```

Example:

```text
PAYMENT step
Expected evidence:
- payment-stage record
- source-backed financial record
```

The exact evidence does not become part of the control path until an observed record is later linked by reconciliation.

### 12.1 Missing evidence

Failure to observe expected evidence must remain distinct from proof that evidence never existed.

---

## 13. Responsibility and Independence

A control step may declare:

```text
responsible institution
responsible office
responsible role
permitted actor type
independence requirement
segregation requirement
```

These fields define the intended control design.

They do not automatically establish that a specific human violated or satisfied the control.

### 13.1 Independence requirement

Where a step requires an actor different from another role or organizational position, the requirement must be explicit.

The initial implementation only needs declarative constraints such as:

```text
MUST_DIFFER_FROM_PREVIOUS_ACTOR
MUST_DIFFER_FROM_AUTHORIZING_ACTOR
MUST_BE_OUTSIDE_EXECUTING_OFFICE
```

The actual evaluation belongs to later reconciliation.

---

## 14. Timing Expectations

A control step may define timing rules such as:

```text
earliestAfterStep
latestAfterStep
targetDuration
calendarBasis
```

For T005, timing is a declarative expectation only.

No legal deadline should be invented merely to populate a demo rule.

### 14.1 Unknown timing basis

If an applicable timing requirement is not authoritative or not known, leave it unspecified rather than creating a fabricated deadline.

### 14.2 Time precision

Timing expectations must respect the precision of the applicable rule and the observed event. A date-only expectation must not be treated as a precise timestamp constraint.

---

## 15. Alternative Paths

The control model must support legitimate alternative paths without treating every deviation as an exception.

Example:

```text
Procurement Step
   ├── Competitive procurement path
   └── Explicitly permitted alternative path
```

### 15.1 Alternative group

Steps belonging to the same `alternativeGroup` represent mutually sufficient alternatives when the parent control definition says so.

### 15.2 Explicitness

An alternative path must be declared. It must not be discovered automatically from observed behavior and retroactively treated as expected.

### 15.3 No arbitrary fallback

If an observed event does not satisfy a declared alternative, later reconciliation must report the mismatch rather than inventing a new path.

---

## 16. Completion Semantics

Each step must define how it can later be considered satisfied.

Initial completion modes:

```text
EVENT_OBSERVED
EVIDENCE_PRESENT
HUMAN_CONFIRMATION
DECLARATIVE_REFERENCE
```

### 16.1 EVENT_OBSERVED

A compatible GovernmentEvent is later matched by reconciliation.

### 16.2 EVIDENCE_PRESENT

The requirement is documentary and can be satisfied by qualifying evidence.

### 16.3 HUMAN_CONFIRMATION

Completion requires an authorized human verification step later.

### 16.4 DECLARATIVE_REFERENCE

Completion is supported by an explicit authoritative reference represented in the control data.

T005 does not execute these modes; it only defines them.

---

## 17. Provenance and Authority of Expectations

Every non-synthetic control-path version must preserve the source of the expectation.

At minimum:

```text
source kind
source identifier / locator
recorded at
method or interpretation note
parent provenance where applicable
```

### 17.1 Synthetic control paths

Synthetic/demo paths must be explicitly marked:

```text
classification = SYNTHETIC
```

A synthetic path cannot silently become an authoritative control merely because it is used in a demonstration.

### 17.2 Interpreted requirements

Where an expectation is derived from a source rather than directly copied, the provenance must state that it is an interpretation/normalization.

The original source reference must remain available.

### 17.3 AI-assisted drafting

AI may help draft or normalize a proposed control path later, but AI provenance must remain explicit and does not itself establish authority.

---

## 18. Historical and Version Semantics

A control path must be evaluated as a historical definition, not just as a mutable current configuration.

For a project period in which `v1` was applicable:

```text
reconciliation(project, date)
→ select applicable path version
→ use that version
```

A later `v2` does not retroactively change the interpretation of an already completed period unless an explicit authoritative retroactive rule exists and is separately modeled.

### 18.1 Amendments

A material amendment creates a new version.

### 18.2 Retirement

Retiring a version stops future applicability but preserves historical use.

---

## 19. Validation Rules

### VP-01 — Unique path identity

`controlPathKey + version` must uniquely identify one control-path definition.

### VP-02 — Non-empty active path

An `ACTIVE` path must contain at least one valid step.

### VP-03 — Unique step keys

Step keys must be unique within a path version.

### VP-04 — No dependency cycles

The dependency graph must be acyclic.

### VP-05 — Valid dependency references

Every dependency must refer to a step in the same control-path version.

### VP-06 — Explicit requiredness

Every step must declare `REQUIRED`, `OPTIONAL`, or `CONDITIONAL`.

### VP-07 — Conditional applicability

A `CONDITIONAL` step must provide an explicit applicability expression/reference.

### VP-08 — Alternative groups

Alternative grouping must identify the parent control semantics and may not silently transform unrelated steps into alternatives.

### VP-09 — Event mappings use canonical event types

Mappings must use the existing `GovernmentEventType` vocabulary. Connectors cannot create new expected event types inside control configuration.

### VP-10 — Completion semantics

Every step must declare at least one valid completion mode.

### VP-11 — Timing coherence

A step cannot declare contradictory timing constraints.

### VP-12 — Historical validity

A control-path version used for historical interpretation must have enough validity metadata to determine whether it applies.

### VP-13 — Authority classification

A control path must state whether it is synthetic/demo or source-backed/authoritative-context.

### VP-14 — Provenance

Non-synthetic control-path versions require provenance sufficient to explain where the expectation came from.

### VP-15 — No hidden legal claim

A control path must not label a synthetic or inferred expectation as law, regulation, statute, or binding agency policy without corresponding authoritative source provenance.

---

## 20. Read Semantics for Later Reconciliation

T005 defines the data that later reconciliation will consume.

The later reconciliation layer should be able to retrieve:

```text
Applicable ExpectedControlPath version
→ ordered/dependent control steps
→ applicability decisions
→ candidate event mappings
→ evidence expectations
→ responsibility expectations
→ timing expectations
→ independence requirements
→ alternative branches
→ provenance
```

The retrieval operation must not itself create exceptions, signals, findings, or accusations.

---

## 21. Relationship to GovernmentEvent

The boundary is:

```text
ExpectedControlPath
        |
        | defines what is expected
        v
Control Step
        |
        | later evaluated against
        v
GovernmentEvent
        |
        v
ReconciliationResult
```

GovernmentEvent remains the source-backed observed record.

ExpectedControlPath remains the control expectation.

Neither one should be overwritten by the later reconciliation result.

---

## 22. Relationship to Detection

T005 is not a detection engine.

A later detection layer may consume reconciliation results and emit signals such as:

```text
MISSING_INFORMATION
SEQUENCE_EXCEPTION
TIMING_EXCEPTION
AUTHORITY_MISMATCH
INDEPENDENCE_GAP
OUTCOME_GAP
```

Those are downstream analytical outputs and must not be stored as ExpectedControlPath steps or expectations.

---

## 23. Security and Governance

Because control definitions can affect government review workflows, the implementation must preserve:

- who created a path;
- who approved it;
- when it became active;
- what source/provenance supports it;
- its classification;
- its version history.

A user with technical write access must not automatically gain authority to declare a path legally binding.

---

## 24. Implementation Boundary After Approval

### Allowed

- introduce typed ExpectedControlPath and ExpectedControlStep domain structures;
- add deterministic validation;
- add persistence for path definitions and versions;
- add provenance for path definitions;
- add synthetic path fixtures;
- add read/query methods required to retrieve an applicable path;
- add unit/integration tests.

### Forbidden

- reconciliation execution;
- matching GovernmentEvents to steps;
- anomaly detection;
- signal generation;
- case creation;
- accountability decisions;
- production legal-rule ingestion;
- AI-generated control authority;
- UI work;
- public exposure.

---

## 25. Acceptance Criteria

### AC-01 — Stable identity

The system can identify a logical control path independently of a particular version.

### AC-02 — Version preservation

Two materially different definitions can coexist historically without destructive overwrite.

### AC-03 — Applicability

A path can declare where/when it applies.

### AC-04 — Step structure

A path supports typed, required/optional/conditional control steps.

### AC-05 — Dependencies

A path supports explicit dependencies and rejects dependency cycles.

### AC-06 — Event mapping

A step can declare compatible existing GovernmentEvent types without introducing a second event vocabulary.

### AC-07 — Evidence expectations

A step can specify expected evidence without storing actual evidence as part of the definition.

### AC-08 — Responsibility

A step can declare responsibility and explicit independence constraints.

### AC-09 — Timing

A step can declare timing expectations without fabricating legal deadlines.

### AC-10 — Alternatives

A path can represent explicit alternative valid branches.

### AC-11 — Completion modes

A step declares how later reconciliation may determine satisfaction.

### AC-12 — Provenance

Non-synthetic paths retain provenance sufficient to explain the source of expectations.

### AC-13 — Synthetic safety

Synthetic/demo expectations are explicitly classified and cannot be presented as authoritative law by default.

### AC-14 — Historical selection

A later implementation can select the correct path version for a historical evaluation period.

### AC-15 — Boundary discipline

ExpectedControlPath definitions do not produce reconciliation results, signals, findings, or accusations.

---

## 26. Adversarial Test Matrix

| Case | Expected behavior |
|---|---|
| Same path key, same version defined twice | Reject duplicate identity |
| New material control requirement | Create new version, preserve prior version |
| Active path with zero steps | Reject |
| Duplicate step key | Reject |
| Step depends on unknown step | Reject |
| Dependency cycle | Reject |
| Conditional step without condition | Reject |
| Synthetic path labeled as law | Reject/require authoritative provenance |
| Step maps to unsupported event type | Reject |
| Two legitimate alternative branches explicitly declared | Accept |
| Alternative branch inferred only from observed behavior | Do not modify expectation automatically |
| Date-only timing rule | Preserve date precision |
| Contradictory timing constraints | Reject invalid definition |
| No provenance on non-synthetic path | Reject or keep non-authoritative depending on explicit status policy |
| Technical administrator creates path | Preserve governance metadata; do not infer legal authority |
| New version retires old version | Keep old version queryable for history |
| Applicable scope uncertain | Do not silently select universal path |
| Missing observed event | Leave to later reconciliation; do not mark the path as proof of absence |
| Detection signal exists later | Keep signal outside ExpectedControlPath |
| AI drafts a proposed step | Keep as proposal/AI-assisted provenance until accepted by human governance |

---

## 27. Definition of Done for T005 Specification

This specification is ready for implementation when review confirms:

1. the ExpectedControlPath boundary is clear;
2. it uses only repository-valid GovernmentEvent types;
3. expected versus observed semantics remain separate;
4. synthetic expectations cannot masquerade as law;
5. versioning and historical applicability are implementable;
6. dependency and alternative semantics are deterministic;
7. provenance requirements are explicit;
8. implementation scope does not leak into reconciliation or detection.

---

## 28. Next Task After Approval

After this specification is accepted, the next bounded engineering task is:

> **T006 — ExpectedControlPath domain, persistence, and validation implementation**

Use the engineering workflow:

```text
REQUIREMENT
→ DECOMPOSE
→ SPECIFY
→ DEFINE SCOPE
→ DEFINE GUARDRAILS
→ AI PLAN
→ HUMAN APPROVAL
→ AI IMPLEMENTS
→ VALIDATE
→ REVIEW
→ ACCEPT
```

Do not weaken tests or silently change semantics to make an edge case pass.
