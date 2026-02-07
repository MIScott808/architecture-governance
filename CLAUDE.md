# Architecture Governance Application (AGA)
# Mana Platform Tool Suite — Module 6

You are building the Architecture Governance Application, a cross-cutting governance layer for the Mana Platform. This is a Next.js 14 application that integrates with five existing modules through a shared Supabase database.

## PROJECT CONTEXT

The Mana Platform is a business transformation suite supporting the BEE (Business Execution Essentials) curriculum. The AGA is the sixth module. It does NOT replace the other modules — it provides architectural visibility, tagging, conflict detection, and governance across all of them.

### Existing Platform Modules (integrate WITH, do not rebuild):
1. **Strategic Compass** — Gap analysis using APQC PCF framework. Outputs gaps with pcfId, currentState (red/yellow/green), targetState, gapMagnitude.
2. **Initiative Planner** — Business case builder. Creates initiatives from gaps with stakeholders, milestones, requirements, OKRs, T-shirt sizing (XS/S/M/L/XL/XXL).
3. **Voice of Customer** — Converts raw feedback into requirements through root cause analysis (5 Whys).
4. **Requirements Manager** — Tracks requirements lifecycle and traceability across BABOK types (business, stakeholder, solution, transition).
5. **Project Management** — Execution with stakeholder matrices, risk matrices, decision logs, issue logs.

### Shared Infrastructure:
- **Auth:** Clerk (shared credentials across all modules)
- **Database:** Supabase PostgreSQL with Row Level Security
- **Hosting:** Vercel (separate project per module)
- **Existing tables you must reference but NOT recreate:** `organizations`, `org_members`, `initiatives`, `gap_assessments`

## TECH STACK — MUST MATCH EXISTING MODULES

```bash
npm install @clerk/nextjs @supabase/supabase-js lucide-react recharts jspdf
```

- Next.js 14.x with App Router (NOT Pages Router)
- TypeScript strict mode
- Tailwind CSS 3.x
- Clerk for auth
- Supabase client via `@supabase/supabase-js`
- Lucide React for icons
- Recharts for dashboard charts
- jsPDF for PDF report export

## BRAND COLORS — USE EXACTLY

```typescript
// tailwind.config.ts extend colors
const manaColors = {
  navy: '#0A1628',
  'navy-90': '#0D1E38',
  'blue-deep': '#1A365D',
  blue: '#1E5BA8',
  'blue-bright': '#2B7BD4',
  'blue-light': '#4A9FE8',
  'blue-sky': '#6BB8F2',
  'blue-pale': '#A8D4F7',
  'blue-wash': '#E8F4FD',
  coral: '#F05545',
  red: '#C41E3A',
  'red-bright': '#E63950',
  gold: '#D69E2E',
  'gold-light': '#ECC94B',
  'gold-wash': '#FFFCEB',
  teal: '#0D9488',
  'teal-light': '#14B8A6',
  'teal-wash': '#E6FFFA',
};
```

Sidebar: navy-to-blue-deep gradient. Active nav item: blue-to-blue-bright gradient with blue shadow. Primary buttons: blue-to-blue-bright gradient. Destructive/alert: coral. Success: teal. Warning: gold.

## DATABASE SCHEMA

Create migration file: `supabase/migrations/001_aga_schema.sql`

### Tables you reference but do NOT create (they already exist):
- `organizations` (id, name, clerk_org_id, settings, created_at, updated_at)
- `org_members` (id, org_id, user_id, role, created_at)
- `initiatives` (id, org_id, created_by, name, problem_statement, proposed_solution, effort_size, priority, status, stakeholders JSONB, milestones JSONB, requirements JSONB, okrs JSONB, source_gap_ids TEXT[], created_at, updated_at)

### New AGA Tables:

```sql
-- 1. ADM Cycles (TOGAF Architecture Development Method tracking)
CREATE TABLE adm_cycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) NOT NULL,
  cycle_name TEXT NOT NULL,
  cycle_number INTEGER NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  current_phase TEXT DEFAULT 'preliminary'
    CHECK (current_phase IN ('preliminary','architecture_vision','business_architecture',
      'information_systems','technology_architecture','opportunities_solutions',
      'migration_planning','implementation_governance','change_management')),
  phase_history JSONB DEFAULT '[]',
  baseline_architecture_snapshot JSONB,
  target_architecture_snapshot JSONB,
  gap_analysis_results JSONB,
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress','completed','abandoned')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Architecture Artifacts (central registry linking all module entities)
CREATE TABLE architecture_artifacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) NOT NULL,
  source_module TEXT NOT NULL CHECK (source_module IN (
    'strategic_compass','initiative_planner','voice_of_customer',
    'requirements_manager','project_mgmt')),
  source_entity_type TEXT NOT NULL,
  source_entity_id UUID NOT NULL,
  artifact_name TEXT NOT NULL,
  artifact_description TEXT,
  pcf_category_id TEXT,
  pcf_category_name TEXT,
  lifecycle_status TEXT DEFAULT 'active' CHECK (lifecycle_status IN (
    'active','archived','superseded','parking_lot')),
  auto_tag_confidence DECIMAL(3,2),
  human_validated BOOLEAN DEFAULT FALSE,
  validated_by TEXT,
  validated_at TIMESTAMPTZ,
  adm_phase TEXT,
  adm_cycle_id UUID REFERENCES adm_cycles(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, source_module, source_entity_type, source_entity_id)
);

-- 3. Architecture Domain Tags (Business/Information/Technology classification)
CREATE TABLE architecture_domain_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artifact_id UUID REFERENCES architecture_artifacts(id) ON DELETE CASCADE,
  domain TEXT NOT NULL CHECK (domain IN ('business','information','technology')),
  sub_domain TEXT,
  archimate_element_type TEXT,
  tag_source TEXT DEFAULT 'auto' CHECK (tag_source IN ('auto','human','ai_suggested','inherited')),
  confidence DECIMAL(3,2),
  tagged_by TEXT,
  reasoning TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(artifact_id, domain, sub_domain)
);

-- 4. Capability Map (APQC PCF aligned)
CREATE TABLE capability_map (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) NOT NULL,
  pcf_id TEXT NOT NULL,
  pcf_name TEXT NOT NULL,
  capability_name TEXT NOT NULL,
  capability_level INTEGER,
  parent_id UUID REFERENCES capability_map(id),
  maturity_current TEXT CHECK (maturity_current IN ('red','yellow','green')),
  maturity_target TEXT CHECK (maturity_target IN ('red','yellow','green')),
  maturity_score INTEGER CHECK (maturity_score BETWEEN 0 AND 5),
  business_criticality TEXT CHECK (business_criticality IN ('low','medium','high','critical')),
  owner_user_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(org_id, pcf_id)
);

-- 5. Architecture Principles
CREATE TABLE architecture_principles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) NOT NULL,
  principle_name TEXT NOT NULL,
  rationale TEXT,
  implications TEXT,
  domain TEXT NOT NULL CHECK (domain IN ('business','information','technology','cross_cutting')),
  priority INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active','deprecated','draft')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Principle Compliance
CREATE TABLE principle_compliance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artifact_id UUID REFERENCES architecture_artifacts(id) ON DELETE CASCADE,
  principle_id UUID REFERENCES architecture_principles(id),
  compliance_status TEXT NOT NULL CHECK (compliance_status IN (
    'compliant','non_compliant','exception_granted','not_applicable')),
  exception_reason TEXT,
  exception_expiry DATE,
  assessed_by TEXT,
  assessed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(artifact_id, principle_id)
);

-- 7. Parking Lot
CREATE TABLE parking_lot (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) NOT NULL,
  artifact_id UUID REFERENCES architecture_artifacts(id),
  item_type TEXT NOT NULL CHECK (item_type IN ('requirement','initiative','program','capability_gap')),
  item_name TEXT NOT NULL,
  item_description TEXT,
  source_module TEXT,
  source_entity_id UUID,
  reason_parked TEXT NOT NULL CHECK (reason_parked IN (
    'budget_constraint','resource_unavailable','dependency_blocked',
    'architecture_conflict','strategic_reprioritization','deferred')),
  parked_by TEXT NOT NULL,
  parked_at TIMESTAMPTZ DEFAULT NOW(),
  review_date DATE,
  priority_when_parked TEXT,
  estimated_effort TEXT,
  affected_capabilities TEXT[],
  affected_domains TEXT[],
  dependency_ids UUID[],
  conflict_ids UUID[],
  reactivation_criteria TEXT,
  status TEXT DEFAULT 'parked' CHECK (status IN ('parked','under_review','reactivated','cancelled')),
  metadata JSONB DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Architecture Conflicts
CREATE TABLE architecture_conflicts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) NOT NULL,
  conflict_type TEXT NOT NULL CHECK (conflict_type IN (
    'capability_overlap','principle_violation','resource_contention',
    'data_ownership','integration_conflict','timeline_conflict',
    'technology_divergence','scope_overlap')),
  severity TEXT NOT NULL CHECK (severity IN ('critical','high','medium','low')),
  artifact_a_id UUID REFERENCES architecture_artifacts(id),
  artifact_b_id UUID REFERENCES architecture_artifacts(id),
  description TEXT NOT NULL,
  affected_capabilities TEXT[],
  affected_domains TEXT[],
  detection_method TEXT CHECK (detection_method IN ('auto_rule','ai_analysis','human_report')),
  resolution_status TEXT DEFAULT 'open' CHECK (resolution_status IN (
    'open','under_review','resolved','accepted_risk','deferred')),
  resolution_notes TEXT,
  resolved_by TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Architecture States (point-in-time snapshots per ADM phase)
CREATE TABLE architecture_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id) NOT NULL,
  adm_cycle_id UUID REFERENCES adm_cycles(id),
  state_type TEXT NOT NULL CHECK (state_type IN ('baseline','target','transitional')),
  domain TEXT NOT NULL CHECK (domain IN ('business','information','technology')),
  captured_at TIMESTAMPTZ DEFAULT NOW(),
  capability_scores JSONB NOT NULL,
  architecture_elements JSONB NOT NULL,
  gap_summary JSONB,
  created_by TEXT
);

-- 10. Requirement-Gap Links (bidirectional feedback loop)
CREATE TABLE requirement_gap_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requirement_artifact_id UUID REFERENCES architecture_artifacts(id),
  gap_artifact_id UUID REFERENCES architecture_artifacts(id),
  link_type TEXT NOT NULL CHECK (link_type IN ('addresses','partially_addresses','blocks','supersedes')),
  capability_impact JSONB,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(requirement_artifact_id, gap_artifact_id)
);
```

### RLS and Indexes

```sql
-- RLS on ALL tables
ALTER TABLE adm_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE architecture_artifacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE architecture_domain_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE capability_map ENABLE ROW LEVEL SECURITY;
ALTER TABLE architecture_principles ENABLE ROW LEVEL SECURITY;
ALTER TABLE principle_compliance ENABLE ROW LEVEL SECURITY;
ALTER TABLE parking_lot ENABLE ROW LEVEL SECURITY;
ALTER TABLE architecture_conflicts ENABLE ROW LEVEL SECURITY;
ALTER TABLE architecture_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE requirement_gap_links ENABLE ROW LEVEL SECURITY;

-- Org isolation policies for direct org_id tables
DO $
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'adm_cycles','architecture_artifacts','capability_map',
    'architecture_principles','parking_lot','architecture_conflicts',
    'architecture_states'
  ]) LOOP
    EXECUTE format(
      'CREATE POLICY org_isolation ON %I FOR ALL USING (
        org_id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid())
      )', tbl
    );
  END LOOP;
END $;

-- Child table isolation via artifact join
DO $
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'architecture_domain_tags','principle_compliance','requirement_gap_links'
  ]) LOOP
    EXECUTE format(
      'CREATE POLICY org_isolation ON %I FOR ALL USING (
        artifact_id IN (
          SELECT id FROM architecture_artifacts WHERE org_id IN (
            SELECT org_id FROM org_members WHERE user_id = auth.uid()
          )
        ) OR requirement_artifact_id IN (
          SELECT id FROM architecture_artifacts WHERE org_id IN (
            SELECT org_id FROM org_members WHERE user_id = auth.uid()
          )
        )
      )', tbl
    );
  END LOOP;
END $;

-- Performance indexes
CREATE INDEX idx_artifacts_org_status ON architecture_artifacts(org_id, lifecycle_status);
CREATE INDEX idx_artifacts_pcf ON architecture_artifacts(org_id, pcf_category_id);
CREATE INDEX idx_artifacts_source ON architecture_artifacts(source_module, source_entity_id);
CREATE INDEX idx_tags_domain ON architecture_domain_tags(artifact_id, domain);
CREATE INDEX idx_conflicts_org_status ON architecture_conflicts(org_id, resolution_status);
CREATE INDEX idx_parking_org_status ON parking_lot(org_id, status);
CREATE INDEX idx_capability_org ON capability_map(org_id, pcf_id);
CREATE INDEX idx_adm_org ON adm_cycles(org_id, status);
```

## CONFLICT DETECTION FUNCTIONS

Create `supabase/migrations/002_conflict_functions.sql`:

```sql
-- Capability overlap: multiple active initiatives targeting same PCF capability
CREATE OR REPLACE FUNCTION detect_capability_overlaps(p_org_id UUID)
RETURNS TABLE(pcf_id TEXT, capability_name TEXT, initiative_count BIGINT,
  initiative_names TEXT[], artifact_ids UUID[])
LANGUAGE plpgsql SECURITY DEFINER AS $
BEGIN
  RETURN QUERY
  SELECT cm.pcf_id, cm.capability_name,
    COUNT(DISTINCT aa.source_entity_id),
    array_agg(DISTINCT aa.artifact_name),
    array_agg(DISTINCT aa.id)
  FROM architecture_artifacts aa
  JOIN capability_map cm ON aa.pcf_category_id = cm.pcf_id AND aa.org_id = cm.org_id
  WHERE aa.org_id = p_org_id AND aa.lifecycle_status = 'active'
    AND aa.source_entity_type = 'initiative'
  GROUP BY cm.pcf_id, cm.capability_name
  HAVING COUNT(DISTINCT aa.source_entity_id) > 1
  ORDER BY COUNT(DISTINCT aa.source_entity_id) DESC;
END; $;

-- Cross-domain artifacts: items spanning 2+ architecture domains
CREATE OR REPLACE FUNCTION detect_cross_domain_artifacts(p_org_id UUID)
RETURNS TABLE(artifact_id UUID, artifact_name TEXT, source_module TEXT,
  domains TEXT[], domain_count BIGINT)
LANGUAGE plpgsql SECURITY DEFINER AS $
BEGIN
  RETURN QUERY
  SELECT aa.id, aa.artifact_name, aa.source_module,
    array_agg(DISTINCT adt.domain),
    COUNT(DISTINCT adt.domain)
  FROM architecture_artifacts aa
  JOIN architecture_domain_tags adt ON aa.id = adt.artifact_id
  WHERE aa.org_id = p_org_id AND aa.lifecycle_status = 'active'
  GROUP BY aa.id, aa.artifact_name, aa.source_module
  HAVING COUNT(DISTINCT adt.domain) >= 2
  ORDER BY COUNT(DISTINCT adt.domain) DESC;
END; $;

-- Parking lot vs active portfolio conflicts
CREATE OR REPLACE FUNCTION scan_parking_lot_conflicts(p_org_id UUID)
RETURNS TABLE(parked_item_id UUID, parked_item_name TEXT,
  active_artifact_id UUID, active_artifact_name TEXT, overlapping_capabilities TEXT[])
LANGUAGE plpgsql SECURITY DEFINER AS $
BEGIN
  RETURN QUERY
  SELECT pl.id, pl.item_name, aa.id, aa.artifact_name,
    (SELECT array_agg(cap) FROM unnest(pl.affected_capabilities) cap
     WHERE cap = aa.pcf_category_id)
  FROM parking_lot pl
  JOIN architecture_artifacts aa
    ON aa.org_id = p_org_id AND aa.lifecycle_status = 'active'
    AND aa.pcf_category_id = ANY(pl.affected_capabilities)
  WHERE pl.org_id = p_org_id AND pl.status = 'parked';
END; $;
```

## APPLICATION STRUCTURE

```
app/
├── layout.tsx                       # ClerkProvider, global styles
├── page.tsx                         # Landing (unauthenticated)
├── sign-in/[[...sign-in]]/page.tsx
├── sign-up/[[...sign-up]]/page.tsx
├── (dashboard)/
│   ├── layout.tsx                   # Sidebar + header (authenticated)
│   ├── dashboard/page.tsx           # Architecture Runway Health
│   ├── artifacts/
│   │   ├── page.tsx                 # List with filters
│   │   └── [id]/page.tsx            # Detail + tag editor + compliance
│   ├── capabilities/
│   │   ├── page.tsx                 # Heatmap
│   │   └── [pcfId]/page.tsx         # Capability detail
│   ├── conflicts/
│   │   ├── page.tsx                 # List with severity filters
│   │   └── [id]/page.tsx            # Detail + resolution
│   ├── parking-lot/
│   │   ├── page.tsx                 # List with status filters
│   │   └── [id]/page.tsx            # Detail + reactivation
│   ├── principles/
│   │   ├── page.tsx                 # Principles list
│   │   └── new/page.tsx             # Create/edit
│   ├── adm-cycles/
│   │   ├── page.tsx                 # Cycle list
│   │   └── [id]/page.tsx            # Phase tracker
│   ├── compliance/page.tsx          # Scorecard report
│   └── settings/page.tsx            # Config
├── api/
│   ├── artifacts/
│   │   ├── route.ts                 # GET (list), POST (register)
│   │   └── [id]/
│   │       ├── route.ts             # GET, PATCH
│   │       ├── tags/route.ts        # POST
│   │       ├── validate/route.ts    # POST
│   │       └── conflicts/route.ts   # GET
│   ├── parking-lot/
│   │   ├── route.ts                 # GET, POST
│   │   ├── [id]/
│   │   │   ├── route.ts             # PATCH
│   │   │   └── reactivate/route.ts  # POST
│   │   └── conflicts/route.ts       # GET (scan)
│   ├── conflicts/
│   │   ├── route.ts                 # GET
│   │   ├── scan/route.ts            # POST (trigger full scan)
│   │   ├── [id]/route.ts            # PATCH (resolve)
│   │   └── dashboard/route.ts       # GET (aggregated stats)
│   ├── adm-cycles/
│   │   ├── route.ts                 # GET, POST
│   │   └── [id]/
│   │       ├── route.ts             # GET
│   │       ├── phase/route.ts       # PATCH (advance)
│   │       └── compare/route.ts     # GET (baseline vs target)
│   ├── principles/route.ts          # GET, POST
│   ├── capabilities/
│   │   ├── route.ts                 # GET
│   │   └── [pcfId]/health/route.ts  # GET
│   ├── compliance/report/route.ts   # GET
│   └── webhooks/
│       ├── artifact-created/route.ts
│       ├── artifact-updated/route.ts
│       └── status-changed/route.ts
lib/
├── supabase/
│   ├── client.ts                    # createBrowserClient
│   ├── server.ts                    # createServerClient with Clerk token
│   └── realtime.ts                  # Subscription setup
├── types/
│   ├── artifacts.ts
│   ├── conflicts.ts
│   ├── parking-lot.ts
│   ├── adm.ts
│   └── capabilities.ts
├── tagging/
│   ├── auto-classifier.ts           # Apply rules, return tags with confidence
│   ├── tag-rules.ts                 # Rule definitions by source:entityType
│   └── confidence.ts                # Scoring logic
├── conflicts/
│   ├── detector.ts                  # Orchestrates all conflict checks
│   └── types.ts
├── sync/
│   ├── realtime-listener.ts         # Supabase Realtime handlers
│   └── event-processor.ts           # Mutation → artifact → tags → conflicts
└── utils/
    ├── pcf.ts                       # PCF hierarchy data and helpers
    └── archimate.ts                 # ArchiMate element type mappings
components/
├── layout/sidebar.tsx               # Navy gradient sidebar
├── layout/header.tsx                # Top bar
├── dashboard/
│   ├── capability-heatmap.tsx       # Recharts heatmap
│   ├── conflict-chart.tsx           # Severity distribution
│   ├── compliance-scorecard.tsx     # % per principle
│   └── adm-phase-tracker.tsx        # Visual ADM position
├── artifacts/
│   ├── artifact-card.tsx
│   ├── tag-editor.tsx               # Add/edit/remove domain tags
│   └── validation-panel.tsx         # Confirm/correct auto-tags
├── conflicts/
│   ├── conflict-card.tsx
│   └── resolution-form.tsx
├── parking-lot/
│   ├── parked-item-card.tsx
│   └── park-form.tsx
└── shared/
    ├── domain-badge.tsx             # Business | Information | Technology
    ├── severity-badge.tsx           # Critical | High | Medium | Low
    ├── maturity-indicator.tsx       # Red/Yellow/Green dot
    └── pcf-breadcrumb.tsx           # 1.0 > 1.1 > 1.1.1
```

## TYPESCRIPT INTERFACES

```typescript
// lib/types/artifacts.ts
export type SourceModule = 'strategic_compass' | 'initiative_planner' |
  'voice_of_customer' | 'requirements_manager' | 'project_mgmt';
export type LifecycleStatus = 'active' | 'archived' | 'superseded' | 'parking_lot';
export type ArchitectureDomain = 'business' | 'information' | 'technology';
export type TagSource = 'auto' | 'human' | 'ai_suggested' | 'inherited';

export interface ArchitectureArtifact {
  id: string;
  orgId: string;
  sourceModule: SourceModule;
  sourceEntityType: string;
  sourceEntityId: string;
  artifactName: string;
  artifactDescription?: string;
  pcfCategoryId?: string;
  pcfCategoryName?: string;
  lifecycleStatus: LifecycleStatus;
  autoTagConfidence?: number;
  humanValidated: boolean;
  validatedBy?: string;
  validatedAt?: string;
  admPhase?: ADMPhase;
  admCycleId?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  tags?: DomainTag[];
  compliance?: PrincipleCompliance[];
}

export interface DomainTag {
  id: string;
  artifactId: string;
  domain: ArchitectureDomain;
  subDomain?: string;
  archimateElementType?: string;
  tagSource: TagSource;
  confidence?: number;
  taggedBy: string;
  reasoning?: string;
  createdAt: string;
}
```

## AUTO-CLASSIFICATION RULES

```typescript
// lib/tagging/tag-rules.ts
export const AUTO_TAG_RULES: Record<string, {
  defaultDomain: ArchitectureDomain;
  defaultSubDomain: string;
  confidence: number;
}> = {
  'strategic_compass:gap':           { defaultDomain: 'business', defaultSubDomain: 'capability', confidence: 0.85 },
  'initiative_planner:initiative':   { defaultDomain: 'business', defaultSubDomain: 'strategy',   confidence: 0.75 },
  'voice_of_customer:feedback':      { defaultDomain: 'business', defaultSubDomain: 'process',    confidence: 0.50 },
  'voice_of_customer:root_cause':    { defaultDomain: 'business', defaultSubDomain: 'process',    confidence: 0.65 },
  'requirements_manager:business':   { defaultDomain: 'business', defaultSubDomain: 'capability', confidence: 0.80 },
  'requirements_manager:functional': { defaultDomain: 'technology', defaultSubDomain: 'application', confidence: 0.75 },
  'requirements_manager:data':       { defaultDomain: 'information', defaultSubDomain: 'data_entity', confidence: 0.80 },
  'project_mgmt:risk':              { defaultDomain: 'business', defaultSubDomain: 'strategy',   confidence: 0.55 },
  'project_mgmt:decision':          { defaultDomain: 'business', defaultSubDomain: 'strategy',   confidence: 0.50 },
};

export const HUMAN_VALIDATION_THRESHOLD = 0.70;
// Artifacts with auto_tag_confidence below this are queued for human review.
```

## SUPABASE REALTIME INTEGRATION

```typescript
// lib/sync/realtime-listener.ts
import { createClient } from '@supabase/supabase-js';
import { processArtifactMutation } from './event-processor';

export function setupRealtimeSubscriptions() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  supabase.channel('aga-module-sync')
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'initiatives' },
      (payload) => processArtifactMutation('initiative_planner', 'initiative', payload))
    .on('postgres_changes',
      { event: '*', schema: 'public', table: 'gap_assessments' },
      (payload) => processArtifactMutation('strategic_compass', 'gap', payload))
    .subscribe();
}
```

## STRATEGIC COMPASS JSON IMPORT FORMAT

Must accept this exact format:

```json
{
  "exportDate": "2026-01-26T...",
  "format": "strategic-compass-export-v1",
  "orgName": "Organization",
  "summary": { "totalGaps": 2, "overallScore": 17, "distribution": { "red": 9, "yellow": 2, "green": 1 } },
  "gaps": [{
    "pcfId": "1.0",
    "pcfName": "Develop Vision and Strategy",
    "category": 1,
    "categoryName": "Vision & Strategy",
    "currentState": "red",
    "targetState": "yellow",
    "gapMagnitude": 1,
    "shortDescription": "..."
  }]
}
```

On import: each gap -> `architecture_artifact` with `source_module='strategic_compass'`, `source_entity_type='gap'`, auto-tags applied, capability_map entry created/updated.

## PHASED BUILD ORDER

### Phase 1: Foundation (items 1-8)
1. Install dependencies, configure tailwind.config.ts with mana colors
2. Create `supabase/migrations/001_aga_schema.sql` with ALL tables, RLS, indexes
3. Clerk auth: middleware.ts, sign-in/sign-up pages, org context extraction
4. Dashboard layout: sidebar with navy gradient, header, routing
5. Artifacts CRUD API: GET list (filter by module, domain, status, pcf), GET detail, POST, PATCH
6. Artifact list page with filter dropdowns and search
7. Artifact detail page with tag editor component (add/edit/remove domain tags)
8. Capability map CRUD with PCF Level 1 seed data (categories 1-13)

### Phase 2: Governance Core (items 9-16)
9. Auto-classification engine: apply tag rules on artifact creation
10. Human validation queue: page listing artifacts where confidence < 0.70, with confirm/correct UI
11. Architecture principles CRUD with domain assignment
12. Principle compliance: assess each artifact against relevant domain principles
13. Parking lot CRUD: park form (reason, review date, capabilities), reactivate workflow
14. Conflict detection: deploy PostgreSQL functions, build detector.ts orchestrator
15. Conflict list page with severity/type filters, resolution form
16. Supabase Realtime subscriptions for initiatives and gap_assessments tables

### Phase 3: Dashboards (items 17-22)
17. Capability maturity heatmap (Recharts): grid of PCF categories, red/yellow/green fill, click to drill
18. Conflict severity distribution chart (stacked bar by type)
19. Principle compliance scorecard: % per principle, highlight < 80%
20. ADM cycle tracking: create cycle, visual phase tracker, advance phase with snapshot
21. Architecture Runway Health dashboard: combine heatmap + conflicts + compliance + ADM into single page
22. Initiative alignment scoring: principle compliance % x capability coverage x inverse conflict count

### Phase 4: Advanced (items 23-27)
23. Parking lot conflict scan: cross-reference parked capabilities against active portfolio
24. Target architecture evolution: compare architecture_states across ADM cycles, show deltas
25. Requirements-to-gap feedback loop: completed requirements update capability maturity_score
26. PDF governance report export via jsPDF
27. Webhook endpoints with HMAC signature validation for external module integration

## CRITICAL IMPLEMENTATION RULES

1. **Every API route** extracts org_id from Clerk session. Never trust client-provided org_id.
2. **All queries** use authenticated Supabase client (anon key + Clerk JWT). Service role only for Realtime subscriptions and webhook processing.
3. **Conflict detection** runs on artifact mutation AND on-demand via API. Deduplicate: skip if open conflict already exists for same artifact pair and type.
4. **Auto-tags are always editable.** Human validation UI shows auto-tags with confidence and lets users correct/confirm/add.
5. **Parking lot items remain architecturally visible.** They keep their tags and are included in conflict scans. NOT invisible.
6. **ADM phase transitions** trigger architecture state snapshots. When current_phase changes, snapshot all capability scores for that domain.
7. **Sidebar** must visually match Mana Platform: navy-to-blue-deep gradient background, active item has blue-to-blue-bright gradient with shadow, Lucide icons, 14px Outfit/system font.
8. **All timestamps** stored UTC, displayed in user local timezone.
9. **Server components** by default. Client components only for forms, charts, real-time UI.
10. **Error boundaries** on every page route. User-friendly error messages, never raw stack traces.
