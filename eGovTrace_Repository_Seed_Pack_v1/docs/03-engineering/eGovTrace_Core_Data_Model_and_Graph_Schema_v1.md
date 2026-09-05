# eGovTrace Core Data Model and Graph Schema v1

**Status:** APPROVED WORKING ENGINEERING SCHEMA / v1 BUILD BASELINE  
**Relationship to G0–G6:** Additive engineering specification derived from the approved eGovTrace research, product, data-boundary, and source-connector architectures; not a new formal research gate.  
**Implementation posture:** Build-preparation baseline. Physical implementation remains subject to security, privacy, legal, source-custodian, interoperability, and performance validation.  
**Primary purpose:** Define the canonical logical data model, graph model, temporal/provenance model, identifier-bridge model, control-state model, citizen-report/case model, access model, and core persistence rules for eGovTrace.

---

## 0. Executive Decision

The eGovTrace core will be a **temporal, evidence-backed, provenance-aware accountability graph**. It will not become a universal replacement database for Philippine government systems.

```text
SOURCE RECORDS
      |
      v
SOURCE OBJECTS
      |
      +----> EVIDENCE / SNAPSHOT
      |
      +----> IDENTITY BRIDGE
      |
      +----> NORMALIZED EVENT
      |
      +----> ACCOUNTABILITY OBJECT
      |
      +----> CONTROL STATE / SIGNAL
      |
      +----> REPORT / CASE
      |
      v
EGOVTRACE GRAPH
      |
      +----> PUBLIC VIEW
      +----> ASSURANCE VIEW
      +----> API
```

The central design rule is:

> **Centralize the accountability relationship, not every underlying government record.**

The core graph therefore stores enough information to establish, explain, reproduce, or challenge a relationship while preserving source-system authority.

---

# 1. Governing Principles

The core schema inherits these frozen principles from the approved architecture:

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

CITIZEN REPORTS ARE CLAIMS / OBSERVATIONS UNTIL ESTABLISHED.

CONTROL BREAKS ARE INVESTIGATION SIGNALS, NOT AUTOMATIC FINDINGS OF WRONGDOING.

NATIONAL INTEROPERABILITY MUST RESPECT LOCAL AUTONOMY AND LEGAL AUTHORITY.
```

These rules directly constrain what the database may assert and what the user interface may present as established fact. The approved source-boundary architecture also requires provenance, temporal preservation, explicit identity bridges, and separation of restricted/external-custody information. fileciteturn17file1L799-L827 fileciteturn17file1L1137-L1182

---

# 2. Logical Architecture

The logical core is divided into nine domains.

```text
1. IDENTITY DOMAIN
2. INSTITUTION DOMAIN
3. OBJECT DOMAIN
4. EVENT DOMAIN
5. EVIDENCE / PROVENANCE DOMAIN
6. CONTROL / ANALYTICS DOMAIN
7. CITIZEN REPORT DOMAIN
8. CASE / RESPONSE / RESOLUTION DOMAIN
9. ACCESS / GOVERNANCE DOMAIN
```

These domains may be implemented in relational tables, document collections, graph structures, or a hybrid architecture. The logical identifiers and semantics remain stable even if the physical storage technology changes.

---

# 3. Canonical Object Model

## 3.1 Canonical object envelope

Every first-class eGovTrace object should carry a common metadata envelope.

```yaml
object_id: ET-<TYPE>-<ULID>
object_type:
source_refs: []
status:
visibility:
created_at:
updated_at:
valid_from:
valid_to:
observed_at:
provenance_ids: []
access_class:
version:
```

### Required semantic distinction

```text
object_id
    = eGovTrace identity

source_record_id
    = source-system identity

bridge_id
    = relationship evidence identity

snapshot_id
    = observed source-state identity

event_id
    = normalized occurrence identity
```

These must never be collapsed into one generic identifier.

---

# 4. Core Entity Taxonomy

## 4.1 Institutional entities

```text
Institution
InstitutionUnit
GovernmentRole
Office
PersonRole
Jurisdiction
```

### Institution

Represents a legally or administratively identifiable government institution or external organization.

```yaml
institution_id: ET-INST-...
legal_name:
short_name:
institution_type:
branch:
jurisdiction_id:
parent_institution_id:
valid_from:
valid_to:
source_evidence_ids: []
```

Examples:

```text
DPWH
DBM
PhilGEPS / GPPB
BOC
PPA
CAAP
DILG
Quezon City Government
COA
Ombudsman
```

### InstitutionUnit

Represents a district engineering office, port collection district, airport office, city department, barangay office, etc.

```yaml
unit_id: ET-UNIT-...
institution_id:
unit_name:
unit_type:
parent_unit_id:
jurisdiction_id:
valid_from:
valid_to:
```

This is required because the accountability responsibility often belongs to a unit rather than the national parent institution.

---

# 5. Domain Objects

The core domain object model should support at minimum:

```text
PROJECT
PROGRAM
BUDGET
APPROPRIATION
ALLOTMENT
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
TRANSACTION
CUSTOMS_DECLARATION
ASSESSMENT
RELEASE
INSPECTION
CASE
REPORT
OUTCOME
AUDIT_FINDING
POLICY
LAW
ORDINANCE
```

The model is extensible. New domain types must not silently redefine existing types.

---

# 6. Project and Intervention Model

## 6.1 Project

```yaml
project_id: ET-PROJ-...
project_type:
title:
description:
implementing_unit_id:
responsible_institution_id:
jurisdiction_id:
location_ids: []
program_id:
status:
reported_status:
start_date:
expected_completion_date:
reported_completion_date:
amount_summary:
native_identifiers: []
source_object_ids: []
```

A project may have multiple source representations.

```text
FMR source
DBM representation
PhilGEPS procurement
agency procurement portal
COA record
LGU representation
citizen reports
physical evidence
```

### Important temporal rule

Two projects may legitimately concern the same physical location or road segment at different times.

```text
same_location
!=
same_project
```

---

# 7. Money and Financial Objects

## 7.1 Budget

```yaml
budget_id: ET-BUD-...
fiscal_year:
source_authority:
program_id:
project_id:
appropriation_amount:
allotment_amount:
reported_amount:
financial_status:
native_identifiers: []
```

## 7.2 Obligation

```yaml
obligation_id: ET-OBL-...
project_id:
contract_id:
amount:
fiscal_year:
source_record_id:
obligation_date:
status:
```

## 7.3 Disbursement

```yaml
disbursement_id: ET-DISB-...
obligation_id:
amount:
date:
payee_id:
source_record_id:
status:
```

## 7.4 Payment / settlement

```yaml
payment_id: ET-PAY-...
disbursement_id:
settlement_reference:
settlement_date:
amount:
payee_id:
source_record_id:
status:
```

The schema must preserve distinctions between obligation, disbursement instruction, accounting record, and actual settlement.

```text
OBLIGATION != DISBURSEMENT != PAYMENT SETTLEMENT
```

---

# 8. Procurement Model

## 8.1 Procurement

```yaml
procurement_id: ET-PROC-...
procuring_entity_id:
project_id: nullable
procurement_mode:
reference_number:
solicitation_number:
title:
abc:
posting_date:
closing_date:
status:
```

## 8.2 Award

```yaml
award_id: ET-AWARD-...
procurement_id:
award_notice_number:
awardee_id:
award_amount:
award_date:
status:
```

## 8.3 Contract

```yaml
contract_id: ET-CONTRACT-...
procurement_id:
project_id: nullable
contract_number:
contractor_id:
contract_amount:
signature_date:
contract_start_date:
contract_end_date:
status:
variation_count:
```

## 8.4 Notice to Proceed

```yaml
ntp_id: ET-NTP-...
contract_id:
issue_date:
effective_date:
source_record_id:
```

The schema must never assume:

```text
procurement.reference_number
=
project.id
```

A project-to-procurement relationship must be represented as an explicit identity bridge.

---

# 9. Contractor / Supplier / External Entity Model

```yaml
entity_id: ET-ENT-...
entity_type:
legal_name:
trade_names: []
registration_identifiers: []
jurisdiction_id:
status:
```

Possible external-entity types:

```text
CONTRACTOR
SUPPLIER
CONSULTANT
CONCESSIONAIRE
IMPORTER
EXPORTER
SERVICE_PROVIDER
BENEFICIARY
REGULATED_ENTITY
```

Identity joins such as:

```text
same legal entity
same trade name
same address
same owner
same director
same beneficial owner
```

must be modeled at different evidentiary strengths. Similarity alone is not identity proof.

---

# 10. Service / Permit / Daily-Operations Model

## 10.1 Service

```yaml
service_id: ET-SVC-...
institution_id:
service_name:
service_category:
charter_reference:
jurisdiction_id:
```

## 10.2 Application

```yaml
application_id: ET-APP-...
service_id:
applicant_entity_id: nullable
applicant_person_ref: restricted/null
government_unit_id:
application_reference:
submitted_at:
status:
```

## 10.3 Permit / license

```yaml
permit_id: ET-PERMIT-...
application_id:
permit_type:
permit_number:
issue_date:
expiry_date:
status:
```

## 10.4 Operational transaction

```yaml
transaction_id: ET-TXN-...
transaction_type:
service_id:
application_id:
actor_unit_id:
transaction_reference:
started_at:
completed_at:
status:
```

Sensitive personal information is not stored merely because it exists in the source transaction.

---

# 11. Customs / Port Transaction Model

The customs graph must represent separate source objects.

```text
SHIPMENT
  ↓
BILL_OF_LADING
  ↓
DISCHARGE_EVENT
  ↓
GOODS_DECLARATION
  ↓
ASSESSMENT
  ↓
PAYMENT
  ↓
RELEASE_INSTRUCTION
  ↓
PHYSICAL_RELEASE
```

## 11.1 Bill of Lading

```yaml
bl_id: ET-BL-...
native_bl_number:
port_id:
carrier_id:
consignee_id:
discharge_date:
source_record_id:
```

## 11.2 Customs declaration

```yaml
declaration_id: ET-CDECL-...
native_declaration_number:
bl_id:
importer_id:
filing_date:
status:
```

## 11.3 Assessment

```yaml
assessment_id: ET-ASSESS-...
declaration_id:
assessment_reference:
assessed_amount:
assessment_date:
status:
```

## 11.4 Release

```yaml
release_id: ET-REL-...
declaration_id:
payment_id: nullable
release_instruction_reference:
release_date:
status:
```

The system must not infer the existence of a declaration or payment merely because a B/L exists.

---

# 12. Airport / Transport Model

Core objects:

```text
AIRPORT
AIRPORT_PROJECT
RUNWAY
TERMINAL
CERTIFICATION
INSPECTION
OPERATIONAL_AUTHORIZATION
FLIGHT_EVENT
CARGO_EVENT
TRANSPORT_ROUTE
OPERATOR
CONCESSION
```

A project such as runway rehabilitation can connect:

```text
AIRPORT
  ↓
PROJECT
  ↓
PROCUREMENT
  ↓
CONTRACT
  ↓
NTP
  ↓
IMPLEMENTATION
  ↓
INSPECTION
  ↓
ACCEPTANCE
  ↓
OPERATIONAL_STATE
```

Operational events remain separate from procurement events.

---

# 13. Asset and Location Model

## 13.1 Asset

```yaml
asset_id: ET-ASSET-...
asset_type:
name:
owner_institution_id:
operator_institution_id:
location_id:
commissioned_date:
status:
condition_state:
```

## 13.2 Location

```yaml
location_id: ET-LOC-...
location_type:
name:
geometry:
administrative_codes: []
precision:
source_evidence_ids: []
```

Location should support point, line, polygon, route segment, administrative area, and generalized location.

Exact citizen-report locations may be restricted or generalized.

---

# 14. Event Model

Events are the temporal spine of the graph.

## 14.1 Event schema

```yaml
event_id: ET-EVENT-...
event_type:
actor_ref:
subject_object_id:
location_id: nullable
event_date:
event_end_date: nullable
observation_date:
source_record_id:
snapshot_id: nullable
provenance_ids: []
status:
confidence:
```

## 14.2 Initial event types

```text
BUDGET_APPROVED
ALLOTMENT_RELEASED
PROCUREMENT_POSTED
BID_OPENED
BID_CLOSED
AWARD_RECOMMENDED
AWARD_MADE
CONTRACT_SIGNED
NTP_ISSUED
OBLIGATION_RECORDED
DISBURSEMENT_RECORDED
PAYMENT_SETTLED
IMPLEMENTATION_STARTED
INSPECTION_COMPLETED
ACCEPTANCE_RECORDED
PROJECT_REPORTED_COMPLETE
ASSET_COMMISSIONED
SERVICE_REQUESTED
APPLICATION_SUBMITTED
APPLICATION_APPROVED
APPLICATION_DENIED
PERMIT_ISSUED
CUSTOMS_DECLARATION_FILED
CUSTOMS_ASSESSED
CUSTOMS_PAYMENT_RECORDED
CARGO_RELEASED
AUDIT_ISSUED
AUDIT_RESPONSE_RECEIVED
REPORT_SUBMITTED
REPORT_RECEIVED
REPORT_ROUTED
GOVERNMENT_RESPONSE_RECEIVED
CASE_OPENED
CASE_RESOLVED
```

Each event means **an occurrence recorded by a source**, not necessarily an independently verified physical reality.

---

# 15. Evidence Model

Evidence is a first-class object.

## 15.1 Evidence object

```yaml
evidence_id: ET-EVID-...
evidence_type:
source_id:
source_record_id:
snapshot_id:
title:
uri:
content_hash:
mime_type:
issued_date:
observed_date:
access_class:
provenance_level:
```

## 15.2 Evidence types

```text
SOURCE_RECORD
PUBLIC_DOCUMENT
PUBLIC_WEBPAGE
API_RESPONSE
FOI_RESPONSE
CITIZEN_ATTACHMENT
PHOTO
VIDEO
SCREENSHOT
AUDIT_REPORT
CONTRACT_DOCUMENT
PROCUREMENT_RECORD
FINANCIAL_REPORT
INSPECTION_REPORT
FIELD_OBSERVATION
SYSTEM_DERIVED_EVIDENCE
```

## 15.3 Evidence hierarchy

```text
PRIMARY AUTHORITATIVE RECORD
AGENCY-ORIGIN SECONDARY MATERIAL
SECONDARY CORROBORATION
CITIZEN REPORT / OBSERVATION
SYSTEM-DERIVED LINK
UNRESOLVED CLAIM
```

The public UI must preserve this distinction. The citizen product architecture explicitly requires source/evidence presentation and visible uncertainty. fileciteturn17file0L386-L442

---

# 16. Source Snapshot Model

```yaml
snapshot_id: ET-SNAP-...
source_id:
source_record_id:
retrieved_at:
source_update_date: nullable
content_hash:
mime_type:
parser_version:
connector_version:
raw_location:
observation_window_start:
observation_window_end:
```

Snapshots are immutable.

A later observation of the same source record is a new snapshot if the source representation changes.

---

# 17. Provenance Model

Every material assertion should be traceable through:

```text
ASSERTION
   ↓
DERIVED OBJECT
   ↓
INPUT OBJECTS
   ↓
EVIDENCE IDS
   ↓
SOURCE SNAPSHOTS
   ↓
SOURCE SYSTEM
```

## 17.1 Provenance record

```yaml
provenance_id: ET-PROV-...
assertion_object_id:
source_evidence_ids: []
transformation_type:
rule_id: nullable
rule_version: nullable
model_version: nullable
created_at:
created_by:
```

Transformation types:

```text
DIRECT_OBSERVATION
NORMALIZATION
IDENTITY_RECONCILIATION
TEMPORAL_RECONCILIATION
CONTROL_RULE
AGGREGATION
AI_ASSISTED_EXTRACTION
HUMAN_ADJUDICATION
```

---

# 18. Identity Bridge Model

Identity bridging is a first-class graph entity.

```yaml
bridge_id: ET-BRIDGE-...
object_a_id:
object_b_id:
basis_type:
basis_detail:
evidence_ids: []
confidence:
adjudication_state:
valid_from:
valid_to:
created_at:
created_by:
```

## 18.1 Basis types

```text
EXACT_NATIVE_IDENTIFIER
DOCUMENT_EXPLICIT_REFERENCE
EXPLICIT_SOURCE_CROSSREFERENCE
STRUCTURED_MULTI-FIELD_MATCH
TEMPORAL_AND_LOCATION_CORROBORATION
NAME_ONLY_MATCH
AMOUNT_ONLY_MATCH
MODEL_SUGGESTION
HUMAN_CONFIRMED
HUMAN_REJECTED
```

Weak bases must never automatically become strong identity proofs.

## 18.2 Adjudication states

```text
PROPOSED
SUPPORTED
CONFIRMED
REJECTED
SUPERSEDED
UNRESOLVED
```

---

# 19. Graph Node Classes

At logical graph level, the initial node taxonomy is:

```text
INSTITUTION
UNIT
PERSON_ROLE
EXTERNAL_ENTITY
JURISDICTION
PROJECT
PROGRAM
BUDGET
APPROPRIATION
ALLOTMENT
PROCUREMENT
AWARD
CONTRACT
NTP
OBLIGATION
DISBURSEMENT
PAYMENT
ASSET
LOCATION
SERVICE
APPLICATION
PERMIT
LICENSE
TRANSACTION
SHIPMENT
BILL_OF_LADING
CUSTOMS_DECLARATION
ASSESSMENT
RELEASE
INSPECTION
EVENT
EVIDENCE
SNAPSHOT
IDENTITY_BRIDGE
CONTROL_RULE
CONTROL_STATE
SIGNAL
REPORT
CASE
RESPONSE
RESOLUTION
OUTCOME
AUDIT_FINDING
POLICY
LAW
ORDINANCE
```

---

# 20. Graph Edge Classes

Edges represent **specific semantic relationships** rather than generic “connected-to” links.

## 20.1 Institutional relationships

```text
PARENT_OF
OPERATED_BY
OWNED_BY
RESPONSIBLE_FOR
HAS_ROLE
WITHIN_JURISDICTION
```

## 20.2 Lifecycle relationships

```text
PART_OF
FUNDED_BY
IMPLEMENTED_BY
PROCURED_THROUGH
AWARDED_TO
GOVERNED_BY_CONTRACT
SUBJECT_TO_NTP
OBLIGATED_BY
DISBURSED_THROUGH
PAID_TO
LOCATED_AT
USES_ASSET
PRODUCES_SERVICE
INTENDED_TO_PRODUCE
```

## 20.3 Operational relationships

```text
APPLIES_FOR
ASSESSED_BY
INSPECTED_BY
APPROVED_BY
DENIED_BY
PAID_BY
RELEASED_BY
REGULATED_BY
ENFORCED_BY
APPEALED_TO
```

## 20.4 Evidence relationships

```text
SUPPORTED_BY
OBSERVED_IN
SNAPSHOT_OF
DERIVED_FROM
CITED_BY
CORROBORATED_BY
CONTRADICTED_BY
```

## 20.5 Identity relationships

```text
IDENTITY_BRIDGE
REPRESENTS_SAME_OBJECT_AS
REPRESENTS_SAME_EVENT_AS
```

These should normally be represented through a typed `IDENTITY_BRIDGE` object rather than an unqualified direct edge.

## 20.6 Control relationships

```text
GOVERNED_BY_CONTROL_RULE
EXPECTED_BEFORE
EXPECTED_AFTER
TRIGGERS
EXPLAINS
RESOLVES
ESCALATES_TO
ROUTED_TO
```

---

# 21. Edge Evidence Requirement

Every material cross-system edge must answer:

```text
WHY ARE THESE OBJECTS CONNECTED?
WHAT EVIDENCE SUPPORTS THE CONNECTION?
WHO / WHAT CREATED THE CONNECTION?
WHEN WAS THE CONNECTION VALID?
WHAT IS THE CONFIDENCE?
HAS IT BEEN ADJUDICATED?
```

Recommended edge envelope:

```yaml
edge_id: ET-EDGE-...
edge_type:
from_object_id:
to_object_id:
basis_type:
evidence_ids: []
confidence:
valid_from:
valid_to:
adjudication_state:
created_at:
created_by:
```

---

# 22. Temporal Model

The graph uses four separate time concepts.

```text
EVENT_TIME
SOURCE_UPDATE_TIME
OBSERVATION_TIME
RESEARCH_TIME
```

### Definitions

```text
EVENT_TIME
= when the real-world / administrative event is recorded as occurring

SOURCE_UPDATE_TIME
= when the source says or appears to have changed its record

OBSERVATION_TIME
= when eGovTrace observed the source state

RESEARCH_TIME
= when an analyst or system performed the research/processing
```

These must never be conflated.

The approved architecture explicitly requires temporal preservation and separates search/research time from evidence date. fileciteturn15file0L10-L47

---

# 23. Validity Model

Objects and relationships can have both:

```text
VALID_TIME
TRANSACTION_TIME
```

Where supported:

```text
valid_from
valid_to
observed_from
observed_to
```

Example:

```text
Contract status
VALID: 2025-01-20 → 2025-03-01
OBSERVED: 2026-09-05
```

A source correction must not silently erase the historical state previously observed by eGovTrace.

---

# 24. Status Model

Every object may have source status and eGovTrace analytical status separately.

```text
SOURCE_STATUS
    ≠
EGOVTRACE_STATUS
```

### Public evidence statuses

```text
CONFIRMED
REPORTED
UNRESOLVED
NOT_ESTABLISHED
NOT_PUBLICLY_AVAILABLE
SUPERSEDED
RETRACTED
```

### Internal data quality states

```text
OBSERVED
NORMALIZED
VALIDATED
RECONCILED
UNRESOLVED
STALE
RETRACTED
SUPERSEDED
RESTRICTED
UNAVAILABLE
```

The public product architecture already specifies these distinctions for lifecycle displays. fileciteturn17file0L229-L264

---

# 25. Control Model

A control is represented as an expectation, not a conclusion.

```yaml
control_rule_id: ET-RULE-...
version:
domain:
name:
description:
expected_sequence:
required_inputs:
comparison_population:
threshold_definition:
exception_policy:
output_type:
review_requirement:
```

## 25.1 Control state

```yaml
control_state_id: ET-CSTATE-...
object_id:
rule_id:
rule_version:
expected_state:
observed_state:
variance_type:
signal_status:
evidence_ids: []
confidence:
adjudication_state:
```

---

# 26. Signal Model

Signals are derived objects.

```yaml
signal_id: ET-SIG-...
rule_id:
rule_version:
object_id:
signal_type:
trigger_basis: []
comparison_set_id: nullable
missing_evidence_ids: []
possible_explanations: []
confidence:
status:
human_adjudication:
routing_candidate:
created_at:
```

Initial signal types:

```text
TIMING_EXCEPTION
SEQUENCE_BREAK
IDENTITY_BRIDGE_GAP
DOWNSTREAM_EVIDENCE_GAP
STATUS_TRANSITION_EXCEPTION
CONCENTRATION_SIGNAL
RECURRENCE_SIGNAL
OUTCOME_EVIDENCE_GAP
SOURCE_INCONSISTENCY
DUPLICATE_SOURCE_RECORD
```

No signal type should contain a semantic value equivalent to “corrupt” or “guilty.”

---

# 27. Comparison Population Model

The analytics layer must explicitly preserve the set against which a signal was evaluated.

```yaml
comparison_set_id: ET-CSET-...
domain:
selection_method:
selection_window:
filters: []
record_ids: []
freeze_timestamp:
method_version:
```

This is necessary for reproducibility.

A signal without its comparison population cannot be independently reconstructed.

---

# 28. Citizen Report Model

Citizen reports are independent eGovTrace objects.

```yaml
report_id: ET-REPORT-...
reporter_ref: restricted/null
observed_at:
submitted_at:
location_id:
category:
description:
related_object_candidates: []
evidence_ids: []
privacy_state:
status:
```

Initial report categories:

```text
PROJECT
PROCUREMENT
PUBLIC_SERVICE
PERMIT_LICENSE
PAYMENT_COLLECTION
ASSET_CONDITION
CONSTRUCTION
CUSTOMS_TRADE
TRANSPORT
ENVIRONMENT
SAFETY
OFFICIAL_CONDUCT
OTHER
```

The citizen product requires reports to remain claims/observations until established. fileciteturn17file0L268-L344

---

# 29. Case Model

A case is not identical to a report or signal.

```text
REPORT
  ↓
TRIAGE
  ↓
SIGNAL / CONTROL ISSUE
  ↓
CASE
```

A case may aggregate:

```text
multiple citizen reports
multiple signals
multiple evidence objects
multiple source records
multiple agencies
multiple responses
```

## 29.1 Case schema

```yaml
case_id: ET-CASE-...
case_type:
origin_type:
origin_object_ids: []
lead_institution_id:
candidate_authority_ids: []
status:
priority:
opened_at:
closed_at:
resolution_id: nullable
```

---

# 30. Response and Resolution Model

## 30.1 Government response

```yaml
response_id: ET-RESP-...
case_id:
institution_id:
response_type:
received_at:
summary:
evidence_ids: []
public_visibility:
```

## 30.2 Resolution

```yaml
resolution_id: ET-RES-...
case_id:
resolution_type:
resolved_by_institution_id:
resolved_at:
result_summary:
supporting_evidence_ids: []
review_reference:
public_visibility:
```

Resolution types should include:

```text
EXPLAINED
CORRECTED
REMEDIED
REFERRED
OUTSIDE_SCOPE
DUPLICATE
UNRESOLVED
NO_ACTION_RECORDED
OFFICIAL_FINDING
```

`OFFICIAL_FINDING` must always reference the competent authority's own record; eGovTrace must not manufacture the finding.

---

# 31. Audit / Oversight Model

An audit finding is distinct from a control signal.

```text
CONTROL SIGNAL
    ↓
REVIEW
    ↓
OFFICIAL AUDIT / INVESTIGATION
    ↓
OFFICIAL FINDING
```

```yaml
audit_finding_id: ET-AUDIT-...
issuing_institution_id:
case_id: nullable
source_record_id:
finding_type:
issue_date:
status:
recommendation:
management_response:
resolution_state:
```

This prevents an internal eGovTrace signal from appearing as an official government finding.

---

# 32. Person and Privacy Model

The graph can contain person-related relationships but must minimize personal data.

The default public model should prefer:

```text
ROLE
POSITION
OFFICE
RESPONSIBILITY
PUBLIC OFFICIAL NAME WHERE LAWFULLY PUBLIC
```

over unnecessary personal attributes.

Citizen identities should be represented by a restricted reference when possible.

```text
reporter_ref
!=
public_person_profile
```

Never store credentials, private keys, or unnecessary sensitive personal data in the core graph.

---

# 33. Access-Class Model

Every object, evidence item, edge, and case can carry an access class.

```text
PUBLIC
PUBLIC_WITH_LIMITATION
AUTHENTICATED_CITIZEN
GOVERNMENT_INTERNAL
ASSURANCE_RESTRICTED
CONFIDENTIAL_EXTERNAL_CUSTODY
SECURITY_RESTRICTED
```

The same graph may serve public and assurance views, but access decisions occur at object/evidence/edge level rather than at database-wide level.

This follows the approved product/data-boundary architecture's public-vs-assurance separation. fileciteturn17file0L725-L742 fileciteturn17file1L1507-L1527

---

# 34. Relational Persistence Recommendation

The logical graph may be implemented on a relational core plus graph-oriented relationship tables.

A recommended first physical model is:

```text
PostgreSQL
├── core object tables
├── temporal tables
├── evidence/provenance tables
├── identity bridge tables
├── event tables
├── report/case tables
├── control tables
├── audit tables
└── geospatial columns / PostGIS where appropriate
```

A graph database may be added later for traversal-heavy workloads, but the logical schema must remain source-of-truth independent and reproducible.

### Why this is the preferred v1 posture

The system needs strong transaction integrity for reports, cases, evidence metadata, source snapshots, identity bridges, and audit logs. Graph traversal can initially be implemented through indexed relationship tables and recursive queries. A dedicated graph store should only be introduced when measured workload and traversal complexity justify it.

This is an engineering recommendation, not an assertion that the final deployment technology has already been selected.

---

# 35. Suggested Relational Table Set

Minimum v1 logical tables:

```text
institutions
institution_units
government_roles
external_entities
jurisdictions
projects
programs
budgets
appropriations
allotments
procurements
awards
contracts
ntps
obligations
disbursements
payments
assets
locations
services
applications
permits
licenses
transactions
shipments
bills_of_lading
customs_declarations
assessments
releases
inspections
events
evidence
source_records
source_snapshots
provenance
identity_bridges
edges
control_rules
control_states
comparison_sets
signals
reports
cases
responses
resolutions
audit_findings
object_versions
access_policies
audit_logs
```

Not every implementation has to expose all tables directly through its public API.

---

# 36. Universal Object Table Pattern

A useful physical pattern for cross-domain indexing is:

```sql
object_registry (
  object_id,
  object_type,
  source_system_id,
  source_record_id,
  status,
  access_class,
  valid_from,
  valid_to,
  observed_at,
  created_at,
  updated_at,
  version
)
```

Domain-specific tables hold type-specific attributes.

This allows:

```text
one graph identity
+
strong domain typing
+
shared provenance metadata
```

without forcing every domain into one giant flat table.

---

# 37. Edge Table Pattern

```sql
edges (
  edge_id,
  edge_type,
  from_object_id,
  to_object_id,
  basis_type,
  confidence,
  adjudication_state,
  valid_from,
  valid_to,
  created_at
)
```

Evidence linkage belongs in a child table:

```sql
edge_evidence (
  edge_id,
  evidence_id,
  role
)
```

This makes evidence requirements explicit and supports multiple independent supporting records.

---

# 38. Native Identifier Registry

Every source identifier should be independently searchable.

```yaml
identifier_id: ET-ID-...
object_id:
source_id:
identifier_type:
identifier_value:
normalized_value:
valid_from:
valid_to:
```

Examples:

```text
FMR_CODE
UACS_PAP
PHILGEPS_REFERENCE
SOLICITATION_NUMBER
AWARD_NOTICE_NUMBER
CONTRACT_NUMBER
ORS_REFERENCE
DV_REFERENCE
LDDAP_ADA_REFERENCE
JEV_REFERENCE
BILL_OF_LADING
CUSTOMS_DECLARATION_NUMBER
PERMIT_NUMBER
APPLICATION_NUMBER
PAYMENT_REFERENCE
PROJECT_NUMBER
```

The identifier registry must permit multiple identifiers for one object and one identifier type across source systems without assuming global uniqueness.

---

# 39. Search / Discovery Index

Search should index:

```text
titles
names
normalized entity names
native identifiers
locations
institution names
project descriptions
service names
permit numbers
contract numbers
source URLs
report categories
```

Search results must expose object type and evidence status.

Example:

```text
PROJECT
Cabarasan–Dao Farm-to-Market Road

Status: Reported complete
Budget: Confirmed
Procurement: Not established

[View evidence]
[Report something]
```

This follows the approved citizen IA rather than exposing raw graph structures by default. fileciteturn17file0L145-L227

---

# 40. Graph Traversal Rules

Public users:

```text
short bounded traversals
no unrestricted sensitive traversal
no access to restricted objects
no exposure of hidden personal relationships
```

Assurance users:

```text
deeper traversal
controlled cross-agency joins
restricted evidence metadata
signal/case context
```

Example public traversal:

```text
project
 → procurement
 → contract
 → contractor
 → public evidence
```

Example assurance traversal:

```text
project
 → procurement
 → contract
 → obligation
 → payment
 → audit
 → case
 → resolution
```

---

# 41. Integrity Constraints

The database must enforce, where possible:

```text
1. Object IDs are immutable.
2. Source snapshot IDs are immutable.
3. Evidence hashes are immutable.
4. Event IDs are immutable.
5. Deleted public evidence is represented through state/retraction, not silent deletion, where legally required.
6. Identity bridges require explicit basis metadata.
7. Restricted evidence cannot be exposed by a public API query.
8. Signals reference rule versions.
9. Reports cannot silently become official findings.
10. Official findings must reference an authoritative issuing source.
11. Historical observations cannot be overwritten without version preservation.
12. Source facts cannot be edited by an analytics process.
```

---

# 42. Data Lineage Invariants

For every derived record, the system must be able to answer:

```text
WHAT CREATED THIS?
WHAT INPUTS DID IT USE?
WHICH SOURCE RECORDS WERE USED?
WHICH RULE VERSION WAS USED?
WHEN WAS IT GENERATED?
WHO / WHAT GENERATED IT?
WAS IT HUMAN-ADJUDICATED?
```

This is mandatory for:

```text
identity bridges
control states
signals
aggregations
AI-assisted extraction
comparison statistics
case-routing recommendations
```

The approved data-boundary architecture explicitly requires rule/version/input provenance on derived objects. fileciteturn17file1L1662-L1677

---

# 43. AI-Derived Data Model

AI may create a proposal object, never a silent authoritative update.

```yaml
ai_proposal_id: ET-AIP-...
task_type:
model_name:
model_version:
input_object_ids: []
input_evidence_ids: []
output_summary:
confidence:
human_review_state:
accepted_by:
accepted_at:
```

### Rule

```text
AI PROPOSAL
   ↓
HUMAN / RULE VALIDATION
   ↓
DERIVED OBJECT
```

not:

```text
AI OUTPUT
   ↓
FACT
```

---

# 44. Case-Routing Data Model

Routing is decision support.

```yaml
routing_recommendation_id: ET-ROUTE-...
case_id:
likely_custodian_id:
candidate_authority_ids: []
basis:
required_evidence:
routing_confidence:
legal_scope_note:
review_state:
```

The system must preserve uncertainty where multiple institutions may share roles.

---

# 45. Report-to-Object Matching

A citizen report may have zero, one, or many candidate objects.

```text
REPORT
  ↓
CANDIDATE MATCHES
  ↓
MATCH SCORE
  ↓
EVIDENCE REVIEW
  ↓
CONFIRMED LINK / UNRESOLVED
```

The match record should include:

```yaml
report_match_id:
report_id:
candidate_object_id:
match_basis:
input_evidence_ids: []
confidence:
adjudication_state:
```

A matching model must not silently turn location/name similarity into proof.

---

# 46. Citizen Evidence Integrity

Uploaded evidence receives:

```text
evidence_id
content_hash
submission_timestamp
observed_at (if provided)
location source (if available and consented)
metadata provenance
privacy classification
```

Where technically feasible, preserve the original upload and a normalized derivative separately.

```text
ORIGINAL
  ↓
NORMALIZED VIEW
```

Do not modify the original evidence hash after submission.

---

# 47. Public Evidence Presentation Contract

The API should provide enough metadata for the client to render:

```text
SOURCE
RECORD
DATE
WHY LINKED
EVIDENCE STRENGTH
STATUS
OPEN SOURCE
```

Example:

```json
{
  "evidence_id": "ET-EVID-01J...",
  "source": "DBM",
  "record": "UACS/PAP ...",
  "date": "2026-08-14",
  "link_basis": "documented identifier",
  "strength": "CONFIRMED",
  "status": "PUBLIC"
}
```

The UI must distinguish confirmed facts from derived relationships and unresolved states. fileciteturn17file0L386-L442

---

# 48. Core API Object Shapes

## 48.1 Public object

```json
{
  "id": "ET-PROJ-01J...",
  "type": "PROJECT",
  "title": "Example Project",
  "status": "REPORTED",
  "responsible_institution": {
    "id": "ET-INST-...",
    "name": "Example Agency"
  },
  "timeline": [],
  "evidence_summary": {
    "confirmed": 5,
    "reported": 1,
    "unresolved": 2,
    "not_established": 3
  }
}
```

## 48.2 Assurance object

```json
{
  "id": "ET-PROJ-01J...",
  "type": "PROJECT",
  "signals": [],
  "identity_bridges": [],
  "evidence_gaps": [],
  "restricted_evidence_refs": [],
  "routing_candidates": []
}
```

The same core object can support both views without exposing identical fields to both users.

---

# 49. Audit Logging

Every high-impact mutation must be logged.

```yaml
log_id:
actor_id:
action:
object_id:
before_version:
after_version:
timestamp:
reason:
request_id:
source_ip_or_service:
```

High-impact actions include:

```text
identity bridge confirmation
identity bridge rejection
source connector activation
rule publication
rule retirement
access policy change
report suppression
case closure
resolution publication
restricted evidence access
manual source correction
```

---

# 50. Deletion / Retention Model

Deletion must be policy-driven.

Default principles:

```text
Never silently erase historical research state.
Never retain unnecessary personal data indefinitely.
Respect legal retention / deletion requirements.
Preserve hashes / metadata when lawful and useful for integrity.
Use tombstone / retraction states where direct deletion would destroy required audit history.
```

Retention schedules must be defined per object class.

---

# 51. Versioning Model

The system has at least five independent version dimensions:

```text
SOURCE_VERSION
SNAPSHOT_VERSION
SCHEMA_VERSION
RULE_VERSION
PARSER / CONNECTOR VERSION
```

A sixth dimension exists when AI is involved:

```text
MODEL_VERSION
```

No downstream derived state may pretend that all of these versions are interchangeable.

---

# 52. Migration / Evolution Rules

New schema versions must be:

```text
BACKWARD-READ COMPATIBLE where practical
VERSIONED
MIGRATION-LOGGED
REPRODUCIBLE
```

A change that alters semantic meaning must create a new versioned field or object type rather than silently changing the meaning of an existing field.

---

# 53. Initial Graph Query Examples

## 53.1 Project with unresolved lifecycle links

```text
MATCH project
WHERE status = ACTIVE
RETURN project,
       missing(BUDGET → PROCUREMENT),
       missing(PROCUREMENT → CONTRACT),
       missing(CONTRACT → OBLIGATION),
       missing(OBLIGATION → PAYMENT)
```

## 53.2 Contractor recurrence

```text
MATCH contractor → projects
GROUP BY contractor
COMPARE across time, agency, category, geography
RETURN contextual recurrence signal
```

## 53.3 Customs control state

```text
MATCH B/L
→ discharge event
→ declaration
→ assessment
→ payment
→ release
COMPARE observed sequence against domain control rule
```

## 53.4 LGU service trace

```text
MATCH application
→ assessment
→ inspection
→ decision
→ payment
→ permit release
```

These are analytical patterns, not declarations that every source system already exposes every required relationship.

---

# 54. Data Quality and Reconciliation Pipeline

```text
RAW SOURCE OBSERVATION
        ↓
SCHEMA VALIDATION
        ↓
NORMALIZATION
        ↓
SOURCE OBJECT CREATION
        ↓
IDENTIFIER EXTRACTION
        ↓
EVENT EXTRACTION
        ↓
CANDIDATE IDENTITY MATCHING
        ↓
IDENTITY ADJUDICATION
        ↓
GRAPH EDGE CREATION
        ↓
CONTROL EVALUATION
        ↓
SIGNAL CREATION
        ↓
PUBLIC / ASSURANCE PROJECTION
```

Every stage must be observable and replayable.

---

# 55. Public Projection vs Core Graph

The public API should not expose the raw internal graph directly.

Instead:

```text
CORE GRAPH
   ↓
PUBLIC PROJECTION
```

The projection filters:

```text
restricted data
private identifiers
internal notes
investigative material
security-sensitive relationships
unadjudicated internal hypotheses
```

This prevents the public client from becoming a backdoor into the internal assurance graph.

---

# 56. Search Index vs Truth Store

Search indexes are caches/projections.

```text
TRUTH / AUTHORITATIVE REFERENCES
        ↓
CORE OBJECTS
        ↓
SEARCH INDEX
```

Search-engine documents must never be treated as authoritative facts simply because they are indexed.

---

# 57. Geospatial Model

Where location is material, the graph should permit:

```text
POINT
LINESTRING
POLYGON
ROUTE_SEGMENT
ADMIN_AREA
GENERALIZED_AREA
```

Spatial relationships may include:

```text
LOCATED_IN
CROSSES
ADJACENT_TO
WITHIN_JURISDICTION
NEAR
SERVES_AREA
```

Spatial matching should be treated as candidate evidence, not identity proof by itself.

---

# 58. Outcome Model

An outcome is not simply a project status.

```yaml
outcome_id: ET-OUTCOME-...
project_id:
outcome_type:
expected_value:
observed_value:
measurement_unit:
measurement_period:
measurement_source_id:
uncertainty:
status:
```

Examples:

```text
travel-time reduction
flood exposure reduction
cargo throughput
service turnaround time
permit processing time
road condition
airport capacity
households served
```

The outcome graph must preserve measurement source and uncertainty.

---

# 59. Control-Break to Case Pipeline

```text
SIGNAL
  ↓
EVIDENCE SUFFICIENCY CHECK
  ↓
CONTEXT / EXCEPTION CHECK
  ↓
HUMAN REVIEW
  ↓
NO ISSUE / EXPLAINED
        OR
  CONTROL ISSUE
        ↓
CASE
        ↓
ROUTING
        ↓
OFFICIAL REVIEW
```

No shortcut is permitted:

```text
SIGNAL → CORRUPTION
```

---

# 60. False-Positive Protection in the Schema

Every signal should be able to store:

```yaml
possible_explanations: []
legitimate_exception_candidate: true/false
insufficient_evidence: true/false
identity_join_error_candidate: true/false
source_timing_artifact_candidate: true/false
rule_failure_candidate: true/false
```

This creates a permanent place for the system to learn that a signal rule was too aggressive.

---

# 61. Research Reproducibility Model

Each research run should have:

```yaml
run_id:
start_time:
end_time:
active_research_time:
source_snapshot_ids: []
ruleset_version:
schema_version:
comparison_set_ids: []
output_ids: []
```

This supports the earlier research requirement that active research time and evidence dates remain distinct. fileciteturn15file0L20-L47

---

# 62. Minimum Indexing Strategy

The first implementation should index:

```text
object_id
object_type
source_record_id
native_identifier normalized_value
institution_id
unit_id
project_id
contract_id
location_id
event_date
observed_at
status
access_class
```

Composite indexes should prioritize common public queries:

```text
institution + object_type + status
location + object_type
event_type + event_date
identifier_type + normalized_value
project_id + event_type
contractor_id + event_date
report_status + submitted_at
signal_status + rule_id
```

---

# 63. Scale Strategy

The model must remain usable at national scale without requiring every source record to become an eager graph node.

Use:

```text
reference over duplicate
snapshot over repeated raw copy
normalized event over repeated document parsing
derived object over duplicated analytics
external query over stale mirror when reliable and lawful
```

Preserve immutable snapshots when required for historical reproducibility, legal evidence, or auditability. This is consistent with the approved data-boundary architecture's scale principle. fileciteturn17file1L1644-L1658

---

# 64. Source-Custody Link

Every source-derived object must link back to:

```text
source_id
source_record_id
source_snapshot_id (when applicable)
source_url/access path
custodian
access class
legal/access basis
```

The core graph should never have an orphan material fact with no provenance path.

---

# 65. API Boundary Mapping

The connector specification's API layers map to the core model as follows:

```text
SOURCE CONNECTOR API
    → source records / snapshots / ingestion events

PUBLIC READ API
    → public projections of objects, events, evidence, reports, cases

PUBLIC REPORT API
    → reports + citizen evidence + tracking state

INTERNAL GRAPH API
    → objects + edges + bridges + timelines + provenance

ASSURANCE API
    → signals + control states + cases + restricted metadata

ADMIN / GOVERNANCE API
    → schemas + rules + sources + access policies + audit logs
```

The source-connector architecture already defines these API classes and explicitly separates public from assurance access. fileciteturn17file1L1372-L1389

---

# 66. Core Security Boundaries

The data model must support:

```text
row/object-level authorization
field-level redaction where needed
separate public and assurance projections
encrypted sensitive evidence
immutable audit logs
least privilege
service-to-service authentication
secret isolation
```

No internal role should receive unrestricted graph access merely because it is inside government.

---

# 67. Mobile/API Implications

The mobile client should receive **small public projections**, not graph dumps.

Example:

```http
GET /api/v1/public/projects/{id}
```

should return enough to render:

```text
WHAT IT IS
STATUS
RESPONSIBLE INSTITUTION
MONEY / RESOURCE
TIMELINE
KNOWN
NOT ESTABLISHED
RELATED RECORDS
EVIDENCE
REPORT ACTION
```

This matches the approved mobile product architecture and prevents the UI from becoming dependent on raw database structures. fileciteturn17file0L212-L227

---

# 68. Example End-to-End Project Graph

```text
ET-PROJ-001
  |
  +--[IMPLEMENTED_BY]--> DPWH UNIT
  |
  +--[LOCATED_AT]------> ET-LOC-001
  |
  +--[FUNDED_BY]-------> ET-BUD-001
  |
  +--[PROCURED_THROUGH]-> ET-PROC-001
  |                          |
  |                          +--[AWARDED_TO]--> ET-ENT-001
  |                          |
  |                          +--[AWARD]-------> ET-AWARD-001
  |
  +--[GOVERNED_BY_CONTRACT]--> ET-CONTRACT-001
  |                               |
  |                               +--[SUBJECT_TO_NTP]--> ET-NTP-001
  |
  +--[OBLIGATED_BY]-------> ET-OBL-001
  |                            |
  |                            +--[DISBURSED_THROUGH]--> ET-DISB-001
  |                                                         |
  |                                                         +--[PAID_TO]--> ET-PAY-001
  |
  +--[OBSERVED_IN]--------> ET-EVID-001
  |
  +--[CONTROL_SIGNAL]-----> ET-SIG-001
  |
  +--[REPORTED_BY]--------> ET-REPORT-001
                                |
                                +--[ROUTED_TO]--> ET-CASE-001
                                                   |
                                                   +--[RESPONDED_BY]--> Agency
                                                   |
                                                   +--[RESOLVED_BY]--> ET-RES-001
```

The graph remains temporally and evidentially qualified at every stage.

---

# 69. Example Customs Graph

```text
ET-BL-001
   |
   +--[DISCHARGED_AT]--> Port of Manila
   |
   +--[CONSIGNEE]------> Importer
   |
   +--[FOLLOWED_BY]----> ET-CDECL-001
                            |
                            +--[ASSESSED_AS]--> ET-ASSESS-001
                            |
                            +--[PAID_BY]------> ET-PAY-002
                            |
                            +--[RELEASED_AS]--> ET-REL-001
```

Where a downstream link is not recoverable:

```text
B/L → declaration = UNRESOLVED
```

not:

```text
B/L → declaration = DOES_NOT_EXIST
```

---

# 70. Example LGU Service Graph

```text
ET-APP-001
   |
   +--[FOR_SERVICE]------> Business Permit
   |
   +--[ASSESSED_BY]------> City Office
   |
   +--[INSPECTED_BY]-----> Inspector / Unit
   |
   +--[APPROVED_BY]------> Authorized Official
   |
   +--[PAID_BY]----------> ET-PAY-003
   |
   +--[RESULTED_IN]------> ET-PERMIT-001
   |
   +--[REPORTED_BY]------> Citizen Report
```

The model can therefore compare the expected operational control sequence with actual recorded events.

---

# 71. Graph Naming and ID Rules

Use opaque, globally unique eGovTrace IDs.

Recommended format:

```text
ET-<TYPE>-<ULID>
```

Examples:

```text
ET-PROJ-01J...
ET-CONTRACT-01J...
ET-EVID-01J...
ET-EVENT-01J...
ET-BRIDGE-01J...
ET-SIG-01J...
ET-REPORT-01J...
ET-CASE-01J...
```

Do not encode mutable business meaning into the ID.

Bad:

```text
DPWH-CABARASAN-2021
```

Good:

```text
ET-PROJ-01J...
```

Native identifiers remain attached as searchable attributes.

---

# 72. Canonical Normalization Rules

Normalization should standardize representation without changing source meaning.

Examples:

```text
currency → Decimal + ISO currency code
UTC timestamps → ISO 8601 UTC storage
names → raw + normalized search form
identifiers → raw + normalized form
locations → canonical geometry + source representation
status → source_status + canonical_status
```

The original source value must always remain recoverable.

---

# 73. Contradiction Model

Conflicting sources must be represented explicitly.

```yaml
contradiction_id: ET-CONTRA-...
object_id:
claim_a_evidence_id:
claim_b_evidence_id:
conflict_type:
status:
resolution:
adjudicated_by:
adjudicated_at:
```

Possible conflict types:

```text
AMOUNT_CONFLICT
DATE_CONFLICT
STATUS_CONFLICT
IDENTITY_CONFLICT
LOCATION_CONFLICT
COMPLETION_CONFLICT
OWNERSHIP_CONFLICT
```

A contradiction is not automatically evidence of wrongdoing.

---

# 74. Missing-Evidence Model

Missing evidence should be represented directly.

```yaml
evidence_gap_id: ET-GAP-...
object_id:
expected_evidence_type:
expected_source_id: nullable
expected_event_type: nullable
reason_state:
status:
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

This allows the UI to say:

> Payment settlement has not been established from currently recoverable evidence.

rather than:

> Contractor was not paid.

---

# 75. Exception Model

Legitimate exceptions must be data, not hidden analyst notes.

```yaml
exception_id: ET-EXC-...
object_id:
rule_id:
exception_type:
exception_basis:
evidence_ids: []
status:
valid_from:
valid_to:
```

This supports rules that say:

```text
EXPECTED CONTROL
      |
      +--> VALID EXCEPTION
      |
      +--> OBSERVED VARIANCE
```

rather than treating every deviation as a violation.

---

# 76. Performance Boundaries

The core schema should optimize three primary workload classes:

```text
1. PUBLIC LOOKUP
2. GRAPH / ASSURANCE TRAVERSAL
3. INGESTION / RECONCILIATION
```

Public lookup should be served from indexed projections.

Deep graph traversal should be bounded and authorization-aware.

Ingestion should be append-oriented for observations and snapshots.

Analytics should operate asynchronously where computations are expensive.

---

# 77. Async Processing Model

Long-running tasks should use jobs.

```text
INGESTION JOB
NORMALIZATION JOB
EXTRACTION JOB
IDENTITY MATCH JOB
CONTROL EVALUATION JOB
SEARCH INDEX JOB
MEDIA PROCESSING JOB
REPORT TRIAGE JOB
```

Each job should have:

```yaml
job_id:
job_type:
input_ids: []
status:
started_at:
completed_at:
worker_version:
error_code:
retry_count:
```

---

# 78. Event-Driven Extensions

The architecture should support future event streaming without making it mandatory for v1.

Possible events:

```text
source.snapshot.created
object.created
object.updated
bridge.proposed
bridge.adjudicated
event.created
signal.created
report.submitted
case.opened
response.received
resolution.recorded
```

These are internal platform events, not claims about government events.

---

# 79. Testing Requirements

The schema cannot be considered implementation-ready until it passes:

### Identity tests

```text
same source ID → same source object
changed source representation → new snapshot
ambiguous match → unresolved/proposed bridge
rejected bridge → not used as confirmed relation
```

### Temporal tests

```text
historical state survives source update
observation date ≠ event date
validity windows behave correctly
```

### Evidence tests

```text
public evidence visible publicly
restricted evidence blocked publicly
source provenance recoverable
hash mismatch detected
```

### Control tests

```text
signal references exact rule version
legitimate exception suppresses false alarm
missing evidence ≠ negative fact
signal never changes source status
```

### Report tests

```text
citizen can report without full account
attachment receives evidence ID
retry does not duplicate report
private reporter identity remains protected
```

---

# 80. Acceptance Criteria

The core schema passes v1 readiness only if:

```text
[ ] Every material source-derived fact has provenance.
[ ] Every cross-system join has explicit basis metadata.
[ ] Native identifiers remain distinct.
[ ] Historical source states can be preserved.
[ ] Public and restricted access are enforceable at object/evidence level.
[ ] Signals store rule version and inputs.
[ ] Comparison populations are reproducible.
[ ] Citizen reports remain claims until established.
[ ] Official findings remain attributable to competent authorities.
[ ] Contradictions can be represented without forced reconciliation.
[ ] Evidence gaps can be represented without inventing absence.
[ ] The same logical model supports projects and daily operations.
[ ] Customs, airport, LGU, procurement, finance, audit, and citizen-report patterns fit without separate incompatible ontologies.
[ ] Public projections do not expose the raw assurance graph.
```

---

# 81. Seed Data Sets for First Implementation

The first implementation should use the already-researched populations as test fixtures, not as production truth.

```text
FMR project population
BOC Port/customs population
CAAP airport procurement population
Quezon City LGU procurement / operational population
```

Existing research demonstrates that the FMR population is a source population rather than the entire Philippine project universe, and that project identity becomes harder to maintain as the trace crosses procurement, contract, finance, physical verification, and outcomes. fileciteturn15file1L212-L271

These fixtures should be encoded with their actual source references, unresolved states, evidence gaps, and rejected joins.

---

# 82. First Graph Fixtures

### Fixture A — FMR

```text
FMR PROJECT
→ FMR CODE
→ DBM UACS/PAP
→ [PROCUREMENT UNRESOLVED]
→ [CONTRACT UNRESOLVED]
→ [OBLIGATION UNRESOLVED]
→ [PAYMENT UNRESOLVED]
```

### Fixture B — Airport

```text
CAAP PROJECT
→ PROCUREMENT REFERENCE
→ BAC RESOLUTION
→ NOA
→ CONTRACT
→ [NTP NOT ESTABLISHED]
→ [FINANCIAL EXECUTION NOT ESTABLISHED]
→ [PHYSICAL COMPLETION NOT ESTABLISHED]
```

### Fixture C — Customs

```text
B/L
→ DISCHARGE
→ [DECLARATION UNRESOLVED]
→ [ASSESSMENT UNRESOLVED]
→ [PAYMENT UNRESOLVED]
→ [RELEASE UNRESOLVED]
```

### Fixture D — LGU service

```text
APPLICATION / SERVICE
→ OPERATIONAL REQUIREMENT
→ PROCUREMENT / SYSTEM SUPPORT
→ [INDIVIDUAL CITIZEN TRANSACTION EVIDENCE RESTRICTED / NOT PUBLIC]
```

These fixtures demonstrate that the schema preserves uncertainty instead of filling gaps with assumptions.

---

# 83. Separation From Research Gates

This schema does not create a new G-gate.

```text
G0 Frozen
G1 Complete
G2 Complete / Frozen
G3 Complete
G4 Controlled reconciliation / deepening
G5 Future
G6 Future
```

Schema decisions may be versioned independently.

A research discovery that changes ontology meaning must be recorded as an explicit versioned schema decision; it must not silently rewrite frozen research artifacts.

---

# 84. Relationship to the Citizen Product

The citizen product consumes a simplified projection of this model.

```text
CORE GRAPH
   ↓
PUBLIC PROJECTION
   ↓
MOBILE WEB/PWA
```

The public interface should primarily reveal:

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

This is the approved product model. fileciteturn17file0L35-L72

---

# 85. Relationship to eGovPH

The graph remains owned and operated by the independent eGovTrace service.

eGovPH may provide:

```text
launch
trusted authentication handoff
notifications
citizen entry points
service context
```

It does not become the eGovTrace database.

This is consistent with the approved product architecture, which freezes eGovTrace as an independent accountability service and eGovPH as a gateway/integration surface. fileciteturn17file0L767-L780

---

# 86. Recommended Initial Physical Stack

This is a recommendation for build planning only:

```text
Web/PWA
   ↓
API Gateway
   ↓
Application Services
   ├── Object Service
   ├── Evidence Service
   ├── Identity Service
   ├── Event Service
   ├── Control Service
   ├── Report Service
   ├── Case Service
   └── Search Service
   ↓
PostgreSQL + PostGIS
   ↓
Object Storage
   ↓
Search Index
   ↓
Async Job Queue
   ↓
Connector Layer
```

A graph database remains an optional scale/traversal optimization after measured performance evidence.

---

# 87. Implementation Order

```text
1. Object registry + IDs
2. Source record + snapshot + provenance
3. Native identifier registry
4. Evidence model
5. Identity bridge model
6. Event model
7. Project/procurement/contract financial objects
8. Service/permit/transaction objects
9. Report/case/response/resolution objects
10. Control rules + signal model
11. Public projections
12. Assurance projections
13. Search index
14. Geospatial support
15. Scale optimization
```

Do not start by building an unrestricted graph explorer.

---

# 88. Architectural Freeze for v1

The following are frozen for engineering planning:

```text
1. eGovTrace has one canonical logical identity model.
2. Native source identifiers remain distinct.
3. Identity bridges are first-class objects.
4. Evidence and provenance are first-class objects.
5. Events form the temporal spine.
6. Source facts and derived analytics are separate.
7. Control signals are not wrongdoing findings.
8. Reports are observations/claims until established.
9. Cases and official findings are distinct states.
10. Public and assurance projections share the core graph but have different access rules.
11. Historical source observations are preservable.
12. Contradictions and evidence gaps are representable states.
13. The model must support both project lifecycles and daily government operations.
14. The schema must support national and subnational institutions without assuming identical capabilities.
15. The core database is not a replacement for government source systems.
```

---

# 89. Research / Engineering Status

```text
LOGICAL DATA MODEL: APPROVED WORKING BASELINE
GRAPH SCHEMA: APPROVED WORKING BASELINE
TEMPORAL / PROVENANCE MODEL: APPROVED WORKING BASELINE
IMPLEMENTATION TECHNOLOGY: RECOMMENDED, NOT YET FROZEN
PRODUCTION DEPLOYMENT: NOT YET AUTHORIZED BY THIS DOCUMENT ALONE
```

### Next engineering artifact

> **`eGovTrace_Core_Service_and_Domain_Module_Architecture_v1.md`**

That document should turn the schema into actual software boundaries:

```text
Object Service
Identity Service
Evidence Service
Source Service
Event Service
Control Engine
Report Service
Case/Workflow Service
Search Service
Notification Service
Access/Authorization Service
Audit Service
```

It should also define service-to-service contracts, transaction boundaries, asynchronous jobs, caching, failure recovery, observability, and the minimum v1 implementation surface.

---

# 90. Final Position

The eGovTrace core is not fundamentally a database of government documents.

It is a structured representation of:

```text
WHO
WHAT
WHERE
WHEN
UNDER WHAT AUTHORITY
WITH WHAT MONEY / RESOURCE
WHAT HAPPENED
WHAT RECORD PROVES IT
HOW RECORDS FROM DIFFERENT SYSTEMS RELATE
WHAT CONTROL WAS EXPECTED
WHAT WAS OBSERVED
WHAT REMAINS UNRESOLVED
WHO HAS AUTHORITY TO REVIEW
WHAT HAPPENED AFTER REVIEW
```

That is the core required to move the platform from:

```text
TRANSPARENCY
```

to:

```text
TRACEABILITY
```

to:

```text
ASSURANCE
```

to:

```text
ACCOUNTABILITY
```

without turning the system into a centralized replacement database or an automated accusation engine.
