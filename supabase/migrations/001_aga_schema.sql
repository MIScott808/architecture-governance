-- Migration: 001_aga_schema.sql
-- Architecture Governance Application (AGA) - Module 6

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

-- RLS
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

-- Org isolation policies
DO $$
DECLARE tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'adm_cycles','architecture_artifacts','capability_map',
    'architecture_principles','parking_lot','architecture_conflicts',
    'architecture_states'
  ]) LOOP
    EXECUTE format('CREATE POLICY org_isolation ON %I FOR ALL USING (
      org_id IN (SELECT org_id FROM org_members WHERE user_id = auth.uid())
    )', tbl);
  END LOOP;
END $$;

DO $$
DECLARE tbl TEXT;
BEGIN
  FOR tbl IN SELECT unnest(ARRAY['architecture_domain_tags','principle_compliance']) LOOP
    EXECUTE format('CREATE POLICY org_isolation ON %I FOR ALL USING (
      artifact_id IN (SELECT id FROM architecture_artifacts WHERE org_id IN (
        SELECT org_id FROM org_members WHERE user_id = auth.uid()))
    )', tbl);
  END LOOP;
END $$;

CREATE POLICY org_isolation ON requirement_gap_links FOR ALL USING (
  requirement_artifact_id IN (SELECT id FROM architecture_artifacts WHERE org_id IN (
    SELECT org_id FROM org_members WHERE user_id = auth.uid()))
  OR gap_artifact_id IN (SELECT id FROM architecture_artifacts WHERE org_id IN (
    SELECT org_id FROM org_members WHERE user_id = auth.uid()))
);

-- Indexes
CREATE INDEX idx_artifacts_org_status ON architecture_artifacts(org_id, lifecycle_status);
CREATE INDEX idx_artifacts_pcf ON architecture_artifacts(org_id, pcf_category_id);
CREATE INDEX idx_artifacts_source ON architecture_artifacts(source_module, source_entity_id);
CREATE INDEX idx_tags_domain ON architecture_domain_tags(artifact_id, domain);
CREATE INDEX idx_conflicts_org_status ON architecture_conflicts(org_id, resolution_status);
CREATE INDEX idx_parking_org_status ON parking_lot(org_id, status);
CREATE INDEX idx_capability_org ON capability_map(org_id, pcf_id);
CREATE INDEX idx_adm_org ON adm_cycles(org_id, status);
