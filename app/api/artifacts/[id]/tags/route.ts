import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { userId, orgId } = await auth();
  if (!userId || !orgId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const body = await request.json();

  const { data, error } = await supabase
    .from('architecture_domain_tags')
    .upsert({
      artifact_id: params.id,
      domain: body.domain,
      sub_domain: body.subDomain || null,
      archimate_element_type: body.archimateElementType || null,
      tag_source: 'human',
      confidence: 1.0,
      tagged_by: userId,
      reasoning: body.reasoning || null,
    }, { onConflict: 'artifact_id,domain,sub_domain' })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ tag: data }, { status: 201 });
}
