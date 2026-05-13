# ADR-0009: Academy Types Distribution — Phase 1 Committed File, Phase 2 npm Package

**Status:** Accepted
**Date:** 2026-05-12
**Deciders:** Scott Nakagawa (MI Founder / Curriculum Architect)

## Context

The Academy Supabase database serves multiple consumers: the `proving-ground` app (Yellow Belt labs), the `milsspath` LMS (Lovable-managed), and future practitioner tools. Each consumer needs TypeScript types that accurately reflect the current database schema.

Supabase CLI generates a `database.types.ts` file from a live project via `supabase gen types typescript`. The question is how to distribute this file to consumers so they stay in sync with the schema as it evolves.

Three options were considered:

1. **Each consumer generates its own types locally.** Requires every developer to have Supabase CLI access and a linked project. Fragile — different consumers may generate at different times and drift.
2. **Committed file in a central repo.** One source of truth. Consumers import via raw GitHub URL, git submodule, or copy. Simple but requires a regeneration step after each migration.
3. **npm package.** Publish types as `@manaolana/academy-types` to npm (or GitHub Packages). Consumers `npm install` and import. Most ergonomic at scale but requires package infrastructure.

## Decision

**Phase 1 (now): Committed file in `manaolana-academy-migrations/types/database.types.ts`.** The CI/CD pipeline regenerates this file after every successful production migration and commits it back to `main`. Consumers reference this file directly.

**Phase 2 (when 3+ consumers exist): Publish as an npm package.** When the number of consuming repos crosses three, migrate to `@manaolana/academy-types` published to GitHub Packages. The committed file remains as a build artifact but consumers switch their imports to the package.

### Phase 1 consumption patterns

- **proving-ground:** Copies `database.types.ts` into `src/types/` as part of its build step, or imports via raw GitHub URL. The proving-ground repo README documents the sync procedure.
- **milsspath (Lovable):** Receives types via handoff brief with instructions to copy into their project. Lovable does not have direct repo access to `manaolana-academy-migrations`.

### Regeneration trigger

The `migrate.yml` GitHub Actions workflow includes a `regenerate-types` job that runs after production migration succeeds. It calls `supabase gen types typescript` against the production project and commits the result.

## Consequences

### Positive

- Single source of truth for database types. No consumer drift.
- Zero infrastructure overhead in Phase 1 — just a committed file.
- CI/CD ensures types are always in sync with production schema.
- Clear upgrade path to npm package when scale warrants it.

### Negative

- Phase 1 requires manual or scripted sync by consumers. If `proving-ground` doesn't pull latest types before build, it may reference stale types.
- The committed file is generated from production, not staging. Types for staging-only tables (not yet promoted) are not included.

### Risks

- If the `regenerate-types` CI job fails (e.g., expired access token), types go stale. The failure-recovery runbook documents the manual regeneration procedure.
