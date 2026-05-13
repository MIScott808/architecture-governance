# ADR-0015: Yellow Belt Proving Ground Architecture — Unified App, 4-Layer Data Model

**Status:** Accepted
**Date:** 2026-05-12
**Deciders:** Scott Nakagawa (MI Founder / Curriculum Architect)

## Context

The Yellow Belt curriculum consists of 20 hands-on labs where students apply Lean Six Sigma concepts to a practice DMAIC project. The initial implementation created each lab as a separate Lovable project, resulting in:

1. **20 independent Lovable projects** with no shared state, duplicated auth setup, and independent Supabase connections.
2. **No project continuity.** A student's VOC entries in Lab 1 were not visible in Lab 2. Each lab was an island.
3. **No dependency gating.** Students could jump to any lab without completing prerequisites. Artifacts from prior labs were not checked.
4. **No tollgate tracking.** There was no unified record of which labs a student had completed or which DMAIC phase tollgate they had passed.

The Proving Ground replaces this pattern with a single unified application where all 20 labs are internal routes sharing a common project context.

## Decision

**Build the Yellow Belt Proving Ground as a single Vite + React + TypeScript + Tailwind + shadcn-ui application with all 20 labs as internal routes.**

### Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Build | Vite 5 | Fast HMR, Lovable-compatible toolchain |
| UI | React 18 + TypeScript 5 | Matches Lovable's output format |
| Styling | Tailwind CSS 3 + shadcn-ui | Component library Lovable already uses |
| Auth | Clerk | Academy standard (ADR-0011) |
| Data | Supabase client + TanStack Query | Type-safe queries with caching |
| Routing | React Router v6 | Internal route per lab |

### 4-layer data model

**Layer 1: Project context** — `dmaic_projects` table. One row per student. Created automatically on first visit. Every lab reads from this row via the `useProject` hook. No lab ever queries `dmaic_projects` directly.

**Layer 2: Lab artifacts** — Discipline-specific tables (`voc_entries`, `requirement_items`, `ctq_definitions`, `dmaic_sipoc`, etc.). Each lab writes to its primary artifact table. Foreign key to `dmaic_projects.id` provides project scoping.

**Layer 3: Lab completions** — `yb_lab_completions` table. One row per student per completed lab. Written by the `useLabCompletion` hook when a student marks a lab complete. Contains: project_id, user_id, lab_slug, lesson_number, completed_at, primary_artifact_table, primary_artifact_ids.

**Layer 4: Tollgate status** — `yb_tollgate_status` table (or derived view). Aggregates lab completions per DMAIC phase to determine tollgate passage. Read-only from the student's perspective.

### Lab registry as single source of truth

`src/lib/lab-registry.ts` contains a const array of all 20 labs with: slug, lesson number, lab number, DMAIC phase, primary artifact table(s), prior lab dependencies, and tollgate association. This registry drives:

- **Routing:** React Router generates routes from the registry.
- **Navigation:** Sidebar/progress indicators read from the registry.
- **Dependency gating:** `DependencyGate` component checks prior lab completions.
- **Tollgate aggregation:** Groups labs by phase for tollgate status.

Lovable consumes this registry. Lovable does not maintain a separate lab list.

### Shared components

| Component | Purpose |
|-----------|---------|
| `ProjectGuard` | Ensures `dmaic_projects` row exists before any lab loads |
| `LabHeader` | Lab title, lesson number, progress indicator |
| `LabFooter` | Save & Continue, Back, Mark Complete buttons |
| `DependencyGate` | Shows "Complete Lab N first" if prior artifact missing |

### Shared hooks

| Hook | Purpose |
|------|---------|
| `useProject` | Reads/creates student's `dmaic_projects` row. Consumed by every lab. |
| `useLabCompletion` | Writes to `yb_lab_completions` on lab completion. |
| `useTollgateStatus` | Reads tollgate status for progress display. |

Lab-specific hooks (`useVocEntries`, `useRequirements`, `useCTQs`) follow the same pattern: scoped to the current project, typed against `database.types.ts`.

### Deployment

| Environment | Domain | Supabase Target |
|-------------|--------|----------------|
| Production | `provingground.manaolana-international.com` | `mana-academy` |
| Staging | `provingground-staging.manaolana-international.com` | `academy-staging` |

Deployed via Vercel with environment-specific variables for Supabase URL, anon key, and Clerk publishable key.

## Consequences

### Positive

- Students work within a single continuous project across all 20 labs. Artifacts carry forward.
- Dependency gating prevents students from skipping prerequisites.
- Tollgate tracking provides a clear view of DMAIC phase progression.
- Lovable receives a scaffolded app with hooks and patterns. Lab UI implementation is isolated to route files.
- Adding a new lab is: add an entry to the lab registry, create a route file, implement the UI.

### Negative

- All 20 labs share a single deployment. A bug in one lab's route could affect the entire app. Error boundaries on each route mitigate this.
- The single-app pattern means all labs must use the same versions of React, Tailwind, and shadcn-ui. No per-lab version pinning.
- Lovable must work within the scaffolded patterns. If a lab needs a pattern that doesn't exist (e.g., a new shared hook), the request routes through Scott to Claude Code.

### Risks

- If the lab registry becomes stale (e.g., a lab slug changes but the registry isn't updated), routing and dependency gating break. The registry is owned by Claude Code and changes require a PR.
- If Lovable modifies shared components or hooks outside its lane, the change may conflict with other labs. ADR-0012 and the CODEOWNERS file mitigate this.
