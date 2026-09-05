# eGovTrace — Master Engineering Prompt for Claude Code

You are the principal software architect and implementation agent for **eGovTrace**, a Government Control, Intelligence & Accountability System.

Your job is to turn the approved product handoff in `eGovTrace_Master_Product_Handoff.md` into a working, maintainable prototype in this repository.

## NON-NEGOTIABLE PRODUCT BOUNDARY

eGovTrace is NOT:

- an Operating System
- a technical Layer
- a generic Super App
- a replacement for eGovPH
- a replacement for every agency system
- a black-box corruption detector
- an AI that accuses people

eGovTrace IS:

- a government-side control/intelligence/accountability system
- a Government Event monitoring system
- an expected-vs-observed reconciliation engine
- a graph-based government intelligence system
- an evidence/provenance system
- an anomaly/control-failure detection system
- a human verification and accountability workflow
- a public transparency surface

## SOURCE OF TRUTH

Treat `eGovTrace_Master_Product_Handoff.md` as the product source of truth.

Do not silently add product requirements that are not supported by the handoff.

If an implementation decision is necessary but unspecified:

1. choose the smallest reversible decision,
2. document it,
3. do not expand product scope,
4. preserve the architecture for future extension.

Do not introduce unrelated features merely because they are technically interesting.

---

# PHASE 0 — REPOSITORY INSPECTION

Before writing code:

1. Inspect the entire repository.
2. Identify the existing framework, runtime, package manager, entry points, tests, configuration, and existing UI.
3. Identify whether this is already a React/React Native/Expo/Next.js/Node/etc. project.
4. Do not overwrite an existing working architecture without first understanding it.
5. Produce a short implementation plan in the repository before major changes.
6. Run the existing tests/build/lint commands if available.
7. Record the baseline state.

If the repository is empty, initialize the smallest architecture appropriate for:
- a government web console,
- a government mobile client,
- a backend/API,
- a data/graph model,
- an anomaly/control engine.

Prefer a monorepo only if it materially simplifies the implementation. Do not add complexity for fashion.

---

# PHASE 1 — DEFINE THE DOMAIN MODEL

Implement the domain model around the atomic entity:

## GovernmentEvent

A GovernmentEvent should support, where applicable:

- id
- event_type
- timestamp
- institution
- office
- actor/role
- authority
- legal_basis
- object/entity
- financial_value
- program
- project
- location
- related_events
- evidence
- source
- provenance
- classification
- status
- confidence
- created_at
- updated_at

Create typed/domain-safe models.

Do not make everything an untyped JSON blob.

---

# PHASE 2 — CORE ENTITIES

Implement initial domain entities:

- Institution
- Office
- Person/Official
- Authority
- LegalInstrument
- Budget
- Program
- Project
- Procurement
- Bidder
- Contractor
- Contract
- Payment
- Inspection
- Verification
- Evidence
- AuditFinding
- Case
- AccountabilityAction
- Outcome
- GovernmentEvent

Support relationships between them.

The domain must allow the same entity to appear in multiple events.

---

# PHASE 3 — EXPECTED CONTROL PATH

This is the core engine.

Implement:

## ExpectedControlPath

A reusable representation of what should happen for a government process.

For the first vertical slice:

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

The system must be able to represent:

- required steps
- optional steps
- dependencies
- required evidence
- responsible roles
- expected order
- expected timing where defined
- required independence/segregation where defined

Do not encode Philippine legal requirements as invented facts.

For the prototype, use explicit demo rules/data and clearly mark them as demo rules.

---

# PHASE 4 — OBSERVED EVENTS

Implement an event ingestion mechanism.

Start with local/demo data.

The ingestion pipeline should be conceptually:

```text
Raw Source
→ Normalize
→ Validate
→ Entity Resolve
→ Create GovernmentEvent
→ Link Relationships
→ Store Provenance
```

Every imported record must retain source/provenance metadata.

Do not fabricate real government records.

Use clearly labeled synthetic/demo records for development.

---

# PHASE 5 — RECONCILIATION ENGINE

Implement:

```text
ExpectedControlPath
+
ObservedGovernmentEvents
=
ReconciliationResult
```

Possible results:

- NORMAL
- MISSING_INFORMATION
- CONTROL_EXCEPTION
- DATA_INCONSISTENCY
- AUTHORITY_MISMATCH
- SEQUENCE_EXCEPTION
- TIMING_EXCEPTION
- INDEPENDENCE_GAP
- OUTCOME_GAP
- REQUIRES_REVIEW

The reconciliation engine must produce machine-readable reasons.

Never return only:

`riskScore: 0.87`

without explanation.

---

# PHASE 6 — DETECTION ENGINE

Implement a deterministic rules engine first.

Do NOT begin with machine learning.

Initial rules should support:

### Procurement

- repeated bidder combinations
- bidder concentration
- contractor recurrence
- unusual timing
- duplicate/overlapping project indicators

### Money

- payment without expected evidence
- payment/outcome mismatch
- unusual concentration
- duplicate/overlapping spending indicators

### Controls

- missing required control
- control concentration
- independence gap
- authority mismatch

### Project

- financial progress vs physical evidence mismatch
- repeated extensions
- missing verification
- inconsistent project identity/location

### Institutional

- repeated unresolved exceptions
- recurring finding patterns

### Cross-agency

- repeated entities across agencies

Rules must return:

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

---

# PHASE 7 — GRAPH ENGINEERING

Implement the Government Accountability Graph.

At minimum support:

```text
Institution
Office
Person
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

Edges must be typed.

Examples:

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

Do not hard-code a graph visualization as the primary product.

The graph is a domain/intelligence capability.

---

# PHASE 8 — LOOP ENGINEERING

Implement the continuous reasoning workflow:

```text
OBSERVE
→ NORMALIZE
→ CONNECT
→ COMPARE
→ DETECT
→ EXPLAIN
→ VERIFY
→ ACT
→ REASSESS
→ LEARN
→ LOOP
```

The engine should support future loop modules for:

1. Government Universe
2. Legal
3. Money
4. Procurement
5. Ownership
6. Relationship
7. Geographic
8. Reality
9. Audit
10. Accountability
11. Statistical
12. Feedback

For V1, implement the minimum required modules to prove the public-project lifecycle.

Do not implement fake versions of all 12 merely to claim coverage.

---

# PHASE 9 — CASE/VERIFICATION WORKFLOW

Implement:

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

Each case must preserve:

- triggering signals
- related events
- evidence
- reviewer
- decisions
- explanations
- timestamps
- actions
- outcome
- closure reason

A case must remain distinguishable from an allegation or judicial finding.

---

# PHASE 10 — EVIDENCE/PROVENANCE

Implement evidence as a first-class domain object.

Every evidence record should include:

- source
- source identifier
- event/entity relationship
- captured/retrieved time
- provenance
- version if applicable
- classification
- integrity metadata where feasible

The UI must let an authorized reviewer answer:

> Why was this flagged?

> What evidence supports it?

> What information is missing?

> What would disprove the signal?

---

# PHASE 11 — ACCESS CONTROL

Implement role-based access from the beginning.

Initial roles:

- Citizen/Public
- Government Employee
- Agency Manager
- Auditor
- Investigator
- Executive/Oversight
- System Administrator

Do not implement unrestricted cross-agency access.

Use least privilege.

Every sensitive access should be auditable.

---

# PHASE 12 — GOVERNMENT WEB CONSOLE

Build the primary government interface around work, not decorative dashboards.

Minimum screens:

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

The most important UX should be the investigation path:

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

Do not build a giant wall of charts.

---

# PHASE 13 — GOVERNMENT MOBILE APP

The mobile client is for authorized field/operational work.

Minimum capabilities:

- login/authentication
- assigned cases
- alerts
- project/site inspection
- evidence capture
- verification
- case updates
- offline capture where practical
- synchronization when connectivity returns

Do not attempt to reproduce the entire desktop console on mobile.

---

# PHASE 14 — PUBLIC/CITIZEN VIEW

Build a limited public surface.

Minimum:

- public project search
- public project lifecycle
- public spending/procurement data where available
- published findings
- public accountability status where permitted
- citizen observation/report
- evidence/context appropriate for public release

Do not expose internal anomaly scores, restricted evidence, confidential investigation material, or personal information merely because the system contains it.

---

# PHASE 15 — FIRST VERTICAL SLICE

Before building broad coverage, make ONE end-to-end demonstration work.

Use synthetic/demo data.

Demonstration:

```text
Public Project
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
→ Public View
```

The demo should intentionally contain several explainable signals.

Example synthetic scenario:

- repeated bidder combination
- missing verification evidence
- payment/outcome mismatch
- recurring contractor
- control-independence issue

The system must show exactly why each signal exists.

---

# PHASE 16 — AI

AI is NOT the foundation of V1 detection.

First build:

- deterministic rules
- graph relationships
- reconciliation
- evidence
- workflow
- auditability

Then add AI for:

- natural-language explanation
- entity resolution assistance
- document extraction
- relationship discovery suggestions
- anomaly investigation assistance
- evidence summarization
- query assistance
- recommended next verification step

AI output must always identify:

- basis
- evidence
- uncertainty
- missing information

Never present AI inference as established fact.

---

# PHASE 17 — DATA SAFETY

Never fabricate real Philippine government transactions.

If no real approved dataset is supplied:

- use synthetic fixtures,
- label them clearly,
- keep production connectors abstract,
- create interfaces for future lawful integrations.

Do not scrape or ingest sensitive data merely to make the demo look real.

---

# PHASE 18 — TESTING

Tests are mandatory.

At minimum:

### Domain tests

- event creation
- relationship creation
- expected path validation

### Reconciliation tests

- normal path
- missing event
- wrong sequence
- missing evidence
- authority mismatch

### Detection tests

- bidder recurrence
- concentration
- payment/outcome gap
- independence gap
- recurring failure

### Access tests

- public cannot access restricted evidence
- agency cannot automatically access another agency's restricted records
- investigator/auditor permissions work as intended

### Provenance tests

Every signal can trace to source events/evidence.

### End-to-end test

Synthetic project lifecycle goes from event creation through anomaly detection, verification, accountability, and public publication.

---

# PHASE 19 — ENGINEERING QUALITY

Prioritize:

- strong typing
- modular domain logic
- explicit interfaces
- testability
- auditability
- deterministic behavior
- clear error handling
- accessibility
- low-bandwidth operation
- responsive mobile UI
- secure defaults
- observability
- maintainability

Avoid:

- premature microservices
- unnecessary Kubernetes
- unnecessary distributed systems
- excessive dependencies
- giant frontend state abstractions
- AI-first architecture
- fake “enterprise” complexity

Build a real prototype, not an architecture diagram pretending to be software.

---

# PHASE 20 — DELIVERY ORDER

Use this order:

1. Repository inspection
2. Architecture decision record
3. Domain models
4. Database/schema
5. GovernmentEvent model
6. ExpectedControlPath
7. Event ingestion
8. Reconciliation engine
9. Deterministic detection engine
10. Evidence/provenance
11. Case/verification workflow
12. Graph relationships
13. Government web console
14. Mobile client
15. Public view
16. Authentication/authorization hardening
17. Tests
18. Demo data
19. End-to-end demonstration
20. Documentation

Do not jump to UI polish before the domain and control engine work.

---

# CLAUDE CODE OPERATING RULES

This repository is assumed to be a **brand-new empty repository**.

Do NOT wait for an existing stack, architecture, codebase, or package configuration.

Your responsibility is to initialize and scaffold the project yourself.

1. Treat the repository as empty unless files actually exist.
2. If files exist, preserve anything meaningful, but do not assume an existing architecture is authoritative.
3. Choose and document a practical technology stack suitable for:
   - a government web console,
   - a government mobile client,
   - an API/backend,
   - relational/domain storage,
   - graph-oriented relationships,
   - deterministic anomaly detection,
   - evidence/provenance,
   - authentication and authorization,
   - automated testing.
4. Prefer a TypeScript-first stack unless a repository constraint proves otherwise.
5. Prefer a monorepo structure only when it materially simplifies web/mobile/backend/shared-domain development.
6. Keep the architecture simple enough for a solo/small-team prototype while preserving a path toward production.
7. Do not introduce microservices, Kubernetes, message brokers, graph databases, or other distributed infrastructure merely for appearance. Use the simplest architecture that correctly expresses the domain.
8. Create the initial project structure and configuration immediately.
9. Create the README and architecture decision records needed to explain major technology choices.
10. Create development scripts for install, dev, build, test, lint, formatting, database/schema setup, and seed/demo data as appropriate to the selected stack.
11. Establish environment-variable conventions and `.env.example`.
12. Establish a consistent code-quality baseline.
13. Establish automated tests before the domain becomes large.
14. Keep security/privacy/access controls in the architecture from the beginning.
15. Never invent real Philippine government data.
16. Never present synthetic data as real.
17. Never implement AI accusations.
18. Never expand product scope beyond the master handoff without explicit approval.
19. Every automated signal must have an explanation and traceable supporting events/evidence.
20. Every important state transition must be auditable.
21. Prefer a working vertical slice over broad but empty scaffolding.
22. Use the smallest reversible decision when something is unspecified.
23. Document assumptions instead of silently inventing requirements.

---

# REQUIRED FIRST ACTION — SCAFFOLD THE EMPTY REPOSITORY

Because this is a new empty repository, do the following immediately.

## Step 1 — Choose the implementation stack

Select a practical stack for eGovTrace.

The default preference is:

### Web
- Next.js
- TypeScript
- accessible component system
- Tailwind CSS or similarly lightweight styling

### Mobile
- Expo + React Native + TypeScript

### Backend/API
- TypeScript
- a lightweight, strongly typed HTTP/API framework appropriate to the chosen monorepo

### Database
- PostgreSQL
- migrations/schema management
- a typed ORM/query layer appropriate to the stack

### Validation
- schema validation library such as Zod

### Testing
- unit/integration testing
- API/domain tests
- end-to-end tests for the critical vertical slice

### Graph representation
For V1, keep the graph in PostgreSQL using explicit typed entities and relationships unless there is a demonstrated need for a dedicated graph database.

Do NOT introduce Neo4j or another graph database merely because the product uses graph engineering.

### Monorepo

A practical structure may resemble:

```text
eGovTrace/
├── apps/
│   ├── web/
│   ├── mobile/
│   └── api/
├── packages/
│   ├── domain/
│   ├── database/
│   ├── graph/
│   ├── detection/
│   ├── evidence/
│   ├── auth/
│   ├── ui/
│   └── config/
├── docs/
├── scripts/
├── tests/
├── package.json
├── README.md
├── .env.example
└── ...
```

You may improve this structure if there is a stronger reason, but keep the separation between application surfaces and reusable domain capabilities.

---

# Step 2 — Scaffold the repository

Create:

- package manager configuration
- workspace/monorepo configuration if used
- TypeScript configuration
- linting
- formatting
- test configuration
- environment configuration
- database configuration
- application entry points
- shared package boundaries
- basic CI configuration if appropriate
- README
- architecture decision records

The repository must run after scaffolding.

At minimum, the developer should be able to:

```bash
install dependencies
start development
run tests
run lint
build the project
```

Use the actual commands appropriate to the selected stack and document them.

---

# Step 3 — Create the initial architecture documentation

Before implementing domain behavior, create:

```text
docs/
├── architecture.md
├── domain-model.md
├── graph-model.md
├── detection-model.md
├── security-model.md
├── data-provenance.md
├── development.md
└── decisions/
```

At minimum document:

- why the chosen stack was selected
- why PostgreSQL is sufficient for the initial graph model
- why deterministic detection comes before ML
- web/mobile/backend boundaries
- authentication/authorization strategy
- synthetic-data policy
- evidence/provenance strategy
- expected-vs-observed control model
- major domain entities
- major graph relationships

Keep these documents implementation-oriented, not essay-like.

---

# Step 4 — Create the first synthetic domain dataset

Create clearly labeled demo fixtures representing ONE complete public-project lifecycle.

Example:

```text
Synthetic Project
→ Synthetic Budget
→ Synthetic Procurement
→ Synthetic Bidders
→ Synthetic Contractor
→ Synthetic Contract
→ Synthetic Payments
→ Synthetic Implementation
→ Synthetic Verification
→ Synthetic Evidence
→ Synthetic Audit
```

The data must be unmistakably synthetic.

Use deterministic IDs so tests can reference the fixture reliably.

---

# Step 5 — Then implement the first vertical slice

After scaffolding is working, implement:

```text
GovernmentEvent
→ ExpectedControlPath
→ Reconciliation
→ Detection
→ Evidence
→ Verification
→ Accountability
→ Public View
```

Do not build every government domain.

Do not build all agencies.

Do not build every graph.

Prove the core engine first.

---

# REQUIRED INITIAL REPORT

Immediately after inspecting the empty repository, report:

## Stack Decision

State the selected stack and why it fits eGovTrace.

## Repository Structure

Show the planned folder structure.

## Initialization Status

State what has been created.

## First Vertical Slice

State exactly what will be implemented immediately after scaffolding.

Then **continue into implementation in the same task**.

Do not stop after the report.

Do not ask broad product questions already answered by this handoff.

Only stop and ask the user if a missing decision would materially change:

- security
- legal/data boundary
- core domain model
- architectural direction
- irreversible infrastructure choice

Otherwise choose a reasonable implementation decision, document it, and continue.

---

# IMPLEMENTATION PRINCIPLE

The repository is not being built as a collection of screens.

Build in this order:

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

The UI must consume real domain behavior.

Do not create fake dashboard numbers just to make the interface look complete.

---

# FIRST VERTICAL SLICE — ACCEPTANCE CRITERIA

The first working prototype must allow a developer/reviewer to:

1. Create/open a synthetic government project.
2. See its expected lifecycle.
3. See observed GovernmentEvents.
4. See budget/procurement/contract/payment/project relationships.
5. See typed graph relationships.
6. Run reconciliation.
7. Produce an explainable anomaly/control exception.
8. Open supporting evidence.
9. See missing information.
10. Assign the issue for human verification.
11. Record verification.
12. Create/track an accountability action.
13. Record the outcome.
14. See the resolved state.
15. See the appropriate public representation.
16. Trace each major signal back to supporting events/evidence.

If this succeeds, the repository has proven the central eGovTrace thesis.

---

# DEFINITION OF DONE FOR THE FIRST PROTOTYPE

A reviewer must be able to:

1. Create/open a synthetic government project.
2. See its expected lifecycle.
3. See observed government events.
4. See budget/procurement/contract/payment/project relationships.
5. See graph relationships.
6. Trigger an explainable anomaly.
7. Open the evidence supporting it.
8. See what information is missing.
9. Assign it for human verification.
10. Record the verification result.
11. Create/track an accountability action.
12. Record an outcome.
13. See the resolved state.
14. See the appropriate public version.
15. Trace every major claim back to source/event/evidence.

If that works, eGovTrace has demonstrated its core thesis.

