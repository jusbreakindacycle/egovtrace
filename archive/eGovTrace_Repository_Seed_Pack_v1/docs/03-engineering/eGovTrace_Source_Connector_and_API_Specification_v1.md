# eGovTrace Source Connector and API Specification v1

**Status:** APPROVED WORKING ENGINEERING SPECIFICATION / v1 DRAFT FOR BUILD PREPARATION  
**Relationship to G0-G6:** Additive engineering specification derived from approved eGovTrace research/product/data-boundary architecture; not a new formal research gate.  
**Implementation posture:** Build-ready specification baseline, but production deployment remains subject to legal, security, interoperability, privacy, and source-custodian validation.  
**Primary purpose:** Define how eGovTrace discovers, connects to, retrieves, snapshots, normalizes, reconciles, exposes, and governs data from Philippine government source systems without replacing those systems.

---

## 0. Executive Decision

eGovTrace will use a **source-connector architecture** rather than a single government-wide database.

```text
SOURCE SYSTEM
    |
    |  API / public page / document / FOI / approved data exchange
    v
SOURCE CONNECTOR
    |
    +--> RAW OBSERVATION / SNAPSHOT
    |
    +--> SCHEMA VALIDATION
    |
    +--> NORMALIZATION
    |
    +--> PROVENANCE
    |
    +--> IDENTITY / EVENT RECONCILIATION
    v
EGOVTRACE CORE
    |
    +--> OBJECT GRAPH
    +--> EVIDENCE GRAPH
    +--> CONTROL ENGINE
    +--> CASE / REPORT SYSTEM
    v
PUBLIC API / ASSURANCE API / eGovPH INTEGRATION
```

The source remains authoritative for the facts and records it legally owns. eGovTrace owns the **accountability relationship, provenance, normalized events, identity bridges, control states, report/case state, and other explicitly derived objects**.

This directly implements the previously approved source/data-boundary architecture:

> **Centralize the accountability relationship, not every underlying government record.**

---

# 1. Governing Constraints

All connector and API behavior inherits the frozen eGovTrace rules:

```text
SOURCE SYSTEMS REMAIN AUTHORITATIVE FOR THEIR OWN RECORDS.

EGOVTRACE PROVIDES CROSS-SYSTEM RECONCILIATION, NOT SYSTEM REPLACEMENT.

CONNECTION IS NOT CORRUPTION.

IDENTIFIER RECOVERY != IDENTIFIER PROOF.

NOT OBSERVED != ABSENT.

UNAVAILABLE != FALSE.

PAYMENT-INSTRUCTION EVIDENCE != PAYMENT-SETTLEMENT EVIDENCE.

SEARCH TIME != EVIDENCE DATE.

AI OUTPUT != FACT OR LEGAL DETERMINATION.

EVERY MATERIAL CLAIM MUST HAVE PROVENANCE.

EVERY JOIN MUST HAVE AN EXPLICIT EVIDENTIARY BASIS.

EVERY HISTORICAL STATE MUST REMAIN TEMPORALLY PRESERVABLE.

CITIZEN REPORTS ARE CLAIMS/OBSERVATIONS UNTIL ESTABLISHED.

CONTROL BREAKS ARE INVESTIGATION SIGNALS, NOT AUTOMATIC FINDINGS OF WRONGDOING.
```

The current product architecture also establishes that the public product is a standalone mobile-first web/PWA service discoverable and launchable from eGovPH, while eGovTrace remains independently addressable. 

---

# 2. Scope

## 2.1 In scope

This specification covers:

1. Source-system registry.
2. Connector types and connector lifecycle.
3. API connector contracts.
4. Public-document and public-page acquisition.
5. FOI/manual evidence acquisition metadata.
6. Snapshotting, hashing, and versioning.
7. Schema validation and normalization.
8. Domain-native identifiers.
9. Identity-bridge creation and adjudication.
10. Event normalization.
11. Provenance metadata.
12. Public read API.
13. Public report API.
14. Source connector API.
15. Internal graph API.
16. Assurance API.
17. Admin/governance API.
18. eGovPH integration boundary.
19. Security, authentication, authorization, logging, and auditability.
20. Connector observability and failure handling.
21. API versioning and compatibility.
22. Testing and acceptance criteria.

## 2.2 Out of scope for v1

```text
Full replacement of agency systems
Universal real-time access to restricted government databases
Autonomous government case assignment
Automatic legal findings
Automatic corruption classification
National digital twin implementation
Universal identity federation beyond authorized integrations
Centralized storage of every government transaction
```

---

# 3. Source-System Registry

The source registry is the control plane for all external data connections.

## 3.1 Source record

```yaml
source_id: EG-SRC-XXXX
institution_id: INST-XXXX
source_name:
source_owner:
source_type:
  - public_api
  - authenticated_api
  - public_web
  - public_document
  - open_data
  - transparency_portal
  - financial_reporting
  - procurement
  - audit
  - statistics
  - geospatial
  - operational_service
  - foi
  - manual_acquisition
  - approved_data_exchange
authority_domain:
canonical_homepage:
api_base_url:
document_base_url:
public_access:
api_available:
authentication_required:
foi_available:
restricted_access:
identifier_types: []
update_frequency:
historical_availability:
source_time_zone:
data_classification:
legal_constraints: []
privacy_constraints: []
security_requirements: []
owner_contact:
technical_contact:
connector_status:
connector_version:
last_successful_observation:
last_failed_observation:
```

## 3.2 Source lifecycle

```text
DISCOVERED
   ↓
VALIDATING
   ↓
APPROVED FOR CONNECTOR DEVELOPMENT
   ↓
TEST CONNECTOR
   ↓
PRODUCTION-ELIGIBLE
   ↓
ACTIVE
   ↓
DEGRADED / PAUSED / RETIRED
```

No connector becomes production-active without a recorded source authority, access basis, schema expectation, and security classification.

---

# 4. Connector Classes

## 4.1 API Pull Connector

Use when an authorized stable API exists.

```text
SOURCE API
  ↓
AUTHENTICATION
  ↓
REQUEST
  ↓
RATE / RETRY CONTROL
  ↓
RAW RESPONSE
  ↓
HASH / OBSERVATION METADATA
  ↓
SCHEMA VALIDATION
  ↓
NORMALIZATION
  ↓
PROVENANCE
```

Required capabilities:

```text
pagination
cursor handling
retry with backoff
idempotent retrieval
rate-limit awareness
schema/version detection
failure classification
request correlation ID
raw-response preservation where lawful
```

## 4.2 Public Web Connector

Use only where a permitted public web surface is the available source.

```text
PUBLIC URL
  ↓
RETRIEVAL
  ↓
CONTENT HASH
  ↓
SOURCE METADATA
  ↓
PARSER
  ↓
STRUCTURED OBSERVATION
```

The parser must record its own version.

## 4.3 Public Document Connector

```text
DOCUMENT URL
  ↓
DOWNLOAD
  ↓
MIME VALIDATION
  ↓
CONTENT HASH
  ↓
DOCUMENT SNAPSHOT
  ↓
TEXT / TABLE / METADATA EXTRACTION
  ↓
EVIDENCE OBJECTS
```

The original binary should be preserved when lawful and useful for reproducibility.

## 4.4 FOI / Manual Acquisition Connector

```text
QUESTION
  ↓
REQUEST
  ↓
CUSTODIAN
  ↓
RESPONSE
  ↓
RECEIVED DATA
  ↓
HASH + PROVENANCE
  ↓
ACCESS CLASSIFICATION
  ↓
RECONCILIATION
```

The connector represents an acquisition pathway, not an assumption that the requested information exists.

## 4.5 Source Link Connector

Use when eGovTrace only needs to reference the authoritative source.

Store:

```text
source_url
source_record_id
access_timestamp
source_name
source_version if available
availability_state
```

---

# 5. Connector Contract

Every production connector must implement a common contract.

```yaml
connector_id:
source_id:
connector_version:
supported_objects: []
supported_events: []
read_capabilities: []
auth_method:
request_policy:
parser_version:
schema_version:
normalizer_version:
identity_bridge_capabilities: []
output_treatments:
  reference: true|false
  snapshot: true|false
  derived: true|false
  restricted_metadata: true|false
health_checks: []
last_success:
last_failure:
```

## 5.1 Required connector methods

Conceptual interface:

```text
health()
capabilities()
schema()
search(query)
get(record_id)
list(cursor/page)
fetch_document(url/id)
observe(record)
normalize(raw_record)
produce_provenance(raw_record)
```

Not every connector must support every method. Unsupported capabilities must be explicitly declared rather than silently simulated.

---

# 6. Retrieval Envelope

Every source observation must be wrapped in a common envelope.

```json
{
  "observation_id": "OBS-...",
  "source_id": "EG-SRC-...",
  "source_record_id": "native-id",
  "source_record_version": null,
  "retrieved_at": "2026-09-05T00:00:00Z",
  "source_date": null,
  "source_update_date": null,
  "source_url": "...",
  "content_hash": "sha256:...",
  "mime_type": "application/json",
  "parser_version": "...",
  "connector_version": "...",
  "access_class": "PUBLIC",
  "custodian": "...",
  "legal_basis": "...",
  "raw_storage_reference": "...",
  "observation_status": "OBSERVED"
}
```

Important distinction:

```text
source_date      = date represented by the source
retrieved_at     = when eGovTrace observed it
observation_date = research/system observation date
```

These dates must not be collapsed.

---

# 7. Data Treatment Pipeline

```text
RAW
 ↓
OBSERVED
 ↓
VALIDATED
 ↓
NORMALIZED
 ↓
RECONCILED
 ↓
DERIVED
```

Possible terminal states:

```text
UNRESOLVED
STALE
RETRACTED
SUPERSEDED
RESTRICTED
UNAVAILABLE
```

`UNAVAILABLE` must never be transformed into `FALSE`.

---

# 8. Canonical eGovTrace Objects

v1 minimum object classes:

```text
AGENCY
INSTITUTION
PERSON_ROLE
EXTERNAL_ENTITY
PROJECT
PROGRAM
PROCUREMENT
AWARD
CONTRACT
OBLIGATION
DISBURSEMENT
PAYMENT
ASSET
SERVICE
PERMIT
LICENSE
APPLICATION
CUSTOMS_TRANSACTION
PORT_EVENT
AIRPORT_EVENT
AUDIT_RECORD
REPORT
CASE
EVIDENCE
EVENT
IDENTITY_BRIDGE
CONTROL_RULE
CONTROL_STATE
CONTROL_SIGNAL
RESPONSE
RESOLUTION
SOURCE
SNAPSHOT
```

The ontology can expand only through versioned change control.

---

# 9. Native Identifier Model

There is no assumption that one universal government transaction identifier already exists.

```text
NATIVE IDENTIFIERS
        ↓
IDENTITY BRIDGE
        ↓
EGOVTRACE OBJECT ID
```

Examples include:

```text
FMR CODE
UACS/PAP
PhilGEPS REFERENCE
SOLICITATION NUMBER
CONTRACT NUMBER
ORS
B/L
PERMIT NUMBER
APPLICATION NUMBER
PAYMENT REFERENCE
PROJECT ID
```

## 9.1 Identity bridge schema

```yaml
bridge_id:
source_object_a:
source_object_b:
basis_type:
basis_detail:
evidence_ids: []
confidence:
adjudication_state:
validity_period:
created_at:
created_by:
rationale:
```

Permitted adjudication states:

```text
PROPOSED
SUPPORTED
CONFIRMED
REJECTED
SUPERSEDED
UNRESOLVED
```

A bridge cannot be marked `CONFIRMED` merely because identifiers, amounts, contractor names, dates, or titles look similar.

---

# 10. Event Model

Events are the normalized temporal backbone.

## 10.1 Minimum schema

```json
{
  "event_id": "EVT-...",
  "event_type": "NTP_ISSUED",
  "actor_object_id": "...",
  "subject_object_id": "...",
  "source_id": "...",
  "source_record_id": "...",
  "event_date": "2026-01-01",
  "observation_date": "2026-09-05",
  "provenance_ids": ["..."],
  "confidence": "HIGH"
}
```

## 10.2 Initial event vocabulary

```text
BUDGET_APPROVED
ALLOTMENT_ISSUED
BID_POSTED
BID_CLOSED
BID_CANCELLED
AWARD_MADE
NOA_ISSUED
CONTRACT_SIGNED
NTP_ISSUED
OBLIGATION_RECORDED
DISBURSEMENT_RECORDED
PAYMENT_SETTLED
IMPLEMENTATION_STARTED
INSPECTION_COMPLETED
PROJECT_REPORTED_COMPLETE
PROJECT_PHYSICALLY_VERIFIED
SERVICE_REQUESTED
APPLICATION_SUBMITTED
APPLICATION_ASSESSED
INSPECTION_SCHEDULED
INSPECTION_COMPLETED
DECISION_MADE
PERMIT_ISSUED
CUSTOMS_DECLARATION_FILED
CUSTOMS_ASSESSED
CUSTOMS_PAYMENT_RECORDED
CARGO_RELEASED
AUDIT_OBSERVATION_ISSUED
MANAGEMENT_RESPONSE_RECEIVED
CITIZEN_REPORT_SUBMITTED
REPORT_RECEIVED
REPORT_ROUTED
GOVERNMENT_RESPONSE_RECEIVED
CASE_RESOLVED
```

New event types require schema and provenance rules.

---

# 11. Schema Normalization

Normalization is domain-specific but produces a stable canonical layer.

## 11.1 General normalization rules

```text
DO NOT overwrite raw source values.
DO NOT silently repair source facts.
DO NOT silently infer missing fields.
DO preserve native identifiers verbatim.
DO record normalized value separately.
DO record parser/normalizer version.
```

Example:

```json
{
  "native_amount": "PHP 12,500,000.00",
  "normalized_amount": 12500000.00,
  "currency": "PHP",
  "normalization_rule": "currency_php_v1"
}
```

## 11.2 Object grain

Every record must carry an explicit grain:

```text
PROJECT
PROCUREMENT
CONTRACT
TRANSACTION
SHIPMENT
DOCUMENT
EVENT
APPLICATION
PAYMENT
INSPECTION
AUDIT_RECORD
```

A connector must not join two records merely because their values look compatible while their grains differ.

---

# 12. Provenance Model

Every public assertion and derived object must be traceable.

```yaml
provenance_id:
source_id:
source_record_id:
snapshot_id:
extraction_method:
parser_version:
normalizer_version:
rule_id:
rule_version:
input_object_ids: []
input_evidence_ids: []
execution_timestamp:
human_adjudication_state:
```

## 12.1 Provenance chain

```text
SOURCE
 ↓
OBSERVATION
 ↓
EVIDENCE
 ↓
NORMALIZED RECORD
 ↓
IDENTITY BRIDGE / EVENT
 ↓
CONTROL STATE
 ↓
SIGNAL
 ↓
CASE / PUBLIC ASSERTION
```

The chain must be traversable in reverse.

---

# 13. Snapshot and Historical State

Important public observations should be snapshot-preservable.

```yaml
snapshot_id:
source_id:
source_url:
retrieval_timestamp:
content_hash:
mime_type:
source_update_date:
connector_version:
parser_version:
observation_window:
storage_reference:
```

A later source update must not erase what eGovTrace previously observed.

Snapshots do not mean the source's historical version is certified to be legally complete. They preserve **what eGovTrace observed from the source at a defined point in time**.

---

# 14. Public Read API

Base path:

```text
/api/v1/public
```

The public API exposes only data authorized for public release.

## 14.1 Search

```http
GET /api/v1/public/search?q={query}&type={object_type}&page={n}
```

Response:

```json
{
  "data": [
    {
      "id": "ET-...",
      "type": "PROJECT",
      "title": "...",
      "status": "CONFIRMED|REPORTED|UNRESOLVED|NOT_ESTABLISHED",
      "location": null,
      "responsible_institution": null,
      "match_reason": "..."
    }
  ],
  "meta": {
    "page": 1,
    "page_size": 20,
    "total": 120
  }
}
```

## 14.2 Object detail

```http
GET /api/v1/public/projects/{egovtrace_id}
GET /api/v1/public/entities/{egovtrace_id}
GET /api/v1/public/services/{egovtrace_id}
GET /api/v1/public/reports/{egovtrace_id}
GET /api/v1/public/evidence/{egovtrace_id}
```

## 14.3 Timeline

```http
GET /api/v1/public/objects/{egovtrace_id}/timeline
```

## 14.4 Related records

```http
GET /api/v1/public/objects/{egovtrace_id}/relationships
```

## 14.5 Evidence

```http
GET /api/v1/public/objects/{egovtrace_id}/evidence
```

Each evidence response should provide, where public:

```text
source
record identifier
source date
observation date
why linked
status
source link
snapshot availability
```

---

# 15. Public Report API

Base path:

```text
/api/v1/public/reports
```

## 15.1 Create report

```http
POST /api/v1/public/reports
Idempotency-Key: <client-generated-value>
Content-Type: application/json
```

```json
{
  "observed_at": "2026-09-05T08:00:00Z",
  "location": {
    "lat": 14.XXXX,
    "lon": 121.XXXX,
    "accuracy_m": 20
  },
  "category": "PROJECT",
  "description": "...",
  "related_object_candidate": "ET-...",
  "evidence": ["upload-token-..."],
  "contact_preference": "ACCOUNT|EMAIL|ANONYMOUS"
}
```

The API returns a `report_id` immediately after durable receipt.

## 15.2 Report status

```http
GET /api/v1/public/reports/{report_id}
```

## 15.3 Report status transitions

```text
DRAFT
SUBMITTED
RECEIVED
IDENTIFICATION_TRIAGE
EVIDENCE_REVIEW
ROUTED
ACKNOWLEDGED
UNDER_REVIEW
RESPONSE_RECEIVED
RESOLUTION_RECORDED
CLOSED
CONTINUING_MONITORING
```

Alternate states:

```text
NEEDS_MORE_INFORMATION
DUPLICATE_MERGED
OUTSIDE_SCOPE
REFERRED_TO_OTHER_MECHANISM
UNRESOLVED
```

## 15.4 Evidence upload

Prefer pre-signed upload/session patterns rather than passing large files through the primary JSON API.

```http
POST /api/v1/public/reports/{report_id}/evidence/sessions
```

Then:

```text
session
 ↓
upload
 ↓
client checksum
 ↓
server integrity check
 ↓
evidence object
```

Uploads should support resume/retry where technically feasible.

---

# 16. Source Connector API

Base path:

```text
/api/v1/internal/connectors
```

This API is not public.

## 16.1 Connector health

```http
GET /api/v1/internal/connectors/{connector_id}/health
```

## 16.2 Connector run

```http
POST /api/v1/internal/connectors/{connector_id}/runs
```

```json
{
  "mode": "incremental|backfill|recheck",
  "cursor": null,
  "window_start": "2026-09-01T00:00:00Z",
  "window_end": "2026-09-05T23:59:59Z"
}
```

## 16.3 Connector result

```json
{
  "run_id": "RUN-...",
  "connector_id": "...",
  "status": "SUCCEEDED|PARTIAL|FAILED",
  "records_observed": 100,
  "records_normalized": 98,
  "records_rejected": 2,
  "new_snapshots": 97,
  "new_events": 120,
  "new_bridges_proposed": 15,
  "errors": []
}
```

---

# 17. Internal Graph API

Base path:

```text
/api/v1/internal/graph
```

Capabilities:

```text
object lookup
relationship traversal
identity-bridge retrieval
timeline retrieval
provenance traversal
control-state retrieval
case/report linkage
```

Example:

```http
GET /api/v1/internal/graph/objects/{id}/neighbors?depth=2
```

The graph API must respect access class at every node and edge.

---

# 18. Assurance API

Base path:

```text
/api/v1/assurance
```

For authorized users only.

Capabilities:

```text
review candidates
control signals
evidence gaps
identity bridges
restricted evidence metadata
source custody
case routing support
adjudication
resolution tracking
```

Example:

```http
GET /api/v1/assurance/signals?status=OPEN&domain=PROCUREMENT
```

A signal payload:

```json
{
  "signal_id": "SIG-...",
  "rule_id": "ET-EVG-001",
  "rule_version": "1.1",
  "object_id": "ET-...",
  "signal_type": "DOWNSTREAM_EVIDENCE_GAP",
  "trigger_basis": [],
  "missing_evidence": [],
  "possible_explanations": [],
  "confidence": "MEDIUM",
  "status": "OPEN",
  "review_path": null
}
```

No signal payload may contain an implied legal finding merely because a signal exists.

---

# 19. Admin / Governance API

Base path:

```text
/api/v1/admin
```

Admin capabilities should include:

```text
source registry
connector lifecycle
schema versions
parser versions
rule versions
access policy
classification policy
retention policy
API client registry
audit log search
incident state
maintenance state
```

Changes to rules, source mappings, parsers, or schemas must be auditable and versioned.

---

# 20. Authentication and Authorization

## 20.1 Public endpoints

Public read endpoints may remain unauthenticated where lawful, subject to:

```text
rate limiting
abuse protection
bot controls
query limits
content-security policy
```

## 20.2 Citizen reporting

The user may begin reporting without a full account.

Authentication can be used for:

```text
tracking
notifications
secure follow-up
evidence access
abuse prevention
```

## 20.3 eGovPH handoff

Where an authorized integration exists:

```text
eGovPH identity context
        ↓
trusted handoff
        ↓
eGovTrace session
```

Do not copy unnecessary citizen identity attributes.

## 20.4 Government users

Use strong authentication appropriate to the integration, least privilege, role-based access, and where needed attribute/context-based access.

Minimum role model:

```text
PUBLIC
REPORTER
VERIFIER
CASE_REVIEWER
AGENCY_USER
AUDITOR
INVESTIGATOR
SOURCE_ADMIN
SYSTEM_ADMIN
SECURITY_ADMIN
```

Separation of duties must prevent one role from silently creating, confirming, and closing its own high-impact control findings without independent review where required.

---

# 21. Access Classes

```text
PUBLIC
PUBLIC_WITH_LIMITATION
AUTHENTICATED_CITIZEN
GOVERNMENT_INTERNAL
ASSURANCE_RESTRICTED
CONFIDENTIAL_EXTERNAL_CUSTODY
SECURITY_RESTRICTED
```

Every API response must be filtered according to the access class of the **specific object, evidence item, and relationship**.

A public project does not make its restricted financial or investigative evidence public.

---

# 22. Error Model

Every API must use machine-readable errors.

```json
{
  "error": {
    "code": "SOURCE_UNAVAILABLE",
    "message": "The source could not be reached at this time.",
    "retryable": true,
    "correlation_id": "..."
  }
}
```

Initial error codes:

```text
INVALID_REQUEST
UNAUTHORIZED
FORBIDDEN
NOT_FOUND
SOURCE_UNAVAILABLE
SOURCE_TIMEOUT
SOURCE_SCHEMA_CHANGED
SOURCE_RATE_LIMITED
PARSER_FAILED
VALIDATION_FAILED
IDENTITY_UNRESOLVED
EVIDENCE_RESTRICTED
SNAPSHOT_UNAVAILABLE
DUPLICATE_REQUEST
CONFLICT
INTERNAL_ERROR
```

The interface must distinguish:

```text
source unavailable
```
from:

```text
record not found
```

and from:

```text
record not publicly accessible
```

---

# 23. Pagination and Query Controls

Default public page size:

```text
20
```

Maximum public page size:

```text
100
```

Cursor pagination is preferred for dynamic source feeds.

All list endpoints should return:

```json
{
  "data": [],
  "links": {
    "self": "...",
    "next": "..."
  },
  "meta": {
    "page_size": 20
  }
}
```

Query APIs must enforce maximum execution windows and deny unrestricted graph traversal to public users.

---

# 24. Idempotency and Duplicate Protection

Citizen report creation must accept an `Idempotency-Key`.

Connector writes must use stable source identifiers plus source/version metadata where available.

A repeated retrieval of an unchanged source record must not create duplicate logical objects.

However, a later source snapshot of the same native record **may** create a new observation/snapshot when the source state actually changed.

---

# 25. Rate Limits

The initial implementation must use tiered limits.

```text
PUBLIC READ       conservative per-IP + per-client limits
REPORT SUBMIT     lower burst, stronger abuse controls
SOURCE CONNECTOR  per-source contractual/technical limits
ASSURANCE         authenticated policy-based limits
ADMIN             privileged limits
```

Actual thresholds must be load-tested rather than guessed.

---

# 26. Caching Rules

Public low-volatility metadata may be cached.

Dynamic accountability states require short TTLs or explicit source-version metadata.

Evidence snapshots are immutable once sealed, subject to legal retention/retraction rules.

Restricted data must not leak through shared caches.

Cache keys must include access class where required.

---

# 27. Connector Reliability and Observability

Each connector must expose:

```text
success rate
latency
retry rate
schema-drift events
parse failures
records observed
records normalized
records rejected
source availability
last successful run
last failure
backlog
```

## 27.1 Health states

```text
HEALTHY
DEGRADED
STALE
BLOCKED
SCHEMA_CHANGED
DISABLED
RETIRED
```

A `SCHEMA_CHANGED` state blocks unsafe normalization until the parser/schema is reviewed.

---

# 28. Source Change Detection

The connector should detect:

```text
URL change
content hash change
schema version change
field addition
field removal
field type change
identifier format change
pagination behavior change
HTTP behavior change
```

A material change must create a source-health event.

It must not silently change historical derived records.

---

# 29. Reconciliation Pipeline

```text
SOURCE OBSERVATION
        ↓
OBJECT CLASSIFICATION
        ↓
NATIVE ID EXTRACTION
        ↓
NORMALIZATION
        ↓
CANDIDATE MATCHING
        ↓
EVIDENCE CHECK
        ↓
IDENTITY BRIDGE PROPOSAL
        ↓
AUTO-ACCEPT only where rule permits
        OR
HUMAN ADJUDICATION
        ↓
CONFIRMED / REJECTED / UNRESOLVED
```

Auto-linking is permitted only for rules whose precision has been empirically validated and whose basis is sufficiently strong.

Approximate matching may generate a **candidate** but not automatically a confirmed relationship.

---

# 30. Control-Engine Interface

Control rules consume normalized events and evidence.

```text
INPUTS
  ↓
EVENTS
IDENTITY BRIDGES
SOURCE STATE
TEMPORAL STATE
COMPARISON POPULATION
  ↓
CONTROL RULE
  ↓
CONTROL RESULT
```

Example contract:

```json
{
  "rule_id": "ET-TIM-001",
  "rule_version": "1.1",
  "input_object_ids": ["..."],
  "input_event_ids": ["..."],
  "comparison_set_id": "...",
  "execution_timestamp": "...",
  "result": "REVIEW_CANDIDATE",
  "reason_codes": ["TIMING_EXCEPTION"],
  "confidence": "MEDIUM"
}
```

Signals remain derived intelligence, not source facts.

---

# 31. Citizen Report Reconciliation

A citizen report may optionally point to:

```text
PROJECT
SERVICE
PERMIT
FACILITY
AGENCY
LOCATION
CONTRACT
TRANSACTION
```

The matching workflow is:

```text
CITIZEN REPORT
      ↓
LOCATION / TEXT / OPTIONAL ID
      ↓
CANDIDATE OBJECTS
      ↓
MATCH EXPLANATION
      ↓
CITIZEN CONFIRMATION where useful
      ↓
REPORT ↔ OBJECT BRIDGE
```

The system must preserve the distinction between:

```text
citizen assertion
```

and:

```text
system-confirmed government record
```

---

# 32. eGovPH Integration API Boundary

The eGovPH relationship is an integration boundary, not backend ownership.

Potential v1 integration functions:

```text
deep-link launch
authentication handoff
notification handoff
report-status handoff
service-context handoff
minimal citizen-profile reference
```

Conceptual endpoints:

```text
GET  /api/v1/integration/egovph/context
POST /api/v1/integration/egovph/session
POST /api/v1/integration/egovph/report-status
POST /api/v1/integration/egovph/notification
```

Actual endpoint names, protocols, identity claims, signing requirements, and message contracts must be finalized against the DICT-prescribed national integration standards before production implementation.

The 2026 IRR of the E-Governance Act establishes the Citizen Frontline Delivery Services Platform, requires covered systems to meet DICT interoperability requirements, establishes the Philippine Government Interoperability Framework, and provides for secure APIs and common data-set interoperability. Therefore eGovTrace should align to the national framework rather than create a parallel interoperability standard.

---

# 33. Recommended Initial Connector Portfolio

The first connector wave should target the highest-value cross-system backbone rather than attempting all agencies simultaneously.

## Tier 1

```text
DBM / public finance sources
PhilGEPS / GPPB
COA public audit sources
Major national transparency portals
PSA public statistics / APIs
FOI acquisition registry
```

## Tier 2

```text
DPWH
DILG / LGU disclosures
PPA
BOC
CAAP
DOTr authorities
DTI / BOI / PEZA-related public sources
DENR-related public permit/environment sources
```

## Tier 3

```text
other executive agencies
GOCCs
SUCs
sector-specific regulators
local government operational systems
```

Tiering is a sequencing mechanism, not a statement that lower-tier institutions are less important.

---

# 34. Domain-Specific Connector Requirements

## 34.1 Public finance

Target fields:

```text
appropriation
allotment
NCA/NTA
obligation
disbursement
payment/settlement where lawfully available
financial-report period
agency
program/project
```

Primary concern:

```text
budget identity → execution continuity
```

## 34.2 Procurement

Target fields:

```text
reference number
solicitation number
ABC
procurement mode
bid date
award
NOA
contract number
NTP
supplier/contractor
project description
status
```

Primary concern:

```text
project → procurement → award → contract
```

## 34.3 Audit

Target fields:

```text
audit report
audit observation
recommendation
management response
resolution/corrective state
case/reference number where public
```

Primary concern:

```text
government action → assurance finding → response → resolution
```

## 34.4 Customs

Target fields may include, depending on lawful access:

```text
B/L
vessel/flight context
discharge
declaration
assessment
payment
release
enforcement state
```

Primary concern:

```text
shipment → declaration → assessment → payment → release
```

Never collapse these into one generic transaction identifier.

## 34.5 LGU services

Target fields may include:

```text
application
permit/license ID
business entity
assessment
inspection
decision
payment reference
release
appeal/review
```

Personal information must be minimized and restricted.

## 34.6 Airport / transport

Target fields may include:

```text
project/bid
award
contract
NTP
inspection
completion
asset
operational status
passenger/cargo context where lawful
```

Primary concern:

```text
project → contract → implementation → inspection → operational state
```

---

# 35. API Data Contracts and Versioning

All public and internal APIs use semantic versioning at the API contract level.

```text
v1
v1.1
v1.2
v2
```

Backward-compatible additions should not silently remove fields.

Breaking changes require a new major version.

Source schema versions and eGovTrace canonical schema versions must be tracked independently.

```text
source_schema_version != egovtrace_schema_version
```

---

# 36. Security Requirements

Minimum controls:

```text
TLS
secure headers
secret management
key rotation
least privilege
RBAC / policy enforcement
audit logs
immutable or tamper-evident audit records
input validation
output encoding
file-type validation
malware scanning where appropriate
rate limiting
abuse detection
backup
recovery testing
incident response
```

Sensitive evidence paths must be logically separated from public content paths.

Citizen-uploaded media must be treated as untrusted input.

---

# 37. Privacy Requirements

The system must follow data minimization.

Never centralize unnecessary personal records merely because a connector can technically access them.

For citizen reports:

```text
identity private by default
location precision minimized where appropriate
EXIF/media metadata controlled
sensitive attachments restricted
public report view redacted
```

For government data:

```text
public record ≠ unrestricted internal record
```

Data-sharing designs must be tied to lawful purpose, access basis, privacy controls, and applicable government interoperability rules.

The current E-Governance Act IRR specifically requires privacy, security, access-control, accountability and PIA considerations for inter-agency sharing, while preserving source-agency responsibilities for master data.

---

# 38. Audit Trail

The system must record material administrative and analytical actions.

```yaml
audit_event_id:
actor_id:
actor_role:
action:
object_id:
previous_state:
new_state:
reason:
timestamp:
correlation_id:
source_ip_or_system:
```

Audit records themselves require controlled access and retention rules.

---

# 39. Evidence Integrity

For every important evidence object:

```text
content hash
source identity
retrieval timestamp
source URL/reference
access basis
snapshot ID
parser version
```

A hash proves content identity for the observed bytes; it does not independently prove the truth of the document's contents.

---

# 40. Failure Semantics

A source connector can fail for different reasons.

The system must distinguish:

```text
NO_RECORD_OBSERVED
SOURCE_TEMPORARILY_UNAVAILABLE
SOURCE_PERMANENTLY_UNAVAILABLE_UNKNOWN
ACCESS_DENIED
AUTHENTICATION_FAILED
SCHEMA_CHANGED
PARSER_FAILED
RECORD_RESTRICTED
RECORD_RETRACTED
IDENTITY_UNRESOLVED
```

These states must not collapse into a single `MISSING` state.

---

# 41. Backfill and Historical Ingestion

Historical backfills must be explicitly labeled.

```yaml
run_type: BACKFILL
historical_start:
historical_end:
source_snapshot_basis:
connector_version:
parser_version:
```

A backfill does not imply the records were available continuously during the historical period.

The observation date remains the actual retrieval/observation date.

---

# 42. Reprocessing

When parsers or normalization logic change:

```text
OLD RAW SNAPSHOT
       ↓
NEW PARSER VERSION
       ↓
NEW NORMALIZED OUTPUT
       ↓
NEW DERIVED VERSION
```

Old normalized/derived states should remain reproducible where required.

No silent retroactive rewrite of analytical history.

---

# 43. Data Quality Gates

Connector output should pass:

```text
GATE A — structural validity
GATE B — semantic validity
GATE C — provenance completeness
GATE D — identifier integrity
GATE E — temporal validity
GATE F — access classification
GATE G — reconciliation safety
```

Failure at any gate produces a typed rejection or quarantine state.

---

# 44. Connector Testing Strategy

Every connector requires:

```text
unit tests
fixture tests
schema tests
integration tests
source-change tests
negative tests
security tests
performance tests
reproducibility tests
```

## 44.1 Required fixtures

At minimum:

```text
normal record
duplicate record
missing field
unexpected null
format change
historical record
updated record
withdrawn/retracted record
restricted record
malformed document
network failure
rate-limit response
```

---

# 45. Identity-Bridge Test Suite

A bridge implementation must be tested against:

```text
true positive
near-match
false positive
same contractor/different project
same location/different project
same title/different year
same UACS/different object grain
same native identifier under different source namespaces
historical successor/replacement object
```

The existing FMR work already demonstrated why this matters: an identifier/amount resemblance can create a plausible but incorrect join.

---

# 46. Control-Engine API Safety

The API must distinguish:

```text
FACT
REPORTED
DERIVED
SIGNAL
CLAIM
UNRESOLVED
```

A `CONTROL_SIGNAL` can never automatically serialize into a public field named:

```text
corruption
fraud
guilt
criminality
```

unless a competent authority has separately established an official finding and the source/right-to-publish basis is explicit.

---

# 47. Public API Representation

Public object responses should favor human-readable status.

Example:

```json
{
  "id": "ET-123",
  "status": {
    "code": "UNRESOLVED",
    "label": "Not yet established from currently recoverable evidence."
  },
  "facts": [],
  "derived": [],
  "evidence": [],
  "open_questions": [
    "What is the project-specific contract number?",
    "Has payment settlement been established?"
  ]
}
```

The public API should make uncertainty explicit rather than hiding it.

---

# 48. Mobile Reporting API Requirements

Because the public product is a mobile-first web/PWA, the report API must support intermittent connectivity.

Required behaviors:

```text
client-generated draft ID
idempotency key
resumable evidence uploads
retry-safe submission
offline draft preservation
server acknowledgement
duplicate protection
status polling or notification
```

The mobile UI contract established by the approved product architecture requires the report journey to work without horizontal scrolling, mandatory zoom, desktop-only controls, or giant modal flows.

The API should therefore avoid requiring the browser to maintain a large multi-step server transaction during the entire report process.

---

# 49. Map / Location API

Location inputs may come from:

```text
GPS
user-selected pin
searched location
known project location
```

API schema:

```json
{
  "latitude": 14.000000,
  "longitude": 121.000000,
  "accuracy_m": 25,
  "capture_method": "GPS",
  "captured_at": "2026-09-05T08:00:00Z"
}
```

Sensitive citizen locations should not become public by default.

---

# 50. Source-Specific Connector Priorities for First Engineering Sprint

## Sprint A — Backbone

```text
source registry
snapshot service
provenance service
connector SDK
schema validation
public read API shell
report API shell
```

## Sprint B — First sources

```text
PhilGEPS
DBM public sources
COA public sources
PSA public API/public datasets
FOI registry
```

## Sprint C — Demonstration verticals

```text
DPWH/FMR
BOC/Port
CAAP/Airport
Quezon City/LGU
```

## Sprint D — Cross-system reconciliation

```text
project → procurement
procurement → contract
contract → financial representation
shipment → customs stages
permit → inspection → payment → release
```

---

# 51. Initial Source-to-Object Mapping

| Source class | Primary objects | Primary events | Default treatment |
|---|---|---|---|
| DBM/public finance | Budget, program, agency | BUDGET_APPROVED, ALLOTMENT_ISSUED | Reference + Snapshot |
| PhilGEPS/GPPB | Procurement, award, contract | BID_POSTED, AWARD_MADE, NOA_ISSUED | Reference + Snapshot |
| COA | Audit, observation | AUDIT_OBSERVATION_ISSUED | Reference + Snapshot |
| Agency transparency portal | Project, contract, disclosure | lifecycle-specific | Reference + Snapshot |
| FOI | Evidence, acquisition request | response events | Snapshot / Restricted metadata |
| PSA | Statistics, baseline, outcome context | release/period events | Reference + Derived |
| BOC | Customs transaction, shipment event | declaration, assessment, payment, release | Reference + Snapshot / Restricted depending on field |
| CAAP/transport | Project, asset, operational event | award, NTP, inspection, completion | Reference + Snapshot |
| LGU operational system | Application, permit, inspection, payment, release | service lifecycle events | Minimum lawful bridge only |
| Geospatial sources | Place, asset, hazard | observation events | Reference + Snapshot/cache |

---

# 52. API Response Principle: Explain the Join

Whenever an eGovTrace object contains a cross-system relationship, the API should be able to provide:

```text
linked_object
basis_type
basis_detail
evidence_ids
confidence
adjudication_state
validity_period
```

Example:

```json
{
  "relationship": "PROJECT_TO_CONTRACT",
  "status": "CONFIRMED",
  "basis_type": "DOCUMENTED_IDENTIFIER",
  "basis_detail": "Contract document names the same native project identifier.",
  "evidence_ids": ["EVID-123"],
  "confidence": "HIGH"
}
```

This makes the API itself auditable.

---

# 53. Public Search Ranking

Search ranking should prioritize:

```text
exact native identifier
exact eGovTrace ID
exact title
exact institution
exact place
strong evidence-backed relationship
then fuzzy candidates
```

Fuzzy candidates must be clearly labeled as candidates.

The ranking engine must not turn similarity into confirmed identity.

---

# 54. AI-Assisted Connector Operations

AI may assist with:

```text
document classification
field extraction
candidate matching
duplicate detection
plain-language summaries
schema-drift suggestions
```

AI output must remain:

```text
machine suggestion
candidate
inference
```

and never silently become:

```text
source fact
confirmed identity bridge
legal conclusion
corruption finding
```

AI-assisted transformations must preserve model/version metadata.

---

# 55. Source Custody and Legal Basis

Before production ingestion, every source must answer:

```text
Who owns this record?
Who may access it?
What is the access basis?
Can eGovTrace store it?
Can eGovTrace publish it?
How long may it be retained?
Can it be copied?
Can it be transformed?
Can it be linked to other records?
```

Where the answer is uncertain, the connector must default to **reference or restricted metadata**, not unrestricted replication.

---

# 56. eGovTrace Does Not Become the Source of Truth

The internal API must not expose derived data in a way that makes it appear to be the original institutional record.

For example:

```text
DBM says budget = X
```

may be represented as a source-backed fact.

But:

```text
payment continuity = unresolved
```

is an eGovTrace derived state.

The API must label the distinction.

---

# 57. Operational SLIs / SLOs for Initial Build

Initial engineering measurements:

```text
API availability
P95 read latency
P95 report-submit latency
upload success rate
connector success rate
source freshness
schema-drift detection time
reconciliation queue age
provenance completeness
```

Exact service-level objectives should be set after baseline load testing.

Do not invent production SLOs before actual workload measurements exist.

---

# 58. Development Environment

All connectors must have:

```text
dev
staging
production
```

Production source credentials must never be used in local development.

Sensitive source fixtures must be synthetic or appropriately sanitized.

---

# 59. Deployment and Rollback

Every connector deployment must be versioned.

```text
connector_version
parser_version
schema_version
normalizer_version
rule_version
```

Rollback must be possible independently for:

```text
connector
parser
normalizer
control rule
API
```

A parser rollback must not delete historical snapshots.

---

# 60. Disaster Recovery

Critical eGovTrace components:

```text
identity graph
provenance graph
report/case state
snapshot metadata
sealed evidence metadata
configuration
audit logs
```

must have backup and restoration procedures.

Recovery tests must validate:

```text
object identity preserved
provenance preserved
report state preserved
snapshot hashes preserved
access controls preserved
```

---

# 61. Acceptance Test Matrix

## Connector

```text
✓ source registry complete
✓ authorization recorded
✓ source retrieval succeeds
✓ raw observation captured
✓ hash generated
✓ schema validated
✓ normalized record generated
✓ provenance generated
✓ failures typed
✓ rerun idempotent
```

## Identity

```text
✓ exact match test
✓ near-match rejection
✓ same contractor/different project rejection
✓ temporal distinction
✓ evidence requirement enforced
```

## API

```text
✓ public/restricted separation
✓ pagination
✓ rate limits
✓ idempotency
✓ typed errors
✓ audit logging
✓ API versioning
```

## Mobile report

```text
✓ report can start without full account
✓ location capture works
✓ photo upload works
✓ interrupted upload recovers
✓ duplicate retry does not duplicate report
✓ user can retrieve report status
✓ no sensitive evidence leaks publicly
```

---

# 62. Research-to-Engineering Traceability

Every engineering object should be traceable to a research/product requirement.

Example:

```text
Research rule:
IDENTIFIER RECOVERY ≠ IDENTIFIER PROOF

        ↓

Engineering requirement:
IdentityBridge.adjudication_state is mandatory.

        ↓

API requirement:
Relationship response must expose basis + evidence + confidence.

        ↓

UI requirement:
Public relationship display must distinguish confirmed vs unresolved.
```

This traceability should be maintained for all high-impact rules.

---

# 63. Source-to-API Example: FMR

```text
FMR Watch source
      ↓
source snapshot
      ↓
FMR native record
      ↓
PROJECT object
      ↓
candidate UACS bridge
      ↓
DBM evidence
      ↓
procurement search
      ↓
contract evidence
      ↓
financial evidence
      ↓
inspection / outcome
```

An unresolved bridge should remain visible as unresolved.

The current FMR research remains a specialized source/proof-of-concept and must not be mistaken for the universal eGovTrace model.

---

# 64. Source-to-API Example: Customs

```text
BOC source
   ↓
B/L observation
   ↓
SHIPMENT / CUSTOMS_TRANSACTION
   ↓
DISCHARGE event
   ↓
GOODS_DECLARATION bridge
   ↓
ASSESSMENT event
   ↓
PAYMENT event
   ↓
RELEASE instruction
   ↓
PHYSICAL RELEASE
```

Each stage requires its own evidence-backed relationship.

A B/L is not a payment record.

A payment record is not automatically a release record.

---

# 65. Source-to-API Example: LGU Daily Service

```text
APPLICATION
   ↓
ELIGIBILITY
   ↓
DOCUMENTS
   ↓
ASSESSMENT
   ↓
INSPECTION
   ↓
DECISION
   ↓
PAYMENT
   ↓
PERMIT / SERVICE RELEASE
   ↓
APPEAL / REVIEW
```

eGovTrace should retrieve only the minimum lawful information required to answer the accountability question.

---

# 66. Open Questions Before Production

These are research/implementation questions, not assumed facts:

```text
1. Which source systems provide stable production APIs?
2. Which agencies permit historical public snapshots?
3. What exact data-sharing agreements are required for each restricted source?
4. Which government identities can be trusted for authentication handoff?
5. What national PGIF profiles/technical standards must every connector implement?
6. Which master datasets should only be referenced rather than replicated?
7. What source-specific retention periods apply?
8. What source-specific rate limits and usage restrictions apply?
9. Which case-routing actions can be automated safely?
10. What government security accreditation/certification is required before production deployment?
```

---

# 67. Implementation Sequence

```text
STEP 1
Source Registry + Connector SDK

STEP 2
Snapshot + Provenance Services

STEP 3
Public Read API

STEP 4
Report API + Evidence Upload

STEP 5
PhilGEPS / DBM / COA / PSA connectors

STEP 6
Identity Bridge Engine

STEP 7
Control Engine API

STEP 8
DPWH / BOC / CAAP / LGU vertical connectors

STEP 9
eGovPH integration

STEP 10
Assurance Workspace API

STEP 11
Prospective production cohort testing

STEP 12
Public beta / controlled rollout
```

Do not begin with dozens of connectors simultaneously.

---

# 68. Architectural Freeze for v1

The following are frozen for engineering planning:

1. eGovTrace is an independent accountability service.
2. eGovPH is an integration/gateway surface, not the backend owner.
3. Mobile-first Web/PWA is the primary citizen surface.
4. Source systems remain authoritative.
5. Domain-native identifiers remain distinct.
6. Identity bridges are first-class objects.
7. Evidence provenance is mandatory.
8. Public and restricted data paths are separated.
9. Public reports are claims/observations until established.
10. Derived analytics cannot masquerade as source facts.
11. Connectors must be versioned and observable.
12. Historical source observations must be snapshot-preservable.
13. API responses must explain important cross-system joins.
14. eGovTrace centralizes accountability relationships rather than duplicating every record.
15. No control signal is a finding of corruption by itself.

---

# 69. Implementation Non-Goals

The first engineering build must explicitly avoid:

```text
building a new government source-of-truth database
scraping every government website indiscriminately
copying entire agency transaction systems
storing unnecessary citizen PII
exposing restricted evidence through public APIs
letting fuzzy matching silently create confirmed identities
automatically assigning legal blame
building an AI corruption score
requiring a native mobile app before reporting is possible
```

---

# 70. Current Status

**SOURCE CONNECTOR ARCHITECTURE:** APPROVED WORKING ENGINEERING BASELINE  
**API BOUNDARY:** APPROVED WORKING BASELINE  
**DATA TREATMENT:** APPROVED WORKING BASELINE  
**IDENTITY BRIDGE CONTRACT:** APPROVED WORKING BASELINE  
**PROVENANCE CONTRACT:** APPROVED WORKING BASELINE  
**eGovPH BOUNDARY:** APPROVED CONCEPTUAL / PROTOCOL DETAILS PENDING DICT VALIDATION  
**PRODUCTION IMPLEMENTATION:** NOT YET PRODUCTION-AUTHORIZED BY THIS DOCUMENT ALONE

---

# 71. Next Engineering Decision

The next artifact should be:

> **`eGovTrace_Core_Data_Model_and_Graph_Schema_v1.md`**

It should translate this connector/API contract into the actual core database and graph model:

```text
TABLES / COLLECTIONS
↓
OBJECT TYPES
↓
EVENT TYPES
↓
IDENTITY_BRIDGE
↓
EVIDENCE
↓
PROVENANCE
↓
CONTROL_RULE
↓
CONTROL_SIGNAL
↓
REPORT
↓
CASE
↓
RESPONSE
↓
RESOLUTION
```

That document is the next bridge between architecture and actual backend implementation.

---

# 72. One-Sentence Engineering Definition

> **eGovTrace connectors retrieve and observe authoritative government source representations through lawful, versioned access paths; eGovTrace then preserves provenance, normalizes events, builds evidence-backed identity bridges, derives control states and signals, and exposes appropriately authorized public, citizen-reporting, eGovPH, and government-assurance APIs without replacing the source systems themselves.**
