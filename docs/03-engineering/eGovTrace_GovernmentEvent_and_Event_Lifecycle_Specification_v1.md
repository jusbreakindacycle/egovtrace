# eGovTrace — GovernmentEvent and Event Lifecycle Specification v1

**Status:** Proposed engineering specification for review  
**Task:** T004 — GovernmentEvent operational specification  
**Product source of truth:** `docs/00-foundation/eGovTrace_Master_Product_Handoff.md`  
**Engineering source of truth:** `docs/00-foundation/eGovTrace_Master_Engineering_Prompt.md`  
**Architecture reference:** `docs/02-architecture/eGovTrace_Repository_and_Codebase_Architecture_v1.md`  
**Implementation baseline:** `main` through T003.2 PostgreSQL persistence

---

## 1. Purpose

This specification defines the operational meaning, structure, lifecycle, validation rules, provenance requirements, and persistence expectations for `GovernmentEvent` in eGovTrace V1.

`GovernmentEvent` is the canonical normalized record of an observed, reported, derived, or otherwise explicitly classified government-relevant occurrence that can participate in control-path comparison, graph relationships, evidence tracing, verification, and accountability workflows.

This document does **not** create a new product concept. It operationalizes the already approved event boundary so that the implementation can proceed consistently.

The specification deliberately separates:

- the **source observation** from the normalized eGovTrace event;
- the **event** from the entity or object involved;
- the **event status** from the conclusion about that event;
- the **event provenance** from the event payload;
- the **event occurrence time** from the time eGovTrace received or processed it;
- the **event** from later reconciliation, detection, verification, or finding outcomes.

---

## 2. Scope

### 2.1 In scope

V1 defines:

1. the canonical `GovernmentEvent` boundary;
2. minimum event fields and semantics;
3. event categories and event-type conventions;
4. lifecycle states from source observation through persistence;
5. normalization and validation responsibilities;
6. entity-resolution and relationship-linking behavior;
7. provenance and evidence requirements;
8. idempotent ingestion behavior;
9. temporal semantics;
10. handling of uncertainty and missing information;
11. event correction and supersession behavior;
12. read/write boundaries between domain, database, and future API layers;
13. acceptance criteria and adversarial cases for implementation.

### 2.2 Explicitly out of scope

This task does **not** implement:

- reconciliation rules;
- anomaly/detection rules;
- legal findings;
- case management;
- accountability decisions;
- AI-generated conclusions;
- a graph database;
- source-system replacement;
- broad production connectors;
- public disclosure policy.

Those capabilities consume GovernmentEvents later in the delivery sequence.

---

## 3. Governing Principles

The implementation must preserve the following rules from the approved product and architecture direction.

### 3.1 Connection is not corruption

An event may connect a person, institution, contractor, project, payment, or other entity without implying misconduct.

### 3.2 Identifier recovery is not identifier proof

A source identifier recovered through normalization, matching, or investigation is not automatically proof that two records represent the same real-world entity.

### 3.3 Not observed is not absent

Failure to observe an event is not proof that the event did not occur.

### 3.4 Unavailable is not false

Unavailable source information must not be converted into a negative factual assertion.

### 3.5 Event evidence is not legal conclusion

Evidence attached to an event supports traceability. It does not by itself establish a legal finding.

### 3.6 Payment states remain distinct

An event involving a financial transaction must not silently collapse:

```text
OBLIGATION
DISBURSEMENT
SETTLEMENT
```

into one generic “paid” state.

### 3.7 AI assistance is not authoritative fact

AI may assist later with extraction, matching, summarization, or explanation, but AI output must remain explicitly classified and must not be stored as an authoritative fact without appropriate human/source grounding.

### 3.8 Historical state matters

The event record must preserve the relevant time dimensions so that later investigations can reconstruct what was known, observed, or asserted at a particular time.

---

## 4. Conceptual Model

The canonical ingestion path is:

```text
Source Observation
    ↓
Capture / Ingestion
    ↓
Normalization
    ↓
Validation
    ↓
Entity Resolution / Linking
    ↓
GovernmentEvent
    ↓
Provenance + Evidence Association
    ↓
Persistence
    ↓
Relationship Linking
    ↓
Downstream Consumers
    ├── Expected-vs-Observed Comparison
    ├── Detection
    ├── Verification
    ├── Accountability
    └── Permitted Public Projection
```

The event itself is the normalized operational unit. Source records remain authoritative in their originating systems.

---

## 5. Event Identity

### 5.1 eGovTrace event identifier

Every persisted `GovernmentEvent` must have a stable, system-generated domain identifier.

This identifier:

- is distinct from every source-system record identifier;
- is opaque to business meaning;
- must remain stable for the lifetime of the event lineage;
- must not be reused for an unrelated event.

### 5.2 Source identity

An event may reference one or more source observations. Each source reference must preserve, where available:

- source system;
- source record identifier;
- source record type;
- source URI/location when permitted;
- source version or revision when available;
- retrieval/capture metadata;
- provenance classification.

### 5.3 Idempotency identity

The ingestion layer must support an idempotency key derived from a source event identity or another explicitly defined stable source fingerprint.

The same observation replayed by the same source with the same source identity must not silently create duplicate GovernmentEvents.

An implementation must not use approximate text similarity as the sole idempotency key.

---

## 6. GovernmentEvent Structure

The implementation must preserve a typed structure equivalent to the following conceptual model.

```text
GovernmentEvent
├── id
├── eventType
├── occurredAt
├── observedAt
├── recordedAt
├── institutionRef
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
├── status
├── confidence?
├── assertionKind
├── payload
├── createdAt
├── updatedAt
├── supersedesEventRef?
├── supersededByEventRef?
└── metadata
```

The exact TypeScript property names may follow the existing domain implementation, but the semantics above are normative for V1.

### 6.1 Required core fields

At minimum, every GovernmentEvent must have:

- `id`;
- `eventType`;
- a time basis sufficient to place the event in sequence;
- an explicit `status`;
- an explicit `assertionKind`;
- source/provenance linkage sufficient to explain where it came from, unless the event is intentionally created as a clearly classified derived system event;
- creation metadata.

### 6.2 Event time dimensions

Where information exists, preserve:

- `occurredAt`: when the underlying event occurred;
- `observedAt`: when eGovTrace or an observer observed/retrieved the underlying event;
- `recordedAt`: when the source system recorded it.

These values are not interchangeable.

If the source provides only a date rather than a timestamp, the implementation must preserve the available precision rather than inventing a precise timestamp.

### 6.3 Actor and institutional context

The event should identify, where known:

- institution;
- office;
- actor/person;
- actor role;
- authority;
- legal basis.

Unknown values should remain unknown or unavailable rather than being fabricated.

### 6.4 Subject and object

Events may refer to one or more domain entities. Examples include:

- a budget allocated to a project;
- a procurement conducted by an office;
- a contract awarded to a contractor;
- a payment obligation/disbursement/settlement involving a contractor;
- a verification performed for a project.

The event must not require every possible relationship field to be populated.

### 6.5 Financial context

Where an event carries a financial amount, preserve:

- amount;
- currency;
- financial lifecycle/state where applicable;
- source basis;
- temporal context.

A source record saying that a payment instruction was issued must not be normalized as `SETTLEMENT` unless the source evidence supports settlement.

### 6.6 Geographic context

Geographic fields are contextual. Their absence does not invalidate an otherwise valid event unless a future control specifically requires geography.

### 6.7 Payload

The event may contain structured event-specific attributes. Payload extensions must not undermine the canonical semantics of the core fields.

Event-specific fields should be typed and versionable where practical.

---

## 7. Event Types

V1 should remain intentionally narrow. Initial normalized event families are:

| Event family | Purpose | Typical examples |
|---|---|---|
| `BUDGET` | Financial authorization/allocation context | budget allocation, obligation record |
| `PROCUREMENT` | Procurement lifecycle observation | posting, bid opening, award |
| `CONTRACT` | Contract lifecycle observation | execution, amendment, termination |
| `PAYMENT` | Financial lifecycle observation | obligation, disbursement, settlement evidence |
| `PROJECT` | Project/implementation observation | project start, milestone, completion evidence |
| `VERIFICATION` | Verification/inspection observation | site inspection, documentary verification |
| `EVIDENCE` | Evidence capture/registration event | document capture, evidence intake |

Additional event types may be added only through an explicit specification/ADR update.

### 7.1 Event type versus payload subtype

Use `eventType` for the stable top-level operational family. Use typed subtype fields inside the payload for narrower semantics where needed.

Do not create dozens of top-level event types merely to encode source-system vocabulary.

### 7.2 Source vocabulary mapping

Source-specific event codes remain source metadata. Normalization should map them into eGovTrace's canonical vocabulary while preserving the original source value.

---

## 8. Assertion and Status Semantics

GovernmentEvent must not use one status field to represent every kind of uncertainty.

### 8.1 Assertion kind

The event should retain the semantic class of the assertion, including as applicable:

```text
FACT
OBSERVATION
DERIVED_RELATIONSHIP
CLAIM
SIGNAL
FINDING
```

For ingestion of external records, `FACT` must be used carefully: it should refer to a fact asserted by a sufficiently authoritative source in the relevant context, not an unverified inference made by eGovTrace.

### 8.2 GovernmentEvent status

Supported operational statuses include:

```text
OBSERVED
NOT_OBSERVED
ABSENT
UNAVAILABLE
REPORTED
DERIVED
CONTESTED
```

Definitions:

- `OBSERVED`: an observation was obtained and accepted as an observed event representation;
- `NOT_OBSERVED`: the relevant source/search/observation process did not produce evidence of the event within the defined observation scope;
- `ABSENT`: the source or control context explicitly establishes absence;
- `UNAVAILABLE`: the expected information could not be obtained or was not accessible;
- `REPORTED`: a claim/report exists, but has not been established as an observed fact;
- `DERIVED`: eGovTrace derived the event/relationship from other evidence or events;
- `CONTESTED`: the event or assertion is disputed and the dispute is material to interpretation.

The implementation must not convert between these states implicitly.

---

## 9. Provenance and Evidence

### 9.1 Provenance is mandatory for material events

Every persisted event that contributes to reconciliation, detection, verification, accountability, or public projection must be traceable to its source/provenance basis.

### 9.2 Provenance categories

The implementation must support the existing provenance model and distinguish, at minimum, provenance arising from:

- source records;
- human observation/input;
- system transformation;
- derived relationships;
- AI assistance when used.

### 9.3 Evidence references

Evidence references must identify the evidence object without copying large source documents into the event record by default.

An event may have multiple evidence references.

### 9.4 Material derivation

If an event or relationship is derived from other events, the derivation must preserve enough provenance to answer:

```text
What inputs produced this event?
Who/what produced it?
When was it produced?
What transformation or rule was used?
What uncertainty remains?
```

### 9.5 Provenance does not equal verification

A source reference shows origin. It does not automatically mean a human investigator verified the underlying claim.

---

## 10. Event Lifecycle

The lifecycle is divided into operational stages.

### Stage 1 — Source observation

A source system, human operator, external record, or approved integration exposes an observation.

Output:

```text
SourceObservation
```

This may still use source-native structures.

### Stage 2 — Capture

The observation is received or recorded with ingestion metadata.

Required characteristics:

- source identity;
- source record identity where available;
- capture time;
- connector/process identity;
- raw/reference integrity metadata where feasible.

### Stage 3 — Normalize

Source vocabulary and shape are mapped to eGovTrace canonical semantics.

Normalization must preserve source-native values rather than destroy them.

### Stage 4 — Validate

The normalized candidate is checked against structural and domain invariants.

Examples:

- required identifiers present;
- timestamps valid and internally coherent where possible;
- financial amount/currency coherent;
- referenced entities use valid eGovTrace identifiers or explicit unresolved-reference structures;
- status/assertion combinations allowed;
- provenance requirements satisfied.

### Stage 5 — Entity resolution / linking

The system attempts to associate source references with eGovTrace entities.

This process may yield:

```text
CONFIRMED LINK
POSSIBLE LINK
UNRESOLVED
CONTESTED LINK
```

The event must not silently promote a possible link to a confirmed identity.

### Stage 6 — GovernmentEvent creation

A validated candidate becomes a canonical GovernmentEvent.

The event receives:

- stable domain ID;
- canonical event type;
- normalized fields;
- status/assertion classification;
- provenance/evidence references;
- source references;
- timestamps and metadata.

### Stage 7 — Persist

The event and its associated references are persisted transactionally according to the database boundary.

If persistence fails, the ingestion operation must not report success as though the event were durable.

### Stage 8 — Relationship linking

Relationships to other events and entities may be attached when supported by source evidence, deterministic rules, or explicitly classified derivation.

### Stage 9 — Downstream use

Only persisted events are eligible for normal downstream workflows.

Examples:

```text
GovernmentEvent
    ↓
ExpectedControlPath comparison
    ↓
ReconciliationResult
    ↓
DetectionSignal
    ↓
Case / Verification
```

GovernmentEvent itself does not perform those downstream decisions.

---

## 11. Validation Rules

### 11.1 Structural validity

An event is invalid when required structural fields cannot be satisfied.

### 11.2 Temporal validity

The implementation must reject impossible internal temporal states where the source explicitly contradicts itself and no uncertainty field can correctly represent the ambiguity.

Examples requiring review rather than silent correction:

- amendment recorded before contract creation when source timestamps are authoritative;
- settlement timestamp earlier than the asserted underlying obligation without supporting explanation;
- event `occurredAt` with unsupported precision fabricated by the normalizer.

### 11.3 Referential validity

Referenced entities and events must either:

- resolve to valid domain IDs;
- remain explicit unresolved source references;
- or be rejected when the relationship is mandatory for the event type.

### 11.4 Financial validity

The system must not infer settlement from a generic payment label.

Financial state must follow evidence.

### 11.5 Status validity

Examples of invalid semantic coercion:

```text
UNAVAILABLE → ABSENT
NOT_OBSERVED → ABSENT
REPORTED → OBSERVED
AI-generated suggestion → FACT
POSSIBLE ENTITY MATCH → CONFIRMED ENTITY
```

These transitions require explicit evidence and/or a defined human/system action.

### 11.6 Provenance validity

An event intended for durable downstream use must retain an auditable provenance path.

### 11.7 Duplicate validity

Exact source-identity replay must be idempotent.

Distinct source observations that happen to look similar must not be merged solely because their textual contents are similar.

---

## 12. Entity Resolution Rules

Entity resolution is a separate concern from event creation, even though the two may execute in one ingestion workflow.

### 12.1 Confidence does not equal identity proof

Confidence expresses the strength of a candidate association. It is not a legal or factual determination of identity.

### 12.2 Supported resolution outcomes

```text
CONFIRMED
CANDIDATE
UNRESOLVED
CONTESTED
```

### 12.3 Evidence basis

A confirmed relationship must be supported by an explicit evidentiary or authoritative basis appropriate to the relationship.

### 12.4 Ambiguity preservation

When two possible people, offices, contractors, or projects cannot be safely distinguished, preserve the ambiguity.

Do not select the most likely candidate merely to simplify downstream queries.

---

## 13. Relationship Semantics

GovernmentEvent may reference other events, entities, evidence, and sources.

Examples include:

```text
EVENT A --PRECEDES--> EVENT B
EVENT A --RELATES_TO--> EVENT B
EVENT A --SUPPORTED_BY--> EVIDENCE
EVENT A --REFERS_TO--> ENTITY
EVENT A --DERIVED_FROM--> EVENT B
```

A relationship that materially affects an investigation must preserve its basis/provenance.

The graph layer may later expose these relationships as typed edges. The GovernmentEvent specification does not require a separate graph store.

---

## 14. Corrections, Updates, and Historical Lineage

GovernmentEvents are historical control records. Important corrections must remain explainable.

### 14.1 Do not erase historical meaning

When a source record changes, the implementation must preserve enough lineage to determine:

- what was originally observed;
- what changed;
- when the change was observed;
- which source/version caused the change;
- what current representation supersedes the earlier one.

### 14.2 Supersession

Where appropriate, a corrected event may supersede an earlier event representation.

Conceptually:

```text
Event v1
   ↓ superseded by
Event v2
```

This is preferable to destructive rewriting when the change is material to auditability.

### 14.3 Source correction versus eGovTrace correction

The source of authority may correct its record. eGovTrace should record that source change through a new observation/update lineage rather than pretending the historical eGovTrace observation never existed.

---

## 15. Unavailable and Missing Data

The ingestion model must distinguish among:

```text
UNKNOWN
UNAVAILABLE
NOT_OBSERVED
NOT_APPLICABLE
EXPLICITLY_ABSENT
```

Only the states actually supported by the evidence should be emitted.

Missing fields should not automatically block persistence unless the field is structurally or semantically required for that event type.

This matters because later reconciliation must be able to tell the difference between:

```text
No evidence found
vs.
Evidence inaccessible
vs.
Evidence explicitly says no
```

---

## 16. Derived and System-Generated Events

Not every event must originate directly from a government source record.

A system-generated event is permitted when it is explicitly classified as derived and has provenance linking it to its inputs.

Examples might include:

- a normalized relationship event;
- an ingestion observation event;
- a system-generated reconciliation-support event.

However, derived events must not masquerade as source facts.

A future implementation should avoid generating system events solely to make timelines appear complete.

---

## 17. Transactional Persistence Requirements

The PostgreSQL persistence boundary established in T003.2 must provide the durability guarantees needed by this specification.

At minimum, creation of a GovernmentEvent and its required source/provenance/evidence references should be coordinated so that downstream readers cannot observe a permanently persisted event that lacks mandatory supporting metadata.

Where multiple database operations are required, use one transaction where atomicity is required.

The ingestion flow must support safe retry behavior.

A failed transaction must not create a false appearance of successful event ingestion.

---

## 18. Read Model Expectations

The event persistence shape is not automatically the API shape.

Future API consumers should receive read models appropriate to their use case, such as:

```text
EventSummary
EventDetail
EventTimelineItem
EventEvidenceBundle
EventRelationshipView
```

The API layer must not expose sensitive source material merely because it is reachable from the database.

---

## 19. Security and Classification

GovernmentEvents may carry sensitive operational information. Classification must be explicit.

At minimum, the implementation must provide a path for:

- data classification;
- source sensitivity;
- authorization-aware retrieval;
- audit logging for sensitive access.

Event ingestion must not bypass authorization because the source connector is technically able to retrieve the information.

---

## 20. Failure Handling

Failures must be explicit and diagnosable.

### 20.1 Normalization failure

If source data cannot be safely normalized:

```text
RECEIVED
→ REJECTED / QUARANTINED
```

Do not create a misleading event with guessed values.

### 20.2 Validation failure

Return structured validation errors that identify the failed invariant.

### 20.3 Entity-resolution uncertainty

Persist the event with unresolved references where the event itself is sufficiently valid, rather than blocking unrelated future work.

### 20.4 Persistence failure

Treat the operation as failed and retry through the defined idempotent path.

### 20.5 Provenance failure

If required provenance cannot be established, the event should not be promoted to a normal downstream-ready state.

### 20.6 Source unavailability

Record source unavailability as an observation condition rather than as evidence that the underlying event is absent.

---

## 21. Concurrency and Retry Semantics

The implementation must be safe under at-least-once delivery assumptions.

Two identical deliveries of one source observation must converge on one logical GovernmentEvent lineage.

Concurrent updates must honor the optimistic concurrency mechanism established in the database boundary.

A retried request must not accidentally:

- duplicate payments;
- duplicate contracts;
- duplicate evidence references;
- duplicate event records;
- advance a historical event to an incorrect later state.

---

## 22. Observability Requirements

The event lifecycle implementation should emit operational telemetry sufficient to diagnose failures without exposing sensitive payloads unnecessarily.

Recommended dimensions:

- source system;
- connector/process;
- event family;
- lifecycle stage;
- result (`accepted`, `rejected`, `quarantined`, `duplicate`, `failed`);
- latency;
- validation error class;
- idempotency outcome.

Logs must not include secrets or unnecessarily replicate sensitive source payloads.

---

## 23. Initial Implementation Boundary

The next implementation task after approval of this specification should implement only the GovernmentEvent operational layer.

### 23.1 Allowed scope

- harden/extend existing domain GovernmentEvent semantics;
- define event lifecycle commands/use cases;
- add persistence methods required for event records;
- add source/provenance/evidence linkage needed for event persistence;
- add idempotent ingestion behavior;
- add focused unit/integration tests;
- add minimal demo fixtures if required for tests.

### 23.2 Forbidden scope

Do not include in the same task:

- reconciliation engine;
- detection rules;
- graph traversal engine;
- case management UI;
- public UI;
- authentication productization;
- broad external connectors;
- AI features;
- unrelated schema refactors.

Scope creep must require a separate task/specification.

---

## 24. Acceptance Criteria

The GovernmentEvent implementation is acceptable only if all of the following are demonstrable.

### AC-01 — Canonical event creation

A valid normalized source observation can be converted into a persisted GovernmentEvent with a stable domain ID.

### AC-02 — Source traceability

A reviewer can identify which source system and source record produced the event, where such information exists.

### AC-03 — Temporal distinction

The implementation preserves occurrence/observation/recording time distinctions when available.

### AC-04 — Status semantics

`UNAVAILABLE`, `NOT_OBSERVED`, `ABSENT`, and `REPORTED` remain distinct.

### AC-05 — Assertion semantics

Fact, observation, claim, signal, finding, and derived relationship classifications are not collapsed.

### AC-06 — Financial-state separation

Obligation, disbursement, and settlement are not inferred as equivalent.

### AC-07 — Entity ambiguity preservation

An unresolved or contested identity association is representable without forcing a confirmed identity.

### AC-08 — Provenance

Material events retain sufficient provenance/evidence references for later explanation.

### AC-09 — Idempotency

Retrying the same source observation does not create a duplicate logical event.

### AC-10 — Historical lineage

A material source correction can be represented without destroying the prior observation lineage.

### AC-11 — Transactional durability

A failed event transaction does not leave a misleading partially persisted downstream-ready record.

### AC-12 — Deterministic behavior

Identical inputs produce identical canonicalization outcomes under the same mapping/version configuration.

### AC-13 — No hidden conclusions

Event ingestion does not create legal findings, corruption conclusions, or accusations.

### AC-14 — Tests

Automated tests cover normal creation, duplicate delivery, missing source information, unresolved identity, financial-state distinctions, temporal validity, provenance failure, and persistence rollback.

---

## 25. Adversarial Test Matrix

The implementation must explicitly challenge the following cases.

| Case | Expected behavior |
|---|---|
| Same source record received twice | One logical event; second delivery is idempotent |
| Two different records with identical text | Do not merge solely on textual similarity |
| Missing source record ID | Allow only when another stable source identity exists or classify as non-idempotent input requiring explicit handling |
| Source unavailable | Preserve `UNAVAILABLE`; do not mark `ABSENT` |
| Search returned no result | Preserve `NOT_OBSERVED`; do not infer `ABSENT` |
| Source explicitly says no event occurred | `ABSENT` may be used when that explicit assertion is authoritative for the scope |
| Human reports an event | `REPORTED` until sufficiently established |
| AI extracts likely contractor | Candidate/assisted resolution; not automatic identity proof |
| Payment instruction exists | Do not mark settlement without supporting evidence |
| Settlement evidence exists | `SETTLEMENT` may be represented if supported by source/evidence |
| Event timestamp lacks time-of-day | Preserve source precision; do not invent a time |
| Conflicting source timestamps | Preserve source values; flag/retain conflict for later review |
| Source correction arrives | Preserve lineage; represent supersession/update |
| Provenance missing | Reject/quarantine or keep non-downstream state according to explicit policy; never silently pass as authoritative |
| Database transaction rolls back | No false success; retry safely |
| Possible person match | Preserve candidate/ambiguity; do not confirm silently |
| Event has no project | Allow unless project is semantically mandatory for its event type |
| Event participates in relationship | Relationship basis/provenance remains available |

---

## 26. Definition of Done

T004 is complete when:

1. this specification is reviewed and accepted;
2. the implementation team can derive a bounded GovernmentEvent task without inventing semantics;
3. the existing domain model is reconciled with this specification;
4. database operations required for event persistence are explicitly identified;
5. tests are defined against the acceptance criteria;
6. no reconciliation, detection, case, API, or UI work is silently included.

---

## 27. Next Engineering Task

After approval, the next task is:

> **Implement T004 GovernmentEvent lifecycle and persistence behavior against this specification.**

That implementation should proceed in the Hands-On Fintech workflow:

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

The implementation must not weaken tests or alter the specification merely to make an edge case pass.

---

## 28. Traceability to Existing Architecture

This specification operationalizes the following existing architecture commitments:

- implementation order includes `EVENTS` immediately after `DATA`;
- `GovernmentEvent` is the atomic operational record;
- source systems remain authoritative;
- provenance/evidence are structural;
- historical state is time-aware;
- deterministic controls precede AI;
- reconciliation consumes expected control paths plus observed GovernmentEvents;
- detection produces signals rather than legal conclusions;
- public projections are separated from the internal assurance graph.

No requirement in this specification overrides the Master Product Handoff or Master Engineering Prompt.
