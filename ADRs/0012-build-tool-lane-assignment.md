# ADR-0012: Build-Tool Lane Assignment — Claude Code for Infrastructure, Lovable for UI

**Status:** Accepted (updated 2026-05-12)
**Date:** 2026-05-12
**Deciders:** Scott Nakagawa (MI Founder / Curriculum Architect)

## Context

The Academy platform is built using two AI-assisted development tools: Claude Code (Anthropic's CLI agent) and Lovable (an AI web-app builder). Both tools are capable of generating full-stack code, but they have different strengths, constraints, and failure modes.

Early in the MOSAIC build, both tools were used interchangeably — Lovable generated migrations, Claude Code generated UI, and scope boundaries were informal. This led to:

1. **Naming conflicts.** Lovable applied `mosaic_*` prefixes from spec documents; Claude Code applied domain-driven names from ADRs. Both were "correct" within their context but diverged.
2. **Migration ownership ambiguity.** Lovable applied migrations directly to Supabase via its integration. Claude Code authored migrations for a pipeline that didn't yet exist. Neither tool knew what the other had deployed.
3. **Architecture decisions without governance.** Both tools made schema design choices autonomously. Without a single owner for infrastructure decisions, architectural drift accumulated.

Scott made the call on May 12, 2026 to formalize the lane split.

## Decision

**Assign clear ownership lanes to each build tool. Neither tool operates in the other's lane without explicit routing through Scott.**

### Claude Code owns

- Database schema design and migration authoring
- Architecture Decision Records (ADRs)
- CI/CD pipeline configuration (GitHub Actions workflows)
- Repository scaffolding and directory structure
- Supabase configuration (RLS policies, functions, indexes)
- Operational runbooks
- Type generation and distribution
- `manaolana-academy-migrations` repo (full ownership)
- `proving-ground` repo (scaffold, hooks, shared components, routing)
- `architecture-governance` repo (ADRs only; existing app code untouched)

### Lovable owns

- Lab-module UI implementation within the scaffolded `proving-ground` app
- Component rendering, form interactions, user-facing behavior
- UI state management within individual lab routes
- `milsspath` repo (LMS UI, course content pages)

### Lovable constraints

- **Consumes** hooks, types, and patterns authored by Claude Code. Does not create new ones.
- **Does not** author migrations, ADRs, or schema changes.
- **Does not** modify shared infrastructure files (`lab-registry.ts`, `useProject.ts`, `supabase.ts`).
- **Does not** create new tables or alter existing table schemas.
- Changes that require new tables or schema modifications are routed through Scott, who assigns them to Claude Code.

### Scott owns

- Approvals for all infrastructure changes (migration PRs, ADR acceptance)
- Repository creation and GitHub configuration
- Supabase project creation and account-level credentials
- Routing work between Claude Code and Lovable
- Spec document updates in milsspath

## Consequences

### Positive

- Single source of truth for every category of artifact. No more competing migrations.
- Lovable gets a clear scope: "implement the UI for Lab N using these hooks and these tables." No ambiguity about whether to create infrastructure.
- Claude Code gets a clear scope: "build the infrastructure that Lovable will consume." No ambiguity about whether to build UI.
- Scott has a single routing function: any request that crosses lanes goes through him.

### Negative

- Lovable cannot self-serve on schema changes. If a lab UI needs a new column, Lovable must wait for Scott to route the request to Claude Code, who authors the migration. This adds latency to UI development.
- Claude Code cannot iterate on UI polish. If a scaffold component needs visual tweaks, it stays as-is until Lovable picks it up.

### Risks

- If Scott is unavailable, both tools are blocked on cross-lane requests. This is an accepted bottleneck — the alternative (autonomous cross-lane work) produced the drift that necessitated this ADR.
