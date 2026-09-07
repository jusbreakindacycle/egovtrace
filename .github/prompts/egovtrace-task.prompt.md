---
description: "Execute an eGovTrace engineering task using requirement-first planning, repository context loading, validation gates, and adversarial testing."
agent: "egovtrace-engineer"
---

Execute the following eGovTrace task:

${input:task:Describe the approved task or requirement}

## Required execution behavior

Before editing:

1. Read `PROJECT_CONTEXT.md`.
2. Read `REQUIREMENTS.md` and identify the exact task/acceptance target.
3. Read `ARCHITECTURE.md` and `CODING_STANDARDS.md`.
4. Read `SECURITY.md` and `DATABASE.md` when relevant.
5. Read `TESTING_STRATEGY.md`.
6. Inspect the smallest relevant set of source files and existing tests.

Then produce a concise implementation plan containing:

- requirement being satisfied
- files/modules likely affected
- invariants that must remain true
- evidence/provenance implications
- security/public-boundary implications
- whether an ADR is required
- validation and adversarial tests to add or update

Do not implement until the plan is coherent. For simple, low-risk changes, keep the plan brief; for architecture, schema, identity, evidence, temporal, or public-boundary changes, stop for explicit human approval if an ADR or requirement change is needed.

After implementation:

1. Run targeted tests.
2. Run `npm run typecheck`.
3. Run `npm test`.
4. Run `npm run lint`.
5. Run `npm run build`.
6. Run relevant adversarial tests and add regression coverage where needed.
7. Inspect the final diff for accidental changes, semantic weakening, or boundary violations.

## Final report

Return:

### Implemented
What changed and why.

### Validation
Exact commands run and whether they passed.

### Adversarial coverage
Which failure/ambiguity cases were tested.

### Documentation / ADR
What was updated or why no update was needed.

### Unresolved
Any remaining uncertainty, assumptions, or follow-up work.

Never claim a gate passed unless you actually ran it.
