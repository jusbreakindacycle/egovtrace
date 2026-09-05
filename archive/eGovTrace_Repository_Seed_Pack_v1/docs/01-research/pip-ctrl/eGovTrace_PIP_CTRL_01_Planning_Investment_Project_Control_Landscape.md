# eGovTrace Research Gate
## National + Subnational Planning / Investment / Project-Control Landscape Mapping
### Gate PIP-CTRL-01 — Research Baseline

**Date:** 2026-09-03  
**Status:** RESEARCH BASELINE — NOT YET A FINAL ONTOLOGY DECISION  
**Decision purpose:** Determine whether “Project Control” should become an official eGovTrace cross-cutting control/assurance pattern, and define the authoritative planning/investment/project surfaces that eGovTrace must be able to reconcile.

---

## 1. Gate Question

Can eGovTrace trace the relationship among:

**PLAN → PRIORITY → AUTHORITY → BUDGET → PROCUREMENT → CONTRACT → IMPLEMENTATION → PAYMENT → VERIFICATION → ASSET → OUTCOME → MAINTENANCE/PERFORMANCE**

across national and subnational government, using actual official planning instruments, investment programs, budgets, project registries, procurement records, monitoring systems, disclosure systems, and audit records?

A positive answer would support formalizing **Project Control** as a cross-cutting eGovTrace pattern. A negative answer would mean the concept needs to be narrowed, deferred, or treated as a research hypothesis.

---

## 2. Adversarial Challenge Before Adoption

We must not start from the assumption that Philippine government planning is simply “fragmented” or that there is “no comprehensive master plan.”

The official architecture already contains multiple planning and investment layers.

RA 12145 assigns DEPDev the role of ensuring vertical and horizontal coherence of national and subnational plans, overseeing public investment, evaluating projects, monitoring priority PAPs, establishing a centralized monitoring data system, and using evaluation findings to inform future planning calls.

The law also creates a 25-year Long-Term Development Framework, requires agency sectoral infrastructure master plans, and provides for consolidation into a Comprehensive Infrastructure Development Master Plan (CIDMP).

Therefore the research must test a narrower proposition:

> **The possible gap is not absence of planning. The gap may be whether approved plans actually control project selection, budgeting, implementation, continuation, modification, and future funding across institutional boundaries and political time.**

This distinction is mandatory.

---

## 3. National Planning / Investment Landscape

### 3.1 Long-term framework

**Long-Term Development Framework — 25 years, initial horizon to 2050**

Purpose:
- overarching national direction
- long-term goals and milestones
- infrastructure development strategy
- coordination of later national/subnational/sectoral plans

### 3.2 Philippine Development Plan (PDP)

**PDP 2023–2028**

Functions:
- national development strategy
- goals, outcomes, strategies, programs and projects
- results-oriented framework

The PDP is accompanied by **Results Matrices** containing indicators, baselines, annual targets, end-of-plan targets, means of verification, responsible agency and reporting entity.

### 3.3 Regional Development Plans

Regional Development Plans translate the PDP to the subnational regional level.

### 3.4 Public Investment Program (PIP)

PIP is the rolling list of priority programs and projects for national government, GOCCs, GFIs and other national government offices/instrumentalities.

**PIPOL** is the official web-based project database used for PAP submission, agency focal updates, validation and reporting.

### 3.5 Three-Year Rolling Infrastructure Program (TRIP)

TRIP functions as the rolling infrastructure investment programming layer feeding budget preparation.

### 3.6 Sectoral Infrastructure Master Plans

RA 12145 requires agencies to formulate sectoral infrastructure master plans responsive to the Long-Term Development Framework.

### 3.7 Comprehensive Infrastructure Development Master Plan (CIDMP)

The sectoral infrastructure master plans are to be consolidated and vetted by the Infrastructure Development Committee into the CIDMP.

The law expressly states that the CIDMP is intended to provide the foundation for forward planning, prioritization and infrastructure investment/program development.

---

## 4. National Budget / Project Surfaces

### 4.1 National Expenditure Program (NEP)

Proposal-stage budget representation.

### 4.2 General Appropriations Act (GAA)

Enacted annual appropriation representation, including agency/program/project/activity allocations.

### 4.3 Budget execution and financial systems

Relevant layers for future tracing include allotment, obligation and disbursement/financial records, subject to public accessibility and authorization.

### 4.4 Agency accomplishment / performance records

Potential evidence for whether the funded PAP generated the planned outputs and outcomes.

---

## 5. Subnational Planning / Investment Landscape

### 5.1 Local Comprehensive Land Use Plan (CLUP)

Spatial/land-use planning foundation for cities and municipalities.

### 5.2 Provincial Development and Physical Framework Plan (PDPFP/PPFP)

Provincial spatial/development framework.

### 5.3 Comprehensive Development Plan (CDP)

Core local development plan.

### 5.4 Local Development Investment Program (LDIP)

The LDIP converts the CDP into a prioritized, finance-linked multi-year list of programs, activities and projects.

### 5.5 Annual Investment Program (AIP)

The AIP is the annual slice of the LDIP and contains annual resource requirements for PPAs.

### 5.6 Local Budget

The local budget is the fiscal authorization layer.

### 5.7 Barangay planning/budgeting

Barangays have their own planning and budgeting instruments and must be considered separately rather than treated as merely “small municipalities.”

### 5.8 Harmonization principle

Existing DBM guidance expressly states that LGU plans/investment programs should be harmonized with higher-level LGU and national plans to optimize resources and avoid duplication.

This is a critical potential reconciliation relationship for eGovTrace.

---

## 6. Local Financial / Disclosure Surfaces

### Full Disclosure Policy (FDP)

DILG’s Full Disclosure Policy requires LGUs, including barangays, to disclose specified financial documents and information concerning budgets, finances, expenditures, contracts and projects.

This creates a potentially important public-facing local evidence layer.

### LGU eBudget

DBM maintains an eBudget system for LGUs.

These should be tested for:
- coverage
- identity keys
- project-level granularity
- historical persistence
- machine readability
- cross-linkability to LDIP/AIP/budget/disclosure records

---

## 7. Project / Procurement / Monitoring Surfaces

Candidate official or government-linked surfaces for reconciliation include:

- PIPOL
- TRIP records
- GAA project/program/activity tables
- PhilGEPS / procurement records
- DPWH project monitoring systems such as SubayBAYAN
- DA program/project monitoring systems such as FMR-related monitoring
- LGU FDP project and financial disclosures
- LGU eBudget-related outputs
- COA audit reports, including financial, compliance and performance audit material
- agency accomplishment and performance reports
- geospatial / physical verification sources where lawfully accessible

The research must distinguish:
**existence of a portal** from **project-level joinability**.

---

## 8. Performance / Merit-Based Control Landscape

A “performance-based” idea is not new to the Philippine government.

DBM documentation shows a results-oriented budgeting architecture in which budgets and physical targets are linked to expected results, including Performance-Informed Budgeting and Program Expenditure Classification.

DEPDev’s current mandate is even stronger: it is required to evaluate programs/projects, monitor implementation using measurable indicators, evaluate impacts/outcomes, and use evaluation findings in future planning instructions.

Therefore the hypothesis to test is NOT:

> “Does the Philippines have performance-based budgeting?”

The correct hypothesis is:

> **Does historical project performance materially affect the next decision to fund, continue, expand, modify, or terminate a project/program?**

This is the possible **performance-feedback gap**.

---

## 9. Flood / Water Planning as a High-Value Test Domain

The 2026 GAA contains a DPWH special provision directing formulation of an Integrated Water Resources and Flood Management Master Plan (IWRFMP).

The provision calls for flood-control, drainage, bridge and road projects to be integrated into a programmatic, basin-wide, network-based framework crossing political/administrative boundaries.

This is particularly useful for eGovTrace because it creates a testable relationship:

**MASTER PLAN → PROJECT PRIORITY → BUDGET → IMPLEMENTATION → FLOOD-REDUCTION OUTCOME**

The relevant question is whether this chain is actually observable and persistent across agencies and local governments.

---

## 10. Preliminary Reconciliation Model

A government project should eventually be representable as:

### Planning layer
Applicable plan
→ plan objective
→ priority/strategy
→ target/outcome

### Authority layer
Legal/administrative authority
→ responsible institution
→ approving authority
→ implementation responsibility

### Investment layer
PAP/project nomination
→ appraisal/evaluation
→ prioritization
→ investment program inclusion

### Budget layer
Budget proposal
→ appropriation
→ allotment
→ obligation
→ disbursement

### Procurement layer
Procurement plan
→ bidding/selection
→ award
→ contract
→ variations/change orders

### Physical implementation layer
Site/location
→ scope
→ work accomplishment
→ completion
→ asset existence/condition

### Assurance layer
Inspection
→ evidence
→ audit
→ finding
→ corrective action

### Outcome layer
Expected outcome
→ observed output
→ measured outcome
→ maintenance
→ subsequent performance

---

## 11. Candidate Project-Control Questions

For each project, eGovTrace should eventually be able to ask:

1. Which plan justified the project?
2. Was that plan current when the project was approved?
3. Was the project included in the applicable investment program?
4. What evaluation criteria supported prioritization?
5. Was the project changed after prioritization?
6. Was its budget consistent with the approved investment program?
7. Was procurement consistent with the authorized project?
8. Did implementation match the contract?
9. Did payments match verified accomplishment?
10. Did the physical asset actually exist and perform?
11. Were expected outcomes measured?
12. Did performance affect subsequent funding?
13. If a project was delayed, abandoned, modified or superseded, was the reason documented?
14. If a master plan or obligation survived across administrations, was its status preserved?
15. If the project was local, was it aligned with provincial/regional/national plans where required?

---

## 12. Current Evidence Assessment

### CONFIRMED / STRONG

- National planning and investment hierarchy under RA 12145.
- Long-term development framework concept.
- PDP and Results Matrices.
- PIP/PIPOL.
- Sectoral infrastructure master-plan requirement.
- CIDMP architecture in law.
- LGU CLUP/CDP/LDIP/AIP planning architecture.
- Harmonization of LGU and higher-level plans.
- GAA as project/program/activity appropriation surface.
- Government results/performance budgeting architecture.
- LGU Full Disclosure Policy.
- COA audit/performance-audit framework.
- 2026 DPWH IWRFMP planning requirement.

### PARTIAL / NEEDS EMPIRICAL TESTING

- Whether the same project identity survives across plan, PIP/TRIP, GAA, procurement, financial, monitoring and audit systems.
- Whether LGU projects have stable cross-system identifiers.
- Whether national and local planning layers can actually be joined at project level.
- Whether performance results systematically influence future appropriation/investment decisions.
- Whether project changes are consistently recorded as structured, traceable events.
- Whether plan abandonment/supersession is formally represented.
- Whether physical verification is integrated into ordinary project-control workflows.

### UNKNOWN / ACCESS-DEPENDENT

- Full internal project appraisal records.
- Full allotment/obligation/disbursement transaction keys for all agencies.
- Internal inspection and completion evidence.
- Complete beneficial-ownership/subcontractor information.
- Full historical project revisions across all systems.

---

## 13. Ontology Decision Rule

Do **not** add a new G0 entity solely because “Project Control” sounds important.

Instead:

**Project Control becomes an official cross-cutting eGovTrace pattern only if the mapping plus empirical tests demonstrate that:**

1. multiple distinct planning/investment representations govern the same project;
2. the same project must be reconciled across those representations;
3. control decisions occur at multiple lifecycle stages;
4. deviations, changes, omissions or performance feedback materially affect interpretation;
5. the control logic cannot be adequately represented by existing eGovTrace relationships alone without a reusable pattern.

If existing primitives already model these relationships adequately, Project Control remains a documented analytical pattern rather than a new ontology concept.

---

## 14. Proposed Research Sub-Gates

### PIP-CTRL-01A — Planning Hierarchy Enumeration
Enumerate national, regional, provincial, city/municipal and barangay planning instruments.

### PIP-CTRL-01B — Investment Registry Enumeration
Enumerate PIP, TRIP, GAA, LGU investment and budget project surfaces.

### PIP-CTRL-01C — Project Registry / Monitoring Enumeration
Enumerate official project-monitoring and disclosure systems.

### PIP-CTRL-01D — Planning-to-Budget Link Test
Determine whether a project can be traced from plan → investment program → budget.

### PIP-CTRL-01E — Budget-to-Procurement Link Test
Determine whether budgeted project → procurement → contract can be traced.

### PIP-CTRL-01F — Procurement-to-Implementation Link Test
Determine whether contract → accomplishment → completion can be reconciled.

### PIP-CTRL-01G — Implementation-to-Outcome Link Test
Determine whether expected output/outcome → observed result can be reconciled.

### PIP-CTRL-01H — Performance-Feedback Test
Determine whether observed project performance affects later project selection, funding or modification.

### PIP-CTRL-01I — Cross-Level Alignment Test
Test national ↔ regional ↔ provincial ↔ city/municipal ↔ barangay planning alignment for selected projects.

### PIP-CTRL-01J — Project-Control Pattern Decision
Formal decision: ABSORB / NARROW / DEFER / REJECT.

---

## 15. Current Gate Status

**PIP-CTRL-01: IN PROGRESS**

The landscape mapping has produced sufficient evidence to justify empirical testing, but **not enough evidence yet to formally adopt Project Control as an eGovTrace pattern**.

The next admissible action is therefore not ontology modification.

It is **empirical testing on real project records**, beginning with project identity and plan-to-investment-to-budget reconciliation.

---

## 16. Core Finding So Far

The strongest finding is not:

> “The Philippines has no master plan.”

It is:

> **The Philippines has a substantial hierarchy of national, sectoral, regional and local plans and investment instruments. The unresolved research question is whether those instruments function as a continuous control chain over actual public projects and money, or whether planning, budgeting, procurement, execution and performance remain only partially connected representations of the same government decision.**

That is exactly the question eGovTrace is designed to test.
