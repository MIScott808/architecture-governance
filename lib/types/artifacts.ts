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
  admPhase?: string;
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

export interface PrincipleCompliance {
  id: string;
  artifactId: string;
  principleId: string;
  complianceStatus: 'compliant' | 'non_compliant' | 'exception_granted' | 'not_applicable';
  exceptionReason?: string;
  exceptionExpiry?: string;
  assessedBy?: string;
  assessedAt: string;
  principle?: ArchitecturePrinciple;
}

export interface ArchitecturePrinciple {
  id: string;
  orgId: string;
  principleName: string;
  rationale?: string;
  implications?: string;
  domain: ArchitectureDomain | 'cross_cutting';
  priority: number;
  status: 'active' | 'deprecated' | 'draft';
  createdAt: string;
  updatedAt: string;
}

// DB <-> App type converters
export function dbArtifactToArtifact(db: Record<string, unknown>): ArchitectureArtifact {
  return {
    id: db.id as string,
    orgId: db.org_id as string,
    sourceModule: db.source_module as SourceModule,
    sourceEntityType: db.source_entity_type as string,
    sourceEntityId: db.source_entity_id as string,
    artifactName: db.artifact_name as string,
    artifactDescription: db.artifact_description as string | undefined,
    pcfCategoryId: db.pcf_category_id as string | undefined,
    pcfCategoryName: db.pcf_category_name as string | undefined,
    lifecycleStatus: db.lifecycle_status as LifecycleStatus,
    autoTagConfidence: db.auto_tag_confidence as number | undefined,
    humanValidated: db.human_validated as boolean,
    validatedBy: db.validated_by as string | undefined,
    validatedAt: db.validated_at as string | undefined,
    admPhase: db.adm_phase as string | undefined,
    admCycleId: db.adm_cycle_id as string | undefined,
    metadata: (db.metadata as Record<string, unknown>) || {},
    createdAt: db.created_at as string,
    updatedAt: db.updated_at as string,
  };
}

export function dbTagToTag(db: Record<string, unknown>): DomainTag {
  return {
    id: db.id as string,
    artifactId: db.artifact_id as string,
    domain: db.domain as ArchitectureDomain,
    subDomain: db.sub_domain as string | undefined,
    archimateElementType: db.archimate_element_type as string | undefined,
    tagSource: db.tag_source as TagSource,
    confidence: db.confidence as number | undefined,
    taggedBy: db.tagged_by as string,
    reasoning: db.reasoning as string | undefined,
    createdAt: db.created_at as string,
  };
}
