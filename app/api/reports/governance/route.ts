import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { ADM_PHASE_LABELS } from '@/lib/types/adm';
import type { ADMPhase } from '@/lib/types/adm';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Gather all data in parallel
  const [
    artifactsRes, conflictsRes, parkedRes, principlesRes, admRes, complianceRes, capsRes,
  ] = await Promise.all([
    supabase
      .from('architecture_artifacts')
      .select('id, artifact_name, source_module, lifecycle_status, pcf_category_id')
      .eq('user_id', userId),
    supabase
      .from('architecture_conflicts')
      .select('id, conflict_type, severity, description, resolution_status')
      .eq('user_id', userId),
    supabase
      .from('parking_lot')
      .select('id, item_name, reason_parked, status')
      .eq('user_id', userId)
      .eq('status', 'parked'),
    supabase
      .from('architecture_principles')
      .select('id, principle_name, domain, priority, status')
      .eq('user_id', userId)
      .eq('status', 'active')
      .order('priority'),
    supabase
      .from('adm_cycles')
      .select('id, cycle_name, current_phase, status, cycle_number')
      .eq('user_id', userId)
      .eq('status', 'in_progress')
      .order('created_at', { ascending: false })
      .limit(1),
    supabase
      .from('principle_compliance')
      .select('compliance_status, principle_id, architecture_artifacts!inner(user_id)')
      .eq('architecture_artifacts.user_id', userId),
    supabase
      .from('capability_map')
      .select('pcf_id, capability_name, maturity_current, maturity_score, business_criticality')
      .eq('user_id', userId)
      .order('pcf_id'),
  ]);

  const artifacts = artifactsRes.data || [];
  const conflicts = conflictsRes.data || [];
  const parked = parkedRes.data || [];
  const principles = principlesRes.data || [];
  const admCycle = admRes.data?.[0] || null;
  const compliance = complianceRes.data || [];
  const capabilities = capsRes.data || [];

  // Compute compliance per principle
  const complianceByPrinciple = principles.map((p) => {
    const records = compliance.filter((c: Record<string, unknown>) => c.principle_id === p.id);
    const applicable = records.filter((c: Record<string, unknown>) => c.compliance_status !== 'not_applicable');
    const compliant = applicable.filter((c: Record<string, unknown>) => c.compliance_status === 'compliant');
    const rate = applicable.length > 0 ? Math.round((compliant.length / applicable.length) * 100) : null;
    return { name: p.principle_name, domain: p.domain, rate };
  });

  // Conflict summary
  const openConflicts = conflicts.filter((c) => c.resolution_status === 'open');
  const criticalConflicts = openConflicts.filter((c) => c.severity === 'critical');
  const highConflicts = openConflicts.filter((c) => c.severity === 'high');

  // Overall compliance
  const allApplicable = compliance.filter((c: Record<string, unknown>) => c.compliance_status !== 'not_applicable');
  const allCompliant = allApplicable.filter((c: Record<string, unknown>) => c.compliance_status === 'compliant');
  const overallCompliance = allApplicable.length > 0
    ? Math.round((allCompliant.length / allApplicable.length) * 100)
    : null;

  // Capability summary
  const redCaps = capabilities.filter((c) => c.maturity_current === 'red');
  const yellowCaps = capabilities.filter((c) => c.maturity_current === 'yellow');
  const greenCaps = capabilities.filter((c) => c.maturity_current === 'green');

  const reportData = {
    generatedAt: new Date().toISOString(),
    summary: {
      totalArtifacts: artifacts.length,
      activeArtifacts: artifacts.filter((a) => a.lifecycle_status === 'active').length,
      openConflicts: openConflicts.length,
      criticalConflicts: criticalConflicts.length,
      highConflicts: highConflicts.length,
      parkedItems: parked.length,
      activePrinciples: principles.length,
      overallCompliance,
      admPhase: admCycle
        ? ADM_PHASE_LABELS[admCycle.current_phase as ADMPhase]
        : 'No active cycle',
      admCycleName: admCycle?.cycle_name || null,
      capabilities: {
        total: capabilities.length,
        red: redCaps.length,
        yellow: yellowCaps.length,
        green: greenCaps.length,
      },
    },
    complianceScorecard: complianceByPrinciple,
    topConflicts: openConflicts.slice(0, 10).map((c) => ({
      type: c.conflict_type,
      severity: c.severity,
      description: c.description,
    })),
    parkedItems: parked.map((p) => ({
      name: p.item_name,
      reason: p.reason_parked,
    })),
    capabilitiesAtRisk: redCaps.map((c) => ({
      pcfId: c.pcf_id,
      name: c.capability_name,
      score: c.maturity_score,
      criticality: c.business_criticality,
    })),
  };

  return NextResponse.json(reportData);
}
