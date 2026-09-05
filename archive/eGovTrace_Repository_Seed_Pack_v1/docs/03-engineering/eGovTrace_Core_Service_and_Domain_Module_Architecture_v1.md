# eGovTrace Core Service and Domain Module Architecture v1

**Status:** APPROVED WORKING ENGINEERING ARCHITECTURE / v1 BUILD BASELINE
**Purpose:** Turn the approved eGovTrace logical schema, source-connector architecture, and citizen product architecture into implementable backend modules, domain boundaries, service contracts, workflows, asynchronous jobs, transaction rules, authorization boundaries, and an incremental build plan.

> This document is an implementation architecture baseline. It does not authorize production deployment, legal data sharing, or access to restricted government systems.

---

## 0. Architectural Decision

eGovTrace should begin as a **modular monolith with asynchronous workers**, not as a fleet of independently deployed microservices. The codebase must enforce domain boundaries and contracts internally so selected modules can later be extracted without redesigning the logical model.

The preferred v1 execution shape is:

```text
PUBLIC WEB/PWA / ASSURANCE UI / eGovPH
                |
          API GATEWAY / BFF
                |
      APPLICATION SERVICE LAYER
                |
  +-------------+-------------------+
  |             |                   |
DOMAIN MODULES  PLATFORM MODULES    WORKFLOW MODULES
  |             |                   |
  +-------------+-------------------+
                |
 PostgreSQL + PostGIS + Object Storage
                |
      OUTBOX + JOB QUEUE
                |
       WORKER EXECUTORS
                |
       SOURCE CONNECTORS
```

This preserves transactional integrity for evidence, identity bridges, reports, cases and audit logs while moving expensive ingestion, matching, indexing and control evaluation off the request path.

The core schema requires the system to centralize accountability relationships rather than underlying source records, preserve source authority, use first-class evidence/provenance/identity bridges/events, and maintain separate public and assurance projections.

---

# 1. Module Architecture

## 1.1 Platform modules

### A. Access & Authorization Module
Responsibilities:
- authenticate citizen, government, assurance and service identities;
- resolve roles, organization, jurisdiction and access class;
- enforce object, evidence, field and action policies;
- create scoped access contexts for every request;
- issue service-to-service authorization context.

Owns:
`users`, `service_principals`, `roles`, `permissions`, `access_policies`, `delegations`, `sessions`.

Must not own source-government identities as master data; it may reference trusted identity providers.

### B. Source Registry Module
Owns source-system metadata, custody, legal/access basis, capabilities, identifier namespaces, freshness expectations and connector lifecycle.

State:
`DISCOVERED → VALIDATING → APPROVED → TESTING → PRODUCTION_ELIGIBLE → ACTIVE → DEGRADED/PAUSED → RETIRED`.

### C. Connector Runtime Module
Provides the common connector SDK/runtime. It executes source-specific adapters but does not own business-domain truth.

Responsibilities:
- scheduling;
- authentication;
- rate limiting;
- retries;
- pagination/cursors;
- raw observation capture;
- failure classification;
- idempotency;
- connector health.

### D. Snapshot Module
Owns immutable source observations, content hashes, raw-storage pointers, parser/connector versions and observation windows.

Rule: a changed source representation produces a new snapshot; historical observations are never silently overwritten.

### E. Evidence Module
Owns evidence objects, evidence metadata, hashes, access class, evidence relationships, restricted paths, retraction/tombstone state and upload processing.

### F. Provenance Module
Owns provenance chains for direct observations, normalization, reconciliation, temporal reconciliation, control rules, aggregation, AI assistance and human adjudication.

### G. Identifier Registry Module
Indexes native identifiers and namespaces without assuming global uniqueness.

### H. Event Module
Normalizes source occurrences into the temporal spine. Event creation is append-oriented and version-preserving.

### I. Relationship / Graph Module
Owns typed edges and their evidence envelopes. It provides bounded graph traversal, relationship explanations and relationship versioning.

### J. Search Module
Builds a read-optimized index from canonical public/assurance projections. Search is never authoritative truth.

### K. Notification Module
Handles citizen report/case notifications, government workflow notifications and source/connector alerts.

### L. Audit Module
Owns immutable/tamper-evident administrative audit events for high-impact mutations and restricted access.

### M. Governance Module
Owns schema versions, ruleset publication, connector approval, access-policy publication, retention configuration and system configuration change control.

---

# 2. Domain Modules

## 2.1 Identity & Institution Domain

### Institution Module
Owns `Institution`, `InstitutionUnit`, `GovernmentRole`, `Office`, `PersonRole`, `Jurisdiction` and responsibility relationships.

Key use cases:
- resolve responsible institution/unit;
- identify role valid at a historical date;
- determine candidate custodian;
- map source organizational units to canonical institutions.

### External Entity Module
Owns contractor, supplier, importer, exporter, consultant, concessionaire, service-provider and other non-government entities.

Identity evidence remains explicit: legal registration identifiers, documented references, structured multi-field matches, etc. Similar names never become automatic identity proof.

---

## 2.2 Project & Program Module

Owns project/program records and project lifecycle facts.

Responsibilities:
- project object lifecycle;
- project-to-program relationship;
- implementing/responsible unit;
- project locations;
- reported completion;
- project lineage across source systems;
- link to procurement and financial objects through explicit bridges.

Does not create procurement, financial or physical-verification facts directly; it consumes their domain contracts.

---

## 2.3 Procurement Module

Owns:
- procurement;
- solicitation;
- bid lifecycle;
- award;
- contract;
- NTP;
- contractor relationship.

Workflow:
```text
PROCUREMENT CREATED
  ↓
POSTED
  ↓
BID/CLOSING
  ↓
AWARD
  ↓
NOA
  ↓
CONTRACT
  ↓
NTP
  ↓
IMPLEMENTATION
```

A project link is created only through a bridge with basis/evidence/adjudication state.

---

## 2.4 Financial Trace Module

Owns budget, appropriation, allotment, obligation, disbursement and payment/settlement objects.

The financial state machine is explicitly non-collapsing:

```text
BUDGET / APPROPRIATION
      ↓
ALLOTMENT
      ↓
OBLIGATION
      ↓
DISBURSEMENT DOCUMENTATION
      ↓
ACCOUNTING/JEV
      ↓
SETTLEMENT / PAYMENT
```

An obligation never serializes as `PAID`. Payment settlement requires its own evidence.

---

## 2.5 Service & Daily Operations Module

This module operationalizes the broader government lifecycle:

```text
PERSON/BUSINESS
 → APPLICATION/REQUEST
 → IDENTITY/ELIGIBILITY
 → DOCUMENTS
 → ASSESSMENT
 → INSPECTION
 → DECISION
 → FEE/TAX/PAYMENT
 → RELEASE/BENEFIT/LICENSE/PERMIT
 → APPEAL/REVIEW
 → OUTCOME
```

Owns canonical `SERVICE`, `APPLICATION`, `TRANSACTION`, `PERMIT`, `LICENSE`, and operational inspection/decision events.

The module must use minimum lawful data. Individual citizen transaction details are restricted by default.

---

## 2.6 Customs & Port Module

Owns the distinct customs/port lifecycle:

```text
SHIPMENT
 → BILL_OF_LADING
 → DISCHARGE
 → GOODS_DECLARATION
 → ASSESSMENT
 → PAYMENT
 → RELEASE_INSTRUCTION
 → PHYSICAL_RELEASE
```

A B/L cannot imply a declaration, payment or release. Each bridge is separately evidenced.

---

## 2.7 Airport & Transport Module

Owns airport/project/asset/operational objects and transport events, including:
- airports;
- runways;
- terminals;
- certification/inspection;
- operational authorization;
- flight/cargo events where lawful;
- transport routes/operators/concessions.

Project lifecycle is separate from operational status.

```text
AIRPORT ASSET
 → PROJECT
 → PROCUREMENT
 → CONTRACT
 → NTP
 → IMPLEMENTATION
 → INSPECTION
 → ACCEPTANCE
 → OPERATIONAL STATE
```

---

## 2.8 Asset, Location & Geospatial Module

Owns physical assets, canonical locations, geometries, spatial relationships and generalized/restricted locations.

Supports:
`POINT`, `LINESTRING`, `POLYGON`, `ROUTE_SEGMENT`, `ADMIN_AREA`, `GENERALIZED_AREA`.

Spatial matching is candidate evidence, not identity proof by itself.

---

## 2.9 Outcome Module

Owns measured outcomes separately from project status.

Examples:
- travel-time reduction;
- flood exposure reduction;
- cargo throughput;
- service turnaround time;
- permit processing time;
- road condition;
- airport capacity;
- households served.

Every outcome includes measurement period, source, uncertainty and status.

---

# 3. Accountability Workflow Modules

## 3.1 Control Rule Module

Owns versioned expectations, required inputs, comparison populations, exception policies and review requirements.

A rule describes what should be evaluated, not what happened.

Example:
```text
RULE: project financial continuity
EXPECTED: contract → obligation → disbursement → settlement
INPUTS: contract evidence + financial source observations
OUTPUT: CONTROL_STATE
```

## 3.2 Control Evaluation Module

Consumes canonical objects/events and evaluates versioned rules asynchronously.

Outputs:
`CONTROL_STATE`, `SIGNAL`, `EVIDENCE_GAP`, `CONTRADICTION`, `EXCEPTION_REFERENCE`.

Signals must store rule version, input objects, evidence, possible explanations and confidence.

## 3.3 Identity Resolution Module

Pipeline:
```text
IDENTIFIER INDEX
 → CANDIDATE MATCHES
 → BASIS EVALUATION
 → EVIDENCE CHECK
 → AUTO-SUPPORT / HUMAN REVIEW / UNRESOLVED
 → BRIDGE VERSION
```

Only strong evidence permits `CONFIRMED`. Ambiguous matches remain `PROPOSED` or `UNRESOLVED`.

## 3.4 Citizen Report Module

Owns citizen-originated reports and evidence intake.

State machine:
```text
DRAFT
 → SUBMITTED
 → RECEIVED
 → TRIAGE
 → EVIDENCE REVIEW
 → ROUTED
 → ACKNOWLEDGED
 → UNDER REVIEW
 → RESPONSE RECEIVED
 → RESOLUTION RECORDED
 → CLOSED / MONITORING
```

Alternate states:
`NEEDS_MORE_INFORMATION`, `DUPLICATE_MERGED`, `OUTSIDE_SCOPE`, `REFERRED`, `UNRESOLVED`.

## 3.5 Report Matching Module

Maps reports to zero/one/many candidate objects.

```text
REPORT
 → CANDIDATE OBJECTS
 → MATCH BASIS / SCORE
 → EVIDENCE REVIEW
 → CONFIRMED LINK OR UNRESOLVED
```

No automatic identity proof from name/location similarity.

## 3.6 Case & Workflow Module

A case may aggregate reports, signals, evidence, records, institutions and responses.

```text
REPORT / SIGNAL
 → TRIAGE
 → EVIDENCE SUFFICIENCY
 → CONTEXT/EXCEPTION CHECK
 → HUMAN REVIEW
 → CASE
 → ROUTING
 → OFFICIAL REVIEW
 → RESPONSE
 → RESOLUTION
```

Case status and official government adjudication remain distinct.

## 3.7 Routing Module

Produces decision-support recommendations:
- likely custodian;
- candidate authorities;
- basis;
- required evidence;
- routing confidence;
- legal-scope note;
- review state.

Routing must remain reviewable and may never be interpreted as an official jurisdictional decision unless the competent authority confirms it.

## 3.8 Response & Resolution Module

Stores agency responses and resolutions. Official findings must point to authoritative external records.

Resolution types include:
`EXPLAINED`, `CORRECTED`, `REMEDIED`, `REFERRED`, `OUTSIDE_SCOPE`, `DUPLICATE`, `UNRESOLVED`, `NO_ACTION_RECORDED`, `OFFICIAL_FINDING`.

---

# 4. Public and Assurance Composition

## 4.1 Public Projection Service
Builds safe read models from the core graph.

Public object view:
```text
WHAT IT IS
STATUS
RESPONSIBLE INSTITUTION
MONEY / RESOURCE
TIMELINE
WHAT IS KNOWN
WHAT IS NOT ESTABLISHED
RELATED RECORDS
EVIDENCE
REPORT
```

The public API never queries raw internal graph structures directly.

## 4.2 Assurance Projection Service
Adds:
- signals;
- control states;
- identity bridges;
- evidence gaps;
- restricted evidence references;
- routing candidates;
- case context.

Access is evaluated per object/edge/evidence/action. Government employment alone does not imply unrestricted access.

---

# 5. Request Path Architecture

## 5.1 Synchronous path
Use for operations that need an immediate committed result:
```text
GET public object/projection
GET search
POST report metadata
POST bridge adjudication
POST case state transition
POST response metadata
POST resolution metadata
```

## 5.2 Asynchronous path
Use for expensive or external work:
```text
source ingestion
document parsing
media scanning/derivatives
identifier extraction
identity matching
control evaluation
comparison analytics
search indexing
notifications
backfills
reprocessing
```

The API acknowledges the job; the worker commits durable state later.

---

# 6. Transaction Boundaries

A single database transaction should normally cover one domain mutation plus its mandatory audit/outbox records.

Example report submission transaction:
```text
BEGIN
  create REPORT
  create initial REPORT event
  create audit record
  create outbox event report.submitted
COMMIT
```

Evidence binaries are stored through a separate durable upload path; metadata is committed atomically with the report/evidence registration.

Do not use distributed transactions across source agencies. External source operations are integration events, not part of the eGovTrace database transaction.

---

# 7. Outbox and Job Model

All asynchronous domain-triggering events use an outbox pattern.

```text
DOMAIN TRANSACTION
      ↓
OUTBOX RECORD
      ↓
DISPATCHER
      ↓
QUEUE
      ↓
WORKER
      ↓
IDEMPOTENT HANDLER
      ↓
DOMAIN UPDATE
```

Required job fields:
`job_id`, `job_type`, `input_ids`, `status`, `started_at`, `completed_at`, `worker_version`, `error_code`, `retry_count`, `correlation_id`.

Retry classes:
- transient;
- rate-limited;
- authentication;
- schema drift;
- validation;
- permanent source denial;
- policy rejection.

---

# 8. Connector-to-Domain Workflow

Every source ingestion run follows:

```text
SOURCE CONNECTOR
 → RAW OBSERVATION
 → SNAPSHOT
 → SCHEMA VALIDATION
 → NORMALIZATION
 → SOURCE OBJECT
 → IDENTIFIER EXTRACTION
 → EVENT EXTRACTION
 → CANDIDATE BRIDGES
 → CONTROL EVALUATION
 → PUBLIC/ASSURANCE PROJECTION
 → SEARCH INDEX
```

At any failure, the pipeline produces a typed state and may quarantine the affected record rather than dropping it.

Source failures include:
`NO_RECORD_OBSERVED`, `SOURCE_TEMPORARILY_UNAVAILABLE`, `ACCESS_DENIED`, `AUTHENTICATION_FAILED`, `SCHEMA_CHANGED`, `PARSER_FAILED`, `RESTRICTED`, `RETRACTED`, `IDENTITY_UNRESOLVED`.

---

# 9. Core End-to-End Workflows

## Workflow A — Project ingestion
1. Connector retrieves source record.
2. Snapshot service stores immutable observation metadata.
3. Normalizer maps fields without overwriting raw values.
4. Object service upserts a source representation.
5. Identifier service indexes native IDs.
6. Event service emits lifecycle events.
7. Project service creates/updates canonical candidate.
8. Provenance is attached.
9. Bridge engine searches for related budget/procurement objects.
10. Public projection refreshes only after access/evidence checks.

## Workflow B — Project → procurement
1. Project object exists.
2. Procurement candidate search uses identifiers first.
3. Candidate bridge stores basis/evidence/confidence.
4. Strong documented reference can move bridge to `SUPPORTED`/`CONFIRMED`; weak similarity remains unresolved.
5. Procurement lifecycle may then be rendered against the project.

## Workflow C — Procurement → contract
1. Procurement observation arrives.
2. Award and contract records are normalized separately.
3. Contract-to-procurement relation requires procurement reference or other explicit evidence.
4. NTP becomes a separate contract child/event object.

## Workflow D — Contract → financial execution
1. Financial connector retrieves budget/allotment/obligation records.
2. Identifier registry proposes candidates.
3. Bridge adjudication establishes or rejects relationships.
4. Obligation, disbursement and settlement remain independent objects/events.
5. Missing downstream evidence creates an evidence gap, not a negative fact.

## Workflow E — Project → physical outcome
1. Completion statement is observed.
2. Inspection/acceptance evidence is separately ingested.
3. Physical verification, where available, creates a distinct event.
4. Outcome measurements become outcome objects.
5. Control engine compares intended output, reported output, verified output and operational outcome.

## Workflow F — Citizen report → case
1. Mobile client creates local draft ID.
2. Evidence uploads receive idempotency keys and evidence IDs.
3. Report metadata is committed.
4. `report.submitted` is emitted.
5. Triage creates candidate object matches.
6. Evidence review identifies signal/control issue or ordinary service issue.
7. Case service opens/merges a case when warranted.
8. Routing service produces candidate authority.
9. Human workflow confirms route.
10. Government response is recorded.
11. Resolution is recorded and public projection updated according to visibility rules.

## Workflow G — Control signal → official review
```text
SIGNAL
 → EVIDENCE SUFFICIENCY
 → EXCEPTION CHECK
 → HUMAN REVIEW
 → CONTROL ISSUE / EXPLAINED
 → CASE
 → AUTHORITY REVIEW
 → OFFICIAL RECORD
```

Never `SIGNAL → CORRUPTION`.

---

# 10. Domain Event Contracts

Internal event names:
```text
source.snapshot.created
source.snapshot.superseded
object.created
object.updated
identifier.discovered
bridge.proposed
bridge.adjudicated
event.created
control.evaluated
signal.created
evidence.gap.created
report.submitted
report.matched
case.opened
case.routed
response.received
resolution.recorded
search.reindex.requested
```

Events are implementation messages, not claims about real-world events. Real-world occurrences are represented by canonical `EVENT` records with source provenance.

---

# 11. Consistency Model

Strong consistency required for:
- report state transitions;
- case state transitions;
- identity bridge adjudication;
- access policy changes;
- evidence metadata registration;
- audit logs;
- official-resolution publication state.

Eventual consistency acceptable for:
- search index;
- public projection refresh after canonical mutation;
- analytics;
- control signals;
- notifications;
- aggregate dashboards.

A public page must never read partially committed graph state. Projection jobs use versioned read models.

---

# 12. Idempotency and Concurrency

Every mutation exposed to mobile or external systems must accept an idempotency key.

Examples:
```text
POST /reports → Idempotency-Key
POST /evidence/uploads → upload session ID
POST /case/transitions → command ID
```

Optimistic concurrency fields:
`object_version`, `expected_version`.

Conflicting updates return a typed conflict instead of silently overwriting another actor's change.

---

# 13. API Composition

## Public
```text
GET /api/v1/public/search
GET /api/v1/public/objects/{id}
GET /api/v1/public/projects/{id}
GET /api/v1/public/entities/{id}
GET /api/v1/public/services/{id}
GET /api/v1/public/evidence/{id}
POST /api/v1/public/reports
POST /api/v1/public/reports/{id}/attachments
GET /api/v1/public/reports/{id}
```

## Assurance
```text
GET /api/v1/assurance/objects/{id}
GET /api/v1/assurance/signals/{id}
GET /api/v1/assurance/bridges/{id}
POST /api/v1/assurance/bridges/{id}/adjudicate
GET /api/v1/assurance/cases/{id}
POST /api/v1/assurance/cases/{id}/route
POST /api/v1/assurance/cases/{id}/close
```

## Source/connector
```text
GET /api/v1/admin/sources
GET /api/v1/admin/connectors/{id}/health
POST /api/v1/admin/connectors/{id}/runs
GET /api/v1/admin/runs/{id}
```

## Governance
```text
POST /api/v1/admin/rules
POST /api/v1/admin/rules/{id}/publish
POST /api/v1/admin/access-policies
GET /api/v1/admin/audit-logs
```

Exact endpoint details belong in the OpenAPI contract and must remain versioned independently of implementation.

---

# 14. Service-to-Service Contracts

Every module communicates through application commands/queries rather than direct table writes into another domain.

Example:
```text
ProjectService.createProject()
ProcurementService.linkToProject()
FinancialService.attachObligation()
EvidenceService.registerEvidence()
IdentityService.proposeBridge()
ControlService.evaluateObject()
CaseService.openCase()
```

Cross-module access should use typed repositories/query services or domain APIs. Avoid generic `updateObject()` endpoints that permit arbitrary mutation of foreign-domain state.

---

# 15. Persistence Ownership

Recommended table ownership:

| Module | Primary tables |
|---|---|
| Institution | institutions, institution_units, roles, jurisdictions |
| External Entity | external_entities |
| Object Core | object_registry, object_versions |
| Identifier | identifiers |
| Source | sources, source_records |
| Snapshot | source_snapshots |
| Evidence | evidence, evidence_access, evidence_links |
| Provenance | provenance |
| Event | events |
| Graph | edges, edge_evidence |
| Project | projects, programs |
| Procurement | procurements, awards, contracts, ntps |
| Finance | budgets, appropriations, allotments, obligations, disbursements, payments |
| Service | services, applications, transactions, permits, licenses, inspections |
| Customs | shipments, bills_of_lading, customs_declarations, assessments, releases |
| Asset/Geo | assets, locations, spatial_relations |
| Outcome | outcomes |
| Controls | control_rules, control_states, comparison_sets, signals, exceptions, evidence_gaps, contradictions |
| Reports | reports, report_matches, report_evidence |
| Cases | cases, routing_recommendations, responses, resolutions |
| Audit | audit_logs, audit_findings |
| Governance | schemas, migrations, access_policies, retention_policies |
| Search | external index; no source-of-truth tables |
| Jobs | jobs, job_attempts, outbox |

A shared `object_registry` remains a cross-domain index, not a replacement for typed tables.

---

# 16. Data Write Rules

1. Source-derived values are immutable at the observation level.
2. Normalized values are versioned.
3. Derived relationships require provenance.
4. Cross-domain mutation requires an application command.
5. Public projections are generated, not manually edited.
6. Search documents are disposable/rebuildable.
7. Evidence binaries are immutable by content hash.
8. Retraction uses policy-defined state/tombstone behavior.
9. High-impact administrative changes generate audit logs.
10. No module can mutate another module's source facts directly.

---

# 17. Identity Resolution Runtime

## Matching tiers
```text
T0 EXACT_NATIVE_IDENTIFIER
T1 DOCUMENT_EXPLICIT_REFERENCE
T2 EXPLICIT_SOURCE_CROSSREFERENCE
T3 STRUCTURED_MULTI_FIELD_MATCH
T4 TEMPORAL + LOCATION CORROBORATION
T5 NAME_ONLY
T6 AMOUNT_ONLY
T7 MODEL_SUGGESTION
```

T5–T7 cannot auto-confirm identity.

## Human adjudication queue

Prioritize:
- high-impact joins;
- low-confidence joins used by controls;
- conflicting evidence;
- joins that change public representation;
- historical successor/replacement candidates.

Every adjudication creates a versioned audit trail and rationale.

---

# 18. Evidence-Gap Runtime

An evidence gap is created when a rule expects evidence that has not been established.

Example:
```text
EXPECTED: project → contract
OBSERVED: project
STATE: GAP / NOT_PUBLICLY_RECOVERED
```

Reason states:
`NOT_PUBLICLY_RECOVERED`, `RESTRICTED`, `SOURCE_UNAVAILABLE`, `NOT_REQUESTED`, `REQUEST_PENDING`, `REQUEST_DENIED`, `REQUEST_FULFILLED`, `NOT_APPLICABLE`.

The public wording must be generated from the state and never collapse to a negative assertion.

---

# 19. Contradiction Runtime

When two sources conflict, both claims are preserved and a contradiction object is created.

```text
SOURCE A: COMPLETED 2021-10-31
SOURCE B: COMPLETED 2022-02-14
        ↓
DATE/STATUS CONTRADICTION
        ↓
NO SILENT RECONCILIATION
```

Resolution may later be performed by human adjudication or a competent source.

---

# 20. Control Engine Architecture

```text
RULE REGISTRY
    ↓
RULE VERSION
    ↓
INPUT SELECTOR
    ↓
SOURCE / CANONICAL OBJECTS
    ↓
TEMPORAL FILTER
    ↓
EXCEPTION FILTER
    ↓
CONTROL EVALUATOR
    ↓
CONTROL STATE
    ↓
SIGNAL / NO SIGNAL
```

The evaluator must emit a full explanation object:
- rule/version;
- inputs;
- expected state;
- observed state;
- variance;
- exceptions checked;
- missing evidence;
- possible explanations;
- confidence;
- generated-at timestamp.

---

# 21. Public Projection Safety

Projection rules must enforce:
```text
restricted object → omitted
restricted field → redacted
private reporter → protected reference
unadjudicated signal → not framed as wrongdoing
internal hypothesis → not public
official finding → only when authoritative source exists
```

Projection generation is a policy decision, not a frontend filter.

---

# 22. Citizen Evidence Upload Architecture

```text
CLIENT DRAFT
 ↓
UPLOAD SESSION
 ↓
CHUNK/RESUMABLE UPLOAD
 ↓
MALWARE / FILE VALIDATION
 ↓
CONTENT HASH
 ↓
EVIDENCE REGISTRATION
 ↓
ACCESS CLASSIFICATION
 ↓
PROVENANCE
 ↓
REPORT LINK
```

The original upload remains immutable; normalized derivatives are separate objects. EXIF and other metadata are handled according to privacy policy.

---

# 23. Search Architecture

Canonical object changes publish `search.reindex.requested`.

Index documents should contain only fields appropriate to the target audience.

Ranking:
```text
exact eGovTrace ID
exact native identifier
exact title/name
exact institution/place
strong evidence-backed relation
fuzzy candidate
```

Fuzzy candidate must be visibly labeled candidate.

---

# 24. Caching

Cache candidates:
- public object projections;
- public search results;
- static source metadata;
- geospatial tiles/aggregates;
- read-only public evidence metadata.

Do not cache unrestricted assurance data in a public cache.

Cache keys must include audience/access policy version where access can affect the response.

---

# 25. Observability

Every request/job/run carries a `correlation_id`.

Core telemetry:
```text
API latency / errors
job queue age
connector success/failure rate
source freshness
schema drift detections
normalization rejects
identity queue depth
control evaluation queue depth
evidence processing failures
report submission success
case routing age
provenance completeness
public projection lag
search indexing lag
```

Sensitive data must not be copied into ordinary logs.

---

# 26. Failure and Recovery

## Connector failure
Keep last valid snapshot, mark source health degraded, create typed run failure, schedule retry according to policy.

## Worker failure
Retry idempotently. After threshold, move to dead-letter state with diagnostic context.

## Projection failure
Canonical state remains authoritative; projection is rebuilt.

## Search failure
Search degrades independently; direct object lookup remains available.

## Database failure
Restore from backup while preserving object identity, evidence hashes, report/case state, snapshots, audit logs and access control.

---

# 27. Reprocessing

Parser/normalizer/rule changes never mutate history in place.

```text
OLD SNAPSHOT
   ↓
NEW PARSER/NORMALIZER
   ↓
NEW NORMALIZED VERSION
   ↓
NEW DERIVED VERSION
   ↓
RE-EVALUATED CONTROLS
```

The platform can publish the latest supported projection while retaining old derivation provenance for reproducibility.

---

# 28. Temporal Execution Rules

Backend code must use separate fields for:
- event time;
- source update time;
- observation time;
- research/processing time.

Every historical query accepts an explicit temporal context where necessary.

Example:
```text
GET object at 2021-12-31
≠
GET object as observed by eGovTrace on 2026-09-05
```

This distinction is mandatory for audit reconstruction and historical continuity.

---

# 29. Access Model

Minimum access classes:
```text
PUBLIC
PUBLIC_WITH_LIMITATION
AUTHENTICATED_CITIZEN
GOVERNMENT_INTERNAL
ASSURANCE_RESTRICTED
CONFIDENTIAL_EXTERNAL_CUSTODY
SECURITY_RESTRICTED
```

Authorization decision function:
```text
ALLOW/DENY = principal + role + organization + jurisdiction + object + field + action + legal/access basis + policy version
```

The decision itself is auditable.

---

# 30. Security Boundaries

Separate at minimum:
```text
PUBLIC API
ASSURANCE API
ADMIN/GOVERNANCE API
CONNECTOR RUNTIME NETWORK
EVIDENCE STORAGE
DATABASE
JOB WORKERS
```

No public API has direct object-store administrative access. Connector credentials are isolated from application credentials. Production secrets are never used in development.

Citizen media is untrusted input.

---

# 31. Privacy by Design

The backend should minimize collection rather than rely only on frontend redaction.

Default rules:
- citizen identity private;
- precise citizen location restricted unless publication is lawful/necessary;
- individual transaction details restricted;
- sensitive source fields stored only with explicit basis;
- no credentials/private keys in graph;
- master-data custodians remain authoritative.

The 2026 E-Governance Act IRR calls for government-wide interoperability, common data sets/API access, master-data stewardship, secure data exchange and PIA/access/security controls for inter-agency sharing. eGovTrace should therefore integrate through those authorized interoperability mechanisms rather than invent an independent master-data regime. citeturn820267search0

---

# 32. eGovPH Adapter

eGovPH integration is an adapter, not an internal dependency of core accountability logic.

Allowed capabilities:
```text
launch/deep link
trusted authentication handoff
notification handoff
citizen entry point
service context
```

Core eGovTrace workflows must continue to work when eGovPH integration is unavailable.

---

# 33. Government Assurance Workspace Backend

Primary workflow screens require these backend query families:
```text
INBOX: unresolved signals / cases
ENTITY TRACE: institution/person-role/external entity relationships
PROJECT TRACE: lifecycle and money
SOURCE TRACE: source health/observation history
IDENTITY QUEUE: proposed/unresolved bridges
EVIDENCE QUEUE: missing/restricted/contradictory records
CONTROL QUEUE: rule failures and exceptions
CASE WORKFLOW: route/respond/resolve
AUDIT TRAIL: every high-impact action
```

The workspace consumes assurance projection APIs, not raw SQL.

---

# 34. First Four Vertical Implementations

## Vertical 1 — FMR / infrastructure
Exercises:
`PROJECT → BUDGET → PROCUREMENT → CONTRACT → FINANCE → INSPECTION → OUTCOME → CITIZEN REPORT`.

Purpose: validate identifier-bridge, evidence-gap, temporal and money-chain design.

The existing research demonstrates why unresolved procurement/financial bridges must stay unresolved rather than being guessed. fileciteturn19file7L1148-L1206

## Vertical 2 — Customs / port
Exercises:
`B/L → DISCHARGE → DECLARATION → ASSESSMENT → PAYMENT → RELEASE`.

## Vertical 3 — Airport
Exercises:
`PROJECT → PROCUREMENT → CONTRACT → NTP → INSPECTION → ASSET → OPERATIONAL STATE`.

## Vertical 4 — LGU service
Exercises:
`SERVICE → APPLICATION → ASSESSMENT → INSPECTION → DECISION → PAYMENT → PERMIT/RELEASE → REPORT`.

These mirror the core schema's project, customs and LGU-service fixtures rather than creating separate incompatible ontologies. fileciteturn23file0L252-L316

---

# 35. v1 Repository Layout

```text
apps/
  public-web/
  assurance-web/
  api/

packages/
  domain-core/
  domain-institution/
  domain-project/
  domain-procurement/
  domain-finance/
  domain-service/
  domain-customs/
  domain-transport/
  domain-asset-geo/
  domain-outcome/
  domain-report/
  domain-case/
  domain-control/
  domain-identity/
  platform-access/
  platform-source/
  platform-snapshot/
  platform-evidence/
  platform-provenance/
  platform-event/
  platform-graph/
  platform-search/
  platform-notification/
  platform-audit/
  platform-governance/
  connector-sdk/
  connectors/

workers/
  ingestion-worker/
  extraction-worker/
  identity-worker/
  control-worker/
  indexing-worker/
  media-worker/
  report-triage-worker/

infrastructure/
  postgres/
  object-storage/
  queue/
  observability/
  deployment/

contracts/
  openapi/
  events/
  schemas/
  connector-contracts/
```

The package layout is a code boundary. Deployment boundaries may differ until measured scale requires extraction.

---

# 36. Dependency Rules

Allowed direction:
```text
API → Application Service → Domain Module → Repository/Platform Adapter
                                         ↓
                                      Domain Events
                                         ↓
                                      Workers
```

Forbidden:
```text
controller → arbitrary table
domain A → domain B internal table write
frontend → database
worker → unversioned rule logic
search index → source of truth
AI → direct source fact mutation
```

---

# 37. Minimum Build Surface

The first usable backend does **not** need every national source connector. It needs the platform skeleton plus four verticals.

### Sprint 1 — Core platform
- object registry;
- source registry;
- snapshot/provenance;
- evidence metadata;
- identifier registry;
- audit/outbox/job framework.

### Sprint 2 — Reconciliation core
- project/procurement/contract;
- finance;
- identity bridge engine;
- event service;
- graph relationships.

### Sprint 3 — Citizen accountability
- report API;
- evidence upload;
- report matching;
- case/routing;
- public projection;
- notification.

### Sprint 4 — Demonstration verticals
- FMR;
- customs;
- airport;
- LGU service.

### Sprint 5 — Control/assurance
- control rule registry;
- evaluator;
- comparison sets;
- signal/case workflow;
- assurance projection.

### Sprint 6 — eGovPH / broader connector rollout
Only after source-authority, access, privacy, security and interoperability validations are satisfied.

---

# 38. Workflow Safety Invariants

The backend must enforce these invariants as code/tests, not just documentation:

```text
CONNECTION ≠ CORRUPTION
IDENTIFIER RECOVERY ≠ IDENTIFIER PROOF
NOT OBSERVED ≠ ABSENT
UNAVAILABLE ≠ FALSE
PAYMENT-INSTRUCTION ≠ PAYMENT-SETTLEMENT
SEARCH TIME ≠ EVIDENCE DATE
AI OUTPUT ≠ FACT
SIGNAL ≠ OFFICIAL FINDING
REPORT ≠ CASE
CASE ≠ OFFICIAL ADJUDICATION
SOURCE STATUS ≠ EGOVTRACE ANALYTICAL STATUS
SAME LOCATION ≠ SAME PROJECT
SAME CONTRACTOR ≠ SAME PROJECT
FUZZY MATCH ≠ CONFIRMED IDENTITY
```

---

# 39. Test Architecture

## Unit tests
- domain invariants;
- state transitions;
- access decisions;
- normalization;
- evidence wording;
- bridge scoring/adjudication.

## Integration tests
- source → snapshot → object;
- object → bridge;
- bridge → graph;
- graph → control;
- signal → case;
- report → evidence → case;
- case → response → resolution → public projection.

## Adversarial fixtures
```text
same contractor / different project
same place / different year
same title / different project
same amount / different object
same native identifier in different namespace
source correction
source withdrawal
partial payment evidence
missing payment evidence
conflicting completion dates
valid exception
parser schema drift
network timeout
retry duplicate
restricted field attempted publicly
```

## Acceptance gates
No release may pass the core pipeline until the relevant invariant and provenance tests pass.

---

# 40. Performance Architecture

Primary workloads:
1. public lookup;
2. assurance traversal;
3. ingestion/reconciliation.

Public lookup uses indexed projections.
Assurance traversal uses bounded recursive queries/relationship indexes.
Expensive reconciliation is asynchronous.

A graph database is optional and must be justified by measured traversal workload, not adopted merely because the domain is called a graph.

---

# 41. Scale Extraction Triggers

Extract a module into an independently deployed service only when at least one is demonstrated:
- independent scaling requirement;
- independent security boundary;
- independent deployment cadence;
- failure isolation need;
- sustained workload incompatible with modular-monolith scaling.

Likely first extraction candidates, if evidence requires it:
```text
connector runtime
media/evidence processing
search
control analytics
```

Do not pre-commit to dozens of services.

---

# 42. Governance and Change Control

Every high-impact change requires versioning for:
```text
schema
API contract
connector
parser
normalizer
control rule
AI model
access policy
projection policy
```

Semantic changes require new versions. Historical derived states remain reproducible.

---

# 43. AI Assistance Boundary

AI workers may:
- classify documents;
- extract candidate fields;
- propose identity matches;
- detect duplicate records;
- summarize evidence;
- suggest routing;
- propose schema-drift mappings.

AI may not directly:
- overwrite source facts;
- confirm a bridge without the required adjudication;
- create an official finding;
- label an entity corrupt/guilty;
- close a case as adjudicated.

AI tasks create versioned proposal objects with model/version/input references.

---

# 44. What Becomes Real in the Backend

The architecture converts the logical schema into these executable loops:

```text
SOURCE LOOP
observe → snapshot → normalize → provenance

IDENTITY LOOP
identify → propose bridge → adjudicate → version

LIFECYCLE LOOP
event → relationship → control evaluation

EVIDENCE LOOP
collect → hash → classify → link → expose according to policy

ACCOUNTABILITY LOOP
report → match → triage → case → route → response → resolution

ASSURANCE LOOP
rule → control state → signal → review → official record

PUBLIC LOOP
search → understand → evidence → report → follow resolution
```

---

# 45. Definition of Done for v1 Backend

The backend architecture is considered implementation-ready when:

```text
[ ] domain modules have explicit owners and APIs
[ ] no cross-domain arbitrary table writes remain
[ ] all source observations are snapshot/provenance aware
[ ] identity bridge workflow is enforced
[ ] evidence and access class are enforced
[ ] event time and observation time are separate
[ ] report and case workflows are transactional
[ ] asynchronous jobs are idempotent
[ ] public/assurance projections are separated
[ ] source failures are typed
[ ] contradictions and evidence gaps are first-class
[ ] audit logs cover high-impact actions
[ ] OpenAPI and event contracts are versioned
[ ] four demonstration verticals run end-to-end
[ ] adversarial identity fixtures pass
[ ] mobile report upload/retry behavior passes
[ ] recovery/reprocessing tests pass
[ ] no AI path can silently mutate authoritative facts
```

---

# 46. Relationship to Existing eGovTrace Artifacts

This architecture is downstream of, and must not contradict:

- Core Data Model and Graph Schema v1;
- Source Connector and API Specification v1;
- Citizen Product and Mobile Web Architecture v1;
- Source System and Data Boundary Architecture v1;
- National Government Accountability and Operational Control Inventory;
- G4 identity-continuity/reconciliation research.

The core schema explicitly identifies this artifact as the next bridge from logical objects to actual software boundaries, and names the required service families: Object, Identity, Evidence, Source, Event, Control, Report, Case/Workflow, Search, Notification, Access/Authorization and Audit. fileciteturn23file0L483-L504

---

# 47. Final Engineering Position

The backend should not be designed as “one giant graph API.” It should be designed as a set of bounded domain capabilities that collectively operate one evidence-backed accountability system.

The key architectural transition is:

```text
SCHEMA
  ↓
DOMAIN OBJECTS
  ↓
APPLICATION COMMANDS / QUERIES
  ↓
TRANSACTIONAL WORKFLOWS
  ↓
ASYNC RECONCILIATION / ANALYTICS
  ↓
PUBLIC + ASSURANCE PROJECTIONS
```

That gives eGovTrace an actual backend execution model without turning it into a replacement ERP, a universal government database, an unrestricted graph explorer, or an automated corruption-determination engine.

**Recommended next engineering artifacts:**
```text
1. eGovTrace_Physical_PostgreSQL_Schema_v1.sql
2. eGovTrace_OpenAPI_v1.yaml
3. eGovTrace_Domain_Event_and_Job_Contracts_v1.md
4. eGovTrace_Connector_SDK_Skeleton_v1/
5. eGovTrace_Backend_Repository_Scaffold_v1/
```

---
