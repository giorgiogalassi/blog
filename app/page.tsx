import Link from 'next/link';

import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <section className="page container">
      <h1>Personal blog on engineering, frontend architecture, and continuous learning</h1>
      <p className="lead">
        I share practical insights from enterprise frontend projects: architecture decisions,
        maintainability patterns, and ways to deliver reliably in multi-team environments.
      </p>
      <Link href="/about" className="button-link">
        Read my profile and skills
      </Link>
      <p className="note">
        You can also find articles on{' '}
        <a href={siteConfig.social.medium} target="_blank" rel="noreferrer">
          Medium
        </a>{' '}
        and professional updates on{' '}
        <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        .
      </p>
    </section>
  );
}
