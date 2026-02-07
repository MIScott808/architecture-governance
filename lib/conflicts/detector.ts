import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type {
  CapabilityOverlapResult,
  CrossDomainResult,
  ParkingLotConflictResult,
  DetectionSummary,
} from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function runConflictScan(userId: string): Promise<DetectionSummary> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase: SupabaseClient<any> = createClient(supabaseUrl, supabaseServiceKey);

  // Run all 3 detection functions in parallel
  // Note: These call PostgreSQL RPC functions. If they don't exist yet, they'll return errors
  // which we handle gracefully by returning empty arrays.
  const [overlaps, crossDomain, parkingConflicts] = await Promise.all([
    detectCapabilityOverlaps(supabase, userId),
    detectCrossDomainArtifacts(supabase, userId),
    scanParkingLotConflicts(supabase, userId),
  ]);

  let newConflictsCreated = 0;

  // Process capability overlaps
  for (const overlap of overlaps) {
    if (overlap.artifact_ids.length >= 2) {
      // Create conflicts between pairs
      for (let i = 0; i < overlap.artifact_ids.length - 1; i++) {
        for (let j = i + 1; j < overlap.artifact_ids.length; j++) {
          const created = await upsertConflict(supabase, userId, {
            conflictType: 'capability_overlap',
            severity: overlap.initiative_count > 3 ? 'high' : 'medium',
            artifactAId: overlap.artifact_ids[i],
            artifactBId: overlap.artifact_ids[j],
            description: `Multiple initiatives targeting ${overlap.capability_name} (PCF ${overlap.pcf_id}): ${overlap.initiative_names.join(', ')}`,
            affectedCapabilities: [overlap.pcf_id],
            detectionMethod: 'auto_rule',
          });
          if (created) newConflictsCreated++;
        }
      }
    }
  }

  // Process cross-domain artifacts as informational flags (technology_divergence type)
  for (const cd of crossDomain) {
    if (cd.domain_count >= 3) {
      // Only flag artifacts spanning ALL 3 domains as potential conflicts
      const created = await upsertConflict(supabase, userId, {
        conflictType: 'scope_overlap',
        severity: 'low',
        artifactAId: cd.artifact_id,
        artifactBId: cd.artifact_id,
        description: `Artifact "${cd.artifact_name}" spans ${cd.domain_count} domains (${cd.domains.join(', ')}), which may indicate scope issues`,
        affectedDomains: cd.domains,
        detectionMethod: 'auto_rule',
      });
      if (created) newConflictsCreated++;
    }
  }

  // Process parking lot conflicts
  for (const pc of parkingConflicts) {
    const created = await upsertConflict(supabase, userId, {
      conflictType: 'resource_contention',
      severity: 'medium',
      artifactAId: pc.active_artifact_id,
      artifactBId: pc.active_artifact_id,
      description: `Active artifact "${pc.active_artifact_name}" overlaps capabilities with parked item "${pc.parked_item_name}"`,
      affectedCapabilities: pc.overlapping_capabilities || [],
      detectionMethod: 'auto_rule',
    });
    if (created) newConflictsCreated++;
  }

  return {
    capabilityOverlaps: overlaps.length,
    crossDomainFlags: crossDomain.length,
    parkingLotConflicts: parkingConflicts.length,
    newConflictsCreated,
  };
}

async function detectCapabilityOverlaps(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: SupabaseClient<any>,
  userId: string
): Promise<CapabilityOverlapResult[]> {
  try {
    const { data, error } = await supabase.rpc('detect_capability_overlaps', {
      p_org_id: userId,
    });
    if (error) return [];
    return (data || []) as CapabilityOverlapResult[];
  } catch {
    return [];
  }
}

async function detectCrossDomainArtifacts(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: SupabaseClient<any>,
  userId: string
): Promise<CrossDomainResult[]> {
  try {
    const { data, error } = await supabase.rpc('detect_cross_domain_artifacts', {
      p_org_id: userId,
    });
    if (error) return [];
    return (data || []) as CrossDomainResult[];
  } catch {
    return [];
  }
}

async function scanParkingLotConflicts(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: SupabaseClient<any>,
  userId: string
): Promise<ParkingLotConflictResult[]> {
  try {
    const { data, error } = await supabase.rpc('scan_parking_lot_conflicts', {
      p_org_id: userId,
    });
    if (error) return [];
    return (data || []) as ParkingLotConflictResult[];
  } catch {
    return [];
  }
}

async function upsertConflict(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: SupabaseClient<any>,
  userId: string,
  conflict: {
    conflictType: string;
    severity: string;
    artifactAId: string;
    artifactBId: string;
    description: string;
    affectedCapabilities?: string[];
    affectedDomains?: string[];
    detectionMethod: string;
  }
): Promise<boolean> {
  // Deduplicate: check if open conflict already exists for same pair and type
  const { data: existing } = await supabase
    .from('architecture_conflicts')
    .select('id')
    .eq('user_id', userId)
    .eq('conflict_type', conflict.conflictType)
    .eq('artifact_a_id', conflict.artifactAId)
    .eq('artifact_b_id', conflict.artifactBId)
    .in('resolution_status', ['open', 'under_review'])
    .limit(1);

  if (existing && existing.length > 0) return false;

  const { error } = await supabase.from('architecture_conflicts').insert({
    user_id: userId,
    conflict_type: conflict.conflictType,
    severity: conflict.severity,
    artifact_a_id: conflict.artifactAId,
    artifact_b_id: conflict.artifactBId,
    description: conflict.description,
    affected_capabilities: conflict.affectedCapabilities || [],
    affected_domains: conflict.affectedDomains || [],
    detection_method: conflict.detectionMethod,
    resolution_status: 'open',
  });

  return !error;
}
