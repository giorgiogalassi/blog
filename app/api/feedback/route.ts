import { NextResponse } from 'next/server';

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

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let payload: FeedbackPayload;

  try {
    payload = (await request.json()) as FeedbackPayload;
  } catch {
    return NextResponse.json({ message: 'Invalid request payload.' }, { status: 400 });
  }

  if (payload.websiteField?.trim()) {
    return NextResponse.json({ message: 'Thanks for your feedback.' }, { status: 200 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const sessionId = payload.sessionId?.trim();
  const feedback = payload.feedback?.trim();
  const rating = payload.rating;

  if (!name || !email || !sessionId || !feedback) {
    return NextResponse.json({ message: 'Please fill in all required fields.' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ message: 'Please provide a valid email.' }, { status: 400 });
  }

  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json({ message: 'Rating must be between 1 and 5.' }, { status: 400 });
  }

  const submittedAt = new Date().toISOString();

  console.log('[feedback] New speech feedback received', {
    submittedAt,
    name,
    email,
    sessionId,
    sessionTitle: payload.sessionTitle?.trim() ?? null,
    year: payload.year ?? null,
    rating,
    feedback
  });

  return NextResponse.json({ message: 'Thanks! Your feedback has been sent successfully.' }, { status: 200 });
}
