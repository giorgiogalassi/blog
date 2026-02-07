export const siteConfig = {
  name: 'Mario Rossi',
  title: 'Mario Rossi | Personal Blog',
  description:
    'A personal blog about software engineering, product thinking, and web development. Full articles are published on external platforms.',
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
