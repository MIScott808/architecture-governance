import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { dbCycleToAdmCycle } from '@/lib/types/adm';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ cycles: [] });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { data, error } = await supabase
    .from('adm_cycles')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const cycles = (data || []).map((row: Record<string, unknown>) =>
    dbCycleToAdmCycle(row)
  );
  return NextResponse.json({ cycles });
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const body = await request.json();
  const { cycleName } = body;

  if (!cycleName || typeof cycleName !== 'string') {
    return NextResponse.json({ error: 'cycleName is required' }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Get next cycle number
  const { count } = await supabase
    .from('adm_cycles')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId);

  const cycleNumber = (count ?? 0) + 1;
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('adm_cycles')
    .insert({
      user_id: userId,
      cycle_name: cycleName,
      cycle_number: cycleNumber,
      current_phase: 'preliminary',
      phase_history: [{ phase: 'preliminary', enteredAt: now }],
      status: 'in_progress',
      started_at: now,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ cycle: dbCycleToAdmCycle(data) }, { status: 201 });
}
