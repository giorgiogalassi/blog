import type { Metadata } from 'next';
import Link from 'next/link';

import { externalArticles } from '@/data/articles';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'A list of external articles published on Medium and other platforms.'
};

export default function ArticlesPage() {
  return (
    <section className="page container">
      <h1>External articles</h1>
      <p className="lead">
        Every article uses a stable internal route (<code>/go/[slug]</code>) that redirects to the
        external platform.
      </p>

      <div className="card-list">
        {externalArticles.map((article) => (
          <article key={article.slug} className="card">
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
            <p className="card-meta">
              {article.platform} · {new Date(article.publishedAt).toLocaleDateString('en-US')}
            </p>
            <Link href={`/go/${article.slug}`} className="button-link">
              Read article
            </Link>
          </article>
        ))}
      </div>

      <p className="note">
        To add a new article, update only <code>data/articles.ts</code>: both the list and redirect
        map update automatically.
      </p>
    </section>
  );
}
