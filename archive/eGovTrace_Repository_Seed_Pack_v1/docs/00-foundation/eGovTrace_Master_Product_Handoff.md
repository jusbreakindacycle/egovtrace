# eGovTrace — Master Product Handoff

**Product name:** eGovTrace  
**Product category:** Government Control, Intelligence & Accountability System  
**Status:** Approved product direction / pre-development  
**Primary implementation target:** Web + mobile clients backed by one government control/intelligence system  
**Primary development workflow:** VS Code + Claude Code

---

## 1. Product Mission

> **Make every important government action traceable and accountable; continuously observe government activity, detect and explain control failures and anomalous patterns, route them for human verification, track resolution, and turn verified failures into institutional improvement.**

eGovTrace is a government-side system. It is not a citizen super-app, an operating system, or a generic government portal.

Its primary purpose is to make government activity continuously observable, traceable, verifiable, and accountable.

---

## 2. Product Boundary

### eGovTrace IS

- A government control and accountability system.
- A continuous government-event monitoring and reconciliation system.
- A graph-based government intelligence system.
- A workflow and exception-management system.
- An evidence/provenance system.
- An anomaly and control-failure detection system.
- A human-verification and accountability system.
- A public-transparency surface for legally releasable information.
- A government web console plus authorized government mobile application.

### eGovTrace IS NOT

- eGovPH replacement.
- A replacement for every agency system of record.
- A generic citizen-services super-app.
- An “Operating System.”
- A technical “Layer.”
- An AI that declares people corrupt.
- A citizen-report-driven corruption detector.
- A single unrestricted database where every institution sees everything.
- A black-box corruption score.

---

## 3. Relationship to eGovPH

The approved boundary is:

**eGovPH → citizen-facing government services**

**eGovTrace → government-side control, intelligence, monitoring, verification, and accountability**

**Public eGovTrace surface → legally releasable government information and accountability visibility**

eGovTrace should not recreate every citizen service already represented by eGovPH.

The citizen experience should be deliberately smaller than the government experience.

---

## 4. Primary Users

### Government-side first

- Government employees
- Agency management
- Authorized oversight personnel
- Auditors
- Investigators
- Authorized executive/administrative leadership

### Public side

- Citizens and the public

Each role receives only the data, actions, evidence, and workflows authorized for that role.

---

## 5. Core Product Principle

eGovTrace does not begin with:

> “Who is corrupt?”

It begins with:

> **“What should have happened, what actually happened, and where do they diverge?”**

A system signal is not automatically an allegation or finding.

The system must distinguish:

1. Normal
2. Missing information
3. Control exception
4. Data inconsistency
5. Statistical anomaly
6. Relationship anomaly
7. Multi-signal anomaly
8. Human verification
9. Verified finding
10. Accountability/action
11. Institutional learning

AI may identify, correlate, explain, prioritize, and recommend verification.

AI must not independently accuse a person or organization of corruption.

---

## 6. Atomic Unit: Government Event

The master system generalizes the Public Money Event concept into a broader:

# Government Event

Examples:

- Budget Event
- Procurement Event
- Contract Event
- Award Event
- Payment Event
- Project Event
- Inspection Event
- Verification Event
- Audit Event
- Case Event
- Authority Event
- Regulatory Event
- Service Event
- Evidence Event
- Accountability Event
- Outcome Event

Each event should preserve, where available:

- timestamp
- agency/institution
- office
- responsible role
- authority
- legal basis
- object/entity
- financial value
- project/program
- geographic location
- related events
- evidence
- source system
- provenance
- status
- confidence
- access classification

---

## 7. Expected-vs-Observed Control Model

This is the central mechanism of eGovTrace.

### Expected Control Path

The system represents what should happen under the applicable:

- law
- policy
- regulation
- government process
- authority
- workflow
- control requirement

### Observed Government Events

The system records what actually happened.

### Reconciliation

The system compares:

**Expected state/path**

against

**Observed state/path**

The difference may produce:

- missing control
- unexpected sequence
- conflicting record
- timing anomaly
- authority mismatch
- documentation gap
- independence problem
- unusual pattern
- payment/outcome gap
- repeated institutional failure

---

## 8. Core Government Lifecycle for V1

V1 focuses on:

**Need → Authorization → Budget → Procurement → Contract → Payment → Project/Implementation → Verification → Audit → Accountability → Outcome**

The system should preserve the relationships among those stages.

The first major domain demonstration should be public projects/procurement/public money, with flood-control treated as a demonstration case rather than the permanent product boundary.

The system must be designed to expand into other government domains without redesigning its fundamental model.

---

## 9. Graph Engineering Model

eGovTrace uses one coherent Government Accountability Graph with specialized relationship domains.

Core entities may include:

- institutions
- branches
- agencies
- offices
- officials/persons
- legal instruments
- authorities
- budgets
- appropriations
- programs
- projects
- procurement events
- bidders
- contractors
- contracts
- payments
- assets
- locations
- beneficiaries
- evidence
- audits
- findings
- cases
- accountability actions
- outcomes

Important relationship domains include:

- money
- authority/power
- ownership
- procurement
- project/asset
- accountability
- law
- evidence
- geography
- time

The graph answers:

> **What is connected to what?**

The loop engine answers:

> **What should we inspect next?**

---

## 10. Loop Engineering Model

The approved continuous loop is:

**OBSERVE → NORMALIZE → CONNECT → COMPARE → DETECT → EXPLAIN → VERIFY → ACT → REASSESS → LEARN → LOOP**

Specialized analytical loops include:

1. Government Universe
2. Legal
3. Money
4. Procurement
5. Ownership
6. Relationship
7. Geographic
8. Reality
9. Audit
10. Accountability
11. Statistical
12. Feedback

The loops are not separate products. They are recurring analytical behaviors over the same government-event and graph model.

---

## 11. Automatic Detection

Citizen reports are only one observation source.

eGovTrace must detect signals automatically from available authoritative or approved sources.

Initial signal families include:

### Procurement

- bidder recurrence
- bid rotation
- bidder concentration
- repeated bidder combinations
- unusual procurement patterns
- unusual timing
- pricing patterns
- contractor recurrence

### Budget/Money

- unusual allocation concentration
- late changes
- unusual reallocations
- duplicate or overlapping projects
- payment anomalies
- payment-to-outcome gaps

### Control

- control concentration
- independence gaps
- missing verification
- missing required documentation
- authority mismatch
- unexpected workflow sequence

### Project/Reality

- financial progress vs physical evidence mismatch
- repeated extensions
- variation-order recurrence
- duplicate project descriptions
- geographic inconsistencies

### Institutional

- recurring audit findings
- recurring unresolved exceptions
- repeated control failures
- abnormal exception rates
- cross-agency recurrence

### Corporate/Relationship

- entity relationship patterns
- ownership-network density
- repeated counterparties
- cross-agency entity recurrence

These are signals, not automatic accusations.

---

## 12. Detection Pipeline

Every automated signal should conceptually follow:

**Source → Ingestion → Normalization → Entity Resolution → Event Creation → Graph Linking → Expected-vs-Observed Check → Detection Rule/Model → Explanation → Evidence Bundle → Risk/priority → Human Verification → Finding/Closure**

No model should produce an unexplained “corruption score.”

---

## 13. Evidence and Provenance

Every important claim must be traceable to evidence.

Evidence should retain:

- source
- source record/document identifier
- retrieval time
- relevant event/entity
- provenance
- version where applicable
- access classification
- transformation history
- confidence/quality metadata

The system must be able to answer:

> Why was this flagged?

> Which records support the signal?

> What is missing?

> What would disprove the signal?

> Who verified it?

> What changed afterward?

---

## 14. Human Verification

Automatic detection creates a signal.

Authorized humans determine whether the signal becomes:

- dismissed
- explained
- unresolved
- verified control failure
- audit finding
- investigative lead
- administrative action
- other authorized outcome

The system must preserve the distinction between:

**signal → hypothesis → allegation → verified finding → official/judicial outcome**

---

## 15. Accountability Lifecycle

A case should not end when an anomaly is detected.

Core lifecycle:

**Detected → Triaged → Assigned → Evidence Requested → Under Verification → Finding/Resolution → Action → Outcome → Closed/Monitored**

The system should detect accountability closure failure, including:

- unresolved cases
- overdue actions
- missing responses
- repeated recurrence after closure
- corrective action without measurable improvement

---

## 16. Public/Citizen Experience

Citizens should not be forced through a maze of redirects simply to understand public information.

The public surface should provide a coherent experience for:

- public projects
- public spending information
- procurement information that is legally public
- published findings
- accountability status where legally releasable
- evidence/explanations appropriate for public access
- citizen observations/reports
- government knowledge/context

Citizen reports enter the same evidence/observation ecosystem but do not automatically become public accusations or findings.

---

## 17. Access and Institutional Boundaries

One national control model does NOT mean unrestricted access.

eGovTrace must enforce:

- role-based access
- institution-based access
- data classification
- need-to-know
- purpose limitation
- audit logging
- sensitive/restricted information controls
- separation of investigative/public views
- appropriate cross-agency permissions

The system must represent the national government universe without assuming every institution has operational authority over every other institution.

---

## 18. Government Universe

The national government universe should be modeled broadly from the beginning.

It may represent, subject to the source material and lawful integration:

- Executive
- Legislative
- Judiciary
- Constitutional bodies
- national departments/agencies
- law enforcement
- security/defense institutions
- GOCCs
- GFIs
- LGUs
- BARMM
- SUCs
- PPP/public-private structures
- special funds and other public-resource structures

Important distinction:

**Universe representation can be broad from day one.**

**Operational integration should be progressive.**

---

## 19. Integration Philosophy

eGovTrace should not require every agency to discard its existing systems.

The master product should connect approved systems of record through lawful integrations.

eGovTrace becomes the place where government activity is:

- observed
- reconciled
- connected
- monitored
- investigated
- verified
- tracked

rather than replacing every specialized system.

---

## 20. Product Surfaces

### Government Web Console

Primary heavy-work interface:

- command/overview
- agency operations
- event explorer
- project lifecycle
- procurement
- money trail
- graph exploration
- anomaly queue
- cases
- evidence
- verification
- accountability
- institutional risk
- audit
- public transparency management

### Government Mobile App

For authorized field/operational use:

- alerts
- assigned cases
- inspection
- verification
- evidence capture
- project/site updates
- action/approval workflows where authorized
- offline-first field capture where required

### Public/Citizen Interface

Focused public experience:

- discover
- understand
- inspect
- report
- follow
- verify published information

---

## 21. V1 Non-Goals

Do not build V1 as:

- a full replacement for eGovPH
- a replacement for agency ERP/accounting systems
- a replacement for police/court/defense systems
- a universal citizen-service platform
- a universal identity replacement
- an AI prosecutor
- a corruption accusation engine
- a giant dashboard with agency buttons
- a system requiring every agency to migrate everything immediately

---

## 22. V1 Success Condition

The prototype should demonstrate that eGovTrace can take one government activity lifecycle and answer:

1. What was supposed to happen?
2. What actually happened?
3. Who had authority?
4. Where did public money move?
5. What procurement occurred?
6. Who were the relevant entities?
7. What project/outcome was expected?
8. What evidence exists?
9. What is inconsistent or missing?
10. Why was it flagged?
11. Who must verify it?
12. What happened after verification?
13. Was accountability completed?
14. Did the institutional problem recur?

If the prototype can answer those questions transparently, the core concept works.

---

## 23. Product North Star

> **A government where important actions can be traced from authority to outcome, control failures are detected before they become entrenched, evidence is preserved, accountability is trackable, and recurring failures become visible enough to fix.**

---

## 24. Engineering Philosophy

Build the smallest vertical slice that proves the model.

Do NOT begin by building every agency, every integration, every graph, every AI model, or every citizen feature.

Build one complete lifecycle end-to-end.

Recommended demonstration:

**Public Project → Budget → Procurement → Contractor → Contract → Payment → Implementation → Verification → Evidence → Anomaly → Human Review → Accountability → Public View**

Then generalize the engine.

