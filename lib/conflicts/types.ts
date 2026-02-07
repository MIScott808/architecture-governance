export interface CapabilityOverlapResult {
  pcf_id: string;
  capability_name: string;
  initiative_count: number;
  initiative_names: string[];
  artifact_ids: string[];
}

export interface CrossDomainResult {
  artifact_id: string;
  artifact_name: string;
  source_module: string;
  domains: string[];
  domain_count: number;
}

export interface ParkingLotConflictResult {
  parked_item_id: string;
  parked_item_name: string;
  active_artifact_id: string;
  active_artifact_name: string;
  overlapping_capabilities: string[];
}

export interface DetectionSummary {
  capabilityOverlaps: number;
  crossDomainFlags: number;
  parkingLotConflicts: number;
  newConflictsCreated: number;
}
