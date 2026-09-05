# eGovTrace — National Identifier & Cross-System Bridge Inventory — Philippines, 2026

## Research Execution Record

**Parent study:** `eGovTrace_Identity_Interoperability_Validation_Study.md`

**Sub-study:** National Identifier & Cross-System Bridge Inventory — Philippines, 2026

**Status:** EXECUTED — PRELIMINARY VALIDATION RESULT

**Research date:** 2026-09-05

**Scope:** National-level official-source inventory of identifier systems, cross-system bridges, and current interoperability reforms relevant to public projects, procurement, contracts, budget execution, accounting, implementation, and accountability.

**Important limitation:** This is an evidence inventory, not a proof that all listed systems are interoperable in production. Where official sources describe planned, pilot, or developing capabilities, the status is recorded as such.

---

## 1. Research Question

What identifiers and documented system-to-system bridges exist in Philippine government today, which are actually cross-system, which are system-local, which are emerging through reform, and where does project identity continuity remain unresolved?

---

## 2. Frozen Research Rules

```text
CONNECTION != CORRUPTION
NOT OBSERVED != ABSENT
ABSENT != MISCONDUCT
UNAVAILABLE != FALSE
IDENTIFIER RECOVERY != IDENTIFIER PROOF
SAME NAME != SAME PROJECT
SAME ROUTE != SAME INTERVENTION
SAME UACS != SAME PROCUREMENT OBJECT
SEARCH TIME != EVIDENCE DATE
```

Every claimed bridge must specify its source, object grain, identifier semantics, temporal scope, and evidence strength.

---

## 3. Executive Finding

### Finding F1 — No universal cross-government public-project identifier was established in this inventory.

No official source reviewed in this sub-study establishes a single durable identifier already operating across the full tested chain:

```text
planning / investment
→ project
→ procurement
→ contract
→ budget / PAP / UACS
→ allotment
→ obligation
→ disbursement
→ accounting
→ settlement
```

This remains a **research finding, not a proof of nonexistence**.

### Finding F2 — Procurement identifiers are materially more explicit than universal project identifiers.

PhilGEPS documentation establishes a system-generated **Reference Number** that is unique to each bid notice. The same documentation distinguishes the agency-defined **Solicitation Number**, which does not have to be unique. Award documentation exposes the bid reference and a contract number. citehttps://notices.philgeps.gov.ph/GEPS/helppages/buyercoord/ancs/help_BidNoticeAbstractUI.htm

This supports the existence of strong **within-PhilGEPS procurement identity**, but does not by itself prove continuity back to a project record or forward into every financial transaction.

### Finding F3 — The government itself identifies standardized procurement identity and system interoperability as unfinished reform work.

The June 2026 PFM Reform Roadmap states that the reform program is addressing the **absence of a standardized procurement ID system**, proposes mandatory unique contract IDs, and proposes creation of a unique Procurement Identification Number through mPhilGEPS. The target period shown is 2026–2028. citehttps://www.dbm.gov.ph/wp-content/uploads/DBM%20Publications/PFM-Reforms/Midterm-Update/PHIL%20PFM%20Roadmap%20Midterm%20Update%20v2.pdf

### Finding F4 — PhilGEPS is legally intended to become a much broader integrated procurement record, but this is not equivalent to historical cross-system project identity already being solved.

RA 12009 / its IRR materials cited by GPPB state that PhilGEPS is the single electronic procurement portal, should cover procurement planning through payment, should develop an open-data platform, and should support interconnectivity with databases including DTI, CIAP/PCAB, LGUs, BIR, SEC/CDA, Insurance Commission, and procuring entities' project/contract systems. citeturn579428view0

### Finding F5 — The PFM architecture is itself being redesigned around interoperability.

The 2026 PFM Roadmap states that BTMS is the planned interoperable core of IFMIS, that a unified PFM systems integration and data architecture is being developed, and that a baseline PFM enterprise architecture is to map current systems, data sources, and dependencies across national, regional, and local government levels. citeturn924754view2turn924754view3

### Finding F6 — UACS is a government-wide financial classification framework, not automatically a universal project key.

DBM describes UACS as a government-wide harmonized budgetary, treasury and accounting code classification structure. That gives UACS high value for financial reconciliation, but its classification role must not be mistaken for proof that a UACS code uniquely identifies one procurement or one physical intervention. citeturn708035search48turn708035search49

The FMR experiment already supplied a concrete false-join example where a matching UACS-rooted string led to an unrelated fire-alarm procurement rather than the selected FMR.

---

## 4. System Inventory — Current Evidence Position

| System / Source | Domain | Identifier(s) observed or documented | Object grain | Cross-system role | 2026 status | Current validation state |
|---|---|---|---|---|---|---|
| PIPOL | investment planning | PIP/PAP record identity; exact durable cross-system project key not yet established in this sub-study | program / activity / project | upstream planning representation | operational web system; current update cycle | PARTIALLY ASSESSED |
| PhilGEPS | procurement | Bid Notice Reference Number; Award Notice Number; contract number field; solicitation number | procurement notice / award / contract | core procurement identity | operational; modernization ongoing | CONFIRMED WITHIN SYSTEM |
| UACS | budget / treasury / accounting classification | UACS code | financial classification / coding structure | financial reconciliation | established government-wide framework; revision work ongoing | CONFIRMED AS CLASSIFICATION, PROJECT-KEY ROLE UNPROVEN |
| BTMS / IFMIS | budget / treasury / financial management | transaction identifiers not fully inventoried in this sub-study | financial transaction / execution | intended interoperable financial core | rollout / expansion / integration program | REFORM UNDER IMPLEMENTATION |
| DBM release / ADRS | budget releases | SARO / NCA document references | budget release authority document | evidence authenticity / budget release | operational public verification capability reported | PARTIALLY ASSESSED |
| DPWH Transparency Portal | project / contract / implementation | contract ID and project/contract fields | project / contract | national-agency project representation | operational | PARTIALLY ASSESSED |
| COA systems / records | accounting / audit | JEV and other accounting/report identifiers | accounting record / audit record | downstream assurance | operational institutional systems | IDENTIFIER FAMILY CONFIRMED; CROSS-SYSTEM BRIDGES NOT YET MAPPED |
| DILG FDP / LGU disclosures | local financial disclosure | report/form identifiers vary by disclosure | LGU financial/reporting | local accountability | operational disclosure regime | CROSS-SYSTEM ID CONTINUITY NOT YET MAPPED |
| Agency procurement systems | procurement / implementation | agency-specific IDs | procurement / project / contract | local-to-PhilGEPS relationship | heterogeneous | NOT YET NATIONALLY INVENTORIED |
| Contractor / corporate registries (SEC, DTI, CIAP/PCAB, BIR etc.) | supplier identity | corporate/business/license/tax identifiers | legal entity / credential | supplier identity and validation | interconnection mandated/being developed | BRIDGE ARCHITECTURE DOCUMENTED; CASE-LEVEL USE PENDING |

**Interpretation:** The inventory shows a layered identifier environment, not a single ID hierarchy.

---

## 5. Identifier Registry — Preliminary National Set

### I01 — PIPOL / PAP identity

**Type:** Institutional project / investment-program identity.

**Evidence:** DEPDev describes PIPOL as a web-based project database facilitating data entry, updates, validation and reporting for PAPs in the Public Investment Program. citehttps://pipol.depdev.gov.ph/about

**Important limitation:** This establishes PIPOL as a project/program representation, but this sub-study did not establish a universal PIPOL identifier that persists unchanged into PhilGEPS, contracts, ORS, JEV and settlement.

**Status:** CONFIRMED SYSTEM ROLE; CROSS-SYSTEM PERSISTENCE NOT ESTABLISHED.

---

### I02 — PhilGEPS Bid Notice Reference Number

**Type:** Procurement identifier.

**Evidence:** PhilGEPS help documentation states that the Reference Number is system-generated and unique to each bid notice. citeturn656358view1

**Object grain:** Bid notice.

**Strength:** Strong within-system identifier.

**Limitation:** It identifies a procurement notice, not automatically the entire real-world project lifecycle.

**Status:** CONFIRMED WITHIN PHILGEPS.

---

### I03 — PhilGEPS Solicitation Number

**Type:** Agency-defined procurement tracking identifier.

**Evidence:** PhilGEPS documentation says the solicitation number is user-defined and does not have to be unique. citeturn656358view1

**Object grain:** agency tracking of bid notice.

**Status:** CONFIRMED; NOT SUITABLE AS UNIVERSAL KEY.

---

### I04 — PhilGEPS Award Notice Number

**Type:** Procurement award identifier.

**Evidence:** PhilGEPS award documentation identifies an Award Notice Number and separately exposes the original bid reference and contract number. citeturn656358view2

**Object grain:** award notice.

**Status:** CONFIRMED WITHIN PHILGEPS.

---

### I05 — Contract Number

**Type:** Legal/institutional contract identifier.

**Evidence:** PhilGEPS award documentation has a dedicated Contract Number field for awarded items. citeturn656358view2

**Object grain:** awarded contract/item.

**Status:** CONFIRMED AS PROCUREMENT-SIDE CONTRACT FIELD; cross-system persistence must be tested.

---

### I06 — UACS Code

**Type:** Financial classification identifier.

**Evidence:** DBM defines UACS as a government-wide harmonized budgetary, treasury and accounting code classification structure. citeturn708035search48

**Object grain:** financial classification / coding.

**Strength:** High value for budget-to-accounting classification.

**Limitation:** Not established as a universal one-project key.

**Adversarial precedent:** The existing FMR trace rejected a UACS-based false join to an unrelated fire-alarm procurement.

**Status:** CONFIRMED CLASSIFICATION; PROJECT-ID ROLE NOT PROVEN.

---

### I07 — SARO / NCA document references

**Type:** Budget release authority / cash authority document identity.

**Evidence:** DBM's public verification initiative allows independent verification of key budget release documents such as SAROs and NCAs; the current PFM program is explicitly integrating these financial processes. citeturn708035search6

**Object grain:** authority/release document.

**Status:** IDENTIFIER FAMILY CONFIRMED; project-to-transaction bridge remains case-dependent.

---

### I08 — ORS

**Type:** Obligation transaction identifier.

**Evidence:** The eGovTrace G4 financial model and DBM procedures distinguish ORS as a separate obligation stage, including an assigned ORS number and RAOD posting in the procedures previously recovered.

**Status:** IDENTIFIER FAMILY CONFIRMED; national cross-system continuity not yet demonstrated.

---

### I09 — DV / disbursement documentation

**Type:** Disbursement transaction/document identifier.

**Status:** IDENTIFIER FAMILY CONFIRMED; cross-system bridge pending empirical case validation.

---

### I10 — LDDAP-ADA / ADA

**Type:** payment/disbursement instruction documentation.

**Status:** IDENTIFIER FAMILY CONFIRMED; not equivalent to settlement confirmation.

---

### I11 — JEV

**Type:** accounting entry identifier.

**Evidence:** COA materials show JEV as an accounting record used in government financial reporting/disbursement workflows. citeturn627340search10turn627340search9

**Status:** CONFIRMED ACCOUNTING IDENTIFIER FAMILY; project continuity pending.

---

### I12 — Project/Contract IDs in agency systems

**Type:** agency-specific project or contract identity.

**Status:** HETEROGENEOUS / NOT YET NATIONALLY INVENTORIED.

**Importance:** This category is likely to contain critical bridge identifiers between national procurement, agency project management and physical implementation.

---

## 6. Bridge Findings

### B1 — PIPOL → Budget

**State:** LIKELY RECONCILABLE; not fully tested in this inventory.

PIPOL represents PAPs for investment programming, while DBM maintains budget representations. A project may therefore have multiple institutional representations before procurement begins. The exact authoritative bridge fields must be tested case-by-case.

### B2 — Project → PhilGEPS procurement

**State:** NOT UNIVERSALLY PROVEN.

PhilGEPS has strong internal procurement identity, but the sub-study found no official basis for assuming every public project identifier is automatically persisted into the bid notice reference.

### B3 — PhilGEPS procurement → award

**State:** DIRECTLY STRUCTURED WITHIN PHILGEPS.

The award workflow explicitly references the original bid notice and separately creates an award notice. citeturn656358view2

### B4 — Award → contract

**State:** DIRECTLY STRUCTURED WITHIN PHILGEPS.

The award representation contains the contract number and contract dates for posted awards. citeturn656358view2

### B5 — Contract / procurement → financial execution

**State:** SYSTEM-INTEGRATION REFORM IN PROGRESS.

The 2026 PFM Roadmap explicitly identifies lack of interoperability between procurement and financial-management systems, manual data entry/reconciliation and information silos. It calls for PhilGEPS integration with BTMS/financial management, data mapping, pilot integration and eventual operational exchange. citeturn924754view2

### B6 — Financial lifecycle internal continuity

**State:** ARCHITECTURALLY INTENDED; CURRENT CASE-LEVEL PUBLIC PROOF NOT YET ESTABLISHED.

The PFM roadmap is building BTMS as an interoperable core and an enterprise-wide PFM integration/data architecture. citeturn924754view2turn924754view3

### B7 — Procurement ↔ supplier identity

**State:** EXPLICIT INTERCONNECTIVITY TARGET.

The NGPA/IRR framework identifies interconnection with government merchant/business, contractor licensing, tax, corporate/beneficial-ownership, surety, LGU and procuring-entity project/contract databases. citeturn579428view0

### B8 — Historical continuity

**State:** NOT PROVEN.

Current modernization may create stronger identity continuity for new transactions while leaving historical records dependent on reconciliation. This distinction must remain a separate test.

---

## 7. Critical Architectural Consequence

The national identifier landscape should currently be modeled as:

```text
                    INVESTMENT / PLANNING
                            |
                          PIPOL
                            |
                            v
                        BUDGET / PAP
                            |
                         UACS / codes
                            |
              +-------------+-------------+
              |                           |
          PROJECT                     PROCUREMENT
              |                           |
              |                    PHILGEPS REF
              |                           |
              |                     AWARD NOTICE
              |                           |
              |                     CONTRACT NO.
              |                           |
              +-------------+-------------+
                            |
                    FINANCIAL EXECUTION
                            |
                SARO / ALLOTMENT / ORS
                            |
                          DV
                            |
                      LDDAP-ADA / ADA
                            |
                           JEV
                            |
                       SETTLEMENT
```

This is a **conceptual bridge map**, not a claim that every arrow is currently a direct machine-readable relationship.

---

## 8. Emerging Government Architecture — Important 2026 Update

The government is not standing still while eGovTrace researches this problem.

The June 2026 PFM Roadmap identifies BTMS as the interoperable core of IFMIS, calls for unified PFM systems integration and enterprise data architecture, and schedules baseline architecture work during 2026. citeturn924754view2turn924754view3

The same roadmap calls for open data standards, mandatory unique contract IDs, and a unique Procurement Identification Number, while explicitly identifying the absence of standardized procurement IDs as a current gap. citeturn924754view0turn924754view1

This is a major architectural constraint for eGovTrace:

> eGovTrace should not build a parallel procurement-ID or financial-management system if the State is already building those capabilities.

Instead, eGovTrace should test the **residual interoperability problem** that remains after those government reforms are taken into account.

---

## 9. Preliminary Hypothesis Status

| Hypothesis | Preliminary status | Reason |
|---|---|---|
| H1 — No single universal public project identifier | **SUPPORTED, NOT FINALLY PROVEN** | No universal identifier established in reviewed official sources; PFM reforms still identify standard procurement ID as a gap |
| H2 — Procurement identity is more standardized than project identity | **SUPPORTED** | PhilGEPS has unique bid notice references and award/contract structures; project-wide continuity not established |
| H3 — Composite/evidentiary joins remain important | **SUPPORTED BY CURRENT FMR EVIDENCE; NATIONAL GENERALIZATION PENDING** | FMR experiment required reconciliation; false joins are observable |
| H4 — Financial stages require distinct identifiers/evidence states | **SUPPORTED** | Government PFM documentation and eGovTrace G4 evidence model both distinguish stages |
| H5 — Current reforms improve interoperability but do not automatically solve historical continuity | **PLAUSIBLE / REQUIRES CASE TEST** | Roadmap is explicitly building new integration while historical continuity has not yet been demonstrated |
| H6 — eGovTrace value lies in reconciliation/provenance rather than replacement | **PRELIMINARILY SUPPORTED** | Government itself is building source-system integration; eGovTrace's differentiated role remains residual and must be empirically tested |

---

## 10. Research Gaps Exposed by This Sub-study

The next empirical work should focus on five gaps:

1. **Exact project → PhilGEPS bridge:** determine whether an agency project identifier, PAP/UACS, APP identifier, or another field reliably connects a project to a bid notice.
2. **Exact contract → financial bridge:** determine which identifier crosses from awarded contract into allotment/ORS and whether that bridge is machine-readable, documented, or manually reconciled.
3. **Current BTMS/PhilGEPS implementation state:** establish which agencies and transaction types are actually integrated as of the observation date rather than relying on roadmap targets.
4. **Historical continuity:** test whether 2021–2025 records can be followed using newer identity architectures.
5. **LGU continuity:** test whether local projects can enter the same identity model without assuming national-agency system structures apply to LGUs.

---

## 11. Immediate Next Sub-study

The next controlled execution should therefore be:

### `eGovTrace_Cross_System_Bridge_Test_Case_A.md`

Use the existing neutral FMR Candidate 2:

```text
UUID: 7afb3618-2c25-499f-8147-862d36c59ee4
Project: Cabarasan to Dao FMR
Gamay, Northern Samar
FMR code: 2021-R8-NOS-INFRA-FMRDP-FMR-00547
Amount: ₱12,500,000
Contractor evidence: A-Cube Construction and Supply (agency-origin secondary)
```

The specific objective should be to find the **first defensible bridge beyond budget identity**, prioritizing:

```text
FMR code
→ agency project identifier
→ APP entry
→ PhilGEPS bid reference
→ award notice
→ contract number
```

Only after that bridge is established should the research proceed deeper into ORS/DV/LDDAP-ADA/JEV/settlement.

---

## 12. Sub-study Decision

### PRELIMINARY RESULT — ARCHITECTURE VALIDATION CONTINUES

This inventory does **not** yet validate the complete eGovTrace architecture.

It does validate a central premise strongly enough to continue testing:

> **The Philippine State has multiple substantial identifier and interoperability mechanisms, but the current evidence does not establish a universal, durable project identity that already links planning, project, procurement, contract, budget execution, accounting, implementation, and settlement across the whole government.**

The research therefore moves from **national identifier inventory** to **case-level bridge testing**.
