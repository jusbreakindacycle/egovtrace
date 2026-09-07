---
applyTo: "**/*.{ts,mts,cts,mjs,js}"
---

# eGovTrace TypeScript Implementation Rules

Read `PROJECT_CONTEXT.md`, `ARCHITECTURE.md`, and `CODING_STANDARDS.md` before modifying shared domain or boundary code.

- Prefer explicit types and narrow interfaces over implicit shapes.
- Keep domain invariants close to the domain model or pure domain functions.
- Avoid `any` and unchecked coercion unless unavoidable and explicitly justified.
- Do not hide errors that are meaningful to validation, provenance, security, or lifecycle state.
- Keep deterministic logic deterministic; do not add randomness, time dependence, or environment dependence without an explicit requirement.
- Do not mix persistence mechanics into domain invariants unless the existing boundary requires it.
- Treat dates/times and validity intervals as explicit values; do not silently assume the current time represents an observation time.
- When creating joins, mappings, reconciliations, or derived relationships, carry enough source/provenance information to explain the derivation.
- Preserve distinctions between absent, unknown, unavailable, conflicting, and unverified states.
- Avoid speculative abstractions for future connectors or features; implement the smallest current requirement.
- Update tests for every changed behavior, especially edge cases around identity, temporal state, provenance, and uncertainty.
