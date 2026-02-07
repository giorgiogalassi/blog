import type { Metadata } from 'next';

import { getMediumArticles } from '@/lib/medium';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'A dynamic list of articles published on Medium.'
};

export default async function ArticlesPage() {
  const articles = await getMediumArticles();

  return (
    <section className="page container">
      <h1>External articles</h1>
      <p className="lead">
        This list is generated automatically from Medium via RSS2JSON: no manual sync required.
      </p>

      <div className="card-list">
        {articles.map((article) => (
          <article key={article.id} className="card">
            {article.imageUrl ? (
              // Usando un normale <img> evitiamo vincoli su domini esterni in configurazione Next.
              <img src={article.imageUrl} alt={article.title} className="card-image" loading="lazy" />
            ) : null}

            <h2>{article.title}</h2>

            <p className="card-meta">
              Medium · {new Date(article.publishedAt).toLocaleDateString('en-US')}
            </p>

            {article.categories.length > 0 ? (
              <ul className="category-list" aria-label="Article categories">
                {article.categories.map((category) => (
                  <li key={`${article.id}-${category}`} className="category-pill">
                    {category}
                  </li>
                ))}
              </ul>
            ) : null}

            <a href={article.url} className="button-link" target="_blank" rel="noreferrer">
              Read article
            </a>
          </article>
        ))}
      </div>

      {articles.length === 0 ? (
        <p className="note">
          No articles are currently available from the RSS source. Check feed/API availability.
        </p>
      ) : null}
    </section>
  );
}
