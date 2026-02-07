import type { Metadata } from 'next';

import { getSpeakerContent } from '@/lib/sessionize';

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

export default async function SessionsPage() {
  const { sessions, events } = await getSpeakerContent();

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
              <p>{session.description}</p>
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

      <details className="card" style={{ marginTop: '1rem' }}>
        <summary>
          <strong>Events ({events.length})</strong>
        </summary>

        <div className="card-list">
          {events.map((event) => (
            <article key={event.id} className="card">
              <h2>{event.name}</h2>
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

          {events.length === 0 ? <p className="note">No events available.</p> : null}
        </div>
      </details>
    </section>
  );
}
