import { NextRequest, NextResponse } from 'next/server';

import { siteConfig } from '@/config/site';

type ContactPayload = {
  requestType?: string;
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  website?: string;
  projectSummary?: string;
  projectLink?: string;
  deadline?: string;
  budgetRange?: string;
  engagementType?: string;
  startPreference?: string;
  topic?: string;
  stack?: string;
  painPoints?: string[];
  accessToAnalytics?: string;
  currentState?: string;
  designSource?: string;
  tech?: string;
  componentsCount?: string;
  level?: string;
  goals?: string;
  frequency?: string;
  eventName?: string;
  eventDate?: string;
  location?: string;
  audienceSize?: string;
  feeBudget?: string;
  message?: string;
  materialsLink?: string;
  privacyAccepted?: boolean;
  websiteField?: string;
};

const rateLimitStore = new Map<string, { attempts: number; resetAt: number }>();
const RATE_LIMIT = { maxAttempts: 5, windowMs: 10 * 60 * 1000 };

const summaryRequiredTypes = new Set(['NewProject', 'PerformanceAudit', 'DesignSystem']);

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: 'You sent too many requests in a short time. Please try again in a few minutes.' },
      { status: 429 }
    );
  }

  const body = (await request.json()) as ContactPayload;

  if (body.websiteField) {
    return NextResponse.json({ message: 'Request received.' }, { status: 200 });
  }

  const validation = validatePayload(body);
  if (!validation.ok) {
    return NextResponse.json({ message: validation.message }, { status: 400 });
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const timestamp = new Date().toISOString();

  const ownerMessage = formatOwnerMessage(body, { timezone, timestamp });

  await Promise.all([
    sendEmail({
      to: process.env.CONTACT_TO_EMAIL ?? siteConfig.email,
      subject: `[Contact] ${body.requestType} — ${body.name}`,
      text: ownerMessage,
      replyTo: body.email
    }),
    sendEmail({
      to: body.email ?? '',
      subject: 'Request received ✅',
      text: `Hi ${body.name},\n\nI received your request and I'll reply within 2 business days with concrete next steps.\n\nTalk soon,\nGiorgio`
    })
  ]);

  return NextResponse.json({ message: 'Request received! I'll reply within 2 business days.' }, { status: 200 });
}

function validatePayload(body: ContactPayload): { ok: true } | { ok: false; message: string } {
  if (!body.requestType) {
    return { ok: false, message: 'Select a request type.' };
  }

  if (!body.name?.trim() || !body.email?.trim()) {
    return { ok: false, message: 'Name and email are required.' };
  }

  if (!/^\S+@\S+\.\S+$/.test(body.email)) {
    return { ok: false, message: 'Enter a valid email address.' };
  }

  if (!body.privacyAccepted) {
    return { ok: false, message: 'You must accept the privacy policy to continue.' };
  }

  if (summaryRequiredTypes.has(body.requestType) && !body.projectSummary?.trim()) {
    return { ok: false, message: 'Add a project summary.' };
  }

  if (body.requestType === 'PerformanceAudit' && !body.projectLink?.trim()) {
    return { ok: false, message: 'A project link is required for a performance audit.' };
  }

  if (body.requestType === 'Consulting' && !body.topic?.trim()) {
    return { ok: false, message: 'Specify the consulting topic.' };
  }

  if (body.requestType === 'Mentoring' && !body.goals?.trim()) {
    return { ok: false, message: 'Describe your mentoring goals.' };
  }

  if (body.requestType === 'TalkEvent' && (!body.eventName?.trim() || !body.eventDate?.trim() || !body.topic?.trim())) {
    return { ok: false, message: 'Fill in event name, date, and topic.' };
  }

  if (body.requestType === 'Other' && !body.message?.trim()) {
    return { ok: false, message: 'Enter a descriptive message.' };
  }

  return { ok: true };
}

function formatOwnerMessage(body: ContactPayload, context: { timezone: string; timestamp: string }) {
  const lines = [
    `Request type: ${body.requestType ?? '-'}`,
    `Name/Email/Company: ${body.name ?? '-'} / ${body.email ?? '-'} / ${body.company ?? '-'}`,
    `Role: ${body.role ?? '-'}`,
    `Website: ${body.website ?? '-'}`,
    `Project link: ${body.projectLink ?? '-'}`,
    `Budget range: ${body.budgetRange ?? '-'}`,
    `Deadline / Start: ${body.deadline ?? '-'} / ${body.startPreference ?? '-'}`,
    `Engagement: ${body.engagementType ?? '-'}`,
    `Project summary: ${body.projectSummary ?? '-'}`,
    `Topic: ${body.topic ?? '-'}`,
    `Stack: ${body.stack ?? '-'}`,
    `Pain points: ${body.painPoints?.join(', ') || '-'}`,
    `Analytics access: ${body.accessToAnalytics ?? '-'}`,
    `Current state: ${body.currentState ?? '-'}`,
    `Design source: ${body.designSource ?? '-'}`,
    `Tech: ${body.tech ?? '-'}`,
    `Components count: ${body.componentsCount ?? '-'}`,
    `Mentoring level: ${body.level ?? '-'}`,
    `Goals mentoring: ${body.goals ?? '-'}`,
    `Mentoring frequency: ${body.frequency ?? '-'}`,
    `Event: ${body.eventName ?? '-'} / ${body.eventDate ?? '-'} / ${body.location ?? '-'}`,
    `Audience: ${body.audienceSize ?? '-'} | Fee budget: ${body.feeBudget ?? '-'}`,
    `Free message: ${body.message ?? '-'}`,
    `Materials link: ${body.materialsLink ?? '-'}`,
    `Timestamp: ${context.timestamp} (${context.timezone})`
  ];

  return lines.join('\n');
}

async function sendEmail({
  to,
  subject,
  text,
  replyTo
}: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !from || !to) {
    console.info('Email skipped: missing RESEND_API_KEY, CONTACT_FROM_EMAIL, or recipient.');
    return;
  }

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      reply_to: replyTo
    })
  });
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || 'unknown';
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimitStore.set(ip, { attempts: 1, resetAt: now + RATE_LIMIT.windowMs });
    return false;
  }

  entry.attempts += 1;
  rateLimitStore.set(ip, entry);
  return entry.attempts > RATE_LIMIT.maxAttempts;
}
