import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

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
  const body = await request.json();
  const { confirmed, correctedDomain, correctedSubDomain } = body;

  // Verify artifact belongs to user
  const { data: artifact, error: fetchError } = await supabase
    .from('architecture_artifacts')
    .select('id')
    .eq('id', params.id)
    .eq('user_id', userId)
    .single();

  if (fetchError || !artifact) {
    return NextResponse.json({ error: 'Artifact not found' }, { status: 404 });
  }

  if (confirmed) {
    // Confirm auto-tags as correct — mark validated
    await supabase
      .from('architecture_artifacts')
      .update({
        human_validated: true,
        validated_by: userId,
        validated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id);
  } else if (correctedDomain) {
    // Correct the domain tag
    await supabase
      .from('architecture_domain_tags')
      .upsert({
        artifact_id: params.id,
        domain: correctedDomain,
        sub_domain: correctedSubDomain || null,
        tag_source: 'human',
        confidence: 1.0,
        tagged_by: userId,
        reasoning: 'Human-corrected classification',
      }, { onConflict: 'artifact_id,domain,sub_domain' })
      .select();

    // Mark artifact as validated
    await supabase
      .from('architecture_artifacts')
      .update({
        human_validated: true,
        validated_by: userId,
        validated_at: new Date().toISOString(),
        auto_tag_confidence: 1.0,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id);
  }

  return NextResponse.json({ success: true });
}
