import { NextRequest, NextResponse } from 'next/server';

import { createInMemoryRateLimiter } from '@/lib/api/rate-limit';
import { hasHoneypotValue, isValidEmail, toOptionalTrimmedValue } from '@/lib/api/validation';

type FeedbackPayload = {
  name?: string;
  email?: string;
  sessionId?: string;
  sessionTitle?: string;
  year?: number;
  rating?: number;
  feedback?: string;
  websiteField?: string;
};

const isRateLimited = createInMemoryRateLimiter({ maxAttempts: 10, windowMs: 10 * 60 * 1000 });

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const timestamp = new Date().toISOString();
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    console.warn({ route: '/api/feedback', event: 'rate_limited', requestId, timestamp });
    return NextResponse.json(
      { message: 'You sent too many requests in a short time. Please try again in a few minutes.' },
      { status: 429 }
    );
  }

  let payload: FeedbackPayload;

  try {
    payload = (await request.json()) as FeedbackPayload;
  } catch {
    console.warn({ route: '/api/feedback', event: 'invalid_json', requestId, timestamp });
    return NextResponse.json({ message: 'Invalid request payload.' }, { status: 400 });
  }

  if (hasHoneypotValue(payload.websiteField)) {
    console.info({ route: '/api/feedback', event: 'honeypot_triggered', requestId, timestamp });
    return NextResponse.json({ message: 'Thanks for your feedback.' }, { status: 200 });
  }

  const name = toOptionalTrimmedValue(payload.name);
  const email = toOptionalTrimmedValue(payload.email);
  const sessionId = toOptionalTrimmedValue(payload.sessionId);
  const sessionTitle = toOptionalTrimmedValue(payload.sessionTitle);
  const feedback = toOptionalTrimmedValue(payload.feedback);
  const rating = payload.rating;

  if (!sessionId || !feedback) {
    console.warn({ route: '/api/feedback', event: 'validation_failed', requestId, timestamp });
    return NextResponse.json({ message: 'Please fill in all required fields.' }, { status: 400 });
  }

  if (email && !isValidEmail(email)) {
    console.warn({ route: '/api/feedback', event: 'validation_failed', requestId, timestamp });
    return NextResponse.json(
      { message: 'Please provide a valid email address or leave it empty.' },
      { status: 400 }
    );
  }

  if (!rating || rating < 1 || rating > 5) {
    console.warn({ route: '/api/feedback', event: 'validation_failed', requestId, timestamp });
    return NextResponse.json({ message: 'Rating must be between 1 and 5.' }, { status: 400 });
  }

  console.info({
    route: '/api/feedback',
    event: 'feedback_accepted',
    requestId,
    timestamp,
    sessionId,
    sessionTitle,
    year: payload.year ?? null,
    rating,
    sender: { name, hasEmail: Boolean(email) }
  });

  return NextResponse.json(
    { message: 'Thanks! Your feedback has been sent successfully.' },
    { status: 200 }
  );
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || 'unknown';
}
