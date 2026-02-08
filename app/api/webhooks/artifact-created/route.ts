import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { validateWebhookRequest } from '@/lib/webhooks/hmac';
import { AUTO_TAG_RULES, HUMAN_VALIDATION_THRESHOLD } from '@/lib/tagging/tag-rules';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('x-webhook-signature');

  const validation = validateWebhookRequest(body, signature);
  if (!validation.valid) {
    return NextResponse.json(
      { error: validation.error },
      { status: 401 }
    );
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
  }

  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const {
    userId,
    sourceModule,
    sourceEntityType,
    sourceEntityId,
    artifactName,
    artifactDescription,
    pcfCategoryId,
    pcfCategoryName,
    metadata,
  } = payload;

  if (!userId || !sourceModule || !sourceEntityType || !sourceEntityId || !artifactName) {
    return NextResponse.json(
      { error: 'Missing required fields: userId, sourceModule, sourceEntityType, sourceEntityId, artifactName' },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Create the artifact
  const { data: artifact, error: createError } = await supabase
    .from('architecture_artifacts')
    .upsert(
      {
        user_id: userId,
        source_module: sourceModule,
        source_entity_type: sourceEntityType,
        source_entity_id: sourceEntityId,
        artifact_name: artifactName,
        artifact_description: artifactDescription || null,
        pcf_category_id: pcfCategoryId || null,
        pcf_category_name: pcfCategoryName || null,
        lifecycle_status: 'active',
        metadata: metadata || {},
      },
      { onConflict: 'user_id,source_module,source_entity_type,source_entity_id' }
    )
    .select()
    .single();

  if (createError) {
    return NextResponse.json({ error: createError.message }, { status: 500 });
  }

  // Auto-tag the artifact
  const ruleKey = `${sourceModule}:${sourceEntityType}`;
  const rule = AUTO_TAG_RULES[ruleKey];
  if (rule && artifact) {
    await supabase.from('architecture_domain_tags').upsert(
      {
        artifact_id: artifact.id,
        domain: rule.defaultDomain,
        sub_domain: rule.defaultSubDomain,
        tag_source: 'auto',
        confidence: rule.confidence,
        tagged_by: 'webhook_auto_tagger',
      },
      { onConflict: 'artifact_id,domain,sub_domain' }
    );

    // Update auto_tag_confidence on artifact
    const needsValidation = rule.confidence < HUMAN_VALIDATION_THRESHOLD;
    await supabase
      .from('architecture_artifacts')
      .update({
        auto_tag_confidence: rule.confidence,
        human_validated: !needsValidation,
      })
      .eq('id', artifact.id);
  }

  return NextResponse.json(
    { artifactId: artifact?.id, status: 'created' },
    { status: 201 }
  );
}
