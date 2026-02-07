import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { dbArtifactToArtifact } from '@/lib/types/artifacts';

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
    .from('architecture_artifacts')
    .select('*, architecture_domain_tags(*), principle_compliance(*, architecture_principles(*))')
    .eq('id', params.id)
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Artifact not found' }, { status: 404 });
  }

  return NextResponse.json({ artifact: dbArtifactToArtifact(data) });
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
  if (body.artifactName !== undefined) updateFields.artifact_name = body.artifactName;
  if (body.artifactDescription !== undefined) updateFields.artifact_description = body.artifactDescription;
  if (body.lifecycleStatus !== undefined) updateFields.lifecycle_status = body.lifecycleStatus;
  if (body.pcfCategoryId !== undefined) updateFields.pcf_category_id = body.pcfCategoryId;
  if (body.pcfCategoryName !== undefined) updateFields.pcf_category_name = body.pcfCategoryName;
  if (body.humanValidated !== undefined) {
    updateFields.human_validated = body.humanValidated;
    updateFields.validated_by = userId;
    updateFields.validated_at = new Date().toISOString();
  }
  if (body.metadata !== undefined) updateFields.metadata = body.metadata;

  const { data, error } = await supabase
    .from('architecture_artifacts')
    .update(updateFields)
    .eq('id', params.id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ artifact: dbArtifactToArtifact(data) });
}
