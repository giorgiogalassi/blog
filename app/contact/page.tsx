import type { Metadata } from 'next';

import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/primitives';
import { siteConfig } from '@/config/site';

import { ContactForm } from './contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book a call or send a short brief. I reply with realistic next steps.'
};

export default function ContactPage() {
  return (
    <Container className="page stack stack-lg">
      <header className="contact-hero stack stack-md">
        <h1>Contact</h1>
        <p className="lead">Choose the quickest path. You’ll get a clear response and next steps.</p>
        <div className="hero-actions">
          <ButtonLink href="https://calendly.com/ged-galassi/30min" target="_blank" rel="noreferrer" variant="primary">
            Book a call
          </ButtonLink>
          <ButtonLink href={`mailto:${siteConfig.email}`} variant="secondary">Email direct</ButtonLink>
        </div>
      </header>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <ContactForm />
        <aside className="card stack stack-sm" aria-label="Useful information">
          <h2>What happens next</h2>
          <p className="meta">Got it. I’ll reply within 2 business days with scope and recommended next action.</p>
          <ul>
            <li>Quick review of your context.</li>
            <li>Clarity on fit, timing, and approach.</li>
            <li>Optional call if useful.</li>
          </ul>
        </aside>
      </div>
    </Container>
  );
}
