# eGovTrace Citizen Product and Mobile Web Architecture v1

**Status:** APPROVED WORKING PRODUCT ARCHITECTURE  
**Relationship to G0–G6:** Product/UX architecture derived from approved eGovTrace research architecture; not a new formal gate.  
**Primary deployment model:** Standalone eGovTrace public web application/PWA, discoverable and launchable from eGovPH; native mobile app is optional future delivery, not required for citizen access.

---

## 1. Executive Decision

eGovTrace is a **national accountability service** that may be surfaced inside eGovPH but must remain an independently addressable product and backend capability.

The public entry point is a **mobile-first web/PWA experience**. eGovPH acts as a trusted government gateway, authentication/notification surface where applicable, and integration channel. eGovTrace remains responsible for accountability-specific search, reporting, evidence, graph context, control signals, case tracking, and public resolution views.

This separation prevents eGovTrace from becoming either:

- a replacement for government source systems; or
- a generic complaint form hidden inside a super-app.

The approved architecture already defines eGovTrace as an interoperability/accountability layer over fragmented source systems, with distinct citizen, government-assurance, and evidence layers.

Reference: approved eGovTrace architecture; source systems remain authoritative and eGovTrace performs cross-system reconciliation rather than replacement.

---

## 2. Product Definition

### 2.1 Citizen promise

> **Find it. Understand it. Report it. Follow what happened.**

The public product must answer, as far as evidence permits:

- What is this government project, service, transaction, asset, or activity?
- Who is responsible?
- How much public money or public resource is involved?
- What has happened so far?
- What evidence supports that answer?
- What remains unresolved or unavailable?
- What can a citizen report?
- What happened after the report?

### 2.2 Product loop

```text
DISCOVER
  ↓
UNDERSTAND
  ↓
OBSERVE
  ↓
REPORT
  ↓
VERIFY / RECONCILE
  ↓
ROUTE
  ↓
RESPOND
  ↓
RESOLVE
  ↓
PUBLIC RECORD
```

### 2.3 What eGovTrace is not

- Not a replacement for agency systems.
- Not a centralized copy of all government records by default.
- Not a public blacklist.
- Not an accusation or naming-and-shaming engine.
- Not an autonomous investigative authority.
- Not a judicial or quasi-judicial decision-maker.
- Not a requirement that citizens understand government identifiers.

---

## 3. Relationship With eGovPH

The integration model is:

```text
eGovPH
  │
  ├── Discover / launch eGovTrace
  ├── Optional identity / authentication handoff
  ├── Optional notification handoff
  └── Government digital ecosystem integration
          ↓
      eGovTrace
          ↓
      eGovTrace Core
```

The 2026 IRR of the E-Governance Act establishes the Citizen Frontline Delivery Services Platform, currently known as eGovPH SuperApp, and separately provides for an Online Public Service Portal for information, assistance, complaints, feedback, and integration of existing mechanisms. It also requires mobile-friendly, accessible government web experiences and API access to public information. https://lawphil.net/statutes/repacts/ra2026/irr_12254_2026.html

### 3.1 Boundary

| Capability | eGovPH | eGovTrace |
|---|---|---|
| Government service transaction | Primary | Context/link/status where appropriate |
| Authentication | Primary/shared | Accept trusted handoff where lawful |
| Notifications | Primary/shared | Case/report notifications |
| Accountability search | Entry point / launch | Primary |
| Cross-system evidence graph | No | Primary |
| Citizen report intake | Gateway/integration | Primary accountability record |
| Evidence provenance | Source-dependent | Primary |
| Control/anomaly signals | No | Primary |
| Investigation decision | No | No |
| Case routing support | Integration | Primary decision-support layer |
| Official enforcement/adjudication | Competent authority | Track only where lawful |

### 3.2 Deep link model

Every major eGovTrace object should have a stable public URL/deep-link pattern:

```text
/project/{egovtrace_id}
/entity/{egovtrace_id}
/service/{egovtrace_id}
/report/{egovtrace_id}
/evidence/{egovtrace_id}
/case/{egovtrace_id}
```

The same URL may be opened from:

- eGovPH;
- mobile browser;
- QR code at a project/site;
- search engine result;
- citizen-shared link;
- official government page.

---

## 4. Public Information Architecture

### 4.1 Primary navigation

The public navigation should remain small:

```text
HOME
SEARCH
REPORT
MY REPORTS
ABOUT
```

Authenticated users may additionally receive:

```text
NOTIFICATIONS
SAVED ITEMS
FOLLOWED CASES
```

### 4.2 Home

The first screen should prioritize three actions:

```text
What are you looking for?
[ Search government ]

Something wrong or unusual?
[ Report something ]

Already reported something?
[ Track a report ]
```

Do not lead with a dense government dashboard.

### 4.3 Search

Search must accept ordinary-language queries and known identifiers.

Examples:

```text
"Cabarasan Dao road"
"24-076-10 ALPHA"
"GS-2503015"
"ABC Construction"
"business permit"
"Port of Manila"
```

Search result cards should identify object type in plain language:

```text
PROJECT
CONTRACT
AGENCY
CONTRACTOR
SERVICE
REPORT
PLACE
EVIDENCE
```

### 4.4 Object page

The default public object page is a concise narrative with expandable evidence detail:

```text
WHAT IT IS
STATUS
RESPONSIBLE INSTITUTION
MONEY / RESOURCE
TIMELINE
WHAT IS KNOWN
WHAT IS NOT YET ESTABLISHED
RELATED RECORDS
CITIZEN REPORT
SOURCE / EVIDENCE
```

### 4.5 Lifecycle display

Where applicable:

```text
PLAN
  ✓
BUDGET
  ✓
PROCUREMENT
  ✓
CONTRACT
  ✓
OBLIGATION
  ?
PAYMENT
  ?
IMPLEMENTATION
  ✓
INSPECTION
  ?
COMPLETION
  REPORT
OUTCOME
  ?
```

The public interface must visibly distinguish:

- CONFIRMED
- REPORTED
- UNRESOLVED
- NOT ESTABLISHED
- NOT PUBLICLY AVAILABLE

Never present a gap as a factual negative.

---

## 5. Citizen Reporting Architecture

### 5.1 Report entry points

A citizen can start a report from:

1. Home.
2. Search results.
3. A project/service/entity page.
4. A map/location view.
5. A QR/deep link.
6. eGovPH.

### 5.2 Report flow

```text
REPORT
  ↓
WHAT DID YOU OBSERVE?
  ↓
WHERE?
  ↓
WHAT DOES IT CONCERN?
  ↓
ADD EVIDENCE
  ↓
OPTIONAL CONTACT / ACCOUNT
  ↓
REVIEW
  ↓
SUBMIT
```

### 5.3 Minimum report fields

```text
report_id
observed_at (optional)
location
category
free_text_description
related_object_candidate (optional)
attachments
contact_preference (optional)
consent / privacy choices
submission timestamp
```

### 5.4 Citizen evidence

Supported evidence can include, as lawful and technically supported:

- photographs;
- video;
- documents;
- URLs;
- location;
- screenshots;
- structured observations.

Uploaded evidence must retain provenance and should receive its own evidence identifier.

### 5.5 Anonymous vs authenticated reporting

A report should be startable without requiring a full account.

Authentication should be requested only where it materially improves:

- report tracking;
- notifications;
- secure follow-up;
- evidence access;
- protection against abuse.

The product must not reveal a citizen's identity publicly unless lawful and explicitly designed/consented.

---

## 6. Report State Model

```text
DRAFT
  ↓
SUBMITTED
  ↓
RECEIVED
  ↓
IDENTIFICATION / TRIAGE
  ↓
EVIDENCE REVIEW
  ↓
ROUTED
  ↓
ACKNOWLEDGED
  ↓
UNDER REVIEW
  ↓
RESPONSE RECEIVED
  ↓
RESOLUTION RECORDED
  ↓
CLOSED / CONTINUING MONITORING
```

The system should allow:

```text
NEEDS MORE INFORMATION
DUPLICATE / MERGED
OUTSIDE SCOPE
REFERRED TO OTHER MECHANISM
UNRESOLVED
```

A report is a **claim/observation**, not automatically a fact or finding.

---

## 7. Evidence Presentation

### 7.1 Evidence hierarchy

The public UI should distinguish:

```text
PRIMARY AUTHORITATIVE RECORD
AGENCY-ORIGIN SECONDARY MATERIAL
SECONDARY CORROBORATION
CITIZEN REPORT / OBSERVATION
SYSTEM-DERIVED LINK
UNRESOLVED CLAIM
```

### 7.2 Evidence drawer

A mobile evidence panel should use cards instead of giant tables:

```text
SOURCE
DBM

RECORD
UACS / PAP ...

DATE
2026-08-14

WHY IT IS LINKED
Matched by documented identifier

EVIDENCE STRENGTH
Confirmed

[ Open source ]
```

### 7.3 Uncertainty language

Preferred:

> Procurement record not publicly established in the sources reviewed.

Avoid:

> No procurement occurred.

Preferred:

> Payment settlement has not been established from currently recoverable evidence.

Avoid:

> The contractor was not paid.

---

## 8. Mobile-First UX Requirements

### 8.1 Hard requirements

The public web/PWA must work without:

- pinch-to-zoom for ordinary use;
- horizontal page scrolling;
- desktop-only hover interactions;
- desktop-sized modals;
- multi-column forms on narrow screens;
- tables that require zoom to read;
- fixed elements blocking inputs or buttons.

### 8.2 Target widths

Mandatory testing widths:

```text
360 px
375 px
390 px
412 px
768 px
1024 px+
```

### 8.3 Layout behavior

Mobile:

```text
single-column
full-width cards
bottom-sheet / full-screen dialogs
sticky primary action where useful
large touch targets
short sections
progressive disclosure
```

Desktop/tablet:

```text
two-column or split view where useful
side-by-side evidence/timeline
wider comparison tables
```

### 8.4 Touch and interaction

Acceptance targets:

- comfortable thumb operation;
- no critical action hidden behind tiny controls;
- visible focus states;
- keyboard-safe forms;
- sufficient spacing between controls;
- upload controls that work on camera/gallery/file pickers.

### 8.5 Tables

Never simply shrink desktop tables.

On mobile, convert rows into cards or stacked key-value summaries.

Example:

```text
PROJECT
Cabarasan–Dao FMR

AMOUNT
₱12.5M

STATUS
Reported complete

PROCUREMENT
Not established

[ View evidence ]
```

---

## 9. Accessibility

The product must follow applicable Philippine government web accessibility requirements and DICT standards, while targeting WCAG 2.2 AA as the engineering benchmark unless a stricter applicable government standard is required.

Minimum requirements:

- semantic headings;
- keyboard navigation;
- visible focus;
- accessible labels;
- sufficient text contrast;
- alt text/captions where applicable;
- screen-reader usable forms;
- error messages tied to fields;
- no color-only status coding;
- scalable text without layout breakage;
- reduced-motion support where practical.

The E-Governance Act IRR requires inclusive and accessible e-government programs and mobile-friendly government web experiences.

---

## 10. Maps and Location

Maps are contextual, not decorative.

A location view may show:

```text
PROJECTS
FACILITIES
SERVICES
REPORTS
PUBLIC ASSETS
```

The map must not reveal sensitive/private citizen location information by default.

A citizen report can capture a location through:

```text
USE MY LOCATION
DROP PIN
SEARCH PLACE
USE PROJECT LOCATION
```

Location accuracy and source must be recorded.

---

## 11. Privacy and Safety Boundaries

### Public by default

- public project identities;
- public procurement records;
- public agency information;
- public evidence links;
- public status/resolution information where lawful.

### Restricted by default

- personal addresses;
- private contact details;
- sensitive citizen evidence;
- protected witness/reporting information;
- internal investigation material;
- confidential financial or operational records;
- information protected by law.

The public interface must never encourage publication of private personal information or vigilante investigation.

---

## 12. AI in the Citizen Product

AI may assist with:

- search interpretation;
- summarization;
- duplicate-report clustering;
- document extraction;
- plain-language explanation;
- candidate-object matching;
- evidence-gap explanation.

AI may not:

- declare corruption;
- declare guilt;
- determine legal liability;
- invent missing evidence;
- silently upgrade a claim into a fact;
- expose restricted information.

All AI-derived assertions must be traceable to source evidence or clearly labeled as inference/hypothesis.

---

## 13. Performance / Resilience

Public mobile pages should be optimized for low-end Android hardware and uneven Philippine connectivity.

Engineering targets:

- lightweight initial payload;
- lazy-load maps/media;
- resumable uploads;
- graceful offline/intermittent-network behavior;
- server-side image optimization;
- retry-safe report submission;
- duplicate submission protection;
- no data loss on accidental back navigation.

A report should survive temporary network interruption where technically feasible.

---

## 14. Core Public Screens

Minimum v1 screen inventory:

```text
01 Home
02 Search
03 Search Results
04 Project / Object Detail
05 Timeline
06 Evidence
07 Map
08 Report Start
09 Report Form
10 Evidence Upload
11 Review & Submit
12 Report Confirmation
13 Report Tracking
14 Government Response
15 Resolution
16 My Reports
17 Notifications
18 Accessibility / Help
19 Privacy / Terms
20 Source / Methodology
```

---

## 15. Mobile UI Acceptance Test

A build cannot pass public-release readiness unless all critical journeys pass on target mobile widths.

### Journey A — Search

```text
Open → Search → Result → Detail → Evidence
```

### Journey B — Report

```text
Open → Report → Location → Description → Photo → Submit
```

### Journey C — Existing object report

```text
Search project → Open project → Report about this → Submit
```

### Journey D — Tracking

```text
Open report link → Status → Response → Resolution
```

### Journey E — Poor connection

```text
Start report → lose connection → reconnect → preserve draft → submit once
```

### Required failure checks

- no horizontal overflow;
- no clipped modal;
- no invisible button;
- no text overlap;
- no fixed footer covering form controls;
- no broken keyboard behavior;
- no irreversible accidental submission;
- no duplicate report caused by retry.

---

## 16. Product Boundary With Government Assurance Workspace

The citizen UI and authorized workspace use the same underlying evidence graph but expose different information.

```text
                     SAME CORE
                         │
              ┌──────────┴──────────┐
              ↓                     ↓
        PUBLIC VIEW            ASSURANCE VIEW
              │                     │
       understandable        technical detail
       evidence-backed        restricted evidence
       uncertainty            control signals
       public status          investigative workflow
```

This preserves public accountability while respecting legal authority, privacy, and investigative confidentiality.

---

## 17. Implementation Order

Do not begin with a giant dashboard.

Recommended implementation sequence:

```text
1. Design system + responsive foundations
2. Search + object detail
3. Report flow
4. Evidence/provenance presentation
5. Report tracking + response/resolution
6. eGovPH deep-link/auth integration
7. Map/location layer
8. Government assurance workspace
9. Advanced graph exploration
10. Native app only if evidence shows it is necessary
```

---

## 18. Architectural Freeze

The following are frozen for product planning:

1. eGovTrace is an independent accountability service.
2. eGovPH is a gateway/integration surface, not the eGovTrace backend.
3. Mobile-first web/PWA is the primary citizen surface.
4. Native app is optional, not a prerequisite.
5. Citizen reporting is a core capability.
6. Reports are claims/observations until established.
7. Evidence provenance is first-class.
8. Public and assurance views share core data but have different access rules.
9. eGovTrace does not replace agency source systems.
10. No UI state may imply corruption merely because an anomaly/control signal exists.

---

## 19. Research Status

**PRODUCT ARCHITECTURE:** APPROVED WORKING BASELINE  
**IMPLEMENTATION:** NOT YET AUTHORIZED BY THIS DOCUMENT ALONE  
**NEXT RESEARCH/ENGINEERING TASK:** UI component system + clickable information architecture prototype + mobile acceptance harness.
