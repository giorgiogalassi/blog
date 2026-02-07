import type { Metadata } from 'next';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

import { ContactForm } from './contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: "Tell me about your project: I'll reply with concrete next steps and a realistic estimate."
};

export default function ContactPage() {
  return (
    <section className="page container contact-page">
      <header className="contact-hero">
        <h1>Let's talk about your project</h1>
        <p className="lead">
          I reply within 2 business days. If your request is urgent, book a paid call directly.
        </p>
        <div className="contact-hero-actions">
          <Link
            href="https://calendly.com/ged-galassi/30min"
            className="button-link"
            target="_blank"
            rel="noreferrer"
          >
            Book a call
          </Link>
          <a className="button-link button-link-secondary" href={`mailto:${siteConfig.email}`}>
            Email me
          </a>
          <Link
            href={siteConfig.social.linkedin}
            className="button-link button-link-secondary"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </Link>
        </div>
      </header>

      <div className="contact-grid">
        <ContactForm />
        <aside className="contact-sidebar" aria-label="Useful information">
          <div className="card">
            <h2>What happens next</h2>
            <ol>
              <li>I review your request and check whether it is in scope.</li>
              <li>If we are aligned, I propose a call or follow-up questions.</li>
              <li>After the call I share a proposal, estimate, and timeline.</li>
            </ol>
          </div>

          <div className="card">
            <h2>Not a fit if...</h2>
            <ul>
              <li>You only want the lowest price without clear goals.</li>
              <li>You need immediate full-time availability.</li>
              <li>There is no budget or project ownership.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
