import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'Who I am, how I work, and what I publish on this personal blog.'
};

export default function HomePage() {
  return (
    <section className="page container">
      <h1>About</h1>
      <p className="lead">
        I am a software engineer focused on maintainable web products, developer experience, and
        baseline performance.
      </p>

      <div className="about-grid">
        <div className="photo-slot" aria-label="Profile photo placeholder">
          <span>Photo placeholder</span>
        </div>

        <article className="card">
          <h2>Freelance profile</h2>
          <p>
            I help teams ship clear, maintainable products by balancing engineering quality with
            practical delivery.
          </p>
          <ul className="meta-list">
            <li>
              <strong>Focus:</strong> Next.js, frontend architecture, DX, performance baseline
            </li>
            <li>
              <strong>Availability:</strong> Open for freelance collaborations
            </li>
            <li>
              <strong>Location:</strong> Remote-friendly (EU timezone)
            </li>
          </ul>
          <p className="card-meta">
            Find me on{' '}
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>{' '}
            ·{' '}
            <a href={siteConfig.social.medium} target="_blank" rel="noreferrer">
              Medium
            </a>{' '}
            ·{' '}
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </p>
        </article>
      </div>
    </section>
  );
}
