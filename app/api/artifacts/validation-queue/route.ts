import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { HUMAN_VALIDATION_THRESHOLD } from '@/lib/tagging/tag-rules';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ count: 0 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { count, error } = await supabase
    .from('architecture_artifacts')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('human_validated', false)
    .lt('auto_tag_confidence', HUMAN_VALIDATION_THRESHOLD);

  if (error) {
    return NextResponse.json({ count: 0 });
  }

  return NextResponse.json({ count: count || 0 });
}
