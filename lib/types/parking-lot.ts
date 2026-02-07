export type ParkingReason = 'budget_constraint' | 'resource_unavailable' |
  'dependency_blocked' | 'architecture_conflict' |
  'strategic_reprioritization' | 'deferred';
export type ParkingStatus = 'parked' | 'under_review' | 'reactivated' | 'cancelled';

export interface ParkingLotItem {
  id: string;
  orgId: string;
  artifactId?: string;
  itemType: 'requirement' | 'initiative' | 'program' | 'capability_gap';
  itemName: string;
  itemDescription?: string;
  sourceModule?: string;
  sourceEntityId?: string;
  reasonParked: ParkingReason;
  parkedBy: string;
  parkedAt: string;
  reviewDate?: string;
  priorityWhenParked?: string;
  estimatedEffort?: string;
  affectedCapabilities: string[];
  affectedDomains: string[];
  dependencyIds: string[];
  conflictIds: string[];
  reactivationCriteria?: string;
  status: ParkingStatus;
  metadata: Record<string, unknown>;
  updatedAt: string;
}

export function dbParkingToParking(db: Record<string, unknown>): ParkingLotItem {
  return {
    id: db.id as string,
    orgId: db.org_id as string,
    artifactId: db.artifact_id as string | undefined,
    itemType: db.item_type as ParkingLotItem['itemType'],
    itemName: db.item_name as string,
    itemDescription: db.item_description as string | undefined,
    sourceModule: db.source_module as string | undefined,
    sourceEntityId: db.source_entity_id as string | undefined,
    reasonParked: db.reason_parked as ParkingReason,
    parkedBy: db.parked_by as string,
    parkedAt: db.parked_at as string,
    reviewDate: db.review_date as string | undefined,
    priorityWhenParked: db.priority_when_parked as string | undefined,
    estimatedEffort: db.estimated_effort as string | undefined,
    affectedCapabilities: (db.affected_capabilities as string[]) || [],
    affectedDomains: (db.affected_domains as string[]) || [],
    dependencyIds: (db.dependency_ids as string[]) || [],
    conflictIds: (db.conflict_ids as string[]) || [],
    reactivationCriteria: db.reactivation_criteria as string | undefined,
    status: db.status as ParkingStatus,
    metadata: (db.metadata as Record<string, unknown>) || {},
    updatedAt: db.updated_at as string,
  };
}
