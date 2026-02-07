export type ADMPhase = 'preliminary' | 'architecture_vision' |
  'business_architecture' | 'information_systems' |
  'technology_architecture' | 'opportunities_solutions' |
  'migration_planning' | 'implementation_governance' | 'change_management';

export const ADM_PHASE_ORDER: ADMPhase[] = [
  'preliminary', 'architecture_vision', 'business_architecture',
  'information_systems', 'technology_architecture', 'opportunities_solutions',
  'migration_planning', 'implementation_governance', 'change_management',
];

export const ADM_PHASE_LABELS: Record<ADMPhase, string> = {
  preliminary: 'Preliminary',
  architecture_vision: 'Architecture Vision',
  business_architecture: 'Business Architecture',
  information_systems: 'Information Systems',
  technology_architecture: 'Technology Architecture',
  opportunities_solutions: 'Opportunities & Solutions',
  migration_planning: 'Migration Planning',
  implementation_governance: 'Implementation Governance',
  change_management: 'Change Management',
};

export interface ADMCycle {
  id: string;
  orgId: string;
  cycleName: string;
  cycleNumber: number;
  startedAt: string;
  completedAt?: string;
  currentPhase: ADMPhase;
  phaseHistory: Array<{ phase: ADMPhase; enteredAt: string; exitedAt?: string }>;
  status: 'in_progress' | 'completed' | 'abandoned';
  createdAt: string;
  updatedAt: string;
}

export function dbCycleToAdmCycle(db: Record<string, unknown>): ADMCycle {
  return {
    id: db.id as string,
    orgId: db.org_id as string,
    cycleName: db.cycle_name as string,
    cycleNumber: db.cycle_number as number,
    startedAt: db.started_at as string,
    completedAt: db.completed_at as string | undefined,
    currentPhase: db.current_phase as ADMPhase,
    phaseHistory: (db.phase_history as ADMCycle['phaseHistory']) || [],
    status: db.status as ADMCycle['status'],
    createdAt: db.created_at as string,
    updatedAt: db.updated_at as string,
  };
}
