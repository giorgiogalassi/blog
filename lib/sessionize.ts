import { cache } from 'react';

const SESSIONIZE_SPEAKER_URL = 'https://sessionize.com/api/speaker/json/s6re7whhdo';

type SessionizeSession = {
  id?: string | number;
  title?: string;
  description?: string;
  sessionUrl?: string;
  language?: string;
  eventStartDate?: string;
  startsAt?: string;
  date?: string;
};

type SessionizeEvent = {
  id?: string | number;
  name?: string;
  eventStartDate?: string;
  eventEndDate?: string;
  location?: string;
  website?: string | null;
};

type SessionizeSpeakerResponse = {
  sessions?: SessionizeSession[];
  events?: SessionizeEvent[];
};

export type SpeakerSession = {
  id: string;
  title: string;
  description: string;
  url: string | null;
  language: string | null;
  year: number | null;
};

export type SpeakerEvent = {
  id: string;
  name: string;
  startsAt: string | null;
  endsAt: string | null;
  location: string | null;
  url: string | null;
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const getSessionizeSpeakerData = cache(async (): Promise<SessionizeSpeakerResponse> => {
  try {
    const response = await fetch(SESSIONIZE_SPEAKER_URL, {
      next: { revalidate: 1800 }
    });

    if (!response.ok) {
      return {};
    }

    return (await response.json()) as SessionizeSpeakerResponse;
  } catch {
    return {};
  }
});

function getYearFromDate(date: string | undefined) {
  if (!date) {
    return null;
  }

  const year = new Date(date).getFullYear();
  return Number.isFinite(year) ? year : null;
}

function mapToSpeakerSession(session: SessionizeSession): SpeakerSession {
  const title = session.title?.trim() || 'Untitled session';

  return {
    id: String(session.id ?? toSlug(title)),
    title,
    description: session.description?.trim() || 'No description available for this session yet.',
    url: session.sessionUrl ?? null,
    language: session.language ?? null,
    year: getYearFromDate(session.eventStartDate ?? session.startsAt ?? session.date)
  };
}

function mapToSpeakerEvent(event: SessionizeEvent): SpeakerEvent {
  const name = event.name?.trim() || 'Unnamed event';

  return {
    id: String(event.id ?? toSlug(name)),
    name,
    startsAt: event.eventStartDate ?? null,
    endsAt: event.eventEndDate ?? null,
    location: event.location ?? null,
    url: event.website ?? null
  };
}

export async function getSpeakerContent(): Promise<{ sessions: SpeakerSession[]; events: SpeakerEvent[] }> {
  const payload = await getSessionizeSpeakerData();

  return {
    sessions: (payload.sessions ?? []).map(mapToSpeakerSession),
    events: (payload.events ?? []).map(mapToSpeakerEvent)
  };
}

export async function getSpeakerSessions(): Promise<SpeakerSession[]> {
  const content = await getSpeakerContent();
  return content.sessions;
}

export async function getSpeakerEvents(): Promise<SpeakerEvent[]> {
  const content = await getSpeakerContent();
  return content.events;
}

export async function getSpeakerSessionsByYear(year: number): Promise<SpeakerSession[]> {
  const sessions = await getSpeakerSessions();

  return sessions.filter((session) => session.year === year);
}

export async function getSpeakerSessionYears(): Promise<number[]> {
  const sessions = await getSpeakerSessions();

  return [...new Set(sessions.map((session) => session.year).filter((year): year is number => year !== null))].sort((a, b) => b - a);
}
