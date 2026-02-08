import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ links: [] });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { searchParams } = new URL(request.url);
  const artifactId = searchParams.get('artifactId');

  let query = supabase
    .from('requirement_gap_links')
    .select(`
      *,
      requirement:architecture_artifacts!requirement_artifact_id(id, artifact_name, lifecycle_status, user_id),
      gap:architecture_artifacts!gap_artifact_id(id, artifact_name, lifecycle_status, user_id)
    `)
    .eq('status', 'active');

  if (artifactId) {
    query = query.or(`requirement_artifact_id.eq.${artifactId},gap_artifact_id.eq.${artifactId}`);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Filter to only this user's artifacts
  const links = (data || []).filter(
    (link: Record<string, unknown>) => {
      const req = link.requirement as Record<string, unknown> | null;
      const gap = link.gap as Record<string, unknown> | null;
      return (req && req.user_id === userId) || (gap && gap.user_id === userId);
    }
  );

  return NextResponse.json({ links });
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
  const { requirementArtifactId, gapArtifactId, linkType, capabilityImpact } = body;

  if (!requirementArtifactId || !gapArtifactId || !linkType) {
    return NextResponse.json(
      { error: 'requirementArtifactId, gapArtifactId, and linkType are required' },
      { status: 400 }
    );
  }

  const validTypes = ['addresses', 'partially_addresses', 'blocks', 'supersedes'];
  if (!validTypes.includes(linkType)) {
    return NextResponse.json({ error: 'Invalid linkType' }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Verify both artifacts belong to user
  const { data: artifacts } = await supabase
    .from('architecture_artifacts')
    .select('id')
    .eq('user_id', userId)
    .in('id', [requirementArtifactId, gapArtifactId]);

  if (!artifacts || artifacts.length < 2) {
    return NextResponse.json({ error: 'Artifacts not found' }, { status: 404 });
  }

  const { data, error } = await supabase
    .from('requirement_gap_links')
    .upsert(
      {
        requirement_artifact_id: requirementArtifactId,
        gap_artifact_id: gapArtifactId,
        link_type: linkType,
        capability_impact: capabilityImpact || {},
        status: 'active',
      },
      { onConflict: 'requirement_artifact_id,gap_artifact_id' }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // If the link type is 'addresses' and the requirement is completed/archived,
  // update the gap's capability maturity score
  if (linkType === 'addresses') {
    await updateCapabilityMaturity(supabase, userId, gapArtifactId);
  }

  return NextResponse.json({ link: data }, { status: 201 });
}

async function updateCapabilityMaturity(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: any,
  userId: string,
  gapArtifactId: string
) {
  try {
    // Get the gap artifact's PCF category
    const { data: gap } = await supabase
      .from('architecture_artifacts')
      .select('pcf_category_id')
      .eq('id', gapArtifactId)
      .single();

    if (!gap?.pcf_category_id) return;

    // Count how many requirements address this gap are completed
    const { data: links } = await supabase
      .from('requirement_gap_links')
      .select(`
        link_type,
        requirement:architecture_artifacts!requirement_artifact_id(lifecycle_status)
      `)
      .eq('gap_artifact_id', gapArtifactId)
      .eq('status', 'active');

    const total = (links || []).length;
    const completed = (links || []).filter(
      (l: Record<string, unknown>) => {
        const req = l.requirement as Record<string, unknown> | null;
        return req && req.lifecycle_status === 'archived';
      }
    ).length;

    if (total === 0) return;

    // Map completion ratio to maturity score (0-5)
    const ratio = completed / total;
    const newScore = Math.min(5, Math.round(ratio * 5));
    const newMaturity = ratio >= 0.8 ? 'green' : ratio >= 0.4 ? 'yellow' : 'red';

    await supabase
      .from('capability_map')
      .update({
        maturity_score: newScore,
        maturity_current: newMaturity,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('pcf_id', gap.pcf_category_id);
  } catch {
    // Non-blocking
  }
}
