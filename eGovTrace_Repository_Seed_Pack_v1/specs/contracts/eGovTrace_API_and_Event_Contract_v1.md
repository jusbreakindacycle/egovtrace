# eGovTrace API and Event Contract v1

**Status:** APPROVED WORKING ENGINEERING CONTRACT / v1 BUILD BASELINE  
**Purpose:** Define the externally visible API contracts, internal application commands and queries, domain-event envelopes, asynchronous job contracts, state-transition semantics, idempotency/concurrency behavior, error taxonomy, authorization boundaries, pagination/filtering rules, public-vs-assurance projections, and compatibility rules required to implement eGovTrace consistently.

> This document is an API and event contract baseline. It does not authorize production deployment, legal data sharing, access to restricted government systems, or any particular infrastructure vendor.

---

# 0. Executive Decision

The eGovTrace backend will expose **versioned API contracts** while keeping source authority, canonical objects, derived relationships, and workflow state distinct.

```text
CLIENT / SOURCE CONNECTOR / INTERNAL MODULE
                    |
                    v
              API / COMMAND
                    |
        AUTHZ + VALIDATION + POLICY
                    |
             DOMAIN SERVICE
                    |
        +-----------+-----------+
        |                       |
   TRANSACTION             OUTBOX EVENT
        |                       |
        v                       v
    DATABASE                  QUEUE
                                |
                              WORKER
                                |
                         DERIVED / INDEXED STATE
```

The contract layer follows the approved service architecture's use of a modular monolith with asynchronous workers, typed application commands/queries, strong consistency for high-impact mutations, and eventual consistency for search, analytics, projections, and notifications. fileciteturn24file0L20-L50 fileciteturn24file0L682-L719

The governing semantic rules remain:

```text
SOURCE SYSTEMS REMAIN AUTHORITATIVE.
EGOVTRACE IS NOT A REPLACEMENT DATABASE.
CONNECTION != CORRUPTION.
IDENTIFIER RECOVERY != IDENTIFIER PROOF.
NOT OBSERVED != ABSENT.
UNAVAILABLE != FALSE.
PAYMENT-INSTRUCTION EVIDENCE != PAYMENT-SETTLEMENT EVIDENCE.
AI OUTPUT != FACT OR LEGAL DETERMINATION.
EVERY MATERIAL DERIVATION MUST HAVE PROVENANCE.
```

The 2026 E-Governance Act IRR also establishes a government-wide interoperability framework, requires covered entities to adopt PGIF, calls for secure API-based data exchange and master-data governance, and provides for integration of public-facing government systems. eGovTrace therefore treats API interoperability as a contract and governance concern, not simply an HTTP implementation detail. citeturn324912search0

---

# 1. Contract Scope

This contract covers:

```text
1. Public Read API
2. Public Report API
3. Assurance API
4. Administrative / Governance API
5. Source Connector API
6. Internal Application Commands
7. Internal Queries
8. Domain Events
9. Job Contracts
10. State-transition commands
11. Idempotency
12. Optimistic concurrency
13. Pagination/filtering/sorting
14. Error taxonomy
15. Access and visibility semantics
16. Public and assurance projections
17. Webhook / notification boundaries where applicable
18. Versioning and backward compatibility
19. Contract testing
20. Correlation / observability metadata
```

Out of scope:

```text
- database-specific SQL contracts
- infrastructure provider lock-in
- government-source schema ownership
- autonomous legal adjudication
- universal real-time access to restricted records
- unrestricted graph traversal
- automatic corruption classification
```

---

# 2. API Contract Principles

## 2.1 Versioning

Public and internal HTTP APIs use an explicit major version in the path:

```text
/api/v1/...
```

Breaking semantic changes require a new major version.

Backward-compatible additions may be released within v1, subject to compatibility rules below.

```text
API VERSION != SOURCE SCHEMA VERSION
API VERSION != CANONICAL SCHEMA VERSION
API VERSION != CONNECTOR VERSION
API VERSION != RULE VERSION
API VERSION != MODEL VERSION
```

The source-connector specification already requires independent tracking of source schema and eGovTrace schema versions. fileciteturn22file2L1863-L1882

## 2.2 JSON Contract

Unless explicitly specified otherwise:

```text
Content-Type: application/json
Character encoding: UTF-8
Dates: ISO 8601
Timestamps: ISO 8601 UTC
Currency: decimal amount + currency code
Identifiers: opaque strings
Null: explicit null where semantically different from omitted
```

## 2.3 API must explain relationships

Whenever an API returns a material cross-system relationship, it should be capable of returning:

```json
{
  "relationship": "PROJECT_TO_CONTRACT",
  "status": "SUPPORTED",
  "basis_type": "DOCUMENT_EXPLICIT_REFERENCE",
  "basis_detail": "The contract record explicitly references the source project identifier.",
  "evidence_ids": ["ET-EVID-01J..."],
  "confidence": "HIGH",
  "adjudication_state": "SUPPORTED",
  "valid_from": "2021-08-01",
  "valid_to": null
}
```

This directly operationalizes the schema's requirement that APIs explain why important cross-system objects are linked. fileciteturn22file2L2286-L2313

---

# 3. Canonical Request Envelope

For mutation endpoints, the preferred request metadata is:

```json
{
  "request_id": "REQ-01J...",
  "idempotency_key": "IK-01J...",
  "expected_version": 3,
  "reason": "...",
  "data": {}
}
```

Not every endpoint needs every field. The application layer must reject unsupported fields rather than silently interpreting them.

## 3.1 Required headers

```text
X-Request-ID
Idempotency-Key              mutation endpoints when applicable
If-Match / expected-version  optimistic concurrency where applicable
Authorization                authenticated routes
Content-Type
```

A generated server correlation identifier may be returned where a caller does not provide one.

## 3.2 Correlation

Every request, job, event, connector run, audit event, and material derived output should retain a correlation identifier where technically applicable.

```text
request_id
  ↓
command_id
  ↓
outbox_event_id
  ↓
job_id
  ↓
worker execution
  ↓
result / audit log
```

---

# 4. Canonical Response Envelope

Mutation responses should normally return:

```json
{
  "request_id": "REQ-01J...",
  "data": {},
  "meta": {
    "version": 3,
    "generated_at": "2026-09-05T00:00:00Z"
  }
}
```

List responses:

```json
{
  "request_id": "REQ-01J...",
  "data": [],
  "pagination": {
    "next_cursor": "...",
    "has_more": true
  },
  "meta": {
    "generated_at": "2026-09-05T00:00:00Z"
  }
}
```

Error responses use a stable error object defined in Section 13.

---

# 5. Public API Boundary

The public API is a **projection API**, not a raw graph API.

```text
CORE GRAPH
   ↓
ACCESS POLICY
   ↓
PUBLIC PROJECTION
   ↓
PUBLIC API
```

The citizen product requires readable object pages containing what the object is, status, responsible institution, money/resource context, timeline, known facts, unresolved items, related records, evidence, and a report action. fileciteturn21file2L1835-L1887

## 5.1 Public search

```http
GET /api/v1/public/search
```

Query parameters:

```text
q
object_type
institution_id
jurisdiction_id
location_id
status
event_from
event_to
page_size
cursor
```

The search service ranks exact eGovTrace IDs and native identifiers before exact names, institutions/places, strong relationship evidence, and fuzzy candidates. Fuzzy candidates must remain visibly candidates. fileciteturn22file0L831-L866

Example:

```json
{
  "data": [
    {
      "id": "ET-PROJ-01J...",
      "type": "PROJECT",
      "title": "Cabarasan–Dao Farm-to-Market Road",
      "status": {
        "code": "REPORTED",
        "label": "Reported complete"
      },
      "evidence_summary": {
        "confirmed": 3,
        "reported": 1,
        "unresolved": 4
      }
    }
  ]
}
```

## 5.2 Public object

```http
GET /api/v1/public/objects/{id}
```

The server determines projection type from object access policy.

Supported aliases:

```http
GET /api/v1/public/projects/{id}
GET /api/v1/public/entities/{id}
GET /api/v1/public/services/{id}
GET /api/v1/public/evidence/{id}
```

A project response should contain, where available:

```text
what_it_is
status
responsible_institution
money_resource
timeline
known
not_established
related_records
evidence
report_action
```

## 5.3 Public evidence metadata

```http
GET /api/v1/public/evidence/{id}
```

Response must never reveal restricted binary content or hidden investigative metadata merely because a public object references the evidence.

Example:

```json
{
  "id": "ET-EVID-01J...",
  "source": {
    "name": "DBM",
    "record": "UACS/PAP ..."
  },
  "date": "2026-08-14",
  "link_basis": "documented identifier",
  "strength": "CONFIRMED",
  "status": "PUBLIC",
  "source_url": "https://example.gov.ph/..."
}
```

The public evidence presentation contract is based on source, record, date, relationship basis, evidence strength, status, and source access. fileciteturn22file1L1093-L1121

---

# 6. Public Citizen Report API

The public report workflow is designed for mobile-first, intermittent connectivity and retry-safe operation. The approved architecture requires client-generated draft IDs, idempotency, resumable uploads, offline draft preservation, server acknowledgement, duplicate protection, and status tracking. fileciteturn22file2L2174-L2193

## 6.1 Create report

```http
POST /api/v1/public/reports
```

Request:

```json
{
  "draft_id": "DR-01J...",
  "observed_at": "2026-09-05T06:30:00Z",
  "location": {
    "latitude": 14.000000,
    "longitude": 121.000000,
    "accuracy_m": 25,
    "capture_method": "GPS",
    "captured_at": "2026-09-05T06:31:00Z"
  },
  "category": "CONSTRUCTION",
  "description": "...",
  "related_object_candidates": ["ET-PROJ-01J..."],
  "contact_preference": "TRACK_WITH_ACCOUNT",
  "privacy_choices": {
    "allow_follow_up": true,
    "public_identity": false
  }
}
```

Response:

```json
{
  "data": {
    "report_id": "ET-REPORT-01J...",
    "status": "RECEIVED",
    "submitted_at": "2026-09-05T06:32:00Z"
  }
}
```

## 6.2 Evidence upload session

```http
POST /api/v1/public/reports/{report_id}/attachments/sessions
```

Request:

```json
{
  "filename": "photo.jpg",
  "content_type": "image/jpeg",
  "size_bytes": 3491821,
  "sha256": null
}
```

Response:

```json
{
  "data": {
    "upload_session_id": "UP-01J...",
    "chunk_size_bytes": 5242880,
    "upload_url": "...",
    "expires_at": "2026-09-05T07:00:00Z"
  }
}
```

Binary transport may use a separately secured upload endpoint. The API contract must not require the browser to hold a large multipart transaction open through report completion.

## 6.3 Finalize evidence

```http
POST /api/v1/public/uploads/{upload_session_id}/complete
```

The server validates file type, performs malware scanning where appropriate, calculates/validates the content hash, creates an evidence object, applies access classification, creates provenance, and links the evidence to the report. This follows the approved evidence upload pipeline. fileciteturn24file0L954-L976

## 6.4 Get report status

```http
GET /api/v1/public/reports/{id}
```

Allowed public states:

```text
RECEIVED
IN_REVIEW
ROUTED
ACKNOWLEDGED
UNDER_REVIEW
RESPONSE_RECEIVED
RESOLUTION_RECORDED
CLOSED
CONTINUING_MONITORING
NEEDS_MORE_INFORMATION
DUPLICATE_MERGED
OUTSIDE_SCOPE
REFERRED
UNRESOLVED
```

The report remains a claim/observation until established. It must not serialize as an official finding merely because it entered a case.

---

# 7. Assurance API

The assurance API exposes deeper graph context to authorized actors.

## 7.1 Assurance object

```http
GET /api/v1/assurance/objects/{id}
```

Response may include:

```text
signals
control_states
identity_bridges
evidence_gaps
contradictions
restricted_evidence_refs
routing_candidates
case_context
```

## 7.2 Identity bridge adjudication

```http
POST /api/v1/assurance/bridges/{id}/adjudicate
```

Request:

```json
{
  "expected_version": 2,
  "decision": "CONFIRMED",
  "basis_type": "DOCUMENT_EXPLICIT_REFERENCE",
  "evidence_ids": ["ET-EVID-01J..."],
  "rationale": "..."
}
```

Allowed decisions:

```text
SUPPORTED
CONFIRMED
REJECTED
SUPERSEDED
UNRESOLVED
```

The state machine must not permit `CONFIRMED` without the required basis and evidence. Weak match bases cannot become strong identity proof automatically. fileciteturn22file0L20-L45

## 7.3 Case API

```http
GET  /api/v1/assurance/cases/{id}
POST /api/v1/assurance/cases/{id}/route
POST /api/v1/assurance/cases/{id}/transitions
POST /api/v1/assurance/cases/{id}/close
```

Route command:

```json
{
  "candidate_authority_id": "ET-INST-01J...",
  "basis": "STATUTORY_CUSTODY",
  "required_evidence": [
    "PROJECT_CONTRACT",
    "FINANCIAL_EXECUTION"
  ],
  "routing_note": "..."
}
```

Routing is decision support. The competent authority determines actual jurisdiction and disposition.

---

# 8. Administrative / Governance API

Administrative routes are privileged and separately authorized.

```http
GET  /api/v1/admin/sources
GET  /api/v1/admin/connectors/{id}/health
POST /api/v1/admin/connectors/{id}/runs
GET  /api/v1/admin/runs/{id}

POST /api/v1/admin/rules
POST /api/v1/admin/rules/{id}/publish
POST /api/v1/admin/access-policies
GET  /api/v1/admin/audit-logs
```

The source-connector contract requires explicit source authority, access basis, schema expectations and security classification before a connector becomes production-active. fileciteturn21file1L1052-L1122

---

# 9. Source Connector API

Connectors are software adapters, not domain authorities.

## 9.1 Connector interface

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

Not every connector must implement every method. Unsupported capabilities are explicit. fileciteturn21file1L1245-L1289

## 9.2 Internal ingestion command

```text
RunConnector(source_id, connector_id, run_type, scope)
```

Minimum command data:

```json
{
  "source_id": "EG-SRC-...",
  "connector_id": "EG-CON-...",
  "run_type": "INCREMENTAL",
  "scope": {
    "from": "2026-09-01",
    "to": "2026-09-05"
  },
  "requested_by": "ET-SVC-..."
}
```

## 9.3 Retrieval envelope

Connector observations must retain source identifiers, source dates, observation time, content hash, parser version, connector version, access class, custodian and legal/access basis. fileciteturn21file1L1293-L1327

---

# 10. Internal Application Command Contract

Modules communicate through typed commands, not generic arbitrary object mutation.

```text
create / update / link / adjudicate / evaluate / submit / route / respond / resolve
```

## 10.1 Command envelope

```json
{
  "command_id": "CMD-01J...",
  "command_type": "Project.LinkProcurement",
  "actor": {
    "principal_id": "ET-USER-01J...",
    "role": "ASSURANCE_ANALYST"
  },
  "request_id": "REQ-01J...",
  "idempotency_key": "IK-01J...",
  "expected_version": 4,
  "occurred_at": "2026-09-05T06:00:00Z",
  "payload": {}
}
```

Required command semantics:

```text
validate authorization
validate state
validate preconditions
execute one domain transaction
append audit record when required
append outbox event(s)
return committed result
```

The service architecture explicitly prohibits arbitrary foreign-domain writes and requires typed application commands/queries. fileciteturn24file0L769-L784

---

# 11. Core Application Commands

## 11.1 Object / Project

```text
Project.Create
Project.UpdateMetadata
Project.AttachLocation
Project.LinkProgram
```

## 11.2 Procurement

```text
Procurement.Create
Procurement.RecordAward
Procurement.AttachContract
Procurement.RecordNTP
Procurement.LinkProjectCandidate
```

## 11.3 Finance

```text
Finance.RecordBudget
Finance.RecordAppropriation
Finance.RecordAllotment
Finance.RecordObligation
Finance.RecordDisbursement
Finance.RecordSettlement
Finance.LinkFinancialObject
```

A financial command cannot change another object's state to `PAID` without a separately evidenced settlement object.

## 11.4 Identity

```text
Identity.ProposeBridge
Identity.SupportBridge
Identity.ConfirmBridge
Identity.RejectBridge
Identity.SupersedeBridge
```

## 11.5 Evidence

```text
Evidence.Register
Evidence.Classify
Evidence.Retain
Evidence.Retract
Evidence.LinkToObject
Evidence.LinkToEdge
```

## 11.6 Control

```text
Control.EvaluateObject
Control.CreateSignal
Control.CreateEvidenceGap
Control.RecordException
Control.ResolveSignal
```

## 11.7 Reports / Cases

```text
Report.Submit
Report.Match
Report.RequestMoreInformation
Report.MergeDuplicate
Report.Refer
Case.Open
Case.Route
Case.Acknowledge
Case.RecordResponse
Case.RecordResolution
Case.Close
```

---

# 12. Query Contracts

Queries are read-only and must apply access policy before data assembly.

Core query families:

```text
Project.Get
Project.Timeline
Project.Relationships
Project.Evidence

Entity.Get
Entity.Relationships
Entity.Projects

Service.Get
Service.Workflow

Evidence.GetMetadata
Evidence.Provenance

Search.Query

Assurance.GetSignals
Assurance.GetControlState
Assurance.GetBridge
Assurance.GetCase

Source.GetHealth
Source.GetSnapshot
Audit.GetLog
```

Queries should return projections rather than expose persistence tables directly.

---

# 13. Error Contract

All APIs use structured errors.

```json
{
  "error": {
    "code": "IDENTITY_UNRESOLVED",
    "message": "The relationship could not be established from currently available evidence.",
    "details": {
      "object_id": "ET-PROJ-01J...",
      "candidate_id": "ET-PROC-01J..."
    },
    "request_id": "REQ-01J...",
    "retryable": false
  }
}
```

## 13.1 Required error codes

### Client / validation

```text
INVALID_REQUEST
INVALID_FIELD
INVALID_IDENTIFIER
INVALID_DATE_RANGE
INVALID_STATE_TRANSITION
MISSING_REQUIRED_EVIDENCE
```

### Access

```text
AUTHENTICATION_REQUIRED
AUTHENTICATION_FAILED
ACCESS_DENIED
RESTRICTED_RECORD
RESTRICTED_EVIDENCE
POLICY_REJECTED
```

### Consistency

```text
CONCURRENCY_CONFLICT
DUPLICATE_REQUEST
IDEMPOTENCY_KEY_REUSED
VERSION_MISMATCH
```

### Source / connector

```text
SOURCE_TEMPORARILY_UNAVAILABLE
SOURCE_PERMANENTLY_UNAVAILABLE_UNKNOWN
NO_RECORD_OBSERVED
SCHEMA_CHANGED
PARSER_FAILED
RATE_LIMITED
CONNECTOR_NOT_ACTIVE
```

### Evidence / reconciliation

```text
HASH_MISMATCH
IDENTITY_UNRESOLVED
IDENTITY_CONFLICT
EVIDENCE_GAP
CONTRADICTION_EXISTS
RECONCILIATION_QUARANTINED
```

The connector specification explicitly requires typed source failure states and forbids collapsing distinct conditions into a single `MISSING` state. fileciteturn22file2L1984-L2003

---

# 14. Pagination Contract

Cursor pagination is preferred for mutable large collections.

```http
GET /api/v1/public/search?q=road&page_size=20&cursor=...
```

Rules:

```text
page_size default: 20
page_size maximum: contract-configured
cursor opaque to clients
cursor bound to query shape
cursor expiration policy defined by implementation
```

Offset pagination may be used for small administrative lists where stable ordering permits it.

A cursor must not expose internal database IDs or query implementation details.

---

# 15. Filtering and Sorting Contract

Filtering uses explicit field names.

```text
status=CONFIRMED
object_type=PROJECT
institution_id=...
event_from=...
event_to=...
```

Sorting must be explicit:

```text
sort=event_date:desc
sort=title:asc
```

Unknown filters must return `INVALID_FIELD`; they must not be silently ignored on authoritative endpoints.

---

# 16. State-Transition Contract

A state-changing operation is a command, not a simple field update.

```text
CURRENT STATE
      ↓
PRECONDITION CHECK
      ↓
AUTHORIZATION
      ↓
REQUIRED EVIDENCE
      ↓
TRANSITION
      ↓
AUDIT
      ↓
OUTBOX EVENT
```

## 16.1 Report state transitions

```text
DRAFT → SUBMITTED
SUBMITTED → RECEIVED
RECEIVED → TRIAGE
TRIAGE → EVIDENCE_REVIEW
EVIDENCE_REVIEW → ROUTED
ROUTED → ACKNOWLEDGED
ACKNOWLEDGED → UNDER_REVIEW
UNDER_REVIEW → RESPONSE_RECEIVED
RESPONSE_RECEIVED → RESOLUTION_RECORDED
RESOLUTION_RECORDED → CLOSED
RESOLUTION_RECORDED → CONTINUING_MONITORING
```

Alternate transitions:

```text
TRIAGE → NEEDS_MORE_INFORMATION
TRIAGE → DUPLICATE_MERGED
TRIAGE → OUTSIDE_SCOPE
TRIAGE → REFERRED
EVIDENCE_REVIEW → UNRESOLVED
```

These states derive from the approved citizen report workflow. fileciteturn21file2L1969-L2005

## 16.2 Bridge state transitions

```text
PROPOSED → SUPPORTED
PROPOSED → UNRESOLVED
PROPOSED → REJECTED
SUPPORTED → CONFIRMED
SUPPORTED → REJECTED
CONFIRMED → SUPERSEDED
```

A rejected bridge must not be used as a confirmed relationship.

## 16.3 Case transitions

Minimum:

```text
OPEN
UNDER_REVIEW
ROUTED
ACKNOWLEDGED
WAITING_FOR_INFORMATION
OFFICIAL_REVIEW
RESOLUTION_RECORDED
CLOSED
MONITORING
```

## 16.4 Connector state transitions

```text
DISCOVERED
 → VALIDATING
 → APPROVED
 → TESTING
 → PRODUCTION_ELIGIBLE
 → ACTIVE
 → DEGRADED / PAUSED
 → RETIRED
```

---

# 17. Idempotency Contract

Every mobile or external mutation that can safely be retried must support idempotency.

Examples:

```text
POST /reports
POST /upload-sessions
POST /bridge-adjudications
POST /case/transitions
POST /connector/runs
```

Idempotency rules:

```text
same key + same semantic payload
→ return original result

same key + different semantic payload
→ IDEMPOTENCY_KEY_REUSED

completed request + network retry
→ no duplicate domain mutation
```

Idempotency records should retain:

```text
principal
endpoint
key
payload hash
first request time
result reference
expiry/retention policy
```

The approved service architecture explicitly requires idempotency for mobile/external mutations. fileciteturn24file0L705-L719

---

# 18. Optimistic Concurrency

High-impact mutations use an expected version.

```json
{
  "expected_version": 7
}
```

If the stored version is 8:

```text
VERSION_MISMATCH
```

No silent last-write-wins behavior for:

```text
identity bridges
case state
report state
access policies
rules
resolution publication
high-impact governance objects
```

---

# 19. Domain Event Envelope

Internal events are durable implementation messages.

```json
{
  "event_id": "EV-01J...",
  "event_type": "identity.bridge.proposed",
  "event_version": 1,
  "occurred_at": "2026-09-05T07:00:00Z",
  "producer": "identity-module",
  "aggregate_type": "IDENTITY_BRIDGE",
  "aggregate_id": "ET-BRIDGE-01J...",
  "correlation_id": "REQ-01J...",
  "causation_id": "CMD-01J...",
  "payload": {},
  "metadata": {
    "schema_version": "core-v1",
    "tenant": null
  }
}
```

Important:

```text
INTERNAL EVENT ≠ REAL-WORLD EVENT
```

For example, `payment.settlement.recorded` as a platform message says that an eGovTrace domain mutation occurred. The actual government payment occurrence is represented separately by a canonical `PAYMENT` object / `EVENT` with source provenance.

---

# 20. Core Domain Events

Minimum contract set:

```text
source.snapshot.created
source.snapshot.superseded

object.created
object.updated
identifier.discovered

event.created

evidence.registered
evidence.retracted
provenance.created

identity.bridge.proposed
identity.bridge.adjudicated

control.evaluated
signal.created
evidence.gap.created
contradiction.created

report.submitted
report.matched
report.state.changed

case.opened
case.routed
case.state.changed
response.received
resolution.recorded

search.reindex.requested
notification.requested
```

The service architecture already defines the essential event list and the outbox workflow. fileciteturn24file0L524-L575 fileciteturn24file0L654-L678

---

# 21. Domain Event Payload Standards

Events should carry identifiers and references rather than duplicate large source records.

## Example: `identity.bridge.proposed`

```json
{
  "bridge_id": "ET-BRIDGE-01J...",
  "object_a_id": "ET-PROJ-01J...",
  "object_b_id": "ET-PROC-01J...",
  "basis_type": "STRUCTURED_MULTI_FIELD_MATCH",
  "evidence_ids": ["ET-EVID-01J..."],
  "confidence": "MEDIUM",
  "adjudication_state": "PROPOSED"
}
```

## Example: `report.submitted`

```json
{
  "report_id": "ET-REPORT-01J...",
  "status": "RECEIVED",
  "evidence_ids": ["ET-EVID-01J..."],
  "related_object_candidates": ["ET-PROJ-01J..."],
  "privacy_state": "PRIVATE_REPORTER"
}
```

## Example: `signal.created`

```json
{
  "signal_id": "ET-SIG-01J...",
  "rule_id": "ET-RULE-01J...",
  "rule_version": 3,
  "object_id": "ET-PROJ-01J...",
  "signal_type": "DOWNSTREAM_EVIDENCE_GAP",
  "missing_evidence_ids": ["ET-GAP-01J..."],
  "confidence": "HIGH"
}
```

A signal must never contain an implicit field equivalent to `guilty`, `corrupt`, or `fraud`.

---

# 22. Event Ordering and Delivery

The first implementation requires **at-least-once delivery** for internal asynchronous messages.

Therefore every handler must be idempotent.

The system should not rely on global event ordering.

Ordering guarantees should be defined only where required, for example:

```text
same aggregate_id
→ monotonic aggregate version
```

A consumer seeing version 7 before version 6 may:

```text
pause / retry / retrieve canonical state
```

rather than assuming event order across the whole platform.

---

# 23. Outbox Contract

Every transaction that changes canonical domain state and requires downstream processing must write an outbox record in the same database transaction.

```text
BEGIN
  domain mutation
  audit record if required
  outbox event
COMMIT
```

Dispatcher:

```text
OUTBOX
  ↓
DISPATCH
  ↓
QUEUE
  ↓
WORKER
  ↓
ACK / RETRY / DEAD-LETTER
```

This is the required pattern in the approved service architecture. fileciteturn24file0L524-L554

---

# 24. Job Contract

Long-running operations use durable jobs.

```json
{
  "job_id": "JOB-01J...",
  "job_type": "IDENTITY_MATCH",
  "input_ids": ["ET-PROJ-01J..."],
  "status": "RUNNING",
  "started_at": "2026-09-05T07:00:00Z",
  "completed_at": null,
  "worker_version": "worker-0.1.0",
  "error_code": null,
  "retry_count": 0,
  "correlation_id": "REQ-01J..."
}
```

Minimum job types:

```text
INGESTION
NORMALIZATION
EXTRACTION
IDENTITY_MATCH
CONTROL_EVALUATION
SEARCH_INDEX
MEDIA_PROCESSING
REPORT_TRIAGE
PROJECTION_REFRESH
NOTIFICATION
BACKFILL
REPROCESSING
```

The core schema explicitly identifies these asynchronous job categories and requires each job to preserve worker version and retry metadata. fileciteturn23file0L124-L151

---

# 25. Job State Model

```text
QUEUED
  ↓
RUNNING
  ↓
SUCCEEDED
```

Failure:

```text
RUNNING
  ↓
FAILED
  ↓
RETRY_SCHEDULED
  ↓
RUNNING
```

Terminal non-retryable:

```text
FAILED
  ↓
DEAD_LETTERED
```

Cancellation:

```text
QUEUED / RUNNING
  ↓
CANCELLED
```

A failed job must preserve the failure code and inputs required for reproduction.

---

# 26. Retry Semantics

Retry classes:

```text
TRANSIENT
RATE_LIMITED
AUTHENTICATION_RETRYABLE
SCHEMA_DRIFT_REQUIRES_OPERATOR
VALIDATION_NON_RETRYABLE
SOURCE_DENIAL_NON_RETRYABLE
POLICY_REJECTION_NON_RETRYABLE
```

Suggested behavior:

```text
TRANSIENT
→ exponential backoff + jitter

RATE_LIMITED
→ server/source-provided delay where available

SCHEMA_DRIFT
→ quarantine + operator review

AUTH_FAILURE
→ bounded retry, then pause/escalate

POLICY_REJECTION
→ no automatic retry until policy changes
```

Exact retry timings remain deployment configuration and must not be hard-coded into API semantics.

---

# 27. Dead-Letter Contract

Any job that cannot safely complete after its retry policy enters dead-letter state.

Dead-letter records must retain:

```text
job_id
job_type
input_ids
last_error_code
last_error_detail
attempt_count
worker_version
first_failed_at
last_failed_at
correlation_id
```

Reprocessing must create a new attempt lineage without deleting the old failure history.

---

# 28. Projection Events

Public and assurance projections are rebuildable derived read models.

```text
canonical mutation
      ↓
object.created / object.updated / evidence / bridge / state event
      ↓
projection refresh
      ↓
public projection
assurance projection
search index
```

Search index contents are disposable and rebuildable; they are never the authoritative source. fileciteturn22file1L1366-L1378

---

# 29. Public Projection Contract

A public projection must enforce:

```text
restricted object     → omitted
restricted field      → redacted
private reporter      → protected reference
unadjudicated signal  → not framed as wrongdoing
internal hypothesis   → omitted
official finding      → shown only with authoritative source
```

These rules belong in the backend projection policy, not merely frontend filtering. fileciteturn24file0L938-L950

## 29.1 Public status vocabulary

```text
CONFIRMED
REPORTED
UNRESOLVED
NOT_ESTABLISHED
NOT_PUBLICLY_AVAILABLE
SUPERSEDED
RETRACTED
```

## 29.2 Public uncertainty examples

Preferred:

```text
Procurement record not publicly established in the sources reviewed.
```

Avoid:

```text
No procurement occurred.
```

Preferred:

```text
Payment settlement has not been established from currently recoverable evidence.
```

Avoid:

```text
The contractor was not paid.
```

These language distinctions are explicit in the approved product architecture. fileciteturn21file2L2047-L2063

---

# 30. Assurance Projection Contract

Assurance projections may include:

```text
canonical objects
source representations
bridge candidates
bridge basis/evidence
control states
signals
missing evidence
contradictions
routing candidates
restricted evidence references
case context
adjudication history
```

Every restricted element is subject to object/edge/evidence/action authorization.

Being employed by a government entity is not itself sufficient authorization for unrestricted graph access.

---

# 31. Access Decision Contract

Authorization should evaluate:

```text
principal
role
organization
jurisdiction
object
object_type
action
field
edge
 evidence
case
purpose/context
```

Conceptual result:

```json
{
  "decision": "ALLOW",
  "policy_id": "ET-POL-...",
  "scope": ["READ_PUBLIC_PROJECTION"],
  "expires_at": "2026-09-05T08:00:00Z"
}
```

Possible decisions:

```text
ALLOW
DENY
REDACT
ESCALATE
REQUIRE_ADDITIONAL_AUTH
```

---

# 32. Service-to-Service Authentication

Internal modules should authenticate as service principals.

Every internal call should have:

```text
service principal
service role
correlation ID
requested capability
optional delegation context
```

Secrets must remain outside source code.

A domain module must not impersonate a human actor merely because a service account initiated the operation.

For human-adjudicated actions, the actor and service executor remain separately recorded:

```text
human actor
      ↓
command
      ↓
service executor
      ↓
audit record
```

---

# 33. Audit Contract

High-impact mutations require audit records.

```json
{
  "audit_event_id": "AUD-01J...",
  "actor_id": "ET-USER-01J...",
  "actor_role": "ASSURANCE_ANALYST",
  "action": "IDENTITY_BRIDGE_CONFIRM",
  "object_id": "ET-BRIDGE-01J...",
  "previous_state": "SUPPORTED",
  "new_state": "CONFIRMED",
  "reason": "...",
  "timestamp": "2026-09-05T07:30:00Z",
  "correlation_id": "REQ-01J..."
}
```

High-impact audit actions include bridge adjudication, connector activation, rule publication/retirement, access-policy changes, report suppression, case closure, resolution publication, restricted evidence access, and manual source correction. fileciteturn22file1L1167-L1198

---

# 34. Real-World Event vs Platform Event

The API must make this distinction explicit.

```text
PLATFORM EVENT
"object.updated"
    ≠
REAL-WORLD EVENT
"contract signed on 2021-08-23"
```

Real-world/admin events require their own:

```text
event_id
event_type
actor
subject
source_record_id
event_date
observation_date
provenance
confidence
```

The schema defines events as the temporal spine, but also states that an event is an occurrence recorded by a source and not automatically independent verification of physical reality. fileciteturn21file0L693-L754

---

# 35. Evidence and Provenance API Contract

For every derived result, the API should be able to traverse:

```text
ASSERTION
  ↓
DERIVED OBJECT
  ↓
INPUT OBJECTS
  ↓
EVIDENCE
  ↓
SNAPSHOT
  ↓
SOURCE
```

Provenance metadata:

```text
provenance_id
source_id
source_record_id
snapshot_id
extraction_method
parser_version
normalizer_version
rule_id
rule_version
input_object_ids
input_evidence_ids
execution_timestamp
human_adjudication_state
```

The canonical schema requires this lineage for identity bridges, control states, signals, aggregations, AI-assisted extraction, comparison statistics, and case-routing recommendations. fileciteturn22file1L947-L973

---

# 36. AI Contract Boundary

AI-assisted operations may call application APIs only through bounded tasks.

Permitted examples:

```text
AI.ExtractDocumentFields
AI.SuggestIdentityMatches
AI.SuggestDuplicate
AI.SummarizeEvidence
AI.SuggestSchemaDrift
AI.SuggestPlainLanguageExplanation
```

AI output must be represented as:

```text
PROPOSAL
CANDIDATE
INFERENCE
SUGGESTION
```

before validation/adjudication.

AI must not directly invoke commands that silently mutate authoritative source facts or confirm legal findings.

The canonical AI model requires model name/version, input objects/evidence, output summary, confidence, and human review state. fileciteturn22file1L977-L1011

---

# 37. Control Engine Contract

Control evaluation is asynchronous by default.

```text
Control.EvaluateObject
       ↓
rule/version lookup
       ↓
input selection
       ↓
temporal filter
       ↓
exception filter
       ↓
evaluation
       ↓
CONTROL_STATE
       ↓
SIGNAL / NO_SIGNAL
```

Evaluation result must contain:

```text
rule_id
rule_version
inputs
expected_state
observed_state
variance
exceptions_checked
missing_evidence
possible_explanations
confidence
generated_at
```

No control engine output may become an official finding without competent-authority evidence.

---

# 38. Identity Resolution Contract

Identity resolution runs asynchronously for large batches and may run synchronously for exact low-cost lookups.

Matching tiers:

```text
T0 EXACT_NATIVE_IDENTIFIER
T1 DOCUMENT_EXPLICIT_REFERENCE
T2 EXPLICIT_SOURCE_CROSSREFERENCE
T3 STRUCTURED_MULTI_FIELD_MATCH
T4 TEMPORAL_LOCATION_CORROBORATION
T5 NAME_ONLY
T6 AMOUNT_ONLY
T7 MODEL_SUGGESTION
```

T5–T7 cannot automatically confirm identity.

A candidate match response should contain:

```json
{
  "candidate_id": "ET-BRIDGE-01J...",
  "basis_type": "NAME_ONLY_MATCH",
  "confidence": "LOW",
  "adjudication_state": "PROPOSED",
  "why_candidate": "Normalized title and location are similar.",
  "required_evidence": ["DOCUMENT_EXPLICIT_REFERENCE"]
}
```

The identity engine must preserve false-positive cases and rejected joins as part of testing and audit history. fileciteturn24file0L838-L863

---

# 39. Evidence-Gap Contract

Missing evidence is itself a typed object.

```json
{
  "evidence_gap_id": "ET-GAP-01J...",
  "object_id": "ET-PROJ-01J...",
  "expected_evidence_type": "CONTRACT_DOCUMENT",
  "expected_source_id": "EG-SRC-...",
  "expected_event_type": "CONTRACT_SIGNED",
  "reason_state": "NOT_PUBLICLY_RECOVERED",
  "status": "OPEN"
}
```

Reason states:

```text
NOT_PUBLICLY_RECOVERED
RESTRICTED
SOURCE_UNAVAILABLE
NOT_REQUESTED
REQUEST_PENDING
REQUEST_DENIED
REQUEST_FULFILLED
NOT_APPLICABLE
```

A gap must never serialize as `FALSE`.

---

# 40. Contradiction Contract

When incompatible source-backed claims are present:

```text
DO NOT overwrite either source fact.
DO NOT silently choose one.
CREATE CONTRADICTION.
```

Example:

```json
{
  "contradiction_id": "ET-CONTRA-01J...",
  "object_id": "ET-PROJ-01J...",
  "claim_a_evidence_id": "ET-EVID-A",
  "claim_b_evidence_id": "ET-EVID-B",
  "conflict_type": "DATE_CONFLICT",
  "status": "OPEN"
}
```

The source claims remain independently attributable.

---

# 41. Financial API Safety

Financial objects must remain separate.

```text
BUDGET
 ↓
ALLOTMENT
 ↓
OBLIGATION
 ↓
DISBURSEMENT DOCUMENTATION
 ↓
ACCOUNTING / JEV
 ↓
SETTLEMENT
```

An API must never expose:

```json
"payment_status": "PAID"
```

when the underlying state only establishes an obligation or disbursement instruction.

Instead:

```json
{
  "financial_state": {
    "obligation": "CONFIRMED",
    "disbursement_documentation": "CONFIRMED",
    "settlement": "NOT_ESTABLISHED"
  }
}
```

This reflects the research finding that ORS, DV, LDDAP-ADA/ADA, JEV and settlement are distinct evidentiary stages. fileciteturn19file7L1171-L1186

---

# 42. Customs API Safety

Customs-related API objects remain distinct:

```text
B/L
 ↓
DISCHARGE
 ↓
DECLARATION
 ↓
ASSESSMENT
 ↓
PAYMENT
 ↓
RELEASE INSTRUCTION
 ↓
PHYSICAL RELEASE
```

A B/L response must not contain a fabricated declaration/payment/release relationship.

Where downstream evidence is unresolved:

```json
{
  "declaration": {
    "status": "UNRESOLVED"
  }
}
```

not:

```json
{"declaration": null, "meaning": "none existed"}
```

---

# 43. Report-to-Object Matching Contract

Report matching returns candidates, not facts.

```http
POST /api/v1/internal/reports/{report_id}/match
```

Result:

```json
{
  "report_id": "ET-REPORT-01J...",
  "candidates": [
    {
      "object_id": "ET-PROJ-01J...",
      "match_basis": "LOCATION_AND_TITLE_SIMILARITY",
      "confidence": "MEDIUM",
      "adjudication_state": "PROPOSED"
    }
  ]
}
```

Human or rule validation is required before the candidate becomes a confirmed relationship.

---

# 44. Case Routing Contract

Routing recommendations contain:

```text
routing_recommendation_id
case_id
likely_custodian_id
candidate_authority_ids
basis
required_evidence
routing_confidence
legal_scope_note
review_state
```

A routing recommendation can be revised without rewriting the originating report/signal.

The architecture explicitly describes routing as decision support while preserving uncertainty among potentially overlapping institutional roles. fileciteturn22file1L1015-L1031

---

# 45. Notification Contract

Notifications are derived communications, not canonical state.

```text
notification.requested
       ↓
Notification Service
       ↓
email / SMS / in-app / eGovPH handoff
```

A notification should include:

```text
notification_id
recipient_ref
channel
template_id
template_version
object_id / case_id / report_id
created_at
send_state
```

The failure of a notification must not roll back the underlying case/report transaction.

---

# 46. Webhook Contract

Webhooks may be introduced for authorized integrations.

Required properties:

```text
signed payload
endpoint registration ID
event type
schema version
event ID
attempt number
delivery timestamp
idempotent receiver expectation
```

A webhook payload contains event references and bounded metadata, not unrestricted graph dumps.

---

# 47. Rate Limiting Contract

Rate limits are audience and endpoint specific.

The API should expose standard throttling information where appropriate:

```text
429 Too Many Requests
Retry-After
X-RateLimit-Limit
X-RateLimit-Remaining
X-RateLimit-Reset
```

Exact limits are deployment policy and may vary by endpoint and source-custodian requirements.

Source connector limits must additionally respect source-specific terms and rate policies.

---

# 48. Caching Contract

Safe public cache candidates:

```text
public object projection
public search result
public source metadata
public geospatial aggregate
public evidence metadata
```

Never place unrestricted assurance data in public caches.

Cache keys should include:

```text
API version
projection version
object ID
access class where applicable
query hash
```

Authorization-sensitive responses must use private or non-cacheable policies unless the cache implementation is proven safe for the access model.

---

# 49. Freshness Contract

Every source-backed projection should be able to communicate freshness when meaningful:

```json
{
  "freshness": {
    "source_observed_at": "2026-09-05T06:30:00Z",
    "source_update_date": "2026-09-04",
    "eGovTrace_observed_at": "2026-09-05T06:31:00Z",
    "state": "CURRENT_OBSERVATION"
  }
}
```

Search/research time must not be presented as evidence date.

The source-connector contract explicitly distinguishes source date, retrieval time, and observation date. fileciteturn21file1L1319-L1327

---

# 50. Temporal Query Contract

Queries that ask “as of” a date must specify temporal semantics.

```http
GET /api/v1/assurance/objects/{id}?as_of=2021-10-31
```

The backend must distinguish:

```text
EVENT_TIME
SOURCE_UPDATE_TIME
OBSERVATION_TIME
RESEARCH_TIME
VALID_TIME
TRANSACTION_TIME
```

An `as_of` query must not silently use current observed state when a historical valid state is requested.

The schema defines these distinct concepts and requires preservation of historical source states. fileciteturn22file0L223-L282

---

# 51. Geospatial API Contract

Location queries may support:

```text
point
bbox
polygon
route_segment
administrative_area
```

Example:

```http
GET /api/v1/public/search?near=14.000000,121.000000&radius_m=1000
```

Citizen report location fields should include precision and capture method where available, but exact sensitive locations may be generalized in public responses.

The source/API architecture supports GPS, user-selected pin, searched location and known project location inputs, while sensitive citizen locations remain non-public by default. fileciteturn22file2L2197-L2220

---

# 52. Batch API Contract

Batch ingestion or administrative actions should use asynchronous jobs when they can exceed ordinary request duration.

Example:

```http
POST /api/v1/admin/connectors/{id}/runs
```

Immediate response:

```json
{
  "data": {
    "job_id": "JOB-01J...",
    "status": "QUEUED"
  }
}
```

Do not hold a synchronous HTTP request open while processing thousands of records, documents, or control evaluations.

---

# 53. Reprocessing Contract

Reprocessing must preserve old snapshots and old derived history where required.

```text
RAW SNAPSHOT v1
      ↓
PARSER v2
      ↓
NORMALIZED OUTPUT v2
      ↓
DERIVED OBJECT VERSION v2
```

The previous derived version remains attributable to its prior parser/rule/model versions.

The connector specification explicitly prohibits silent retroactive analytical rewriting. fileciteturn22file2L2026-L2042

---

# 54. Backfill Contract

Historical ingestion must identify itself:

```json
{
  "run_type": "BACKFILL",
  "historical_start": "2021-01-01",
  "historical_end": "2021-12-31",
  "source_snapshot_basis": "PUBLIC_SOURCE_RETRIEVAL",
  "connector_version": "fmr-0.2.0",
  "parser_version": "fmr-parser-0.3.0"
}
```

The observation date remains the retrieval date; historical event dates remain event dates. A backfill does not imply historical continuous availability. fileciteturn22file2L2007-L2022

---

# 55. Source Availability Contract

Public API responses must avoid converting source failures into factual negatives.

Examples:

```json
{
  "status": "NOT_ESTABLISHED",
  "availability": {
    "state": "SOURCE_TEMPORARILY_UNAVAILABLE"
  }
}
```

versus:

```json
{
  "status": "NOT_ESTABLISHED",
  "availability": {
    "state": "NO_RECORD_OBSERVED"
  }
}
```

These are different conditions and must remain distinguishable internally.

---

# 56. API Security Contract

Minimum controls:

```text
TLS
secure headers
secret management
key rotation
least privilege
RBAC / policy enforcement
audit logs
tamper-evident audit records
input validation
output encoding
file validation
malware scanning where appropriate
rate limiting
abuse detection
backup/recovery
incident response
```

Sensitive evidence routes must be logically separated from public content routes, and citizen uploads are untrusted inputs. fileciteturn22file2L1886-L1913

---

# 57. Privacy Contract

The API must enforce data minimization.

Citizen report defaults:

```text
reporter identity private
location precision minimized where appropriate
EXIF/media metadata controlled
sensitive attachments restricted
public report redacted
```

Government data:

```text
public record != unrestricted internal record
```

The 2026 E-Governance Act IRR requires privacy/security/access-control considerations for inter-agency sharing and preserves source-agency data stewardship responsibilities. citeturn324912search0

---

# 58. Contract Compatibility Rules

A v1-compatible change may:

```text
add optional response fields
add new enum values only where clients are defined to tolerate them
add non-required query filters
add new event types
add optional request fields
```

A breaking change includes:

```text
remove a required field
change field meaning
change identifier semantics
change required authorization meaning
change state transition semantics
change evidence interpretation
rename an existing semantic enum in place
change an event payload incompatibly
```

Semantic meaning changes require a new versioned field, object, event version, or API major version rather than silently redefining an existing contract.

---

# 59. Schema / Event / Rule Version Matrix

Each derived response should be reproducible against its version context.

```text
api_version
canonical_schema_version
source_schema_version
snapshot_version
parser_version
connector_version
normalizer_version
rule_version
model_version where applicable
```

Example metadata:

```json
{
  "version_context": {
    "api": "v1",
    "canonical_schema": "core-v1",
    "source_schema": "dbm-2026-08",
    "connector": "dbm-0.4.0",
    "parser": "dbm-parser-0.5.0",
    "normalizer": "finance-normalizer-0.2.0",
    "rule": "financial-continuity-3",
    "model": null
  }
}
```

---

# 60. Contract Testing Strategy

The API/event contract is considered implemented only after:

```text
Schema tests
OpenAPI validation
Consumer contract tests
Producer contract tests
Event serialization tests
Event backward-compatibility tests
Authorization tests
Idempotency tests
Concurrency tests
Negative state-transition tests
Projection redaction tests
Error-contract tests
Pagination tests
Rate-limit tests
Retry tests
Dead-letter tests
Reprocessing tests
```

## 60.1 Mandatory negative tests

```text
unconfirmed bridge requested as confirmed
restricted evidence requested publicly
wrong expected_version
same idempotency key with different payload
report retried after success
signal exposed as corruption
obligation serialized as payment
source unavailable serialized as no-record
fuzzy match serialized as confirmed identity
AI proposal serialized as authoritative fact
```

---

# 61. End-to-End Contract Scenarios

## Scenario A — Project ingestion

```text
connector run
 → source.snapshot.created
 → source object created
 → identifier.discovered
 → event.created
 → bridge.proposed
 → control.evaluated
 → projection refresh
 → search.reindex.requested
```

## Scenario B — Citizen report

```text
POST report
 → report.submitted
 → triage job
 → report.matched
 → evidence review
 → case.opened or ordinary-service path
 → case.routed
 → response.received
 → resolution.recorded
 → public projection refresh
```

## Scenario C — Identity adjudication

```text
bridge proposed
 → reviewer loads evidence
 → adjudicate
 → audit record
 → bridge.adjudicated
 → downstream control evaluation job
 → projection/search refresh
```

## Scenario D — Financial continuity

```text
project
 → procurement bridge
 → contract
 → financial candidate
 → obligation
 → disbursement
 → settlement
```

Every stage remains independent and evidence-backed.

## Scenario E — Control signal

```text
control evaluation
 → signal
 → evidence sufficiency
 → exception check
 → human review
 → control issue / explained
 → case where warranted
```

Never:

```text
signal → corruption
```

These workflows follow the approved service architecture's end-to-end workflow definitions. fileciteturn24file0L584-L650

---

# 62. API / Event Traceability to Core Schema

```text
Core Object
  ↓
Application Command / Query
  ↓
Domain Module
  ↓
Canonical Mutation / Read Projection
  ↓
Domain Event
  ↓
Projection / Job
  ↓
API response
```

Example:

```text
Research rule:
IDENTIFIER RECOVERY != IDENTIFIER PROOF

        ↓

Command:
Identity.ConfirmBridge

        ↓

Precondition:
required basis + evidence

        ↓

Mutation:
IdentityBridge.adjudication_state = CONFIRMED

        ↓

Event:
identity.bridge.adjudicated

        ↓

Projection:
relationship.status = CONFIRMED

        ↓

Public:
"Linked by documented identifier"
```

The core schema explicitly requires this research-to-engineering-to-API-to-UI traceability. fileciteturn22file1L2560-L2586

---

# 63. First OpenAPI Surface

The first generated OpenAPI document should contain at minimum:

```text
PUBLIC
  /public/search
  /public/objects/{id}
  /public/projects/{id}
  /public/entities/{id}
  /public/services/{id}
  /public/evidence/{id}
  /public/reports
  /public/reports/{id}
  /public/reports/{id}/attachments/sessions
  /public/uploads/{id}/complete

ASSURANCE
  /assurance/objects/{id}
  /assurance/signals/{id}
  /assurance/bridges/{id}
  /assurance/bridges/{id}/adjudicate
  /assurance/cases/{id}
  /assurance/cases/{id}/route
  /assurance/cases/{id}/transitions
  /assurance/cases/{id}/close

ADMIN
  /admin/sources
  /admin/connectors/{id}/health
  /admin/connectors/{id}/runs
  /admin/runs/{id}
  /admin/rules
  /admin/rules/{id}/publish
  /admin/access-policies
  /admin/audit-logs
```

Exact path design may evolve in OpenAPI, but semantic boundaries must remain consistent with this contract.

---

# 64. Event Registry v1

| Event | Producer | Primary consumers | Delivery | Sensitive? |
|---|---|---|---|---|
| `source.snapshot.created` | Snapshot | Object, Identifier, Search | async | policy-dependent |
| `source.snapshot.superseded` | Snapshot | Projection, Audit | async | policy-dependent |
| `object.created` | Object | Projection, Search | async | policy-dependent |
| `object.updated` | Domain | Projection, Search | async | policy-dependent |
| `identifier.discovered` | Identifier | Identity | async | possible |
| `event.created` | Event | Controls, Projection | async | policy-dependent |
| `evidence.registered` | Evidence | Provenance, Projection | async | yes where restricted |
| `identity.bridge.proposed` | Identity | Assurance, Controls | async | assurance |
| `identity.bridge.adjudicated` | Identity | Controls, Projection, Audit | async | assurance |
| `control.evaluated` | Control | Assurance | async | assurance |
| `signal.created` | Control | Assurance, Case | async | assurance |
| `evidence.gap.created` | Control | Assurance, Case | async | possible |
| `contradiction.created` | Reconciliation | Assurance | async | possible |
| `report.submitted` | Report | Triage, Notification | async | citizen-sensitive |
| `report.matched` | Matching | Report, Case | async | citizen-sensitive |
| `case.opened` | Case | Routing, Notification | async | assurance |
| `case.routed` | Case | Notification | async | assurance |
| `response.received` | Case | Resolution, Projection | async | policy-dependent |
| `resolution.recorded` | Case | Projection, Notification, Audit | async | policy-dependent |
| `search.reindex.requested` | Projection | Search | async | no |
| `notification.requested` | Workflow | Notification | async | depends |

---

# 65. Implementation Ownership Rules

The following ownership rules are mandatory for v1:

```text
Public API
→ application/query layer only

Assurance API
→ application/query + authorization only

Domain modules
→ own their mutations

Evidence
→ owns evidence metadata and evidence lifecycle

Provenance
→ owns lineage metadata

Identity
→ owns bridges and adjudication

Control
→ owns rules/evaluation/signals

Case
→ owns case state and resolution state

Search
→ owns index, never source truth

Connector
→ owns retrieval mechanics, never canonical domain truth
```

No module may directly mutate another module's authoritative tables.

This directly follows the service architecture's persistence-ownership and write rules. fileciteturn24file0L788-L835

---

# 66. Contract for Future Service Extraction

The modular monolith should allow later extraction of:

```text
Connector Runtime
Evidence Service
Identity Service
Control Engine
Search
Notification
```

without changing public semantics.

The extraction boundary is the application contract, not the database table.

Therefore:

```text
internal API / command
      ↓
module interface
      ↓
module implementation
```

must exist even when two modules currently execute inside one process.

---

# 67. API Observability

Every API request should emit structured telemetry sufficient to answer:

```text
who called?
what endpoint?
what command/query?
which object?
which authorization decision?
how long?
what result?
which downstream jobs/events?
was it retried?
```

Core metrics:

```text
request_count
request_error_rate
P50/P95/P99 latency
idempotency_replay_rate
concurrency_conflict_rate
queue_lag
job_retry_rate
dead_letter_rate
projection_lag
search_index_lag
source_connector_success_rate
provenance_completeness
```

The approved connector architecture already identifies API availability, latency, upload success, connector success, source freshness, schema drift detection, reconciliation age, and provenance completeness as key measurements. fileciteturn22file2L2415-L2433

---

# 68. Auditability of the API Itself

A public response should be reconstructable from:

```text
request
access policy version
canonical object version
projection version
source evidence
provenance chain
rule version where derived
```

An assurance response containing a signal must additionally identify:

```text
signal ID
rule ID/version
comparison set
inputs
possible explanations
missing evidence
adjudication state
```

This makes the API itself auditable rather than treating the API as an opaque presentation layer.

---

# 69. Performance Boundaries

Public endpoints should use read-optimized projections.

Deep assurance graph traversal should:

```text
be bounded
be authorization-aware
support explicit depth/limit constraints
avoid unbounded recursive expansion
```

Long-running operations should become jobs.

Recommended default architecture:

```text
PUBLIC READ
→ indexed projection

ASSURANCE TRAVERSAL
→ bounded query / recursive SQL / future graph adapter

INGESTION / RECONCILIATION
→ async worker
```

This aligns with the core schema's three principal workloads: public lookup, graph/assurance traversal, and ingestion/reconciliation. fileciteturn23file0L104-L120

---

# 70. Contract Acceptance Matrix

## Public API

```text
[ ] OpenAPI validates
[ ] public projection never exposes restricted evidence
[ ] uncertainty states render correctly
[ ] pagination is deterministic
[ ] filters reject unknown fields
[ ] idempotent mutations are retry-safe
```

## Assurance API

```text
[ ] bridge adjudication requires evidence/basis
[ ] restricted records require authorization
[ ] optimistic concurrency enforced
[ ] signal includes rule version
[ ] case state transitions are audited
```

## Source API

```text
[ ] source authorization recorded
[ ] connector health available
[ ] observations hashed
[ ] source failures typed
[ ] retries bounded
[ ] reprocessing reproducible
```

## Events

```text
[ ] event envelope versioned
[ ] producer identified
[ ] aggregate version available where needed
[ ] correlation/causation IDs available
[ ] consumer is idempotent
[ ] schema compatibility tested
```

## Jobs

```text
[ ] job state durable
[ ] retry metadata durable
[ ] dead-letter supported
[ ] worker version recorded
[ ] inputs reproducible
```

---

# 71. Required V1 Negative-Safety Tests

The implementation must explicitly prove that it does **not**:

```text
1. treat a fuzzy project title as confirmed identity;
2. treat same location as same project;
3. treat same contractor as same transaction;
4. treat a budget representation as proof of payment;
5. treat an obligation as settlement;
6. treat B/L existence as proof of customs declaration;
7. treat unavailable data as false;
8. treat a signal as corruption;
9. treat a citizen report as an official finding;
10. treat an AI proposal as authoritative fact;
11. expose restricted evidence through public projections;
12. silently overwrite historical source states;
13. duplicate a report after network retry;
14. permit stale clients to overwrite newer case/bridge state;
15. allow a generic update endpoint to mutate foreign-domain state.
```

These tests are not optional quality improvements. They implement the core research and architectural safeguards.

---

# 72. Initial Build Order

The contract should be implemented in this order:

```text
1. Shared error and request/response types
2. Object/public projection DTOs
3. Authentication/authorization context
4. Public search/object endpoints
5. Report + evidence upload contracts
6. Internal command/query bus
7. Domain event envelope + outbox
8. Job envelope + worker runtime
9. Identity bridge commands/events
10. Evidence/provenance commands/events
11. Control evaluation events/jobs
12. Case/routing commands/events
13. Admin/source connector API
14. Assurance projections
15. OpenAPI generation + contract tests
```

This preserves the approved implementation sequence from the service architecture while inserting the formal contract layer before full connector and repository implementation. fileciteturn23file0L425-L445

---

# 73. Relationship to Existing Artifacts

This contract is downstream of:

```text
eGovTrace_Public_Accountability_Ecosystem_Architecture.md
eGovTrace_Source_System_and_Data_Boundary_Architecture_v1.md
eGovTrace_Source_Connector_and_API_Specification_v1.md
eGovTrace_Citizen_Product_and_Mobile_Web_Architecture_v1.md
eGovTrace_Core_Data_Model_and_Graph_Schema_v1.md
eGovTrace_Core_Service_and_Domain_Module_Architecture_v1.md
```

It must not contradict the semantic rules frozen in those artifacts.

The core schema specifically calls for this next API/event contract layer after the service architecture and expects service families covering Object, Identity, Evidence, Source, Event, Control, Report, Case/Workflow, Search, Notification, Access/Authorization and Audit. fileciteturn23file0L483-L504

---

# 74. Architectural Freeze for API/Event v1

The following are frozen for engineering planning:

```text
1. API contracts are versioned independently from source schemas.
2. Public APIs expose projections, not the raw internal graph.
3. Assurance APIs expose deeper data only under authorization.
4. Mutations are typed commands.
5. Queries are read-only projections.
6. High-impact mutations use optimistic concurrency.
7. Retryable external/mobile mutations support idempotency.
8. Domain state changes use transactional outbox events.
9. Event delivery is at-least-once and consumers are idempotent.
10. Long-running work uses jobs.
11. Domain events are distinct from real-world source events.
12. Evidence/provenance metadata is retained with derived outputs.
13. State transitions are explicitly constrained.
14. Source failures remain typed.
15. Missing evidence remains a gap, not a negative fact.
16. Control signals never become wrongdoing findings automatically.
17. Official findings must reference competent-authority records.
18. AI outputs remain proposals/inferences until validated.
19. Public privacy/redaction is enforced server-side.
20. Search remains a rebuildable projection, not source truth.
21. Historical/temporal semantics remain explicit.
22. Cross-system relationship responses explain basis/evidence/confidence.
23. No generic cross-domain mutation endpoint is permitted.
24. The contract must support later extraction of modules without semantic redesign.
```

---

# 75. Engineering Status

```text
API CONTRACT MODEL: APPROVED WORKING BASELINE
EVENT CONTRACT MODEL: APPROVED WORKING BASELINE
JOB CONTRACT MODEL: APPROVED WORKING BASELINE
STATE-TRANSITION CONTRACT: APPROVED WORKING BASELINE
PUBLIC / ASSURANCE BOUNDARY: APPROVED WORKING BASELINE
ERROR TAXONOMY: APPROVED WORKING BASELINE
OPENAPI IMPLEMENTATION: NEXT BUILD ARTIFACT
PHYSICAL DATABASE IMPLEMENTATION: NEXT BUILD ARTIFACT
PRODUCTION DEPLOYMENT: NOT AUTHORIZED BY THIS DOCUMENT ALONE
```

---

# 76. Next Engineering Artifacts

The immediate downstream artifacts are:

```text
1. eGovTrace_OpenAPI_v1.yaml
2. eGovTrace_Domain_Event_and_Job_Contracts_v1.md
3. eGovTrace_Physical_PostgreSQL_Schema_v1.sql
4. eGovTrace_Backend_Repository_Scaffold_v1/
5. eGovTrace_Connector_SDK_Skeleton_v1/
```

The recommended next artifact is **`eGovTrace_OpenAPI_v1.yaml`**, because this document now defines the semantic contract and endpoint families, while OpenAPI should make the HTTP surface machine-readable for backend/frontend/client generation and contract testing.

---

# 77. Final Engineering Definition

> **eGovTrace API and Event Contracts define how citizens, assurance users, administrators, source connectors, domain modules, workers, and projections interact with one evidence-backed accountability system through versioned, typed, authorization-aware, idempotent and auditable contracts, while preserving source authority, temporal history, provenance, uncertainty, and the distinction between observations, relationships, signals, cases, and official findings.**
