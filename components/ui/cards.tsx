import type { ReactNode } from 'react';

export function TagChip({ children }: { children: ReactNode }) {
  return <span className="tag-chip">{children}</span>;
}

export function MetricTile({ value, label }: { value: string; label: string }) {
  return (
    <article className="metric-tile">
      <p className="metric-value">{value}</p>
      <p className="metric-label">{label}</p>
    </article>
  );
}

type ArticleCardProps = {
  title: string;
  kicker: string;
  excerpt: string;
  href: string;
  imageUrl?: string | null;
  meta?: string;
  featured?: boolean;
};

export function ArticleCard({ title, kicker, excerpt, href, imageUrl, meta, featured = false }: ArticleCardProps) {
  return (
    <article className={`article-card ${featured ? 'article-card-featured' : ''}`.trim()}>
      {imageUrl ? <img src={imageUrl} alt={title} className="article-card-cover" loading="lazy" /> : null}
      <p className="kicker">{kicker}</p>
      <h3>{title}</h3>
      {meta ? <p className="meta">{meta}</p> : null}
      <p>{excerpt}</p>
      <a href={href} target="_blank" rel="noreferrer" className="text-link">
        Read article
      </a>
    </article>
  );
}

type SessionCardProps = {
  title: string;
  preview: string;
  meta?: string;
  tags?: string[];
  href?: string | null;
};

export function SessionCard({ title, preview, meta, tags = [], href }: SessionCardProps) {
  return (
    <article className="session-card">
      <h3>{title}</h3>
      {meta ? <p className="meta">{meta}</p> : null}
      <p>{preview}</p>
      {tags.length > 0 ? (
        <div className="tag-list">
          {tags.map((tag) => (
            <TagChip key={`${title}-${tag}`}>{tag}</TagChip>
          ))}
        </div>
      ) : null}
      {href ? (
        <a href={href} target="_blank" rel="noreferrer" className="text-link">
          View details
        </a>
      ) : null}
    </article>
  );
}
