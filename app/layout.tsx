import type { Metadata } from 'next';
import type { CSSProperties, ReactNode } from 'react';

import { Header } from '@/components/header';
import { siteConfig } from '@/config/site';
import { theme } from '@/config/theme';

import './globals.css';

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
  return (
    <html lang="it">
      <body
        style={
          {
            '--color-bg': theme.colors.background,
            '--color-fg': theme.colors.foreground,
            '--color-muted': theme.colors.muted,
            '--color-border': theme.colors.border,
            '--color-accent': theme.colors.accent,
            '--color-accent-soft': theme.colors.accentSoft,
            '--space-section': theme.spacing.section,
            '--space-container': theme.spacing.container,
            '--radius-sm': theme.radius.sm,
            '--radius-md': theme.radius.md
          } as CSSProperties
        }
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
