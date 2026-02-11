import type { Metadata } from 'next';

import { ArticleCard, TagChip } from '@/components/ui/cards';
import { Container } from '@/components/ui/primitives';
import { getMediumArticles } from '@/lib/medium';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Essays and point-of-view writing on frontend strategy, architecture, and delivery.'
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default async function ArticlesPage() {
  const articles = await getMediumArticles();
  const [featured, ...rest] = articles;

  return (
    <Container className="page">
      <h1>Articles</h1>
      <p className="lead">Point-of-view pieces for leaders balancing product velocity, architecture, and quality.</p>

      <div className="filter-row" aria-label="article filters">
        <TagChip>Topic: All</TagChip>
        <TagChip>Year: All</TagChip>
      </div>

      {featured ? (
        <section className="section">
          <ArticleCard
            featured
            title={featured.title}
            kicker="Featured"
            excerpt="A deeper perspective from recent writing."
            href={featured.url}
            imageUrl={featured.imageUrl}
            meta={formatDate(featured.publishedAt)}
          />
        </section>
      ) : null}

      <section className="section grid-2">
        {rest.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            kicker={article.categories[0] ?? 'Article'}
            excerpt="Read the full article on Medium."
            href={article.url}
            imageUrl={article.imageUrl}
            meta={formatDate(article.publishedAt)}
          />
        ))}
      </section>

      {articles.length === 0 ? <p className="note">No articles available at the moment. Please check again later.</p> : null}
    </Container>
  );
}
