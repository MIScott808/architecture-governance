import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';
import { classifyArtifact, buildAutoTag } from '@/lib/tagging/auto-classifier';
import { dbArtifactToArtifact } from '@/lib/types/artifacts';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET(request: NextRequest) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ artifacts: [] });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { searchParams } = new URL(request.url);
  const sourceModule = searchParams.get('module');
  const status = searchParams.get('status');
  const domain = searchParams.get('domain');
  const pcfId = searchParams.get('pcfId');

  let query = supabase
    .from('architecture_artifacts')
    .select('*, architecture_domain_tags(*)')
    .eq('org_id', orgId);

  if (sourceModule) query = query.eq('source_module', sourceModule);
  if (status) query = query.eq('lifecycle_status', status);
  if (pcfId) query = query.eq('pcf_category_id', pcfId);

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let artifacts = (data || []).map((row: Record<string, unknown>) => {
    const artifact = dbArtifactToArtifact(row);
    const tags = Array.isArray(row.architecture_domain_tags)
      ? (row.architecture_domain_tags as Record<string, unknown>[])
      : [];
    artifact.tags = tags.map((t: Record<string, unknown>) => ({
      id: t.id as string,
      artifactId: t.artifact_id as string,
      domain: t.domain as 'business' | 'information' | 'technology',
      subDomain: t.sub_domain as string | undefined,
      archimateElementType: t.archimate_element_type as string | undefined,
      tagSource: t.tag_source as 'auto' | 'human' | 'ai_suggested' | 'inherited',
      confidence: t.confidence as number | undefined,
      taggedBy: t.tagged_by as string,
      reasoning: t.reasoning as string | undefined,
      createdAt: t.created_at as string,
    }));
    return artifact;
  });

  if (domain) {
    artifacts = artifacts.filter(a =>
      a.tags?.some(t => t.domain === domain)
    );
  }

  return NextResponse.json({ artifacts });
}

export async function POST(request: NextRequest) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const body = await request.json();

  const classification = classifyArtifact(body.sourceModule, body.sourceEntityType);

  const { data: artifact, error } = await supabase
    .from('architecture_artifacts')
    .insert({
      org_id: orgId,
      source_module: body.sourceModule,
      source_entity_type: body.sourceEntityType,
      source_entity_id: body.sourceEntityId,
      artifact_name: body.artifactName,
      artifact_description: body.artifactDescription || null,
      pcf_category_id: body.pcfCategoryId || null,
      pcf_category_name: body.pcfCategoryName || null,
      auto_tag_confidence: classification?.confidence || null,
      metadata: body.metadata || {},
    })
    .select()
    .single();

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Artifact already registered' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Auto-tag if classification exists
  if (classification && artifact) {
    const tag = buildAutoTag(artifact.id, classification, userId);
    await supabase.from('architecture_domain_tags').insert({
      artifact_id: tag.artifactId,
      domain: tag.domain,
      sub_domain: tag.subDomain,
      tag_source: tag.tagSource,
      confidence: tag.confidence,
      tagged_by: tag.taggedBy,
      reasoning: tag.reasoning,
    });
  }

  return NextResponse.json({ artifact: dbArtifactToArtifact(artifact) }, { status: 201 });
}
