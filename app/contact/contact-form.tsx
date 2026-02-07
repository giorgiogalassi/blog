'use client';

import { FormEvent, useMemo, useState } from 'react';

const requestTypes = [
  { value: 'NewProject', label: 'Nuovo progetto / sviluppo' },
  { value: 'Consulting', label: 'Consulenza (1–2 ore) / revisione' },
  { value: 'PerformanceAudit', label: 'Performance / Core Web Vitals' },
  { value: 'DesignSystem', label: 'Design system / component library' },
  { value: 'Mentoring', label: 'Mentoring / affiancamento' },
  { value: 'TalkEvent', label: 'Talk / evento / workshop' },
  { value: 'Other', label: 'Altro' }
] as const;

type RequestType = (typeof requestTypes)[number]['value'];

type FormState = {
  requestType: RequestType;
  name: string;
  email: string;
  company: string;
  role: string;
  website: string;
  projectSummary: string;
  projectLink: string;
  deadline: string;
  budgetRange: string;
  engagementType: string;
  startPreference: string;
  topic: string;
  format: string;
  preferredTimes: string;
  stack: string;
  painPoints: string[];
  accessToAnalytics: string;
  currentState: string;
  designSource: string;
  tech: string;
  componentsCount: string;
  level: string;
  goals: string;
  frequency: string;
  eventName: string;
  eventDate: string;
  location: string;
  audienceSize: string;
  feeBudget: string;
  message: string;
  materialsLink: string;
  privacyAccepted: boolean;
  marketingAccepted: boolean;
  websiteField: string;
};

const initialState: FormState = {
  requestType: 'NewProject',
  name: '',
  email: '',
  company: '',
  role: '',
  website: '',
  projectSummary: '',
  projectLink: '',
  deadline: '',
  budgetRange: '',
  engagementType: '',
  startPreference: '',
  topic: '',
  format: '',
  preferredTimes: '',
  stack: '',
  painPoints: [],
  accessToAnalytics: '',
  currentState: '',
  designSource: '',
  tech: '',
  componentsCount: '',
  level: '',
  goals: '',
  frequency: '',
  eventName: '',
  eventDate: '',
  location: '',
  audienceSize: '',
  feeBudget: '',
  message: '',
  materialsLink: '',
  privacyAccepted: false,
  marketingAccepted: false,
  websiteField: ''
};

type SubmitStatus = { type: 'idle' } | { type: 'error'; message: string } | { type: 'success'; message: string };

function requiresProjectSummary(requestType: RequestType) {
  return ['NewProject', 'PerformanceAudit', 'DesignSystem'].includes(requestType);
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<SubmitStatus>({ type: 'idle' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectSummaryRequired = useMemo(() => requiresProjectSummary(form.requestType), [form.requestType]);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: 'idle' });

    if (!form.name.trim() || !form.email.trim() || !form.requestType) {
      setStatus({ type: 'error', message: 'Compila nome, email e tipo richiesta.' });
      return;
    }

    if (projectSummaryRequired && !form.projectSummary.trim()) {
      setStatus({ type: 'error', message: 'Aggiungi un riassunto del progetto per aiutarmi a stimare tempi e scope.' });
      return;
    }

    if (!form.privacyAccepted) {
      setStatus({ type: 'error', message: 'Devi accettare la privacy policy per inviare la richiesta.' });
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
        setStatus({ type: 'error', message: payload.message ?? 'Invio non riuscito. Riprova tra poco.' });
        return;
      }

      setStatus({ type: 'success', message: payload.message ?? 'Richiesta inviata correttamente.' });
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
        <legend>Sezione A — Tipo richiesta</legend>
        <label htmlFor="requestType">Tipo richiesta *</label>
        <select
          id="requestType"
          name="requestType"
          value={form.requestType}
          onChange={(event) => updateField('requestType', event.target.value as RequestType)}
          required
        >
          {requestTypes.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset>
        <legend>Sezione B — Contatti</legend>
        <label htmlFor="name">Nome *</label>
        <input id="name" name="name" value={form.name} onChange={(event) => updateField('name', event.target.value)} required />

        <label htmlFor="email">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(event) => updateField('email', event.target.value)}
          required
        />

        <label htmlFor="company">Azienda</label>
        <input id="company" name="company" value={form.company} onChange={(event) => updateField('company', event.target.value)} />

        <label htmlFor="role">Ruolo</label>
        <input id="role" name="role" value={form.role} onChange={(event) => updateField('role', event.target.value)} />

        <label htmlFor="website">Sito web</label>
        <input id="website" name="website" type="url" value={form.website} onChange={(event) => updateField('website', event.target.value)} />
      </fieldset>

      {renderConditionalSection(form, updateField, projectSummaryRequired)}

      <fieldset>
        <legend>Materiali e privacy</legend>

        <label htmlFor="materialsLink">Link a materiali (Drive, Notion, Loom...)</label>
        <input
          id="materialsLink"
          name="materialsLink"
          type="url"
          value={form.materialsLink}
          onChange={(event) => updateField('materialsLink', event.target.value)}
        />

        <label className="checkbox-row" htmlFor="privacyAccepted">
          <input
            id="privacyAccepted"
            name="privacyAccepted"
            type="checkbox"
            checked={form.privacyAccepted}
            onChange={(event) => updateField('privacyAccepted', event.target.checked)}
            required
          />
          Ho letto la <a href="/privacy">privacy policy</a> *
        </label>

        <label className="checkbox-row" htmlFor="marketingAccepted">
          <input
            id="marketingAccepted"
            name="marketingAccepted"
            type="checkbox"
            checked={form.marketingAccepted}
            onChange={(event) => updateField('marketingAccepted', event.target.checked)}
          />
          Voglio ricevere aggiornamenti occasionali.
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
      </fieldset>

      {status.type !== 'idle' && (
        <p className={status.type === 'error' ? 'form-feedback form-feedback-error' : 'form-feedback form-feedback-success'}>
          {status.message}
        </p>
      )}

      <button type="submit" className="button-link button-reset" disabled={isSubmitting}>
        {isSubmitting ? 'Invio in corso...' : 'Invia richiesta'}
      </button>
    </form>
  );
}

function renderConditionalSection(
  form: FormState,
  updateField: <K extends keyof FormState>(key: K, value: FormState[K]) => void,
  projectSummaryRequired: boolean
) {
  if (form.requestType === 'Consulting') {
    return (
      <fieldset>
        <legend>Sezione C — Dettagli consulenza</legend>
        <label htmlFor="topic">Su cosa vuoi una mano? *</label>
        <textarea id="topic" rows={4} value={form.topic} onChange={(event) => updateField('topic', event.target.value)} required />

        <p className="field-caption">In alternativa puoi prenotare subito una call dal bottone in alto.</p>

        <label>Formato *</label>
        <div className="radio-group">
          {['Call 60’', 'Call 90’', 'Call 2h'].map((item) => (
            <label key={item}>
              <input
                type="radio"
                name="format"
                checked={form.format === item}
                onChange={() => updateField('format', item)}
              />
              {item}
            </label>
          ))}
        </div>

        <label htmlFor="preferredTimes">Fasce orarie preferite</label>
        <input id="preferredTimes" value={form.preferredTimes} onChange={(event) => updateField('preferredTimes', event.target.value)} />
      </fieldset>
    );
  }

  if (form.requestType === 'PerformanceAudit') {
    return (
      <fieldset>
        <legend>Sezione C — Audit performance</legend>
        <CommonProjectFields form={form} updateField={updateField} projectSummaryRequired={projectSummaryRequired} forceProjectLinkRequired />

        <label htmlFor="stack">Stack (es. Next.js, Astro...)</label>
        <input id="stack" value={form.stack} onChange={(event) => updateField('stack', event.target.value)} />

        <label>Pain points</label>
        <div className="checkbox-group">
          {['LCP alto', 'CLS', 'bundle grande', 'immagini', 'render-blocking'].map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={form.painPoints.includes(item)}
                onChange={(event) => {
                  updateField(
                    'painPoints',
                    event.target.checked
                      ? [...form.painPoints, item]
                      : form.painPoints.filter((entry) => entry !== item)
                  );
                }}
              />
              {item}
            </label>
          ))}
        </div>

        <label>Accesso analytics</label>
        <div className="radio-group">
          {['Sì', 'No'].map((item) => (
            <label key={item}>
              <input
                type="radio"
                name="accessToAnalytics"
                checked={form.accessToAnalytics === item}
                onChange={() => updateField('accessToAnalytics', item)}
              />
              {item}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (form.requestType === 'DesignSystem') {
    return (
      <fieldset>
        <legend>Sezione C — Design system</legend>
        <CommonProjectFields form={form} updateField={updateField} projectSummaryRequired={projectSummaryRequired} hideDeadline />

        <label>Stato attuale</label>
        <div className="radio-group">
          {['Da zero', 'Parziale', 'Esiste già'].map((item) => (
            <label key={item}>
              <input
                type="radio"
                name="currentState"
                checked={form.currentState === item}
                onChange={() => updateField('currentState', item)}
              />
              {item}
            </label>
          ))}
        </div>

        <label>Sorgente design</label>
        <div className="radio-group">
          {['Figma', 'Nessun design', 'Altro'].map((item) => (
            <label key={item}>
              <input
                type="radio"
                name="designSource"
                checked={form.designSource === item}
                onChange={() => updateField('designSource', item)}
              />
              {item}
            </label>
          ))}
        </div>

        <label htmlFor="tech">Tecnologia</label>
        <input id="tech" value={form.tech} onChange={(event) => updateField('tech', event.target.value)} />

        <label htmlFor="componentsCount">Numero componenti</label>
        <select id="componentsCount" value={form.componentsCount} onChange={(event) => updateField('componentsCount', event.target.value)}>
          <option value="">Seleziona...</option>
          <option value="<10">&lt;10</option>
          <option value="10-30">10–30</option>
          <option value="30+">30+</option>
        </select>
      </fieldset>
    );
  }

  if (form.requestType === 'Mentoring') {
    return (
      <fieldset>
        <legend>Sezione C — Mentoring</legend>
        <label htmlFor="level">Livello</label>
        <select id="level" value={form.level} onChange={(event) => updateField('level', event.target.value)}>
          <option value="">Seleziona...</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>

        <label htmlFor="goals">Obiettivi *</label>
        <textarea id="goals" rows={5} value={form.goals} onChange={(event) => updateField('goals', event.target.value)} required />

        <label>Frequenza</label>
        <div className="radio-group">
          {['Settimanale', 'Bisettimanale', 'One-off'].map((item) => (
            <label key={item}>
              <input
                type="radio"
                name="frequency"
                checked={form.frequency === item}
                onChange={() => updateField('frequency', item)}
              />
              {item}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (form.requestType === 'TalkEvent') {
    return (
      <fieldset>
        <legend>Sezione C — Talk / Evento</legend>
        <label htmlFor="eventName">Nome evento *</label>
        <input id="eventName" value={form.eventName} onChange={(event) => updateField('eventName', event.target.value)} required />

        <label htmlFor="eventDate">Data *</label>
        <input id="eventDate" value={form.eventDate} onChange={(event) => updateField('eventDate', event.target.value)} required />

        <label htmlFor="location">Location</label>
        <input id="location" value={form.location} onChange={(event) => updateField('location', event.target.value)} />

        <label htmlFor="audienceSize">Dimensione audience</label>
        <select id="audienceSize" value={form.audienceSize} onChange={(event) => updateField('audienceSize', event.target.value)}>
          <option value="">Seleziona...</option>
          <option value="<50">&lt;50</option>
          <option value="50-200">50–200</option>
          <option value="200+">200+</option>
        </select>

        <label htmlFor="topic">Topic *</label>
        <textarea id="topic" rows={4} value={form.topic} onChange={(event) => updateField('topic', event.target.value)} required />

        <label>Budget fee</label>
        <div className="radio-group">
          {['<1k', '1–3k', '3k+', 'Da definire'].map((item) => (
            <label key={item}>
              <input
                type="radio"
                name="feeBudget"
                checked={form.feeBudget === item}
                onChange={() => updateField('feeBudget', item)}
              />
              {item}
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  if (form.requestType === 'Other') {
    return (
      <fieldset>
        <legend>Sezione C — Altro</legend>
        <label htmlFor="message">Messaggio *</label>
        <textarea id="message" rows={6} value={form.message} onChange={(event) => updateField('message', event.target.value)} required />
      </fieldset>
    );
  }

  return (
    <fieldset>
      <legend>Sezione C — Info progetto</legend>
      <CommonProjectFields form={form} updateField={updateField} projectSummaryRequired={projectSummaryRequired} />
    </fieldset>
  );
}

function CommonProjectFields({
  form,
  updateField,
  projectSummaryRequired,
  forceProjectLinkRequired,
  hideDeadline
}: {
  form: FormState;
  updateField: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  projectSummaryRequired: boolean;
  forceProjectLinkRequired?: boolean;
  hideDeadline?: boolean;
}) {
  return (
    <>
      <label htmlFor="projectSummary">
        Riassunto progetto {projectSummaryRequired ? '*' : ''}
      </label>
      <textarea
        id="projectSummary"
        rows={5}
        placeholder="Cosa vuoi ottenere, contesto, cosa non funziona oggi."
        value={form.projectSummary}
        onChange={(event) => updateField('projectSummary', event.target.value)}
        required={projectSummaryRequired}
      />
      <p className="field-caption">
        Se non hai dettagli, va bene anche una bozza: obiettivo + link + vincoli.
      </p>

      <label htmlFor="projectLink">Link al prodotto/sito {forceProjectLinkRequired ? '*' : '(se esiste)'}</label>
      <input
        id="projectLink"
        type="url"
        value={form.projectLink}
        onChange={(event) => updateField('projectLink', event.target.value)}
        required={forceProjectLinkRequired}
      />

      {!hideDeadline && (
        <>
          <label htmlFor="deadline">Deadline</label>
          <select id="deadline" value={form.deadline} onChange={(event) => updateField('deadline', event.target.value)}>
            <option value="">Seleziona...</option>
            <option value="ASAP (1–2 settimane)">ASAP (1–2 settimane)</option>
            <option value="Entro 1 mese">Entro 1 mese</option>
            <option value="1–3 mesi">1–3 mesi</option>
            <option value="3+ mesi">3+ mesi</option>
            <option value="Flessibile / da definire">Flessibile / da definire</option>
          </select>
        </>
      )}

      <label>Budget range</label>
      <p className="field-caption">Mi serve per dirti subito se posso aiutarti e per evitare ping inutili.</p>
      <div className="radio-group">
        {['< 1k', '1–3k', '3–7k', '7–15k', '15k+', 'Non lo so / voglio una stima'].map((item) => (
          <label key={item}>
            <input
              type="radio"
              name="budgetRange"
              checked={form.budgetRange === item}
              onChange={() => updateField('budgetRange', item)}
            />
            {item}
          </label>
        ))}
      </div>

      <label>Tipo di ingaggio</label>
      <div className="radio-group">
        {['Fixed price', 'Time & materials', 'Non so'].map((item) => (
          <label key={item}>
            <input
              type="radio"
              name="engagementType"
              checked={form.engagementType === item}
              onChange={() => updateField('engagementType', item)}
            />
            {item}
          </label>
        ))}
      </div>

      <label htmlFor="startPreference">Quando vuoi iniziare?</label>
      <select id="startPreference" value={form.startPreference} onChange={(event) => updateField('startPreference', event.target.value)}>
        <option value="">Seleziona...</option>
        <option value="Subito">Subito</option>
        <option value="Tra 2–4 settimane">Tra 2–4 settimane</option>
        <option value="Tra 1–2 mesi">Tra 1–2 mesi</option>
        <option value="Da definire">Da definire</option>
      </select>
    </>
  );
}
