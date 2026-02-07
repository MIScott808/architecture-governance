import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { dbParkingToParking } from '@/lib/types/parking-lot';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(
  request: NextRequest,
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

  // Get the parking lot item
  const { data: item, error: fetchError } = await supabase
    .from('parking_lot')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', userId)
    .single();

  if (fetchError || !item) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  // Update parking lot item status to reactivated
  const { data, error } = await supabase
    .from('parking_lot')
    .update({
      status: 'reactivated',
      updated_at: new Date().toISOString(),
    })
    .eq('id', params.id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // If linked to an artifact, restore it to active
  if (item.artifact_id) {
    await supabase
      .from('architecture_artifacts')
      .update({
        lifecycle_status: 'active',
        updated_at: new Date().toISOString(),
      })
      .eq('id', item.artifact_id)
      .eq('user_id', userId);
  }

  return NextResponse.json({ item: dbParkingToParking(data) });
}
