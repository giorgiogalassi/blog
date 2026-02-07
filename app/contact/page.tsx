import type { Metadata } from 'next';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

import { ContactForm } from './contact-form';

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Raccontami il tuo progetto: ti rispondo con prossimi step concreti e una stima realistica.'
};

export default function ContactPage() {
  return (
    <section className="page container contact-page">
      <header className="contact-hero">
        <h1>Parliamo del tuo progetto</h1>
        <p className="lead">
          Rispondo entro 2 giorni lavorativi. Se hai urgenza, prenota direttamente una call a
          pagamento.
        </p>
        <div className="contact-hero-actions">
          <Link href="https://calendly.com" className="button-link" target="_blank" rel="noreferrer">
            Prenota una call
          </Link>
          <a className="button-link button-link-secondary" href={`mailto:${siteConfig.email}`}>
            Scrivimi via email
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
        <aside className="contact-sidebar" aria-label="Informazioni utili">
          <div className="card">
            <h2>Cosa succede dopo</h2>
            <ol>
              <li>Leggo la richiesta e verifico se è in scope.</li>
              <li>Se allineati, ti propongo call o domande di chiarimento.</li>
              <li>Dopo la call condivido proposta, stima e timeline.</li>
            </ol>
          </div>

          <div className="card">
            <h2>Non fa per me se...</h2>
            <ul>
              <li>Cerchi solo il prezzo più basso senza obiettivi chiari.</li>
              <li>Hai bisogno di disponibilità full-time immediata.</li>
              <li>Non c&apos;è budget o ownership minima sul progetto.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
