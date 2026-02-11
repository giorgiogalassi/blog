'use client';

import { FormEvent, useState } from 'react';

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
  privacyAccepted: boolean;
  requestType: 'Other';
  websiteField: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  company: '',
  message: '',
  privacyAccepted: false,
  requestType: 'Other',
  websiteField: ''
};

type SubmitStatus = { type: 'idle' } | { type: 'error'; message: string } | { type: 'success'; message: string };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<SubmitStatus>({ type: 'idle' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: 'idle' });

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type: 'error', message: 'Please fill in name, email, and message.' });
      return;
    }

    if (!form.privacyAccepted) {
      setStatus({ type: 'error', message: 'Please accept the privacy policy.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus({ type: 'error', message: payload.message ?? 'Submission failed. Please try again shortly.' });
        return;
      }

      setStatus({ type: 'success', message: payload.message ?? "Got it. I'll reply within 2 business days." });
      setForm(initialState);
    } catch {
      setStatus({ type: 'error', message: 'Network error. Please try again in a few minutes.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="name">Name *</label>
      <input id="name" value={form.name} onChange={(event) => updateField('name', event.target.value)} required />

      <label htmlFor="email">Email *</label>
      <input id="email" type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} required />

      <label htmlFor="company">Company (optional)</label>
      <input id="company" value={form.company} onChange={(event) => updateField('company', event.target.value)} />

      <label htmlFor="message">Message *</label>
      <textarea id="message" rows={6} value={form.message} onChange={(event) => updateField('message', event.target.value)} required />

      <label>
        <input
          type="checkbox"
          checked={form.privacyAccepted}
          onChange={(event) => updateField('privacyAccepted', event.target.checked)}
          style={{ width: 'auto', minHeight: 'auto', marginRight: '0.5rem' }}
        />
        I accept the privacy policy.
      </label>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="contact-honeypot"
        value={form.websiteField}
        onChange={(event) => updateField('websiteField', event.target.value)}
        aria-hidden="true"
      />

      {status.type !== 'idle' ? (
        <p className={status.type === 'error' ? 'form-feedback-error' : 'form-feedback-success'}>{status.message}</p>
      ) : null}

      <button type="submit" className="button button-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Send message'}
      </button>
    </form>
  );
}
