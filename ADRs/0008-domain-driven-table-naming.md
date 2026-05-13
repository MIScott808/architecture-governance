# ADR-0008: Table Naming — Domain-Driven, No Application Prefix

**Status:** Accepted
**Date:** 2026-05-12
**Deciders:** Scott Nakagawa (MI Founder / Curriculum Architect)

## Context

The initial MOSAIC build introduced a `mosaic_*` prefix on all practitioner-data tables (e.g., `mosaic_dmaic_projects`, `mosaic_voc_entries`, `mosaic_requirements`). This prefix originated from specification documents `docs/specs/12_*` and `docs/specs/20_*` in the milsspath repo, which defined MOSAIC as a standalone application with its own namespace.

The platform architecture has since evolved. MOSAIC is no longer a standalone application — it is being absorbed into The Academy as additive practitioner tooling. The Academy Supabase project (`fmnesvogtfjbcevunmyd`) is the system of record. Multiple disciplines (Lean Six Sigma, Business Analysis, Project Management, Enterprise Architecture, Change Management) will coexist in this database, each with their own table families.

An application-level prefix (`mosaic_*`) creates several problems:

1. **Naming collision ambiguity.** As more disciplines onboard, `mosaic_requirements` is indistinguishable from a general requirements table vs. a MOSAIC-specific one. The actual discipline is Lean Six Sigma / BABOK — the table should say so.
2. **Spec drift.** Lovable reads the spec documents and re-applies `mosaic_*` prefixes when generating new migrations, even though the architecture has moved past that naming.
3. **Cross-cutting confusion.** Tables like `mosaic_sso_nonces` are infrastructure, not MOSAIC-specific. The prefix implies ownership that doesn't exist.

Seven `mosaic_*`-prefixed tables exist in production, all confirmed empty (0 rows).

## Decision

**Adopt domain-driven table naming. Deprecate the `mosaic_*` prefix on all data tables. Retain `mosaic_*` only for cross-cutting helper functions.**

### Approved discipline namespaces (Tier 2)

| Prefix | Discipline |
|--------|-----------|
| `dmaic_*` | Lean Six Sigma DMAIC workflow |
| `voc_*` | Voice of Customer |
| `pm_*` | Project Management (PMBOK-aligned) |
| `cm_*` | Change Management (ADKAR model) |
| `architecture_*` | Enterprise Architecture |
| `requirement_*` | Requirements management (BABOK-aligned) |
| `ba_*` | Business Analysis |
| `yb_*` | Yellow Belt lab-specific tables |
| `iiba_prep_*` | IIBA certification preparation |

### Cross-cutting namespaces (Tier 1)

| Prefix | Scope |
|--------|-------|
| `process_*` | Process modeling and BPMN |
| `stakeholder_*` | Stakeholder registers and matrices |
| `raci_*` | RACI assignments |
| `risk_*` | Risk registers and matrices |
| `decision_*` | Decision logs |
| `strategy_*` | Strategy and gap analysis |

### Helper function exception

Functions like `mosaic_clerk_sub()` retain the `mosaic_*` prefix. These are cross-cutting infrastructure utilities, not discipline-specific data. The prefix serves as a visual marker that the function is platform infrastructure, not a table accessor.

### Rename mapping

| Old name | New name |
|----------|----------|
| `mosaic_dmaic_projects` | `dmaic_projects` |
| `mosaic_dmaic_sipoc` | `dmaic_sipoc` |
| `mosaic_voc_entries` | `voc_entries` |
| `mosaic_requirements` | `requirement_items` |
| `mosaic_ctqs` | `ctq_definitions` |
| `mosaic_vsm_maps` | `vsm_maps` |
| `mosaic_sso_nonces` | `sso_nonces` |

Renames are executed by migration `001_rename_mosaic_foundational_tables.sql` in the `manaolana-academy-migrations` repo.

## Consequences

### Positive

- Table names communicate discipline context without requiring documentation lookup.
- New disciplines (IIBA prep, PMI prep, TOGAF prep, Prosci prep) follow the same pattern without coordination overhead.
- Lovable receives explicit namespace guidance per handoff brief, reducing spec-drift renames.

### Negative

- The specification documents (`docs/specs/12_*`, `docs/specs/20_*`) in milsspath still reference `mosaic_*` names. A separate spec-update PR is required to align them. Until that PR lands, handoff briefs must override spec naming.
- Any future Lovable-generated migrations that reference the old names will fail at the SQL level (table not found), which is a hard-stop signal rather than a silent drift.

### Risks

- If production tables are not actually empty at migration time, the rename could disrupt active queries. The PR template requires production audit status (row counts) to mitigate this.
