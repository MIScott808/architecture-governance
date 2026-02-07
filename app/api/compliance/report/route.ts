import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ report: [] });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Get all principles for this user
  const { data: principles } = await supabase
    .from('architecture_principles')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .order('priority', { ascending: true });

  if (!principles || principles.length === 0) {
    return NextResponse.json({ report: [] });
  }

  // Get all compliance records for this user's artifacts
  const { data: compliance } = await supabase
    .from('principle_compliance')
    .select('*, architecture_artifacts!inner(user_id)')
    .eq('architecture_artifacts.user_id', userId);

  // Aggregate per principle
  const report = principles.map(p => {
    const records = (compliance || []).filter(c => c.principle_id === p.id);
    const total = records.length;
    const compliant = records.filter(c => c.compliance_status === 'compliant').length;
    const nonCompliant = records.filter(c => c.compliance_status === 'non_compliant').length;
    const exceptions = records.filter(c => c.compliance_status === 'exception_granted').length;
    const notApplicable = records.filter(c => c.compliance_status === 'not_applicable').length;
    const assessed = total - notApplicable;
    const complianceRate = assessed > 0 ? Math.round((compliant / assessed) * 100) : null;

    return {
      principleId: p.id,
      principleName: p.principle_name,
      domain: p.domain,
      priority: p.priority,
      total,
      compliant,
      nonCompliant,
      exceptions,
      notApplicable,
      complianceRate,
    };
  });

  return NextResponse.json({ report });
}
