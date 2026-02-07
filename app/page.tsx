import Link from 'next/link';

import { siteConfig } from '@/config/site';

export default function HomePage() {
  return (
    <section className="page container">
      <h1>Blog personale su engineering, prodotto e apprendimento continuo</h1>
      <p className="lead">
        Condivido esperienze pratiche su Next.js, architetture semplici e processi per team piccoli.
        Gli articoli completi sono pubblicati su piattaforme esterne.
      </p>
      <Link href="/articles" className="button-link">
        Vai agli articoli esterni
      </Link>
      <p className="note">
        Trovi anche contenuti brevi su{' '}
        <a href={siteConfig.social.medium} target="_blank" rel="noreferrer">
          Medium
        </a>{' '}
        e aggiornamenti professionali su{' '}
        <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        .
      </p>
    </section>
  );
}
