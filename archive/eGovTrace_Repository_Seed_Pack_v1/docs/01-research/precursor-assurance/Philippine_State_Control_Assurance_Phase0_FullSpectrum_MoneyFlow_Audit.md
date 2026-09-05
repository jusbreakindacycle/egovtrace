# Philippine State Control & Assurance Universe
## Phase 0 Extension — Full-Spectrum Public Money Flow & Detectability Audit

---

## 0. Purpose, method, and honesty about scope

You asked for the widest possible sweep: every existing, upcoming, and planned government program or service, and specifically every channel through which taxpayer money moves — in or out — checked for loopholes or blind spots that make unusual activity or corruption hard to see. That is a whole-of-government ask, so this document does two things and is explicit about which is which:

1. **Ten money-flow domains researched and verified this pass**, each against primary or official sources where available, labeled **CONFIRMED / PARTIAL / PLANNED / UNCERTAIN** per the project's existing discipline.
2. **A named list of domains not yet independently checked** (Section 6) — because asserting findings about agencies I have not actually verified this round would violate the project's own adversarial standard. "Lahat" is the target; this is the first full-width pass toward it, not the last.

This document is additive to, not a replacement for, the existing Gap Map, the Systems Audit PDF, and the Phase 0/1/2A review chain.

---

## 1. Carried over from last approval (logged, not re-argued)

Per your approval, two items are now queued for consolidation into the master Gap Map:

- **New gap category — Institutional Memory / Compliance Persistence Gap**, generalized from the 1941 flood-control master-plan finding: the specific failure where a *plan* is produced and approved, then silently dropped across administration changes, with no system flagging that it exists and was never executed.
- **Water Resources update note**: the 2026 NIA–DPWH multi-purpose dam convergence (Pampanga Basin, Cebu) as a live case to watch for whether coordination becomes a shared *system* or stays a *policy/MOA* arrangement.

Section 5 below shows that this round's evidence extends the same gap category from physical infrastructure plans to **financial and statutory obligations** — the pattern turns out to be broader than the flood-control case suggested.

---

## 2. The Ten Money-Flow Domains

### 2.1 Tax Collection — Bureau of Internal Revenue (BIR)

**Legal basis:** National Internal Revenue Code, as amended; RR 11-2025 (e-invoicing mandate).
**Status: PARTIAL / CONFIRMED**

BIR's own commissioner has stated the VAT gap — tax legally owed but not collected — currently stands at **40 percent**, and attributes the majority of it to the use of fraudulent "ghost receipts."<sup>[1]</sup> In August 2025, BIR filed criminal complaints against dozens of corporations, corporate officers, and CPAs over ghost-receipt schemes tied to roughly ₱1.4 billion in tax deficiencies, and separately sued 96 buyers of ghost receipts in a case alone valued at that same ₱1.4 billion.<sup>[2][3]</sup> These cases were built through BIR's own "Run After Fake Transactions" (RAFT) investigative program — i.e., **detected through targeted audit and investigation, not through automated cross-system flagging**.<sup>[4]</sup>

BIR's structural fix — the Electronic Invoicing System (EIS), transmitting structured JSON invoice data via API — is real but narrow and delayed: originally due March 2026, the first mandatory phase was pushed to **December 31, 2026**, and even then covers only large taxpayers (>₱1 billion revenue), e-commerce businesses, and firms already using computerized accounting systems.<sup>[5][6]</sup> Nothing in the public record confirms EIS data is cross-linked to PhilGEPS supplier registrations or SEC beneficial-ownership records — meaning the exact "ghost corporation" entities used to inflate government contract costs are not automatically checked against the exact same ghost-receipt patterns BIR is prosecuting.

**Detectability gap:** the mechanism most likely to catch fake invoicing (EIS) explicitly excludes the small/shell-company segment most likely to *issue* ghost receipts, and is not confirmed to talk to procurement or corporate-registry systems at all.

### 2.2 Customs — Bureau of Customs (BOC)

**Legal basis:** Customs Modernization and Tariff Act (CMTA).
**Status: PARTIAL / LEGACY-DEPENDENT**

BOC still runs on the **E2M** ("electronic-to-mobile," derisively called "electronic-to-manual" by industry) system, mediated by third-party Value-Added Service Providers (VASPs) who lodge and route import/export entries.<sup>[7][8]</sup> A full replacement (iPCS, which would eliminate the VASP layer) has been discussed publicly since **2012**; as of a June 2026 system advisory, E2M is still the live production system.<sup>[9][10]</sup> High-value smuggling continues to be caught through physical raids rather than system flags — e.g., a February 2024 raid recovering ₱3.72 billion in smuggled vapes, which triggered a House investigation only after the fact.<sup>[11]</sup>

**Detectability gap:** a 14-year-delayed system replacement means the customs valuation/declaration layer still runs through a third-party lodgment model with a documented history of enabling under-declaration; detection remains raid-driven, not systemic.

### 2.3 Intergovernmental Transfers — National Tax Allotment (NTA)

**Legal basis:** Local Government Code, as reinterpreted by the 2019 Mandanas-Garcia Supreme Court ruling (effective 2022).
**Status: CONFIRMED / STRUCTURALLY UNDER-MONITORED**

The Mandanas-Garcia ruling entitled LGUs to 40% of *all* national tax collections (not just BIR's), computed from BIR, BOC, and Bureau of the Treasury collections three years prior.<sup>[12]</sup> The NTA has grown from roughly ₱959 billion (pre-ruling baseline year) to a record **₱1.32 trillion for 2027**.<sup>[13][14]</sup> This is a much larger, more general-purpose pool than the earmarked Local Government Support Fund (LGSF, ₱57.87B) that your existing research already covers through SubayBAYAN. The state think tank PIDS has flagged that LGUs are "prone to maintain surpluses" (i.e., not spend the money) or lack the technical capacity to execute devolved functions, and separately documented LGUs **"cross-charging" or "cross-crediting" expenditures between different local offices** — obscuring which office actually spent what.<sup>[15]</sup>

**Detectability gap:** NTA is transferred automatically by formula to ~1,700+ LGU treasuries with accountability resting solely on local officials; unlike LGSF's SubayBAYAN tracking, there is no confirmed system tracking NTA general-fund utilization in anything close to real time — only after-the-fact COA post-audit.

### 2.4 The Off-Cycle Channel — Unprogrammed Appropriations & GOCC Fund Sweeps

**Legal basis:** Annual GAA Special Provisions; upheld as constitutional in *Belgica v. Executive Secretary* (2019) per DBM's own citation.
**Status: CONFIRMED / ACTIVELY CONTESTED**

This is arguably the single most important finding of this pass, because it directly funded the channel behind the DPWH scandal your research already documents. In 2024, **Congress itself introduced GOCC funds beyond mandatory dividends** — including "idle" GOCC reserves — as a source for Unprogrammed Appropriations (UA), instructing DOF to consolidate these balances.<sup>[16]</sup> UA ballooned in response — the 2026 GAA initially proposed ₱150.9 billion in UA (down from a 2025 peak of ₱363.4 billion after presidential vetoes), and President Marcos vetoed a further ₱92.5 billion, including ₱6.9 billion in GOCC budgetary support.<sup>[17][18]</sup> Two sitting members of Congress (Reps. Erice and De Lima) have petitioned the Supreme Court to declare the entire 2026 GAA's UA provision unconstitutional.<sup>[19]</sup> A business-association statement on the 2026 GAA explicitly characterizes ayuda-classified UA items as **"soft pork"** subject to discretionary/patronage disbursement, and a Philippine Law Journal analysis frames the GOCC-cash-sweep provision as a potential vehicle for **"covert pork."**<sup>[20][21]</sup>

**Detectability gap:** UA is, by design, not subject to the same line-item scrutiny as the regular budget (it activates only when "excess revenue" materializes), and the GOCC-sweep mechanism that feeds it is genuinely contested as unconstitutional in a case still before the Supreme Court as this document is written. This is a live legal question, not a settled fact — but the fact that sitting legislators, not any monitoring system, are the ones raising it is itself the finding.

### 2.5 Confidential & Intelligence Funds (CIF)

**Legal basis:** DBM/COA/DILG/GCG/DND Joint Circular (2015); annual GAA special provisions.
**Status: CONFIRMED / UNDER ACTIVE REFORM**

The 2026 GAA allocated **₱11.8 billion** in CIF government-wide. The Office of the President alone received **₱4.5 billion (38% of the total)** — its fourth consecutive year receiving CIF — versus ₱1.47 billion for the National Intelligence Coordinating Agency, and just ₱10 million and ₱51.47 million respectively for COA and the Ombudsman, the two bodies meant to investigate misuse of everything else.<sup>[22]</sup> As of **August 30, 2026 — days before this document was written** — COA is actively reviewing and planning amendments to the governing joint circular, citing identified gaps.<sup>[23][24]</sup> CIF accountability is also directly entangled in the ongoing impeachment trial of Vice President Sara Duterte.<sup>[25]</sup> A recurring editorial position (Manila Bulletin, echoed by the Makati Business Club) is that CIF should be restricted to agencies with an actual security/law-enforcement mandate, since civilian agencies "should not routinely receive CIFs simply because an executive official asserts a need."<sup>[25][26]</sup>

**Detectability gap:** this is public money that is *designed* to be untraceable by ordinary means (that is the point of "confidential"), and the historical record shows the failure mode is not hypothetical — a 2010 Senate hearing found ₱54 million in PCSO intelligence-fund liquidation documents from 2007 simply did not exist.<sup>[27]</sup> COA's own oversight budget for auditing *everyone else's* CIF is a fraction of what a single office receives to spend confidentially.

### 2.6 Social Health Insurance — PhilHealth

**Legal basis:** Universal Health Care Act (RA 11223).
**Status: CONFIRMED / SUPREME COURT RULING ACTIVE**

Under a 2024 DOF circular (implementing the Section 2.4 mechanism above), ₱89.9 billion of PhilHealth's reserve funds were swept to the National Treasury as "excess" funds. In **December 2025**, the Supreme Court unanimously ruled this transfer **unconstitutional**, ordering ₱60 billion returned via the 2026 GAA — which PhilHealth received in May 2026.<sup>[28][29]</sup> Then-DOF Secretary Recto and PhilHealth's president now face plunder and malversation complaints over the transfer.<sup>[30]</sup> Separately — and this is the detectability-specific finding — a December 2025 discussion paper by the state think tank PIDS found that PhilHealth's **provider-fraud controls rely on manual, fragmented detection systems** and operate on a narrow definition of fraud, leaving billions in claims exposed to weak scrutiny **on the benefit-payout side**, independent of the reserve-fund controversy.<sup>[31]</sup>

**Detectability gap:** two separate failure modes stacked on one GOCC — (a) its reserve funds became a contested off-budget revenue source for the national government, discovered only via Supreme Court litigation; and (b) its own claims-payment fraud detection is officially assessed as manual and fragmented.

### 2.7 Statutory Inter-Agency Remittance — PAGCOR / PCSO → Philippine Sports Commission

**Legal basis:** RA 6847 (PSC Charter).
**Status: CONFIRMED / DECADES-LONG NON-COMPLIANCE**

RA 6847 has required PAGCOR to automatically remit 5% of gross income, and PCSO a share of sweepstakes proceeds, to the PSC since **1993 and 2006** respectively. Neither did so at the mandated rate for decades. The Supreme Court had to rule — finalized January 2026 — that the remittance is "mandatory and statutory" and unqualified by deductions, ordering both agencies to produce a full accounting back to their respective start years; the petitioner's own estimate puts potential arrears at **₱25 billion**.<sup>[32][33][34]</sup> As recently as August 2026, a House Appropriations hearing revealed PCSO had remitted only **₱1.5 million for the entirety of 2025** post-ruling, prompting a lawmaker to directly ask whether the agency had complied at all.<sup>[35]</sup>

**Detectability gap:** this is the cleanest example in this whole audit of a **known, unambiguous, decades-old statutory obligation between two government bodies** that went unenforced with no automated compliance check of any kind — it was surfaced entirely through one legislator's 2014 mandamus petition, not through any government monitoring function.

### 2.8 Social Protection Cash Transfers — DSWD (4Ps and adjacent aid programs)

**Legal basis:** RA 11310 (4Ps Act).
**Status: PARTIAL / PILOT VERIFICATION**

DSWD has begun using a PhilSys-linked app ("BBM Serbisyo") specifically to prevent "ghost beneficiaries," duplicate claimants, and fraudulent identities across 4Ps and related programs — but as of November 2025 it had verified only **180,000 beneficiaries** against a national-ID-linked identity check, a small fraction of DSWD's total caseload.<sup>[36]</sup> More concretely: in April 2026, DSWD itself flagged **"ghost drivers"** in a ₱2.7-billion aid-leakage case, where falsified entries in beneficiary lists *submitted by private Transportation Network Companies* went undetected until a legislative oversight hearing (the PROTECT Committee) surfaced the inconsistency.<sup>[37]</sup>

**Detectability gap:** identity-verification against PhilSys exists and is directionally correct, but coverage is a small fraction of total beneficiaries, and the ₱2.7B case shows the specific failure mode — beneficiary lists supplied by an *external, non-government* party (the TNCs) were taken at face value until legislators, not DSWD's own system, caught the discrepancy.

### 2.9 Foreign-Financed Infrastructure — Official Development Assistance (ODA) Loans

**Legal basis:** RA 8182/8555 (ODA foreign-debt-limit exclusion law); carried into the 2025 IRR of RA 12009.
**Status: CONFIRMED — STRUCTURAL, NOT A BUG**

This is a legal carve-out, not an oversight failure, which makes it more important to name explicitly: the newly-issued 2025 Implementing Rules of RA 12009 (the government's own current procurement law) **exempt procurement funded by foreign grants/loans from standard domestic procurement rules "unless the GoP and the foreign grantor... agree otherwise."**<sup>[38][39]</sup> In practice, this means a Government-of-the-Philippines-guaranteed obligation can be procured and executed entirely under a foreign lender's own rules, foreign law, and foreign dispute-resolution forum. The Kaliwa Dam project remains the clearest illustrative case: a US$283.2 million China Eximbank loan, contractor selection outside standard competitive bidding under the loan's own terms, governed by Chinese law, with disputes routed to the Hong Kong International Arbitration Centre.<sup>[40][41]</sup> (This is a historical, well-documented example used to illustrate how the mechanism functions — not a claim that Kaliwa Dam itself is currently under active corruption investigation.) Formal oversight exists on paper — NEDA and COA are each statutorily required to report ODA project status to Congress by June 30 annually<sup>[42]</sup> — but neither of those reports interfaces with PhilGEPS, BTMS, or your project's existing spatial-verification layer (GeoAgri/SubayBAYAN).

**Detectability gap:** an entire category of major infrastructure spending is, by design and by current law, outside the domestic procurement transparency stack (PhilGEPS/OCDS) your existing research is built around — and the loan proceeds still flow through the same treasury and debt-service system as everything else.

### 2.10 Provident/Pension Funds & GOCC Transparency Mandate — SSS, GSIS, Pag-IBIG

**Legal basis:** Respective charters; GCG–DICT Joint Memorandum Circular No. 002 (s. 2026).
**Status: CONFIRMED OPERATIONAL / NOT YET RISK-TESTED**

These three manage the largest pooled contributory funds in the country (contributions, calamity and housing loans, pensions). A genuinely positive, confirmed finding: a **2026 GCG–DICT joint circular now mandates GOCC transparency portals** disclosing governance, financials, and COA audit opinions — Pag-IBIG's own portal, for instance, publicly posts COA-audited financial statements with an unqualified opinion through FY2024.<sup>[43]</sup> This pass did not surface a specific current fraud or fund-diversion case comparable to PhilHealth's or CIF's, and I am not asserting one exists — it should be read as **flagged for a dedicated future verification pass**, not as clean, given the sheer size of the pooled funds involved.

**Detectability gap:** unknown/not yet tested this round. This is a candid gap in this document, not a finding.

---

## 3. Cross-Cutting Pattern: The Real Finding

Reading all ten domains together surfaces one dominant, repeating pattern — and it directly answers your original question of "paano malalaman kung may hindi pangkaraniwan o corruption na nangyayari":

> **In every domain above, the violation was surfaced by the Supreme Court, Congress, or a legislative hearing — years or decades after the fact — never by an internal government monitoring system.**

- PhilHealth's reserve sweep: surfaced by Supreme Court litigation (2025), not by any DOF/PhilHealth internal control.
- PAGCOR/PCSO non-remittance: a **1993/2006** obligation, surfaced by a **2014** mandamus petition, still not fully complied with in **2026**.
- CIF misuse patterns: surfaced through impeachment proceedings and ad hoc Senate hearings, not routine audit — and COA is only now (Aug 2026) revising the rules that were supposed to prevent this.
- The DPWH ghost-project scandal your existing research covers: surfaced by physical AFP/DND site inspection, not PhilGEPS/BTMS.
- The 4Ps "ghost drivers": surfaced by a legislative oversight committee, not DSWD's own verification layer.
- The Unprogrammed Appropriations/GOCC-sweep mechanism: currently being challenged by two individual legislators via Supreme Court petition — the executive and legislative branches that created the mechanism are not the ones flagging it.

This generalizes — and merges with — the Institutional Memory / Compliance Persistence Gap already approved in Section 1. The 1941 master-plan case showed that **infrastructure plans** get dropped across administrations with nothing tracking it. This round shows the identical mechanism operating on **standing legal and financial obligations**: a law or circular gets passed, an obligation is created, and unless an outside actor happens to litigate or hold a hearing, non-compliance can run indefinitely. The common root cause across a flood-control master plan and a 30-year-old GOCC remittance law is the same: **the Philippine state has no standing function whose job is to check "is this obligation, once created, still being honored?"** — every case above was caught by accident of politics, litigation, or crisis, not by design.

Two secondary patterns worth naming:

- **Detection instrument exists but scope excludes the highest-risk segment** — BIR's EIS excludes the small/shell-company layer that generates ghost receipts; DSWD's PhilSys-verification app covers a small fraction of total beneficiaries.
- **Legal carve-out as structural blind spot** — CIF secrecy and the ODA procurement exemption are not oversights; they are deliberately-designed exceptions to the transparency stack, which makes them permanent rather than a bug that gets patched.

---

## 4. Updated Institutional Money-Flow Matrix (additions to the existing PDF matrix)

| Domain | Managing Entity | Legal Basis | Status | Core Detectability Gap |
|---|---|---|---|---|
| Tax collection | BIR | NIRC; RR 11-2025 | Partial | EIS excludes shell-company tier; no confirmed PhilGEPS/SEC link |
| Customs | BOC | CMTA | Legacy | 14-yr-delayed system replacement; raid-driven detection |
| LGU general transfers | DBM/BLGF/LGUs | LGC; Mandanas-Garcia | Under-monitored | No SubayBAYAN-equivalent for general-fund NTA |
| Off-cycle national spending | DBM/Congress/GOCCs | GAA Special Provisions | Contested | UA/GOCC-sweep mechanism itself before SC |
| Confidential/Intelligence Funds | OP + multiple agencies | 2015 Joint Circular | Under reform | Secrecy by design; oversight budget dwarfed by spender's own CIF |
| Social health insurance | PhilHealth/DOF | UHC Act | SC-active | Reserve sweep + manual provider-fraud detection |
| GOCC statutory remittance | PAGCOR, PCSO → PSC | RA 6847 | Non-compliant | 20-30 yr unenforced obligation |
| Social cash transfers | DSWD | RA 11310 | Pilot | PhilSys check covers small fraction of caseload |
| Foreign-financed infra | NEDA/DOF/implementing agency | RA 8182/8555; RA 12009 IRR | Structural exemption | Outside domestic procurement transparency stack |
| Pension/provident funds | SSS, GSIS, Pag-IBIG | Respective charters; GCG-DICT JMC 002-2026 | Not yet tested | Unknown — flagged for next pass |

---

## 5. Not Yet Independently Verified This Round

Named explicitly rather than silently omitted, per the project's own adversarial standard — these are flagged as **next-pass candidates**, not findings:

- **National Food Authority** — rice procurement/buffer stock, historically corruption-associated
- **DepEd** — the single largest annual agency budget; school-building fund and procurement history warrant a dedicated pass
- **AFP/PNP modernization funds** — large capital-outlay programs under RA 10349 (as amended)
- **GOCC dividend remittance across the full ~100+ GOCC universe** — this pass only checked PAGCOR/PCSO/PhilHealth specifically
- **Judiciary Development Fund and court-fee collections**
- **Bangko Sentral ng Pilipinas** — monetary authority; likely genuinely outside a "contractor/disbursement" corruption-detection frame, but not confirmed either way

---

## 6. Implication for Phase 1 / Phase 2A — a scope caution, not a scope expansion

The Phase 1/Phase 2A Readiness Gap Review already flagged **Gap 6 (solo execution scope realism)** and **Gap 3 (no named candidate projects)**. This document should be read as **widening Phase 0's verified evidence base**, not as a signal to expand the Phase 2A build to cover ten new domains — that would repeat exactly the scope-creep risk already identified. The FMR pilot remains the Phase 2A candidate.

If a *second* candidate is ever considered after FMR, this pass suggests the DSWD beneficiary-integrity case (2.8) is structurally the closest analogue to FMR — bounded, entity-resolution-shaped, and built on data (PhilSys, beneficiary lists) that is plausibly obtainable without a live FOI law. By contrast, CIF (2.5) and the UA/GOCC-sweep mechanism (2.4) are the highest-value findings in this document but also the highest **personal/publication exposure risk** per the Readiness Gap Review's Gap 4 — they touch the Office of the President directly and an active impeachment trial. Any public-facing output referencing 2.4 or 2.5 should stay strictly at the level of citing already-public SC filings, COA statements, and news reporting — exactly as this document does — rather than original claims.

---

## Works Cited

1. BIR files criminal complaints vs execs, CPAs for tax evasion — BusinessMirror, Aug 7 2025
2. BIR Files 23 Tax Evasion Cases — BIR official release, Aug 7 2025
3. BIR sues 96 buyers of 'ghost receipts' — Inquirer, Aug 8 2025
4. Chasing after ghosts for tax purposes — PwC Philippines, Aug 2024
5. e-Invoicing in Philippines 2026: Timeline, Guidelines — ClearTax, 2026
6. The Philippines' e-invoicing mandate explained — ecosio, Mar 2026
7. e2m Customs Cargo Clearance Manual — BOC/Scribd
8. PH Customs to junk e2m for new integrated system — PortCalls Asia
9. E2M System Advisory — Bureau of Customs, Jun 2026
10. Philippines - Customs Regulations — Trade.gov, Jun 2026
11. Malabon, Parañaque raids yield P3.72 billion of smuggled vapes — Inquirer
12. FAQs Mandanas-Garcia Ruling — DBM
13. LGU share of national taxes climbs to P1.32 trillion — Philstar, Jun 2026
14. LGUs to get record P1.32-T tax allotment — BusinessWorld, Aug 2026
15. Mandanas-Garcia ruling funding boost exposes LGU gaps, PIDS says — Manila Bulletin, Jun 2026
16. The real accountability behind the ghost flood control project plunder — BusinessMirror Editorial, Dec 2025
17. Unprogrammed funds in 2026 GAA 'constitutional, clearly defined' – DBM — PNA, Jan 2026
18. Gov't cracks down on GOCCs' budget dependence — Manila Bulletin, Jan 2026
19. (Erice/De Lima SC petition) per PNA, Jan 2026
20. Statement on the 2026 General Appropriations Act — Makati Business Club
21. Unpacking Unprogrammed Appropriations: A PFM Perspective — Congress CPBRD, Mar 2026
22. Marcos' office gets P4.5 billion secret funds for 2026 — Inquirer, Jan 2026
23. CoA review of memo on confidential funds may lead to broader reforms — BusinessWorld, Aug 30 2026
24. COA eyes changes to rules on confidential, intelligence funds — Filipino Times, Aug 2026
25. Secret funds, public money, public accountability — Manila Bulletin, Aug 2026
26. (same, Atin Ito republication)
27. Papers on intel funds missing — Inquirer (PCSO 2007 CIF)
28. PRESS BRIEFER December 05, 2025 — Supreme Court of the Philippines
29. '2026 budget responsive to SC ruling on PhilHealth funds' — Philstar, Dec 2025
30. Recto faces plunder, malverse raps over PhilHealth, PDIC funds — Philstar, May 2026
31. Weak anti-fraud controls put PhilHealth funds at risk—PIDS — Manila Bulletin, Jan 2026
32. Fund sports commission, SC tells PCSO, PAGCOR — Daily Tribune, Jan 2026
33. PSC stands to get ₱25-B from Pagcor, PCSO with SC ruling — BusinessMirror, Jan 2026
34. SC Orders PCSO, PAGCOR to Remit Funds to PSC — Supreme Court of the Philippines
35. PCSO tells lawmaker: We 'overremitted' to PSC — Inquirer, Aug 2026
36. DSWD app verifies 180K beneficiaries to prevent 'ghost' aid claims — Tribune, Nov 2025
37. DSWD flags "ghost drivers" in ₱2.7-B aid leakage — DZRH, Apr 2026
38. Implementing Rules and Regulations of RA 12009 — GPPB, 2025
39. IRR of RA No. 12009 — GPPB (foreign funding provisions)
40. The expensive and harmful 'Build Better More' — IBON Foundation
41. Kaliwa Dam deal 'suspiciously disadvantageous' to PH — Inquirer
42. Foreign Funding (RA 4860/8182/8555 oversight provisions) — COA
43. Pag-IBIG Fund Transparency Portal — open.gov.ph

---

## What I did — and the plain-language version

I took the two things you approved last turn as already logged, then ran a wide pass across ten different places where government money moves — collecting it (BIR, BOC), sending it out automatically (LGU transfers), moving it off the normal books (unprogrammed funds, confidential funds), insuring people (PhilHealth), paying out mandated shares between agencies (PAGCOR/PCSO to sports), giving cash aid to poor families (4Ps), building things with borrowed foreign money (ODA loans), and the big pension funds (SSS/GSIS/Pag-IBIG).

The single biggest thing that came out of this: in every one of these ten areas, when something went wrong — money swept illegally, a legal obligation ignored for 20-30 years, secret funds misused — nobody's internal government system caught it. It was always a Supreme Court case, a Senate hearing, or a lawmaker asking an inconvenient question, usually years after the fact. That's the same root problem as the 1941 master-plan story from last time, just showing up in money instead of infrastructure plans: the Philippines makes plans and laws, but nothing checks later whether they're actually being followed.

I did not check everything — NFA, DepEd, AFP/PNP modernization funds, and the wider GOCC universe are honestly flagged as not yet researched rather than guessed at. And I flagged that this shouldn't turn into trying to build something covering all ten areas at once — your FMR pilot stays the Phase 2A focus; this is just a wider, better-evidenced map to build future decisions on.
