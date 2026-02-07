import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for freelance collaborations and consulting opportunities.'
};

export default function ContactPage() {
  return (
    <section className="page container">
      <h1>Let&apos;s collaborate</h1>
      <p className="lead">
        If you need support on web product delivery, architecture simplification, or code quality,
        send me a message.
      </p>

      <form
        className="contact-form"
        action={`mailto:${siteConfig.email}`}
        method="post"
        encType="text/plain"
      >
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />

        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required />

        <label htmlFor="company">Company (optional)</label>
        <input id="company" name="company" type="text" autoComplete="organization" />

        <label htmlFor="message">Project details</label>
        <textarea id="message" name="message" rows={6} required />

        <button type="submit" className="button-link button-reset">
          Send request
        </button>
      </form>

      <p className="card-meta">Or email me directly at {siteConfig.email}.</p>
    </section>
  );
}
