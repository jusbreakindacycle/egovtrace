# eGovTrace System Interoperability Inventory — Philippines, 2026

## Status

**Sub-study:** National Identifier & Cross-System Bridge Inventory — Philippines, 2026

**Status:** PRELIMINARY INVENTORY

This inventory records the institutional systems that must be considered in eGovTrace identity/interoperability research. It deliberately separates **source-system existence**, **identifier existence**, **documented interoperability**, and **case-level proven continuity**.

| System | Institutional function | Primary object grain | Known identifier family | Publicly observable? | Documented interoperability | Case-level continuity proven? |
|---|---|---|---|---|---|---|
| DEPDev PIPOL | investment programming | PAP / investment project | PIPOL/PAP record | partly | upstream link to budget process is structurally expected | NO |
| DBM budget systems | budget preparation / release | budget/PAP / authority | UACS, SARO/NCA-related references | partly | PFM integration program | PARTIAL |
| PhilGEPS | procurement | bid notice / award / procurement | Reference No., Award Notice No., Contract No., Solicitation No. | YES | NGPA/IRR mandates broader interconnectivity; BTMS integration under reform | PROCUREMENT-INTERNAL YES; PROJECT-LIFECYCLE NO |
| BTMS / IFMIS | budget / treasury / execution | transaction / financial execution | transaction IDs to be mapped | authorized / rollout dependent | designed as interoperable core | NOT YET |
| UACS | classification | financial coding | UACS code | YES in many records | government-wide classification | NOT AS PROJECT KEY |
| DPWH Transparency Portal | project / contract | contract/project | contract ID and project fields | YES | agency-domain | DPWH-domain only |
| COA accounting/audit systems | accounting/audit | JEV / accounting / audit record | JEV/report identifiers | limited | PFM ecosystem | NOT YET |
| DILG FDP | LGU disclosure | disclosure/report | report/form-specific | YES | local disclosure ecosystem | NOT YET |
| Agency procurement portals | procurement | procurement/project/contract | agency-specific | varies | heterogeneous | NOT YET |
| SEC / CDA | legal entity / ownership | company/entity | entity registration and report identifiers | partly | explicitly targeted for PhilGEPS interconnectivity | SUPPLIER-ID BRIDGE TARGETED |
| DTI | business registry | business entity | business registration identifiers | partly | explicitly targeted for PhilGEPS interconnectivity | NOT YET |
| CIAP / PCAB | contractor licensing/performance | contractor/license | PCAB / CPES-related identity | partly | explicitly targeted | NOT YET |
| BIR | tax | taxpayer/entity | tax identifiers | restricted | explicitly targeted | NOT YET |
| Insurance Commission | surety | surety provider | insurer/surety identity | partly | explicitly targeted | NOT YET |
| LGUs | project / procurement / finance / permits | heterogeneous | LGU-specific | varies | NGPA framework contemplates LGU interconnectivity | NOT YET |

## Core interpretation

The ecosystem is not one database. It is a set of institutional representations with different object grains.

The current research task is therefore to map:

```text
SYSTEM
→ OBJECT
→ IDENTIFIER
→ SOURCE AUTHORITY
→ BRIDGE
→ ACCESS MODE
→ TEMPORAL PERSISTENCE
```

rather than to assume a universal key.

## Evidence anchors

- DBM PFM Roadmap 2024–2028 Midterm Update: BTMS as interoperable core; baseline PFM enterprise architecture and system/data mapping; procurement/financial integration reform. 
- GPPB Resolution No. 11-2025 / RA 12009 IRR context: PhilGEPS integrated system, open data, and interconnectivity with government databases.
- DEPDev PIPOL: web-based project database for PAPs in the Public Investment Program.
- PhilGEPS official help: unique bid notice Reference Number; agency-defined Solicitation Number need not be unique; award records expose contract number and award notice number.
