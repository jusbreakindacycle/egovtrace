# G3-FE FE8 — Outcome Leakage Verification

## Gate
FE8 — Outcome Leakage / Outcome-Dependent Frame Membership

## Objective
Determine whether the frozen FMR Watch project population was defined or enumerated using downstream project outcomes, rather than by neutral population/frame criteria.

## Frozen reference
- Frame ID: `FMR-FRAME-2026-09-03-859cc9bd480e`
- Frozen at: `2026-09-03T02:30:22.811Z`
- Population: 6,467 project UUIDs
- Frozen frame page geometry: 647 pages × 10 records, final page 7 records
- Enumeration method recorded in frozen frame: `GET /projects?view=table&page=N via same-origin browser fetch; UUID extraction from returned project routes`
- Frozen frame validation status: PASS

## Independent reproduction used for FE7-P
R2c used the rendered table with actual interactive Next navigation, starting at page 1. UUIDs were extracted from project links inside currently rendered table body rows. The navigation was accepted only when the page number/URL changed and the rendered UUID sequence changed.

Observed reproduction result:
- 6,467 enumerated records
- 6,467 unique UUIDs
- 0 duplicate UUIDs
- Expected project count matched
- Expected unique count matched
- Sequential page navigation valid
- Terminal condition: Next control disabled on page 65 under `limit=100`

## FE8 tests

### FE8-1 — Frame-definition neutrality
**Result: PASS**

The frozen frame's recorded enumeration method uses the project listing and UUID extraction from project routes. The recorded request contains only `view=table` and `page=N`; no outcome/status filter is part of the frame definition.

### FE8-2 — Reproduction neutrality
**Result: PASS**

R2c likewise enumerated all rendered table rows and extracted UUIDs from project links. Its documented extraction rule does not filter rows by project status/outcome.

The reproduction log shows that rows can display materially different status values, including `Completed`, `On going`, and `Not yet started`, while still being enumerated as members of the same population. This is consistent with outcome/status being an observed attribute of an already-included record, rather than a membership rule.

### FE8-3 — Temporal non-leakage
**Result: PASS**

The frozen frame was created before the later R2c reproduction. The frame identity was fixed on 2026-09-03 and preserved by frame ID and SHA-256. Later observations of project status cannot retroactively determine membership in that already-frozen population.

### FE8-4 — Researcher-selection non-leakage
**Result: PASS with scope limitation**

No candidate-project selection has been performed yet. Therefore there is no evidence that downstream outcomes were used to choose the population before frame freezing.

This test does **not** prohibit using outcome variables later as analytical variables or as part of the downstream reconciliation experiment, provided selection rules are frozen before outcome review where required by the sampling design.

## FE8 classification
**PASS — no outcome leakage identified at the frame-construction stage.**

## Important boundary
FE8 does not mean the FMR Watch portal itself is outcome-neutral in every architectural sense. It only establishes that, for this experiment, the frozen population was constructed from the public project listing without an observed outcome/status membership filter, and that outcome/status appears as an attribute of enumerated rows.

## Consequence for G3-FE
FE8 is no longer a blocker for closing the frame/enumeration experiment.

The next phase is candidate-selection protocol and the G4 relationship-reconciliation experiment, subject to the frozen G4 threshold and without retroactively changing the 6,467-project frame.

## Evidence
- Frozen frame metadata and enumeration method: `FMR_Watch_Frozen_Frame_6467_2026-09-03.json`
- Original complete enumeration: `FMR_Watch_FE2_Enumeration.json`
- Independent rendered-table reproduction: `FMR_Watch_FE7_R2c_Rendered_Table_Row_Reproduction.json`
- FE7 population/presentation separation decision: `G3_FE7_Population_vs_Presentation_Decision.md`
