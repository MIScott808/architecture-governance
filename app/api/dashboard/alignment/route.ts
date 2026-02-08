import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ rankings: [] });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Fetch active artifacts with compliance and conflicts
  const [artifactsRes, complianceRes, conflictsRes, capabilitiesRes] = await Promise.all([
    supabase
      .from('architecture_artifacts')
      .select('id, artifact_name, pcf_category_id')
      .eq('user_id', userId)
      .eq('lifecycle_status', 'active'),
    supabase
      .from('principle_compliance')
      .select('artifact_id, compliance_status, architecture_artifacts!inner(user_id)')
      .eq('architecture_artifacts.user_id', userId),
    supabase
      .from('architecture_conflicts')
      .select('artifact_a_id, artifact_b_id')
      .eq('user_id', userId)
      .eq('resolution_status', 'open'),
    supabase
      .from('capability_map')
      .select('pcf_id')
      .eq('user_id', userId),
  ]);

  const artifacts = artifactsRes.data || [];
  const compliance = complianceRes.data || [];
  const conflicts = conflictsRes.data || [];
  const capabilities = capabilitiesRes.data || [];

  if (artifacts.length === 0) {
    return NextResponse.json({ rankings: [] });
  }

  const capPcfIds = new Set(capabilities.map((c) => c.pcf_id));

  // Count conflicts per artifact
  const conflictCounts: Record<string, number> = {};
  conflicts.forEach((c) => {
    conflictCounts[c.artifact_a_id] = (conflictCounts[c.artifact_a_id] || 0) + 1;
    conflictCounts[c.artifact_b_id] = (conflictCounts[c.artifact_b_id] || 0) + 1;
  });

  // Compute per-artifact alignment score
  const rankings = artifacts.map((artifact) => {
    // Compliance rate for this artifact
    const artCompliance = compliance.filter(
      (c: Record<string, unknown>) => c.artifact_id === artifact.id
    );
    const applicable = artCompliance.filter(
      (c: Record<string, unknown>) => c.compliance_status !== 'not_applicable'
    );
    const compliant = applicable.filter(
      (c: Record<string, unknown>) => c.compliance_status === 'compliant'
    );
    const complianceRate =
      applicable.length > 0 ? compliant.length / applicable.length : 1;

    // Capability coverage: does this artifact have a mapped PCF?
    const hasCap = artifact.pcf_category_id && capPcfIds.has(artifact.pcf_category_id);
    const capCoverage = hasCap ? 1 : 0.5;

    // Inverse conflict count (fewer conflicts = higher score)
    const conflictCount = conflictCounts[artifact.id] || 0;
    const conflictFactor = 1 / (1 + conflictCount);

    const score = Math.round(complianceRate * capCoverage * conflictFactor * 100);

    return {
      artifactId: artifact.id,
      artifactName: artifact.artifact_name,
      score,
      complianceRate: Math.round(complianceRate * 100),
      capCoverage: hasCap ? 'mapped' : 'unmapped',
      conflictCount,
    };
  });

  // Sort by score descending
  rankings.sort((a, b) => b.score - a.score);

  return NextResponse.json({ rankings });
}
