'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((current) => !current);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link href="/" className="brand" onClick={closeMenu}>
          <Image
            src="/images/logo/logo.png"
            alt={siteConfig.name}
            width={160}
            height={32}
            className="brand-logo"
            priority
          />
        </Link>

        <button
          type="button"
          className="menu-toggle button-reset"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="main-navigation"
          onClick={toggleMenu}
        >
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
        </button>

        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={isMenuOpen ? 'main-nav is-open' : 'main-nav'}
        >
          <ul className="nav-list">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={closeMenu}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="https://calendly.com/ged-galassi/30min"
          className="header-cta button-link"
          target="_blank"
          rel="noreferrer"
          onClick={closeMenu}
        >
          Book a call
        </Link>
      </div>
    </header>
  );
}
