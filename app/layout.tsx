import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import type { CSSProperties, ReactNode } from 'react';

import { Header } from '@/components/header';
import { siteConfig } from '@/config/site';
import { theme } from '@/config/theme';

import './globals.css';

const roboto = Roboto({
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
  return (
    <html lang="en">
      <body
        className={roboto.className}
        style={
          {
            '--color-bg': theme.colors.background,
            '--color-fg': theme.colors.foreground,
            '--color-muted': theme.colors.muted,
            '--color-border': theme.colors.border,
            '--color-accent': theme.colors.accent,
            '--color-accent-strong': theme.colors.accentStrong,
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
