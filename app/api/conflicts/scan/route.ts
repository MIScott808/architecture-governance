import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { runConflictScan } from '@/lib/conflicts/detector';

export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const summary = await runConflictScan(userId);
    return NextResponse.json({ summary });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Scan failed' },
      { status: 500 }
    );
  }
}
