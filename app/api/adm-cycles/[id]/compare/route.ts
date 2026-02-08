import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ comparison: null });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get('domain') || 'business';

  // Get baseline and latest target/transitional state for this cycle
  const [baselineRes, targetRes] = await Promise.all([
    supabase
      .from('architecture_states')
      .select('*')
      .eq('user_id', userId)
      .eq('adm_cycle_id', params.id)
      .eq('state_type', 'baseline')
      .eq('domain', domain)
      .order('captured_at', { ascending: true })
      .limit(1),
    supabase
      .from('architecture_states')
      .select('*')
      .eq('user_id', userId)
      .eq('adm_cycle_id', params.id)
      .in('state_type', ['target', 'transitional'])
      .eq('domain', domain)
      .order('captured_at', { ascending: false })
      .limit(1),
  ]);

  const baseline = baselineRes.data?.[0] || null;
  const target = targetRes.data?.[0] || null;

  if (!baseline && !target) {
    return NextResponse.json({ comparison: null });
  }

  // Compute deltas if both exist
  let deltas: Array<{
    pcfId: string;
    capabilityName: string;
    baselineScore: number | null;
    targetScore: number | null;
    delta: number;
  }> = [];

  if (baseline && target) {
    const baseScores = (baseline.capability_scores || {}) as Record<string, { score: number; name: string }>;
    const targetScores = (target.capability_scores || {}) as Record<string, { score: number; name: string }>;

    const allPcfIds = new Set([
      ...Object.keys(baseScores),
      ...Object.keys(targetScores),
    ]);

    deltas = Array.from(allPcfIds).map((pcfId) => {
      const bs = baseScores[pcfId]?.score ?? null;
      const ts = targetScores[pcfId]?.score ?? null;
      return {
        pcfId,
        capabilityName: targetScores[pcfId]?.name || baseScores[pcfId]?.name || pcfId,
        baselineScore: bs,
        targetScore: ts,
        delta: (ts ?? 0) - (bs ?? 0),
      };
    }).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  }

  return NextResponse.json({
    comparison: {
      baseline: baseline ? {
        id: baseline.id,
        stateType: baseline.state_type,
        capturedAt: baseline.captured_at,
        domain: baseline.domain,
      } : null,
      target: target ? {
        id: target.id,
        stateType: target.state_type,
        capturedAt: target.captured_at,
        domain: target.domain,
      } : null,
      deltas,
    },
  });
}
