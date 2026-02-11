import type { Metadata } from 'next';
import Link from 'next/link';

import { ArticleCard, MetricTile, SessionCard } from '@/components/ui/cards';
import { ButtonLink } from '@/components/ui/button';
import { Container, Section } from '@/components/ui/primitives';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Strategic frontend advisory, writing, and speaking for product and engineering leaders.'
};

export default function HomePage() {
  return (
    <Container className="page">
      <section className="hero">
        <p className="kicker">Frontend advisory for product teams</p>
        <h1>I help teams ship scalable frontend platforms without slowing product delivery.</h1>
        <p className="lead">
          Executive support for engineering leaders who need stronger architecture, better quality signals,
          and faster release confidence.
        </p>
        <div className="hero-actions">
          <ButtonLink href="/contact" variant="primary">Book a call</ButtonLink>
          <ButtonLink href="/articles" variant="secondary">Read latest writing</ButtonLink>
        </div>
      </section>

      <Section title="Latest writing" lead="One featured piece plus fast reads for teams making architecture decisions.">
        <div className="grid-2" style={{ marginTop: '1rem' }}>
          <ArticleCard
            featured
            title="From component sprawl to strategic UI systems"
            kicker="Featured"
            excerpt="A practical framework to reduce entropy in enterprise frontends and improve release speed."
            href="https://medium.com/@giorgio.galassi"
            meta="Point of view"
            imageUrl="/images/profile/profile-big-2.jpeg"
          />
          <ArticleCard
            title="When to split a frontend monolith"
            kicker="Architecture"
            excerpt="A decision checklist for balancing autonomy, governance, and delivery cost."
            href="https://medium.com/@giorgio.galassi"
          />
          <ArticleCard
            title="Executive metrics for frontend quality"
            kicker="Leadership"
            excerpt="How to connect quality indicators with planning and roadmap confidence."
            href="https://medium.com/@giorgio.galassi"
          />
          <ArticleCard
            title="Design systems as operating model"
            kicker="Design system"
            excerpt="Beyond components: roles, ownership, and cadence that keep systems alive."
            href="https://medium.com/@giorgio.galassi"
          />
        </div>
      </Section>

      <Section>
        <div className="grid-3">
          <MetricTile value="10+" label="Years in frontend delivery" />
          <MetricTile value="40+" label="Talks and sessions delivered" />
          <MetricTile value="100k+" label="Users impacted across products" />
        </div>
      </Section>

      <Section title="Advisory" lead="Three engagement tracks for teams under delivery pressure.">
        <div className="grid-3">
          <article className="card"><h3>Problem</h3><p>Roadmaps slow down because architecture and code ownership are fragmented.</p></article>
          <article className="card"><h3>Intervention</h3><p>I run focused assessments, align stakeholders, and define practical operating rules.</p></article>
          <article className="card"><h3>Outcome</h3><p>Faster decisions, clearer ownership boundaries, and measurable improvement in release quality.</p></article>
        </div>
      </Section>

      <Section title="Speaking" lead="Upcoming sessions plus selected talks from recent years.">
        <div className="grid-2">
          <SessionCard title="Building resilient design systems" preview="How to sustain consistency across multiple delivery teams." meta="Upcoming" />
          <SessionCard title="Frontend strategy for engineering leaders" preview="A leadership playbook for architecture and execution alignment." meta="Upcoming" />
          <SessionCard title="State management at scale" preview="Boundary patterns and anti-patterns from enterprise projects." meta="Selected past" />
          <SessionCard title="Web performance governance" preview="How to make Core Web Vitals a product KPI, not an afterthought." meta="Selected past" />
          <SessionCard title="Component APIs that survive growth" preview="Designing interfaces that avoid accidental complexity." meta="Selected past" />
        </div>
        <p style={{ marginTop: '1rem' }}>
          <Link href="/sessions">All sessions</Link>
        </p>
      </Section>

      <Section title="Narrative bio">
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <img src="/images/profile/profile-big-2.jpeg" alt="Giorgio Galassi" className="article-card-cover" />
          <div className="stack stack-md">
            <p>
              I partner with teams that already ship, but need a stronger technical narrative to scale delivery
              without eroding quality.
            </p>
            <p>
              My work sits between architecture and leadership: I translate frontend complexity into decisions
              that executives and delivery teams can execute together.
            </p>
            <ButtonLink href={siteConfig.social.linkedin} variant="secondary" target="_blank" rel="noreferrer">
              Connect on LinkedIn
            </ButtonLink>
          </div>
        </div>
      </Section>
    </Container>
  );
}
