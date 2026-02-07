import { createClient } from '@supabase/supabase-js';
import { auth } from '@clerk/nextjs/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function createServerSupabase() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function getUserId(): Promise<string> {
  const { userId } = await auth();
  if (!userId) throw new Error('Not authenticated');
  return userId;
}
