import type { Metadata } from 'next';
import Link from 'next/link';

import { externalArticles } from '@/data/articles';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Lista di articoli esterni pubblicati su Medium e altre piattaforme.'
};

export default function ArticlesPage() {
  return (
    <section className="page container">
      <h1>Articoli esterni</h1>
      <p className="lead">
        Ogni articolo usa una rotta interna stabile (<code>/go/[slug]</code>) che effettua redirect
        verso la piattaforma esterna.
      </p>

      <div className="card-list">
        {externalArticles.map((article) => (
          <article key={article.slug} className="card">
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
            <p className="card-meta">
              {article.platform} · {new Date(article.publishedAt).toLocaleDateString('it-IT')}
            </p>
            <Link href={`/go/${article.slug}`} className="button-link">
              Leggi articolo
            </Link>
          </article>
        ))}
      </div>

      <p className="note">
        Per aggiungere un nuovo articolo, aggiorna solo <code>data/articles.ts</code>: la lista e il
        redirect si aggiornano automaticamente.
      </p>
    </section>
  );
}
