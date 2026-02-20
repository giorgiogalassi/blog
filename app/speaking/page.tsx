import type { Metadata } from 'next';
import Link from 'next/link';

import { getSpeakerContent, type SpeakerEvent } from '@/lib/sessionize';
import { getEventSchema, toJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Speaking',
  description: 'Conference talks, workshops, and speaking availability.',
  openGraph: {
    title: 'Speaking',
    description: 'Talks, workshops, and event timeline powered by Sessionize data.',
    url: '/speaking',
    type: 'website'
  }
};

function formatDate(value: string | null) {
  if (!value) {
    return null;
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function getEventYear(event: SpeakerEvent) {
  const referenceDate = event.startsAt ?? event.endsAt;
  const parsedYear = referenceDate ? new Date(referenceDate).getFullYear() : Number.NaN;
  if (!Number.isFinite(parsedYear)) {
    return 'Unknown';
  }

  return String(parsedYear);
}

function groupEventsByYear(events: SpeakerEvent[]) {
  const grouped = new Map<string, SpeakerEvent[]>();

  for (const event of events) {
    const year = getEventYear(event);
    const current = grouped.get(year) ?? [];
    current.push(event);
    grouped.set(year, current);
  }

  return [...grouped.entries()].sort(([yearA], [yearB]) => {
    if (yearA === 'Unknown') {
      return 1;
    }

    if (yearB === 'Unknown') {
      return -1;
    }

    return Number(yearB) - Number(yearA);
  });
}

export default async function SpeakingPage() {
  const { sessions, events } = await getSpeakerContent();
  const groupedEvents = groupEventsByYear(events);
  const signatureTalks = sessions.slice(0, 3);
  const eventSchema = getEventSchema(events);

  return (
    <section className="page container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(eventSchema) }}
      />
      <header className="card speaking-hero">
        <p className="hero-eyebrow">Speaking</p>
        <h1>Talks and workshops about frontend architecture and delivery at scale.</h1>
        <p className="lead">
          I speak at conferences and private team sessions on Angular architecture, performance, and
          practical engineering leadership.
        </p>
        <div className="speaking-badges">
          <span className="speaking-badge">Talk</span>
          <span className="speaking-badge">Workshop</span>
          <span className="speaking-badge">Panel</span>
        </div>
      </header>

      <section className="card">
        <h2>Signature talks</h2>
        <div className="card-list">
          {signatureTalks.map((session) => (
            <article key={session.id} className="card">
              <h3>{session.title}</h3>
              {session.language ? <p className="card-meta">Language: {session.language}</p> : null}
              <p>{session.description}</p>
              {session.url ? (
                <a href={session.url} className="button-link" target="_blank" rel="noreferrer">
                  View session
                </a>
              ) : null}
            </article>
          ))}
          {signatureTalks.length === 0 ? (
            <p className="note">No signature talks available yet from Sessionize.</p>
          ) : null}
        </div>
      </section>

      <section className="card speaking-invite">
        <h2>Invite me to your event</h2>
        <p>
          If you are organizing a conference, meetup, or internal workshop, I can share a tailored
          proposal based on your audience and format.
        </p>
        <div className="contact-hero-actions">
          <Link href="/contact" className="button-link">
            Send speaking request
          </Link>
          <a
            href="https://calendly.com/ged-galassi/30min"
            className="button-link button-link-secondary"
            target="_blank"
            rel="noreferrer"
          >
            Book intro call
          </a>
        </div>
      </section>

      <section className="card">
        <h2>Media</h2>
        <ul className="meta-list">
          <li>Slides and recordings are added to session links when available.</li>
          <li>LinkedIn and Medium include additional context and summaries.</li>
        </ul>
      </section>

      <section className="timeline-section">
        <h2>Event timeline</h2>
        {groupedEvents.map(([year, yearEvents], index) => (
          <details key={year} open={index === 0} className="card timeline-year">
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
                    {event.endsAt && event.endsAt !== event.startsAt
                      ? ` - ${formatDate(event.endsAt)}`
                      : ''}
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
