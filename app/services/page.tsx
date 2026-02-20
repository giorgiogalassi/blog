import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Angular consulting services for architecture, performance, design systems, and technical mentoring.'
};

export default function ServicesPage() {
  return (
    <section className="page container">
      <header className="services-hero card">
        <p className="hero-eyebrow">Services</p>
        <h1>I work with teams that need clarity, speed, and long-term maintainability.</h1>
        <p className="lead">
          I support product organizations where frontend reliability and delivery quality directly
          impact business outcomes.
        </p>
        <Link
          href="https://calendly.com/ged-galassi/30min"
          className="button-link"
          target="_blank"
          rel="noreferrer"
        >
          Book intro call
        </Link>
      </header>

      <div className="service-sections">
        <article className="service-block card">
          <h2>Angular Architecture Consulting</h2>
          <p>
            Stabilize delivery by defining frontend boundaries, ownership models, and implementation
            standards across teams.
          </p>
          <ul className="meta-list">
            <li>Architecture review and risk assessment</li>
            <li>Scalable module and state boundaries</li>
            <li>Execution plan for multi-team adoption</li>
          </ul>
        </article>

        <article className="service-block card">
          <h2>Performance Audit</h2>
          <p>
            Diagnose bottlenecks and ship targeted improvements that raise Core Web Vitals without
            large rewrites.
          </p>
          <ul className="meta-list">
            <li>Bundle and rendering analysis</li>
            <li>SSR/hydration strategy review</li>
            <li>Prioritized roadmap with measurable impact</li>
          </ul>
        </article>

        <article className="service-block card">
          <h2>Design System Engineering</h2>
          <p>
            Build maintainable component foundations that reduce duplication and help teams ship
            consistent UI faster.
          </p>
          <ul className="meta-list">
            <li>Component API standards</li>
            <li>Token and theme structure</li>
            <li>Documentation and rollout support</li>
          </ul>
        </article>

        <article className="service-block card">
          <h2>Mentoring and Technical Coaching</h2>
          <p>
            Support engineers and tech leads with practical guidance on architecture decisions,
            quality standards, and execution confidence.
          </p>
          <ul className="meta-list">
            <li>Code and architecture coaching</li>
            <li>Decision framework for trade-offs</li>
            <li>Actionable growth plans for teams</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
