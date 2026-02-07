import type { Metadata } from 'next';

import { getSpeakerContent, type SpeakerEvent } from '@/lib/sessionize';

export const metadata: Metadata = {
  title: 'Sessions',
  description: 'Sessions and events generated from Sessionize.'
};

function formatDate(value: string | null) {
  if (!value) {
    return null;
  }

  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function formatSessionDescription(description: string) {
  return description
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\r\n|\r|\n/g, '<br />');
}

function getEventYear(event: SpeakerEvent) {
  const referenceDate = event.startsAt ?? event.endsAt;

  if (!referenceDate) {
    return 'Unknown';
  }

  return String(new Date(referenceDate).getFullYear());
}

function groupEventsByYear(events: SpeakerEvent[]) {
  const grouped = new Map<string, SpeakerEvent[]>();

  for (const event of events) {
    const year = getEventYear(event);
    const current = grouped.get(year) ?? [];
    current.push(event);
    grouped.set(year, current);
  }

  return [...grouped.entries()].sort(([yearA], [yearB]) => yearB.localeCompare(yearA));
}

export default async function SessionsPage() {
  const { sessions, events } = await getSpeakerContent();
  const groupedEvents = groupEventsByYear(events);

  return (
    <section className="page container">
      <h1>Speaking</h1>
      <p className="lead">Sessions and events are synced automatically from Sessionize.</p>

      <details open className="card" style={{ marginTop: '1rem' }}>
        <summary>
          <strong>Sessions ({sessions.length})</strong>
        </summary>

        <div className="card-list">
          {sessions.map((session) => (
            <article key={session.id} className="card">
              <h2>{session.title}</h2>
              {session.language ? <p className="card-meta">Language: {session.language}</p> : null}
              <p dangerouslySetInnerHTML={{ __html: formatSessionDescription(session.description) }} />
              {session.url ? (
                <a href={session.url} className="button-link" target="_blank" rel="noreferrer">
                  View session
                </a>
              ) : null}
            </article>
          ))}

          {sessions.length === 0 ? <p className="note">No sessions available.</p> : null}
        </div>
      </details>

      <section style={{ marginTop: '1rem' }}>
        <h2>Events</h2>

        {groupedEvents.map(([year, yearEvents], index) => (
          <details key={year} open={index === 0} className="card" style={{ marginTop: '1rem' }}>
            <summary>
              <strong>
                {year} ({yearEvents.length})
              </strong>
            </summary>

            <div className="card-list">
              {yearEvents.map((event) => (
                <article key={event.id} className="card">
                  <h3>{event.name}</h3>
                  <p className="card-meta">
                    {formatDate(event.startsAt)}
                    {event.endsAt && event.endsAt !== event.startsAt ? ` - ${formatDate(event.endsAt)}` : ''}
                  </p>
                  {event.location ? <p>{event.location}</p> : null}
                  {event.url ? (
                    <a href={event.url} className="button-link" target="_blank" rel="noreferrer">
                      Visit event
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          </details>
        ))}

        {events.length === 0 ? <p className="note">No events available.</p> : null}
      </section>
    </section>
  );
}
