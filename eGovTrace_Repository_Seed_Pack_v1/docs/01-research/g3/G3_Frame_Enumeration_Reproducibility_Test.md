# G3-FE — FMR Watch Frame Enumeration & Reproducibility Test

**Program:** eGovTrace / Philippine State Control & Assurance Research  
**Research Track:** FMR Reconciliation Experiment  
**Parent Gate:** G3 — Neutral Candidate Selection  
**Sub-Test:** G3-FE — Frame Enumeration & Reproducibility  
**Status:** DESIGN APPROVED / READY FOR EXECUTION  
**Decision date:** 2026-09-02

---

## 1. Purpose

This sub-test determines whether the currently observable FMR Watch project population can serve as a defensible sampling frame for G3 neutral candidate selection.

The governing research question is:

> **Can the currently observable FMR Watch population of 6,424 projects be deterministically enumerated, uniquely identified, preserved, and independently reproduced without using downstream project information?**

This is a reproducibility and sampling-frame test. It does not evaluate project integrity, procurement outcomes, financial anomalies, physical completion, contractor reputation, or corruption.

---

## 2. Relationship to G3

G3 already defines the neutral-selection protocol. G3 requires the full currently observable FMR Watch frame, minimum entry eligibility, outcome-leakage controls, deterministic indexing, and recorded randomization.

This sub-test does **not** alter the G3 sampling rule. It determines whether that rule can be executed without methodological shortcut.

The sequence is:

```text
G3 protocol
    ↓
G3-FE frame enumeration & reproducibility test
    ↓
PASS
    ↓
freeze sampling frame
    ↓
apply G3 eligibility criteria
    ↓
deterministic frame indexing
    ↓
recorded randomization
    ↓
select 2 neutral projects
```

If G3-FE does not pass, candidate selection remains blocked.

---

## 3. Current Frame Condition

The public FMR Watch projects interface currently reports:

- 6,424 projects found;
- project search/filter controls;
- regional, provincial, municipal/barangay, status, program, and year filters; and
- 10 projects displayed per page on the visible index.

The public frame is therefore **observable**.

The research has not yet established that all 6,424 project records can be reproduced as a complete, stable, machine-readable sampling frame.

Therefore:

```text
OBSERVABLE       = established
ENUMERABLE       = not yet established
UNIQUELY MAPPABLE = not yet established
PRESERVABLE      = not yet established
REPRODUCIBLE     = not yet established
```

A visible population count is not, by itself, a complete sampling frame.

---

## 4. Definitions

### 4.1 Observable

A project representation can be reached through the defined public FMR Watch interface.

### 4.2 Enumerable

Every record belonging to the defined frame can be collected or otherwise deterministically represented, with no unexplained gaps.

### 4.3 Deterministically identifiable

Each frame record can be tied to a source record or stable source locator using a reproducible identity procedure.

### 4.4 Preserved

The exact frame used for selection can be retained as a canonical snapshot with acquisition metadata and integrity protection.

### 4.5 Reproducible

A deterministic rerun of the same frame-acquisition procedure produces the same record population, subject to documented changes in the live source during the acquisition window.

### 4.6 Independent reproduction

A second execution of the frame-acquisition procedure can verify the population without simply trusting or copying the first extracted dataset.

### 4.7 Downstream project information

Information that concerns reconciliation outcomes or later analytical knowledge, including procurement matches, financial records, payment status, audit findings, complaints, physical verification, suspected anomalies, ghost-project status, contractor reputation, or data richness.

---

## 5. Sub-Test Architecture

The test consists of eight sub-tests:

```text
G3-FE1 — Frame Accessibility
G3-FE2 — Complete Enumeration
G3-FE3 — Record Identity
G3-FE4 — Completeness / Count Reconciliation
G3-FE5 — Duplicate & Collision Test
G3-FE6 — Snapshot Integrity
G3-FE7 — Independent Reproduction
G3-FE8 — Outcome-Leakage Audit
```

All critical conditions must pass before G3 candidate selection proceeds.

---

# 6. G3-FE1 — Frame Accessibility

## Question

Can the public FMR Watch frame be accessed using only the public interface or other publicly available mechanisms, without privileged access?

## Minimum evidence

Record:

```text
source URL
access timestamp
portal version, if visible
reported population count
visible pagination behavior
available filter/search behavior
access method
```

## PASS

```text
Public frame accessible
+
contemporaneous population count recorded
+
acquisition method documented sufficiently for rerun
```

## FAIL

The frame cannot be reached through the defined public research path.

---

# 7. G3-FE2 — Complete Enumeration

## Question

Can every record belonging to the defined public frame be enumerated without selecting only convenient or searchable subsets?

The target is the **unfiltered observable project frame**.

The following do not constitute complete enumeration by themselves:

```text
first visible page
random visible pages
search-result samples
manually chosen regions
manually chosen years
known project lists
```

## PASS evidence

A complete enumeration record showing:

```text
all frame records traversed
no unexplained page/range gaps
no unexplained omissions
frame-level acquisition timestamp
enumeration method
```

The contemporaneous portal total is recorded as a control total, but the count alone does not define completeness.

## FAIL

The complete frame cannot be enumerated under the approved procedure.

---

# 8. G3-FE3 — Record Identity

## Question

Can every enumerated frame record be deterministically distinguished from every other frame record?

The test does **not** require a native database primary key if the public source does not expose one.

Preferred identity hierarchy:

```text
1. Native project identifier
2. Stable public source locator
3. Deterministic source-record fingerprint
4. Internal research frame identifier
```

The internal frame identifier is a research key, not evidence that the source itself has a persistent identifier.

## Minimum frame identity record

```text
frame_id
source_system
source_locator
native_project_id, if available
project_name
location/context
acquisition_timestamp
```

## PASS

Every enumerated record has a deterministic source-linked identity sufficient for unique frame inclusion.

## FAIL

A material portion of the frame cannot be uniquely distinguished.

---

# 9. G3-FE4 — Completeness / Count Reconciliation

Completeness requires multiple controls.

## Control A — Portal control total

Compare:

```text
portal-reported frame count
vs
enumerated record count
```

For the current frame, the contemporaneous expected control total is 6,424.

## Control B — Traversal coverage

Every expected page or record range is traversed.

## Control C — No unexplained gaps

Missing page ranges, inaccessible pages, or discontinuities must be recorded and explained.

## Control D — Frame definition consistency

The enumeration must represent the unfiltered observable frame rather than a union of manually selected filters unless a formally approved alternative frame definition exists.

## Live-frame change rule

If the portal population changes during acquisition, the discrepancy does not automatically constitute failure.

The research record must establish:

```text
FRAME OPEN
    ↓
acquisition begins
    ↓
enumeration
    ↓
FRAME CLOSE
```

The acquisition window and all observed count changes must be recorded.

A coherent frozen snapshot may still pass if the live-source mutation is documented and the captured frame remains internally complete.

## PASS

No unexplained material gap remains between the defined frame and the enumerated population.

## FAIL

Material omissions or count discrepancies remain unexplained.

---

# 10. G3-FE5 — Duplicate & Collision Test

The test must determine whether the enumerated rows represent distinct source records.

Check, in order:

```text
native identifier
source locator
source-record fingerprint
```

Where no native identifier exists, similarity of project name, location, year, or other attributes must **not** automatically merge records.

Use:

```text
UNIQUE
DUPLICATE
POSSIBLE DUPLICATE
UNRESOLVED
```

## PASS

No unexplained exact duplicate or collision remains.

Possible duplicates are documented rather than silently collapsed.

## FAIL

Duplicate/collision behavior prevents a reliable frame from being constructed.

---

# 11. G3-FE6 — Snapshot Integrity

The selected frame must be preservable as a research artifact.

The snapshot should preserve, where technically available:

```text
raw source output
canonical enumeration
source URL / access route
enumeration procedure
acquisition start and end timestamps
portal version, if visible
frame control total
normalization notes
```

A canonical snapshot should receive a cryptographic integrity hash, preferably SHA-256.

Example:

```text
FMR_WATCH_FRAME_YYYY-MM-DD.json
SHA-256: <recorded hash>
```

The hash establishes integrity of the captured artifact. It does not establish the truth of the underlying government records.

## PASS

The exact frame used for selection is preserved and integrity-checked.

## FAIL

The frame cannot be preserved or its integrity cannot be demonstrated.

---

# 12. G3-FE7 — Independent Reproduction

Reproducibility has two levels.

## R1 — Deterministic rerun

A second execution of the same approved procedure produces:

```text
same frame population
same record identities
same control total
```

subject to documented source mutation during the acquisition window.

R1 is mandatory.

## R2 — Independent execution path

Where technically feasible, a second independent path verifies the frame.

Examples:

```text
pagination traversal
vs
public export/API mechanism
```

or an independently implemented verification process.

R2 strengthens the evidence but is not mandatory when the source provides only one reproducible public mechanism.

## PASS

R1 reproduces the frame without unexplained material differences.

## INCONCLUSIVE

Source behavior prevents determining whether differences arise from the method or live-source mutation.

## FAIL

A deterministic rerun produces materially different frame membership without an explainable source change.

---

# 13. G3-FE8 — Outcome-Leakage Audit

Frame construction must not use downstream analytical information.

Enumeration and frame construction must not depend on:

```text
PhilGEPS match
DBM match
obligation/payment availability
contract availability
financial anomaly
procurement anomaly
physical nonexistence
suspected ghost status
complaints
citizen reports
audit status
legal/investigative status
contractor reputation
data richness
ease of reconciliation
expected analytical value
suspicion
post-selection information
```

These restrictions are inherited directly from the frozen G3 neutral-selection protocol.

## PASS

The frame is constructed solely from source-frame membership and pre-registered frame rules.

## FAIL

Downstream project knowledge influenced frame construction.

---

# 14. PASS Standard

G3-FE receives **PASS** only when all of the following are satisfied:

```text
A. Public frame accessible
B. Complete frame enumerated
C. Every record deterministically identifiable
D. Population completeness reconciled
E. No unexplained duplicate/collision remains
F. Snapshot preserved and integrity-checked
G. Deterministic rerun reproduces the frame
H. No downstream project information influenced frame construction
```

Only after this PASS may the random candidate-selection procedure begin.

---

# 15. PARTIAL Standard

G3-FE may receive **PARTIAL** when the substantive frame is established but a secondary reproducibility dimension remains constrained.

Examples:

```text
complete enumeration achieved
+
unique identities established
+
snapshot preserved
+
independent second execution path unavailable
```

or:

```text
complete enumeration achieved
+
reproduction performed
+
live-source count changed during acquisition
+
snapshot remains internally coherent
```

PARTIAL does not automatically authorize candidate selection.

The unresolved limitation must be explicitly assessed before G3 proceeds.

---

# 16. FAIL Standard

G3-FE receives **FAIL** when a material frame defect remains, including:

```text
complete enumeration impossible
unique representation impossible
material unexplained count mismatch
material unexplained omission
duplicate/collision structure prevents reliable frame construction
snapshot cannot be preserved
reproducibility fails without explanation
outcome information contaminated frame construction
```

A FAIL keeps G3 candidate selection blocked.

---

# 17. INCONCLUSIVE Standard

G3-FE receives **INCONCLUSIVE** when available evidence cannot distinguish a methodological failure from an external source limitation.

Example:

```text
portal mutation during acquisition
+
unstable pagination behavior
+
insufficient evidence to determine whether missing records
were absent from the source or omitted by the enumeration method
```

INCONCLUSIVE must not be silently converted to PASS.

---

# 18. Frame Freeze Rule

The sampling frame must be frozen **before** randomization.

```text
FRAME ENUMERATION
        ↓
FRAME VALIDATION
        ↓
FRAME SNAPSHOT
        ↓
FRAME HASH
        ↓
FRAME FREEZE
        ↓
G3 ELIGIBILITY FILTER
        ↓
DETERMINISTIC INDEXING
        ↓
RECORDED RANDOM SEED
        ↓
RANDOM ORDER
        ↓
2 CANDIDATES
```

A random seed applied to a moving or incompletely enumerated frame does not constitute reproducible selection.

---

# 19. No Shortcut Rule

The following shortcuts are prohibited unless the G3 protocol is formally amended before selection:

```text
random page selection
first-page selection
manually selected projects
region-only sampling
province-only sampling
search-result sampling
selection based on data richness
selection based on suspected anomalies
selection based on known outcomes
```

The inability to enumerate the frame does not authorize replacing the frame with an easier subset.

---

# 20. Evidence Record Required for Execution

The execution record should preserve at minimum:

```text
G3-FE execution ID
source URL / locator
portal version, if available
frame-open timestamp
frame-close timestamp
enumeration method
reported frame count
enumerated count
identifier method
duplicate test result
snapshot filename
snapshot hash
rerun timestamp
rerun result
source changes observed
exceptions / limitations
outcome-leakage audit result
final G3-FE disposition
```

This record becomes part of the G3 evidence chain.

---

# 21. Relationship to Existing G3 Protocol

The existing G3 protocol states that:

```text
neutrality is relative to the observable FMR Watch frame
```

and requires the complete frame to be reproducibly enumerated before deterministic random selection. It also prohibits downstream outcomes, data richness, ease of reconciliation, and suspicion from affecting selection or replacement.

G3-FE operationalizes that requirement without changing it.

---

# 22. Research Interpretation

A result that the FMR Watch frame is public but not reproducibly enumerable is **not** a finding that FMR Watch is defective or that its project records are false.

The precise possible observation is:

> **Public project observability is established, while machine-reproducible public enumeration of the full project population remains unestablished.**

This is an observability/reproducibility result, not an integrity accusation.

---

# 23. Final Decision

**STATUS: DESIGN APPROVED / READY FOR EXECUTION**

The G3 Frame Enumeration & Reproducibility Test is now formally defined.

The test must be executed against the currently observable FMR Watch frame before neutral candidates are selected.

No weakening of the approved G3 sampling frame is authorized merely because full enumeration is technically difficult.

The formal next action is:

```text
EXECUTE G3-FE
        ↓
PASS?
 ┌──────┴──────┐
YES            NO / PARTIAL / INCONCLUSIVE
 ↓                    ↓
freeze frame          investigate limitation
 ↓                    ↓
neutral selection     G3 selection remains blocked
```
