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
    return NextResponse.json({
      artifactCount: 0,
      openConflictCount: 0,
      parkedItemCount: 0,
      compliancePercent: null,
      activePrincipleCount: 0,
      currentAdmPhase: null,
    });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const [artifacts, conflicts, parked, principles, admCycles, compliance] =
    await Promise.all([
      supabase
        .from('architecture_artifacts')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('lifecycle_status', 'active'),
      supabase
        .from('architecture_conflicts')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('resolution_status', 'open'),
      supabase
        .from('parking_lot')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('status', 'parked'),
      supabase
        .from('architecture_principles')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('status', 'active'),
      supabase
        .from('adm_cycles')
        .select('current_phase')
        .eq('user_id', userId)
        .eq('status', 'in_progress')
        .order('created_at', { ascending: false })
        .limit(1),
      supabase
        .from('principle_compliance')
        .select('compliance_status, architecture_artifacts!inner(user_id)')
        .eq('architecture_artifacts.user_id', userId),
    ]);

  // Compute overall compliance %
  let compliancePercent: number | null = null;
  if (compliance.data && compliance.data.length > 0) {
    const applicable = compliance.data.filter(
      (c: Record<string, unknown>) => c.compliance_status !== 'not_applicable'
    );
    if (applicable.length > 0) {
      const compliant = applicable.filter(
        (c: Record<string, unknown>) => c.compliance_status === 'compliant'
      ).length;
      compliancePercent = Math.round((compliant / applicable.length) * 100);
    }
  }

  const currentAdmPhase =
    admCycles.data && admCycles.data.length > 0
      ? admCycles.data[0].current_phase
      : null;

  return NextResponse.json({
    artifactCount: artifacts.count ?? 0,
    openConflictCount: conflicts.count ?? 0,
    parkedItemCount: parked.count ?? 0,
    compliancePercent,
    activePrincipleCount: principles.count ?? 0,
    currentAdmPhase,
  });
}
