import Link from 'next/link';

import { siteConfig } from '@/config/site';

export function Header() {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link href="/" className="brand">
          {siteConfig.name}
        </Link>
        <nav aria-label="Navigazione principale">
          <ul className="nav-list">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
