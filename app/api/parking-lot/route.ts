import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { dbParkingToParking } from '@/lib/types/parking-lot';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ items: [] });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const itemType = searchParams.get('type');

  let query = supabase
    .from('parking_lot')
    .select('*')
    .eq('user_id', userId);

  if (status) query = query.eq('status', status);
  if (itemType) query = query.eq('item_type', itemType);

  const { data, error } = await query.order('parked_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const items = (data || []).map((row: Record<string, unknown>) => dbParkingToParking(row));
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const body = await request.json();

  const { data, error } = await supabase
    .from('parking_lot')
    .insert({
      user_id: userId,
      artifact_id: body.artifactId || null,
      item_type: body.itemType,
      item_name: body.itemName,
      item_description: body.itemDescription || null,
      source_module: body.sourceModule || null,
      source_entity_id: body.sourceEntityId || null,
      reason_parked: body.reasonParked,
      parked_by: userId,
      review_date: body.reviewDate || null,
      priority_when_parked: body.priorityWhenParked || null,
      estimated_effort: body.estimatedEffort || null,
      affected_capabilities: body.affectedCapabilities || [],
      affected_domains: body.affectedDomains || [],
      dependency_ids: body.dependencyIds || [],
      conflict_ids: body.conflictIds || [],
      reactivation_criteria: body.reactivationCriteria || null,
      metadata: body.metadata || {},
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Optionally set artifact to parking_lot status
  if (body.artifactId) {
    await supabase
      .from('architecture_artifacts')
      .update({
        lifecycle_status: 'parking_lot',
        updated_at: new Date().toISOString(),
      })
      .eq('id', body.artifactId)
      .eq('user_id', userId);
  }

  return NextResponse.json({ item: dbParkingToParking(data) }, { status: 201 });
}
