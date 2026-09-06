# eGovTrace — GovernmentEvent and Event Lifecycle Specification v1

**Status:** Revised proposed engineering specification for review  
**Task:** T004 — GovernmentEvent operational specification  
**Product source of truth:** `docs/00-foundation/eGovTrace_Master_Product_Handoff.md`  
**Engineering source of truth:** `docs/00-foundation/eGovTrace_Master_Engineering_Prompt.md`  
**Architecture reference:** `docs/02-architecture/eGovTrace_Repository_and_Codebase_Architecture_v1.md`  
**API/event contract reference:** `specs/contracts/eGovTrace_API_and_Event_Contract_v1.md`  
**Implementation baseline:** `main` through T003.2 PostgreSQL persistence

---

## 1. Purpose

This specification defines the operational meaning, structure, lifecycle, validation rules, provenance requirements, and persistence expectations for `GovernmentEvent` in eGovTrace V1.

`GovernmentEvent` is the canonical normalized representation of a government-relevant occurrence or source-backed observation that can participate in control-path comparison, relationship analysis, evidence tracing, verification, and later accountability workflows.

The specification deliberately separates:

- source observation from normalized event;
- event identity from source-record identity;
- real-world/source events from internal domain messages;
- event occurrence time from observation, recording, and ingestion time;
- event status from observation-result conditions;
- event assertions from relationship assertions;
- event lineage from source revisions and ingestion attempts;
- event evidence/provenance from later analytical conclusions.

This document does not create reconciliation, detection, case, accountability, public-disclosure, or AI product behavior.

---

## 2. Scope and Non-Goals

### 2.1 In scope

T004 defines:

1. the canonical GovernmentEvent boundary;
2. canonical V1 event types;
3. minimum event structure and semantics;
4. source-observation capture;
5. normalization;
6. validation;
7. identity/reference resolution boundaries;
8. provenance and evidence linkage;
9. temporal precision;
10. idempotent ingestion;
11. correction and supersession lineage;
12. transactional persistence requirements;
13. failure and retry behavior;
14. security/classification expectations;
15. acceptance and adversarial tests.

### 2.2 Explicitly out of scope

This task does not implement:

- ExpectedControlPath;
- reconciliation rules;
- anomaly/detection rules;
- legal or administrative findings;
- case management;
- accountability decisions;
- graph traversal/storage beyond ordinary domain relationships;
- production government connectors;
- public disclosure policy;
- AI-generated findings or accusations.

Those capabilities consume GovernmentEvents later in the delivery sequence.

---

## 3. Governing Semantics

The following rules are mandatory.

### 3.1 Source authority

Source systems remain authoritative for the records they own. eGovTrace stores normalized representations, references, relationships, provenance, and workflow state; it does not replace the source system.

### 3.2 Connection is not corruption

An event or relationship may connect people, institutions, projects, contractors, payments, or other entities without implying misconduct.

### 3.3 Identifier recovery is not identifier proof

A recovered or matched identifier does not by itself prove that two source records represent the same real-world entity.

### 3.4 Not observed is not absent

A search or observation process that does not produce an event does not establish that the event did not occur.

### 3.5 Unavailable is not false

Inaccessible or unavailable source information must not become a negative fact.

### 3.6 Missing evidence is not proof of misconduct

An evidence gap may create a control or review signal later. It does not establish wrongdoing.

### 3.7 Financial states remain distinct

The event model must preserve:

```text
OBLIGATION
DISBURSEMENT
SETTLEMENT
```

A payment instruction, disbursement record, journal entry, or similar record must not automatically be represented as settlement.

### 3.8 Internal domain events are not GovernmentEvents

A transactional-outbox message such as `event.created` or `evidence.registered` records an eGovTrace state change. It is not itself proof that a real-world government event occurred. The API/event contract explicitly requires this separation. fileciteturn123file3L346-L368

### 3.9 AI output is not authoritative fact

AI may assist with extraction or candidate matching later, but an AI-generated suggestion must remain explicitly classified and must not silently become an authoritative event assertion.

---

## 4. Conceptual Flow

The canonical operational flow is:

```text
Source Observation
        ↓
Capture
        ↓
Normalize
        ↓
Validate
        ↓
Resolve / Link References
        ↓
Create GovernmentEvent
        ↓
Attach Provenance / Evidence
        ↓
Persist Transactionally
        ↓
Publish Internal Domain Message
        ↓
Downstream Consumers
        ├── Expected-vs-Observed Comparison
        ├── Detection
        ├── Verification
        ├── Accountability
        └── Permitted Public Projection
```

An internal domain message is downstream infrastructure. It is not a substitute for the GovernmentEvent itself.

---

## 5. Canonical Event Identity

### 5.1 Domain identifier

Every persisted GovernmentEvent has a stable eGovTrace domain identifier.

The domain identifier:

- is distinct from source-system identifiers;
- is opaque to business meaning;
- is never reused for an unrelated event;
- remains stable through non-destructive lineage changes.

### 5.2 Source observation identity

Each source-backed event must retain enough information to identify the source representation that caused the observation.

A source identity should include, where available:

- source system;
- native source record ID;
- source record type;
- source URI or locator;
- source revision/version;
- retrieval/capture time;
- access classification.

### 5.3 Records without native IDs

A source without a native record identifier must not force the normalizer to invent a business identifier.

At least one stable alternative is required, such as:

- canonical source locator;
- immutable source URL plus relevant version metadata;
- source-issued document/reference number;
- content or representation hash bound to the capture;
- connector-local immutable observation ID.

The implementation must distinguish a generated capture identifier from a source-issued identifier.

A locator or content hash can support idempotency and traceability; it does not prove real-world identity.

### 5.4 Idempotency key

Idempotency must be based on stable source-observation identity, not approximate text similarity.

The idempotency record must retain enough information to determine whether a replay is:

```text
SAME OBSERVATION
UPDATED SOURCE REPRESENTATION
DIFFERENT OBSERVATION
KEY COLLISION / INVALID REUSE
```

---

## 6. Canonical GovernmentEvent Structure

The normative conceptual structure is:

```text
GovernmentEvent
├── id
├── eventType
├── occurredAt?
├── observationAt
├── sourceRecordedAt?
├── institutionRef?
├── officeRef?
├── actorRef?
├── actorRole?
├── authorityRef?
├── legalBasisRef?
├── subjectRef(s)?
├── objectRef(s)?
├── projectRef?
├── programRef?
├── financialState?
├── amount?
├── currency?
├── geographicContext?
├── relatedEventRefs[]
├── evidenceRefs[]
├── sourceRefs[]
├── provenanceRefs[]
├── classification
├── assertionKind
├── observationState
├── confidence
├── eventVersion
├── supersedesEventRef?
├── supersededByEventRef?
├── payload
└── creation/update metadata
```

The existing TypeScript model may use its current property names, but the implementation must preserve these semantics. The current domain already has typed event fields for event type, occurrence time, source references, object, financial value, relationships, evidence, classification, status, assertion kind, confidence, and validity. fileciteturn128file0

### 6.1 Minimum event requirements

A persisted source-backed GovernmentEvent must have:

- a domain ID;
- a canonical event type;
- an observation time;
- enough temporal information to place the event in a sequence, unless the source genuinely cannot provide it;
- a source observation reference or explicitly classified non-source provenance;
- explicit assertion semantics;
- explicit observation/state semantics;
- classification;
- creation metadata.

### 6.2 Optionality

Not every event has an actor, project, program, location, financial amount, authority, or legal basis.

The absence of an optional field must not be converted into a negative assertion.

---

## 7. Canonical V1 Event Types

The canonical V1 event vocabulary must align with the already implemented domain event type rather than introducing a second incompatible enum.

The current domain defines:

```text
PROJECT_CREATED
BUDGET_APPROVED
PROCUREMENT_POSTED
CONTRACT_AWARDED
PAYMENT_OBLIGATED
PAYMENT_DISBURSED
PAYMENT_SETTLED
IMPLEMENTATION_REPORTED
VERIFICATION_RECORDED
```

These are therefore the initial canonical V1 GovernmentEvent types. fileciteturn128file0

### 7.1 Family mapping

| Canonical event type | Event family | Meaning |
|---|---|---|
| `PROJECT_CREATED` | PROJECT | Source-backed creation/recognition of a project representation |
| `BUDGET_APPROVED` | BUDGET | Source-backed budget approval/allocation observation |
| `PROCUREMENT_POSTED` | PROCUREMENT | Procurement posting/solicitation observation |
| `CONTRACT_AWARDED` | CONTRACT | Award/contract lifecycle observation as represented by source evidence |
| `PAYMENT_OBLIGATED` | PAYMENT | Obligation-stage financial event |
| `PAYMENT_DISBURSED` | PAYMENT | Disbursement-stage financial event |
| `PAYMENT_SETTLED` | PAYMENT | Settlement-stage financial event, only where supported by evidence |
| `IMPLEMENTATION_REPORTED` | PROJECT | Reported implementation/progress observation |
| `VERIFICATION_RECORDED` | VERIFICATION | Recorded inspection/verification observation |

### 7.2 Source vocabulary

Source-specific event codes remain source metadata. They may map to one canonical event type while preserving the original source vocabulary.

Do not create a new top-level event type solely because a source uses different wording.

### 7.3 Adding event types

A new GovernmentEvent type requires an explicit specification/ADR update and corresponding domain/test changes. It must not be added ad hoc inside a connector.

### 7.4 Evidence registration is not an event family

Evidence is a first-class domain object. An `evidence.registered` internal domain message is not itself a real-world GovernmentEvent. This follows the API/event contract's distinction between internal messages and real-world/source events. fileciteturn122file6L967-L996

---

## 8. Assertion Semantics

GovernmentEvent must not use analytical classifications that belong to downstream objects.

### 8.1 Allowed event assertion kinds

For T004, GovernmentEvent assertion kind is limited to:

```text
FACT
OBSERVATION
CLAIM
```

`DERIVED_RELATIONSHIP`, `SIGNAL`, and `FINDING` remain separate analytical/relationship concepts. The existing domain's broader `AssertionKind` union may continue to serve other domain objects, but GovernmentEvent ingestion must not use `SIGNAL` or `FINDING` to represent an event.

### 8.2 Meaning

- `FACT`: a source or competent authority explicitly asserts the relevant occurrence in its authoritative record context;
- `OBSERVATION`: eGovTrace records an observed source representation without claiming more than the source supports;
- `CLAIM`: a person/reporting process asserts the occurrence, but it remains unestablished.

A GovernmentEvent with `CLAIM` assertion must not be rendered as an established government record merely because it is persisted.

### 8.3 Derived representations

A system may create a derived event representation only when it has explicit derivation provenance. It must not silently convert a derived relationship or analytical signal into an established source event.

---

## 9. Observation State versus Event State

The previous review identified a critical distinction: `NOT_OBSERVED` and `UNAVAILABLE` describe observation conditions and must not be treated as if they were ordinary persisted real-world events.

### 9.1 Event persistence state

The current domain persistence state is:

```text
RECORDED
SUPERSEDED
```

A corrected historical representation is superseded, not silently erased. fileciteturn128file0

### 9.2 Observation outcome

The ingestion pipeline must separately represent the observation condition for a requested source observation:

```text
OBSERVED
NOT_OBSERVED
UNAVAILABLE
EXPLICITLY_ABSENT
NOT_APPLICABLE
```

These outcomes belong to the observation/search/control context, not automatically to GovernmentEvent itself.

### 9.3 Reported claim

A citizen, human operator, or other claimant may create a claim-backed event representation with:

```text
assertionKind = CLAIM
observation outcome = OBSERVED
```

Here `OBSERVED` means the claim was observed/received as a report. It does not mean the underlying real-world event was independently established.

### 9.4 Important semantic distinction

```text
No event returned by source search
        !=
Source explicitly states that event is absent
```

The implementation must retain which condition occurred and the scope of the search/observation.

---

## 10. Temporal Semantics

Time is multi-dimensional.

### 10.1 Distinct timestamps

Where available, preserve:

- `occurredAt`: when the underlying event is stated to have occurred;
- `observationAt`: when eGovTrace observed, retrieved, or received the representation;
- `sourceRecordedAt`: when the source says it recorded the event.

These timestamps must not be substituted for one another.

### 10.2 Temporal precision

The source's precision must be preserved.

Supported conceptual precision includes:

```text
YEAR
MONTH
DATE
DATETIME
INTERVAL
UNKNOWN
```

A date-only source must not become a fabricated midnight timestamp. Where the current TypeScript representation uses strings, the implementation must preserve the original precision through explicit metadata or a compatible temporal structure rather than guessing.

### 10.3 Contradictory times

When source records contain contradictory timestamps:

- preserve the source values;
- preserve the source references that supplied them;
- do not silently choose the most convenient timestamp;
- retain the contradiction for later review/reconciliation.

### 10.4 Sequence interpretation

Chronological ordering for downstream controls must use the strongest supported temporal value and preserve uncertainty where exact ordering cannot safely be established.

---

## 11. Entity and Reference Resolution

Identity resolution is a separate operation from event creation.

### 11.1 Resolution outcomes

A reference may be:

```text
CONFIRMED
CANDIDATE
UNRESOLVED
CONTESTED
```

### 11.2 Confirmation

A confirmed relationship requires an explicit evidentiary or authoritative basis appropriate to the relationship.

The existence of a high similarity score or a shared name is not sufficient by itself.

### 11.3 Event creation with unresolved references

A valid event may be persisted with an unresolved source reference when the event itself is otherwise sufficiently defined.

This permits future resolution without blocking unrelated lifecycle observations.

### 11.4 Identity confidence

Identity-resolution confidence must remain conceptually distinct from event confidence.

An implementation may reuse the existing `Confidence` type, but must not interpret event confidence as identity proof.

---

## 12. Provenance and Evidence

### 12.1 Mandatory traceability

Every source-backed event intended for durable downstream use must preserve an auditable provenance path.

The connector architecture requires source observations, provenance, identity/event reconciliation, and preservation of source authority. fileciteturn122file0L20-L55

### 12.2 Provenance categories

The implementation must distinguish at minimum:

```text
SOURCE_OBSERVATION
NORMALIZATION
DERIVATION
HUMAN_ADJUDICATION
AI_ASSISTANCE
SYNTHETIC_FIXTURE
```

These align with the existing domain provenance model. fileciteturn128file0

### 12.3 Evidence references

Evidence is referenced by identifier rather than copied wholesale into the event payload by default.

An event may have multiple evidence references.

### 12.4 Material derivation

A derived relationship or derived event must preserve:

```text
inputs
producer/process
production time
method/rule
provenance chain
remaining uncertainty
```

### 12.5 Provenance is not verification

A source locator proves origin of a representation. It does not by itself prove that a human investigator independently verified the underlying real-world occurrence.

---

## 13. Event Lifecycle

### Stage 1 — Source observation

A source system, authorized operator, approved integration, or reporting process produces a representation.

Output:

```text
SourceObservation
```

### Stage 2 — Capture

The observation is captured with source identity, capture time, process identity, and integrity metadata where feasible.

### Stage 3 — Normalize

Source-specific fields and vocabulary are mapped to the canonical eGovTrace event structure.

Normalization must preserve source-native values.

### Stage 4 — Validate

The candidate is checked for structural and semantic validity, including temporal coherence, financial-state consistency, permissible assertion kind, and provenance requirements.

### Stage 5 — Resolve / link

Entity and event references are resolved where possible. Ambiguity is preserved.

### Stage 6 — Create GovernmentEvent

The valid candidate receives its stable domain identity and canonical event type.

### Stage 7 — Attach provenance and evidence

Required source, provenance, and evidence references are associated with the event before downstream publication.

### Stage 8 — Persist transactionally

The event and mandatory metadata are persisted within the required transaction boundary.

### Stage 9 — Emit internal domain message

After durable persistence, the system may emit an internal event such as:

```text
event.created
```

through the transactional outbox. This message is an eGovTrace implementation event, not a second GovernmentEvent representing the real-world occurrence. fileciteturn122file6L967-L996

### Stage 10 — Downstream use

Only durable GovernmentEvents are eligible for normal downstream control workflows.

---

## 14. Validation Rules

### 14.1 Structural validity

Reject a candidate when mandatory structural requirements cannot be satisfied.

### 14.2 Event-type validity

A connector may not invent a new canonical event type inside its own mapping logic.

### 14.3 Financial validity

The event type and financial state must agree.

For example:

```text
PAYMENT_OBLIGATED → OBLIGATION
PAYMENT_DISBURSED → DISBURSEMENT
PAYMENT_SETTLED → SETTLEMENT
```

No transition may be inferred solely from a generic source label such as “payment.”

### 14.4 Assertion validity

The following are prohibited without explicit transformation/adjudication semantics:

```text
AI suggestion → FACT
CLAIM → established FACT
SIGNAL → GovernmentEvent FACT
FINDING → GovernmentEvent FACT
```

### 14.5 Referential validity

References must either resolve, remain explicit unresolved references, or cause rejection where the event type makes the reference structurally mandatory.

### 14.6 Temporal validity

Reject or quarantine impossible internal combinations only when the ambiguity cannot be represented safely. Otherwise preserve the original values and flag the contradiction for later review.

### 14.7 Source preservation

Normalization must never discard the source-native identifier, source vocabulary, or relevant source locator when those values are available and lawfully retained.

---

## 15. Corrections, Versions, and Historical Lineage

Three concepts must remain distinct:

```text
SOURCE REVISION
INGESTION ATTEMPT
EGOVTRACE EVENT LINEAGE / VERSION
```

### 15.1 Source revision

A source may revise a record. The later observation must identify the relevant source revision/version when available.

### 15.2 Ingestion attempt

A retry or duplicate delivery is not automatically a new event version.

### 15.3 Event version

A material correction to the normalized representation creates a new event version or successor representation while preserving lineage.

Conceptually:

```text
GovernmentEvent v1
      ↓ superseded by
GovernmentEvent v2
```

### 15.4 Supersession

The implementation must be able to identify:

- what earlier representation was superseded;
- what source observation caused the change;
- when the change was observed;
- what representation is current.

The current domain already models `SUPERSEDED` as a GovernmentEvent lifecycle state; T004 implementation must add explicit lineage semantics rather than using destructive rewriting. fileciteturn128file0

### 15.5 No retroactive erasure

An earlier observation must not disappear merely because a source later corrected itself.

---

## 16. Transactional Persistence Contract

T003.2 established PostgreSQL, typed persistence, transactions, idempotency, optimistic concurrency, and transactional outbox metadata as the V1 persistence foundation.

T004 must use those capabilities rather than inventing a second persistence mechanism.

### 16.1 Minimum atomic unit

Where the operation creates a durable source-backed event, the transaction must coordinate:

```text
GovernmentEvent
+ mandatory source reference(s)
+ mandatory provenance reference(s)
+ mandatory evidence links, if required by the event contract
+ idempotency record
+ outbox record
```

The exact table-level implementation remains a database concern, but no downstream consumer may observe a successful event creation that has permanently lost its mandatory provenance or idempotency record.

### 16.2 Rollback

If any mandatory operation fails:

```text
ROLLBACK
→ no false success
```

A retry must be safe through the same idempotency contract.

### 16.3 Concurrency

Concurrent updates to the same event lineage must use the optimistic concurrency/version mechanism established by the persistence layer.

No silent last-write-wins behavior is permitted for material historical corrections.

---

## 17. Idempotency and Retry Behavior

The existing API/event contract establishes retryable mutation idempotency semantics: same key plus same semantic payload returns the original result; same key plus different semantic payload is a key-reuse conflict. fileciteturn122file6L894-L933

T004 applies the same principle to source observation ingestion.

### 17.1 Required behavior

```text
same source observation + retry
→ same logical event lineage

same source observation + network retry
→ no duplicate event

different source records + similar content
→ remain distinct unless an explicit resolution process links them

same source identity + materially changed source revision
→ new observation/version lineage, not duplicate ingestion
```

### 17.2 Failure retries

Retries must not duplicate:

- GovernmentEvents;
- evidence links;
- provenance records;
- domain outbox messages representing the same mutation.

---

## 18. Failure Handling

### 18.1 Capture failure

The observation remains unaccepted; no durable GovernmentEvent success is reported.

### 18.2 Normalization failure

Quarantine or reject the candidate. Do not guess missing values merely to create an event.

### 18.3 Validation failure

Return structured validation failure information identifying the violated invariant.

### 18.4 Resolution uncertainty

Persist a valid event with unresolved references where permitted. Do not manufacture confirmed identities.

### 18.5 Provenance failure

A source-backed event missing mandatory provenance must not become downstream-ready until provenance is repaired or the event is explicitly classified as non-source/derived under a valid policy.

### 18.6 Source unavailable

Record the observation condition as `UNAVAILABLE` in the observation/search context. Do not emit a false `ABSENT` GovernmentEvent.

### 18.7 Source search returned no result

Record `NOT_OBSERVED` for the defined search scope. Do not create a synthetic `ABSENT` event unless the source explicitly establishes absence.

### 18.8 Database failure

Rollback and retry through the idempotent path. Do not emit success before durable commit.

---

## 19. Security and Classification

GovernmentEvents may expose sensitive operational information.

The event lifecycle must provide explicit paths for:

- classification;
- source sensitivity;
- authorization-aware retrieval;
- sensitive-access audit logging.

Technical connector access does not itself grant authority to ingest, retain, or expose restricted information. The source connector architecture expressly requires lawful access, data classification, public/restricted separation, and purpose limitation. fileciteturn123file0L78-L96

Public projections must remain separate from the internal assurance representation.

---

## 20. Observability

The event lifecycle should expose operational telemetry sufficient to diagnose ingestion behavior without unnecessarily replicating sensitive source payloads.

Recommended dimensions:

- source system;
- connector/process;
- canonical event type;
- lifecycle stage;
- result;
- latency;
- validation error class;
- idempotency outcome;
- persistence outcome;
- correlation ID where available.

Logs must not contain secrets or unnecessary sensitive payload content.

---

## 21. Implementation Boundary After T004 Approval

### 21.1 Allowed

- reconcile/harden the existing GovernmentEvent domain type;
- add event lifecycle commands/use cases;
- add source-observation input structures;
- add persistence methods needed for event creation and lineage;
- add idempotency handling;
- add source/provenance/evidence linkage;
- add deterministic validation;
- add unit/integration tests;
- add small synthetic fixtures.

### 21.2 Forbidden

Do not include in T004 implementation:

- ExpectedControlPath implementation;
- reconciliation engine;
- detection rules;
- case workflow;
- graph engine;
- government UI;
- public UI;
- production connector rollout;
- AI reasoning features;
- unrelated schema redesign.

Any scope expansion requires a separate specification or explicit task change.

---

## 22. Acceptance Criteria

### AC-01 — Canonical creation

A valid normalized observation becomes one durable GovernmentEvent with a stable domain ID.

### AC-02 — Existing domain alignment

The implementation uses one canonical event-type vocabulary and does not introduce a second incompatible GovernmentEvent enum.

### AC-03 — Source traceability

A reviewer can identify the source system and source representation that produced a source-backed event.

### AC-04 — Observation-state separation

`NOT_OBSERVED`, `UNAVAILABLE`, `EXPLICITLY_ABSENT`, and a persisted GovernmentEvent are represented distinctly.

### AC-05 — Assertion separation

GovernmentEvent ingestion does not use `SIGNAL` or `FINDING` as event assertions.

### AC-06 — Temporal precision

Source date-only and timestamp values remain distinguishable; unsupported precision is never fabricated.

### AC-07 — Financial-state separation

Obligation, disbursement, and settlement remain distinct.

### AC-08 — Identity ambiguity

Candidate/unresolved identity links remain distinguishable from confirmed links.

### AC-09 — Provenance

Material source-backed events retain source/provenance references sufficient for later explanation.

### AC-10 — Idempotency

Retrying one source observation does not create a duplicate logical event lineage.

### AC-11 — Revision lineage

A material source correction can be represented without deleting the earlier observation lineage.

### AC-12 — Transactional durability

A failed transaction does not produce a false successful ingestion or a permanently downstream-ready partial event.

### AC-13 — Internal versus real-world event separation

`event.created` and other transactional-outbox messages cannot be mistaken for GovernmentEvents representing real-world occurrences.

### AC-14 — Determinism

Identical source observations under the same mapping/version configuration produce identical canonicalization outcomes.

### AC-15 — No hidden conclusion

Event ingestion never creates a corruption finding, legal conclusion, or automatic accusation.

### AC-16 — Tests

Tests cover normal creation, duplicate delivery, changed source revision, missing source identity, no-result search, unavailable source, explicit absence, unresolved identity, payment-state distinctions, temporal precision, provenance failure, rollback, and internal-event/real-world-event separation.

---

## 23. Adversarial Test Matrix

| Case | Expected behavior |
|---|---|
| Same source record received twice | One logical event lineage; second delivery is idempotent |
| Same source record with new source revision | New observation/version lineage; prior lineage preserved |
| Two different records with identical text | Do not merge solely on text similarity |
| Source has no native record ID | Require another stable observation identity or explicit non-idempotent handling |
| Connector cannot access source | Observation context is `UNAVAILABLE`; never infer `ABSENT` |
| Search yields no result | Observation context is `NOT_OBSERVED`; not an absence fact |
| Source explicitly states no event occurred | `EXPLICITLY_ABSENT` may be represented when authoritative for the scope |
| Human submits a report | Persistable as `CLAIM`; not established fact |
| AI suggests contractor identity | Candidate/assisted resolution; not automatic confirmation |
| Payment instruction exists | Do not represent settlement without settlement-supporting evidence |
| Settlement evidence exists | `PAYMENT_SETTLED` may be created when the evidence supports settlement |
| Timestamp contains date only | Preserve date precision; do not invent time-of-day |
| Conflicting source timestamps | Preserve source values and contradiction for later review |
| Possible person match | Candidate/unresolved; no silent confirmation |
| Event has no project | Allow unless project is explicitly mandatory for that event type |
| Event relationship added | Basis/provenance remains available |
| Mandatory provenance missing | Reject/quarantine or non-downstream state; never silently treat as authoritative |
| Database commit fails | Rollback; no success result; safe retry |
| Outbox write fails | Transaction must not leave a durable event that cannot satisfy the required transactional publication contract |
| `event.created` emitted | Treat as internal eGovTrace message, never as proof of a real-world occurrence |
| Detection signal later references event | Keep signal as downstream analytical object, not an event assertion |
| Finding later references event | Keep finding as downstream human/official conclusion, not an event assertion |

---

## 24. Definition of Done

T004 is complete when:

1. this revised specification is accepted;
2. GovernmentEvent semantics are reconciled with the existing domain implementation;
3. the observation-state boundary is explicit;
4. the canonical event-type vocabulary is fixed for V1;
5. source identity and idempotency semantics are implementable;
6. temporal precision and revision lineage are implementable;
7. the transactional boundary is explicit enough for implementation;
8. automated tests are defined against the acceptance matrix;
9. the implementation scope remains limited to GovernmentEvent lifecycle behavior.

---

## 25. Next Engineering Task

After acceptance, implement:

> **T004 — GovernmentEvent lifecycle and persistence behavior**

Use the Hands-On Fintech workflow:

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

Do not weaken tests or silently alter semantics to make an edge case pass.

---

## 26. Traceability

This specification is subordinate to the Master Product Handoff and Master Engineering Prompt.

It is aligned with the existing repository architecture, the existing GovernmentEvent domain model, the source connector/data-boundary architecture, and the versioned API/event contract.

The API/event contract requires domain events to remain distinct from real-world/source events, preserves idempotency and optimistic concurrency, requires provenance for derived outputs, and explicitly treats missing evidence as a gap rather than a negative fact. fileciteturn122file6L894-L996

The Master Engineering Prompt establishes GovernmentEvent as the normalized temporal spine and requires the observed-event pipeline to retain source/provenance metadata and distinguish uncertainty rather than forcing binary conclusions. fileciteturn122file1L127-L149

The source connector architecture requires source authority to remain external, historical observations to be snapshot-preservable, and identity bridges to remain explicit rather than silently promoting fuzzy matches. fileciteturn123file0L78-L96
