import { NextResponse } from 'next/server';

import { articleRedirectMap } from '@/data/articles';

// Next.js 16 route context types model dynamic `params` as a Promise in generated
// type checks (`.next/types/...`). Keep this signature to avoid build-time mismatch.
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const target = articleRedirectMap[slug];

  if (!target) {
    return NextResponse.json({ error: 'Slug not found' }, { status: 404 });
  }

  // 302 keeps flexibility while links remain stable through /go/[slug].
  return NextResponse.redirect(target, 302);
}
