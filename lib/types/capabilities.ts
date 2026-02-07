export interface CapabilityMapEntry {
  id: string;
  orgId: string;
  pcfId: string;
  pcfName: string;
  capabilityName: string;
  capabilityLevel: number;
  parentId?: string;
  maturityCurrent?: 'red' | 'yellow' | 'green';
  maturityTarget?: 'red' | 'yellow' | 'green';
  maturityScore?: number;
  businessCriticality?: 'low' | 'medium' | 'high' | 'critical';
  ownerUserId?: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export function dbCapabilityToCapability(db: Record<string, unknown>): CapabilityMapEntry {
  return {
    id: db.id as string,
    orgId: db.org_id as string,
    pcfId: db.pcf_id as string,
    pcfName: db.pcf_name as string,
    capabilityName: db.capability_name as string,
    capabilityLevel: db.capability_level as number,
    parentId: db.parent_id as string | undefined,
    maturityCurrent: db.maturity_current as CapabilityMapEntry['maturityCurrent'],
    maturityTarget: db.maturity_target as CapabilityMapEntry['maturityTarget'],
    maturityScore: db.maturity_score as number | undefined,
    businessCriticality: db.business_criticality as CapabilityMapEntry['businessCriticality'],
    ownerUserId: db.owner_user_id as string | undefined,
    metadata: (db.metadata as Record<string, unknown>) || {},
    createdAt: db.created_at as string,
    updatedAt: db.updated_at as string,
  };
}
