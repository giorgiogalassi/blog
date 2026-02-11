'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { siteConfig } from '@/config/site';
import { ButtonLink } from '@/components/ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link href="/" className="brand" onClick={() => setIsMenuOpen(false)}>
          <Image src="/images/logo/logo.png" alt={siteConfig.name} width={160} height={32} className="brand-logo" priority />
        </Link>

        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
        </button>

        <nav id="main-navigation" aria-label="Main navigation" className={isMenuOpen ? 'main-nav is-open' : 'main-nav'}>
          <ul className="nav-list">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={pathname === item.href ? 'is-active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/contact" variant="secondary" className="nav-cta" onClick={() => setIsMenuOpen(false)}>
            Work with me
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
