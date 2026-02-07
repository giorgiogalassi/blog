import type { Metadata } from 'next';

import { getSpeakerSessions } from '@/lib/sessionize';

export const metadata: Metadata = {
  title: 'Sessions',
  description: 'A dynamic list of conference sessions from Sessionize.'
};

export default async function SessionsPage() {
  const sessions = await getSpeakerSessions();

  return (
    <section className="page container">
      <h1>Conference sessions</h1>
      <p className="lead">
        This list is generated automatically from Sessionize to keep talks and events always up to
        date.
      </p>

      <div className="card-list">
        {sessions.map((session) => (
          <article key={session.id} className="card">
            <h2>{session.title}</h2>

            <p className="card-meta">
              {session.eventName}
              {session.startsAt
                ? ` · ${new Date(session.startsAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}`
                : ''}
            </p>

            <p>{session.description}</p>

            {session.categories.length > 0 ? (
              <ul className="category-list" aria-label="Session categories">
                {session.categories.map((category) => (
                  <li key={`${session.id}-${category}`} className="category-pill">
                    {category}
                  </li>
                ))}
              </ul>
            ) : null}

            {session.eventUrl ? (
              <a href={session.eventUrl} className="button-link" target="_blank" rel="noreferrer">
                Visit event
              </a>
            ) : null}
          </article>
        ))}
      </div>

      {sessions.length === 0 ? (
        <p className="note">
          No sessions are currently available from Sessionize. Check API availability.
        </p>
      ) : null}
    </section>
  );
}
