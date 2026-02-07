import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'Summary of Giorgio Galassi profile, technical focus, and core frontend skills.'
};

export default function HomePage() {
  return (
    <section className="page container">
      <h1>About</h1>
      <p className="lead">
        Senior Frontend Software Engineer with around 10 years of experience building and evolving
        large-scale web platforms. I focus on frontend architecture, maintainability, performance,
        and collaboration across product and engineering teams.
      </p>

      <article className="card">
        <h2>Professional snapshot</h2>
        <ul className="meta-list">
          <li>
            <strong>Role:</strong> Senior Software Engineer (Frontend)
          </li>
          <li>
            <strong>Location:</strong> Italy · Remote-friendly (EU timezone)
          </li>
          <li>
            <strong>Main strengths:</strong> Architecture, state management boundaries, scalable UI
            systems, technical leadership
          </li>
        </ul>
        <p className="card-meta">
          Profiles: <a href={siteConfig.social.linkedin}>LinkedIn</a> ·{' '}
          <a href={siteConfig.social.github}>GitHub</a> ·{' '}
          <a href={siteConfig.social.medium}>Medium</a>
        </p>
      </article>

      <div className="card-list">
        <article className="card">
          <h2>Core skills</h2>
          <ul className="meta-list">
            <li>
              <strong>Languages:</strong> TypeScript, JavaScript
            </li>
            <li>
              <strong>Frontend:</strong> Angular, RxJS, Web Components
            </li>
            <li>
              <strong>Architecture:</strong> component-based systems, modular frontend design,
              state management patterns
            </li>
            <li>
              <strong>Tooling:</strong> Nx, Storybook, Jasmine, Karma, Git-based workflows
            </li>
          </ul>
        </article>

        <article className="card">
          <h2>How I contribute</h2>
          <ul className="meta-list">
            <li>Design and evolve frontend architecture for multi-team products.</li>
            <li>Define standards and shared patterns to reduce coupling.</li>
            <li>Support teams with technical mentoring and architecture reviews.</li>
            <li>Bridge product needs with sustainable engineering decisions.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
