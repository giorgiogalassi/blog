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
    slug: 'minimal-design-system',
    title: 'Building a minimal design system that scales',
    summary: 'A practical guide to reduce duplication and keep UI consistency over time.',
    platform: 'Medium',
    publishedAt: '2025-11-04',
    url: 'https://medium.com/@mario-rossi/design-system-minimo-123456'
  },
  {
    slug: 'nextjs-routing-patterns',
    title: 'Routing patterns in Next.js App Router',
    summary: 'Concrete patterns to keep routing simple and predictable.',
    platform: 'DEV',
    publishedAt: '2025-10-01',
    url: 'https://dev.to/mario-rossi/nextjs-routing-patterns-1abc'
  },
  {
    slug: 'write-to-learn-better',
    title: 'Writing to learn better',
    summary: 'Why documenting your work accelerates technical growth and clarity.',
    platform: 'Substack',
    publishedAt: '2025-09-12',
    url: 'https://mariorossi.substack.com/p/scrivere-per-imparare'
  }
];

export const articleRedirectMap = Object.fromEntries(
  externalArticles.map((article) => [article.slug, article.url])
) as Record<string, string>;
