import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { dbConflictToConflict } from '@/lib/types/conflicts';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ conflicts: [] });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { searchParams } = new URL(request.url);
  const severity = searchParams.get('severity');
  const type = searchParams.get('type');
  const status = searchParams.get('status');

  let query = supabase
    .from('architecture_conflicts')
    .select('*')
    .eq('user_id', userId);

  if (severity) query = query.eq('severity', severity);
  if (type) query = query.eq('conflict_type', type);
  if (status) query = query.eq('resolution_status', status);

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const conflicts = (data || []).map((row: Record<string, unknown>) => dbConflictToConflict(row));
  return NextResponse.json({ conflicts });
}
