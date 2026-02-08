import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { validateWebhookRequest } from '@/lib/webhooks/hmac';

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
    updates,
  } = payload;

  if (!userId || !sourceModule || !sourceEntityType || !sourceEntityId || !updates) {
    return NextResponse.json(
      { error: 'Missing required fields: userId, sourceModule, sourceEntityType, sourceEntityId, updates' },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Find the existing artifact
  const { data: existing } = await supabase
    .from('architecture_artifacts')
    .select('id')
    .eq('user_id', userId)
    .eq('source_module', sourceModule)
    .eq('source_entity_type', sourceEntityType)
    .eq('source_entity_id', sourceEntityId)
    .single();

  if (!existing) {
    return NextResponse.json({ error: 'Artifact not found' }, { status: 404 });
  }

  // Build update object — only allow certain fields
  const allowedFields: Record<string, string> = {
    artifactName: 'artifact_name',
    artifactDescription: 'artifact_description',
    pcfCategoryId: 'pcf_category_id',
    pcfCategoryName: 'pcf_category_name',
    metadata: 'metadata',
  };

  const dbUpdates: Record<string, unknown> = { updated_at: new Date().toISOString() };
  for (const [key, dbKey] of Object.entries(allowedFields)) {
    if (updates[key] !== undefined) {
      dbUpdates[dbKey] = updates[key];
    }
  }

  const { error: updateError } = await supabase
    .from('architecture_artifacts')
    .update(dbUpdates)
    .eq('id', existing.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ artifactId: existing.id, status: 'updated' });
}
