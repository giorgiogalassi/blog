import type { Metadata } from 'next';

import { ButtonLink } from '@/components/ui/button';
import { SessionCard } from '@/components/ui/cards';
import { Container } from '@/components/ui/primitives';
import { getSpeakerContent } from '@/lib/sessionize';

export const metadata: Metadata = {
  title: 'Sessions',
  description: 'Upcoming and past sessions from conference speaking and leadership events.'
};

function formatDate(value: string | null) {
  if (!value) return 'Date TBA';
  return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default async function SessionsPage() {
  const { sessions, events } = await getSpeakerContent();
  const currentYear = new Date().getFullYear();
  const upcoming = events.filter((event) => {
    const reference = event.startsAt ?? event.endsAt;
    return reference ? new Date(reference) >= new Date() : false;
  });
  const past = sessions.filter((session) => (session.year ?? 0) < currentYear).slice(0, 6);

  return (
    <Container className="page">
      <h1>Sessions</h1>
      <p className="lead">Talks focused on architecture decisions, delivery quality, and frontend leadership.</p>

      <section className="section">
        <h2>Upcoming</h2>
        <p className="lead">Invite one of these talks for your team or event.</p>
        <p style={{ marginTop: '1rem' }}>
          <ButtonLink href="/contact" variant="primary">Request this talk</ButtonLink>
        </p>
        <div className="grid-2" style={{ marginTop: '1rem' }}>
          {upcoming.slice(0, 2).map((event) => (
            <SessionCard
              key={event.id}
              title={event.name}
              preview={event.location ?? 'Location TBA'}
              meta={formatDate(event.startsAt)}
              href={event.url}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Past sessions</h2>
        <div className="grid-2" style={{ marginTop: '1rem' }}>
          {past.map((session) => (
            <SessionCard
              key={session.id}
              title={session.title}
              preview={session.description.slice(0, 180)}
              meta={session.year ? String(session.year) : 'Archive'}
              tags={session.language ? [session.language] : []}
              href={session.url}
            />
          ))}
        </div>
        {sessions.length > past.length ? <p className="note">Showing a curated set. Load more on the next iteration.</p> : null}
      </section>
    </Container>
  );
}
