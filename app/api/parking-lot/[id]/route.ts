import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { dbParkingToParking } from '@/lib/types/parking-lot';

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
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { data, error } = await supabase
    .from('parking_lot')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  return NextResponse.json({ item: dbParkingToParking(data) });
}

export async function PATCH(
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
  const body = await request.json();

  const updateFields: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (body.status !== undefined) updateFields.status = body.status;
  if (body.reviewDate !== undefined) updateFields.review_date = body.reviewDate;
  if (body.reactivationCriteria !== undefined) updateFields.reactivation_criteria = body.reactivationCriteria;
  if (body.itemDescription !== undefined) updateFields.item_description = body.itemDescription;
  if (body.reasonParked !== undefined) updateFields.reason_parked = body.reasonParked;

  const { data, error } = await supabase
    .from('parking_lot')
    .update(updateFields)
    .eq('id', params.id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ item: dbParkingToParking(data) });
}
