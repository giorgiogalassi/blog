import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { ProofBar } from '@/components/proof-bar';
import { TrackedLink } from '@/components/tracked-link';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Senior Angular Consultant',
  description:
    'I help product teams build scalable Angular applications with solid architecture and measurable performance improvements.',
  openGraph: {
    title: 'Senior Angular Consultant',
    description:
      'Architecture, performance optimization, and design systems for teams that need reliability at scale.',
    url: '/',
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <section className="page container">
      <header className="home-hero card">
        <p className="hero-eyebrow">Senior Angular Consultant and Speaker</p>
        <h1>
          I help product teams build scalable Angular applications without performance regressions.
        </h1>
        <p className="lead">
          Architecture, performance optimization, and design systems for teams that need reliability
          at scale.
        </p>
        <div className="hero-cta-row">
          <TrackedLink
            href="https://calendly.com/ged-galassi/30min"
            className="button-link"
            target="_blank"
            rel="noreferrer"
            eventName="home_cta_book_call_click"
            payload={{ source: 'home_hero' }}
          >
            Book a call
          </TrackedLink>
          <TrackedLink
            href="/work"
            className="button-link button-link-secondary"
            eventName="home_cta_work_click"
            payload={{ source: 'home_hero' }}
          >
            See selected work
          </TrackedLink>
        </div>
      </header>

      <ProofBar />

      <div className="home-layout">
        <aside className="profile-column">
          <div className="photo-slot" aria-label="Profile photo">
            <Image
              src="/images/profile/profile-big-2.jpeg"
              alt="Giorgio Galassi"
              width={800}
              height={1000}
              className="profile-photo"
            />
          </div>

          <div className="social-icons" aria-label="Social links">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Image
                src="/images/socials/LI-In-Bug.png"
                alt="LinkedIn"
                width={32}
                height={32}
                className="social-icon-image"
              />
            </a>
            <a href={siteConfig.social.medium} target="_blank" rel="noreferrer" aria-label="Medium">
              <Image
                src="/images/socials/Medium-Icon-White.svg"
                alt="Medium"
                width={32}
                height={32}
                className="social-icon-image"
              />
            </a>
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Image
                src="/images/socials/GitHub_Invertocat_White_Clearspace.svg"
                alt="GitHub"
                width={32}
                height={32}
                className="social-icon-image"
              />
            </a>
          </div>
        </aside>

        <div className="content-column">
          <article className="card">
            <h2>What I help teams achieve</h2>
            <ul className="meta-list">
              <li>Reduce delivery risk in large Angular codebases.</li>
              <li>Improve performance with measurable Core Web Vitals impact.</li>
              <li>Set architecture standards that scale across squads.</li>
              <li>Increase team execution confidence through coaching and structure.</li>
            </ul>
          </article>

          <div className="card-list">
            <article className="card">
              <h2>Core expertise</h2>
              <ul className="meta-list">
                <li>
                  <strong>Frontend architecture:</strong> modular boundaries, shared contracts,
                  sustainable scaling
                </li>
                <li>
                  <strong>Performance:</strong> rendering analysis, bundle strategy, Core Web Vitals
                </li>
                <li>
                  <strong>Systems:</strong> design systems, component APIs, UI consistency at scale
                </li>
                <li>
                  <strong>Delivery:</strong> technical leadership, mentoring, cross-team alignment
                </li>
              </ul>
            </article>

            <article className="card">
              <h2>How I usually engage</h2>
              <ul className="meta-list">
                <li>Architecture and scalability consulting for product teams.</li>
                <li>Performance audits with practical remediation roadmap.</li>
                <li>Design system engineering and adoption support.</li>
                <li>Mentoring programs for engineers and technical leads.</li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
