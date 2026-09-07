---
applyTo: "tests/**/*.{ts,mts,cts,mjs,js}"
---

# eGovTrace Testing Rules

Testing is a design obligation, not a cleanup step.

- Preserve the existing test philosophy in `TESTING_STRATEGY.md`.
- Test both the expected path and the failure/ambiguity path for material behavior.
- Prefer deterministic fixtures and assertions.
- Do not make tests depend on network access, live government systems, or unstable external services in V1.
- Never weaken, delete, skip, or broaden assertions solely to make a build pass.
- When a bug is found, add a regression test when practical.

For changes involving identity, provenance, temporal validity, reconciliation, detection, or lifecycle state, actively test relevant adversarial conditions:

- duplicate input
- reordered input
- missing evidence
- unavailable evidence
- conflicting evidence
- ambiguous identifiers
- reused identifiers across time
- invalid lifecycle transitions
- stale or overlapping validity intervals
- non-triggering conditions that must not become signals
- signals that must not become findings
- uncertainty that must not become false certainty
- unauthorized or invalid public projection

A green test suite is necessary but does not prove semantic correctness. Review whether the tests actually defend the frozen eGovTrace invariants.
