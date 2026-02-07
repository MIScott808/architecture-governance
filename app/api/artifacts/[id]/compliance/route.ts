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
    return NextResponse.json({ compliance: [] });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Verify artifact belongs to user
  const { data: artifact } = await supabase
    .from('architecture_artifacts')
    .select('id')
    .eq('id', params.id)
    .eq('user_id', userId)
    .single();

  if (!artifact) {
    return NextResponse.json({ error: 'Artifact not found' }, { status: 404 });
  }

  const { data, error } = await supabase
    .from('principle_compliance')
    .select('*, architecture_principles(*)')
    .eq('artifact_id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ compliance: data || [] });
}

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
  const body = await request.json();

  // Verify artifact belongs to user
  const { data: artifact } = await supabase
    .from('architecture_artifacts')
    .select('id')
    .eq('id', params.id)
    .eq('user_id', userId)
    .single();

  if (!artifact) {
    return NextResponse.json({ error: 'Artifact not found' }, { status: 404 });
  }

  const { data, error } = await supabase
    .from('principle_compliance')
    .upsert({
      artifact_id: params.id,
      principle_id: body.principleId,
      compliance_status: body.complianceStatus,
      exception_reason: body.exceptionReason || null,
      exception_expiry: body.exceptionExpiry || null,
      assessed_by: userId,
      assessed_at: new Date().toISOString(),
    }, { onConflict: 'artifact_id,principle_id' })
    .select('*, architecture_principles(*)')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ compliance: data }, { status: 201 });
}
