# eGovTrace — Repository and Codebase Architecture v1

**Status:** Proposed engineering baseline for review
**Product source of truth:** `docs/00-foundation/eGovTrace_Master_Product_Handoff.md`
**Engineering source of truth:** `docs/00-foundation/eGovTrace_Master_Engineering_Prompt.md`
**Current implementation baseline:** `main` through T003.2 PostgreSQL persistence

---

## 1. Purpose

This document translates the approved eGovTrace product and engineering direction into a concrete repository and codebase architecture.

It is an implementation architecture, not a product expansion. It describes what the repository should contain, how responsibilities are separated, how data moves through the system, and how the first end-to-end vertical slice can be built without prematurely introducing distributed infrastructure.

This document remains subordinate to the Master Product Handoff and Master Engineering Prompt. When a future implementation decision is unspecified, prefer the smallest reversible decision and document it here or in an ADR.

---

## 2. Product Boundary

eGovTrace is a government-side control, intelligence, monitoring, evidence, verification, and accountability system.

It is not:

- a replacement for eGovPH;
- a replacement for agency systems of record;
- a universal citizen-services platform;
- an unrestricted national database;
- a black-box corruption detector;
- an AI prosecutor or accusation engine.

Source systems remain authoritative for their own records. eGovTrace connects approved observations and assertions across domains while preserving source provenance, uncertainty, temporal state, access classification, and evidentiary basis.

Core safety rules:

- connection is not corruption;
- identifier recovery is not identifier proof;
- not observed is not absent;
- unavailable is not false;
- payment instruction is not payment settlement;
- risk signal is not a finding;
- AI output is not legal fact or legal determination;
- technical privilege is not investigative authority;
- public projections are not the raw assurance graph.

---

## 3. Architecture Principles

### 3.1 Build in dependency order

The implementation order is:

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

### 3.2 Prefer a modular monolith for V1

The current architecture is a modular monolith. One deployable backend reduces early distributed-systems complexity while preserving explicit package boundaries for later extraction.

Do not introduce microservices, Kubernetes, a dedicated message broker, or a dedicated graph database unless a demonstrated requirement makes the simpler architecture insufficient.

### 3.3 Keep source authority outside eGovTrace

eGovTrace stores normalized representations, references, derived relationships, control observations, evidence metadata, and workflow state. It does not silently replace the source system of record.

### 3.4 Evidence and provenance are structural

Important domain assertions must be traceable to source references and supporting evidence. Derived relationships, signals, claims, and findings require explicit provenance semantics.

### 3.5 Deterministic controls before AI

The first production-shaped prototype uses deterministic rules, reconciliation, and explicit explanations. AI is introduced later as an assistive capability, never as the foundational source of legal or corruption determinations.

---

## 4. Repository Shape

The repository uses a TypeScript-first monorepo layout:

```text
eGovTrace/
├── apps/
│   ├── api/
│   ├── web/
│   └── mobile/
├── packages/
│   ├── domain/
│   ├── database/
│   ├── graph/
│   ├── detection/
│   ├── evidence/
│   └── auth/
├── docs/
│   ├── 00-foundation/
│   ├── 01-research/
│   ├── 02-architecture/
│   ├── 03-engineering/
│   ├── decisions/
│   └── tasks/
├── migrations/
├── specs/
│   ├── contracts/
│   └── openapi/
├── tests/
├── scripts/
├── archive/
├── package.json
├── package-lock.json
├── tsconfig.json
├── .env.example
├── .gitignore
├── ARCHITECTURE.md
├── PROJECT_CONTEXT.md
├── REQUIREMENTS.md
├── DATABASE.md
├── SECURITY.md
├── TESTING_STRATEGY.md
└── CODING_STANDARDS.md
```

### 4.1 `apps/`

Application surfaces and transport boundaries live here.

- `apps/api`: HTTP/API transport and application entrypoint. It should depend on domain/application capabilities rather than contain persistence logic itself.
- `apps/web`: future government and public web interface. UI behavior must consume real API/domain behavior rather than inventing dashboard values.
- `apps/mobile`: future authorized field/operational client. It should not duplicate the entire web console.

### 4.2 `packages/domain/`

Canonical domain types and invariants.

Responsibilities:

- GovernmentEvent;
- core entities;
- relationships and relationship basis;
- temporal validity;
- provenance references;
- assertion kinds;
- observation/status semantics;
- explicit financial lifecycle semantics;
- domain validation and invariants.

Forbidden responsibilities:

- SQL queries;
- HTTP routing;
- UI rendering;
- direct access to secrets;
- vendor-specific infrastructure concerns.

### 4.3 `packages/database/`

Persistence boundary.

Responsibilities:

- PostgreSQL connection lifecycle;
- migrations;
- typed persistence operations;
- transaction handling;
- source and identifier registries;
- provenance persistence;
- temporal/history persistence;
- evidence and relationship persistence;
- financial-state persistence;
- idempotency;
- optimistic concurrency;
- transactional outbox metadata.

The package must require explicit database configuration. It must not fall back to hardcoded credentials.

### 4.4 `packages/graph/`

Typed relationship/domain graph capability.

Responsibilities:

- typed edge definitions;
- graph relationship validation;
- graph traversal abstractions;
- relationship query composition;
- evidence/basis-aware relationship handling.

V1 graph storage remains within PostgreSQL unless evidence demonstrates a dedicated graph database is required.

### 4.5 `packages/detection/`

Deterministic control and anomaly rules.

Responsibilities:

- expected-vs-observed control checks;
- rule evaluation;
- machine-readable reason codes;
- signal severity/priority/confidence;
- missing-information reporting;
- recommended verification actions.

A detection rule may produce a signal. It must not silently produce a legal finding or accusation.

### 4.6 `packages/evidence/`

Evidence and provenance capabilities.

Responsibilities:

- evidence metadata;
- source references;
- retrieval/capture metadata;
- classification;
- provenance links;
- integrity metadata where feasible;
- evidence bundles used by signals and cases.

### 4.7 `packages/auth/`

Authorization boundary.

Responsibilities:

- authentication integration seam;
- role-based authorization;
- institution-based authorization;
- data classification checks;
- purpose/need-to-know controls;
- authorization decision abstractions;
- security audit hooks.

Do not treat authentication as sufficient for cross-agency authorization.

---

## 5. Dependency Direction

Dependencies should flow toward stable domain abstractions and explicit boundaries:

```text
apps/*
  ↓
application/use-case orchestration
  ↓
packages/domain
packages/database
packages/graph
packages/detection
packages/evidence
packages/auth
```

The preferred rule is:

```text
Domain does not depend on infrastructure.
Infrastructure implements domain/application needs.
Applications compose capabilities.
UI consumes API/application behavior.
```

Avoid circular package dependencies.

When a capability crosses a boundary, prefer a small explicit interface over importing implementation details.

---

## 6. Canonical Domain Flow

The central system model is:

```text
Source Observation
→ Normalize
→ Validate
→ Entity Resolution
→ GovernmentEvent
→ Relationship Linking
→ Provenance / Evidence
→ Expected-vs-Observed Comparison
→ Detection Signal
→ Human Verification
→ Accountability Action
→ Outcome
→ Public Projection where permitted
```

The system must preserve the difference between:

```text
FACT
OBSERVATION
DERIVED RELATIONSHIP
CLAIM
SIGNAL
FINDING
```

A later implementation must not collapse these states into one generic record type merely for convenience.

---

## 7. Core Data Boundary

PostgreSQL is the V1 system of record for eGovTrace's own normalized control/intelligence state.

The T003.2 persistence foundation establishes:

- typed entities;
- source identifiers;
- provenance;
- temporal state;
- evidence;
- relationships;
- explicit financial states;
- idempotency;
- optimistic concurrency;
- transaction boundaries;
- outbox metadata.

The database layer should remain append-oriented where historical truth matters. Updates to important state must preserve enough information to explain what changed and when.

### 7.1 Financial lifecycle

Do not imply financial settlement merely from obligation or disbursement.

The model must preserve distinct states:

```text
OBLIGATION
DISBURSEMENT
SETTLEMENT
```

### 7.2 Source identifiers

Source identifiers remain distinct from eGovTrace domain identifiers.

A recovered identifier may support investigation or reconciliation but does not prove identity on its own.

### 7.3 Temporal state

Historical state must be time-aware. Current state is not sufficient when a person, institution, authority, contract, or project changes over time.

---

## 8. GovernmentEvent as the Atomic Operational Record

The canonical event boundary should support, where applicable:

- event type;
- timestamp;
- institution;
- office;
- responsible actor/role;
- authority;
- legal basis;
- object/entity;
- financial value;
- program/project;
- geographic location;
- related events;
- evidence;
- source;
- provenance;
- classification;
- status;
- confidence;
- creation/update metadata.

An entity may participate in many events. The event is therefore the operational observation unit, while entities provide durable identity and relationships.

---

## 9. Expected Control Path

The first control-path implementation should model a reusable expected lifecycle:

```text
Need
→ Authorization
→ Budget
→ Procurement
→ Contract
→ Payment
→ Implementation
→ Verification
→ Audit
→ Accountability
→ Outcome
```

An `ExpectedControlPath` must be able to represent, where applicable:

- required steps;
- optional steps;
- dependencies;
- required evidence;
- responsible roles;
- expected sequence;
- timing expectations;
- segregation/independence requirements.

Demo rules must be explicitly labeled as demo rules. Legal requirements must not be invented merely to make a test case pass.

---

## 10. Reconciliation Boundary

Reconciliation is the comparison layer between what should have happened and what was observed.

Conceptually:

```text
ExpectedControlPath
+
Observed GovernmentEvents
=
ReconciliationResult
```

Supported categories should include:

- NORMAL;
- MISSING_INFORMATION;
- CONTROL_EXCEPTION;
- DATA_INCONSISTENCY;
- AUTHORITY_MISMATCH;
- SEQUENCE_EXCEPTION;
- TIMING_EXCEPTION;
- INDEPENDENCE_GAP;
- OUTCOME_GAP;
- REQUIRES_REVIEW.

A reconciliation result must include machine-readable reasons and the observations it used.

---

## 11. Detection Boundary

Detection starts with deterministic rules.

Each rule should produce a structured signal containing, where applicable:

```text
signal
reason
supporting_events
supporting_evidence
missing_information
severity
priority
confidence
recommended_verification
```

Initial V1 families should be narrow and explainable, for example:

- repeated bidder combinations;
- contractor recurrence;
- payment without expected evidence;
- payment/outcome mismatch;
- missing verification;
- independence gap;
- authority mismatch;
- financial-versus-physical progress mismatch.

Do not create a generic black-box risk score as the primary product output.

---

## 12. Evidence and Provenance Boundary

Every material signal and derived relationship should have a provenance path.

A reviewer should be able to answer:

1. Why was this flagged?
2. Which events support it?
3. Which evidence supports those events?
4. What information is missing?
5. What would disprove the signal?
6. Which human verified it?
7. What changed afterward?

The evidence model should preserve source record/document identifiers, retrieval/capture time, relevant event/entity relationship, version where applicable, access classification, and transformation/provenance metadata.

---

## 13. Verification and Accountability Boundary

Detection creates a signal, not a conclusion.

The first verification workflow should support:

```text
Detected
→ Triaged
→ Assigned
→ Evidence Requested
→ Under Verification
→ Resolved / Finding
→ Action
→ Outcome
→ Closed / Monitored
```

Cases must preserve:

- triggering signals;
- related events;
- evidence;
- reviewer;
- decisions;
- explanations;
- timestamps;
- actions;
- outcome;
- closure reason.

A case is not equivalent to an allegation, finding, or judicial outcome.

---

## 14. Graph Boundary

The Government Accountability Graph is a typed relationship capability over the same underlying domain and evidence model.

Minimum V1 entities include:

```text
Institution
Office
Person/Official
Authority
LegalInstrument
Budget
Project
Procurement
Bidder
Contractor
Contract
Payment
Evidence
AuditFinding
Case
Outcome
```

Example relationship types:

```text
AUTHORIZED_BY
BELONGS_TO
WORKS_FOR
ALLOCATED_TO
FUNDS
PROCURES
BID_BY
AWARDED_TO
CONTRACTED_WITH
PAID_TO
IMPLEMENTS
LOCATED_AT
VERIFIED_BY
SUPPORTED_BY
AUDITED_BY
RESULTED_IN
RELATED_TO
```

Relationships must preserve basis/evidence where material. The graph answers connectivity questions; it does not itself establish guilt.

---

## 15. API Boundary

`apps/api` is a transport boundary, not a second domain model.

The API should expose use cases and read models rather than leak raw database tables by default.

Initial API capabilities should eventually support:

- synthetic project retrieval;
- expected lifecycle retrieval;
- observed event retrieval;
- reconciliation execution/retrieval;
- signal retrieval;
- evidence retrieval subject to authorization;
- case/verification workflow;
- accountability/action workflow;
- permitted public projection.

The existing API/OpenAPI contracts remain references and must be reconciled with implemented behavior before production-style API expansion.

---

## 16. Web Boundary

The web console is the primary heavy-work interface for authorized government users.

The UI should be organized around investigation and work, not decorative dashboard density.

Minimum conceptual areas:

1. Overview
2. Government Events
3. Projects
4. Procurement
5. Money Trail
6. Anomalies/Exceptions
7. Cases
8. Evidence
9. Verification
10. Accountability
11. Entity/Relationship Explorer
12. Institutional Risk
13. Public Transparency

The primary interaction path should be:

```text
Signal
→ Why flagged?
→ Related events
→ Evidence
→ Expected path
→ Actual path
→ Human verification
→ Action
→ Outcome
```

No screen should invent values merely to look complete.

---

## 17. Mobile Boundary

The mobile app is for authorized field/operational work.

Primary capabilities:

- authentication;
- assigned work/cases;
- alerts;
- project/site inspection;
- evidence capture;
- verification;
- case updates;
- offline capture where practical;
- synchronization.

Mobile is not a duplicate of the desktop console.

---

## 18. Public Projection Boundary

The public surface is a projection of legally releasable information, not a direct window into the internal assurance graph.

Public capabilities may include:

- public project search;
- public lifecycle information;
- public procurement/spending information where available;
- published findings;
- permitted accountability status;
- public evidence/context;
- citizen observation/report submission.

Do not expose restricted evidence, investigative material, internal anomaly scores, or sensitive personal information merely because it exists internally.

---

## 19. Access Control Architecture

Role and institutional boundaries must exist before broad multi-agency integration.

Initial conceptual roles:

- Citizen/Public;
- Government Employee;
- Agency Manager;
- Auditor;
- Investigator;
- Executive/Oversight;
- System Administrator.

Authorization decisions should consider:

```text
who
+ institution
+ role
+ resource
+ data classification
+ purpose
+ permitted action
+ audit context
```

Do not equate system-admin privilege with investigative authority.

---

## 20. Data Ingestion and Integration Boundary

External systems remain external sources of authority.

The ingestion architecture is:

```text
Raw Source
→ Normalize
→ Validate
→ Entity Resolve
→ Create GovernmentEvent
→ Link Relationships
→ Store Provenance
```

V1 should begin with local/synthetic data and explicit interfaces for future lawful integrations.

Do not fabricate real government transactions.

Do not make a production connector simply to demonstrate that a source exists. Connector scope should be driven by an approved source/data boundary and a concrete vertical-slice requirement.

---

## 21. Configuration and Secrets

Configuration must be environment-driven.

Required principle:

```text
explicit configuration
→ otherwise fail clearly
```

Never embed database passwords or real service credentials in source code, migrations, tests, fixtures, or documentation.

`.env.example` may contain clearly non-production example values only.

Generated build metadata must remain ignored and must not be committed as source.

---

## 22. Testing Architecture

Testing is layered according to the same boundaries.

### Domain tests

Validate:

- event semantics;
- temporal validity;
- relationship semantics;
- financial lifecycle separation;
- assertion classification;
- identity/provenance rules.

### Persistence tests

Validate:

- entity persistence;
- source identifiers;
- provenance;
- evidence;
- relationships;
- temporal state;
- obligation/disbursement/settlement separation;
- idempotency;
- optimistic concurrency;
- transaction rollback;
- outbox integrity.

### Reconciliation tests

Validate:

- normal path;
- missing information;
- wrong sequence;
- missing evidence;
- authority mismatch;
- timing exception.

### Detection tests

Validate deterministic rules and their explanations.

### Authorization tests

Validate that:

- public users cannot access restricted evidence;
- one agency cannot automatically access another agency's restricted records;
- authorized investigative/audit roles receive only appropriate capabilities.

### End-to-end test

One synthetic public-project lifecycle must travel through the central pipeline from project creation through detection, verification, accountability, outcome, and public projection.

---

## 23. Observability and Operational Quality

The modular monolith should expose enough operational visibility to answer:

- what failed;
- when it failed;
- which operation failed;
- which correlation/request identifier applies;
- whether a transaction committed or rolled back;
- whether an event was duplicated;
- whether an external source was unavailable;
- whether a control signal was generated deterministically.

Do not introduce a heavy observability platform before a concrete deployment need exists. Establish interfaces and structured logging conventions first.

---

## 24. Transaction and Consistency Rules

Operations that materially change related assurance state should use explicit transaction boundaries.

A representative mutation may involve:

```text
entity/state change
+
provenance
+
evidence relationship
+
event
+
outbox record
```

These records should commit or roll back as one logical operation where the business invariant requires it.

Idempotency must protect replayable operations. Optimistic concurrency must prevent silent lost updates.

External source truth must never be marked as successfully synchronized merely because an internal transaction committed.

---

## 25. First End-to-End Vertical Slice

The architecture is intended to prove one complete synthetic lifecycle before breadth expansion.

Target flow:

```text
Synthetic Public Project
→ Budget
→ Procurement
→ Bidders
→ Contractor
→ Contract
→ Payment
→ Implementation
→ Verification
→ Evidence
→ Detection
→ Human Review
→ Accountability
→ Outcome
→ Public Projection
```

The demonstration should intentionally contain several explainable conditions, such as:

- repeated bidder combination;
- missing verification evidence;
- payment/outcome mismatch;
- recurring contractor;
- independence/control issue.

Every generated signal must expose its reason and supporting evidence.

---

## 26. Current As-Built Foundation

As of the current `main` baseline, the repository has already established:

### Completed

- T001 repository scaffold and engineering context;
- research archive and lineage separation;
- T002 typed core domain foundation;
- T003.1 persistence boundary specification;
- T003.2 PostgreSQL persistence implementation;
- PostgreSQL migration and typed database access;
- persistence integration tests;
- provenance, temporal, evidence, relationship, financial-state, idempotency, concurrency, and transaction semantics;
- secure explicit database configuration;
- removal of tracked generated TypeScript build artifacts.

### Not yet implemented as production-shaped capabilities

- complete GovernmentEvent application workflow;
- ExpectedControlPath engine;
- reconciliation engine;
- deterministic detection package behavior;
- complete evidence workflow;
- case/verification workflow;
- accountability workflow;
- integrated graph traversal/use cases;
- application/API use-case layer;
- government web console;
- government mobile app;
- public projection implementation;
- production authentication/authorization;
- external government connectors.

This distinction is important: repository scaffolding and persistence do not constitute the complete eGovTrace product.

---

## 27. Implementation Roadmap After This Architecture

The next implementation sequence should follow the Master Engineering Prompt and this architecture rather than inventing unrelated milestones:

```text
1. GovernmentEvent operational model/use cases
2. ExpectedControlPath model and demo rules
3. Event ingestion/normalization for synthetic data
4. Reconciliation engine
5. Deterministic detection rules
6. Evidence/provenance workflow integration
7. Case/verification workflow
8. Accountability/action/outcome workflow
9. Graph relationship/query capabilities
10. API use-case boundary
11. End-to-end synthetic vertical slice
12. Government web console
13. Mobile field workflow
14. Public projection
15. Authorization hardening
16. External integrations only after source/data boundary approval
17. AI assistance after deterministic foundations are proven
```

This ordering is intentionally different from building screens first. The product thesis is demonstrated by the control/reconciliation/evidence workflow, not by UI breadth.

---

## 28. Architecture Decision Rules for Future Work

When a future task requires a decision:

1. Check the Master Product Handoff.
2. Check the Master Engineering Prompt.
3. Check this repository architecture.
4. Check existing ADRs and current implementation.
5. Prefer the smallest reversible decision.
6. Preserve source authority and evidence semantics.
7. Keep the change within the current task scope.
8. Add an ADR if the choice materially affects architecture, security, data boundary, infrastructure, or reversibility.

A future task should not silently redefine the product boundary.

---

## 29. Definition of Architectural Readiness for the First Prototype

This architecture is considered successfully implemented when a reviewer can follow one synthetic project through:

```text
Expected lifecycle
→ Observed events
→ Relationships
→ Reconciliation
→ Explainable signal
→ Supporting evidence
→ Missing information
→ Human verification
→ Accountability action
→ Outcome
→ Public projection
```

The system must be able to trace each major signal backward to its supporting events/evidence and preserve the distinction between observation, signal, finding, and official outcome.

---

## 30. References

Primary repository references:

- `docs/00-foundation/eGovTrace_Master_Product_Handoff.md`
- `docs/00-foundation/eGovTrace_Master_Engineering_Prompt.md`
- `PROJECT_CONTEXT.md`
- `REQUIREMENTS.md`
- `ARCHITECTURE.md`
- `DATABASE.md`
- `SECURITY.md`
- `TESTING_STRATEGY.md`
- `docs/03-engineering/eGovTrace_Core_Data_Model_and_Graph_Schema_v1.md`
- `docs/03-engineering/eGovTrace_Core_Service_and_Domain_Module_Architecture_v1.md`
- `docs/03-engineering/eGovTrace_Source_Connector_and_API_Specification_v1.md`
- `specs/contracts/eGovTrace_API_and_Event_Contract_v1.md`
- `specs/openapi/eGovTrace_OpenAPI_v1.yaml`
- `docs/02-architecture/eGovTrace_Source_System_and_Data_Boundary_Architecture_v1.md`
- `docs/02-architecture/eGovTrace_Citizen_Product_and_Mobile_Web_Architecture_v1.md`

Historical research and seed material remain under `archive/` and `docs/01-research/`. Research artifacts provide lineage, hypotheses, reproducibility, and test fixtures; they are not production source-of-truth records.
