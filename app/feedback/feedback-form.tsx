'use client';

import { useMemo, useState } from 'react';

type SpeechOption = {
  id: string;
  title: string;
};

type FeedbackFormProps = {
  year: number;
  speeches: SpeechOption[];
};

type Status =
  | { type: 'idle'; message: '' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string };

type FormState = {
  name: string;
  email: string;
  sessionId: string;
  rating: string;
  feedback: string;
  websiteField: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  sessionId: '',
  rating: '5',
  feedback: '',
  websiteField: ''
};

export function FeedbackForm({ year, speeches }: FeedbackFormProps) {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedSpeechTitle = useMemo(
    () => speeches.find((speech) => speech.id === form.sessionId)?.title ?? '',
    [speeches, form.sessionId]
  );

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    if (status.type !== 'idle') {
      setStatus({ type: 'idle', message: '' });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.sessionId || !form.feedback.trim()) {
      setStatus({ type: 'error', message: 'Compila tutti i campi obbligatori prima di inviare il feedback.' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          rating: Number(form.rating),
          year,
          sessionTitle: selectedSpeechTitle
        })
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus({
          type: 'error',
          message: payload.message ?? 'Invio non riuscito. Riprova tra qualche minuto.'
        });
        return;
      }

      setStatus({ type: 'success', message: payload.message ?? 'Feedback inviato con successo.' });
      setForm(initialState);
    } catch {
      setStatus({ type: 'error', message: 'Errore di rete. Riprova tra qualche minuto.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form contact-form-extended" onSubmit={handleSubmit} noValidate>
      <fieldset>
        <legend>Il tuo feedback</legend>

        <label htmlFor="feedback-name">Nome *</label>
        <input
          id="feedback-name"
          name="name"
          value={form.name}
          onChange={(event) => updateField('name', event.target.value)}
          required
        />

        <label htmlFor="feedback-email">Email *</label>
        <input
          id="feedback-email"
          name="email"
          type="email"
          value={form.email}
          onChange={(event) => updateField('email', event.target.value)}
          required
        />

        <label htmlFor="feedback-speech">Speech *</label>
        <select
          id="feedback-speech"
          name="sessionId"
          value={form.sessionId}
          onChange={(event) => updateField('sessionId', event.target.value)}
          required
          disabled={speeches.length === 0}
        >
          <option value="">Seleziona uno speech</option>
          {speeches.map((speech) => (
            <option key={speech.id} value={speech.id}>
              {speech.title}
            </option>
          ))}
        </select>

        <label htmlFor="feedback-rating">Valutazione (1-5) *</label>
        <select
          id="feedback-rating"
          name="rating"
          value={form.rating}
          onChange={(event) => updateField('rating', event.target.value)}
          required
        >
          {[5, 4, 3, 2, 1].map((value) => (
            <option key={value} value={String(value)}>
              {value}
            </option>
          ))}
        </select>

        <label htmlFor="feedback-text">Feedback *</label>
        <textarea
          id="feedback-text"
          name="feedback"
          rows={5}
          value={form.feedback}
          onChange={(event) => updateField('feedback', event.target.value)}
          required
          placeholder="Cosa ti è piaciuto e cosa posso migliorare?"
        />

        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="contact-honeypot"
          value={form.websiteField}
          onChange={(event) => updateField('websiteField', event.target.value)}
          aria-hidden="true"
        />
      </fieldset>

      {status.type !== 'idle' && (
        <p className={status.type === 'error' ? 'form-feedback form-feedback-error' : 'form-feedback form-feedback-success'}>
          {status.message}
        </p>
      )}

      <button type="submit" className="button-link button-reset" disabled={isSubmitting || speeches.length === 0}>
        {isSubmitting ? 'Invio in corso...' : 'Invia feedback'}
      </button>
    </form>
  );
}
