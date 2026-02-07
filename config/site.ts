export const siteConfig = {
  name: 'Mario Rossi',
  title: 'Mario Rossi | Blog personale',
  description:
    'Blog personale su ingegneria software, prodotto e sviluppo web. Articoli pubblicati su Medium e altre piattaforme.',
  url: 'https://example.com',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Articles', href: '/articles' }
  ],
  social: {
    medium: 'https://medium.com/@mario-rossi',
    github: 'https://github.com/mario-rossi',
    linkedin: 'https://www.linkedin.com/in/mario-rossi'
  }
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
