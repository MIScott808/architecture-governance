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
