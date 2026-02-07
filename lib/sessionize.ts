const SESSIONIZE_SPEAKER_URL = 'https://sessionize.com/api/speaker/json/s6re7whhdo';

type SessionizeCategory = {
  name?: string;
  categoryItems?: string[];
};

type SessionizeSession = {
  id?: string;
  title?: string;
  description?: string;
  startsAt?: string;
  eventName?: string;
  eventWebsite?: string;
  eventUrl?: string;
  categories?: SessionizeCategory[];
};

type SessionizeSpeakerResponse = {
  sessions?: SessionizeSession[];
};

type SessionizeSpeakerEventResponse = {
  event?: {
    name?: string;
    website?: string;
  };
  sessions?: SessionizeSession[];
};

export type SpeakerSession = {
  id: string;
  title: string;
  description: string;
  startsAt: string | null;
  eventName: string;
  eventUrl: string | null;
  categories: string[];
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function extractCategories(categories: SessionizeCategory[] | undefined) {
  if (!categories) {
    return [];
  }

  return categories.flatMap((category) => category.categoryItems ?? []);
}

function mapToSpeakerSession(
  session: SessionizeSession,
  defaults?: { eventName?: string; eventUrl?: string }
): SpeakerSession {
  const title = session.title?.trim() || 'Untitled session';
  const eventName = session.eventName?.trim() || defaults?.eventName?.trim() || 'Conference event';
  const eventUrl = session.eventWebsite ?? session.eventUrl ?? defaults?.eventUrl ?? null;

  return {
    id: session.id?.trim() || toSlug(`${title}-${eventName}`),
    title,
    description: session.description?.trim() || 'No description available for this session yet.',
    startsAt: session.startsAt ?? null,
    eventName,
    eventUrl,
    categories: extractCategories(session.categories)
  };
}

export async function getSpeakerSessions(): Promise<SpeakerSession[]> {
  try {
    const response = await fetch(SESSIONIZE_SPEAKER_URL, {
      next: { revalidate: 1800 }
    });

    // In build/prerender environments the endpoint can be blocked (e.g. 403).
    // Returning an empty list keeps the page renderable and avoids hard failures.
    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as
      | SessionizeSpeakerResponse
      | SessionizeSpeakerEventResponse[];

    if (Array.isArray(payload)) {
      return payload.flatMap((entry) => {
        const eventName = entry.event?.name;
        const eventUrl = entry.event?.website;

        return (entry.sessions ?? []).map((session) =>
          mapToSpeakerSession(session, { eventName, eventUrl })
        );
      });
    }

    if (!payload.sessions) {
      return [];
    }

    return payload.sessions.map((session) => mapToSpeakerSession(session));
  } catch {
    return [];
  }
}
