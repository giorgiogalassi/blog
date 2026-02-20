export const siteConfig = {
  name: 'Giorgio Galassi',
  title: 'Giorgio Galassi | Personal Blog',
  description:
    'A personal blog about software engineering, product thinking, and web development. Full articles are published on external platforms.',
  url: 'https://example.com',
  email: 'ged.galassi@gmail.com',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Work', href: '/work' },
    { label: 'Articles', href: '/articles' },
    { label: 'Speaking', href: '/speaking' },
    { label: 'Feedback', href: '/feedback' },
    { label: 'Contact', href: '/contact' }
  ],
  social: {
    medium: 'https://medium.com/@giorgio.galassi',
    github: 'https://github.com/giorgiogalassi',
    linkedin: 'https://www.linkedin.com/in/giorgiogalassi/'
  }
} as const;

export type NavItem = (typeof siteConfig.nav)[number];
