import type { Metadata } from 'next';
import { Archivo, Space_Grotesk } from 'next/font/google';
import type { CSSProperties, ReactNode } from 'react';

import { Header } from '@/components/header';
import { siteConfig } from '@/config/site';
import { theme } from '@/config/theme';
import { getPersonSchema, getProfessionalServiceSchema, toJsonLd } from '@/lib/seo';

import './globals.css';

const headingFont = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  variable: '--font-heading'
});

const bodyFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const rootSchemas = [getPersonSchema(), getProfessionalServiceSchema()];

  return (
    <html lang="en">
      <body
        className={`${bodyFont.className} ${headingFont.variable}`}
        style={
          {
            '--color-bg': theme.colors.background,
            '--color-surface-1': theme.colors.surface1,
            '--color-surface-2': theme.colors.surface2,
            '--color-fg': theme.colors.foreground,
            '--color-muted': theme.colors.muted,
            '--color-border': theme.colors.border,
            '--color-primary': theme.colors.primary,
            '--color-primary-strong': theme.colors.primaryStrong,
            '--color-primary-soft': theme.colors.primarySoft,
            '--color-accent': theme.colors.primary,
            '--color-accent-strong': theme.colors.primaryStrong,
            '--color-accent-soft': theme.colors.primarySoft,
            '--space-1': theme.spacing[1],
            '--space-2': theme.spacing[2],
            '--space-3': theme.spacing[3],
            '--space-4': theme.spacing[4],
            '--space-6': theme.spacing[6],
            '--space-8': theme.spacing[8],
            '--space-12': theme.spacing[12],
            '--space-16': theme.spacing[16],
            '--space-24': theme.spacing[24],
            '--space-section': theme.spacing.section,
            '--space-container': theme.layout.container,
            '--space-reading': theme.layout.reading,
            '--layout-container-max': theme.layout.container,
            '--layout-reading-max': theme.layout.reading,
            '--radius-sm': theme.radius.sm,
            '--radius-md': theme.radius.md,
            '--radius-lg': theme.radius.lg,
            '--shadow-sm': theme.shadow.sm,
            '--shadow-md': theme.shadow.md
          } as CSSProperties
        }
      >
        {rootSchemas.map((schema, index) => (
          <script
            key={`root-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: toJsonLd(schema) }}
          />
        ))}
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
