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
| `cns_*` | Consulting Network System — contracts, referrals, roster, compensation |
| `ea_*` | Enterprise Architecture substrate — elements, relationships, evidence, assertions |

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


---

## Amendment — 2026-08-16

**Status:** Accepted
**Date:** 2026-08-16
**Deciders:** Scott Nakagawa (MI Founder / Curriculum Architect)

### Context

Three namespaces reached production without being recorded here. All three were
created out-of-band on `academy-staging` and promoted to `mana-academy` during
the 2026-08-16 environment-topology restoration. This amendment records them
and adds one standing rule that came out of that work.

### Decision 1 — `cns_*` and `ea_*` are approved Tier 2 namespaces

Added to the Tier 2 table above.

- **`cns_*`** — Consulting Network System. Eight tables covering contracts,
  referral sources and referrals, the practitioner roster and levels,
  assignments, goals, and the admin roster. Access is gated by
  `cns_is_admin()`, an email-matched `SECURITY DEFINER` function checking
  membership in `cns_admins`.
- **`ea_*`** — Enterprise Architecture substrate. Six tables covering the
  element and relationship type catalogs, elements, relationships, and the
  evidence and assertion ledgers. Access is org-scoped by `ea_user_org_ids()`,
  which reads the `org_id` JWT claim. `ea_evidence` and `ea_assertions` are
  append-only-forever, enforced by `BEFORE UPDATE OR DELETE` trigger guards
  rather than convention.

Both use the discipline-prefix pattern the original decision establishes. No
change to the reasoning; they are simply new disciplines.

### Decision 2 — `sprint` is a sanctioned schema-based exception

The sprint delivery system (initiatives, sprints, work items, the AI review
queue, team roster, activity and scan logs — 8 tables) lives in a dedicated
Postgres schema named `sprint`, **not** behind a `sprint_*` prefix in `public`.

This is a deliberate exception to the prefix convention, sanctioned here rather
than treated as drift.

Rationale:

1. **It is a distinct system, not a discipline within the platform.** The
   `*_` prefixes above namespace practitioner-data families that share the
   Academy's tenancy and access model. The sprint system is MI's own internal
   delivery tooling with a separate front end and its own access model. A
   schema boundary expresses that more honestly than a prefix.
2. **The prefix convention exists to prevent collision ambiguity inside a
   shared namespace.** A separate schema solves the same problem more
   strongly — `sprint.work_items` cannot collide with anything in `public`.
3. **Minimizing app breakage.** The application already addresses these tables
   as `sprint.*`. Flattening to `public.sprint_*` at promotion time would have
   required rewriting every query for no architectural gain.

Constraints on the exception, so it does not become a precedent for sprawl:

- A new schema requires an ADR amendment; it is not a default option. Prefixes
  in `public` remain the norm for anything that is a discipline within the
  platform.
- A non-`public` schema must be explicitly exposed in the Supabase API settings
  to be reachable by PostgREST. That exposure is part of the promotion
  checklist, not an afterthought.
- The schema carries the same RLS floor as everything else: no anon writes
  beyond an explicitly justified capability, and no destructive grants
  (`TRUNCATE`, `REFERENCES`, `TRIGGER`) to `anon` or `authenticated` on any
  table.

The `sprint` schema's one sanctioned anon capability is `INSERT` on
`sprint.ai_review_queue`, constrained by `WITH CHECK (review_status =
'Pending')`. This is the assertion-ledger pattern: external agents propose,
humans dispose. It mirrors the `cns_intake` anon-insert precedent — a public
write path that can only ever create unreviewed rows.

### Decision 3 — Standing rule: schema-scoped audits must enumerate all schemas

Any audit that asks "what exists in this database" or "what differs between
these databases" **must enumerate every non-system schema**, not just `public`.

This rule exists because it was broken. During the 2026-08-16 restoration, an
audit of `academy-staging` for production-use data compared only the `public`
schema and reported that nothing beyond `cns_*` and `ea_*` needed promoting.
The entire `sprint` schema — 8 tables, 38 live work items, an active
`pg_cron` job, and a Vercel app writing to it several times a day — was
invisible to that query and was missed. It surfaced later only because API
traffic logs showed writes to table names that the schema comparison had never
listed.

Concretely, audit queries must filter by excluding known system schemas rather
than by selecting `public`:

```sql
-- Wrong: silently scopes the whole audit to one schema.
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Right: enumerates everything, excluding only system schemas.
SELECT n.nspname AS schema, c.relname AS table_name
FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE c.relkind = 'r'
  AND n.nspname NOT IN (
    'pg_catalog','information_schema','auth','storage','realtime','vault',
    'extensions','graphql','graphql_public','net','supabase_migrations',
    'cron','pgbouncer','_analytics','_realtime','pgsodium','pgsodium_masks')
ORDER BY 1, 2;
```

The same applies to policies, grants, triggers, and scheduled jobs: scope by
exclusion, not by assuming `public`.

### Consequences

- The `manaolana-academy-migrations` README namespace table needs the same
  three entries. That is a follow-up PR in that repo.
- Future non-`public` schemas are permitted but require an amendment here,
  keeping the exception explicit and countable.
- Audit tooling and prompts that hardcode `table_schema = 'public'` should be
  corrected as they are encountered.
