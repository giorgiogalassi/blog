import type { Metadata } from 'next';

import { PageViewTracker } from '@/components/page-view-tracker';
import { caseStudies } from '@/lib/case-studies';
import { toJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected frontend case studies with measurable outcomes across architecture and performance.',
  openGraph: {
    title: 'Work',
    description:
      'Case studies focused on scalable frontend architecture and measurable performance outcomes.',
    url: '/work',
    type: 'website'
  }
};

export default function WorkPage() {
  const caseStudySchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: caseStudies.map((study, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'CreativeWork',
        name: study.title,
        description: study.approach
      }
    }))
  };

  return (
    <section className="page container">
      <PageViewTracker event="work_page_view" payload={{ page: '/work' }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(caseStudySchema) }}
      />
      <header className="work-hero">
        <p className="hero-eyebrow">Selected Work</p>
        <h1>Projects where architecture decisions translated into measurable impact.</h1>
        <p className="lead">
          Each case study summarizes context, constraints, implementation approach, and business
          results.
        </p>
      </header>

      <div className="work-grid">
        {caseStudies.map((study) => (
          <article key={study.id} className="work-card card">
            <h2>{study.title}</h2>
            <p className="card-meta">
              {study.role} · {study.duration}
            </p>
            <p className="card-meta">Stack: {study.stack.join(', ')}</p>

            <h3>Context</h3>
            <p>{study.context}</p>

            <h3>Problem</h3>
            <p>{study.problem}</p>

            <h3>What I did</h3>
            <p>{study.approach}</p>

            <h3>Results</h3>
            <ul className="meta-list">
              {study.outcomes.map((outcome) => (
                <li key={outcome}>
                  <strong>{outcome}</strong>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
