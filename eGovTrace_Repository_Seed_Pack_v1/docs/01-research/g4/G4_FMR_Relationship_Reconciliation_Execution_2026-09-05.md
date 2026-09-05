# G4 — FMR Relationship Reconciliation Execution Record

**Execution:** 2026-09-05T03:02:05.521200+00:00  
**Frame:** `FMR-FRAME-2026-09-03-859cc9bd480e`  
**Frame SHA-256:** `859cc9bd480e3d219e9586d02e162889b5462553c40666fd2f10d49853fd4fc9`  
**Frozen population:** 6,467 records

## Governing rule

G4 tests whether each neutrally selected project can be reconciled across the pre-registered critical relationships. The required threshold is **at least 5 of 8 critical relationships independently established per project**.

The evaluation preserves the distinction:

`NOT OBSERVED ≠ ABSENT`  
`ABSENT ≠ MISCONDUCT`  
`UNAVAILABLE ≠ FALSE`

## Candidate 1

**UUID:** `5eff0b52-8f48-456b-9246-7e623533ea4e`  
**Frame index:** 3724  
**FMR Watch:** Concreting of Purok 5 to Sitio Kaliloan, Brgy. Poblacion FMR, Brgy. Poblacion, Bunawan, Agusan del Sur  
**Code:** 2024-R13-ADS-INFRA-FMRDP-FMR-00329  
**FMR Watch amount:** ₱10,000,000.00  
**FMR Watch status:** Completed

| Critical relationship | Result |
|---|---|
| R1 Identity | PASS |
| R2 Administrative geography | PASS |
| R3 Program / budget | PASS |
| R4 Procurement | UNRESOLVED |
| R5 Contract | UNRESOLVED |
| R6 Obligation / payment | UNRESOLVED |
| R7 Physical inspection | NOT ESTABLISHED |
| R8 Oversight / independent evidence | NOT ESTABLISHED |

**Coverage: 3/8 — below threshold.**

DBM FY2024 GAA independently represents the same project description in Agusan del Sur at **₱10,000,000**, establishing the budget/program relationship. citeturn729985search15turn451755search3

The FMR Watch representation independently establishes the project identity, location, program code, amount, and administrative lifecycle status. The status is not being treated as independent physical proof.

## Candidate 2

**UUID:** `7afb3618-2c25-499f-8147-862d36c59ee4`  
**Frame index:** 6215  
**FMR Watch:** Concreting of Barangay Cabasaran to Barangay Dao FMR, Gamay, Northern Samar  
**Code:** 2021-R8-NOS-INFRA-FMRDP-FMR-00547  
**FMR Watch amount:** ₱12,500,000.00  
**FMR Watch status:** Completed

| Critical relationship | Result |
|---|---|
| R1 Identity | PASS |
| R2 Administrative geography | PASS |
| R3 Program / budget | PASS |
| R4 Procurement | UNRESOLVED |
| R5 Contract | UNRESOLVED |
| R6 Obligation / payment | UNRESOLVED |
| R7 Physical inspection | NOT ESTABLISHED |
| R8 Oversight / independent evidence | NOT ESTABLISHED |

**Coverage: 3/8 — below threshold.**

DBM's FY2021 National Expenditure Program independently lists **Concreting of Brgy. Cabarasan to Brgy. Dao FMR, Brgy. Cabarasan and Brgy. Dao, Gamay, Northern Samar**, with **₱12,500,000** programmed. citeturn451755search4turn192122search20

A later procurement-index result also contains a DPWH road procurement entry for “Barangay Cabarasan-Barangay Dao, Gamay, Northern Samar,” but that record is not enough on its own to establish that it is the same 2021 FMR Watch intervention. It is therefore **not counted as a successful project-level procurement join**. citeturn729985search0

## Cross-candidate finding

Both candidates independently clear:

**identity → geography → program/budget**

Both fail to reach the required 5/8 because the downstream bridge into exact procurement/contract/financial-execution and independent physical/oversight evidence remains unresolved or not established.

This is not a finding of wrongdoing. It is a finding about **reconciliation coverage**.

The FMR research architecture explicitly expects the same real-world intervention to be compared across multiple institutional representations and to classify the result as consistent, contradictory, ambiguous, or unresolved rather than collapsing a missing link into an accusation. 

G4 also does not replace authoritative agency systems; it tests whether their existing representations can be joined with defensible provenance. The G2 model explicitly treats FMR Watch, PIPOL, UACS/DBM, PhilGEPS, financial transaction classes, PSGC, DPWH records, physical/geospatial sources and COA as reference capabilities rather than one rebuilt registry.

## Time threshold

The G4 time-band threshold remains:

- **Favorable:** ≤4 hours
- **Constrained:** >4 to ≤8 hours
- **Adverse:** >8 hours

An instrumented wall-clock measurement was **not captured for this execution**, so no time-band classification is assigned.

The **coverage threshold**, however, is independently failed: both projects are at **3/8**, below the required **5/8 per project**.

## G4 disposition

**G4 — PARTIAL / COVERAGE FAILURE**

The experiment should **not** be declared a successful 5/8 reconciliation.

The result is itself useful: even after neutral selection and a source-backed program/budget bridge, the independently joinable downstream chain remains materially weaker than the administrative project representation.

This does not establish that the missing relationships do not exist. It establishes that they were not independently established within the executed research scope and evidence access used here.

## Next controlled work

1. Procurement and contract tracing for both UUIDs.
2. Project-specific obligation/disbursement/payment tracing.
3. Independent inspection, acceptance, physical/geospatial and audit/oversight tracing.
4. PIP-CTRL 01G implementation→outcome tracing where the available evidence permits it.

PIP-CTRL remains cross-cutting research and does not become a new G4 gate.
