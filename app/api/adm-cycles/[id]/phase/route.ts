import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { ADM_PHASE_ORDER, dbCycleToAdmCycle } from '@/lib/types/adm';
import type { ADMPhase } from '@/lib/types/adm';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function PATCH(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Fetch current cycle
  const { data: cycle, error: fetchError } = await supabase
    .from('adm_cycles')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', userId)
    .single();

  if (fetchError || !cycle) {
    return NextResponse.json({ error: 'Cycle not found' }, { status: 404 });
  }

  if (cycle.status !== 'in_progress') {
    return NextResponse.json(
      { error: 'Cycle is not in progress' },
      { status: 400 }
    );
  }

  const currentIndex = ADM_PHASE_ORDER.indexOf(cycle.current_phase as ADMPhase);
  const now = new Date().toISOString();

  // Update phase history — mark exit time on current phase
  const phaseHistory = [...(cycle.phase_history || [])];
  if (phaseHistory.length > 0) {
    phaseHistory[phaseHistory.length - 1].exitedAt = now;
  }

  // Check if this is the last phase
  if (currentIndex >= ADM_PHASE_ORDER.length - 1) {
    // Snapshot final phase state
    await snapshotArchitectureState(
      supabase,
      userId,
      params.id,
      cycle.current_phase as ADMPhase,
      currentIndex
    );

    // Complete the cycle
    const { data: updated, error: updateError } = await supabase
      .from('adm_cycles')
      .update({
        status: 'completed',
        completed_at: now,
        phase_history: phaseHistory,
        updated_at: now,
      })
      .eq('id', params.id)
      .select()
      .single();

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ cycle: dbCycleToAdmCycle(updated), completed: true });
  }

  // Snapshot architecture state for the phase we're leaving
  await snapshotArchitectureState(
    supabase,
    userId,
    params.id,
    cycle.current_phase as ADMPhase,
    currentIndex
  );

  // Advance to next phase
  const nextPhase = ADM_PHASE_ORDER[currentIndex + 1];
  phaseHistory.push({ phase: nextPhase, enteredAt: now });

  const { data: updated, error: updateError } = await supabase
    .from('adm_cycles')
    .update({
      current_phase: nextPhase,
      phase_history: phaseHistory,
      updated_at: now,
    })
    .eq('id', params.id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ cycle: dbCycleToAdmCycle(updated), completed: false });
}

// Determine domain for each ADM phase
const PHASE_DOMAIN: Record<string, string> = {
  preliminary: 'business',
  architecture_vision: 'business',
  business_architecture: 'business',
  information_systems: 'information',
  technology_architecture: 'technology',
  opportunities_solutions: 'business',
  migration_planning: 'technology',
  implementation_governance: 'technology',
  change_management: 'business',
};

async function snapshotArchitectureState(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  userId: string,
  cycleId: string,
  phase: ADMPhase,
  phaseIndex: number
) {
  try {
    const domain = PHASE_DOMAIN[phase] || 'business';

    // Grab current capability scores for this domain's relevant capabilities
    const { data: capabilities } = await supabase
      .from('capability_map')
      .select('pcf_id, capability_name, maturity_score, maturity_current')
      .eq('user_id', userId);

    const capabilityScores: Record<string, { name: string; score: number; maturity: string | null }> = {};
    (capabilities || []).forEach((c: Record<string, unknown>) => {
      capabilityScores[c.pcf_id as string] = {
        name: c.capability_name as string,
        score: (c.maturity_score as number) ?? 0,
        maturity: c.maturity_current as string | null,
      };
    });

    // Count active artifacts and their domains
    const { data: artifacts } = await supabase
      .from('architecture_artifacts')
      .select('id, artifact_name, pcf_category_id, lifecycle_status')
      .eq('user_id', userId)
      .eq('lifecycle_status', 'active');

    const stateType = phaseIndex === 0 ? 'baseline' : 'transitional';

    await supabase.from('architecture_states').insert({
      user_id: userId,
      adm_cycle_id: cycleId,
      state_type: stateType,
      domain,
      capability_scores: capabilityScores,
      architecture_elements: {
        activeArtifactCount: (artifacts || []).length,
        phase,
        capturedBy: 'phase_advance',
      },
      created_by: userId,
    });
  } catch {
    // Non-blocking — don't fail the phase advance if snapshot fails
  }
}
