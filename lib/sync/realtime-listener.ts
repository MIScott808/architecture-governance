/**
 * Supabase Realtime Subscription Listener
 *
 * DEFERRED: Supabase Realtime requires persistent WebSocket connections,
 * which are incompatible with Vercel's serverless architecture.
 *
 * To implement this, you would need one of:
 * 1. A Supabase Edge Function that maintains the WebSocket connection
 * 2. A dedicated long-running process (e.g., on Railway, Fly.io, or a VPS)
 * 3. Client-side Realtime subscriptions (limited to browser sessions)
 *
 * The implementation below is commented out but ready for when a
 * persistent runtime is available.
 */

// import { createClient } from '@supabase/supabase-js';
// import { processArtifactMutation } from './event-processor';
//
// export function setupRealtimeSubscriptions() {
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.SUPABASE_SERVICE_ROLE_KEY!
//   );
//
//   const channel = supabase.channel('aga-module-sync')
//     .on('postgres_changes',
//       { event: '*', schema: 'public', table: 'initiatives' },
//       (payload) => processArtifactMutation('initiative_planner', 'initiative', payload))
//     .on('postgres_changes',
//       { event: '*', schema: 'public', table: 'gap_assessments' },
//       (payload) => processArtifactMutation('strategic_compass', 'gap', payload))
//     .on('postgres_changes',
//       { event: '*', schema: 'public', table: 'requirements' },
//       (payload) => processArtifactMutation('requirements_manager', 'requirement', payload))
//     .subscribe((status) => {
//       console.log('Realtime subscription status:', status);
//     });
//
//   return () => {
//     supabase.removeChannel(channel);
//   };
// }

export function setupRealtimeSubscriptions(): () => void {
  console.warn(
    'AGA Realtime: Subscriptions are deferred. ' +
    'Supabase Realtime requires persistent connections not supported by Vercel serverless.'
  );
  return () => {};
}
