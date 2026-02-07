export type ExternalArticle = {
  slug: string;
  title: string;
  summary: string;
  platform: 'Medium' | 'DEV' | 'Substack';
  publishedAt: string;
  url: string;
};

export const externalArticles: ExternalArticle[] = [
  {
    slug: 'design-system-minimo',
    title: 'Costruire un design system minimo che scala',
    summary: 'Una guida pratica per ridurre duplicazioni e mantenere coerenza UI.',
    platform: 'Medium',
    publishedAt: '2025-11-04',
    url: 'https://medium.com/@mario-rossi/design-system-minimo-123456'
  },
  {
    slug: 'nextjs-routing-patterns',
    title: 'Routing patterns in Next.js App Router',
    summary: 'Pattern concreti per mantenere il routing semplice e prevedibile.',
    platform: 'DEV',
    publishedAt: '2025-10-01',
    url: 'https://dev.to/mario-rossi/nextjs-routing-patterns-1abc'
  },
  {
    slug: 'scrivere-per-imparare',
    title: 'Scrivere per imparare meglio',
    summary: 'Perché documentare il proprio lavoro accelera crescita tecnica e chiarezza.',
    platform: 'Substack',
    publishedAt: '2025-09-12',
    url: 'https://mariorossi.substack.com/p/scrivere-per-imparare'
  }
];

export const articleRedirectMap = Object.fromEntries(
  externalArticles.map((article) => [article.slug, article.url])
) as Record<string, string>;
