export type ConflictType = 'capability_overlap' | 'principle_violation' |
  'resource_contention' | 'data_ownership' | 'integration_conflict' |
  'timeline_conflict' | 'technology_divergence' | 'scope_overlap';
export type Severity = 'critical' | 'high' | 'medium' | 'low';
export type ResolutionStatus = 'open' | 'under_review' | 'resolved' |
  'accepted_risk' | 'deferred';

export interface ArchitectureConflict {
  id: string;
  orgId: string;
  conflictType: ConflictType;
  severity: Severity;
  artifactAId: string;
  artifactBId: string;
  description: string;
  affectedCapabilities: string[];
  affectedDomains: string[];
  detectionMethod: 'auto_rule' | 'ai_analysis' | 'human_report';
  resolutionStatus: ResolutionStatus;
  resolutionNotes?: string;
  resolvedBy?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export function dbConflictToConflict(db: Record<string, unknown>): ArchitectureConflict {
  return {
    id: db.id as string,
    orgId: db.org_id as string,
    conflictType: db.conflict_type as ConflictType,
    severity: db.severity as Severity,
    artifactAId: db.artifact_a_id as string,
    artifactBId: db.artifact_b_id as string,
    description: db.description as string,
    affectedCapabilities: (db.affected_capabilities as string[]) || [],
    affectedDomains: (db.affected_domains as string[]) || [],
    detectionMethod: db.detection_method as 'auto_rule' | 'ai_analysis' | 'human_report',
    resolutionStatus: db.resolution_status as ResolutionStatus,
    resolutionNotes: db.resolution_notes as string | undefined,
    resolvedBy: db.resolved_by as string | undefined,
    resolvedAt: db.resolved_at as string | undefined,
    createdAt: db.created_at as string,
    updatedAt: db.updated_at as string,
  };
}
