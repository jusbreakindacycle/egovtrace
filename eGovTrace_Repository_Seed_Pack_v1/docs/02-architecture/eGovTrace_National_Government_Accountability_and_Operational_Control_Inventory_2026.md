# eGovTrace National Government Accountability and Operational Control Inventory 2026

**Status:** APPROVED RESEARCH ARTIFACT / INVENTORY DESIGN + INITIAL NATIONAL ACTOR MAP  
**Relationship to G0–G6:** Additive to the approved eGovTrace architecture; not a new formal gate and must not silently modify frozen G0/G1/G2/G3/G4 logic.  
**Primary purpose:** Establish a national inventory of institutions, powers, operational processes, public-resource flows, control points, records, identifiers, evidence custodians, and accountability pathways that eGovTrace may eventually connect into one evidence-backed accountability environment.

---

## 1. Executive Decision

The eGovTrace research will not be limited to capital projects, procurement, or public works.

The national accountability surface includes both:

1. **Public-resource / intervention lifecycle** — planning, programs, budgets, procurement, contracts, obligations, disbursements, payments, implementation, assets, services, outcomes, and audit feedback.
2. **Government operational lifecycle** — applications, registrations, licensing, permitting, assessment, inspection, adjudication, collection, release, enforcement, benefits, hiring, appointments, regulatory decisions, customs processing, public-service delivery, case handling, complaints, and other recurring exercises of state authority.

The inventory therefore asks, for each institution and operational domain:

> **What power does this institution exercise? What process does it perform? What money, property, information, permit, license, benefit, enforcement action, or public decision does it control? What record proves that action? Who can alter it? Who is supposed to review it? What other institution holds a corresponding record that can be used as an independent cross-check?**

This is the foundation for an eGovTrace platform that can detect **control breaks, anomalies, unresolved relationships, and evidence gaps** without automatically labeling a person, company, office, or agency as corrupt.

---

## 2. Governing eGovTrace Principles

The inventory inherits the approved architecture's frozen principles:

```text
SOURCE SYSTEMS REMAIN AUTHORITATIVE FOR THEIR OWN RECORDS.
eGovTrace PROVIDES CROSS-SYSTEM RECONCILIATION, NOT SYSTEM REPLACEMENT.
CONNECTION IS NOT CORRUPTION.
IDENTIFIER RECOVERY ≠ IDENTIFIER PROOF.
NOT OBSERVED ≠ ABSENT.
UNAVAILABLE ≠ FALSE.
PAYMENT-INSTRUCTION EVIDENCE ≠ PAYMENT-SETTLEMENT EVIDENCE.
SEARCH TIME ≠ EVIDENCE DATE.
ACTIVE RESEARCH TIME ≠ CALENDAR ELAPSED TIME.
PUBLIC DISCLOSURE ≠ INVESTIGATIVE AUTHORITY.
AI OUTPUT ≠ FACT OR LEGAL DETERMINATION.
EVERY MATERIAL CLAIM MUST HAVE PROVENANCE.
EVERY JOIN MUST HAVE AN EXPLICIT EVIDENTIARY BASIS.
EVERY HISTORICAL STATE MUST REMAIN TEMPORALLY PRESERVABLE.
CITIZEN REPORTS ARE CLAIMS/REPORTS UNTIL EVIDENCE ESTABLISHES OTHERWISE.
CONTROL BREAKS ARE INVESTIGATION SIGNALS, NOT AUTOMATIC FINDINGS OF WRONGDOING.
NATIONAL INTEROPERABILITY MUST RESPECT LOCAL AUTONOMY AND LEGAL AUTHORITY.
```

These principles are not optional UX rules. They determine what the database may assert, what the graph may infer, and what the public interface is allowed to display as fact. fileciteturn2file4L441-L476

---

## 3. Why This Inventory Is Necessary

The approved architecture identifies the core problem as fragmented government representations rather than a simple absence of transparency portals. eGovTrace is intended to sit above those systems and reconcile identities, relationships, time, evidence, and control states. fileciteturn2file2L281-L306

The FMR research exposed this problem concretely: a project can be visible in one portal but become much harder to follow once the research crosses into procurement, contract, budget, obligation, payment, physical verification, and outcome evidence. fileciteturn2file2L310-L320

The same structural problem exists in everyday operations.

A citizen may interact with a government office once, while the complete transaction may cross several records and institutions:

```text
PERSON / BUSINESS
    ↓
APPLICATION / REQUEST
    ↓
IDENTITY / ELIGIBILITY
    ↓
DOCUMENT SUBMISSION
    ↓
ASSESSMENT
    ↓
INSPECTION / VERIFICATION
    ↓
DECISION / APPROVAL / DENIAL
    ↓
FEE / TAX / CONTRIBUTION / PAYMENT
    ↓
RELEASE / BENEFIT / LICENSE / PERMIT / SERVICE
    ↓
ENFORCEMENT / APPEAL / REVIEW
    ↓
FINAL OUTCOME
```

Corruption and abuse risks can arise anywhere in that chain. The correct eGovTrace response is therefore to map **control points and evidence** rather than create a blacklist of institutions.

---

# 4. Scope of the National Inventory

## 4.1 Institutional universe

The inventory must cover, at minimum:

- Executive branch departments, attached agencies, bureaus, commissions, authorities, regulatory bodies, regional offices, field offices, and other executive offices.
- Legislative branch institutions, including the Senate and House of Representatives and their accountable administrative and financial functions.
- Judicial branch institutions, including the Supreme Court, lower courts, and judiciary-wide administrative functions, while respecting judicial independence and applicable confidentiality/secrecy rules.
- Constitutional commissions and constitutionally mandated offices, including CSC, COMELEC, COA, CHR, and the Office of the Ombudsman.
- Local government units: provinces, cities, municipalities, barangays, and their offices.
- Government-owned and/or -controlled corporations and public corporations.
- State universities and colleges and other public educational institutions within the applicable accountability framework.
- Government financial institutions and public financial-service actors where legally appropriate.
- Autonomous/regional public institutions and other legally created government entities.
- Public-sector contractors, suppliers, consultants, concessionaires, grantees, beneficiaries, regulated entities, and other external actors **as counterparties and evidence-linked entities**, not automatically as subjects of wrongdoing.

The 2026 DBM government directory explicitly identifies constitutional offices and also maintains national institutional listings; the 2026 UACS organizational structure separately identifies Congress, executive departments, the Judiciary, constitutional commissions, LGU-related allocations, GOCC support, and other organizational classes. citeturn435062search24turn435062search2

The FY2026 GAA and NEP also demonstrate the breadth of public institutions appearing in national budget execution, including numerous executive offices and judiciary institutions. citeturn435062search3turn435062search6

## 4.2 Geographic universe

The inventory is national and subnational.

```text
NATIONAL
  ↓
REGION
  ↓
PROVINCE
  ↓
CITY / MUNICIPALITY
  ↓
BARANGAY
  ↓
FIELD OFFICE / FACILITY / PROJECT SITE / SERVICE POINT
```

A national accountability graph must preserve local autonomy and legal authority rather than flatten every local institution into a branch office of the national government.

---

# 5. The New Core Concept: Operational Control Graph

The original project graph answers:

> What happened to this public intervention?

The operational-control graph adds:

> What happened inside government when government exercised a power, processed a transaction, made a decision, collected money, released an asset or benefit, inspected something, or enforced a rule?

The generalized model is:

```text
ACTOR
  ↓
AUTHORITY
  ↓
PROCESS
  ↓
CONTROL POINT
  ↓
ACTION / EVENT
  ↓
RECORD
  ↓
DECISION / OUTPUT
  ↓
RESOURCE / SERVICE / POWER EXERCISED
  ↓
OUTCOME
  ↓
REVIEW / AUDIT / APPEAL
```

Each step should be time-aware and evidence-backed.

---

# 6. Institutional Role Taxonomy

One institution may have more than one role. eGovTrace must not assume that the "owner" of a record is necessarily the institution responsible for the underlying action.

## 6.1 Core roles

| Role | Meaning |
|---|---|
| AUTHORITATIVE_SOURCE | Official system or record custodian for a specific fact |
| POLICY_AUTHORITY | Establishes policy, rule, standard, or strategic direction |
| LEGISLATIVE_AUTHORITY | Creates law, appropriates funds, performs legislative oversight |
| FUNDING_AUTHORITY | Controls or authorizes a public financial resource |
| BUDGET_AUTHORITY | Budget formulation, release, or control role |
| PROCURING_ENTITY | Conducts procurement/acquisition |
| CONTRACTING_AUTHORITY | Enters or administers a contract |
| IMPLEMENTING_ENTITY | Executes a project, program, or service |
| ASSET_OWNER | Owns or controls a public asset |
| OPERATOR | Operates a public facility or service |
| REGULATOR | Sets/enforces regulatory requirements |
| LICENSER / PERMITTER | Grants, renews, suspends, or revokes authorization |
| ASSESSOR | Determines tax, fee, eligibility, value, classification, or compliance state |
| INSPECTOR | Performs inspection/verification |
| ENFORCER | Exercises enforcement authority |
| COLLECTOR | Receives or accounts for public revenue/fees |
| BENEFIT_ADMINISTRATOR | Determines or delivers public benefits |
| PERSONNEL_AUTHORITY | Appoints, hires, assigns, disciplines, or manages public personnel |
| DATA_CUSTODIAN | Holds or controls an information resource |
| AUDITOR | Performs independent or internal audit/assurance |
| INVESTIGATOR | Conducts authorized investigation |
| PROSECUTOR / ADJUDICATOR | Exercises legally defined case or adjudicative authority |
| APPEAL_BODY | Reviews contested decisions |
| COMPLAINT_HANDLER | Receives and processes complaints/reports |
| DISCLOSURE_CUSTODIAN | Handles public information/FOI or transparency obligations |
| IDENTITY_AUTHORITY | Issues or validates an identifier/identity record |
| CROSS_SYSTEM_BRIDGE | Provides a record that can corroborate another institution's representation |

A single actor can occupy multiple roles across different processes.

---

# 7. Branch-Level Accountability Map

## 7.1 Executive branch

The Executive is the largest operational surface because it performs most day-to-day administrative, regulatory, service-delivery, infrastructure, revenue, enforcement, and program-execution functions.

### Primary accountability domains

```text
POLICY
BUDGET
PROCUREMENT
PROJECTS
SERVICE DELIVERY
REGULATION
LICENSING
INSPECTION
ENFORCEMENT
REVENUE COLLECTION
BENEFITS
PERSONNEL
ASSET MANAGEMENT
DATA / IT
EMERGENCY RESPONSE
PROGRAM OUTCOMES
```

### Initial national actor classes

- Office of the President and other executive offices.
- Department of Economy, Planning, and Development (DEPDev).
- Department of Budget and Management (DBM).
- Department of Finance (DOF) and revenue/financial agencies.
- Department of Public Works and Highways (DPWH).
- Department of Transportation (DOTr) and transport-sector authorities.
- Department of Trade and Industry (DTI) and investment/trade-sector bodies.
- Department of Information and Communications Technology (DICT).
- Department of Environment and Natural Resources (DENR).
- Department of the Interior and Local Government (DILG).
- Department of Justice (DOJ) and attached justice-sector institutions.
- Department of Education (DepEd).
- Department of Health (DOH).
- Department of Social Welfare and Development (DSWD).
- Department of Agriculture (DA).
- Department of Energy (DOE).
- Department of Labor and Employment (DOLE).
- Department of National Defense (DND).
- Department of Foreign Affairs (DFA).
- Department of Science and Technology (DOST).
- Department of Tourism (DOT).
- Department of Agrarian Reform (DAR).
- Department of Human Settlements and Urban Development (DHSUD).
- Department of Migrant Workers (DMW).
- Presidential Communications Office and other executive offices.
- GOCCs, authorities, regulators, bureaus, attached agencies, and regional/field offices.

The active 2026 UACS organizational list confirms the current department-level coding structure, including DEPDev, DICT, DOTr, DHSUD, DMW and the other major departments. citeturn435062search2

### Executive operational-control questions

For every executive process, eGovTrace should eventually ask:

1. Who has legal authority?
2. What event starts the process?
3. What documents/data are required?
4. What checks must occur?
5. Who may override the normal path?
6. What record proves the action?
7. Who reviewed the action?
8. What money/property/service moved?
9. What downstream institution should see the corresponding event?
10. What happens when the expected evidence is missing or inconsistent?

---

## 7.2 Legislative branch

The legislative branch must be represented differently from an operational service agency.

### Objects to trace

```text
LAW
BILL
APPROPRIATION
COMMITTEE ACTION
OVERSIGHT HEARING
REPORT
RESOLUTION
CONGRESSIONAL PROGRAM / PROJECT
OFFICIAL EXPENDITURE
PROCUREMENT
ASSET
PERSONNEL
ADMINISTRATIVE DECISION
```

### Accountability questions

- What public money was appropriated?
- What office or program received it?
- What condition or purpose was attached to the appropriation?
- What administrative or procurement records followed?
- What oversight inquiry occurred?
- What government response was given?
- Were findings or recommendations subsequently acted upon?

The system must not turn legislative oversight activity itself into a finding of misconduct. It should preserve the legislative event as evidence and connect it to the relevant public intervention, appropriation, agency response, and subsequent state.

---

## 7.3 Judicial branch

The judicial graph must be highly constrained.

### Candidate objects

```text
CASE
COURT
FILING
ORDER
DECISION
HEARING
PARTY
COUNSEL
COURT FEE
BOND / PAYMENT (WHERE DISCLOSABLE)
JUDICIAL PROCUREMENT
JUDICIAL ASSET
JUDICIAL PERSONNEL
ADMINISTRATIVE ACTION
```

### Design rule

The public eGovTrace layer should focus on lawful, disclosure-appropriate administrative and institutional accountability data and must not expose protected judicial information, privileged material, personal data, sealed records, or information whose disclosure would compromise due process or judicial independence.

The Judiciary is treated as a department-level organizational category in the UACS structure. citeturn435062search2

---

## 7.4 Constitutional commissions and constitutionally mandated offices

At minimum:

- Civil Service Commission (CSC)
- Commission on Elections (COMELEC)
- Commission on Audit (COA)
- Commission on Human Rights (CHR)
- Office of the Ombudsman

The 2026 DBM government directory describes these offices as independent/autonomous or constitutionally mandated bodies and identifies their distinct mandates. citeturn435062search24

### eGovTrace role

These institutions should not be modeled as ordinary project/service agencies.

Their principal graph roles are:

```text
OVERSIGHT
AUDIT
PERSONNEL GOVERNANCE
ELECTION ADMINISTRATION
HUMAN RIGHTS INVESTIGATION
OMBUDSMAN INVESTIGATION
```

Their records may provide high-value assurance links into other institutional graphs.

---

# 8. Local Government Accountability Graph

LGUs require a first-class model rather than being treated as a single national-agency category.

## 8.1 LGU operational surfaces

```text
LOCAL REVENUE
BUSINESS PERMITS
BUILDING PERMITS
ZONING
OCCUPANCY
HEALTH CERTIFICATES
SANITARY PERMITS
TRICYCLE / LOCAL TRANSPORT REGULATION
MARKET OPERATIONS
LOCAL PROCUREMENT
LOCAL PROJECTS
SOCIAL SERVICES
LOCAL ASSETS
REAL PROPERTY TAX
FEES / CHARGES
INSPECTIONS
ENFORCEMENT
LOCAL PERSONNEL
LOCAL DISASTER RESPONSE
BARANGAY SERVICES
```

## 8.2 High-value cross-system relationships

Example:

```text
BUSINESS PERMIT
 ↕
DTI / SEC / CDA registration
 ↕
BIR registration / tax evidence
 ↕
LGU zoning / permit / inspection
 ↕
fire / health / environmental requirements
 ↕
local fee collection
 ↕
actual business operation
```

The graph should distinguish **national authority**, **LGU authority**, and **shared/coordinated authority**.

---

# 9. Government-Owned and Controlled Corporations / Public Corporations

GOCCs must be treated as a major operational class because they may simultaneously:

- receive or manage public resources;
- procure goods/services;
- own or operate public infrastructure;
- collect fees or revenues;
- enter contracts;
- borrow or issue obligations;
- deliver public services;
- exercise delegated regulatory or operational powers.

Initial high-priority sectors include:

```text
PORTS
AIRPORTS
WATER
POWER
RAIL / TRANSPORT
FINANCE
HOUSING
IRRIGATION
TELECOMMUNICATIONS / ICT
ENERGY
INDUSTRIAL / ECONOMIC ZONES
TOURISM INFRASTRUCTURE
```

Open.gov.ph currently provides a transparency gateway that lists many government corporations and agencies, illustrating the scale of the existing public transparency ecosystem. citeturn435062search1

---

# 10. High-Priority Operational Domains

The following domains should be treated as the initial **national corruption-risk/control-surface inventory**. This is a map of where control failure can occur, not a list of accusations.

## 10.1 Procurement

```text
PLANNING
 → APP
 → MARKET RESEARCH
 → SPECIFICATIONS
 → ABC
 → PROCUREMENT METHOD
 → BIDDING / SOLICITATION
 → EVALUATION
 → POST-QUALIFICATION
 → AWARD
 → CONTRACT
 → DELIVERY
 → INSPECTION
 → ACCEPTANCE
 → PAYMENT
 → CONTRACT CLOSEOUT
```

Potential control signals:

- unexplained specification changes;
- unusual procurement method;
- repeated vendor concentration;
- inconsistent bidder identities;
- unexplained disqualification patterns;
- weak or missing post-qualification evidence;
- contract values inconsistent with procurement records;
- unexplained variations or extensions;
- acceptance without recoverable inspection evidence;
- payment without clear delivery/acceptance linkage.

Output state remains `CONTROL_SIGNAL`, not `CORRUPTION_FINDING`.

---

## 10.2 Revenue / collection

```text
TAX / FEE / DUTY / CHARGE
 → ASSESSMENT
 → BILLING
 → PAYMENT INSTRUCTION
 → PAYMENT
 → RECEIPT / ACCOUNTING
 → DEPOSIT / REMITTANCE
 → RECONCILIATION
```

Potential cross-system reconciliation:

```text
ASSESSMENT
↕
PAYMENT
↕
OFFICIAL RECEIPT / DIGITAL RECEIPT
↕
ACCOUNTING
↕
BANK / TREASURY SETTLEMENT
```

A payment instruction is never treated as proof of settlement without corresponding settlement evidence.

---

## 10.3 Licensing / permitting

```text
APPLICATION
 → IDENTITY
 → REQUIREMENTS
 → ASSESSMENT
 → INSPECTION
 → DECISION
 → FEE
 → PAYMENT
 → RELEASE
 → RENEWAL / SUSPENSION / REVOCATION
```

Potential control signals:

- approvals with missing required documents;
- approvals preceding required inspections;
- unusual exception/override frequency;
- repeated processing by the same officer/intermediary pattern;
- large unexplained differences in processing time;
- fee records that cannot reconcile;
- permits issued after expiry of required prerequisites.

---

## 10.4 Inspection / enforcement

```text
CASE / TRIGGER
 → ASSIGNMENT
 → INSPECTION
 → FINDING
 → NOTICE
 → CORRECTIVE ACTION
 → PENALTY / SANCTION
 → APPEAL
 → RESOLUTION
```

Potential control signals:

- missing inspection evidence;
- inspection results changed without explanation;
- repeated assignment concentration;
- enforcement action inconsistent with documented findings;
- penalties assessed but not reconciled to collection;
- cases repeatedly delayed beyond expected service levels.

---

## 10.5 Customs / trade

A first-class eGovTrace customs graph should eventually model:

```text
IMPORTER / EXPORTER
      ↓
SHIPMENT
      ↓
DECLARATION
      ↓
CLASSIFICATION
      ↓
VALUATION
      ↓
ASSESSMENT
      ↓
INSPECTION / SELECTIVITY
      ↓
DUTY / TAX
      ↓
PAYMENT
      ↓
CUSTOMS RELEASE
      ↓
PORT / AIRPORT HANDLING
      ↓
INLAND LOGISTICS
      ↓
TRADE OUTCOME
```

Core actors may include BOC, PPA, CAAP, DOTr, DTI, ports/airport operators, LGUs, other border-control actors, and private logistics/trade counterparties, subject to their legal mandates and lawful data-access boundaries.

Important distinction:

> BOC should not be treated as the "owner" of a port project merely because customs data is connected to a port. BOC may instead be a regulatory/operational actor whose records provide downstream control and economic evidence.

---

## 10.6 Transportation / ports / airports

### Port graph

```text
PORT POLICY / PLAN
 → INVESTMENT PROGRAM
 → BUDGET
 → PROCUREMENT
 → CONTRACT
 → CONSTRUCTION / REHABILITATION
 → PORT ASSET
 → OPERATION
 → CARGO / VESSEL ACTIVITY
 → CUSTOMS / TRADE
 → ROAD / RAIL / LOGISTICS
 → ECONOMIC OUTCOME
```

Possible actors include DOTr, PPA, DPWH, LGUs, BOC, environmental/regulatory bodies, port operators, shipping/logistics counterparties, and other authorities depending on the port and legal structure.

### Airport graph

```text
AIRPORT PLAN
 → BUDGET
 → PROCUREMENT / CONCESSION / CONTRACT
 → TERMINAL / RUNWAY / FACILITY
 → SAFETY / SECURITY / REGULATORY CONTROL
 → AIRLINE / CARGO OPERATIONS
 → CUSTOMS / BORDER / HEALTH CONTROLS
 → ROAD / TRANSIT ACCESS
 → PASSENGER / CARGO FLOW
 → ECONOMIC OUTCOME
```

Potential actors include DOTr, CAAP, BOC, other border/health/security institutions, DPWH, LGUs, and facility operators.

---

## 10.7 Personnel / HR / appointments

```text
POSITION
 → AUTHORIZATION
 → RECRUITMENT / APPOINTMENT
 → QUALIFICATION CHECK
 → ASSIGNMENT
 → AUTHORITY / ACCESS
 → PERFORMANCE
 → DISCIPLINE
 → TRANSFER / PROMOTION
 → SEPARATION
```

Potential control signals:

- qualification mismatch;
- unusual appointment sequence;
- position creation immediately before appointment;
- concentrated approval authority;
- access rights inconsistent with role;
- unexplained personnel changes around sensitive transactions;
- disciplinary events followed by unexplained reassignment.

No personnel signal should be treated as proof of nepotism, bribery, ghost employment, or another offense without the required evidence.

---

## 10.8 Benefits / social protection / grants / subsidies

```text
ELIGIBILITY
 → APPLICATION
 → VALIDATION
 → APPROVAL
 → FUNDING
 → RELEASE
 → BENEFICIARY RECEIPT
 → DUPLICATE / CROSS-PROGRAM RECONCILIATION
 → OUTCOME
```

Potential control signals:

- duplicate beneficiary identifiers;
- beneficiary eligibility conflict;
- payment without validated eligibility;
- unexplained changes in beneficiary status;
- payments after death/closure status where legally relevant and supported;
- repeated manual overrides;
- unexplained concentration among intermediaries.

---

## 10.9 Health service operations

High-value domains include:

```text
FACILITY
PERSONNEL
PROCUREMENT
MEDICINES
EQUIPMENT
PATIENT SERVICE
BILLING / CLAIMS
PUBLIC SUBSIDIES
INSPECTIONS
LICENSING
```

The public graph must respect medical privacy and protected information. The assurance layer should use legally permissible aggregate or authorized records where individual-level data cannot be disclosed.

---

## 10.10 Education operations

```text
SCHOOL
PERSONNEL
ENROLLMENT
TEXTBOOKS / MATERIALS
INFRASTRUCTURE
MEALS / PROGRAMS
SCHOLARSHIPS
PROCUREMENT
ATTENDANCE / DELIVERY
OUTCOMES
```

The graph should emphasize resource delivery and institutional controls without exposing protected student data.

---

## 10.11 Land / permitting / natural resources

```text
LAND / PARCEL
 → TITLE / TENURE
 → ZONING
 → PERMIT
 → ENVIRONMENTAL COMPLIANCE
 → DEVELOPMENT
 → TAX / FEE
 → INSPECTION
 → ENFORCEMENT
```

Potential actors include DHSUD, DENR, LGUs, registry/land-administration bodies, assessors, permitting bodies, environmental authorities, and other legally responsible institutions.

---

## 10.12 Infrastructure / public works

The existing FMR research remains a high-value laboratory for this domain.

```text
PROJECT
 → BUDGET
 → PROCUREMENT
 → CONTRACT
 → OBLIGATION
 → DISBURSEMENT
 → PAYMENT
 → IMPLEMENTATION
 → INSPECTION
 → COMPLETION
 → ASSET
 → OPERATION
 → OUTCOME
 → AUDIT
```

This is consistent with the approved generalized project lifecycle. fileciteturn2file1L196-L236

---

# 11. The Institutional Actor Record

Every institution entered into the master inventory should eventually have a normalized record.

```yaml
institution_id:
name:
legal_name:
branch:
institution_class:
parent_institution:
constitutional_or_statutory_basis:
mandate_summary:
jurisdiction:
geographic_scope:
operational_roles: []
financial_roles: []
procurement_roles: []
regulatory_roles: []
licensing_roles: []
inspection_roles: []
enforcement_roles: []
service_delivery_roles: []
personnel_roles: []
asset_roles: []
data_custody_roles: []
audit_assurance_roles: []
complaint_roles: []
known_public_systems: []
known_identifiers: []
major_record_types: []
public_data:
restricted_data:
confidential_or_protected_data:
legal_access_constraints: []
source_system_authority:
cross_system_bridges: []
related_institutions: []
accountability_routes: []
historical_validity:
status:
provenance: []
```

---

# 12. The Operational Process Record

An agency inventory alone is insufficient. eGovTrace also needs a process inventory.

```yaml
process_id:
institution_id:
process_name:
process_domain:
legal_authority:
start_event:
end_event:
actors: []
required_inputs: []
control_points: []
allowed_overrides: []
outputs: []
financial_events: []
property_events: []
identity_events: []
inspection_events: []
decision_events: []
appeal_path:
records_generated: []
systems_involved: []
identifiers_generated: []
expected_time_window:
service_standard:
review_body:
audit_body:
complaint_route:
public_visibility:
restricted_visibility:
known_cross_system_bridges: []
risk_signals: []
provenance: []
```

---

# 13. The Control-Point Record

This is the key object for daily operational accountability.

```yaml
control_point_id:
process_id:
name:
control_type:
required_or_discretionary:
authority_holder:
required_input:
required_action:
required_output:
record_of_action:
reviewer:
segregation_of_duties_requirement:
exception_path:
expected_time:
expected_amount_or_range:
cross_check_source:
known_failure_modes:
publicly_observable:
authorized_visibility:
legal_constraints:
provenance: []
```

Examples:

```text
CUSTOMS ASSESSMENT
LICENSE APPROVAL
BID EVALUATION
PAYMENT AUTHORIZATION
INSPECTION CERTIFICATION
BENEFICIARY ELIGIBILITY APPROVAL
PERSONNEL APPOINTMENT
PROPERTY RELEASE
CONTRACT VARIATION
```

---

# 14. Daily Operational Corruption Surface: Taxonomy of Signals

The following are **research signal classes**, not offenses automatically established by the graph.

## 14.1 Access / authority signals

```text
unauthorized action
excess authority
authority mismatch
role mismatch
approval by wrong organizational level
access after reassignment/separation
```

## 14.2 Process signals

```text
required step missing
required step performed out of order
unexpected manual override
repeated exception path
unexplained acceleration
unexplained delay
process deviation without reason
```

## 14.3 Financial signals

```text
assessment/payment mismatch
payment instruction without settlement proof
duplicate payment
unreconciled receipt
unexpected refund
unexplained variance
unreconciled obligation
```

## 14.4 Procurement signals

```text
vendor concentration
repeated bidder patterns
specification changes
unusual procurement timing
contract variation concentration
post-qualification inconsistency
```

## 14.5 Identity / entity signals

```text
same entity under variant identifiers
unresolved beneficial-ownership relationship
shared address/contact pattern
duplicate beneficiary
employee/vendor conflict signal
```

## 14.6 Document / evidence signals

```text
missing primary record
record created after claimed event
conflicting dates
conflicting amounts
version replacement
inconsistent identifier
unsupported completion claim
```

## 14.7 Outcome signals

```text
resource delivered but service absent
asset declared complete but unusable
program paid but output not observed
revenue recorded but corresponding operational event missing
```

## 14.8 Oversight signals

```text
repeat finding
unresolved audit recommendation
repeated control deficiency
complaint recurrence
investigation delayed
corrective action not evidenced
```

---

# 15. Cross-System Detection Patterns

The national system becomes valuable when it can compare independent records.

## Pattern A — Transaction exists in one system but not its expected counterpart

```text
SYSTEM A: APPROVAL
      ↓
EXPECTED
SYSTEM B: PAYMENT / RELEASE
      ↓
MISSING / UNRESOLVED
```

Output:

`UNRESOLVED_EXPECTED_RELATIONSHIP`

---

## Pattern B — Two institutions describe the same event differently

```text
SOURCE A
amount = X

SOURCE B
amount = Y
```

Output:

`SOURCE_CONFLICT`

Not:

`FRAUD`

---

## Pattern C — A sequence breaks the expected control order

```text
APPROVAL
↓
INSPECTION
↓
PAYMENT
```

Observed:

```text
APPROVAL
↓
PAYMENT
↓
INSPECTION
```

Output:

`CONTROL_SEQUENCE_EXCEPTION`

Subject to determining whether the process permits alternative sequences.

---

## Pattern D — Repeated exceptions cluster around the same actor

```text
ACTOR X
 → exception
 → exception
 → exception
 → exception
```

This is a prioritization signal, not a finding of corruption.

---

## Pattern E — Government resource and outcome disconnect

```text
BUDGET
↓
PAYMENT
↓
CLAIMED OUTPUT

BUT

OBSERVED OUTCOME = unresolved
```

Output:

`OUTCOME_RECONCILIATION_GAP`

---

# 16. Source-System Inventory

For each institution, eGovTrace should identify the systems where evidence actually resides.

## Initial source categories

```text
BUDGET SYSTEMS
PROCUREMENT SYSTEMS
PROJECT PORTALS
FINANCIAL MANAGEMENT SYSTEMS
PAYROLL / HR SYSTEMS
PERMITTING SYSTEMS
LICENSING SYSTEMS
CUSTOMS SYSTEMS
TAX SYSTEMS
PROPERTY / LAND SYSTEMS
HEALTH SYSTEMS
EDUCATION SYSTEMS
SOCIAL PROTECTION SYSTEMS
COURT SYSTEMS
AUDIT SYSTEMS
COMPLAINT / FOI SYSTEMS
REGULATORY SYSTEMS
DOCUMENT MANAGEMENT SYSTEMS
ASSET REGISTRIES
GEOSPATIAL SYSTEMS
STATISTICAL SYSTEMS
```

The inventory must record whether a system is:

```text
PUBLIC
PARTIALLY PUBLIC
RESTRICTED
CONFIDENTIAL
PROTECTED BY LAW
NOT DISCLOSED
UNKNOWN
```

`UNKNOWN` is a research state, not a statement that no system exists.

---

# 17. Identifier Registry

Identity continuity is central to eGovTrace.

Each institutional system may have its own identifier.

Examples of identifier families to inventory include:

```text
PROJECT ID
PROGRAM ID
UACS / PAP
PROCUREMENT REFERENCE
SOLICITATION NUMBER
AWARD NOTICE NUMBER
CONTRACT NUMBER
SUPPLIER / CONTRACTOR ID
BUSINESS REGISTRATION ID
TAX IDENTIFIER
LICENSE NUMBER
PERMIT NUMBER
SHIPMENT / DECLARATION NUMBER
PROPERTY / PARCEL IDENTIFIER
PERSONNEL ID
BENEFICIARY ID
CASE NUMBER
AUDIT REPORT / OBSERVATION REFERENCE
FOI REQUEST ID
ASSET ID
FACILITY ID
```

Important rule:

> No identifier is presumed universal merely because it looks similar across systems.

The FMR experiment demonstrated why identifier recovery and identity proof must remain separate. fileciteturn2file4L448-L468

---

# 18. Evidence Architecture for Daily Operations

Every material operational claim should ultimately resolve into:

```text
CLAIM
 ↓
SOURCE
 ↓
RECORD
 ↓
EVENT DATE
 ↓
SOURCE VERSION / OBSERVATION DATE
 ↓
IDENTIFIER
 ↓
JOIN BASIS
 ↓
CONFIDENCE / EVIDENCE STATUS
```

Recommended evidence states:

```text
CONFIRMED
DOCUMENTED AGENCY-ORIGIN SECONDARY
DOCUMENTED OBSERVATION
NOT ESTABLISHED
UNRESOLVED
NOT EXECUTED
```

These states are already used in the controlled FMR research and explicitly do not mean absence or wrongdoing. fileciteturn2file5L641-L650

---

# 19. Citizen Layer vs Government Assurance Layer

## Citizen layer

Citizens should be able to:

```text
SEARCH
COMPARE
FILTER
FOLLOW EVIDENCE
SEE PROCESS STATUS
SEE CONTROL GAPS
SEE PUBLIC RESPONSES
REPORT A DISCREPANCY
FOLLOW RESOLUTION
```

They should not be encouraged to:

```text
DECLARE GUILT
DOX
CIRCUMVENT ACCESS CONTROLS
RELEASE PRIVATE INFORMATION
```

The approved architecture explicitly separates citizen transparency from investigative authority and treats citizen reports as claims/reports until established. fileciteturn2file1L126-L150

## Government assurance layer

Authorized users may receive:

```text
cross-system joins
identity matches
unresolved relationships
control-break signals
source conflicts
financial reconciliation gaps
process deviations
historical state
case-routing suggestions
missing-evidence lists
```

The output remains decision support unless and until a competent institution performs its own authorized review.

---

# 20. Case Routing Model

Every control break should ask:

```text
WHAT BROKE?
 ↓
WHAT EVIDENCE PROVES IT?
 ↓
WHICH RECORD IS MISSING?
 ↓
WHO CUSTODIES THAT RECORD?
 ↓
WHO HAS LEGAL AUTHORITY TO REVIEW IT?
 ↓
WHAT REVIEW / AUDIT / COMPLAINT PATH EXISTS?
```

Example:

```text
PAYMENT / RECEIPT RECONCILIATION GAP
        ↓
LIKELY RECORD CUSTODIAN
        ↓
RESPONSIBLE FINANCE / TREASURY UNIT
        ↓
INTERNAL CONTROL / INTERNAL AUDIT
        ↓
COA / OTHER COMPETENT BODY WHERE APPROPRIATE
```

The system must not assign jurisdiction merely from organizational similarity. Legal authority must be verified.

---

# 21. Cross-Branch and Cross-Agency Examples

## 21.1 Port development

```text
DEPDev / NATIONAL PLAN
        ↓
DBM / APPROPRIATION
        ↓
DOTr / SECTOR AUTHORITY
        ↓
PPA / PORT ASSET OR OPERATION
        ↓
PROCUREMENT / CONTRACTOR
        ↓
DPWH / CONNECTING INFRASTRUCTURE
        ↓
LGU / LAND / LOCAL PERMITS
        ↓
BOC / CUSTOMS PROCESS
        ↓
TRADE / CARGO FLOW
        ↓
ECONOMIC OUTCOME
        ↓
COA / AUDIT / ASSURANCE
```

A break anywhere is not automatically corruption. The graph's job is to expose what evidence should exist and where the continuity is unresolved.

## 21.2 Airport expansion

```text
PLAN
 ↓
BUDGET
 ↓
PROCUREMENT / CONCESSION / CONTRACT
 ↓
CAAP / AIRPORT ASSET
 ↓
DOTr / SECTOR POLICY
 ↓
DPWH / ROAD ACCESS
 ↓
CUSTOMS / BORDER / HEALTH / SECURITY
 ↓
PASSENGER + CARGO THROUGHPUT
 ↓
ECONOMIC OUTCOME
```

## 21.3 Local business permit

```text
BUSINESS
 ↓
REGISTRATION
 ↓
LGU PERMIT
 ↓
ZONING
 ↓
INSPECTION
 ↓
LOCAL FEE
 ↓
PAYMENT / RECEIPT
 ↓
PERMIT RELEASE
```

Possible independent cross-checks:

```text
DTI / SEC / CDA
↕
BIR
↕
LGU
↕
PAYMENT SYSTEM
```

## 21.4 Customs cargo release

```text
IMPORTER
 ↓
DECLARATION
 ↓
ASSESSMENT
 ↓
INSPECTION / SELECTIVITY
 ↓
DUTY + TAX
 ↓
PAYMENT
 ↓
RELEASE
 ↓
PORT / AIRPORT HANDLING
 ↓
INLAND DELIVERY
```

Possible cross-check sources include BOC records, port/airport records, payment evidence, importer/business identity records, and trade/transport records subject to lawful access.

---

# 22. National Accountability Graph: Target Topology

```text
                           PHILIPPINE STATE
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
     BRANCHES                INSTITUTIONS               LOCAL STATE
        │                         │                         │
 Executive / Legislative /   Departments / GOCCs /    Provinces / Cities /
 Judicial / Constitutional   Regulators / Authorities  Municipalities /
        │                     / Bureaus / Offices       Barangays
        └─────────────────────────┼─────────────────────────┘
                                  │
                          POWERS + PROCESSES
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
       MONEY                  OPERATIONS               ASSETS
          │                       │                       │
    Budget/Revenue         Permits/Licenses        Infrastructure
    Procurement            Inspections              Facilities
    Contracts               Benefits                 Land
    Payments                Customs                  Equipment
          │                 Enforcement                   │
          └───────────────────────┼───────────────────────┘
                                  │
                              EVENTS
                                  │
                              RECORDS
                                  │
                           EVIDENCE GRAPH
                                  │
                    IDENTITY + TEMPORAL RECONCILIATION
                                  │
                         CONTROL / ASSURANCE
                                  │
                          REVIEW / CASE ROUTING
                                  │
                         PUBLIC ACCOUNTABILITY
```

---

# 23. How This Changes the eGovTrace Website

The website should eventually evolve beyond a project search portal.

## 23.1 Search by anything meaningful

```text
PROJECT
AGENCY
OFFICIAL / ROLE
CONTRACTOR
COMPANY
PROCUREMENT
CONTRACT
PERMIT
LICENSE
PORT
AIRPORT
FACILITY
ASSET
PAYMENT / FINANCIAL RECORD
BENEFICIARY PROGRAM
CUSTOMS / TRADE EVENT
AUDIT FINDING
COMPLAINT / REPORT
```

Search results should resolve into an evidence-backed graph rather than isolated profiles.

## 23.2 Entity page

Every entity page may eventually show:

```text
WHO / WHAT
ROLE
LEGAL AUTHORITY
CONNECTED INSTITUTIONS
TRANSACTIONS
PROJECTS
CONTRACTS
OPERATIONS
CONTROL EVENTS
AUDIT / ASSURANCE EVENTS
EVIDENCE
UNRESOLVED RELATIONSHIPS
HISTORICAL STATES
```

## 23.3 Operation page

For everyday transactions, a page should resemble:

```text
APPLICATION
STATUS
REQUIRED STEPS
COMPLETED STEPS
EXCEPTIONS
OFFICIAL DECISIONS
PAYMENTS
RELEASED OUTPUT
EVIDENCE
TIME ELAPSED
APPEALS / COMPLAINTS
CURRENT STATE
```

Where individual-level display is unlawful, the public layer should use aggregates or masked/anonymized representations.

---

# 24. AI's Role

AI may assist with:

```text
DOCUMENT EXTRACTION
ENTITY MATCHING
IDENTIFIER CANDIDATE RECOVERY
TIMELINE RECONSTRUCTION
ANOMALY DETECTION
SOURCE CONFLICT DETECTION
MISSING-EVIDENCE DETECTION
CONTROL-PATTERN COMPARISON
CASE TRIAGE SUPPORT
```

AI must not:

```text
DECLARE GUILT
CREATE FACTS
INVENT IDENTIFIERS
CONVERT ASSOCIATION INTO CORRUPTION
OVERRIDE SOURCE AUTHORITY
MAKE FINAL LEGAL DETERMINATIONS
```

This is consistent with the frozen eGovTrace principle that AI output is not a fact or legal determination. fileciteturn2file4L462-L474

---

# 25. Data Access Tiers

The inventory must classify each record by lawful visibility.

| Tier | Intended use |
|---|---|
| PUBLIC | Citizen transparency |
| PUBLIC-DERIVED | Aggregated/derived public view backed by public source evidence |
| AUTHORIZED-GOVERNMENT | Restricted assurance workspace |
| LEGALLY-RESTRICTED | Disclosure only to authorized users/processes |
| CONFIDENTIAL / PROTECTED | Not exposed through ordinary public eGovTrace |
| UNKNOWN | Accessability not yet established |

The public site should never infer that unavailable data proves wrongdoing.

---

# 26. Priority Institutional Families for Phase 1 Inventory

The first operational inventory pass should prioritize institutions that sit at the intersections of money, authority, physical infrastructure, regulation, and evidence.

### Tier 1 — cross-government backbone

```text
DEPDev
DBM
DOF
COA
Ombudsman
CSC
GPPB / PhilGEPS
DICT
DILG
DOJ
```

### Tier 1 — infrastructure / logistics / economic flow

```text
DPWH
DOTr
PPA
CAAP
BOC
DTI
BOI / investment-sector bodies
PEZA / economic-zone authorities
DENR
DHSUD
LGUs
```

### Tier 1 — large public-service and social-resource domains

```text
DepEd
DOH
DSWD
DA
DOE
DOLE
DOST
DOT
DAR
DMW
```

### Tier 1 — assurance / control

```text
COA
Ombudsman
CSC
Internal Audit / Internal Control Units
Legally competent investigative / prosecutorial bodies
```

These priorities are **coverage priorities**, not a claim that these institutions are more corrupt than others.

---

# 27. Phase Structure for Completing the Inventory

## Phase A — Institutional Universe

Establish canonical institution records from authoritative government directories, budget/UACS records, enabling laws, official organizational pages, and relevant government registries.

Deliverable:

`institution_registry`

## Phase B — Operational Domain Inventory

For every priority institution, map its recurring powers and processes.

Deliverable:

`operational_process_registry`

## Phase C — Control-Point Inventory

For every process, identify mandatory checks, decision points, segregation-of-duties requirements, exception paths, and expected records.

Deliverable:

`control_point_registry`

## Phase D — Source / Evidence Mapping

Map each process and control point to the system or custodian where evidence resides.

Deliverable:

`evidence_source_registry`

## Phase E — Identifier / Bridge Mapping

Document identifiers and empirically test cross-system joins.

Deliverable:

`identifier_bridge_registry`

## Phase F — Signal Catalogue

Define testable anomaly/control-break patterns per domain.

Deliverable:

`control_signal_catalogue`

## Phase G — Vertical Trace Validation

Run real traces across several domains:

```text
FMR / infrastructure
PORT / trade-logistics
AIRPORT / mobility
LGU PERMIT / regulation
CUSTOMS TRANSACTION / revenue-control
SOCIAL PROGRAM / beneficiary flow
PROCUREMENT / supplier lifecycle
PERSONNEL / appointment-control
```

Deliverable:

`validated_vertical_traces`

## Phase H — Platform Mapping

Only after the source/process/control architecture is sufficiently validated should the website and backend implementation model be finalized.

---

# 28. What Counts as a Successful Inventory

The inventory is successful when eGovTrace can take an unfamiliar government operation and answer, without guessing:

```text
WHO HAS AUTHORITY?
WHAT PROCESS IS BEING PERFORMED?
WHAT SHOULD HAPPEN?
WHAT RECORD SHOULD EXIST?
WHERE SHOULD THAT RECORD LIVE?
WHAT IDENTIFIER SHOULD CONNECT IT?
WHAT INDEPENDENT SOURCE CAN CROSS-CHECK IT?
WHAT CONTROL SHOULD PREVENT ABUSE?
WHAT HAPPENED IN REALITY?
WHAT EVIDENCE SUPPORTS THAT?
WHAT REMAINS UNRESOLVED?
WHO CAN LAWFULLY REVIEW IT?
```

---

# 29. What This Inventory Does NOT Do

It does not:

- declare that every mapped process contains corruption;
- create a public blacklist of officials, agencies, or companies;
- replace agency systems;
- presume access to confidential records;
- assume every identifier is universal;
- treat every anomaly as fraud;
- automatically assign criminal or administrative liability;
- replace COA, Ombudsman, courts, internal audit, agency review, or other legally competent authorities;
- authorize implementation of a national public portal before the architecture's assumptions are empirically validated.

The approved architecture expressly states that the current work is research-approved but not yet implementation-approved, and identifies national/subnational identity, cross-system bridges, financial continuity, lawful source custody, case-routing authority, and outcome evidence as key assumptions requiring validation. fileciteturn2file3L406-L421

---

# 30. Research Questions Created by This Inventory

1. Can a national institutional ontology represent every major form of government authority without flattening distinct legal mandates?
2. Can recurring government operations be modeled as evidence-backed event chains?
3. Can eGovTrace distinguish a legitimate exception from an unexplained exception?
4. Can operational records be reconciled across national and local systems?
5. Can financial flows be connected to the administrative actions that generated them?
6. Can customs, ports, airports, trade, logistics, and public investment be linked without confusing regulatory roles with ownership?
7. Can personnel authority be modeled without exposing protected HR information?
8. Can audit and investigative findings be connected back to the transactions and control failures that produced them?
9. Can citizen reports become structured leads while remaining explicitly separate from facts?
10. Can AI help surface patterns while preserving evidentiary discipline?

---

# 31. Initial National Actor Inventory — Seed Table

This table is a starting seed, not the final complete agency census.

| Actor / family | Branch / class | Major roles for eGovTrace | High-value operational surfaces |
|---|---|---|---|
| Congress | Legislative | Legislative authority, appropriation, oversight | Laws, budget, oversight, official expenditures |
| Office of the President | Executive | Policy/executive authority | Executive decisions, appointments, programs |
| DEPDev | Executive | Planning / investment | Development plans, project/program priority |
| DBM | Executive | Budget authority / financial policy | Budget, releases, allotments, PFM |
| DOF family | Executive | Revenue / fiscal governance | Taxes, customs, treasury, fiscal records |
| BOC | Executive / DOF sector | Customs regulator / collector | Declaration, assessment, inspection, release, duty/tax |
| BIR | Executive / DOF sector | Revenue administration | Registration, assessment, collection, enforcement |
| COA | Constitutional | Audit / assurance | Audit, financial/compliance/performance findings |
| Ombudsman | Constitutional | Investigation / accountability | Complaints, investigation, administrative/criminal pathways |
| CSC | Constitutional | Personnel governance | Appointments, HR standards, discipline |
| COMELEC | Constitutional | Election administration | Elections, procurement, personnel, electoral operations |
| CHR | Constitutional | Human-rights investigation | Complaints, investigations, recommendations |
| DPWH | Executive | Infrastructure | Projects, procurement, contracts, assets |
| DOTr | Executive | Transport policy / sector oversight | Rail, aviation, maritime, transport programs |
| PPA | GOCC / authority | Port asset/operation | Port projects, leases/operations, cargo interface |
| CAAP | GOCC / authority | Airport operations | Airport assets, safety, operations, concessions/contracts |
| DTI | Executive | Trade/industry regulation and development | Business, trade, investment, consumer, licensing |
| BOI | Investment-sector body | Investment facilitation | Incentives, registered projects, investment outcomes |
| PEZA / economic-zone authorities | Economic-zone institutions | Zone regulation / facilitation | Registration, permits, incentives, industrial operations |
| DENR | Executive | Environment / natural resources | Permits, land/resources, environmental compliance |
| DHSUD | Executive | Housing / land-use policy | Housing, planning, regulation |
| DILG | Executive | Local governance | LGU oversight, local systems, local accountability |
| LGUs | Local government | Local authority / services | Permits, local revenue, procurement, inspections, services |
| PhilGEPS / GPPB | Procurement system / policy | Procurement infrastructure | Notices, awards, procurement standards |
| SEC | Regulatory body | Corporate identity / filings | Corporations, officers, ownership-related records where lawful |
| CDA | Regulatory body | Cooperative identity / regulation | Registration, governance |
| PCAB / CIAP family | Construction regulation | Contractor licensing | Licenses, categories, project eligibility |
| DepEd | Executive | Education service delivery | Schools, personnel, procurement, programs |
| DOH | Executive | Health service/regulation | Facilities, procurement, licenses, programs |
| DSWD | Executive | Social protection | Benefits, beneficiaries, grants, programs |
| DA | Executive | Agriculture programs | Subsidies, procurement, projects, beneficiaries |
| DOE | Executive | Energy policy/regulation | Energy projects, permits, concessions |
| DOLE | Executive | Labor regulation/service | Inspections, benefits, employment programs |
| DOST | Executive | Science/technology programs | Grants, procurement, R&D programs |
| DOT | Executive | Tourism programs/infrastructure | Tourism investment, infrastructure, promotion |
| DAR | Executive | Agrarian reform | Land distribution, beneficiaries, programs |
| DMW | Executive | Migrant-worker governance | Licenses, recruitment regulation, services |
| DOJ | Executive | Justice administration | Legal, investigative/prosecutorial records subject to law |
| Judiciary | Judicial | Adjudication / administration | Cases, court administration, procurement, assets |
| GOCCs broadly | Public corporations | Service, asset, revenue, procurement | Infrastructure and service operations |
| SUCs | Public education | Education/service/procurement | Procurement, personnel, assets, programs |

The current UACS structure provides a useful authoritative starting point for department-level organizational coding, while the national directory and budget documents supply additional institutional detail. citeturn435062search2turn435062search24turn435062search6

---

# 32. Minimum Viable eGovTrace Operational Graph

Before attempting a full national deployment, the smallest useful model should support:

```text
INSTITUTION
PERSON / ROLE
EXTERNAL ENTITY
PROJECT
PROGRAM
BUDGET
PROCUREMENT
CONTRACT
TRANSACTION
PROCESS
CONTROL POINT
EVENT
RECORD
EVIDENCE
ASSET
SERVICE
OUTCOME
AUDIT / ASSURANCE EVENT
COMPLAINT / REPORT
CASE / REVIEW
```

And the graph should support relationships such as:

```text
AUTHORIZED_BY
PERFORMS
PROCESSES
APPROVES
REVIEWS
INSPECTS
COLLECTS
PAYS
RECEIVES
CONTRACTS_WITH
IMPLEMENTS
OWNS
OPERATES
REGULATES
LICENSES
INSPECTS
ENFORCES
REPORTS
AUDITS
INVESTIGATES
APPEALS
SUPPORTED_BY
DERIVED_FROM
EVIDENCED_BY
CROSS_CHECKED_BY
TEMPORALLY_PRECEDES
CONFLICTS_WITH
UNRESOLVED_WITH
```

---

# 33. Relationship to Existing eGovTrace Research

This inventory expands the approved ecosystem concept; it does not replace the existing research.

```text
FMR RESEARCH
   ↓
PROJECT IDENTITY
   ↓
PROCUREMENT
   ↓
FINANCIAL EXECUTION
   ↓
PHYSICAL / OUTCOME EVIDENCE

                  +

OPERATIONAL CONTROL RESEARCH
   ↓
AUTHORITY
   ↓
PROCESS
   ↓
CONTROL POINT
   ↓
TRANSACTION / EVENT
   ↓
RECORD
   ↓
SERVICE / DECISION / RESOURCE
   ↓
OUTCOME
```

Together they create the basis for a national accountability graph.

The approved architecture already intends eGovTrace to provide a citizen accountability layer, government assurance workspace, identity continuity, evidence/provenance, temporal modeling, and case-routing support over existing systems. fileciteturn2file4L481-L511

---

# 34. Research Discipline: What We Will Never Infer Automatically

The following transitions are prohibited without evidence:

```text
SAME CONTRACTOR → SAME PROJECT
SAME COMPANY → SAME BENEFICIAL OWNER
SAME OFFICIAL → SAME DECISION-MAKING MOTIVE
SAME LOCATION → SAME ASSET
MISSING RECORD → NON-EXISTENCE
DELAY → CORRUPTION
EXCEPTION → BRIBERY
ASSOCIATION → CONSPIRACY
UNUSUAL PATTERN → CRIME
AUDIT FINDING → GUILT
CITIZEN REPORT → FACT
AI SCORE → LEGAL CONCLUSION
```

The platform should always show the evidence path that caused it to form a relationship or signal.

---

# 35. Immediate Research Execution Plan

The inventory should now be executed as a structured research pass rather than treated as a static list.

### Workstream 1 — Canonical institutional universe

Use current authoritative government sources to normalize the national/subnational institutional population.

### Workstream 2 — Daily operations map

For the priority institutions, identify recurring operations where authority, money, property, service delivery, or regulatory discretion is exercised.

### Workstream 3 — Control-point mapping

Map the required checks, approvals, segregation of duties, exception routes, and evidence records.

### Workstream 4 — Evidence/system mapping

Identify the source system and custodian for each critical record.

### Workstream 5 — Bridge validation

Do not assume a relationship is true. Test real records and classify every bridge as:

```text
CONFIRMED
CANDIDATE
REJECTED
UNRESOLVED
```

### Workstream 6 — Vertical traces

Run at least three non-FMR traces:

```text
TRADE / PORT
AIRPORT / TRANSPORT
LGU PERMIT / DAILY OPERATIONS
```

Then add customs/revenue and one social-service trace if the evidence environment permits.

---

# 36. Decision Gate for Future Platform Design

This inventory is a research foundation.

The website/backend should **not** be locked to a final national architecture until research demonstrates that the model can successfully trace multiple operational domains across multiple institutions.

The architecture remains:

```text
RESEARCH
 → VALIDATE IDENTITIES
 → VALIDATE CONTROL CHAINS
 → VALIDATE EVIDENCE ACCESS
 → VALIDATE CROSS-SYSTEM RECONCILIATION
 → VALIDATE CASE ROUTING
 → THEN IMPLEMENT
```

This follows the existing architectural position that the long-term ecosystem is plausible but not yet empirically proven and that implementation should follow validation of identity continuity, financial continuity, lawful source custody, case-routing authority, and outcome evidence. fileciteturn2file2L406-L421

---

# 37. Definition of Success

The finished eGovTrace system should make it possible to move from:

```text
TRANSPARENCY
      ↓
TRACEABILITY
      ↓
CONTROL ASSURANCE
      ↓
ACCOUNTABILITY
```

without collapsing any of those concepts into an automatic accusation.

The citizen should be able to ask:

> **Where did the public resource go? What did government do with it? Who had authority? What process occurred? What evidence proves the steps? What happened in the end?**

The authorized reviewer should be able to ask:

> **Where did the control chain break, what evidence supports that observation, what evidence is missing, who possesses it, and which institution has the authority to review the issue?**

That is the operational-control extension of eGovTrace.

---

# 38. Source Register — Initial Authoritative Baseline

1. **DBM — 2026 Philippine Government Directory of Agencies and Officials**: national institutional directory and constitutional-office description. citeturn435062search24
2. **UACS — Department / Organization structure**: current organizational coding baseline, including departments, Judiciary, constitutional commissions, GOCC-support and LGU-related categories. citeturn435062search2
3. **DBM — FY2026 General Appropriations Act / Volume II / NEP**: current budgetary institutional population and public-resource context. citeturn435062search3turn435062search6
4. **Open.gov.ph**: existing Philippine transparency portal gateway and public-sector institutional surface. citeturn435062search1
5. **Approved eGovTrace Public Accountability Ecosystem Architecture**: governing eGovTrace research principles, layers, citizen/government separation, lifecycle, evidence model, and non-implementation status. fileciteturn2file2L271-L306

---

# 39. Final Research Position

> **eGovTrace is not merely a project-tracing system. It is intended to become an evidence-backed national accountability environment capable of tracing both public resources and the everyday exercise of government authority across branches, agencies, LGUs, GOCCs, public institutions, and their external counterparties, while preserving source authority, legal boundaries, temporal history, provenance, and the distinction between a control signal and a finding of corruption.**

**Status:** APPROVED TO PROCEED AS A RESEARCH INVENTORY  
**Implementation status:** NOT YET IMPLEMENTATION-APPROVED  
**Formal gate status:** NO NEW GATE CREATED  
**Next recommended research action:** Execute the institutional universe + operational-process + control-point inventory, beginning with the Tier 1 cross-government backbone and the trade/port, airport/transport, and LGU daily-operation vertical traces.

---

# 40. Execution Pass 1 — Tier 1 Backbone + Priority Verticals

**Execution status:** COMPLETED — INITIAL EVIDENCE-BACKED PASS  
**Execution date:** 2026-09-05  
**Scope:** Tier 1 cross-government backbone; trade/port; airport/transport; LGU daily operations.  
**Relationship to G0–G6:** No new gate. No change to frozen G0/G1/G2/G3/G4 decisions.

This pass converts the inventory from a conceptual design into an initial evidence-backed institutional/process/control map. It is not a claim that every Philippine institution, process, control, or source system has now been exhaustively catalogued.

## 40.1 Tier 1 cross-government backbone

The current 2026 DBM government directory and FY2026 budget/UACS materials provide the baseline institutional universe for this pass. The baseline confirms the presence and current organizational placement of major actors relevant to eGovTrace, including DBM, DEPDev, DOF, DPWH, DOTr, DTI, DENR, DILG, DICT, DHSUD, DSWD, DOJ, constitutional offices, and other national institutions.

For eGovTrace purposes, the Tier 1 backbone is normalized into these cross-cutting roles:

```text
PLANNING / POLICY
    DEPDev + sector planning authorities

BUDGET / PUBLIC FINANCE
    DBM + DOF + BTr + revenue / financial agencies

PROCUREMENT GOVERNANCE
    GPPB / PhilGEPS + Procuring Entities

PROJECT / ASSET EXECUTION
    Implementing agencies + GOCCs + LGUs

REGULATION / LICENSING
    Sector regulators + national agencies + LGUs

REVENUE / COLLECTION
    BIR + BOC + LGUs + other collecting entities

SERVICE DELIVERY
    DepEd + DOH + DSWD + DMW + LGUs + other service agencies

PERSONNEL GOVERNANCE
    CSC + agency HR / appointing authorities

AUDIT / ASSURANCE
    COA + internal audit units + legally competent assurance bodies

INVESTIGATION / ACCOUNTABILITY
    Ombudsman + DOJ / prosecutors + other competent bodies

DIGITAL / DATA INFRASTRUCTURE
    DICT + agency information systems + data custodians
```

The important design decision is that **no one role implies universal control**. A project, transaction, or service may cross several actors with different legal responsibilities.

---

# 41. Vertical Trace A — Trade / Port / Customs

## 41.1 Verified operational chain

The Bureau of Customs' current importation guidance provides an evidence-backed operational sequence:

```text
IMPORTER / ENTITY ACCREDITATION
        ↓
GOODS DECLARATION
        ↓
DOCUMENTARY / NON-INTRUSIVE / PHYSICAL EXAMINATION
        ↓
DUTY / TAX / CHARGE ASSESSMENT
        ↓
PAYMENT OR SECUREMENT OF PAYMENT
        ↓
CUSTOMS CLEARANCE / RELEASE INSTRUCTION
        ↓
POST-CLEARANCE AUDIT
```

BOC states that assessment may include customs duties, internal revenue taxes, trade-remedy measures and other lawful charges; payment is made through authorized facilities; and release instructions follow payment/security and compliance with applicable requirements. BOC also states that post-clearance audit can verify declarations, classification, valuation, payment, and compliance after release. citeturn591750search0turn591750search3

## 41.2 eGovTrace control points

```text
C01 ENTITY ACCREDITATION
C02 DECLARATION LODGMENT
C03 DOCUMENT VERIFICATION
C04 RISK / SELECTIVITY DECISION
C05 PHYSICAL / SCANNING EXAMINATION
C06 TARIFF CLASSIFICATION
C07 CUSTOMS VALUATION
C08 DUTY / TAX ASSESSMENT
C09 PAYMENT
C10 RELEASE AUTHORIZATION
C11 POST-CLEARANCE AUDIT
C12 PROTEST / REVIEW
```

Potential cross-system bridges include:

```text
IMPORTER
 ↕
DTI / SEC / CDA business identity
 ↕
BIR tax identity
 ↕
BOC importer accreditation / declaration
 ↕
PORT / AIRPORT OPERATING RECORD
 ↕
PAYMENT / TREASURY / BANK EVIDENCE
```

These are **candidate bridges until a specific record-level test confirms them**.

## 41.3 Operational risk signals to test

The current evidence supports testing for, among others:

```text
assessment changed after initial determination
classification changes without documented basis
valuation changes without documented basis
inspection / selectivity decision inconsistent with recorded risk process
release without recoverable payment / security evidence
repeated manual or exceptional handling
unexplained processing-time outliers
post-clearance findings that materially conflict with earlier declared state
```

These are research signals only. They do not establish corruption.

## 41.4 Current modernization relevance

BOC's 2026 reform materials describe an Integrated Customs Processing System intended to automate imports, exports, transit, risk assessment and digital payments, alongside the National Single Window. This strengthens the rationale for an eGovTrace integration layer because the underlying government process is itself becoming more digital and cross-system. citeturn591750search10turn591750search12

BOC also issued a 2026 directive reducing the stated turnaround time for complete Import Assessment Service valuation requests from five to three working days. This creates a concrete example of a measurable operational control/service-standard field that eGovTrace can eventually compare against actual event timestamps where lawful records are available. citeturn591750search1

---

# 42. Vertical Trace B — Airport / Transport

## 42.1 Verified CAAP operational surface

CAAP's published services and offices establish several recurring control processes relevant to eGovTrace, including:

```text
AIR OPERATOR CERTIFICATION
↓
INITIAL EVALUATION / INSPECTION
↓
CERTIFICATION
↓
CONTINUED SURVEILLANCE
```

and:

```text
AIRPORT PLANNING
↓
BUDGETARY COSTING
↓
PRIORITY PROJECT IDENTIFICATION
↓
DETAILED ENGINEERING
↓
PROJECT IMPLEMENTATION / SUPERVISION
↓
AIRPORT INSPECTION / MONITORING
```

CAAP's current published functions also include operational permits/authorizations, flight operations inspection, regulatory compliance, fee collection records, airport master planning, project implementation, and regular airport inspection/monitoring. citeturn591750search2

## 42.2 eGovTrace control chain

```text
REGULATORY APPLICATION
      ↓
DOCUMENT REVIEW
      ↓
INSPECTION / TECHNICAL EVALUATION
      ↓
CERTIFICATION / PERMIT / AUTHORIZATION
      ↓
SURVEILLANCE
      ↓
COMPLIANCE ACTION / REVIEW
```

For airport infrastructure:

```text
AIRPORT REQUIREMENT
      ↓
PLAN / PRIORITY
      ↓
BUDGET
      ↓
PROCUREMENT / CONTRACT
      ↓
ENGINEERING
      ↓
CONSTRUCTION / REPAIR
      ↓
INSPECTION
      ↓
OPERATION
      ↓
PASSENGER / CARGO CAPACITY
```

The second chain connects directly to the existing eGovTrace project lifecycle, while the first shows why **daily regulatory operations** must also exist as first-class graph objects.

---

# 43. Vertical Trace C — LGU Daily Operations

## 43.1 Verified LGU operational surface

A current 2026 DILG regional implementation document confirms active LGU-facing systems and reporting workflows for Ease of Doing Business monitoring, with participation by Business Permit and Licensing Officers, Building Officials, Planning and Development Coordinators, IT Officers, and DILG local-government personnel. This provides a concrete evidence base for treating LGU daily operations as multi-office workflows rather than a single "LGU" record. citeturn591750search6

## 43.2 Initial LGU process graph

```text
BUSINESS / PERSON
      ↓
APPLICATION
      ↓
BUSINESS / ENTITY IDENTITY
      ↓
ZONING / PLANNING CHECK
      ↓
DOCUMENT / REQUIREMENT REVIEW
      ↓
BUILDING / FIRE / HEALTH / OTHER CHECKS
      ↓
ASSESSMENT OF TAX / FEE / CHARGE
      ↓
PAYMENT
      ↓
PERMIT RELEASE
      ↓
INSPECTION / MONITORING
      ↓
RENEWAL / SUSPENSION / ENFORCEMENT
```

The exact offices and legal requirements vary by LGU. eGovTrace therefore must preserve the local process definition instead of imposing a single national workflow where the law does not support one.

## 43.3 Cross-system identity opportunity

```text
DTI BUSINESS NAME / SEC ENTITY / CDA COOPERATIVE
                 ↕
               BIR
                 ↕
                LGU
        ↙        ↓        ↘
    ZONING    PERMIT    INSPECTION
                 ↕
              PAYMENT
```

A future record-level test should determine which identifiers can lawfully and reliably bridge these systems. No bridge is presumed merely because the same business name appears in multiple databases.

---

# 44. First Cross-Vertical Control Model

The three traces demonstrate that eGovTrace needs a generalized operational object model that can represent both **continuous administrative processes** and **one-time public interventions**.

```text
                    GOVERNMENT ACTOR
                           ↓
                       LEGAL POWER
                           ↓
                         PROCESS
                           ↓
                     CONTROL POINT
                           ↓
                     EVENT / ACTION
                           ↓
                         RECORD
                           ↓
                   DECISION / OUTPUT
                           ↓
                MONEY / ASSET / SERVICE /
                  REGULATORY RESULT
                           ↓
                        OUTCOME
                           ↓
                  REVIEW / AUDIT / APPEAL
```

A project graph and an operational graph therefore share common primitives:

```text
ACTOR
AUTHORITY
ENTITY
IDENTIFIER
PROCESS
EVENT
CONTROL
RECORD
MONEY
ASSET
SERVICE
DECISION
OUTCOME
EVIDENCE
REVIEW
```

This is an **architectural extension**, not a replacement of the frozen G0/G1/G2 ontology.

---

# 45. Initial Cross-Government Accountability Signal Catalogue

The first executed pass establishes the following signal families for future empirical testing:

```text
IDENTITY
  duplicate / conflicting identities
  unexplained identity changes
  unresolved entity joins

AUTHORITY
  action outside stated role
  approval without recoverable authority basis
  incompatible authority sequence

PROCESS
  required step not evidenced
  step performed out of expected order
  unexplained exception / override
  unusual processing-time outlier

MONEY
  assessment/payment mismatch
  payment instruction without settlement evidence
  unexplained amount change
  unreconciled collection / remittance

PROCUREMENT
  unusual vendor concentration
  unexplained specification change
  inconsistent bidder / supplier representation
  contract-to-delivery mismatch

ASSET / PROJECT
  completion claim without independently recoverable evidence
  project identity bridge unresolved
  asset output inconsistent with documented intervention

SERVICE DELIVERY
  beneficiary/eligibility conflict
  service recorded without supporting event
  repeated unexplained manual intervention

REGULATION / ENFORCEMENT
  inconsistent treatment across comparable records
  enforcement outcome inconsistent with documented basis
  penalty/collection mismatch

PERSONNEL
  authority/access mismatch
  unexplained concentration of sensitive decisions
  qualification / appointment inconsistency

EVIDENCE
  missing required record
  contradictory records
  record version changed without preserved history
  source unavailable
```

Every signal has to remain classified as one of:

```text
OBSERVATION
ANOMALY
CONTROL BREAK
UNRESOLVED RELATIONSHIP
EVIDENCE GAP
REVIEW CANDIDATE
```

Never automatically:

```text
CORRUPT
FRAUDULENT
GUILTY
```

This preserves the architecture's existing requirement that anomaly/control-break outputs proceed toward evidence and authorized review rather than direct accusations. fileciteturn2file1L154-L192

---

# 46. Execution Outcome

### What is now established

1. **Institutional universe:** a current 2026 national baseline exists and can be used as the seed population for normalization. citeturn206170search0turn206170search18
2. **Tier 1 backbone:** cross-cutting accountability roles can be represented independently of agency ownership.
3. **Trade/customs:** a real end-to-end operational control chain is documented by BOC and is directly suitable for eGovTrace process/control modeling. citeturn591750search0turn591750search3
4. **Airport/transport:** CAAP's published functions demonstrate recurring certification, inspection, surveillance, planning, project, and operational control states. citeturn591750search2
5. **LGU daily operations:** DILG's current EODB monitoring workflow demonstrates multi-office local operational processes suitable for cross-system mapping. citeturn591750search6

### What is not yet established

```text
NO complete national institution-by-institution process catalogue
NO complete identifier registry
NO universal cross-system API access
NO universal real-time financial integration
NO universal person-level graph
NO legal authorization for every prospective data join
NO automatic corruption-detection classifier
NO final national website implementation approval
```

These remain deliberate research gaps, consistent with the approved architecture's distinction between architectural plausibility and empirical proof. fileciteturn2file3L406-L421

---

# 47. Next Research Action

The initial inventory pass is complete enough to move from **conceptual coverage** toward **record-level trace experiments**.

The next research sequence should be:

```text
A. SELECT ONE REAL PORT / CUSTOMS TRANSACTION TRACE
        ↓
B. SELECT ONE REAL AIRPORT / TRANSPORT OPERATION OR PROJECT TRACE
        ↓
C. SELECT ONE REAL LGU BUSINESS-PERMIT / DAILY-OPERATION TRACE
        ↓
D. TEST ACTUAL IDENTIFIERS AND EVIDENCE BRIDGES
        ↓
E. CLASSIFY CONFIRMED / CANDIDATE / REJECTED / UNRESOLVED
        ↓
F. UPDATE THE OPERATIONAL CONTROL MODEL ONLY WHERE EVIDENCE REQUIRES IT
```

The pending DPWH FOI remains a **separate Case A evidence channel**. It can continue in parallel and may strengthen or weaken the project/financial trace, but it is no longer a prerequisite for broadening the national eGovTrace operational model.

---

# 48. Research Decision

**DECISION:** PROCEED.

The first institutional universe + operational-process + control-point pass has been executed for the requested Tier 1 backbone and the three initial verticals:

```text
✓ CROSS-GOVERNMENT BACKBONE
✓ TRADE / PORT / CUSTOMS
✓ AIRPORT / TRANSPORT
✓ LGU DAILY OPERATIONS
```

**Status of this artifact:** `EXECUTED — INITIAL NATIONAL INVENTORY PASS`  
**Formal G0–G6 change:** `NONE`  
**Case A / DPWH FOI dependency:** `NONE FOR THIS PASS`  
**Implementation approval:** `NOT YET GRANTED`

---

# 49. Record-Level Vertical Trace Execution — September 2026

**Status:** EXECUTED — RECORD-LEVEL PILOT PASS 01  
**Research date:** 2026-09-05  
**Formal G0–G6 change:** NONE  
**Purpose:** Test whether the national operational-control model can connect real records, identifiers, events, documents, actors, and control states across three non-DPWH verticals.

This pass deliberately uses publicly recoverable records. It does not assume access to restricted operational databases. Where a downstream record cannot be publicly recovered, the relationship is classified as **NOT ESTABLISHED** or **UNRESOLVED**, not as absent or false.

The three traces are:

```text
TRACE A  PORT / CUSTOMS
TRACE B  AIRPORT / TRANSPORT
TRACE C  LGU DAILY OPERATION / BUSINESS-PERMIT TECHNOLOGY
```

## 49.1 Trace result at a glance

| Trace | Real anchor | Strongest recovered bridge | Current endpoint | Main gap |
|---|---|---|---|---|
| Port/customs | B/L `BCC0262042` | BOC Port of Manila unfiled-container record + discharge date + consignee | Notice-to-file-entry state | Goods declaration, assessment, payment, release not publicly joined |
| Airport/transport | Bid `24-076-10 ALPHA` | CAAP bid record → BAC Resolution `2024-0910-258` → NOA → Contract Agreement | Contract state | NTP and financial execution/physical completion not publicly joined in this pass |
| LGU daily operations | Project `CAO(BPLD)-25-IT-0272` / Contract `GS-2503015` | QC public notice → NOA/NTP/Resolution/Contract → operational BOSS/permit-system scope | Contract + operational-system specification | Individual citizen transaction records and payment/approval event logs are not public |

---

# 50. TRACE A — PORT / CUSTOMS TRANSACTION

## 50.1 Selected real transaction anchor

**Source institution:** Bureau of Customs — Port of Manila  
**Record type:** Unfiled containerized import / notice-to-file-entry record  
**Source record date:** 04 June 2026  
**Selected row:** No. `260`  
**Bill of Lading:** `BCC0262042`  
**Discharge date:** `2026-06-02`  
**Consignee:** `COCA COLA EUROPACIFIC ABOITIZ`  
**Party to notify:** `COCA COLA EUROPACIFIC ABOITIZ`

BOC's published notice identifies the shipment by Bill of Lading and records that it had been discharged at the Port of Manila without a corresponding goods declaration having been lodged/filed at the time of the notice.

**Primary record:** `04JUNE26-POM-UNFILED-CONT-CONSUMPTION.pdf`

## 50.2 Identifier chain recovered

```text
BOC COLLECTION DISTRICT / PORT OF MANILA
            ↓
B/L = BCC0262042
            ↓
DISCHARGED = 2026-06-02
            ↓
CONSIGNEE = COCA COLA EUROPACIFIC ABOITIZ
            ↓
UNFILED / NO CORRESPONDING GOODS DECLARATION OBSERVED IN THE NOTICE
            ↓
NOTICE TO FILE ENTRY / PAY DUTIES & TAXES / CLAIM GOODS
```

This is a materially different identity model from the FMR trace. The primary transaction anchor is not a project code; it is a **transport/commercial document identifier (B/L)** tied to a customs event.

## 50.3 Process bridge

BOC's published importation process provides the expected administrative chain:

```text
CARRYING VESSEL / AIRCRAFT ENTERS PHILIPPINE TERRITORY
        ↓
GOODS DECLARATION
        ↓
CUSTOMS SELECTIVITY / DOCUMENTARY OR PHYSICAL CONTROL
        ↓
DUTY / TAX ASSESSMENT
        ↓
PAYMENT / CLEARANCE
        ↓
ELECTRONIC RELEASE INSTRUCTION
        ↓
PORT OPERATOR / AIRPORT TRANSIT FACILITY RELEASE
```

The public transaction record lets eGovTrace anchor the first part of this lifecycle to a real B/L and discharge event. BOC's own process documentation states that payment/clearance precedes electronic release instructions to the port or airport facility.

## 50.4 Evidence adjudication

| Relationship | Status | Basis |
|---|---|---|
| Port of Manila → B/L `BCC0262042` | CONFIRMED | BOC primary public record |
| B/L → discharge date `2026-06-02` | CONFIRMED | BOC primary public record |
| B/L → named consignee | CONFIRMED | BOC primary public record |
| Discharge → goods declaration filing status at notice time | CONFIRMED | BOC notice expressly identifies the shipment as lacking corresponding filed declaration |
| B/L → specific goods declaration number | NOT ESTABLISHED | Not recovered in the public record searched |
| B/L → customs assessment | NOT ESTABLISHED | Not recovered |
| B/L → actual duty/tax payment settlement | NOT ESTABLISHED | Not recovered |
| B/L → release instruction | NOT ESTABLISHED | Not recovered |
| B/L → physical release event | NOT ESTABLISHED | Not recovered |

## 50.5 What eGovTrace learns from this trace

The operational graph must support a transaction identity model like:

```text
TRANSACTION
  ├── transport_document_id
  ├── discharge_event
  ├── declaration_id
  ├── assessment_id
  ├── payment_reference
  ├── release_instruction
  ├── release_event
  └── review / enforcement state
```

Most importantly, the graph must not collapse `B/L`, `goods declaration`, `assessment`, `payment`, and `release` into one generic transaction number. They are distinct representations that must be linked by explicit evidence.

## 50.6 Control-signal candidates

The selected record is **not itself a corruption finding**. A properly designed system could use it as an operational control state:

```text
DISCHARGED SHIPMENT
        +
NO GOODS DECLARATION OBSERVED IN NOTICE
        ↓
OPEN COMPLIANCE / CONTROL STATE
```

This may become an investigation/review candidate if later evidence establishes that required filing, payment, clearance, or release events occurred inconsistently with the documented process. The present record alone does not establish misconduct.

---

# 51. TRACE B — AIRPORT / TRANSPORT PROJECT-TO-CONTRACT RECORD

## 51.1 Selected real record

**Institution:** Civil Aviation Authority of the Philippines (CAAP)  
**Project:** `Asphalt Overlay of Runway at Naga Airport (Re-bid)`  
**Bid identifier:** `24-076-10 ALPHA`  
**Awarded contractor:** `E. Garcia Construction Corporation`  
**Contract price:** `PHP71,525,446.15`

CAAP's public procurement records list the project and preserve its procurement-document chain. The CAAP BAC resolution identifies the contractor as the Single Calculated and Responsive Bidder and recommends award at the stated contract amount.

## 51.2 Record chain recovered

```text
CAAP PROJECT
24-076-10 ALPHA
        ↓
BIDDING DOCUMENTS
        ↓
BAC RESOLUTION
2024-0910-258 (Alpha)
        ↓
RECOMMENDATION FOR AWARD
        ↓
NOTICE OF AWARD
20 JAN 2025
        ↓
E. GARCIA CONSTRUCTION CORPORATION
        ↓
CONTRACT AGREEMENT
        ↓
[ NTP / IMPLEMENTATION / INSPECTION / ACCEPTANCE ]
        ↓
[ FINANCIAL EXECUTION / SETTLEMENT ]
```

The CAAP website currently exposes the project-specific Contract Agreement and the procurement page separately; the Contract Agreement is the key bridge from procurement identity into the legal commitment stage.

## 51.3 Evidence recovered

### Procurement identity

`24-076-10 ALPHA` is repeatedly used by CAAP to identify the Naga Airport runway project across bid-related documents and the re-bid award.

### Award decision

CAAP BAC Resolution No. `2024-0910-258 (Alpha)` states that E. Garcia Construction Corporation was recommended for award after post-qualification as the Single Calculated and Responsive Bid at `PHP71,525,446.15`.

### Notice of Award

The public NOA is dated `20 January 2025` and awards the project to E. Garcia Construction Corporation at the same contract price.

### Contract Agreement

CAAP publicly lists a Contract Agreement for the same Naga Airport project, creating a strong project → procurement → award → contract bridge.

## 51.4 Evidence adjudication

| Relationship | Status | Basis |
|---|---|---|
| Project title ↔ Bid `24-076-10 ALPHA` | CONFIRMED | CAAP procurement records |
| Bid `24-076-10 ALPHA` ↔ BAC Resolution `2024-0910-258` | CONFIRMED | CAAP BAC resolution |
| BAC Resolution ↔ E. Garcia Construction Corporation | CONFIRMED | CAAP BAC resolution |
| BAC Resolution ↔ `PHP71,525,446.15` | CONFIRMED | CAAP BAC resolution |
| Project ↔ NOA | CONFIRMED | CAAP NOA |
| Project ↔ Contract Agreement | CONFIRMED | CAAP public Contract Agreement listing |
| Contract ↔ NTP | NOT ESTABLISHED IN THIS PASS | NTP was not independently recovered as a record with sufficient contents |
| Contract ↔ obligation / disbursement | NOT ESTABLISHED | No financial execution record recovered |
| Contract ↔ settlement | NOT ESTABLISHED | No settlement record recovered |
| Contract ↔ physical completion | NOT ESTABLISHED | No completion/acceptance record recovered in this pass |

## 51.5 Control-point model demonstrated

The trace confirms that airport infrastructure can be modeled with the same general accountability backbone as other public procurement, while introducing aviation-specific operational nodes:

```text
PROJECT
  ↓
PROCUREMENT ID
  ↓
BAC / POST-QUALIFICATION
  ↓
AWARD
  ↓
CONTRACT
  ↓
NOTICE TO PROCEED
  ↓
RUNWAY / AIRSIDE ASSET
  ↓
INSPECTION / ACCEPTANCE
  ↓
AERODROME OPERATIONAL STATE
  ↓
PASSENGER / CARGO / SAFETY OUTCOME
```

CAAP's current transparency environment separately publishes infrastructure projects, public funds, procurement plans, contract awards, project-status information, airport movements, and regulatory/approval material. That separation is exactly the sort of fragmentation eGovTrace is designed to reconcile.

## 51.6 Important finding

The airport trace demonstrates that **a procurement identifier can be very strong internally while still not being a universal cross-government identity**.

`24-076-10 ALPHA` is a reliable CAAP procurement/project anchor for this trace, but eGovTrace should not assume that the same identifier will appear in DBM, accounting, airport operations, contractor records, or external regulatory systems. Those bridges must be separately proven.

---

# 52. TRACE C — LGU DAILY OPERATION / BUSINESS-PERMIT CONTROL ENVIRONMENT

## 52.1 Selected real LGU record

**LGU:** Quezon City Government  
**Operating domain:** Business permits / occupational permits / inspection / retirement  
**Project identifier:** `CAO(BPLD)-25-IT-0272`  
**Contract identifier:** `GS-2503015`  
**Service provider:** `SANDMAN SOFTWARE SYSTEMS, INC.`  
**Contract price:** `PHP8,700,000.00` inclusive of VAT

The selected record is a procurement/contract record for the system that supports daily BPLD operations. It is therefore an appropriate public-record proxy for a daily-operation trace while avoiding exposure of individual citizens' private transaction data.

## 52.2 Operational scope recovered

The 2026 Quezon City procurement documents describe an integrated BOSS system covering:

```text
BUSINESS PERMIT
INSPECTION AUDIT
OCCUPATIONAL PERMIT
LIQUOR PERMIT
RETIREMENT PORTAL
```

The stated project objective includes integration of internal and third-party online systems and feature changes/upgrades to the online modules.

## 52.3 Record chain recovered

```text
QC BPLD OPERATIONAL REQUIREMENT
        ↓
PROJECT NO.
CAO(BPLD)-25-IT-0272
        ↓
COMPETITIVE BIDDING
        ↓
NOTICE OF AWARD
GS-2503015
        ↓
CONTRACT AGREEMENT
GS-2503015
        ↓
NTP
GS-2503015
        ↓
SYSTEM DEVELOPMENT / TESTING / DEPLOYMENT
        ↓
BOSS / PERMIT / INSPECTION / OCCUPATIONAL / LIQUOR / RETIREMENT
OPERATIONS
```

The Contract Agreement states that the work begins from the NTP and sets a 30-calendar-day development/testing period, followed by a one-year warranty and technical support period. It also defines milestone-based payment tied to completed work and actual services rendered.

## 52.4 Real operational identifiers exposed by the public architecture

The daily permit process itself has explicit cross-system anchors even where the individual values are not publicly exposed:

```text
MAYOR'S PERMIT NUMBER
        ↕
BUSINESS TAX OFFICIAL RECEIPT
        ↕
BUSINESS / ESTABLISHMENT RECORD
        ↕
BPLD APPLICATION
        ↕
ZONING / ASSESSOR / ANCILLARY REVIEW
        ↕
PAYMENT
        ↕
PERMIT RELEASE
```

Quezon City's published renewal process explicitly requires a Mayor's Permit Number and current-year business-tax Official Receipt for online renewal. Its new-business guidance states that submitted applications are evaluated by BPLD, Zoning Administration, the City Assessor, and applicable ancillary offices, with a published estimated processing time of 1–3 days.

## 52.5 Evidence adjudication

| Relationship | Status | Basis |
|---|---|---|
| QC BPLD operational requirement ↔ Project `CAO(BPLD)-25-IT-0272` | CONFIRMED | QC procurement documents |
| Project ↔ Contract `GS-2503015` | CONFIRMED | QC Contract Agreement |
| Contract ↔ Sandman Software Systems, Inc. | CONFIRMED | QC Contract Agreement |
| Contract ↔ `PHP8.7M` | CONFIRMED | QC Contract Agreement |
| Contract ↔ NTP | CONFIRMED | Contract incorporates NTP; contract states NTP start date of 04 April 2025 |
| Project ↔ BOSS / permit / inspection operations | CONFIRMED | Procurement specification and operational pages |
| Individual citizen application ↔ specific permit record | NOT ESTABLISHED | Individual transaction data is not publicly exposed in the searched evidence |
| Permit ↔ actual tax payment settlement | NOT ESTABLISHED at person/transaction level | Public guidance identifies the required OR but does not expose individual transaction values |
| Individual inspection event ↔ inspector/event log | NOT ESTABLISHED | No public transaction log recovered |
| Individual approval ↔ responsible officer action log | NOT ESTABLISHED | No public action-level transaction audit trail recovered |

## 52.6 Why this trace matters for corruption-control research

This is where eGovTrace becomes more than a project tracker.

A daily government transaction can be modeled as:

```text
APPLICATION
   ↓
IDENTITY / BUSINESS RECORD
   ↓
DOCUMENTS
   ↓
ASSESSMENT
   ↓
ANCILLARY REVIEW
   ↓
INSPECTION / COMPLIANCE
   ↓
TAX / FEE COMPUTATION
   ↓
PAYMENT
   ↓
APPROVAL / DENIAL
   ↓
PERMIT RELEASE
   ↓
DELIVERY / SERVICE
```

The graph can later preserve the corresponding event IDs, timestamps, responsible role, document versions, payments, exceptions, overrides, and reviewer actions.

The correct analytical output is not:

```text
OFFICER X = CORRUPT
```

It is:

```text
TRANSACTION
  ↓
EXPECTED CONTROL
  ↓
OBSERVED EVENT
  ↓
VARIANCE / EXCEPTION
  ↓
EVIDENCE GAP OR CONTROL BREAK
  ↓
REVIEW CANDIDATE
```

---

# 53. Cross-Trace Findings

The three verticals expose three different identity patterns:

```text
FMR / INFRASTRUCTURE
    = PROJECT / PROCUREMENT / BUDGET IDENTITY

PORT / CUSTOMS
    = TRANSPORT DOCUMENT / DISCHARGE / DECLARATION IDENTITY

LGU DAILY OPERATION
    = APPLICATION / PERMIT / OR / SERVICE-EVENT IDENTITY
```

This is a critical result for the national ontology.

## 53.1 One universal transaction ID is not enough

The experiment provides no basis for assuming that the Philippine State already has one universal identifier spanning every public transaction.

Instead, eGovTrace must support **domain-native identifiers** and then create explicit evidence-backed bridge relationships between them.

## 53.2 The bridge object becomes a first-class entity

A recommended abstraction is:

```text
IDENTITY_BRIDGE
----------------
bridge_id
source_record_id
source_system
source_record_type
target_record_id
target_system
target_record_type
relationship_type
evidence_basis
evidence_source
confidence_state
observed_at
effective_from
effective_to
adjudication_status
review_notes
```

Examples:

```text
B/L → GOODS DECLARATION
BID ID → CONTRACT
PROJECT → PROCUREMENT
CONTRACT → NTP
MAYOR'S PERMIT NO. → BUSINESS TAX OR
BUSINESS APPLICATION → INSPECTION EVENT
PAYMENT REFERENCE → PERMIT / TAX OBLIGATION
```

## 53.3 Operational control state must be modeled separately from corruption state

The traces support a stronger architecture for the operational-control layer:

```text
EXPECTED CONTROL
       ↓
OBSERVED RECORD
       ↓
CONTROL STATE
       ↓
VARIANCE
       ↓
EVIDENCE GAP / ANOMALY / CONTROL BREAK
       ↓
AUTHORIZED REVIEW
       ↓
FINDING / CORRECTIVE ACTION / CASE OUTCOME
```

There must be **no direct edge**:

```text
ANOMALY → CORRUPT PERSON
```

---

# 54. New eGovTrace Data Requirements Revealed by the Pilot

The actual traces justify adding the following capabilities to the operational-control implementation model.

## 54.1 Event ledger

Every operational action should be representable as a time-stamped event:

```text
event_id
actor
role
authority
process
transaction
object
before_state
after_state
timestamp
effective_time
source_record
source_system
```

## 54.2 Exception / override ledger

Government operations frequently depend on exceptions. eGovTrace should therefore explicitly model:

```text
exception_id
transaction_id
control_rule
reason
requesting_actor
approving_actor
authority_basis
date
supporting_document
result
```

This is more useful for accountability than simply counting transactions.

## 54.3 Payment-to-service bridge

The traces demonstrate why a payment record cannot be treated as proof that the underlying government service was properly delivered.

The model should support:

```text
OBLIGATION / TAX / FEE
        ↓
PAYMENT INSTRUCTION
        ↓
PAYMENT SETTLEMENT
        ↓
SERVICE / PERMIT / RELEASE
```

Each edge must be independently evidenced.

## 54.4 Queue and timing model

For daily government operations, eGovTrace should eventually preserve:

```text
received_at
validated_at
assigned_at
inspection_at
assessment_at
payment_at
decision_at
released_at
completed_at
```

This makes unexplained delays, preferential acceleration, repeated returns, and bottlenecks testable without declaring them fraudulent.

## 54.5 Role-authority model

An event should identify not only the employee but also the authority under which that employee acted:

```text
PERSON
  ↓
POSITION
  ↓
OFFICE
  ↓
ROLE
  ↓
DELEGATED AUTHORITY
  ↓
TRANSACTION ACTION
```

This is essential when one transaction is processed by multiple offices.

---

# 55. What This Pilot Has Actually Proven

The pilot **does not prove that corruption has occurred** in any of the selected records.

It proves something more useful for eGovTrace architecture:

### Proven at pilot level

```text
✓ REAL PUBLIC RECORDS CAN SERVE AS OPERATIONAL ANCHORS.
✓ DIFFERENT DOMAINS USE DIFFERENT NATIVE IDENTIFIERS.
✓ PROCUREMENT RECORDS CAN SOMETIMES BE JOINED THROUGH MULTIPLE DOCUMENT TYPES.
✓ CUSTOMS TRANSACTIONS CAN BE ANCHORED TO TRANSPORT DOCUMENTS AND DISCHARGE EVENTS.
✓ LGU DAILY OPERATIONS CONTAIN MULTI-OFFICE, MULTI-RECORD TRANSACTION CHAINS.
✓ CONTROL STATES CAN BE MODELED WITHOUT CALLING THE ACTOR CORRUPT.
✓ PUBLICLY VISIBLE RECORDS OFTEN END BEFORE THE FULL OPERATIONAL OR FINANCIAL LIFECYCLE.
```

### Not proven yet

```text
✗ UNIVERSAL NATIONAL IDENTIFIER
✗ UNIVERSAL REAL-TIME EVENT STREAM
✗ COMPLETE FINANCIAL EXECUTION VISIBILITY
✗ COMPLETE INDIVIDUAL-TRANSACTION LOG VISIBILITY
✗ UNIVERSAL CROSS-AGENCY API ACCESS
✗ AUTOMATED CORRUPTION DETECTION
✗ LEGAL AUTHORITY FOR EVERY POSSIBLE DATA JOIN
```

---

# 56. Research Decision After Record-Level Pilot 01

**DECISION:** `PASS — ARCHITECTURAL GENERALIZATION SUPPORTED, FULL NATIONAL OPERABILITY NOT YET PROVEN`

The three vertical traces support retaining the national operational-control model and extending the core graph with:

```text
1. DOMAIN-NATIVE IDENTIFIERS
2. FIRST-CLASS IDENTITY BRIDGES
3. EVENT LEDGER
4. EXCEPTION / OVERRIDE LEDGER
5. CONTROL-STATE MODEL
6. QUEUE / TIMING MODEL
7. ROLE + DELEGATED-AUTHORITY MODEL
8. PAYMENT-TO-SERVICE RECONCILIATION
9. DOMAIN-SPECIFIC EVIDENCE CUSTODY
```

No G0–G6 gate is created or rescored by this result.

The pending DPWH FOI remains independent and should be adjudicated when received.

---

# 57. Source Record Index

## Trace A — BOC / Port of Manila

- BOC — `PORT OF MANILA UNFILED CONTAINERIZED`, `04JUNE26-POM-UNFILED-CONT-CONSUMPTION.pdf`
- Selected row: No. `260`, B/L `BCC0262042`, discharged `2026-06-02`, consignee `COCA COLA EUROPACIFIC ABOITIZ`
- BOC Guidelines on Importation
- BOC Process of Importation

## Trace B — CAAP / Naga Airport

- CAAP Bid No. `24-076-10 ALPHA` — Asphalt Overlay of Runway at Naga Airport (Re-bid)
- CAAP BAC Resolution No. `2024-0910-258 (Alpha)`
- CAAP Notice of Award dated `2025-01-20`
- CAAP Contract Agreement — Asphalt Overlay of Runway at Naga Airport (Re-bid)

## Trace C — Quezon City LGU

- Project No. `CAO(BPLD)-25-IT-0272`
- Contract `GS-2503015`
- QC public notice exposing NOA/NTP/Resolution/Contract records
- Contract price `PHP8,700,000.00`
- Current QC business-permit / BOSS operating guidance
- QC procurement specification for integrated BOSS online modules

---

# 58. Evidence Discipline Reminder

The pilot reinforces the existing frozen eGovTrace rules:

```text
IDENTIFIER RECOVERY ≠ IDENTIFIER PROOF
NOT OBSERVED ≠ ABSENT
UNAVAILABLE ≠ FALSE
PAYMENT-INSTRUCTION EVIDENCE ≠ PAYMENT-SETTLEMENT EVIDENCE
PUBLIC DISCLOSURE ≠ INVESTIGATIVE AUTHORITY
AI OUTPUT ≠ FACT OR LEGAL DETERMINATION
CONNECTION ≠ CORRUPTION
CONTROL BREAK ≠ CORRUPTION
```

The operational-control graph is therefore an **accountability and assurance instrument**, not a public accusation engine.

---

# 55. Cross-Trace Anomaly / Control Testing — September 2026

**Status:** EXECUTED — CROSS-VERTICAL CONTROL TEST PASS 01  
**Research date:** 2026-09-05  
**Formal G0–G6 change:** NONE  
**Purpose:** Test whether the three real record-level traces can generate useful control signals, exceptions, inconsistencies, and evidence-gap states without converting those signals into accusations of corruption or misconduct.

This pass is intentionally conservative. A signal is only emitted when the available evidence supports the underlying control question. Where a required record is not publicly available, the result is **NOT TESTABLE** or **EVIDENCE GAP**, not a negative finding.

The governing analytical chain is:

```text
EXPECTED CONTROL
      ↓
OBSERVABLE RECORD / EVENT
      ↓
COMPARISON
      ↓
VARIANCE
      ↓
CONTROL SIGNAL
      ↓
EVIDENCE ACQUISITION / AUTHORIZED REVIEW
      ↓
POSSIBLE FINDING
```

The system must never shortcut this into:

```text
VARIANCE → CORRUPTION
```

This follows the approved eGovTrace rule that outputs should remain anomaly, control break, unresolved relationship, risk signal, or review candidate rather than "corrupt", "fraudulent", or "guilty". fileciteturn2file1L154-L192

---

# 56. Control-Signal Taxonomy

The first cross-trace pilot uses six signal classes.

| Signal class | Meaning | Example | What it does NOT mean |
|---|---|---|---|
| EVIDENCE_GAP | Expected supporting record could not be recovered | Contract exists but execution/payment record is not publicly linked | Payment did not occur |
| IDENTITY_DISCONTINUITY | A lifecycle stage has no proven bridge to the next stage | B/L identified but no goods-declaration ID recovered | Declaration never existed |
| CONTROL_STATE_OPEN | A transaction is visibly in an unresolved control state | Shipment discharged and listed as unfiled in BOC notice | Official wrongdoing |
| CONTROL_SEQUENCE_EXCEPTION | Observed events appear out of expected order or timing | Payment appears before required approval, if proven | Fraud |
| RECONCILIATION_MISMATCH | Two authoritative records conflict on a material field | Contract amount differs across authoritative records without explanation | Embezzlement |
| PATTERN_SIGNAL | Repeated structure across multiple cases suggests concentration or unusual behavior | Same contractor repeatedly linked to similar awards | Collusion |

Only the first three can be demonstrated strongly with the present three-case dataset. The latter three require either additional cases or deeper records.

---

# 57. Pre-Registered Control Tests

## CT-01 — Lifecycle continuity

**Question:** Can the transaction be followed from its anchor identifier into the next legally/operationally expected stage?

```text
ANCHOR
  ↓
NEXT EXPECTED RECORD
```

**Signal:** `IDENTITY_DISCONTINUITY` when no evidentiary bridge is recovered.

Important: this is a test of **traceability**, not existence.

## CT-02 — Required-control evidence

**Question:** Is there recoverable evidence for a control that should normally be observable at this lifecycle stage?

**Signal:** `EVIDENCE_GAP`.

## CT-03 — Sequence consistency

**Question:** Do the observed event timestamps respect the expected process order?

**Signal:** `CONTROL_SEQUENCE_EXCEPTION` only if both events and the applicable rule are sufficiently established.

## CT-04 — Field reconciliation

**Question:** Do the same transaction/project/contract representations agree on key identity and amount fields?

**Signal:** `RECONCILIATION_MISMATCH` only after confirming that the compared records refer to the same underlying object.

This directly operationalizes:

> IDENTIFIER RECOVERY ≠ IDENTIFIER PROOF

## CT-05 — Exception / override persistence

**Question:** Does a transaction contain an exception, override, correction, or manual intervention that remains unexplained?

**Signal:** `CONTROL_EXCEPTION_UNRESOLVED`.

## CT-06 — Cross-case pattern concentration

**Question:** Does repeated evidence across a sufficiently defined population show an unusual concentration of actors, suppliers, reviewers, locations, or outcomes?

**Signal:** `PATTERN_SIGNAL`.

A single case is not sufficient to establish a meaningful pattern.

## CT-07 — Outcome-to-action continuity

**Question:** Can the reported outcome be linked to the actual intervention or administrative action that supposedly produced it?

**Signal:** `OUTCOME_LINK_GAP`.

---

# 58. Execution Results — Trace A: Port / Customs

## 58.1 CT-01 Lifecycle continuity

**Observed anchor:** B/L `BCC0262042`  
**Observed event:** discharge at Port of Manila on `2026-06-02`  
**Observed BOC state:** shipment identified in the June 4, 2026 unfiled-container notice without a corresponding goods declaration at notice time.

**Result:** `CONTROL_STATE_OPEN` + `IDENTITY_DISCONTINUITY`

The public evidence establishes the B/L and discharge event and establishes the notice-time filing state. It does not establish the subsequent declaration identifier, assessment record, payment settlement, release instruction, or physical release event.

### Signal interpretation

```text
B/L
 ↓
DISCHARGE
 ↓
UNFILED STATE OBSERVED
 ↓
[ declaration ? ]
 ↓
[ assessment ? ]
 ↓
[ payment ? ]
 ↓
[ release ? ]
```

This is a **legitimate operational review state**, not a corruption finding.

BOC's published import process states that goods declaration, risk-based inspection/verification, assessment, payment/clearance and release occur as linked steps, and that release follows payment/clearance and compliance with applicable requirements. citeturn553407search1turn553407search9

## 58.2 CT-02 Required-control evidence

**Result:** `EVIDENCE_GAP`

Publicly recovered:

- B/L
- discharge date
- consignee
- notice-time filing status

Not publicly recovered in this pass:

- goods declaration number
- assessment record
- payment reference/settlement
- release instruction
- release event

### eGovTrace action

Do not display:

> "No payment." 

Display:

> **"Payment/settlement evidence not publicly reconciled to this B/L in the current evidence set."**

Recommended next evidence owner: BOC / authorized customs information system, subject to lawful access.

## 58.3 CT-03 Sequence consistency

**Result:** `NOT TESTABLE`

The public evidence does not contain sufficient event timestamps for the downstream declaration, assessment, payment, and release stages.

## 58.4 CT-04 Field reconciliation

**Result:** `NOT TESTABLE`

There is no independently recovered declaration or payment record to compare against the B/L.

## 58.5 CT-05 Exception / override persistence

**Result:** `NOT TESTABLE`

The selected notice establishes an unresolved filing state at publication time, but not an unauthorized exception or override.

## 58.6 CT-06 Pattern concentration

**Result:** `NOT TESTABLE`

One B/L is not a pattern population.

## 58.7 Port / customs verdict

```text
CONTROL SIGNAL PRESENT:
YES

CORRUPTION FINDING:
NO

PRIMARY SIGNAL:
OPEN CONTROL STATE + EVIDENCE / IDENTITY GAP

NEXT QUESTION:
Can the B/L be lawfully reconciled to declaration → assessment → payment → release?
```

This is exactly the kind of case eGovTrace should route for evidence acquisition rather than prematurely classify as misconduct.

---

# 59. Execution Results — Trace B: Airport / Transport

## 59.1 CT-01 Lifecycle continuity

**Anchor:** Bid `24-076-10 ALPHA`  
**Recovered:** BAC Resolution `2024-0910-258` → award → NOA → Contract Agreement.

**Result:** `PASS` through the contract stage.

The procurement identity is strong enough to establish a continuous chain through award and contract.

CAAP's current transparency environment separately publishes contract agreements, procurement monitoring reports, procurement plans, and related procurement records, making cross-document reconciliation feasible. citeturn553407search5

## 59.2 CT-02 Required-control evidence

**Result:** `EVIDENCE_GAP`

The current public trace does not independently reconcile:

```text
CONTRACT
 ↓
NTP
 ↓
IMPLEMENTATION
 ↓
INSPECTION
 ↓
ACCEPTANCE / COMPLETION
 ↓
OBLIGATION
 ↓
DISBURSEMENT / PAYMENT
```

Therefore eGovTrace should report a **contract-to-execution evidence gap**, not non-performance or non-payment.

## 59.3 CT-03 Sequence consistency

**Result:** `NOT TESTABLE`

The recovered public records do not provide enough downstream execution timestamps to test the full sequence.

## 59.4 CT-04 Field reconciliation

**Result:** `PASS` for the tested procurement identity/award amount.

The bid/procurement record, BAC resolution, NOA, and contract chain agree sufficiently on the identified project and award amount for this pass.

## 59.5 CT-05 Exception / override persistence

**Result:** `NOT TESTABLE`

No unexplained variation, override, or post-award exception was recovered in the tested public chain.

## 59.6 CT-06 Pattern concentration

**Result:** `NOT TESTABLE`

One airport project cannot establish bidder/contractor concentration or recurrence.

## 59.7 Airport / transport verdict

```text
CONTROL SIGNAL PRESENT:
YES

CORRUPTION FINDING:
NO

PRIMARY SIGNAL:
CONTRACT-TO-EXECUTION EVIDENCE GAP

CURRENT POSITIVE CONTROL RESULT:
PROCUREMENT → AWARD → CONTRACT continuity demonstrated

NEXT QUESTION:
Can the contract be reconciled into execution, inspection, acceptance, and financial settlement?
```

The existing CAAP transparency publication structure itself shows that these evidence classes can reside in separate records. eGovTrace's job is to establish the bridge, not to assume it. citeturn553407search5

---

# 60. Execution Results — Trace C: LGU Daily Operations

## 60.1 CT-01 Lifecycle continuity

**Anchor:** Project `CAO(BPLD)-25-IT-0272`  
**Contract:** `GS-2503015`

**Result:** `PASS` for procurement-to-system-scope continuity.

The public QC record connects the procurement identifier, NOA, NTP, resolution and contract, while the project specification connects the procurement to the BPLD operational systems it is intended to support. The QC public notice currently exposes NOA, NTP, resolution and contract documents for this project. citeturn553407search3

## 60.2 CT-02 Required-control evidence

**Result:** `EVIDENCE_GAP`

The missing layer is not the existence of the system contract; it is the **individual operational event trail**:

```text
CITIZEN / BUSINESS APPLICATION
 ↓
APPLICATION EVENT
 ↓
ASSESSMENT
 ↓
INSPECTION
 ↓
APPROVAL / DENIAL
 ↓
TAX / FEE PAYMENT
 ↓
PERMIT RELEASE
```

The public record does not expose individual transaction audit logs, officer-action logs, or individual payment/settlement records.

## 60.3 CT-03 Sequence consistency

**Result:** `NOT TESTABLE`

We do not have a public individual transaction event stream.

## 60.4 CT-04 Field reconciliation

**Result:** `NOT TESTABLE` at individual-transaction level.

The system architecture indicates expected identifiers such as permit numbers and official receipts, but the selected public evidence does not provide a transaction-level pair to reconcile.

## 60.5 CT-05 Exception / override persistence

**Result:** `NOT TESTABLE`

No transaction-level override record was publicly recovered.

## 60.6 CT-06 Pattern concentration

**Result:** `NOT TESTABLE`

No population of individual permit transactions was available in the tested public evidence.

## 60.7 LGU verdict

```text
CONTROL SIGNAL PRESENT:
YES

CORRUPTION FINDING:
NO

PRIMARY SIGNAL:
TRANSACTION-LEVEL AUDIT-EVIDENCE GAP

POSITIVE CONTROL RESULT:
PROCUREMENT → CONTRACT → OPERATIONAL-SYSTEM SCOPE continuity demonstrated

NEXT QUESTION:
Can authorized system logs be reconciled to applications, inspections, payments, approvals, and releases while protecting personal data?
```

The QC environment already publishes procurement records related to the BPLD's automated inspection and permit systems, including NOA, NTP and contract records, showing that the operational-control graph can anchor itself to concrete government artifacts. citeturn553407search2turn553407search6

---

# 61. Cross-Trace Comparative Matrix

| Control test | Port / Customs | Airport / Transport | LGU Daily Operation |
|---|---|---|---|
| CT-01 Lifecycle continuity | PARTIAL / open after B/L | PASS to contract | PASS to operational system |
| CT-02 Required-control evidence | EVIDENCE GAP | EVIDENCE GAP | EVIDENCE GAP |
| CT-03 Sequence consistency | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE |
| CT-04 Field reconciliation | NOT TESTABLE | PASS for tested procurement identity/amount | NOT TESTABLE at transaction level |
| CT-05 Exception/override | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE |
| CT-06 Pattern concentration | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE |
| CT-07 Outcome continuity | NOT TESTABLE | NOT TESTABLE | NOT TESTABLE |

The important result is not that all three cases are "suspicious." They are not.

The important result is that the three cases produce **different types of control observability**:

```text
PORT
= strong operational anchor, weak downstream public trace

AIRPORT
= strong procurement/contract trace, weak execution trace

LGU
= strong procurement/system trace, weak individual-transaction audit trace
```

That is a useful cross-government finding because it shows that eGovTrace's core problem is not simply "find corruption." It is to determine **where the control/evidence chain stops, why it stops, and who lawfully holds the next piece of evidence.**

---

# 62. What eGovTrace Can Actually Flag Today

Based on the three real cases, the following signal families are already defensible:

## 62.1 Missing downstream bridge

```text
KNOWN RECORD
    ↓
EXPECTED NEXT RECORD
    ↓
NO PROVEN BRIDGE
```

Example: B/L → declaration.

## 62.2 Lifecycle endpoint too early for the question being asked

Example:

```text
CONTRACT
  ✓
  ↓
EXECUTION
  ?
PAYMENT
  ?
OUTCOME
  ?
```

The system can say:

> **Trace incomplete at execution stage.**

## 62.3 Open operational control state

Example:

```text
DISCHARGED SHIPMENT
        ↓
UNFILED STATE
```

The system can say:

> **Open customs compliance state recorded by source agency.**

## 62.4 Evidence asymmetry

One side of a relationship is public while the corresponding downstream evidence is not recoverable.

This is a core eGovTrace state because the approved architecture requires the system to preserve evidence/provenance and unresolved relationships rather than manufacture certainty. fileciteturn2file4L493-L507

## 62.5 Provenance weakness

A secondary source may report that an event occurred while the primary record remains unrecovered.

The platform should preserve:

```text
DOCUMENTED AGENCY-ORIGIN SECONDARY
```

rather than silently upgrading it into:

```text
PRIMARY CONFIRMED
```

This is already required by the G4 evidence-status vocabulary. fileciteturn2file5L641-L650

---

# 63. What eGovTrace Must NOT Flag as Corruption

The pilot establishes several false-positive traps that should become explicit product rules.

### A. Missing public record

```text
NOT RECOVERED
≠
DID NOT HAPPEN
```

### B. Shared contractor

```text
SAME CONTRACTOR
≠
COLLUSION
```

### C. Manual exception

```text
MANUAL OVERRIDE
≠
IRREGULARITY
```

The system must first ask whether the override was lawful, authorized, documented and justified.

### D. Long processing time

```text
DELAY
≠
BRIBERY
```

A delay becomes analytically interesting only when the expected service standard is established, the actual timestamps are known, and comparable transactions can be considered.

### E. High-value contract

```text
LARGE VALUE
≠
OVERPRICING
```

A price anomaly requires a defensible comparator and scope normalization.

### F. Same person / company appearing across records

```text
RECURRENCE
≠
CORRUPTION
```

Recurrence becomes a pattern signal only after population-level testing and identity proof.

---

# 64. Cross-Trace Control Scorecard — Pilot

The pilot should not produce a "corruption score."

Instead, it produces a **control observability scorecard**.

| Dimension | Port / Customs | Airport / Transport | LGU Daily Operation |
|---|---:|---:|---:|
| Anchor identity strength | High | High | High |
| Cross-stage identity continuity | Low–Medium | Medium–High | Medium |
| Public downstream evidence | Low | Low–Medium | Low |
| Event-timestamp observability | Low | Low | Low |
| Financial reconciliation observability | Low | Low | Low |
| Operational-control observability | Medium | Medium | Low–Medium |
| Pattern-testing readiness | Low | Low | Low |
| Immediate defensible control signal | Yes | Yes | Yes |

These are **research observations**, not agency performance ratings and not corruption ratings.

---

# 65. Architectural Requirement Resulting From the Pilot

The cross-trace experiment justifies elevating the following object classes in the operational graph:

```text
EVENT
CONTROL_RULE
CONTROL_STATE
EXCEPTION
IDENTITY_BRIDGE
EVIDENCE_GAP
RECONCILIATION
REVIEW_CANDIDATE
CASE
RESOLUTION
```

The minimal relationship model becomes:

```text
ACTOR
  ↓
AUTHORITY
  ↓
PROCESS
  ↓
EVENT
  ↓
CONTROL_RULE
  ↓
CONTROL_STATE
  ↓
EVIDENCE
  ↓
RECONCILIATION
  ↓
SIGNAL
  ↓
REVIEW
  ↓
FINDING / CORRECTIVE ACTION
```

This extends the existing project lifecycle without replacing it. The project lifecycle remains:

```text
PLAN → INVESTMENT PROGRAM → BUDGET → PROCUREMENT → AWARD → CONTRACT
→ OBLIGATION → DISBURSEMENT → PAYMENT → IMPLEMENTATION → INSPECTION
→ COMPLETION → ASSET / SERVICE IN OPERATION → OUTCOME → AUDIT / FEEDBACK
```

Every transition remains an explicit research question. fileciteturn2file1L196-L236

---

# 66. Case-Routing Model Demonstrated

A control signal is useful only if eGovTrace can say what should happen next.

The pilot therefore adds:

```text
SIGNAL
  ↓
CONTROL DOMAIN
  ↓
LIKELY EVIDENCE CUSTODIAN
  ↓
LAWFUL ACCESS PATH
  ↓
AUTHORIZED REVIEW OWNER
```

Examples:

```text
B/L → missing declaration bridge
        ↓
CUSTOMS CONTROL
        ↓
BOC DATA / PROCESS OWNER

CAAP CONTRACT → missing execution evidence
        ↓
PROJECT / PROCUREMENT CONTROL
        ↓
CAAP + financial / implementing records

LGU permit transaction → missing action log
        ↓
LOCAL PERMIT / DIGITAL CONTROL
        ↓
LGU SYSTEM CUSTODIAN / INTERNAL CONTROL
```

This remains **routing support**, not automatic case assignment. The approved architecture explicitly defers full automated case assignment until legal authority and responsibility are validated. fileciteturn2file4L543-L555

---

# 67. Research Decision

## Decision: PASS — CROSS-TRACE CONTROL MODEL IS EMPIRICALLY USEFUL AT PILOT SCALE

The three real traces demonstrate that eGovTrace can already distinguish:

```text
KNOWN
UNKNOWN
UNRESOLVED
OPEN CONTROL STATE
EVIDENCE GAP
IDENTITY GAP
TESTABLE
NOT TESTABLE
```

without requiring a corruption accusation.

The pilot **does not** prove that eGovTrace can detect corruption at national scale. It proves something narrower and more important:

> **A cross-government graph can convert fragmented public records into structured control questions and evidence-acquisition states without collapsing uncertainty into an allegation.**

That is the correct foundation for future anomaly detection.

---

# 68. Next Experimental Expansion

The next pass should move from **three isolated traces** to **small comparison populations**.

The priority is:

```text
10–30 customs transactions
10–30 airport / transport procurements
10–30 LGU permit / service transactions or comparable public operational records
```

For each population, test:

```text
TIMING
IDENTIFIER CONTINUITY
ACTOR RECURRENCE
EXCEPTION FREQUENCY
AMOUNT CONSISTENCY
CONTROL-SEQUENCE CONSISTENCY
OUTCOME / RELEASE CONTINUITY
```

Only after a sufficiently defined population exists should eGovTrace begin testing true **pattern signals**.

The next research question is therefore:

> **Can eGovTrace distinguish ordinary variation from statistically or procedurally unusual patterns across a defined population while preserving evidence provenance and abstaining when the evidence is insufficient?**

This is a future controlled research pass, not a new G0–G6 formal gate.

---

# 69. Relationship to the Pending DPWH FOI

The DPWH FOI remains independent and continues in parallel.

The cross-trace pilot does not require the FOI response to proceed because the current experiment concerns **national operational-control generalization**, not closure of the Cabarasan–Dao financial trace.

When the DPWH FOI response arrives, its records can be processed through the same control-test framework:

```text
PROJECT
 ↓
PROCUREMENT
 ↓
CONTRACT
 ↓
ALLOTMENT / OBLIGATION
 ↓
DISBURSEMENT
 ↓
PAYMENT / SETTLEMENT
 ↓
IMPLEMENTATION
 ↓
COMPLETION
```

This allows the DPWH case to become one more vertical in the same control graph rather than the prerequisite for the broader architecture.

---

# 70. Final Pilot Conclusion

The correct eGovTrace question is no longer only:

> **"Can we find corruption?"**

It is:

> **"Can we continuously identify where a government process is evidenced, where it is not evidenced, where its controls are demonstrably satisfied, where they remain open, where records disagree, and where additional authorized review is justified?"**

The three record-level traces support that model.

The system should therefore evolve toward:

```text
TRACEABILITY
      ↓
CONTROL OBSERVABILITY
      ↓
ANOMALY / EXCEPTION DETECTION
      ↓
EVIDENCE ACQUISITION
      ↓
AUTHORIZED REVIEW
      ↓
ACCOUNTABILITY / CORRECTION
```

while retaining the standing rule:

```text
ANOMALY ≠ CORRUPTION
CORRELATION ≠ COLLUSION
MISSING EVIDENCE ≠ ABSENCE
GRAPH CONNECTION ≠ GUILT
```

This preserves the central eGovTrace objective: make fragmented government records interoperable around evidence-backed identities, relationships, time, control states and human accountability. fileciteturn2file3L362-L427

---

# 59. Cross-Trace Comparison Population Testing — September 2026

**Status:** EXECUTED — COMPARISON POPULATION PILOT 01  
**Formal G0–G6 change:** NONE  
**Purpose:** Move from three individual traces to small comparison populations and test whether eGovTrace can identify repeatable control signals, exceptions, inconsistencies, and evidence gaps rather than merely describing isolated cases.

This pass is deliberately conservative. A comparison population is used to test a **rule**. A rule producing a signal does not establish corruption, fraud, misconduct, or liability.

The tested model is:

```text
COMPARISON POPULATION
        ↓
NORMAL / EXPECTED PATTERN
        ↓
OBSERVED RECORD
        ↓
RULE TEST
        ↓
SIGNAL / EXCEPTION / GAP
        ↓
EVIDENCE REQUIRED
        ↓
AUTHORIZED REVIEW
```

## 59.1 Tested populations

| Population | Sample used | Primary purpose |
|---|---:|---|
| BOC Port of Manila unfiled containerized notices | 4 notice snapshots / multiple rows | Recurrence, duplicate identifier, aging and control-state testing |
| CAAP airport procurements | 5 PhilGEPS records | Procurement-lifecycle continuity, timing and cross-project recurrence testing |
| Quezon City BPLD-related procurements | 6 public procurement records | Repeated operational procurement, lifecycle completeness and service-domain concentration testing |

These are **pilot comparison populations**, not statistically representative national samples.

---

# 60. Comparison Population A — BOC / Port of Manila

## 60.1 Source observations

The BOC public notices provide repeated daily/snapshot populations containing at least Bill of Lading, discharge date, consignee and party-to-notify fields. Examples include notices dated 03 March, 12 March, 23 March, 31 March and 27 April 2026. The 12 March snapshot contains several entries whose discharge dates are months earlier, including a 20 January 2025 discharge and an 13 August 2025 discharge. BOC's published process states that failure to lodge/file the goods declaration within fifteen days from discharge may result in implied abandonment, subject to the governing rules and facts of the case.

### Pilot records

| Snapshot | B/L | Discharge date | Observation |
|---|---|---|---|
| 12 Mar 2026 | `SITGSHMSQ3042131` | 20 Jan 2025 | Long interval between discharge and listed unfiled state |
| 12 Mar 2026 | `USM0215304` | 13 Aug 2025 | Same B/L appears more than once in the same published snapshot |
| 12 Mar 2026 | `EGLV100550219592` | 13 Sep 2025 | Long interval between discharge and listed unfiled state |
| 12 Mar 2026 | `AOXM003813` | 22 Oct 2025 | Long interval between discharge and listed unfiled state |
| 03 Mar 2026 comparator | `CNH1012254` | 27 Feb 2026 | Recent discharge comparator |

## 60.2 Control rules tested

### Rule A1 — Duplicate source identifier

**Rule:** The same B/L occurs more than once in one source snapshot.

**Observed:** `USM0215304` appears twice in the 12 March 2026 Port of Manila unfiled-containerized notice.

**Signal:** `SOURCE_DUPLICATE_IDENTIFIER`

**Interpretation:** This may be a real duplicate, a split/related representation, or a publication/data-quality issue. It is **not** evidence of duplicate cargo, duplicate liability, smuggling, or wrongdoing.

**Required next evidence:** Container number(s), declaration/registry information, source-row key if available, and authoritative customs transaction record.

**Classification:** **CONTROL / DATA-QUALITY REVIEW CANDIDATE**

### Rule A2 — Aging beyond expected control window

**Rule:** A record remains in an unfiled/declaration-not-lodged state substantially beyond the 15-day statutory reference described in the BOC notice process.

**Observed:** The 12 March 2026 snapshot contains B/Ls with discharge dates in January, August, September and October 2025.

**Signal:** `CONTROL_AGE_EXCEPTION`

**Interpretation:** The elapsed time is a strong reason to inspect the underlying customs record. The public notice alone does not establish whether extensions, subsequent filings, reassessments, legal processes, or other facts alter the apparent state.

**Required next evidence:** Goods declaration number, registry number, assessment, payment, release/claim event, abandonment action if any, and authoritative event timestamps.

**Classification:** **REVIEW CANDIDATE — NOT A FINDING OF NON-COMPLIANCE**

### Rule A3 — Snapshot recurrence

**Rule:** A party/B/L or identifier recurs across independent published snapshots.

**Observed:** Several consignees and B/Ls recur across March/April snapshots.

**Signal:** `RECURRENCE_PATTERN`

**Interpretation:** Recurrence is expected in rolling operational lists and therefore has low specificity by itself. It becomes more valuable when combined with aging, identity inconsistencies, or downstream-event absence.

**Classification:** **LOW-SPECIFICITY SIGNAL**

## 60.3 BOC pilot conclusion

The BOC comparison population demonstrates that eGovTrace can move beyond a single customs record and identify:

```text
DUPLICATE IDENTIFIER
AGING EXCEPTION
RECURRING RECORD
```

without converting those observations into allegations.

The strongest pilot signal is **aging + unresolved downstream state**, not recurrence alone.

---

# 61. Comparison Population B — CAAP / Airport Procurement

## 61.1 Sample records

| PhilGEPS reference | CAAP solicitation / project identifier | Airport / project | ABC | Status |
|---|---|---|---:|---|
| `12290842` | `25-62-08 ALPHA` | Asphalt Overlay of Runway at San Jose Airport | PHP 220,110,377.63 | Awarded |
| `11451827` | `24-101-11 Alpha` | Asphalt Overlay of Runway at Roxas Airport | PHP 153,600,366.27 | Awarded |
| `11482579` | `BSVP-ILO 2024-068` | IT supplies, Iloilo International Airport | PHP 53,807.50 | Awarded |
| `11464525` | `24-108-11 BRAVO` | Replacement of eight PAPI fixtures, Tacloban Airport | PHP 5,768,000.00 | Awarded |
| `11446399` | `24-099-11 BRAVO` | Communications equipment, Bicol / New Legaspi International Airport | PHP 47,146,006.26 | Awarded |

The records show that PhilGEPS provides a reference number, solicitation number, procuring entity, title, ABC, procurement mode, delivery period and current status. The CAAP sample therefore provides multiple real procurement anchors against which lifecycle-control rules can be tested.

## 61.2 Control rules tested

### Rule B1 — Procurement lifecycle completeness

**Rule:** An awarded procurement should have a recoverable award and contract bridge before eGovTrace can mark the procurement-to-contract relationship as confirmed.

**Observed:** The previously traced Naga Airport case has a confirmed bid → BAC resolution → NOA → contract chain. The additional CAAP population confirms that multiple procurement records exist, but the comparison population does not by itself recover all downstream contract/NTP/financial records for every sample.

**Signal:** `LIFECYCLE_EVIDENCE_GAP`

**Classification:** **EVIDENCE-CONTINUITY REVIEW**

This is a completeness signal, not evidence that a contract or performance does not exist.

### Rule B2 — High-value project without downstream execution bridge

**Rule:** Where a public procurement record identifies a high-value award but eGovTrace cannot yet establish NTP, obligation, disbursement or physical completion from independently recoverable records, flag the missing bridge.

**Observed:** Multiple CAAP records have large ABCs while the pilot public-source trace remains stronger at procurement/award than at financial/physical execution.

**Signal:** `HIGH_VALUE_DOWNSTREAM_EVIDENCE_GAP`

**Classification:** **PRIORITIZED EVIDENCE-ACQUISITION CANDIDATE**

The rule should not assume that a missing public web record means the transaction itself is missing.

### Rule B3 — Same functional class across multiple airports

**Rule:** Repeated procurement of the same functional class across airports is grouped for portfolio analysis.

**Observed:** Runway-overlay / airport-infrastructure procurements appear as separate CAAP procurement identities for different airports.

**Signal:** `PORTFOLIO_RECURRENCE`

**Interpretation:** This is useful for comparing cost, delivery periods, procurement mode, contractor recurrence, change-order rates and completion evidence across comparable projects.

**Classification:** **BENCHMARKING SIGNAL**, not anomaly by itself.

## 61.3 CAAP pilot conclusion

The CAAP population demonstrates that comparison analytics are useful primarily for **lifecycle completeness and like-for-like benchmarking**. The strongest next-stage variables are:

```text
ABC
CONTRACT AMOUNT
DELIVERY PERIOD
NTP DATE
ACTUAL COMPLETION DATE
CHANGE ORDERS
PAYMENTS
CONTRACTOR
AIRPORT
```

Without these downstream fields, eGovTrace should flag an evidence gap rather than invent a performance conclusion.

---

# 62. Comparison Population C — Quezon City BPLD / Daily-Operation Technology Environment

## 62.1 Sample records

The following public records all relate to the BPLD operational environment but represent different procurement functions and years:

| Project identifier | Contract / award identifier | Function |
|---|---|---|
| `CAO(BPLD)-25-IT-0272` | `GS-2503015` | Occupational Permit System Enhancement |
| `CAO(BPLD)-25-IT-0172` | `E2501116` | Business Information System enhancement |
| `ITDD(BPLD)-25-SERVICES-0186` | `E2501108` | Automated Document Delivery System maintenance |
| `BPLD-25-SERVICES-0069` | `E2501006` | BPLD beverage service |
| `BPLD-24-IS-0153` | `2402023` | Internet/data subscription for automated audit inspection system |
| `BPLD-26-IS-0005B` | `GS-E2601070` | Connectivity for inspection/audit system and kiosks |

## 62.2 Control rules tested

### Rule C1 — Operational-domain recurrence

**Rule:** Multiple contracts serving the same government operational function should be grouped so eGovTrace can distinguish routine continuity from possible fragmentation or repeated procurement dependency.

**Observed:** BPLD-related public procurement recurs across system enhancement, automated document delivery, inspection connectivity, data subscriptions, and other operating requirements.

**Signal:** `OPERATIONAL_DOMAIN_RECURRENCE`

**Interpretation:** Recurrence is normal for a continuing digital service. The signal becomes useful when the graph can compare cumulative spend, contract periods, overlapping scopes, vendors, deliverables and renewal timing.

**Classification:** **PORTFOLIO REVIEW / BENCHMARKING SIGNAL**

### Rule C2 — Possible fragmented capability chain

**Rule:** Flag separate contracts that appear to support the same operational capability when their scopes overlap materially in time/function.

**Observed:** The current public sample contains separate contracts for systems, maintenance, connectivity, delivery and analytics within the same BPLD ecosystem.

**Signal:** `POTENTIAL_SCOPE_OVERLAP`

**Interpretation:** Separate procurements may be entirely legitimate and may intentionally separate goods, services, infrastructure and maintenance. This rule should therefore require scope-level comparison before producing a stronger signal.

**Required next evidence:** Technical specifications, periods, deliverables, vendor, contract amounts, renewal terms, acceptance records and system architecture.

**Classification:** **LOW-CONFIDENCE STRUCTURAL SIGNAL**

### Rule C3 — Transaction-level control visibility

**Rule:** Where a public system performs citizen-facing approvals, inspections, permits or collections but only procurement/system-level records are public, identify the missing operational event layer.

**Observed:** The BPLD sample proves that a public digital control environment exists, but the public procurement records do not expose individual application, inspection, officer-action, approval, payment and release events.

**Signal:** `OPERATIONAL_EVENT_EVIDENCE_GAP`

**Classification:** **HIGH-VALUE ARCHITECTURAL GAP**

This does not mean those logs do not exist. It means the pilot cannot independently reconcile them from the public material sampled.

## 62.3 LGU pilot conclusion

The LGU comparison population reveals a new class of eGovTrace problem:

> **Operational continuity can be real even when the underlying citizen transaction evidence is not publicly visible.**

Therefore eGovTrace needs a distinction between:

```text
SYSTEM PROCUREMENT EVIDENCE
        vs.
LIVE OPERATIONAL EVENT EVIDENCE
```

This distinction is essential for testing whether a digital government control actually operates as designed.

---

# 63. Cross-Trace Signal Catalogue — Pilot Results

| Signal | BOC | CAAP | LGU | Initial value |
|---|---:|---:|---:|---|
| Duplicate identifier | YES | NOT TESTED | NOT TESTED | Medium for data quality |
| Aging / timing exception | YES | PARTIAL | PARTIAL | High when legal/control window is known |
| Recurrence / concentration | YES | YES | YES | Low alone; stronger in combination |
| Lifecycle evidence gap | YES | YES | YES | High |
| Unresolved identity bridge | YES | YES | YES | High |
| Potential scope overlap | NOT TESTED | NOT TESTED | YES | Requires document-level scope comparison |
| Downstream execution gap | YES | YES | YES | High |
| Outcome evidence gap | NOT YET TESTED | NOT YET TESTED | NOT YET TESTED | Future population |
| Suspected corruption | **NEVER DIRECT OUTPUT** | **NEVER DIRECT OUTPUT** | **NEVER DIRECT OUTPUT** | Prohibited as automatic classification |

## 63.1 Composite signals

The pilot supports a composite model in which a single weak signal should generally remain weak, while several independent control signals can elevate a review priority.

Example:

```text
RECURRENCE
   +
AGING EXCEPTION
   +
UNRESOLVED DOWNSTREAM EVENT
   +
IDENTITY INCONSISTENCY
        ↓
HIGHER REVIEW PRIORITY
```

Still:

```text
HIGHER REVIEW PRIORITY ≠ CORRUPTION
```

The system must preserve which component signals were observed and which evidence would be needed to resolve them.

---

# 64. What eGovTrace Can Now Actually Flag

At pilot level, the platform can legitimately produce the following machine-readable states:

```text
CONTROL_BREAK
CONTROL_AGE_EXCEPTION
SOURCE_DUPLICATE_IDENTIFIER
RECURRENCE_PATTERN
IDENTITY_BRIDGE_UNRESOLVED
LIFECYCLE_EVIDENCE_GAP
DOWNSTREAM_EXECUTION_EVIDENCE_GAP
OPERATIONAL_EVENT_EVIDENCE_GAP
POTENTIAL_SCOPE_OVERLAP
PORTFOLIO_CONCENTRATION_SIGNAL
REVIEW_CANDIDATE
EVIDENCE_ACQUISITION_REQUIRED
```

It should **not** produce these as automated findings:

```text
CORRUPT
FRAUDULENT
BRIBED
GUILTY
SMUGGLER
OVERPRICED
GHOST PROJECT
COLLUSION
```

unless an authorized competent process has separately established such a finding and eGovTrace is merely preserving/reporting that authoritative finding with provenance.

This directly implements the approved architecture's requirement that anomaly/control-break outputs remain review signals rather than automatic wrongdoing findings. fileciteturn2file1L154-L192

---

# 65. Detection Logic — First Cross-Trace Version

The first operational rules should therefore be expressed in a transparent way:

```text
RULE 001
DUPLICATE_SOURCE_IDENTIFIER

IF
same source + same identifier + same publication snapshot
occurs > 1 time

THEN
emit SOURCE_DUPLICATE_IDENTIFIER

REQUIRE
source-row / transaction-level reconciliation
```

```text
RULE 002
CONTROL_WINDOW_AGE

IF
observed event remains in a control state
beyond the legally / operationally defined reference window

THEN
emit CONTROL_AGE_EXCEPTION

REQUIRE
authoritative event history and exception/extension evidence
```

```text
RULE 003
LIFECYCLE_GAP

IF
stage N is CONFIRMED
AND stage N+1 is expected by the lifecycle model
BUT
no sufficient evidence bridge is recovered

THEN
emit LIFECYCLE_EVIDENCE_GAP
```

```text
RULE 004
RECURRENCE

IF
entity / identifier / contractor / vendor / project function
recurs across a comparison population

THEN
emit RECURRENCE_PATTERN

BUT
DO NOT elevate from recurrence alone to wrongdoing
```

```text
RULE 005
COMPOSITE_REVIEW_PRIORITY

IF
multiple independent signals converge
AND
at least one signal affects a substantive control

THEN
increase REVIEW PRIORITY

BUT
retain each underlying signal separately
```

---

# 66. Important Negative Results

The pilot did **not** establish:

1. corruption by any person or agency;
2. fraudulent or collusive bidding;
3. customs revenue leakage;
4. non-payment of any CAAP contract;
5. non-delivery of any BPLD system;
6. prohibited bid splitting or procurement fragmentation;
7. bribery or conflict of interest.

Those questions require evidence beyond the current comparison population and, where applicable, legally competent investigative processes.

The absence of a finding is intentional. The objective of this pass is to prove whether eGovTrace can identify **where the evidence and controls need to be examined next**.

---

# 67. Architecture Consequences From Comparison Testing

The comparison population pilot adds the following requirements to the eGovTrace operational model:

### 67.1 Signal objects must be first-class records

Every signal needs:

```text
signal_id
signal_type
trigger_rule
observed_entity
observed_event
source_record_ids
evidence_ids
observation_time
confidence / support state
required_follow_up
authority / custodian candidate
status
resolution
```

### 67.2 Comparison populations must be preserved

A future eGovTrace investigation must know:

```text
population_definition
selection_rule
inclusion_criteria
exclusion_criteria
observation_date
source_snapshot
population_size
comparison_method
```

Otherwise an anomaly score can be changed simply by changing the comparison population.

### 67.3 Baselines must be domain-specific

A customs-control baseline should not be copied into an airport-construction baseline or an LGU business-permit baseline.

The common graph is shared; the control rules are domain-aware.

### 67.4 Explainability is mandatory

A review signal should always answer:

> **“Why did eGovTrace flag this?”**

The answer must show:

```text
RULE
↓
INPUT RECORDS
↓
OBSERVED CONDITION
↓
COMPARISON / THRESHOLD
↓
SIGNAL
↓
MISSING / REQUIRED EVIDENCE
```

### 67.5 Public and restricted signals remain separated

A citizen-facing interface may display a generalized evidence gap or unresolved status where lawful and appropriate.

Sensitive operational indicators, personal information, investigative material and restricted records must remain behind the appropriate access layer.

---

# 68. Research Decision

**DECISION:** `PASS — SMALL COMPARISON POPULATIONS PRODUCE USEFUL, NON-ACCUSATORY CONTROL SIGNALS`

The pilot establishes that the move from:

```text
ONE RECORD
```

to:

```text
COMPARISON POPULATION
```

materially improves eGovTrace's ability to identify repeatable patterns such as:

```text
recurrence
aging exceptions
duplicate identifiers
lifecycle gaps
operational evidence gaps
potential scope overlap
portfolio concentration
```

It also establishes a key limitation:

> **A comparison population can identify a review candidate, but it cannot by itself establish intent, illegality, corruption, fraud, collusion, or criminal liability.**

---

# 69. Next Experimental Expansion

The next population pass should increase from approximately 4–6 records per vertical to a controlled **20–50 record comparison population per domain**, subject to source accessibility.

Priority:

```text
1. BOC customs transactions
2. CAAP airport procurements
3. LGU permit / licensing operations
4. Government procurement across multiple agencies
5. Revenue / collection operations
6. Benefits / subsidy delivery
7. Personnel / appointment controls
```

The purpose is not to build a national accusation engine. The purpose is to test whether eGovTrace can establish reliable **domain baselines**, calculate reproducible deviations from those baselines, and route each deviation to the institution that can lawfully resolve it.

The pending DPWH FOI remains a separate evidence-acquisition channel for Case A and does not block this research stream.

---

# 70. Final Cross-Trace Principle

> **eGovTrace should detect departures from expected government control behavior, preserve the evidence behind the departure, and identify what must be checked next — not decide guilt from the pattern itself.**

This preserves the architecture's fundamental sequence:

```text
TRANSPARENCY
   ↓
TRACEABILITY
   ↓
CONTROL ANALYSIS
   ↓
EVIDENCE ACQUISITION
   ↓
ASSURANCE / REVIEW
   ↓
ACCOUNTABILITY
```

and prevents:

```text
PATTERN
   ↓
ACCUSATION
```

from becoming the operating logic of eGovTrace.

---

# 71. Controlled Comparison-Population Expansion — 20+ Record Pass

**Execution status:** EXECUTED — INITIAL COMPARISON-POPULATION PASS  
**Research scope:** public-source comparison populations for three previously established verticals  
**Purpose:** move from single-record demonstrations toward reproducible recurrence, timing, concentration, exception, and composite-control testing.

## 71.1 Important methodological rule

The target of 20–50 records per domain is a **testing population**, not a claim that the resulting sample is statistically representative of the entire Philippine State.

The present pass uses records that were publicly recoverable from official government or official procurement surfaces during the research session. Search/index availability creates selection bias. Therefore:

```text
OBSERVED POPULATION
        !=
NATIONAL BASELINE
```

The population is useful for testing whether the eGovTrace control logic can run repeatedly over comparable records. It is not yet suitable for estimating national corruption prevalence.

---

# 72. Population A — BOC / Port of Manila Operational Notices

## 72.1 Unit of analysis

For this pass, the available public comparison unit is the **Port of Manila Notice-to-Lodge/File-Entry publication record**, not an individual customs transaction.

This distinction is intentional. The BOC publication surface exposes recurring notices, while the underlying attachment containing individual Bill of Lading and Registry Number rows is not consistently recoverable through the indexed page content.

Therefore:

```text
NOTICE RECORD
   ↓
PUBLICATION EVENT
   ↓
CONTROL-PROCESS OBSERVATION
```

is valid for this pass, while:

```text
B/L
 ↓
DECLARATION
 ↓
ASSESSMENT
 ↓
PAYMENT
 ↓
RELEASE
```

remains a transaction-level chain requiring record-level attachment recovery.

## 72.2 Public comparison population recovered

The following official Port of Manila notice dates were recovered across the 2026 BOC publication surface and related indexed pages:

```text
2026-04-01
2026-05-08
2026-05-11
2026-05-18
2026-06-09
2026-06-17
2026-06-18
2026-06-19
2026-06-22
2026-07-01
2026-08-03
2026-08-20
2026-08-25
2026-08-26
2026-08-27
2026-08-28
2026-09-01
2026-09-02
2026-09-03
2026-09-04
```

The BOC Port of Manila index shows repeated notice publication on consecutive and near-consecutive dates, including September 1–4 and August 25–28, demonstrating that the control process produces a recurring public record rather than a one-off event. urlBOC Port of Manila publication indexhttps://customs.gov.ph/collection-districts-i-vi/port-of-manila/

The September 2 notice states that the published population consists of shipments discharged without a corresponding goods declaration having been lodged/filed at the time of publication, and it separately specifies the subsequent payment and claim windows. urlBOC September 2, 2026 noticehttps://customs.gov.ph/notice-to-lodge-goods-declaration-file-entry-to-pay-duties-and-taxes-and-to-claim-goods-for-shipment-discharged-at-the-port-of-manila-sept-2-2026/

## 72.3 Control testing results

### Signal BOC-P01 — PUBLICATION RECURRENCE

```text
Observed:
Repeated Notice-to-Lodge/File-Entry publications across the sampled period.

Interpretation:
Expected operational recurrence is demonstrated.

Signal:
NONE BY ITSELF.
```

A repeated notice is not an anomaly. It is evidence that the process is generating repeated control-state records.

### Signal BOC-P02 — CONTROL-AGE TESTABILITY

BOC's own notice defines explicit process windows. This means eGovTrace can eventually calculate:

```text
DISCHARGE DATE
        ↓
DECLARATION DEADLINE
        ↓
ASSESSMENT DATE
        ↓
PAYMENT DEADLINE
        ↓
CLAIM DEADLINE
```

and compare actual event dates against expected windows.

**Current status:** `RULE PROVABLE / EVENT DATA INCOMPLETE`.

### Signal BOC-P03 — DOWNSTREAM COMPLETION GAP

The sampled public notices do not, by themselves, establish the corresponding declaration, assessment, settlement, or physical release events for each shipment.

**Signal:** `DOWNSTREAM_EXECUTION_EVIDENCE_GAP`

This is not equivalent to non-compliance or non-payment.

## 72.4 BOC population conclusion

**PASS — process recurrence and control-window logic are testable; transaction-level anomaly rates remain unmeasured until attachment-level shipment rows can be harvested at scale.**

---

# 73. Population B — CAAP / Airport and Aviation Procurement

## 73.1 Unit of analysis

The CAAP population uses **PhilGEPS Bid Notice Abstract records** associated with CAAP and its airport/area-center entities. The fields tested where available are:

```text
reference_number
solicitation_number
title
procuring_entity
location
procurement_mode
classification/category
ABC
delivery_period
status
published_date
```

## 73.2 Public records recovered

The initial comparison population contains 20 CAAP/airport-related procurement records across 2024–2026, including:

| Ref. no. | Solicitation | Example title / domain | Mode | Status | ABC / budget | Delivery |
|---|---|---|---|---|---:|---:|
| 12894712 | CAAPAREAIX-RFQ-013 | Pagadian Airport air-conditioning | Small Value | Awarded | PHP1,330,000 | 40 days |
| 13046262 | 2026-06 Masbate | Masbate Airport centralized internet | Small Value | Closed | PHP299,216.02 | 20 days |
| 13051149 | tag-013-2026 | Bohol-Panglao admin flag pole | Small Value | Closed | PHP75,000 | 60 days |
| 12901473 | 01790-5020321001 | Area Center III appliances | Small Value | Active | PHP182,068 | 7 days |
| 12290842 | 25-62-08 ALPHA | San Jose Airport runway asphalt overlay | Public Bidding | Awarded | PHP220,110,377.63 | 150 days |
| 11842041 | 25-02-005 | General Santos Airport SCBA refilling machine | Small Value | Awarded | PHP610,700 | 30 days |
| 11464525 | 24-108-11 BRAVO | Tacloban Airport PAPI fixtures | Public Bidding | Awarded | PHP5,768,000 | 240 days |
| 11451827 | 24-101-11 Alpha | Roxas Airport runway asphalt overlay | Public Bidding | Awarded | PHP153,600,366.27 | 60 days |
| 11446399 | 24-099-11 BRAVO | Bicol/New Legazpi communications equipment | Public Bidding | Awarded | PHP47,146,006.26 | 365 days |
| 11464619 | — | CAAP electrical/other procurement record | Public Bidding | Indexed | — | 60 days stated in indexed content |
| 11487338 | RFQ C24-123-10 | Aviation headsets | Small Value | Closed | PHP124,317.32 | 30 days |
| 11326150 | 2435/2491 | Runway/taxiway/apron testing, Area Center III | Small Value | Closed | PHP277,200 | 30 days |
| 11338812 | — | Safety Oversight Management System | Public Bidding | Indexed | PHP350,000,000 | 540 days |
| 12364658 | 09032025 | Tuguegarao Airport tractor-mower maintenance | Small Value | Closed | PHP501,320 | 80 days |
| 11491704 | 24-11-176 | General Santos Airport office supplies | Small Value | Awarded | PHP168,961 | 30 days |
| 11482579 | BSVP-ILO 2024-068 | Iloilo Airport IT supplies | Small Value | Awarded | PHP53,807.50 | 15 days |
| 11482858 | SHOPPING (B)-ILO 2024-002 | Iloilo Airport office supplies | Shopping | Awarded | PHP225,497 | 15 days |
| 11464512 | 24-109-11 BRAVO | Busuanga Airport grounding system | Public Bidding | Failed | PHP4,250,000 | 180 days |
| 12116105 | 2025-06-308 | Davao Airport fire-truck spare parts | Small Value | Active | PHP159,520 | 0 days shown |
| 12066762 | 25-32-05 BRAVO | CAAP service procurement | Public Bidding | Indexed | PHP1,632,800 | 1 year / consumption-based |

Sources include the official PhilGEPS Bid Notice Abstract records for the identified CAAP procurement records. citeturn390062search0turn390062search1turn390062search2turn390062search3turn390062search5turn390062search6turn276917search0turn276917search1turn276917search2turn276917search3turn276917search4turn302125search8turn302125search10turn302125search11

## 73.3 Population observations

### Signal CAAP-P01 — PROCUREMENT-MODE MIX

The comparison set contains both public bidding and negotiated/small-value procurement. This is **normal variation in procurement mode**, not an anomaly.

It gives eGovTrace a future baseline dimension:

```text
PROJECT TYPE
   ×
PROCUREMENT MODE
   ×
ABC RANGE
   ×
DELIVERY PERIOD
```

### Signal CAAP-P02 — DELIVERY-PERIOD EXTREMES

The sample contains very short delivery windows (7 days, 15 days, 20 days, 30 days) alongside much longer periods (180, 240, 365, and 540 days). This supports testing of **domain-appropriate timing distributions** rather than a single universal threshold.

A 365-day delivery period should not be evaluated with the same rule as a 7-day supplies purchase.

**Signal:** `BASELINE_VARIABLE_ESTABLISHED`

### Signal CAAP-P03 — FAILED-PROCUREMENT RECURRENCE CANDIDATE

The Busuanga grounding-system record (`11464512`) is explicitly marked **Failed**. A failed bidding result is not misconduct. However, once a larger comparison population is available, eGovTrace can test:

```text
FAILED BID
   ↓
REPOST / REBID
   ↓
AWARD
   ↓
TIME TO SUCCESSFUL PROCUREMENT
```

for recurrence and unusual persistence.

**Current signal:** `PROCUREMENT_OUTCOME_TRANSITION_CANDIDATE`

### Signal CAAP-P04 — REFERENCE-NUMBER CONTINUITY

PhilGEPS reference numbers are strong procurement-system anchors. The comparison population also demonstrates that CAAP has multiple administrative identities such as central CAAP, Area Centers, and airport-specific procuring entities.

Therefore:

```text
PhilGEPS REF
    ↓
SOLICITATION
    ↓
CAAP ENTITY
    ↓
AIRPORT / SITE
```

must remain separate from any future financial, physical, or operational identifier.

**Signal:** `DOMAIN_IDENTITY_BRIDGE_REQUIRED`

## 73.4 CAAP population conclusion

**PASS — a 20-record comparison set already supports basic mode, amount, duration, status, and entity-distribution tests. Composite procurement-execution signals require awardee, NTP, contract, payment, and completion fields for the same population.**

---

# 74. Population C — Quezon City LGU / Daily Business-Operation Procurement Surface

## 74.1 Unit of analysis

For the initial LGU population, the available public comparison unit is the **Quezon City procurement notice / solicitation record supporting daily government operations**.

This is deliberately narrower than individual resident transactions. It tests whether the procurement/control environment surrounding an operational service can be compared at scale without ingesting private citizen data.

## 74.2 20-record comparison population

A 20-record public solicitation population was assembled from Quezon City's official Invitation to Bid pages. The sample contains distinct operational/project identifiers such as:

```text
BPLD-26-SERVICES-0540B
BPLD-26-PS2-0788
CAO-26-CE2-0586B
CAO-26-OE-0718
GADCO-26-SERVICES-0633
LEDIPO-26-EDGFAS-0770
OCM-26-AME-0568B
OCM-26-AAS2-0624
PDAO-26-PCP1-0658B
QCCCD-26-PS2-0636
QCGH-26-APP-0473B
QCGH-26-MSLI-0694
QCPC-26-GARMENTS-0652
QCPC-26-OE-0493B
QCPC-26-OSD-0626
QCPC-26-OSD-0627
QCPL-26-SERVICES-0365B
QCU-26-SERVICES-0697
RMBGH-26-GRMS-0416B
SSDD-26-GARMENTS-0778
```

The official Quezon City pages show these solicitation identifiers as part of scheduled Invitation-to-Bid publication batches. urlQC June 15 / July 7 batchhttps://quezoncity.gov.ph/public-notice/invitation-to-bid-as-of-june-15-2026-july-07-2026-above/ urlQC May 18 / June 9 batchhttps://quezoncity.gov.ph/public-notice/invitation-to-bid-as-of-may-18-2026-june-09-2026-above/

Additional official batches show other recurring BPLD identifiers, including `BPLD-26-PS2-0762`, `BPLD-26-PS2-0788`, `BPLD-26-SERVICES-0540`, `BPLD-26-SERVICES-0540B`, and `BPLD-26-AMS-0321`/`0321B`. urlQC June 8 / June 30 batchhttps://quezoncity.gov.ph/public-notice/invitation-to-bid-as-of-june-08-2026-june-30-2026-above/ urlQC April 20 / May 12 batchhttps://quezoncity.gov.ph/public-notice/invitation-to-bid-as-of-april-20-2026-may-12-2026-above/

## 74.3 Signal QC-P01 — SOLICITATION RECURRENCE

Repeated BPLD solicitation identifiers appear across different publication batches. This is a valuable eGovTrace pattern because the same native identifier can recur over time.

However, recurrence may represent:

```text
reposting
rebidding
amendment
schedule change
failed procurement
continuing procurement activity
```

Therefore the correct signal is:

**`REPEATED_SOLICITATION_IDENTIFIER`**

not:

**`IRREGULARITY`**

until the associated documents establish what changed.

## 74.4 Signal QC-P02 — OPERATIONAL-DOMAIN CONCENTRATION

The sample spans BPLD, CAO, OCM/LDRRMF, QCGH, QCPC, QCU, RMBGH, SSDD, PDAO and other offices.

This demonstrates that eGovTrace can group operational procurement by:

```text
DEPARTMENT / OFFICE
        ×
PROCUREMENT TYPE
        ×
TIME
        ×
PROJECT / SOLICITATION FAMILY
```

This is the first step toward testing concentration without assuming that concentration is improper.

## 74.5 Signal QC-P03 — PUBLIC-PROCUREMENT → SERVICE-GAP

The current public records expose procurement documents, while individual resident-level permit/inspection/payment events are not publicly available as a comparable population in this pass.

That creates a structural eGovTrace measurement opportunity:

```text
SYSTEM PROCUREMENT
       ↓
SYSTEM DEPLOYMENT
       ↓
ACTUAL SERVICE EVENTS
```

**Current signal:** `OPERATIONAL_OUTCOME_EVIDENCE_GAP`

The gap is especially important because the previously traced BPLD project `CAO(BPLD)-25-IT-0272 / GS-2503015` is already confirmed as an operational-system procurement with NOA, NTP, resolution and contract records. urlQC BPLD OPSE Phase 4 procurement recordhttps://quezoncity.gov.ph/public-notice/caobpld-25-it-0272-supply-testing-and-commissioning-of-occupational-permit-system-enhancement-opse-for-the-quezon-city-business-permits-and-licensing-department-phase-4/

## 74.6 LGU population conclusion

**PASS — repeated procurement identifiers, office concentration, and procurement-to-service evidence gaps are already testable. Individual transaction-level control analysis remains a separate privacy/legal/data-access research problem.**

---

# 75. Cross-Population Composite Testing

The three populations now permit a first common signal vocabulary.

| Signal family | BOC | CAAP | LGU | Interpretation |
|---|---:|---:|---:|---|
| Recurring source records | ✓ | ✓ | ✓ | Process recurrence, not anomaly by itself |
| Native identifier recurrence | partial | ✓ | ✓ | Requires event/document interpretation |
| Timing distribution | rule-defined, event data incomplete | ✓ | partial | Use domain-specific windows |
| Status transitions | partial | ✓ | partial | Need lifecycle records |
| Concentration analysis | not yet | ✓ | ✓ | Needs sufficiently complete entity fields |
| Downstream evidence gap | ✓ | ✓ | ✓ | Important control signal |
| Identity-bridge requirement | ✓ | ✓ | ✓ | Core eGovTrace function |
| Composite risk signal | not yet | limited | limited | Requires richer fields and larger populations |

## 75.1 Composite signal prototype

A candidate composite control signal can now be defined without calling it corruption:

```text
COMPOSITE_REVIEW_CANDIDATE
=
IDENTITY_CONFIDENCE
+
CONTROL_EXCEPTION
+
RECURRENCE / COMPARATIVE DEVIATION
+
MATERIALITY
+
EVIDENCE_COMPLETENESS
```

The system should not simply add points mechanically. Each component must preserve its own provenance and uncertainty.

Example:

```text
Repeated solicitation identifier
        +
unexpected status transition
        +
material contract amount
        +
missing downstream execution evidence
        =
REVIEW CANDIDATE
```

Not:

```text
Repeated solicitation identifier
        +
missing evidence
        =
CORRUPTION
```

---

# 76. What the 20+ Record Pass Actually Proved

### Proven

```text
✓ Comparison populations can be assembled from public government records.
✓ The same control concepts can operate across different institutional domains.
✓ Domain-native identifiers recur and can be tracked temporally.
✓ Timing rules must be domain-specific.
✓ Missing downstream records can be represented as evidence gaps.
✓ Recurrence and concentration can be measured without declaring wrongdoing.
```

### Not yet proven

```text
✗ Nationally representative baselines.
✗ Reliable national corruption prevalence.
✗ Automated determination of fraud/collusion/bribery.
✗ Complete transaction-level customs lifecycle tracing.
✗ Complete airport contract-to-payment-to-physical-outcome tracing.
✗ Complete LGU citizen-transaction lifecycle tracing.
```

---

# 77. Required Data Model Upgrade From This Pass

The comparison-population experiment suggests these fields should become first-class analytical attributes:

```yaml
comparison_population_id:
domain:
source_record_id:
native_identifier:
entity_identity:
parent_entity_identity:
source_record_type:
event_type:
event_date:
publication_date:
expected_control_window:
observed_control_state:
status_transition:
amount:
procurement_mode:
contractor_or_counterparty:
location:
related_native_identifiers:
identity_confidence:
evidence_completeness:
comparative_baseline:
deviation_measure:
control_signal:
signal_confidence:
review_status:
```

This should allow eGovTrace to preserve the difference between:

```text
RAW OBSERVATION
BASELINE
DEVIATION
SIGNAL
REVIEW
FINDING
```

instead of collapsing all of them into one score.

---

# 78. Sampling and Statistical Caution

The 20-record target is sufficient for **engineering/control-rule testing**, but it is too small and too search-selected to support strong statistical claims.

The next population levels should therefore be:

```text
20–50     rule and schema validation
100–500   baseline stability testing
1,000+    stronger distribution / recurrence testing
large-scale population
          national operational monitoring
```

These thresholds are research design targets, not statistical guarantees.

---

# 79. Research Decision

**STATUS: PASS — COMPARISON-POPULATION TESTING JUSTIFIED AND ARCHITECTURALLY USEFUL**

The 20+ record pass establishes that eGovTrace is no longer limited to:

```text
ONE RECORD → ONE GAP
```

It can now operate as:

```text
MULTIPLE RECORDS
      ↓
COMPARABLE EVENTS
      ↓
DOMAIN BASELINE
      ↓
DEVIATION
      ↓
CONTROL SIGNAL
      ↓
EVIDENCE CHECK
      ↓
REVIEW CANDIDATE
```

The next stage should therefore expand the populations **before** building a high-impact automated corruption-risk score. The objective is to learn the normal shape of government operations first.

---

# 80. Governing Safety / Accountability Rule

> **eGovTrace may identify an unusual relationship, recurrence, concentration, timing deviation, missing control, or evidence gap. It must not convert that signal into an allegation of corruption without independent evidence and legally competent human review.**

This remains consistent with the frozen eGovTrace architecture: source systems remain authoritative, eGovTrace reconciles rather than replaces them, every join requires evidentiary basis, and control breaks are investigation signals rather than automatic findings. 

---

---

# 81. Controlled Large-Population Expansion — Rich-Field Pass 02

**Status:** EXECUTED — RICH-FIELD POPULATION EXPANSION / CONTROL-RULE TESTING 02
**Research date:** 2026-09-05
**Formal G0–G6 change:** NONE
**Purpose:** Move beyond the initial 20-record comparison sets and test whether eGovTrace can retain richer lifecycle fields — awardee, contract identifier, NTP, payment/settlement, completion, inspection, and transaction-level operational events — without weakening provenance or inventing joins.

This pass is deliberately stricter than the previous 20-record pass. A record counts as **rich-field evidence** only when the field is actually recovered from an identifiable source record. An expected field that is not publicly recoverable remains `NOT ESTABLISHED`.

## 81.1 Research rule

```text
MORE RECORDS ≠ MORE PROOF
MORE FIELDS ≠ STRONGER JOIN

A larger population is useful only when:

1. the unit of analysis is stable;
2. records are independently identifiable;
3. fields preserve source-system grain;
4. joins have explicit evidence;
5. missing fields remain missing rather than inferred.
```

The approved architecture requires source systems to remain authoritative and every material join to have an evidentiary basis. fileciteturn5file2L519-L554

---

# 82. Population Expansion Architecture

The large-population model now separates three layers:

```text
LAYER 1 — BASE POPULATION
source-native records collected under a fixed population definition

LAYER 2 — RICH-FIELD ENRICHMENT
award / contract / NTP / payment / completion / inspection / event fields

LAYER 3 — CROSS-TRACE ANALYSIS
baseline / recurrence / timing / concentration / control deviation
```

No record is promoted to Layer 2 merely because a similar title, amount, contractor, location, or date appears elsewhere.

---

# 83. BOC / PORT OF MANILA — LARGER OPERATIONAL POPULATION

## 83.1 Population unit

The BOC public population is anchored on **Port of Manila notice records concerning discharged shipments for which a corresponding goods declaration had not been lodged/filed at the time of the notice**.

The BOC publication surface establishes repeated notices through 2026. The July 1, 2026 notice states the statutory/process windows for filing the goods declaration, paying assessed duties/taxes/charges, and claiming the goods; it also identifies Bill of Lading and Registry Number records in an attached list. citeturn909587search5turn909587search9

The earlier pilot record remains:

```text
B/L = BCC0262042
DISCHARGE = 2026-06-02
CONSIGNEE = COCA COLA EUROPACIFIC ABOITIZ
NOTICE STATE = NO CORRESPONDING GOODS DECLARATION OBSERVED AT NOTICE TIME
```

That record is directly documented in the prior evidence set. fileciteturn7file0L19-L30

## 83.2 Population expansion

The prior population already contains 20 notice dates spanning April–September 2026. Current BOC publication activity also continues into September 2026, including the September 3 MICP notice covering shipments discharged August 26–September 2. citeturn909587search16

For this pass, the BOC population is therefore treated as a **30-record notice-level control population target**, while preserving a separate shipment-row layer for records whose attached B/L/Registry Number details are actually recoverable.

This distinction matters:

```text
NOTICE RECORD
    ≠
SHIPMENT RECORD
```

## 83.3 Rich-field schema

```text
notice_id
notice_date
collection_district
port
shipment_discharge_date
bill_of_lading
registry_number
affected_consignee
declaration_status_at_notice
declaration_id
assessment_id
assessment_date
payment_reference
payment_date
release_instruction
release_date
claim_date
abandonment_state
source_record
source_observation_date
```

## 83.4 Field recovery state

| Field family | Current state | eGovTrace use |
|---|---|---|
| Notice date | RECOVERABLE | Event timing |
| Port / district | RECOVERABLE | Institutional/location grouping |
| B/L | RECOVERABLE for sampled shipment rows | Native transaction identity |
| Discharge date | RECOVERABLE for sampled rows | Control-age calculation |
| Consignee | RECOVERABLE for sampled rows | Counterparty grouping |
| Declaration ID | NOT ESTABLISHED at full-population scale | Bridge target |
| Assessment | NOT ESTABLISHED at full-population scale | Financial/control bridge |
| Payment settlement | NOT ESTABLISHED at full-population scale | Settlement bridge |
| Release event | NOT ESTABLISHED at full-population scale | Operational completion |
| Abandonment decree | NOT ESTABLISHED at full-population scale | Enforcement outcome |

## 83.5 Large-population signals

### `BOC-P05 — CONTROL-AGE DISTRIBUTION`

Because BOC publishes discharge-related and notice dates, eGovTrace can calculate elapsed time between those events when the row-level dates are available.

The system must use the legal/process window applicable to the relevant period rather than a universal threshold. Current BOC notices describe the applicable filing/payment/claim windows. citeturn909587search5

### `BOC-P06 — RECURRING CONTROL-STATE VOLUME`

Repeated notice publication is evidence that the operational process produces a recurring control population. It is **not** itself evidence of failure or misconduct.

### `BOC-P07 — DOWNSTREAM EVIDENCE GAP`

When a B/L is recoverable but declaration/assessment/payment/release cannot be independently linked, eGovTrace should emit:

```text
IDENTITY_BRIDGE_REQUIRED
DOWNSTREAM_EVIDENCE_GAP
```

not `NON-PAYMENT` or `CORRUPTION`.

## 83.6 BOC conclusion

**PASS for population-level control testing; NOT YET SUFFICIENT for settlement-level anomaly scoring.**

The limiting factor is not the number of public notices. It is the recoverability and lawful accessibility of downstream shipment-level records.

---

# 84. CAAP / AIRPORT — LARGER PROCUREMENT + LIFECYCLE POPULATION

## 84.1 Population basis

The prior comparison population contains 20 CAAP/airport-related PhilGEPS procurement records with reference number, solicitation, title/domain, procurement mode, status, ABC, and delivery period. Those records include awarded, active, closed, failed, and indexed states, including public-bidding and small-value procurement.

The current CAAP transparency environment exposes 2026 post-contract award disclosures and separate Notice-to-Proceed collections, while its 2026 BAC page also exposes current airport procurement projects and negotiation records. citeturn909587search15turn909587search17

The existing 20-record population therefore remains valid as the base population, with **rich-field augmentation** rather than a silent replacement of the original sample.

## 84.2 Rich-field augmentation model

For each CAAP record, the enrichment process seeks:

```text
PhilGEPS reference number
solicitation number
project title
procuring entity
airport / site
procurement mode
ABC
bid status
awardee
award notice number
award date
contract number
contract price
NTP number
NTP date
implementation start
planned completion
actual completion
inspection / acceptance
payment / disbursement evidence
settlement evidence
post-contract disclosure
```

CAAP's public transparency page explicitly separates award notices, Notices to Proceed, post-contract award disclosures, and other procurement records. citeturn909587search17

## 84.3 Confirmed rich-field anchor

The previously tested Naga Airport runway procurement remains the richest CAAP anchor in the population:

```text
Bid: 24-076-10 ALPHA
BAC Resolution: 2024-0910-258 (Alpha)
Awardee: E. Garcia Construction Corporation
Contract price: PHP71,525,446.15
NOA: 20 January 2025
Contract Agreement: publicly listed
```

The prior adjudication classified project→bid, bid→BAC resolution, BAC resolution→awardee, project→NOA, and project→Contract Agreement as confirmed, while NTP, obligation, disbursement, settlement, and physical completion were not established in that pass. fileciteturn8file1L118-L191

## 84.4 Rich-field comparison tests

### `CAAP-P05 — AWARDEE RECURRENCE`

Test:

```text
AWARDEE
   ↓
MULTIPLE PROJECTS
   ↓
MULTIPLE AIRPORTS / ENTITIES
```

A repeated awardee is not suspicious by itself. The comparison should control for procurement volume, category, geography, eligibility, and time.

### `CAAP-P06 — CONTRACT / NTP CONTINUITY`

Test whether:

```text
PHILGEPS REF
  ↓
AWARD
  ↓
CONTRACT
  ↓
NTP
```

can be reconstructed for each record without assuming that the native identifiers are universal.

### `CAAP-P07 — COMPLETION / PAYMENT DISCONNECT`

Where public data exposes completion but no financial execution evidence, the signal is:

```text
COMPLETION_EVIDENCE_WITH_UNRESOLVED_FINANCIAL_CHAIN
```

Where financial evidence exists but completion/acceptance is unresolved:

```text
FINANCIAL_EXECUTION_WITH_UNRESOLVED_DELIVERY_STATE
```

Neither is a fraud finding.

## 84.5 Current public-source boundary

Current CAAP public infrastructure exposes the existence of NTP and post-contract disclosure collections, but the public/indexed material does not provide a complete project-by-project payment-settlement chain for the comparison population. citeturn909587search17

Therefore:

**PASS for procurement/lifecycle bridge testing; PARTIAL for payment/settlement testing.**

---

# 85. QUEZON CITY — LARGER DAILY-OPERATIONS PROCUREMENT + SERVICE-CONTROL POPULATION

## 85.1 Population basis

The prior LGU population contains 20 Quezon City solicitation records across offices including BPLD, CAO, OCM/LDRRMF, QCGH, QCPC, QCU, RMBGH, SSDD, PDAO and others.

The current QC procurement environment provides a substantially richer public artifact pattern because individual Notice-of-Award pages can expose the **NOA, NTP, contract and BAC resolution as separate downloadable records**. Examples currently published include Engineering and OCM-CDF projects, while the BPLD OPSE record exposes the same four-document pattern for the previously traced daily-operation system. citeturn909587search0turn909587search1turn909587search2turn909587search4

## 85.2 Rich-field schema

```text
project_number
procurement_reference
office
project_title
procurement_mode
ABC
bidder_count
winning_bidder
NOA_number
NOA_date
contract_number
contract_price
NTP_number
NTP_date
BAC_resolution
implementation_period
acceptance / completion
audit / inspection record
payment record
service-system linkage
operational event linkage
```

## 85.3 Confirmed rich-field anchor

The BPLD OPSE project remains the primary daily-operation anchor:

```text
Project: CAO(BPLD)-25-IT-0272
Contract: GS-2503015
Supplier: SANDMAN SOFTWARE SYSTEMS, INC.
Contract price: PHP8,700,000
NTP start: 04 April 2025
```

The public record confirms project→contract, contract→supplier, contract→price, contract→NTP, and project→BOSS/permit/inspection operational scope. fileciteturn6file3L166-L199

## 85.4 Large-population control tests

### `QC-P05 — DOCUMENT-BUNDLE COMPLETENESS`

For each procurement in the population:

```text
RESOLUTION
NOA
CONTRACT
NTP
```

are treated as separate evidence objects. A missing document is a **lifecycle evidence gap**, not a presumption that the document does not exist.

### `QC-P06 — OFFICE / SUPPLIER CONCENTRATION`

Test whether awardees recur disproportionately within:

```text
OFFICE
CATEGORY
YEAR
PROCUREMENT MODE
```

before generating a review signal.

### `QC-P07 — PROCUREMENT → SERVICE EVENT GAP`

For operational technology, compare:

```text
PROCUREMENT
   ↓
SYSTEM CONTRACT
   ↓
NTP
   ↓
DEPLOYMENT / ACCEPTANCE
   ↓
ACTUAL SERVICE EVENTS
```

The last step is the most difficult from public data because individual citizen records are generally not a public comparison population.

## 85.5 Current rich-field public evidence

QC's current Notice-of-Awards infrastructure explicitly publishes contract, NOA, NTP and resolution artifacts for individual projects. citeturn909587search0turn909587search1turn909587search2turn909587search3turn909587search6turn909587search7turn909587search8turn909587search11turn909587search12turn909587search13

This makes QC the strongest of the three public surfaces for **document-bundle continuity testing**.

It is still not sufficient to infer individual officer misconduct or manipulate private citizen records into a public graph.

**PASS for procurement/document lifecycle testing; PARTIAL for transaction-level operational-event testing.**

---

# 86. Cross-Population Rich-Field Coverage Matrix

| Capability | BOC | CAAP | Quezon City LGU |
|---|---|---|---|
| Stable native identifier | ✓ B/L / notice | ✓ PhilGEPS ref / solicitation | ✓ Project / contract IDs |
| Awardee | limited / usually not relevant to customs transaction | ✓ on enriched award records | ✓ on rich procurement records |
| Contract ID | not applicable to shipment control | partial/publicly recoverable | ✓ strong public surface |
| NTP | not applicable | partial | ✓ strong public surface |
| Payment instruction | target field | partial | partial |
| Payment settlement | not established at population scale | not established at population scale | not established at transaction scale |
| Completion / acceptance | release/claim state | partial | partial |
| Inspection | customs inspection is a process state, individual event not publicly joined | airport/project inspection exists as a control domain | permit/inspection process exists; individual event logs not public |
| Operational event log | partial | partial | not publicly available at citizen level |
| Timing analysis | ✓ process windows | ✓ delivery periods | ✓ document/event dates where available |
| Recurrence | ✓ | ✓ | ✓ |
| Concentration | limited | ✓ | ✓ |
| Cross-system identity bridge | ✓ essential | ✓ essential | ✓ essential |

---

# 87. Composite Signal Testing — Version 2

The richer population allows a more disciplined composite signal model.

```text
COMPARATIVE DEVIATION
        +
CONTROL EXCEPTION
        +
IDENTITY CONFIDENCE
        +
MATERIALITY
        +
EVIDENCE COMPLETENESS
        +
TEMPORAL CONTEXT
        ↓
REVIEW CANDIDATE
```

## 87.1 Signal classes

### CLASS A — Evidence-gap signal

Example:

```text
CONTRACT CONFIRMED
NTP EXPECTED
NTP NOT RECOVERED
```

Output:

`DOWNSTREAM_EVIDENCE_GAP`

### CLASS B — Timing-deviation signal

Example:

```text
OBSERVED TIME
vs.
DOMAIN BASELINE / LEGAL CONTROL WINDOW
```

Output:

`TIMING_EXCEPTION`

### CLASS C — Recurrence signal

Example:

```text
SAME NATIVE IDENTIFIER
REPEATED ACROSS DOCUMENTS / EVENTS
```

Output:

`RECURRENCE_PATTERN`

### CLASS D — Concentration signal

Example:

```text
AWARDEE
   ↓
UNUSUALLY HIGH SHARE
   ↓
COMPARABLE PROCUREMENT POPULATION
```

Output:

`CONCENTRATION_REVIEW_CANDIDATE`

### CLASS E — Control-sequence signal

Example:

```text
EXPECTED:
AWARD → CONTRACT → NTP → IMPLEMENTATION → ACCEPTANCE → PAYMENT

OBSERVED:
AWARD → CONTRACT → [GAP] → PAYMENT
```

Output:

`CONTROL_SEQUENCE_BREAK_CANDIDATE`

---

# 88. False-Positive Controls

The richer population introduces a serious danger: **more analytics can create more false positives**.

Therefore eGovTrace must run counter-tests before promoting a signal.

```text
SIGNAL
 ↓
CHECK PROCUREMENT MODE
 ↓
CHECK PROJECT / TRANSACTION TYPE
 ↓
CHECK TIME PERIOD
 ↓
CHECK DATA AVAILABILITY
 ↓
CHECK LEGAL / PROCEDURAL EXCEPTION
 ↓
CHECK ALTERNATIVE EXPLANATION
 ↓
PROMOTE OR DOWNGRADE SIGNAL
```

Examples:

```text
SHORT DELIVERY PERIOD
≠ suspicious

FAILED BID
≠ suspicious

RECURRING CONTRACTOR
≠ suspicious

RECURRING B/L NOTICE
≠ suspicious

HIGH AWARDEE CONCENTRATION
≠ collusion

MISSING PUBLIC RECORD
≠ missing internal record

PAYMENT NOT PUBLICLY OBSERVED
≠ non-payment
```

The system should therefore score **evidence sufficiency**, not guilt probability.

---

# 89. New Research Metric — Evidence Coverage Ratio

The richer population justifies a new engineering metric:

```text
EVIDENCE COVERAGE RATIO
=
number of expected fields with directly recoverable evidence
-------------------------------------------------------------
number of expected fields in the domain-specific lifecycle model
```

This metric is **not** an integrity score.

Example:

```text
CAAP record
Expected rich fields = 20
Directly established = 14
Evidence coverage = 70%
```

Interpretation:

```text
70% evidence coverage
≠
70% compliance
```

It only tells eGovTrace how complete the currently recoverable evidence chain is.

---

# 90. New Research Metric — Identity Bridge Quality

A second metric is required because field presence alone is insufficient.

```text
BRIDGE QUALITY
=
identity evidence
+
relationship evidence
+
temporal consistency
+
source authority
+
absence of contradictory evidence
```

Suggested states:

```text
A — DIRECT / AUTHORITATIVE
B — MULTI-SOURCE / CONSISTENT
C — AGENCY-ORIGIN SECONDARY
D — INFERENTIAL / REQUIRES CONFIRMATION
E — REJECTED / CONTRADICTED
```

A bridge with high field coverage but weak identity evidence must not be promoted into the graph as fact.

This is an extension of the existing rule:

> **IDENTIFIER RECOVERY ≠ IDENTIFIER PROOF.**

The same rule was empirically demonstrated by the earlier FMR near-miss and by the airport procurement trace. fileciteturn9file3L269-L283 fileciteturn8file1L187-L191

---

# 91. Population Governance

Every production comparison population should eventually carry a frozen population manifest:

```yaml
comparison_population_id:
domain:
subdomain:
unit_of_analysis:
sources:
inclusion_rule:
exclusion_rule:
start_date:
end_date:
record_count:
selection_method:
source_snapshot_dates:
field_schema_version:
identity_resolution_version:
control_rule_version:
analysis_version:
```

This prevents a future problem where an anomaly disappears simply because the comparison population was silently changed.

---

# 92. What This Larger-Population Pass Actually Proves

The research now supports the following stronger statements:

```text
✓ 20-record comparison sets can be expanded without changing the native identity model.
✓ Rich-field augmentation can be layered over the original population rather than replacing it.
✓ Awardee, contract, NTP, completion and inspection are separate evidence objects.
✓ Payment settlement remains a distinct evidence state.
✓ Timing rules must be domain-specific.
✓ Concentration analysis requires contextual denominators.
✓ Operational daily-government traces require event-level models, not only procurement records.
✓ Evidence coverage and bridge quality should be measured independently.
✓ Composite signals should remain review candidates, not accusations.
```

The research does **not** support:

```text
✗ national corruption prevalence estimates
✗ person-level guilt scoring
✗ automatic collusion findings
✗ universal payment visibility
✗ universal access to operational transaction logs
✗ universal cross-agency identity
```

---

# 93. Research Decision — Rich-Field Population Pass

**DECISION:** `PASS — LARGER-POPULATION TESTING JUSTIFIED; RICH-FIELD ANALYSIS IS ARCHITECTURALLY STABLE BUT DATA-ACCESS LIMITED`

The eGovTrace platform can now be specified around a more mature analytical stack:

```text
POPULATION
   ↓
NATIVE RECORD
   ↓
RICH-FIELD ENRICHMENT
   ↓
IDENTITY BRIDGE
   ↓
EVENT / CONTROL STATE
   ↓
BASELINE
   ↓
DEVIATION
   ↓
EVIDENCE COVERAGE
   ↓
CONTROL SIGNAL
   ↓
AUTHORIZED REVIEW
```

No G0–G6 score is silently changed by this result.

The pending DPWH FOI remains an independent evidence-acquisition stream. Its result can later enrich the financial-execution research, but it does not invalidate this national operational-control expansion.

---

# 94. Immediate Next Experimental Requirement

The next empirical step should no longer be “collect more public records” in the abstract.

It should be:

```text
TAKE THE 20–50 RECORD POPULATION
        ↓
FOR EACH RECORD, ATTEMPT RICH-FIELD RECOVERY
        ↓
NORMALIZE AWARDEE / CONTRACT / NTP / PAYMENT / COMPLETION / INSPECTION
        ↓
BUILD EVENT TIMELINES
        ↓
RUN CONTROL RULES
        ↓
MANUALLY ADJUDICATE TOP SIGNALS
        ↓
MEASURE FALSE POSITIVES
        ↓
FREEZE RULE VERSION
```

The immediate priority order is:

```text
1. QUEZON CITY — richest public NOA/NTP/contract/resolution surface
2. CAAP — procurement + NTP + post-contract disclosure bridge
3. BOC — shipment-row extraction + declaration/assessment/payment/release bridge
```

This ordering is based on **evidence availability for the experiment**, not on an assumption that one institution is more or less corrupt than another.

---

---

# 95. Signal Validation + False-Positive Study — September 2026

**Status:** EXECUTED / CONTROL-SIGNAL VALIDATION STUDY v1.0  
**Relationship to G0–G6:** Additive research validation artifact. No G0–G4 score is changed. This is not a new formal gate.  
**Purpose:** Determine whether the current eGovTrace control signals survive manual evidence adjudication across the existing BOC, CAAP, Quezon City, and FMR comparison populations.

## 95.1 Research question

> **When eGovTrace raises a control signal from real government records, does the signal identify a genuine control/evidence condition, a legitimate operational variation, an evidence-access limitation, or an incorrect join?**

The study deliberately avoids treating the outcome as a binary `corrupt / not corrupt` classification.

The adjudication classes are:

```text
A — CONFIRMED CONTROL EXCEPTION
B — LEGITIMATE / EXPECTED VARIATION
C — EVIDENCE INSUFFICIENT
D — IDENTITY / JOIN ERROR
E — RULE FAILURE / INVALID SIGNAL
```

## 95.2 Source populations used

The study uses the populations already established in this artifact rather than silently creating a new sampling universe:

```text
POPULATION A — BOC / PORT OF MANILA
Public notice-level operational population

POPULATION B — CAAP / AIRPORT PROCUREMENT
20+ airport / aviation procurement records

POPULATION C — QUEZON CITY LGU
20+ daily-operation procurement records

POPULATION D — FMR / DPWH
Frozen-source project population + selected G4 candidates
```

The BOC population is explicitly notice-level rather than transaction-level; B/L → declaration → assessment → payment → release remains only partially observable publicly. The CAAP population is procurement-centered. The Quezon City population is procurement/service-system centered. The FMR population is project-centered with known identity-continuity gaps. These are different grains and are not pooled as though they were the same object.

## 95.3 Frozen analytical principles

The study preserves the existing principles:

```text
CONNECTION IS NOT CORRUPTION.
IDENTIFIER RECOVERY ≠ IDENTIFIER PROOF.
NOT OBSERVED ≠ ABSENT.
UNAVAILABLE ≠ FALSE.
PAYMENT-INSTRUCTION EVIDENCE ≠ PAYMENT-SETTLEMENT EVIDENCE.
EVERY MATERIAL CLAIM MUST HAVE PROVENANCE.
EVERY JOIN MUST HAVE AN EXPLICIT EVIDENTIARY BASIS.
CONTROL BREAKS ARE INVESTIGATION SIGNALS, NOT AUTOMATIC FINDINGS OF WRONGDOING.
```

These rules are already frozen in the approved architecture. fileciteturn5file2L519-L554

---

# 96. Pre-Registered Signal Catalogue v1.0

The first versioned catalogue contains the following control-rule candidates:

| Rule ID | Signal | Trigger concept | Default output |
|---|---|---|---|
| `ET-REC-001` | Native identifier recurrence | same native identifier occurs in multiple source records/events | `RECURRENCE_PATTERN` |
| `ET-TIM-001` | Control-window timing exception | observed event is outside a domain-defined control window | `TIMING_EXCEPTION` |
| `ET-EVG-001` | Downstream evidence gap | expected lifecycle successor cannot be recovered | `DOWNSTREAM_EVIDENCE_GAP` |
| `ET-IDN-001` | Identity bridge required | source records may correspond but proof is incomplete | `IDENTITY_BRIDGE_REQUIRED` |
| `ET-STS-001` | Status transition candidate | material state transition occurs and supporting lifecycle records are incomplete | `STATUS_TRANSITION_REVIEW_CANDIDATE` |
| `ET-CON-001` | Concentration review candidate | counterparty/entity share is unusually high within a valid comparison set | `CONCENTRATION_REVIEW_CANDIDATE` |
| `ET-SEQ-001` | Control-sequence break candidate | observed lifecycle order differs from expected sequence | `CONTROL_SEQUENCE_BREAK_CANDIDATE` |
| `ET-OUT-001` | Operational outcome evidence gap | system/procurement exists but outcome event cannot be linked | `OPERATIONAL_OUTCOME_EVIDENCE_GAP` |

No rule in v1.0 outputs `corrupt`, `fraudulent`, `collusive`, `bribery`, or `guilty`.

---

# 97. Manual Adjudication Protocol

Every triggered signal was required to pass the same review sequence:

```text
1. VERIFY SOURCE RECORD
2. VERIFY NATIVE IDENTIFIER
3. VERIFY EVENT DATE / PUBLICATION DATE
4. VERIFY IDENTITY BRIDGE
5. CHECK EXPECTED CONTROL OR PROCEDURAL BASELINE
6. CHECK FOR LEGITIMATE EXCEPTION
7. CHECK FOR DATA-ACCESS / PUBLICATION LIMITATION
8. CHECK FOR CONTRADICTORY EVIDENCE
9. ASSIGN ADJUDICATION CLASS
10. RETAIN THE SIGNAL ONLY IF ITS MEANING SURVIVES REVIEW
```

A signal was downgraded whenever the apparent exception could be explained by source grain, legitimate procurement mode, ordinary recurrence, publication timing, an unavailable internal record, or a weak identity join.

---

# 98. Adjudication — Population A / BOC

## 98.1 `ET-REC-001` — publication/record recurrence

**Observed:** repeated Port of Manila Notice-to-Lodge/File-Entry publications across the sampled period.

**Adjudication:** `B — LEGITIMATE / EXPECTED VARIATION`

**Reason:** recurring notices are an expected operational consequence of customs processing and therefore are not anomalous merely because they recur. The BOC notice itself identifies shipments whose goods declaration had not been filed at publication and separately describes the subsequent declaration, payment, and claim windows. citeturn891654search1

**Rule disposition:** retain as a **population/indexing signal**, not as a wrongdoing signal.

## 98.2 `ET-TIM-001` — control-window exception

**Observed:** BOC's process provides explicit filing/payment/claim windows, making timing calculation possible.

**Adjudication:** `C — EVIDENCE INSUFFICIENT` for transaction-level exception rates in this pass.

**Reason:** the available population is primarily the public notice publication layer. The underlying individual declaration, assessment, payment, and release events are not consistently recoverable at population scale.

**Rule disposition:** retain, but require transaction-level event evidence before promotion to `A`.

## 98.3 `ET-EVG-001` — downstream evidence gap

**Observed:** sampled notice records do not independently establish declaration, assessment, settlement, or release for each underlying shipment.

**Adjudication:** `A — CONFIRMED CONTROL EXCEPTION` is **not** appropriate.

**Final classification:** `C — EVIDENCE INSUFFICIENT`.

This is a confirmed **evidence-coverage gap**, not a confirmed operational breach.

**Rule disposition:** retain as `DOWNSTREAM_EVIDENCE_GAP` with a mandatory evidence-availability qualifier.

## 98.4 BOC rule result

```text
RECURRENCE       → legitimate variation
TIMING           → testable, but transaction data incomplete
DOWNSTREAM GAP   → real evidence gap, not proof of misconduct
```

---

# 99. Adjudication — Population B / CAAP

The CAAP population contains public bidding, small-value procurement, shopping, failed procurement, short delivery periods, and long delivery periods. The current CAAP 2026 BAC page also visibly contains multiple procurement stages, including invitations, bid documents, BAC resolutions, notices of award, and re-bid/failure states across projects. citeturn891654search0

## 99.1 `ET-REC-001` — identifier recurrence / repeated procurement identity

**Adjudication:** `B — LEGITIMATE / EXPECTED VARIATION` unless recurrence cannot be explained by document lifecycle.

A procurement reference repeated across its own bid/BAC/award documents is expected and should normally increase identity confidence rather than create suspicion.

**Rule disposition:** refine rule wording from “same identifier repeats” to:

> **same identifier repeats in materially inconsistent contexts without an explainable lifecycle relationship.**

This prevents normal bid → resolution → NOA → contract continuity from generating false positives.

## 99.2 `ET-TIM-001` — delivery-period extreme

**Observed:** comparison population contains periods from very short supply/service windows to much longer infrastructure and system implementations.

**Adjudication:** `B — LEGITIMATE / EXPECTED VARIATION`.

A seven-day supplies purchase and a multi-month runway or systems project cannot use one universal timing threshold.

**Rule disposition:** retain only as a **context-normalized baseline test**.

## 99.3 `ET-STS-001` — failed procurement → subsequent transition

**Observed:** at least one population record is explicitly marked `Failed`.

**Adjudication of the status itself:** `B — LEGITIMATE / EXPECTED VARIATION`.

A failed bidding outcome is a valid procurement state. It becomes review-worthy only when combined with a subsequent sequence that cannot be explained by the applicable procurement process or supporting records.

**Rule disposition:** retain as `PROCUREMENT_OUTCOME_TRANSITION_CANDIDATE`.

## 99.4 `ET-EVG-001` — contract → NTP / financial / completion gap

**Adjudication:** `C — EVIDENCE INSUFFICIENT` when public records establish the procurement and award but do not establish downstream lifecycle events.

This matches the detailed CAAP trace, where the project → bid → BAC resolution → NOA → contract chain is confirmed but NTP, obligation/disbursement, settlement and physical completion were not independently established in the earlier pass. fileciteturn8file1L165-L178

## 99.5 CAAP rule result

```text
REFERENCE RECURRENCE     → normal when lifecycle-consistent
DELIVERY EXTREMES        → normal after contextualization
FAILED BID               → legitimate state
DOWNSTREAM GAP           → evidence gap unless contrary evidence exists
```

---

# 100. Adjudication — Population C / Quezon City LGU

## 100.1 `ET-REC-001` — solicitation recurrence

**Observed:** repeated BPLD and other office solicitation identifiers across procurement publication batches.

**Adjudication:** `B — LEGITIMATE / EXPECTED VARIATION` when explained by amendments, reposting, rebidding, or document lifecycle.

The earlier BPLD trace confirms that `CAO(BPLD)-25-IT-0272` and `GS-2503015` form a documented procurement/contract chain for the operational system environment. fileciteturn6file3L166-L199

**Rule disposition:** retain only when recurrence is **contextually unexplained**.

## 100.2 `ET-CON-001` — operational-domain concentration

**Observed:** multiple procurement records cluster around particular offices/domains.

**Adjudication:** `B — LEGITIMATE / EXPECTED VARIATION` at the population level.

**Reason:** offices naturally procure repeatedly for their statutory functions. Concentration becomes analytically meaningful only after normalization by:

```text
office size
procurement category
budget authority
service demand
time period
contract type
procurement mode
```

**Rule disposition:** retain as a **portfolio-comparison candidate**, never as a standalone wrongdoing signal.

## 100.3 `ET-OUT-001` — procurement/system → citizen-service evidence gap

**Observed:** public records establish procurement and system scope, but a comparable population of individual permit applications, inspection events, approval actions, payment events, and release events is not publicly recoverable in this pass.

**Adjudication:** `C — EVIDENCE INSUFFICIENT`.

The correct statement is:

> **The public evidence chain does not currently reach the citizen transaction level.**

It is not:

> “The system is not operating.”

## 100.4 LGU rule result

```text
SOLICITATION RECURRENCE   → often normal
OFFICE CONCENTRATION      → expected until normalized
SERVICE-EVENT GAP         → evidence-availability limitation
```

---

# 101. Adjudication — Population D / FMR

The FMR population has two different analytical roles:

```text
FMR WATCH POPULATION
→ population identity / project-level comparison

G4 CANDIDATES
→ deep identity / financial execution trace
```

## 101.1 `ET-IDN-001` — identity bridge requirement

**Observed:** project identity can be confidently linked to budget representations in the selected candidates, while the bridge into primary procurement, contract, obligation, disbursement and settlement remains unresolved.

**Adjudication:** `C — EVIDENCE INSUFFICIENT`, not an identity error.

The earlier G4 work explicitly concluded that the unresolved issue is cross-system identity continuity rather than proof of non-payment. fileciteturn9file0L83-L93

## 101.2 `ET-EVG-001` — project → procurement → financial execution gap

**Adjudication:** `C — EVIDENCE INSUFFICIENT`.

For Candidate 2, budget and agency-origin contract/implementation evidence were recovered, but the exact primary procurement, primary contract, project-specific obligation, and project-specific payment remained unestablished. fileciteturn9file3L301-L350

## 101.3 Historical-route recurrence

The Cabarasan–Dao route appears in multiple temporal records, including older interventions.

**Adjudication:** `B — LEGITIMATE / EXPECTED VARIATION` unless an explicit evidence bridge proves that separate records are actually the same intervention.

This is another practical demonstration that **same place + similar title ≠ same project**.

## 101.4 FMR rule result

```text
IDENTITY BRIDGE REQUIRED      → valid review state
FINANCIAL EVIDENCE GAP        → unresolved evidence state
SAME ROUTE / REPEATED PROJECT → normal temporal possibility
```

---

# 102. False-Positive Findings Across All Populations

The strongest false-positive mechanisms observed in the study are:

### FP-01 — Normal lifecycle recurrence

A native procurement ID appearing in bid, BAC resolution, NOA and contract documents is not suspicious. It is expected identity continuity.

**Action:** require contextual inconsistency before triggering `RECURRENCE_PATTERN`.

### FP-02 — Procurement-mode confounding

Public bidding, negotiated procurement, small-value procurement, shopping, failed bidding and re-bidding have different normal sequences.

**Action:** every timing and sequence rule must branch on procurement mode.

### FP-03 — Source-grain mismatch

A BOC notice record, a CAAP procurement record and an LGU solicitation record are not equivalent analytical units.

**Action:** comparison populations must be domain- and grain-specific.

### FP-04 — Public-availability bias

A missing public record can result from restricted access, non-indexing, publication practice, or source-system separation.

**Action:** represent `EVIDENCE_UNAVAILABLE` separately from `EVENT_NOT_OCCURRED`.

### FP-05 — Geographic/temporal reuse

The same road, airport, facility, or operational domain can legitimately receive multiple interventions across years.

**Action:** require temporal and documentary continuity before joining interventions.

### FP-06 — Concentration without denominator

A frequent contractor, supplier, or office can be normal when its underlying workload or authorized scope is large.

**Action:** concentration requires a defined comparison population and denominator.

---

# 103. Signal Disposition Matrix v1.0

| Rule | Current disposition | Evidence class most often produced | Production readiness |
|---|---|---|---|
| `ET-REC-001` | Refine with lifecycle context | B | RESEARCH-ONLY |
| `ET-TIM-001` | Keep domain-specific | B/C | RESEARCH-ONLY |
| `ET-EVG-001` | Keep with evidence-availability qualifier | C | RESEARCH / FUTURE PRODUCTION |
| `ET-IDN-001` | Promote as bridge-state indicator | C/D | RESEARCH / FUTURE PRODUCTION |
| `ET-STS-001` | Keep as transition candidate | B/C | RESEARCH-ONLY |
| `ET-CON-001` | Denominator/context required | B | RESEARCH-ONLY |
| `ET-SEQ-001` | Requires lifecycle-mode branching | B/C | RESEARCH-ONLY |
| `ET-OUT-001` | Keep as service-evidence gap | C | RESEARCH / FUTURE PRODUCTION |

No rule is approved in this study as a direct corruption classifier.

---

# 104. First Versioned eGovTrace Control-Rule Catalogue

## `ET-REC-001 v1.1` — Contextual Recurrence

```yaml
rule_id: ET-REC-001
version: 1.1
name: Contextual Native-Identifier Recurrence
trigger:
  - same native identifier appears in multiple records
required_context:
  - record_type
  - lifecycle_stage
  - event_date
  - source_system
  - document_relationship
suppress_when:
  - recurrence is explained by ordinary document lifecycle
output:
  RECURRENCE_PATTERN
never_output:
  CORRUPTION
  COLLUSION
  GUILT
```

## `ET-TIM-001 v1.1` — Domain-Scoped Timing Exception

```yaml
rule_id: ET-TIM-001
version: 1.1
name: Domain-Scoped Timing Exception
trigger:
  - observed event date falls outside validated domain-specific control window
required_context:
  - domain
  - event_type
  - applicable_rule_or_process
  - evidence_of_event_date
  - legitimate_exception_check
output:
  TIMING_EXCEPTION
fallback:
  EVIDENCE_INSUFFICIENT
```

## `ET-EVG-001 v1.1` — Downstream Evidence Gap

```yaml
rule_id: ET-EVG-001
version: 1.1
name: Downstream Evidence Gap
trigger:
  - upstream lifecycle state is confirmed
  - expected downstream state cannot be independently recovered
required_context:
  - expected_successor
  - source_availability_status
  - access_class
output:
  DOWNSTREAM_EVIDENCE_GAP
never_infer:
  NON_PAYMENT
  NON_PERFORMANCE
  FRAUD
```

## `ET-IDN-001 v1.1` — Identity Bridge Required

```yaml
rule_id: ET-IDN-001
version: 1.1
name: Identity Bridge Required
trigger:
  - candidate records have plausible correspondence
  - direct evidentiary proof is incomplete
output:
  IDENTITY_BRIDGE_REQUIRED
fallback:
  DO_NOT_JOIN_AS_FACT
```

## `ET-STS-001 v1.1` — Status Transition Review Candidate

```yaml
rule_id: ET-STS-001
version: 1.1
name: Status Transition Review Candidate
trigger:
  - material lifecycle status changes
  - transition evidence is incomplete or inconsistent
required_context:
  - previous_status
  - new_status
  - expected_transition
  - transition_document
output:
  STATUS_TRANSITION_REVIEW_CANDIDATE
```

## `ET-CON-001 v1.1` — Contextual Concentration

```yaml
rule_id: ET-CON-001
version: 1.1
name: Contextual Concentration Review Candidate
trigger:
  - entity share is unusual within a defined comparable population
required_context:
  - denominator
  - time_window
  - category
  - procurement_mode
  - office_or_entity_scope
output:
  CONCENTRATION_REVIEW_CANDIDATE
never_infer:
  COLLUSION
```

## `ET-SEQ-001 v1.1` — Control Sequence Break

```yaml
rule_id: ET-SEQ-001
version: 1.1
name: Control Sequence Break Candidate
trigger:
  - observed lifecycle order materially differs from expected domain sequence
required_context:
  - domain_sequence
  - event_timestamps
  - exception_authority
  - supporting_documents
output:
  CONTROL_SEQUENCE_BREAK_CANDIDATE
```

## `ET-OUT-001 v1.1` — Operational Outcome Evidence Gap

```yaml
rule_id: ET-OUT-001
version: 1.1
name: Operational Outcome Evidence Gap
trigger:
  - procurement/system/project is confirmed
  - corresponding service/outcome event cannot yet be linked
output:
  OPERATIONAL_OUTCOME_EVIDENCE_GAP
never_infer:
  SERVICE_FAILURE
  NON_DELIVERY
```

---

# 105. Composite Signal Test v1.0

The study rejects a simple additive “corruption score.”

Instead, composite review should operate as a gated conjunction:

```text
VALID IDENTITY
    AND
VALID COMPARISON SET
    AND
VALID CONTROL RULE
    AND
MATERIAL DEVIATION
    AND
NO DOCUMENTED LEGITIMATE EXCEPTION
    AND
SUFFICIENT EVIDENCE
        ↓
REVIEW CANDIDATE
```

If any of the required evidence conditions are missing:

```text
REVIEW CANDIDATE
        ↓
DOWNGRADE
        ↓
EVIDENCE GAP / UNRESOLVED / NEEDS REVIEW
```

This is intentionally conservative.

---

# 106. False-Negative Constraint

A false-positive study cannot establish absence of false negatives from these public datasets.

The current study therefore **does not claim** that every true irregularity would have been detected.

Reasons include:

```text
restricted internal records
non-public transaction logs
missing historical documents
unrecoverable attachments
unknown legitimate exceptions
unknown ground-truth case outcomes
```

The current experiment can evaluate **whether signals survive manual review**. It cannot yet establish population-wide sensitivity.

---

# 107. What This Study Proves

At this stage, the research supports:

```text
✓ Some eGovTrace signals are useful as evidence-navigation states.
✓ Many apparent anomalies disappear after contextual review.
✓ Native-identifier recurrence is usually not suspicious by itself.
✓ Timing requires domain-specific baselines.
✓ Concentration requires a valid denominator.
✓ Evidence gaps are analytically useful when explicitly labeled as such.
✓ Identity uncertainty must be represented directly in the graph.
✓ Composite signals should be review candidates, not accusations.
✓ A versioned rule catalogue is feasible.
```

It does **not** support:

```text
✗ a national corruption score
✗ a person-level corruption probability
✗ automatic collusion detection
✗ proof that missing public records imply missing government records
✗ a national false-negative rate
```

---

# 108. Research Decision — Signal Validation Study

**DECISION: PASS — eGovTrace CONTROL-SIGNAL MODEL SURVIVES INITIAL MANUAL FALSE-POSITIVE REVIEW.**

The stronger result is not that the system “found corruption.”

The stronger result is that it learned to distinguish:

```text
NORMAL VARIATION
LEGITIMATE EXCEPTION
EVIDENCE LIMITATION
IDENTITY ERROR
RULE FAILURE
CONFIRMED CONTROL EXCEPTION
```

without collapsing these states into one accusation category.

This is the minimum behavior required for a trustworthy accountability-intelligence layer.

---

# 109. Next Research Gatekeeper — Prospective Blind Signal Test

The next experiment should be **prospective and blind**.

Researchers should freeze:

```text
population
comparison set
field schema
identity rules
control-rule version
signal thresholds
```

before examining the downstream outcome of the selected records.

Then:

```text
RUN SIGNALS
   ↓
FREEZE OUTPUT
   ↓
INDEPENDENT MANUAL ADJUDICATION
   ↓
REVEAL OUTCOME EVIDENCE
   ↓
COMPARE
   ↓
MEASURE PRECISION / ERROR MODES
```

This is the point where eGovTrace begins testing **predictive usefulness of the control model**, rather than simply explaining records after the fact.

---

# 110. Relationship to Pending DPWH FOI

The DPWH FOI remains a separate evidence-acquisition stream.

It should **not** be used to retroactively tune `ET-EVG-001` or any other rule after seeing its answer.

When the FOI response arrives:

```text
FOI RESPONSE
   ↓
CASE A EVIDENCE ADJUDICATION
   ↓
COMPARE AGAINST PREVIOUS SIGNAL
   ↓
CHECK WHETHER THE SIGNAL WAS CORRECT
   ↓
ONLY THEN CONSIDER RULE VERSION UPDATE
```

This prevents outcome leakage into the current rule-validation study.

---

# 111. Final Study Position

The eGovTrace research has now moved through:

```text
RECORD ENUMERATION
      ↓
IDENTITY CONTINUITY
      ↓
CROSS-SYSTEM TRACE
      ↓
CONTROL SIGNAL DESIGN
      ↓
COMPARISON POPULATIONS
      ↓
RICH-FIELD POPULATIONS
      ↓
FALSE-POSITIVE / MANUAL ADJUDICATION
      ↓
VERSIONED CONTROL-RULE CATALOGUE
```

The next question is no longer merely:

> **Can eGovTrace find unusual records?**

It is:

> **Can eGovTrace identify meaningful control deviations prospectively, at scale, with a measurable and defensible false-positive profile, while preserving evidence and uncertainty?**

That is the next empirical test of whether eGovTrace can function as a reliable accountability intelligence system rather than merely a graph of government records.

---

# 112. Reconstructed Blind Signal Test — September 2026

A reconstructed blind holdout test was executed after the signal-validation study. The test froze the population, feature fields, identity rules, control-rule versions, and thresholds; generated signals without using downstream outcome fields; froze the signal output; and only then revealed previously withheld downstream evidence for manual adjudication.

This is explicitly a **RECONSTRUCTED BLIND HOLDOUT TEST**, not a genuinely future prospective field cohort, because the records are historical and already present in the research corpus. The separate report documents the holdout composition, signal outputs, adjudication and limitations.

See:

`eGovTrace_Prospective_Blind_Signal_Test_2026.md`

**Decision:** PASS — reconstructed blind signal test completed. The current model can generate non-accusatory control signals before downstream evidence is revealed, but a genuine forward-looking cohort is still required before production claims about predictive usefulness or national error rates can be made.
