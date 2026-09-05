# G3-FE / FE7 Formal Separation: Population Identity vs Pagination / Presentation Ordering

## 1. Decision

FE7 is formally split into two distinct verification properties:

- **FE7-P — Population Identity Reproducibility:** Does an independent reproduction recover the same project UUID population as the frozen frame, without omissions, extras, or duplicate UUIDs?
- **FE7-O — Ordered Presentation Reproducibility:** Does an independent reproduction recover the same UUID sequence and the same pagination / position assignment as the frozen presentation?

### Gate disposition

**FE7-P: PASS** based on R2c.

**FE7-O: NOT REQUIRED for the G3-FE population-enumeration gate and therefore remains informational / non-blocking.**

This is a change in the acceptance criterion, not a change to the frozen frame.

## 2. Why the two properties must be separated

The frozen frame is a time-bounded observation of a public portal. Its record identity is fundamentally carried by the project UUID. Pagination parameters (`limit`, page number, page boundaries) are presentation mechanics.

The frozen frame recorded 6,467 projects across 647 pages at a page size of 10, with the original enumeration method using `GET /projects?view=table&page=N` and UUID extraction from project routes. The frozen frame itself is identified by frame ID `FMR-FRAME-2026-09-03-859cc9bd480e` and SHA-256 `859cc9bd480e3d219e9586d02e162889b5462553c40666fd2f10d49853fd4fc9`. 

R2c deliberately used `limit=100` and traversed the rendered table with the actual interactive Next control. It processed pages 1–65, recovered exactly 6,467 records, found 6,467 unique UUIDs, found zero duplicate UUIDs, matched the expected project count, and stopped when the Next control became disabled. The terminal shape is mathematically consistent with 6,467 records at 100 records per page: 64 full pages plus 67 records on page 65.

The R2c file's own validation still says `reached_expected_final_page: false` because its validator expected the frozen 647-page pagination shape. That validator is testing presentation geometry, not population identity, and therefore must not be allowed to convert a complete population reproduction into a population failure merely because `limit=100` changed the number of pages.

## 3. Formal definitions

### FE7-P — Population Identity

Let:

- `F` = set of UUIDs in the frozen frame
- `R` = set of UUIDs independently reproduced

FE7-P passes when all of the following hold:

1. `|F| = 6,467` for the frozen frame.
2. `|R| = 6,467`.
3. `|unique(R)| = 6,467`.
4. `F = R` as sets.
5. No UUID occurs more than once in the reproduction.
6. The reproduction is independently obtained from the public rendered table / valid portal interaction rather than copied from the frozen artifact.
7. The reproduction's navigation itself is valid enough that the recovered records are attributable to the intended project-table population.

Under this definition, UUID order does **not** matter.

### FE7-O — Ordered Presentation

Let `O_F` = ordered UUID sequence in the frozen frame and `O_R` = ordered UUID sequence in the reproduction.

FE7-O passes only when:

1. `O_F` and `O_R` have identical length, and
2. `O_F[i] = O_R[i]` for every record position `i`, and
3. page boundaries and position-on-page assignments also match the frozen presentation, using the same pagination parameters.

FE7-O is therefore a statement about **presentation stability / reproducibility**, not about whether the underlying project population is complete.

## 4. Evidence applied to R2c

The R2c reproduction states that it used:

- explicit start at page 1;
- UUID extraction only from project links inside the currently rendered table rows;
- actual rendered Next control clicked sequentially;
- navigation validation requiring the expected page/URL change and rendered UUID-sequence change.

It reports:

- pages successfully processed: 65;
- pages reached: 1 through 65;
- page sequence valid: true;
- enumerated records: 6,467;
- unique UUIDs: 6,467;
- duplicate UUID count: 0;
- expected project count match: true;
- expected unique count match: true;
- terminal reason: `NEXT_CONTROL_DISABLED`;
- fatal error: null.

The independent analysis of the R2c record population established:

- frozen count = 6,467;
- reproduced count = 6,467;
- frozen unique UUID count = 6,467;
- reproduced unique UUID count = 6,467;
- missing frozen UUIDs = 0;
- extra reproduced UUIDs = 0;
- UUID sets equal = true;
- reproduced duplicate UUIDs = 0.

Therefore the substantive FE7-P result is **PASS**.

## 5. What remains true about ordering

R2c does not reproduce the frozen UUID sequence exactly. The first page already demonstrates that the same first-100 population can appear in a different order. More broadly, changing the page size from 10 to 100 changes page boundaries, and the observed ordering is not equivalent to the frozen ordered frame at every contiguous 100-record block.

That observation does **not** prove that project records changed in substance. It demonstrates that page size / presentation can affect the sequence and partition exposed by the portal.

The original R1 result cannot resolve this issue because it was access-blocked: all 647 attempted pages failed and zero records were reproduced. Its `exact_ordered_frame_match: false` therefore reflects a zero-record comparison, not evidence of a content mismatch.

R2 and R2b were incomplete reproductions and should remain classified as methodological diagnostics rather than final FE7 failures.

## 6. Consequences for G3-FE

The purpose of G3-FE is to establish a reliable enumeration frame from which candidate projects can later be selected and reconciled. For that purpose, the critical invariant is the **population identity**, not the portal's arbitrary display order.

Accordingly:

- FE7-P is the binding acceptance criterion for independent reproduction.
- FE7-O is retained as an observational property and may be revisited only if a downstream G3 procedure explicitly depends on page position or deterministic ordering.
- A later change in pagination size must not invalidate a successful population reproduction merely because the page count changes.
- The frozen frame itself remains immutable and continues to serve as the historical reference snapshot.
- No claim is made that the portal's ordering is stable over time.

## 7. Candidate-selection rule after FE7

Candidate selection may proceed from the frozen frame population once the remaining G3-FE gates are satisfied, because FE7-P establishes that the independently observed portal population is the same UUID population as the frozen reference.

Candidate selection must **not** use page number or position-on-page as an identity key.

The identity key is the project UUID.

## 8. What would make FE7-O necessary later

FE7-O becomes a required test only if a later research question explicitly depends on presentation semantics, for example:

- whether the portal has a reproducible canonical sort order;
- whether page position itself encodes a stable ranking or priority;
- whether a sampling protocol selects projects by fixed page/position;
- whether page boundaries are evidence-bearing in their own right.

Absent such a requirement, exact order is not a scientifically necessary condition for proving population identity.

## 9. Final G3-FE status impact

**FE7-P: PASS**

**FE7-O: INFORMATIONAL / NON-BLOCKING**

**G3-FE overall: no longer blocked by the earlier false equivalence between population mismatch and presentation mismatch, subject only to the other already-defined G3-FE gates and any explicit downstream requirement for presentation-order evidence.**

## 10. Frozen-frame integrity statement

This decision does not rewrite, reorder, or regenerate the frozen frame. The original frozen frame remains the authoritative 2026-09-03 snapshot.

The change is solely to the interpretation of what FE7 is required to prove:

> **FE7 proves reproducibility of the project population. It does not, by default, prove reproducibility of the portal's pagination or display order.**
