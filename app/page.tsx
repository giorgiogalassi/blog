import Link from 'next/link';

import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <section className="page container">
      <h1>Personal blog on engineering, product, and continuous learning</h1>
      <p className="lead">
        I share practical insights about Next.js, simple architectures, and delivery workflows for
        small teams. Full posts are published on external platforms.
      </p>
      <Link href="/articles" className="button-link">
        Browse external articles
      </Link>
      <p className="note">
        You can also find short-form content on{' '}
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
