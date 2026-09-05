# eGovTrace Public Accountability Ecosystem Architecture

## Research Decision Record

**Status:** APPROVED / RESEARCH ARCHITECTURE
**Relationship to G0–G6:** Additive architectural layer; does **not** modify frozen G0/G1/G2 ontology or create a new formal gate.
**Primary purpose:** Define a citizen-facing accountability layer and an authorized government assurance workspace on top of fragmented government transparency, budget, procurement, project, audit, and disclosure systems.

---

# 1. Executive Decision

The research should proceed on the premise that the Philippines already has a substantial but fragmented transparency/disclosure ecosystem. The problem is therefore not simply the absence of transparency portals.

The architectural gap is the absence of a sufficiently interoperable, evidence-backed layer that can connect the same public intervention across institutional representations while preserving each source system's authority.

**Decision:** eGovTrace should evolve conceptually into a **national state accountability ecosystem** with:

```text
                    eGovTrace Ecosystem
                             |
             ---------------------------------------
             |                  |                  |
      Citizen Accountability  Government       Source / Evidence
            Layer             Assurance Layer        Layer
             |                  |                  |
             ---------------------------------------
                             |
                       eGovTrace Core
                             |
                     State Evidence Graph
```

The citizen-facing component is not a replacement for existing government portals. It is an interoperability and accountability layer over them.

The government-facing component supports authorized auditors, investigators, internal audit units, oversight bodies, agencies, and other legally competent users in tracing unresolved relationships and routing cases to the appropriate institutional owner.

---

# 2. Why This Architecture Emerged From the Research

The FMR experiment demonstrated the difference between having a project record and being able to trace that project across government systems.

The frozen FMR Watch population contains **6,467 project records**, preserved under a fixed frame ID and SHA-256, and its complete enumeration was independently reproduced at the population-identity level. The frame records the portal as a project-oriented source rather than as the entire State project universe. fileciteturn0file5L2-L17

The experiment then exposed the harder problem: identity continuity becomes less certain as the research moves from project representation toward procurement, contract, obligation, payment, physical verification, and outcome.

This is the precise reason eGovTrace needs a cross-system accountability layer rather than another isolated portal.

The broader research already identified the same structural problem: the Philippines has substantial institutional capacity, but records are often represented as separate administrative silos while the physical/public-finance reality crosses those boundaries. fileciteturn1file7L1253-L1338

The research also independently proposed a National Agency Graph, Asset Registry, Flood/Hazard Graph, Mobility Graph, Project Graph, Procurement Graph, and Land-Use Graph, with the explicit warning that the system should become an operational platform rather than another government website. fileciteturn1file6L855-L857 fileciteturn1file7L1102-L1122

---

# 3. Existing Public Transparency Ecosystem

The architecture must start from what already exists rather than assuming the State has no transparency infrastructure.

## 3.1 Open.gov.ph — Gateway / discovery layer

`open.gov.ph` describes itself as a gateway to Philippine government transparency portals and lists national agencies and GOCCs. citeturn397022search0

This demonstrates that an agency-oriented transparency ecosystem already exists at national scale, but the gateway does not by itself establish a persistent cross-system project identity.

## 3.2 DPWH Transparency Portal

The DPWH Transparency Portal is already project/contract-oriented and publicly exposes fields such as contract description, implementing office, contractor, cost, accomplishment, completion date, and searchable location/contract information. Its current public interface reports hundreds of thousands of contracts. citeturn397022search4

This is the closest existing national-agency analogue to the proposed citizen project view, but it remains primarily a DPWH-domain representation.

## 3.3 PhilGEPS

PhilGEPS serves as the centralized electronic government procurement portal. Its natural unit is procurement rather than an entire public-project lifecycle.

Therefore:

```text
PhilGEPS procurement record
≠
complete project lifecycle record
```

## 3.4 DBM transparency / financial reporting

DBM and agency Transparency Seal pages expose approved budgets, procurement plans, contracts, financial accountability reports, and other disclosures. Current examples include FAR reporting categories and annual budget/target disclosures. citeturn397022search2turn397022search10

These are essential financial sources but are not automatically project-centric or identity-linked to every downstream transaction.

## 3.5 DILG Full Disclosure Policy Portal

The Full Disclosure Policy framework requires LGUs to disclose specified financial information, with centralized public repositories used to support constituent access. A current LGU FDP instance describes the portal as a centralized repository for budget and disbursement-related disclosures. citeturn397022search5

This confirms that local-government transparency is already part of the public ecosystem.

## 3.6 PPP Center project database

The PPP Center provides a searchable project database that can cover implementing agencies, regions, sectors, project status, and map-related information, including national and subnational implementing entities.

This demonstrates that the project concept can already cross organizational boundaries, but it remains a sector/program-specific registry rather than a universal state-project identity layer.

## 3.7 Agency-specific transparency portals

Open.gov.ph hosts agency-specific transparency interfaces and document repositories. For example, the Pag-IBIG transparency interface exposes Annual Procurement Plans, governance documents, FOI documents, and other disclosures. citeturn397022search11

Other agencies maintain their own procurement monitoring systems; DSWD, for example, exposes procurement projects with IDs, dates, procurement mode, ABC, and status. citeturn397022search7

## 3.8 Statutory transparency requirements

The national budget framework itself establishes infrastructure-project transparency requirements, including project title/location/description, ABC estimates, winning contractor and awarded bid details. citeturn397022search6

**Research conclusion:** The State already has many disclosure mechanisms. The architectural opportunity is therefore interoperability, identity continuity, evidence provenance, control monitoring, and routing—not simply another document repository.

---

# 4. What eGovTrace Is — and Is Not

## eGovTrace IS

```text
Cross-system accountability infrastructure
Evidence and provenance graph
Temporal state graph
Identity-resolution layer
Project and money reconciliation engine
Control and assurance workspace
Citizen-facing accountability layer
Case-routing and evidence-gap mechanism
```

## eGovTrace IS NOT

```text
A corruption database
A replacement for PhilGEPS
A replacement for DBM
A replacement for COA
A replacement for DPWH portals
A replacement for LGU systems
A single centralized source-of-truth database
An AI authority that declares guilt
A substitute for lawful investigation
```

The foundational rule remains:

> **CONNECTION IS NOT CORRUPTION.**

The broader research already specifies that procurement graphs should turn anomalies into audit signals rather than guilt determinations. fileciteturn1file3L552-L593

---

# 5. Architectural Layers

## Layer A — Existing Institutional Source Systems

Government remains the authoritative producer/custodian of its institutional records where applicable.

Examples:

```text
DBM
DPWH
DA
DOTr
DILG
LGUs
PhilGEPS
COA
PPP Center
GOCCs
Agency procurement systems
Agency financial systems
Agency project portals
```

The architecture should reuse these systems rather than duplicate or replace them.

## Layer B — eGovTrace Core

The core maintains:

```text
canonical identities
relationships
source references
provenance
assertions
temporal validity
reconciliation states
evidence links
control states
case relationships
```

It must preserve the distinction between:

```text
REAL-WORLD OBJECT / EVENT
INSTITUTIONAL REPRESENTATION
SOURCE RECORD / EVIDENCE
ASSERTION / ANALYSIS
```

## Layer C — Citizen Accountability Layer

A unified public interface for published and lawfully public information.

## Layer D — Government Assurance Workspace

A controlled interface for authorized government users with appropriate permissions.

## Layer E — Evidence / Acquisition Layer

Handles:

```text
public retrieval
source snapshots
FOI requests
manual document acquisition
evidence provenance
source versioning
access status
```

---

# 6. Citizen-Facing Product Concept

Working conceptual name:

# National Public Project & Accountability Registry

Alternative working name:

# Philippine Public Investment & Accountability Portal

These are research names only. Branding is not frozen.

The citizen-facing layer should provide a general-purpose table similar in usability to FMR Watch, but not limited to FMRs.

## Primary table dimensions

```text
Project ID / public identity
Project title
Implementing agency
Implementing branch / office
Sector
Program
Location
Province
City / municipality
Barangay
Fiscal year
Funding source
Budget
Procurement status
Contractor / supplier
Contract amount
Start date
Expected completion
Actual accomplishment where published
Completion status
Inspection status where published
Audit status where published
Outcome / performance information where available
Last update
Evidence / source links
```

Every displayed value should be traceable to one or more source representations.

The interface should visibly distinguish:

```text
CONFIRMED
DOCUMENTED
REPORTED
UNRESOLVED
NOT OBSERVED
NOT PUBLICLY AVAILABLE
```

It should never turn a missing value into an implied negative statement.

---

# 7. Multiple Public Views Over One Graph

The same underlying graph should support several views.

## All-Projects View

```text
ALL PUBLIC PROJECTS
```

with filtering by agency, branch, region, province, city/municipality, barangay, sector, year, funding source, lifecycle stage and status.

## Agency View

```text
DPWH
DA
DOTr
DENR
DHSUD
DepEd
DOH
DILG
LGUs
GOCCs
...
```

## Branch / Implementing Unit View

```text
Agency
 ├── Central Office
 ├── Regional Office
 ├── District / Field Office
 └── Project-specific implementing unit
```

## Geographic View

```text
Philippines
→ Region
→ Province
→ City/Municipality
→ Barangay
→ Project
```

## Money View

```text
Funding source
→ agency
→ program
→ PAP/UACS
→ project
→ allotment
→ obligation
→ disbursement
→ payment
```

## Procurement View

```text
Agency
→ procurement
→ bidders
→ winner
→ contract
→ variation
→ implementation
```

## Accountability View

```text
Project
→ evidence gap
→ control issue
→ responsible custodian
→ assigned review authority
→ resolution
```

---

# 8. Government Assurance Workspace

The government side is not merely a more detailed public portal.

It is an investigation-support environment.

## Example control-break workflow

```text
PROJECT
  ↓
identity established
  ↓
BUDGET established
  ↓
PROCUREMENT unresolved
  ↓
SYSTEM IDENTIFIES CONTROL BREAK
  ↓
LIKELY RECORD CUSTODIAN
  ↓
LEGAL / ADMINISTRATIVE AUTHORITY
  ↓
EVIDENCE REQUEST
  ↓
HUMAN REVIEW
  ↓
RESOLUTION / ESCALATION
```

The system does not determine guilt.

It determines where a relationship is unresolved and which competent institution should examine it.

---

# 9. Case Routing Engine

A central architectural concept is:

> **route the problem, not the accusation.**

The system should infer a likely responsible institutional pathway from the type of control issue.

Example classes:

```text
Procurement issue
→ procuring entity / BAC / procurement office
→ appropriate internal audit / oversight

Financial-reporting issue
→ accounting / finance unit
→ appropriate oversight

Physical-project discrepancy
→ implementing engineering / inspection unit
→ agency audit / COA / other competent authority as applicable

LGU disclosure issue
→ LGU / DILG / COA depending on the specific issue

Potential criminal matter
→ appropriate investigative / prosecutorial authority
```

Exact legal authority must be established from current law, regulation, and agency mandate before automated routing is used operationally.

---

# 10. Identity-Continuity Engine

This becomes a core eGovTrace capability.

The system must not assume that the project name, code, amount, geography, contractor, or fiscal year is a universal key.

Instead, it tests continuity between institutional representations.

Example:

```text
FMR UUID
→ FMR code
→ implementing agency project ID
→ procurement reference
→ contract number
→ UACS/PAP
→ SARO / allotment reference
→ ORS
→ DV
→ LDDAP-ADA / ADA
→ JEV
→ settlement
```

For each transition the system records:

```text
source record
identifier
join basis
supporting attributes
source authority
temporal validity
confidence
alternative interpretations
unresolved reason
```

## Standing control rule

> **IDENTIFIER RECOVERY ≠ IDENTIFIER PROOF**

The rule is based on an actual FMR research near-miss: a UACS-rooted DPWH PMR identifier appeared superficially relevant to the selected FMR but the underlying procurement entry concerned a fire-alarm procurement for the district office rather than the FMR.

Therefore the architecture must actively detect and reject false joins.

---

# 11. Financial Lifecycle Model

Financial execution must retain separate evidence states.

```text
APPROPRIATION
    ↓
ALLOTMENT / FUNDING AUTHORITY
    ↓
OBLIGATION / ORS
    ↓
DISBURSEMENT DOCUMENT / DV
    ↓
LDDAP-ADA / ADA
    ↓
ACCOUNTING / JEV
    ↓
SETTLEMENT / PAYMENT
```

Do not collapse this into:

```text
PAID = TRUE
```

The system should distinguish:

```text
appropriated
allotted
obligated
disbursement documented
payment instruction documented
accounting entry documented
settlement confirmed
```

And:

> **PAYMENT-INSTRUCTION EVIDENCE ≠ PAYMENT-SETTLEMENT EVIDENCE**

---

# 12. Public vs Government Evidence

## Public layer may expose

```text
published project data
published budgets
published procurement
published contracts
published implementation reports
published audit findings
public evidence links
known evidence gaps
version histories
```

## Government layer may additionally expose, subject to law and authorization

```text
internal transaction records
internal accounting references
restricted evidence
case notes
evidence requests
investigative workflow
control-break assignments
escalation state
```

The system must implement role-based and source-specific access rather than assuming every government record should become public.

---

# 13. Temporal Architecture

The system must model at least four different temporal concepts:

```text
RECORD DATE
DATE OF REAL-WORLD EVENT
SOURCE PUBLICATION / UPDATE DATE
RESEARCH OBSERVATION DATE
```

These are not interchangeable.

Example:

```text
ORS dated: 2024
Research retrieval: 2026
```

The record's date remains 2024.

The discovery date is 2026.

Standing rule:

> **SEARCH TIME ≠ EVIDENCE DATE**

The broader system should also preserve historical versions rather than allowing later source updates to overwrite the historical state silently.

---

# 14. Research Effort Metadata

Where the system is used for research or audit-support experiments, record:

```text
execution_start_utc
execution_end_utc
calendar_elapsed_time
active_research_time
research sessions
researcher / process identity where appropriate
```

Standing rule:

> **ACTIVE RESEARCH TIME ≠ CALENDAR ELAPSED TIME**

Calendar time is an audit/reproducibility fact.

Active research time is an effort/retrieval-complexity measure.

The G4 time-band must use active research time if the metric is intended to proxy retrieval difficulty:

```text
≤4h       favorable
>4–8h     constrained
>8h       adverse
```

---

# 15. Citizen Transparency Does Not Mean Citizen Investigation

The public system should allow citizens to:

```text
observe
compare
search
filter
follow evidence
report discrepancies
track public resolutions
```

It should not encourage users to:

```text
declare guilt
conduct vigilante investigations
publish personal/private information
circumvent access controls
infer criminality from graph relationships
```

Citizen reports should enter the evidence/event layer as **claims or reports**, not automatically as facts.

---

# 16. Audit and Assurance Intelligence

Authorized users should be able to ask graph-level questions such as:

```text
Which projects have a budget but no reconciled procurement record?

Which contracts have unexplained variations?

Which projects report completion without independently recoverable completion evidence?

Which financial transactions cannot be joined back to a project?

Which projects share contractors, consultants, locations, or procurement patterns?

Which obligations remain unresolved beyond their expected completion window?

Which project outcomes cannot be linked to the intervention that supposedly produced them?
```

But system outputs remain:

```text
anomaly
control break
unresolved relationship
risk signal
review candidate
```

not:

```text
corrupt
fraudulent
guilty
```

The existing research explicitly requires anomaly → evidence → investigation rather than relationship → guilt. fileciteturn1file3L573-L595

---

# 17. Project Lifecycle View

The generalized citizen and government project record should eventually resemble:

```text
PLAN
 ↓
INVESTMENT PROGRAM
 ↓
BUDGET
 ↓
PROCUREMENT
 ↓
AWARD
 ↓
CONTRACT
 ↓
OBLIGATION
 ↓
DISBURSEMENT
 ↓
PAYMENT
 ↓
IMPLEMENTATION
 ↓
INSPECTION
 ↓
COMPLETION
 ↓
ASSET / SERVICE IN OPERATION
 ↓
OUTCOME
 ↓
AUDIT / PERFORMANCE FEEDBACK
 ↓
FUTURE FUNDING / CORRECTION
```

Every arrow is an explicit research question.

A project can be complete at one stage and unresolved at another.

---

# 18. Planning / Investment / Project-Control Integration

The previously researched PIP-CTRL work remains a separate research stream.

It should eventually feed the ecosystem as a cross-cutting analytical capability:

```text
PLAN
→ INVESTMENT PROGRAM
→ BUDGET
→ PROJECT
→ PROCUREMENT
→ IMPLEMENTATION
→ OUTCOME
→ PERFORMANCE FEEDBACK
```

The architecture does **not** automatically turn PIP-CTRL into a new ontology or formal gate.

The system should only absorb a new Project Control pattern if further empirical research demonstrates that existing eGovTrace relationships are insufficient to represent repeated planning/investment/control relationships.

---

# 19. OCP Integration

Obligation Compliance Persistence remains a first-class assurance pattern.

It should monitor:

```text
obligation created
→ expected fulfillment
→ observation
→ variance
→ explanation
→ escalation if necessary
→ resolution
→ closure
```

It must never treat non-observation alone as non-compliance.

---

# 20. Relationship to FMR Watch

FMR Watch should remain a specialized source and proof-of-concept, not the universal model.

Conceptually:

```text
FMR Watch
    ↓
FMR project representation
    ↓
eGovTrace identity / evidence layer
    ↓
Budget
Procurement
Contract
Financial execution
Physical evidence
Audit
Outcome
```

The frozen FMR frame is therefore an empirical demonstration of one source population inside the future ecosystem.

The frame remains frozen and must not be altered merely because the future public platform is broader.

---

# 21. National + Subnational Scope

The ecosystem must cover, as applicable:

```text
National agencies
Regional offices
Provincial governments
Cities
Municipalities
Barangays
GOCCs
SUCs
Water districts
Other public entities
```

It should not assume that all entities have identical data availability, legal authority, reporting obligations, or system capability.

Local autonomy remains a structural constraint. The architecture therefore follows:

```text
national standards
+
national interoperability
+
shared identity / evidence conventions
+
local execution
```

rather than centralized micromanagement.

The earlier whole-of-government research explicitly preserved local autonomy while proposing national interoperability standards, data, financing mechanisms, and coordination. fileciteturn1file0L71-L87

---

# 22. Physical-Resilience Relationship

This accountability ecosystem may eventually connect to the future physical-resilience architecture.

For example:

```text
PROJECT
→ ASSET
→ LOCATION
→ HAZARD
→ POPULATION
→ MOBILITY
→ SERVICE
→ OUTCOME
```

The broader physical-resilience research already proposes National Asset, Flood/Hazard, Mobility, Project, Procurement, and Land-Use graphs, plus an eventual Philippine digital twin. fileciteturn1file8L1557-L1645

However, that physical-resilience layer remains conceptually distinct from the current eGovTrace accountability experiment.

The two should integrate later through shared identities and evidence, not by prematurely rewriting the frozen eGovTrace ontology.

---

# 23. Transparency Portal vs Accountability Ecosystem

The distinction is fundamental.

## Traditional transparency portal

```text
publish documents
→ citizen searches
→ citizen downloads
```

## eGovTrace accountability ecosystem

```text
source records
→ identity resolution
→ temporal reconciliation
→ evidence/provenance
→ control monitoring
→ unresolved relationship
→ responsible authority
→ human investigation
→ resolution
→ feedback
→ public accountability
```

The difference is not visual design.

It is **system function**.

---

# 24. Core Citizen Question

The public interface should ultimately answer:

> **Where is public money going, what is government doing with it, what happened, and what evidence supports the answer?**

The system should also clearly show when it cannot answer.

For example:

```text
Budget: CONFIRMED
Procurement: NOT OBSERVED
Contract: UNRESOLVED
Payment: NOT OBSERVED
Physical completion: REPORTED
Independent verification: NOT ESTABLISHED
```

This is preferable to manufacturing a false complete narrative.

---

# 25. Core Government Question

The government assurance workspace should answer:

> **Can we prove the lifecycle of this public intervention, identify where control continuity breaks, determine which institution owns the relevant evidence or decision, and preserve the evidence for audit/investigation?**

That is the operational purpose of the backend.

---

# 26. Architectural Principles to Freeze

```text
1. SOURCE SYSTEMS REMAIN AUTHORITATIVE FOR THEIR OWN RECORDS.

2. eGovTrace PROVIDES CROSS-SYSTEM RECONCILIATION, NOT SYSTEM REPLACEMENT.

3. CONNECTION IS NOT CORRUPTION.

4. IDENTIFIER RECOVERY ≠ IDENTIFIER PROOF.

5. NOT OBSERVED ≠ ABSENT.

6. UNAVAILABLE ≠ FALSE.

7. PAYMENT-INSTRUCTION EVIDENCE ≠ PAYMENT-SETTLEMENT EVIDENCE.

8. SEARCH TIME ≠ EVIDENCE DATE.

9. ACTIVE RESEARCH TIME ≠ CALENDAR ELAPSED TIME.

10. PUBLIC DISCLOSURE ≠ INVESTIGATIVE AUTHORITY.

11. AI OUTPUT ≠ FACT OR LEGAL DETERMINATION.

12. EVERY MATERIAL CLAIM MUST HAVE PROVENANCE.

13. EVERY JOIN MUST HAVE AN EXPLICIT EVIDENTIARY BASIS.

14. EVERY HISTORICAL STATE MUST REMAIN TEMPORALLY PRESERVABLE.

15. CITIZEN REPORTS ARE CLAIMS/REPORTS UNTIL EVIDENCE ESTABLISHES OTHERWISE.

16. CONTROL BREAKS ARE INVESTIGATION SIGNALS, NOT AUTOMATIC FINDINGS OF WRONGDOING.

17. NATIONAL INTEROPERABILITY MUST RESPECT LOCAL AUTONOMY AND LEGAL AUTHORITY.
```

---

# 27. ABSORB / EXTEND / DEFER / REJECT / VERIFY Decisions

## ABSORB

### ABSORB — Public Accountability Layer

Create a citizen-facing national public-project/accountability interface over existing source systems.

### ABSORB — Government Assurance Workspace

Create a controlled backend for authorized auditors/investigators and responsible agencies.

### ABSORB — Identity-Continuity Engine

Make cross-system project identity reconciliation a central capability.

### ABSORB — Evidence / Provenance Layer

Every public assertion and government-facing analytical state should preserve source and provenance.

### ABSORB — Case Routing Concept

Use control-break classification to identify the likely evidence custodian / competent authority, subject to legal validation.

### ABSORB — Temporal Model

Preserve historical state, event date, source update date, and research observation date separately.

### ABSORB — Public / Government Role Separation

Different access tiers over the same underlying graph.

---

# 28. EXTEND

### EXTEND — Project Graph

Extend the current project concept beyond FMRs to national and subnational public interventions.

### EXTEND — Procurement Graph

Connect procurement representations to project identities without assuming procurement IDs are universal project IDs.

### EXTEND — Financial Graph

Extend money tracing from budget/allotment into ORS, DV, LDDAP-ADA/ADA, JEV and settlement states.

### EXTEND — Asset / Physical Evidence Graph

Connect project interventions to physical assets and inspection evidence.

### EXTEND — Outcome Graph

Represent expected outcome, observed outcome, measurement source, time period and uncertainty.

### EXTEND — OCP

Use obligation compliance persistence across public obligations and projects.

---

# 29. DEFER

### DEFER — National Digital Twin as an immediate product requirement

The broader digital-twin architecture is valuable but depends on further data, physical-modeling, governance and interoperability work.

### DEFER — Full automated government case assignment

Routing should first be tested as decision support. Legal authority and responsibility must not be guessed.

### DEFER — Universal real-time financial integration

Do not assume that all internal financial systems will be immediately interoperable or legally expose transaction data.

### DEFER — Complete outcome measurement for every project

Outcome measurement quality varies substantially across sectors and programs.

### DEFER — Replacement of agency transparency portals

No evidence currently justifies replacing them. The architecture should integrate them.

---

# 30. REJECT

### REJECT — Centralized replacement database as the first architecture

This would duplicate source systems, create authority problems, and risk flattening important institutional distinctions.

### REJECT — Universal project ID assumed without evidence

Identity continuity must be empirically established.

### REJECT — Automatic corruption scoring based on graph connectivity

Graph proximity is not wrongdoing.

### REJECT — Public exposure of sensitive/internal investigative information by default

Access must follow applicable law and authorization.

### REJECT — AI as final investigative authority

Human legal/administrative authority remains responsible for decisions.

---

# 31. VERIFY

The following require empirical research before being considered mature architecture:

### VERIFY — National project identity standard

Determine whether an existing national identifier can serve as a durable public-project identity across systems, or whether eGovTrace needs a composite identity model.

### VERIFY — Cross-agency identifier persistence

Test actual transitions:

```text
project code
→ procurement
→ contract
→ UACS/PAP
→ ORS
→ DV
→ payment
```

### VERIFY — RAOD accessibility and utility

Establish whether RAOD records for selected implementing units/projects are accessible and whether they actually contain useful bridge identifiers.

### VERIFY — FOI acquisition effectiveness

Determine, by government layer and custodian, whether FOI requests can recover transaction-level evidence not otherwise public.

### VERIFY — LGU interoperability

Test whether local government project/financial disclosures can be reconciled into the same model without violating local autonomy or source authority.

### VERIFY — Outcome data availability

Test whether measurable project outcomes exist consistently enough to support national outcome tracing.

### VERIFY — Case-routing accuracy

Empirically test whether the proposed routing logic identifies the institution that actually has legal custody/authority for a given control issue.

### VERIFY — Public portal usability

Determine whether a table-first model actually improves citizen comprehension compared with document-heavy transparency portals.

---

# 32. Relationship to Existing Research Gates

This architecture is **not** a new G0–G6 gate.

The current experiment remains:

```text
G0  Frozen
G1  Complete
G2  Complete / Frozen
G3  Complete
G4  Controlled reconciliation / deepening
G5  Future
G6  Future
```

The Public Accountability Ecosystem is an architectural layer derived from research findings.

It must not contaminate the FMR experiment's neutral population or candidate-selection logic.

The two selected FMR candidates remain selected for G4 purposes only.

---

# 33. Current Research Implication

The FMR experiment began with a narrow question about whether a public FMR project record could be enumerated and reproduced.

It has now exposed a broader architecture question:

> **Can the Philippine State make its existing fragmented transparency systems function as one evidence-backed accountability environment without replacing the systems themselves?**

The current answer is:

**Architecturally plausible, empirically not yet proven.**

The missing proof lies primarily in identity continuity, financial execution continuity, physical verification, outcome measurement, and lawful evidence acquisition.

---

# 34. Proposed Long-Term Ecosystem

```text
                         CITIZENS
                            |
                            v
             NATIONAL PUBLIC ACCOUNTABILITY LAYER
                            |
       ------------------------------------------------
       |              |              |                |
   Projects        Money        Procurement       Outcomes
       |              |              |                |
       ------------------------------------------------
                            |
                            v
                    eGovTrace CORE
                            |
       ------------------------------------------------
       |              |              |                |
 Identity        Evidence       Temporal          Control /
 Resolution      Provenance     Graph             Assurance
       |              |              |                |
       ------------------------------------------------
                            |
                 GOVERNMENT ASSURANCE WORKSPACE
                            |
       ------------------------------------------------
       |          |          |          |            |
      COA      Agency      DBM       DILG       Ombudsman
       |          |          |          |            |
       ------------------------------------------------
                            |
                    SOURCE SYSTEMS
                            |
       ------------------------------------------------
       |       |        |        |       |           |
     DPWH   PhilGEPS   DBM      COA     LGUs      Agencies
       |       |        |        |       |           |
       ------------------------------------------------
                            |
                     REAL-WORLD STATE
                            |
       ------------------------------------------------
       |        |        |        |        |         |
     People   Assets   Money   Places   Services   Outcomes
```

This is the target architecture, not an assertion that the complete system already exists.

---

# 35. Final Architectural Position

The research should now stop treating transparency as a collection of websites.

The more useful mental model is:

> **The Philippines already has many transparency surfaces. eGovTrace's role is to make those surfaces interoperable around evidence-backed identities, relationships, time, control states, and human accountability.**

The citizen should not have to understand which agency owns which database just to answer:

> “What happened to this public project?”

The auditor should not have to manually reconstruct an institution-spanning project lifecycle from dozens of disconnected websites and spreadsheets when the relevant records can legally be connected.

The responsible agency should not receive an accusation generated merely from a graph relationship. It should receive a **specific unresolved control relationship, the available evidence, the missing evidence, the likely custodian, and the appropriate review pathway**.

The system should ultimately make it possible to move from:

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

without confusing any of those concepts with automatic findings of corruption.

---

# 36. Immediate Research Consequence

This document does **not** authorize implementation of a national public portal yet.

The next research task should be validation of the proposed architecture's most important assumptions, beginning with:

```text
1. National/subnational project identity
2. Cross-system bridge identifiers
3. Financial execution continuity
4. Source custody and lawful acquisition
5. Case-routing authority
6. Outcome evidence availability
```

The architecture should remain **research-approved / not yet implementation-approved** until those assumptions are empirically tested.

---

# 37. One-Sentence Definition

> **eGovTrace is a national state accountability ecosystem that sits above fragmented government source systems, preserves their authority and provenance, reconciles identities and relationships across them, provides a citizen-facing public accountability view, and gives authorized government actors an evidence-backed workspace for detecting control breaks, routing them to the appropriate authority, and following them through resolution.**
