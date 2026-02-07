import { ArchitectureDomain } from '@/lib/types/artifacts';

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
