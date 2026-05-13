# ADR-0013: Lovable MCP Usage Boundary

**Status:** Accepted
**Date:** 2026-05-12
**Deciders:** Scott Nakagawa (MI Founder / Curriculum Architect)

## Context

Lovable integrates with Supabase via MCP (Model Context Protocol), which provides it with tools to read schema, execute queries, and apply migrations directly to a connected Supabase project. This integration was used during early MOSAIC development to both inspect the database and deploy schema changes.

With the lane assignment formalized in ADR-0012, Lovable's Supabase MCP access needs a clear boundary. The migration pipeline (ADR-0010) is now the sole path for schema changes. Lovable's MCP connection should not be a backdoor for DDL operations.

However, cutting off MCP access entirely would cripple Lovable's ability to understand the schema it's building UI against. Lovable needs to read table structures, check column types, and verify that its queries will work — all of which require schema inspection.

## Decision

**Lovable's MCP usage is restricted to read-and-inspect operations. Deploy-and-mutate operations are prohibited.**

### Permitted (read-and-inspect)

- `SELECT` queries against any table (for understanding schema and testing queries)
- `\d table_name` and equivalent schema inspection commands
- Reading `information_schema` views
- Reading RLS policy definitions
- Reading function signatures
- Generating or validating queries that will be used in application code

### Prohibited (deploy-and-mutate)

- `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE`
- `CREATE FUNCTION`, `ALTER FUNCTION`, `DROP FUNCTION`
- `CREATE POLICY`, `ALTER POLICY`, `DROP POLICY`
- `CREATE INDEX`, `DROP INDEX`
- Any DDL (Data Definition Language) operation
- `INSERT`, `UPDATE`, `DELETE` against production data outside of application-level operations
- Direct application of migration files via MCP

### Enforcement

This boundary is enforced by policy, not by technical restriction. Lovable's MCP connection has the same Supabase credentials as before. The constraint is communicated via:

1. The Lovable handoff brief (included with every lab assignment).
2. This ADR (linked from the handoff brief).
3. The PR review process — any migration PR not authored through the `manaolana-academy-migrations` pipeline is rejected.

### Future technical enforcement

If policy enforcement proves insufficient, the staging Supabase project can be configured with a read-only database role for Lovable's MCP connection. This is not implemented now because:

- It adds configuration complexity.
- The current team size (Scott + two AI tools) makes policy enforcement practical.
- Lovable's MCP integration may not support custom role connections cleanly.

## Consequences

### Positive

- Lovable retains full schema visibility for UI development.
- The migration pipeline remains the single path for all schema changes.
- No configuration changes needed on the Supabase side.
- Clear rule: "Lovable reads, Claude Code writes."

### Negative

- Policy enforcement depends on Scott reviewing PRs and handoff briefs. A Lovable-generated migration that bypasses the pipeline would only be caught at PR review time.
- Lovable may occasionally need to test a query that requires a temp table or function. These cases must be routed through Scott.

### Risks

- If Lovable applies DDL via MCP to staging and doesn't report it, staging schema drifts from the migration pipeline's state. The verify scripts in each migration provide a partial safety net — they will fail if unexpected objects exist.
