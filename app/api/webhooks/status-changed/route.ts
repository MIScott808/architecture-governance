import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { validateWebhookRequest } from '@/lib/webhooks/hmac';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const VALID_STATUSES = ['active', 'archived', 'superseded', 'parking_lot'];

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
    newStatus,
  } = payload;

  if (!userId || !sourceModule || !sourceEntityType || !sourceEntityId || !newStatus) {
    return NextResponse.json(
      { error: 'Missing required fields: userId, sourceModule, sourceEntityType, sourceEntityId, newStatus' },
      { status: 400 }
    );
  }

  if (!VALID_STATUSES.includes(newStatus)) {
    return NextResponse.json(
      { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
      { status: 400 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Find the existing artifact
  const { data: existing } = await supabase
    .from('architecture_artifacts')
    .select('id, pcf_category_id')
    .eq('user_id', userId)
    .eq('source_module', sourceModule)
    .eq('source_entity_type', sourceEntityType)
    .eq('source_entity_id', sourceEntityId)
    .single();

  if (!existing) {
    return NextResponse.json({ error: 'Artifact not found' }, { status: 404 });
  }

  const { error: updateError } = await supabase
    .from('architecture_artifacts')
    .update({
      lifecycle_status: newStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', existing.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // If status changed to 'archived', check if this requirement has gap links
  // and update capability maturity accordingly (feedback loop)
  if (newStatus === 'archived') {
    try {
      const { data: gapLinks } = await supabase
        .from('requirement_gap_links')
        .select('gap_artifact_id')
        .eq('requirement_artifact_id', existing.id)
        .eq('status', 'active')
        .in('link_type', ['addresses', 'partially_addresses']);

      if (gapLinks && gapLinks.length > 0) {
        for (const link of gapLinks) {
          // Get gap's PCF category
          const { data: gap } = await supabase
            .from('architecture_artifacts')
            .select('pcf_category_id')
            .eq('id', link.gap_artifact_id)
            .single();

          if (gap?.pcf_category_id) {
            // Recalculate maturity from all linked requirements
            const { data: allLinks } = await supabase
              .from('requirement_gap_links')
              .select(`
                link_type,
                requirement:architecture_artifacts!requirement_artifact_id(lifecycle_status)
              `)
              .eq('gap_artifact_id', link.gap_artifact_id)
              .eq('status', 'active');

            const total = (allLinks || []).length;
            const completed = (allLinks || []).filter(
              (l: Record<string, unknown>) => {
                const req = l.requirement as Record<string, unknown> | null;
                return req && req.lifecycle_status === 'archived';
              }
            ).length;

            if (total > 0) {
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
            }
          }
        }
      }
    } catch {
      // Non-blocking
    }
  }

  return NextResponse.json({
    artifactId: existing.id,
    status: 'status_changed',
    newStatus,
  });
}
