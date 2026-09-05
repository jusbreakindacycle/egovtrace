# Research → Engineering Bridge

This directory explains how research artifacts are promoted into implementation decisions.

## Classification

1. **Research evidence** — empirical results, inventories, experiments, source observations.
2. **Research specification** — a testable question, hypothesis, population, method, expected evidence, and disposition rule.
3. **Architecture decision** — an approved implementation consequence recorded as an ADR.
4. **Implementation requirement** — a concrete behavior accepted into the engineering backlog.
5. **Non-adopted / archived** — preserved for provenance but not active engineering truth.

## Rule

Do not convert a research observation directly into code. The path is:

`Research Evidence → Research Specification → Decision → Requirement → Implementation → Test`

## Current authoritative engineering artifacts

- `docs/requirements/eGovTrace_Master_Build_Prompt_v2.md`
- `docs/requirements/eGovTrace_Completeness_Gap_Audit_2026-09-06.md`
- `docs/architecture.md`
- `docs/domain-model.md`
- `docs/graph-model.md`
- `docs/detection-model.md`
- `docs/security-model.md`
- `docs/data-provenance.md`

The historical repository seed pack is preserved under `archive/eGovTrace_Repository_Seed_Pack_v1/`.
