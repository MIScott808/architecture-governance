# Lovable Handoff Brief — Lab 2: Requirements & CTQ Tree

**Prepared by:** Claude Code (infrastructure lane)
**Date:** 2026-05-12
**Routed by:** Scott Nakagawa

---

## Infrastructure Status: Ready

All infrastructure for Yellow Belt lab development is in place:

| Deliverable | Status | Location |
|------------|--------|----------|
| Migration pipeline | Deployed | [manaolana-academy-migrations](https://github.com/MIScott808/manaolana-academy-migrations) |
| Database schema (dmaic_projects, voc_entries) | Migrated | Academy Supabase via pipeline |
| Clerk JWT + RLS policies | Active | `mosaic_clerk_sub()` function deployed |
| Proving Ground app scaffold | Deployed | [proving-ground](https://github.com/MIScott808/proving-ground) |
| Lab registry (20 labs) | Committed | `src/lib/lab-registry.ts` |
| Shared hooks (useProject, useVocEntries, useLabCompletion) | Implemented | `src/hooks/` |
| Shared components (ProjectGuard, LabHeader, LabFooter, DependencyGate) | Implemented | `src/components/` |
| Lab 1 (VOC Capture) | Functional | `src/routes/labs/5-1-voc-capture.tsx` |
| ADRs 0008–0015 | Accepted | [architecture-governance/ADRs/](https://github.com/MIScott808/architecture-governance/tree/main/ADRs) |

---

## Your Scope: Lab 2 (Requirements & CTQ Tree)

### Route file

Implement `src/routes/labs/5-2-requirements-ctq.tsx` in the `proving-ground` repo.

This route is already registered in `src/App.tsx` and `src/lib/lab-registry.ts`.

### What the lab does

Students take the VOC entries captured in Lab 1 and:

1. **Derive requirements** from each VOC entry's measurable requirement field. Write to the `requirement_items` table.
2. **Build a CTQ tree** connecting requirements to Critical-to-Quality definitions. Write to the `ctq_definitions` table.
3. **Link back** to VOC entries via the `graduated_requirement_id` field on `voc_entries`.

### Hooks to use

| Hook | File | Status | Notes |
|------|------|--------|-------|
| `useProject` | `src/hooks/useProject.ts` | Implemented | Provides `project.id` — scope all queries by it |
| `useVocEntries` | `src/hooks/useVocEntries.ts` | Implemented | Read VOC entries from Lab 1 (read-only in this lab) |
| `useRequirements` | `src/hooks/useRequirements.ts` | Scaffolded | **You implement the full logic** following `useVocEntries` pattern |
| `useCTQs` | `src/hooks/useCTQs.ts` | Scaffolded | **You implement the full logic** following `useVocEntries` pattern |

### Tables to write to

- `requirement_items` — one row per derived requirement
- `ctq_definitions` — one row per CTQ definition

**NOTE:** These tables exist in production (renamed from `mosaic_requirements` and `mosaic_ctqs` by migration 001) but do not yet have full column schemas applied. If you need columns beyond what exists, **do not create a migration.** Instead, document the needed columns and route the request through Scott. Claude Code will author the migration.

### Shared components to use

- `LabHeader` — pass `LAB_BY_SLUG.get('5-2-requirements-ctq')` as the lab prop
- `LabFooter` — pass artifact IDs from created requirements/CTQs
- `DependencyGate` — already wraps the lab; it will check that Lab 5-1 is complete

### Pattern to follow

Look at `src/routes/labs/5-1-voc-capture.tsx` as the reference implementation. Your lab should:

1. Import and use the lab definition from the registry
2. Wrap the inner component in `DependencyGate`
3. Render `LabHeader` at the top
4. Render `LabFooter` at the bottom with artifact IDs
5. Use hooks for all data access — never query Supabase directly in the component

### UI guidance

- Show VOC entries from Lab 1 as read-only reference cards (left panel or top section)
- Provide a form to create requirements from each VOC entry
- Provide a CTQ tree builder (can be a simple nested list for v1)
- Use Tailwind classes consistent with the existing lab styling
- Use Lucide icons from `lucide-react`

---

## What You Must NOT Do

Per ADR-0012 (build-tool lane assignment) and ADR-0013 (MCP usage boundary):

- **No new tables.** Do not create tables via Supabase MCP or any other method.
- **No schema changes.** Do not ALTER existing tables.
- **No new migrations.** Do not create `.sql` files.
- **No ADR authoring.** Architecture decisions flow through Scott.
- **No modifications to shared files:**
  - `src/lib/lab-registry.ts`
  - `src/hooks/useProject.ts`
  - `src/lib/supabase.ts`
  - `src/lib/clerk.ts`
  - `src/components/ProjectGuard.tsx`

You **may** modify your scaffolded hooks (`useRequirements.ts`, `useCTQs.ts`) — that's why they exist.

---

## Acceptance Criteria for Lab 2 PR

- [ ] `src/routes/labs/5-2-requirements-ctq.tsx` renders correctly
- [ ] `src/hooks/useRequirements.ts` is fully implemented (CRUD against `requirement_items`)
- [ ] `src/hooks/useCTQs.ts` is fully implemented (CRUD against `ctq_definitions`)
- [ ] VOC entries from Lab 1 are displayed as read-only reference
- [ ] Requirements can be derived from VOC entries
- [ ] CTQ definitions can be created and linked to requirements
- [ ] Lab completion writes to `useLabCompletion` with correct artifact IDs
- [ ] DependencyGate blocks access if Lab 5-1 is not complete
- [ ] No shared infrastructure files modified
- [ ] No new tables or schema changes
- [ ] Tailwind styling consistent with Lab 1

---

## How to Request Infrastructure Changes

If your lab implementation needs something that doesn't exist:

1. Document what you need (table, column, hook, component)
2. Note it in your PR description
3. Scott routes the request to Claude Code
4. Claude Code authors the migration/infrastructure change
5. You pick up the change once it's merged

Do not work around missing infrastructure by creating your own. The pipeline exists to prevent drift.

---

**Scott:** Route this brief to Lovable when you're ready for Lab 2 work to begin.
