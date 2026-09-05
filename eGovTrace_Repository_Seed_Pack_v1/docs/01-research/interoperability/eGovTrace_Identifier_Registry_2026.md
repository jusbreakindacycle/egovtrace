# eGovTrace Identifier Registry — Philippines, 2026

## Preliminary registry from the National Identifier & Cross-System Bridge Inventory

| ID | Identifier | Type | Issuer/System | Object grain | Uniqueness | Persistence | Cross-system use | Public visibility | Current assessment |
|---|---|---|---|---|---|---|---|---|---|
| I01 | PIP/PAP record identity | Institutional project/investment | DEPDev / PIPOL | PAP/project | not yet established nationally | not yet established | upstream planning/budget relation to be tested | partial | PROJECT REPRESENTATION CONFIRMED |
| I02 | PhilGEPS Reference Number | Procurement | PhilGEPS | bid notice | unique per bid notice | system-level | links internally to award workflow | public | STRONG SYSTEM-LOCAL KEY |
| I03 | Solicitation Number | Procurement tracking | Procuring entity | bid notice | explicitly not required to be unique | agency-controlled | limited | public when posted | WEAK CROSS-SYSTEM KEY |
| I04 | Award Notice Number | Award | PhilGEPS | award notice | running/system-generated | system-level | references bid notice | public when posted | STRONG SYSTEM-LOCAL KEY |
| I05 | Contract Number | Contract | Procuring entity / PhilGEPS award | awarded contract/item | not yet assessed nationally | expected contractual persistence | bridge to agency/financial records to test | often public | CRITICAL BRIDGE CANDIDATE |
| I06 | UACS Code | Financial classification | DBM / COA / DOF framework | budget/treasury/accounting classification | classification-specific | historical with revisions | government-wide financial coding | often public | NOT UNIVERSAL PROJECT ID |
| I07 | SARO/NCA reference | Budget/cash authority | DBM | release authority document | document-level | historical | links to release/execution processes | SARO public-verification capability exists | TRANSACTION/authority EVIDENCE |
| I08 | ORS number | Obligation | agency financial process / DBM procedures | obligation | transaction-specific | expected transaction persistence | financial execution bridge to test | generally restricted | CRITICAL FINANCIAL BRIDGE |
| I09 | DV number/reference | Disbursement | agency accounting/finance | disbursement document | transaction-specific | transaction persistence | bridge to ADA/JEV to test | generally restricted | CRITICAL FINANCIAL BRIDGE |
| I10 | LDDAP-ADA / ADA reference | Payment instruction/disbursement | agency/treasury process | payment instruction | transaction-specific | transaction persistence | bridge to JEV/settlement to test | generally restricted | NOT SETTLEMENT PROOF |
| I11 | JEV number/reference | Accounting | agency accounting / COA framework | journal entry | transaction-specific | accounting persistence | bridge to underlying transaction to test | restricted/summary reporting varies | CRITICAL ACCOUNTING BRIDGE |
| I12 | Agency project ID | Institutional project | implementing agency | project | varies | varies | may connect project/procurement/implementation | varies | UNKNOWN / CASE-LEVEL TEST REQUIRED |
| I13 | Agency contract ID | Contract | implementing agency | contract | varies | contractual | may connect procurement to implementation/finance | varies | UNKNOWN / CASE-LEVEL TEST REQUIRED |

## Registry rule

No identifier may be promoted to a **universal project identity** merely because it is unique in its source system.

Before promotion, eGovTrace requires evidence for:

```text
1. issuer
2. object grain
3. uniqueness scope
4. persistence
5. reuse/retirement rules
6. cross-system reference behavior
7. historical continuity
8. authoritative documentation
```

## Current most important identifiers for case testing

```text
PIP/PAP
↓
agency project ID
↓
PhilGEPS Reference Number
↓
Award Notice Number
↓
Contract Number
↓
UACS/PAP
↓
SARO
↓
ORS
↓
DV
↓
LDDAP-ADA/ADA
↓
JEV
↓
Settlement
```

This is a **test path**, not an assumed direct data model.
