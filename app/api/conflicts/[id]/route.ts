import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { dbConflictToConflict } from '@/lib/types/conflicts';

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

  // Get conflict with artifact names
  const { data, error } = await supabase
    .from('architecture_conflicts')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Conflict not found' }, { status: 404 });
  }

  const conflict = dbConflictToConflict(data);

  // Fetch artifact names
  const artifactIds = [conflict.artifactAId, conflict.artifactBId].filter(Boolean);
  const { data: artifacts } = await supabase
    .from('architecture_artifacts')
    .select('id, artifact_name')
    .in('id', artifactIds);

  const artifactNames: Record<string, string> = {};
  (artifacts || []).forEach((a: Record<string, unknown>) => {
    artifactNames[a.id as string] = a.artifact_name as string;
  });

  return NextResponse.json({
    conflict,
    artifactNames,
  });
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
  if (body.resolutionStatus !== undefined) {
    updateFields.resolution_status = body.resolutionStatus;
    if (['resolved', 'accepted_risk'].includes(body.resolutionStatus)) {
      updateFields.resolved_by = userId;
      updateFields.resolved_at = new Date().toISOString();
    }
  }
  if (body.resolutionNotes !== undefined) updateFields.resolution_notes = body.resolutionNotes;
  if (body.severity !== undefined) updateFields.severity = body.severity;

  const { data, error } = await supabase
    .from('architecture_conflicts')
    .update(updateFields)
    .eq('id', params.id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ conflict: dbConflictToConflict(data) });
}
