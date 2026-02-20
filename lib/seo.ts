import { siteConfig } from '@/config/site';

export function toJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function getPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: 'Senior Angular Consultant',
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github, siteConfig.social.medium]
  };
}

export function getProfessionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${siteConfig.name} Consulting`,
    url: siteConfig.url,
    description:
      'Angular architecture consulting, performance optimization, design systems, and technical coaching.',
    areaServed: 'Remote',
    provider: {
      '@type': 'Person',
      name: siteConfig.name
    }
  };
}

export function getEventSchema(
  events: { name: string; startsAt: string | null; location: string | null; url: string | null }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: events
      .filter((event) => event.startsAt)
      .slice(0, 12)
      .map((event, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Event',
          name: event.name,
          startDate: event.startsAt,
          eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          location: event.location
            ? {
                '@type': 'Place',
                name: event.location
              }
            : undefined,
          url: event.url ?? undefined
        }
      }))
  };
}
