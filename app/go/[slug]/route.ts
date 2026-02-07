import { NextResponse } from 'next/server';

import { articleRedirectMap } from '@/data/articles';

export function GET(_request: Request, { params }: { params: { slug: string } }) {
  const target = articleRedirectMap[params.slug];

  if (!target) {
    return NextResponse.json({ error: 'Slug not found' }, { status: 404 });
  }

  // 302 keeps flexibility while links remain stable through /go/[slug].
  return NextResponse.redirect(target, 302);
}
