# ADR-0014: Cert-Prep Course Schema Pattern — Tier 1 / Tier 2 / Tier 3 Namespaces

**Status:** Accepted
**Date:** 2026-05-12
**Deciders:** Scott Nakagawa (MI Founder / Curriculum Architect)

## Context

The Academy's curriculum roadmap includes multiple certification preparation tracks beyond the initial Yellow Belt (Lean Six Sigma) offering:

- **IIBA** — International Institute of Business Analysis (CBAP, CCBA, ECBA)
- **PMI** — Project Management Institute (PMP, CAPM)
- **TOGAF** — The Open Group Architecture Framework
- **Prosci** — Change Management (ADKAR)

Each cert-prep course needs its own tables for course-specific data (practice questions, domain models, assessment rubrics), but all courses share common cross-cutting concerns (stakeholder management, process modeling, risk tracking, decision logging).

Without a deliberate schema pattern, each new cert-prep course would independently reinvent shared tables, leading to:

1. Duplicate `risk_register` tables across courses with slightly different schemas.
2. No ability to query cross-course analytics (e.g., "which students completed risk assessments across all courses?").
3. Namespace collisions as course-specific tables claim generic names.

## Decision

**Adopt a three-tier namespace hierarchy that separates cross-cutting, discipline-specific, and cert-prep-specific tables.**

### Tier 1: Cross-cutting (shared across all courses)

Tables that represent universal business analysis / project management concepts. Every course can read from and write to these tables.

| Prefix | Domain |
|--------|--------|
| `process_*` | Process modeling, BPMN diagrams |
| `stakeholder_*` | Stakeholder registers, influence matrices |
| `raci_*` | RACI responsibility assignments |
| `risk_*` | Risk registers, risk matrices |
| `decision_*` | Decision logs, option analyses |
| `strategy_*` | Strategy maps, gap assessments |

### Tier 2: Discipline-specific (shared within a methodology)

Tables that are specific to a methodology but not to a single course. For example, DMAIC tables are used by Yellow Belt, Green Belt, and Black Belt courses.

| Prefix | Discipline |
|--------|-----------|
| `dmaic_*` | Lean Six Sigma DMAIC workflow |
| `voc_*` | Voice of Customer |
| `pm_*` | Project Management (PMBOK-aligned) |
| `cm_*` | Change Management (ADKAR model) |
| `architecture_*` | Enterprise Architecture |
| `requirement_*` | Requirements management (BABOK-aligned) |
| `ba_*` | Business Analysis |

### Tier 3: Cert-prep-specific (unique to one certification track)

Tables that only exist for a specific certification preparation course. These hold exam-format data, certification-specific rubrics, and practice assessment content.

| Prefix | Certification |
|--------|--------------|
| `yb_*` | Yellow Belt labs and tollgates |
| `iiba_prep_*` | IIBA certification preparation |
| `pmi_prep_*` | PMI certification preparation (future) |
| `togaf_prep_*` | TOGAF certification preparation (future) |
| `prosci_prep_*` | Prosci certification preparation (future) |

### Rules for tier assignment

1. If a table could be used by 2+ unrelated courses, it belongs in Tier 1.
2. If a table is methodology-specific but serves multiple belt levels or course variants, it belongs in Tier 2.
3. If a table only serves one certification track's exam prep or lab mechanics, it belongs in Tier 3.
4. When in doubt, start at Tier 2. Promote to Tier 1 when a second discipline needs it.

### Tier interaction

- Tier 3 tables may reference Tier 2 and Tier 1 tables via foreign keys.
- Tier 2 tables may reference Tier 1 tables.
- Tier 1 tables do not reference Tier 2 or Tier 3 tables (no upward dependencies).

## Consequences

### Positive

- New cert-prep courses follow a predictable pattern: define Tier 3 tables, reuse Tier 2/1 tables.
- Cross-course analytics queries are possible via Tier 1 tables.
- Namespace collisions are prevented by the prefix convention.
- Schema reviewers can immediately assess a table's scope by its prefix.

### Negative

- Requires discipline in tier assignment. A table placed in the wrong tier may need a migration to rename it later.
- Tier 1 tables must be designed generically enough to serve all courses, which may lead to JSONB catch-all columns for course-specific metadata.

### Risks

- If the tier hierarchy is not enforced during migration review, tables may end up in the wrong tier. The PR template and CODEOWNERS file in `manaolana-academy-migrations` provide the review gate.
