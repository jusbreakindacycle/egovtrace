# eGovTrace PIP-CTRL-01D–01F
## Planning-to-Budget → Budget-to-Procurement → Procurement-to-Implementation Trace

**Date:** 2026-09-03  
**Status:** EMPIRICAL GATE EXECUTION  
**Projects tested:**  
1. DPWH Contract ID **25D00008**, Agos River, General Nakar, Quezon, Phase 2  
2. Tangalan, Aklan local flood-protection PPAs as a contrast case

**Decision discipline:** No corruption inference. The test measures record continuity and joinability.

---

## 1. Gate Definitions

### PIP-CTRL-01D — Planning-to-Budget Link Test

Question:

> Can a real project be traced from an applicable planning/programming representation into the budget/funding representation?

### PIP-CTRL-01E — Budget-to-Procurement Link Test

Question:

> Can the funded project be traced into procurement using a stable project/contract identifier and matching scope, location and funding information?

### PIP-CTRL-01F — Procurement-to-Implementation Link Test

Question:

> Can the procured project be traced into an executed contract and an implementation authorization/start record, with enough identity continuity to establish that they refer to the same project?

Physical completion is a separate downstream question and is not treated as proven merely because an NTP exists.

---

# 2. PROJECT A — NATIONAL: AGOS RIVER / DPWH

## Identity

**Contract ID:** 25D00008  
**Project:** Construction of Flood Control Structure along Agos River, Package U, General Nakar, Quezon, Phase 2

The same Contract ID appears in the DPWH Supplemental Annual Procurement Plan, PhilGEPS bid notice, DPWH post-contract award report and DPWH Notice to Proceed.

This is the strongest identity key encountered in the present test.

---

# 3. PIP-CTRL-01D — Planning-to-Budget

### Planning/program representation

The PhilGEPS invitation places the project under:

**FY 2025 DPWH Infrastructure Program**  
**Organizational Outcome 2 — Protect Lives and Properties Against Major Floods**  
**Flood Management Program**  
**Construction/Rehabilitation of Flood Mitigation Facilities within Major River Basins and Principal Rivers**

Therefore the project has a clear programmatic representation tied to a national agency outcome.

### Budget representation

The DPWH FY2025 Supplemental APP records:

- Code / PAP: **25D00008**
- Project: same Agos River Package U Phase 2 description
- Source of Funds: **GoP**
- Estimated Budget: **₱193,000,000**
- Procurement category: Construction Division
- Early Procurement Activity: Yes
- Notice of Award: January 27, 2025
- Contract Signing: January 29, 2025

The PhilGEPS notice separately identifies the source of funds as:

**FY 2025 NEP for DPWH Infrastructure Program**

and the same **₱193,000,000 ABC**.

### Result

**01D = PARTIAL PASS**

Why not full pass?

Because the public evidence retrieved in this test proves:

**program → agency procurement/budget representation → NEP funding representation**

but does **not** prove a direct project-level record in PIPOL/TRIP for Contract ID 25D00008.

That distinction is important because RA 12145 establishes PIP and infrastructure investment programming as formal stages between planning and annual budgeting. The law explicitly requires development plans to be translated into PAPs, PIP formulation, project appraisal, and alignment of annual/multi-year appropriations with the development framework and national/subnational plans. citeturn907329search0

PIPOL itself is an official project database for priority PAPs and agency submissions/updates, but its public interface is currently closed/login-protected, preventing a public project-level join for 25D00008 in this pass. citeturn907329search5turn907329search6

**Therefore we cannot honestly claim:**

PDP/sector plan → PIPOL → TRIP → NEP/GAA

for this exact project.

---

# 4. PIP-CTRL-01E — Budget-to-Procurement

This relationship is substantially stronger.

The DPWH Supplemental APP identifies:

**25D00008**
→ Agos River Package U, General Nakar, Quezon, Phase 2  
→ GoP funding  
→ ₱193,000,000 estimated budget

The PhilGEPS bid notice independently identifies:

**25D00008**
→ same project title  
→ same location  
→ same flood-management program  
→ ₱193,000,000 ABC  
→ source: FY2025 NEP for DPWH Infrastructure Program  
→ 300-calendar-day duration.

citeturn524723search1turn524723search0

The shared Contract ID, title, location, program and ABC give strong identity continuity.

### Result

**01E = PASS**

This is a demonstrated budget/procurement join.

---

# 5. PIP-CTRL-01F — Procurement-to-Implementation

### Procurement / award

DPWH's post-contract award disclosure identifies:

- Contract ID: **25D00008**
- ABC: **₱193,000,000**
- Contractor: **Silverwolves Construction Corporation**
- Contract amount: **₱188,152,542.88**
- Regional Office IV-A

citeturn524723search2

### Implementation authorization

DPWH issued a Notice to Proceed dated **February 28, 2025**.

The NTP carries the same:

- Contract ID **25D00008**
- project name
- location
- contractor
- contract
- implementation instruction.

It directs the contractor to proceed with implementation upon receipt/acceptance of the notice. citeturn524723search3

### Result

**01F = PASS for procurement → authorized implementation start**

But:

**01F does NOT establish physical completion or actual percentage accomplishment.**

That requires a separate implementation-evidence trace:
**NTP → accomplishment report → inspection → completion/acceptance → payment/disbursement → physical verification.**

---

# 6. PROJECT A — COMPLETE CURRENT TRACE

The strongest currently demonstrated chain is:

**Flood Management Program**
↓
**FY2025 DPWH APP / NEP funding representation**
↓
**PhilGEPS bid notice**
↓
**Award / Post-Contract Disclosure**
↓
**Contract / NTP**
↓
**Implementation authorized**

### Proven

- Project identity continuity: **STRONG**
- Program identity: **STRONG**
- Budget/procurement continuity: **STRONG**
- Procurement/contract continuity: **STRONG**
- Contract/NTP continuity: **STRONG**

### Not yet proven

- Specific PIPOL record
- Specific TRIP record
- Specific master-plan/basin-plan linkage
- Obligation
- Disbursement
- Physical accomplishment
- Inspection/acceptance
- Final completion
- Measured flood-risk outcome

---

# 7. PROJECT B — LOCAL: TANGALAN, AKLAN

## Local planning / investment evidence

Tangalan's official Sangguniang Bayan records show Resolution No. 217-A, Series of 2026, approving the reprogramming of **₱1,330,458.70** from unexpended savings of the prior-years' 20% Development Fund for:

- Construction of River Wall Protection in Barangay Tagas
- Construction of Slope Protection in Barangay Panayakan

The same official resolution page records Resolution No. 217, Series of 2026 approving additional PPAs for inclusion in the municipality's first Supplemental AIP for CY2026. citeturn907329search4

### 01D local result

**01D = PASS for local investment-programming → funding decision**

The local record establishes that the PPAs were inserted/reprogrammed into the local investment/budget process.

### 01E local result

**01E = NOT YET DETERMINATE**

No public procurement record for those exact 2026 PPAs was established in this pass.

### 01F local result

**01F = NOT YET DETERMINATE**

No contract/NTP/implementation record for those exact reprogrammed PPAs was established in this pass.

This is a crucial contrast with Project A.

It does **not** mean the local projects were not procured or implemented.

It means the public, currently retrieved record set did not permit us to complete the join.

---

# 8. Cross-Level Observation

Tangalan demonstrates why eGovTrace cannot stop at national projects.

A local government can independently program a flood-related PPA while DPWH is simultaneously implementing nationally funded flood-related works within the same municipality/river environment.

The eGovTrace challenge is therefore potentially:

**national planning + national project**
↕
**regional implementation**
↕
**local planning + local project**
↕
**same geography / physical system**

The existence of multiple records is not itself a problem.

The research question is whether those records can be reconciled for:
- complementary works,
- duplication,
- sequencing,
- scope overlap,
- funding overlap,
- unresolved gaps,
- or legitimate coordination.

No misconduct conclusion follows automatically.

---

# 9. Gate Results

| Gate | Result | Basis |
|---|---|---|
| **PIP-CTRL-01D** | **PARTIAL PASS** | Program/budget representation is demonstrated; PIPOL/TRIP project-level join not publicly demonstrated |
| **PIP-CTRL-01E** | **PASS** for Project A | Exact Contract ID + scope/location/program/budget continuity into PhilGEPS |
| **PIP-CTRL-01F** | **PASS** for Project A | Same Contract ID continues through award/post-contract and NTP |
| **Local 01D** | **PASS** | Tangalan resolution establishes investment reprogramming/SAIP pathway |
| **Local 01E** | **NOT YET DETERMINATE** | Exact downstream procurement not established |
| **Local 01F** | **NOT YET DETERMINATE** | Exact downstream contract/implementation not established |

---

# 10. Adversarial Interpretation

The strongest result is NOT:

> “The system is broken.”

The strongest defensible result is:

> **Project-level traceability is materially better once a formal procurement/contract identifier exists. The weaker point is the upstream planning/investment-programming join, particularly the public ability to prove that the exact contracted project is the same PAP that was appraised/prioritized through the formal national investment-programming chain.**

This is exactly the type of structural gap the Project Control hypothesis was designed to test.

However, it is still too early to formalize the pattern.

---

# 11. Next Gate

The next admissible test is:

## PIP-CTRL-01G — Implementation-to-Outcome Link Test

For Project A, attempt:

**NTP → physical accomplishment → inspection → completion → payment → asset existence → expected outcome**

For the local Tangalan case, continue the search:

**Supplemental AIP → APP → PhilGEPS → award → contract → implementation**

Only after this should we test:

## PIP-CTRL-01H — Performance-Feedback Test

**Did project performance actually affect subsequent funding / continuation / modification?**

That test will determine whether “performance-based” is merely an administrative reporting mechanism or a genuine resource-allocation feedback loop.

---

## Preliminary conclusion

**01D is not a failure. It exposed the most important unresolved join.**

The architecture already provides formal planning and investment stages. RA 12145 expressly requires those stages to connect planning, investment programming, budgeting, monitoring and evaluation, including the ability to retrench or modify projects that no longer serve their purpose or are no longer aligned with medium/long-term plans. citeturn907329search0

The empirical question now becomes very precise:

> **Can the State demonstrate that linkage for an individual peso-funded project using public records?**

That remains open.

**Project Control therefore remains RESEARCH / NOT YET ADOPTED.**
