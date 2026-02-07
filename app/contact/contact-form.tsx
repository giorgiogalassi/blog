'use client';

import { FormEvent, useMemo, useState } from 'react';

const requestTypes = [
  { value: 'NewProject', label: 'New project / development' },
  { value: 'Consulting', label: 'Consulting (1–2 hours) / review' },
  { value: 'PerformanceAudit', label: 'Performance / Core Web Vitals' },
  { value: 'DesignSystem', label: 'Design system / component library' },
  { value: 'Mentoring', label: 'Mentoring / coaching' },
  { value: 'TalkEvent', label: 'Talk / event / workshop' },
  { value: 'Other', label: 'Other' }
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
      setStatus({ type: 'error', message: 'Fill in name, email, and request type.' });
      return;
    }

    if (projectSummaryRequired && !form.projectSummary.trim()) {
      setStatus({ type: 'error', message: 'Add a project summary so I can estimate scope and timing.' });
      return;
    }

    if (!form.privacyAccepted) {
      setStatus({ type: 'error', message: 'You must accept the privacy policy to submit your request.' });
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

      setStatus({ type: 'success', message: payload.message ?? 'Request submitted successfully.' });
      setForm(initialState);
    } catch {
      setStatus({ type: 'error', message: 'Network error. Please try again in a few minutes.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form contact-form-extended" onSubmit={handleSubmit} noValidate>
      <fieldset>
        <legend>Section A — Request type</legend>
        <label htmlFor="requestType">Request type *</label>
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
        <legend>Section B — Contact details</legend>
        <label htmlFor="name">Name *</label>
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

        <label htmlFor="company">Company</label>
        <input id="company" name="company" value={form.company} onChange={(event) => updateField('company', event.target.value)} />

        <label htmlFor="role">Role</label>
        <input id="role" name="role" value={form.role} onChange={(event) => updateField('role', event.target.value)} />

        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="url" value={form.website} onChange={(event) => updateField('website', event.target.value)} />
      </fieldset>

      {renderConditionalSection(form, updateField, projectSummaryRequired)}

      <fieldset>
        <legend>Materials and privacy</legend>

        <label htmlFor="materialsLink">Link to materials (Drive, Notion, Loom...)</label>
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
          I've read the <a href="/privacy">privacy policy</a> *
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
        {isSubmitting ? 'Sending...' : 'Send request'}
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
        <legend>Section C — Consulting details</legend>
        <label htmlFor="topic">What do you need help with? *</label>
        <textarea id="topic" rows={4} value={form.topic} onChange={(event) => updateField('topic', event.target.value)} required />

        <p className="field-caption">For timing and duration, please book directly through the Calendly link above.</p>

      </fieldset>
    );
  }

  if (form.requestType === 'PerformanceAudit') {
    return (
      <fieldset>
        <legend>Section C — Performance audit</legend>
        <CommonProjectFields form={form} updateField={updateField} projectSummaryRequired={projectSummaryRequired} forceProjectLinkRequired />

        <label htmlFor="stack">Stack (e.g. Next.js, Astro...)</label>
        <input id="stack" value={form.stack} onChange={(event) => updateField('stack', event.target.value)} />

        <label>Pain points</label>
        <div className="checkbox-group">
          {['High LCP', 'CLS', 'Large bundle', 'Images', 'render-blocking'].map((item) => (
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

        <label>Analytics access</label>
        <div className="radio-group">
          {['Yes', 'No'].map((item) => (
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
        <legend>Section C — Design system</legend>
        <CommonProjectFields form={form} updateField={updateField} projectSummaryRequired={projectSummaryRequired} hideTimeline />

        <label>Current status</label>
        <div className="radio-group">
          {['From scratch', 'Partial', 'Already exists'].map((item) => (
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

        <label>Design source</label>
        <div className="radio-group">
          {['Figma', 'No design', 'Other'].map((item) => (
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

        <label htmlFor="tech">Technology</label>
        <input id="tech" value={form.tech} onChange={(event) => updateField('tech', event.target.value)} />

        <label htmlFor="componentsCount">Number of components</label>
        <select id="componentsCount" value={form.componentsCount} onChange={(event) => updateField('componentsCount', event.target.value)}>
          <option value="">Select...</option>
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
        <legend>Section C — Mentoring</legend>
        <label htmlFor="level">Level</label>
        <select id="level" value={form.level} onChange={(event) => updateField('level', event.target.value)}>
          <option value="">Select...</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>

        <label htmlFor="goals">Goals *</label>
        <textarea id="goals" rows={5} value={form.goals} onChange={(event) => updateField('goals', event.target.value)} required />

        <label>Frequency</label>
        <div className="radio-group">
          {['Weekly', 'Bi-weekly', 'One-off'].map((item) => (
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
        <legend>Section C — Talk / Event</legend>
        <label htmlFor="eventName">Event name *</label>
        <input id="eventName" value={form.eventName} onChange={(event) => updateField('eventName', event.target.value)} required />

        <label htmlFor="eventDate">Date *</label>
        <input id="eventDate" value={form.eventDate} onChange={(event) => updateField('eventDate', event.target.value)} required />

        <label htmlFor="location">Location</label>
        <input id="location" value={form.location} onChange={(event) => updateField('location', event.target.value)} />

        <label htmlFor="audienceSize">Audience size</label>
        <select id="audienceSize" value={form.audienceSize} onChange={(event) => updateField('audienceSize', event.target.value)}>
          <option value="">Select...</option>
          <option value="<50">&lt;50</option>
          <option value="50-200">50–200</option>
          <option value="200+">200+</option>
        </select>

        <label htmlFor="topic">Topic *</label>
        <textarea id="topic" rows={4} value={form.topic} onChange={(event) => updateField('topic', event.target.value)} required />

        <label>Fee budget</label>
        <div className="radio-group">
          {['<1k', '1–3k', '3k+', 'To be defined'].map((item) => (
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
        <legend>Section C — Other</legend>
        <label htmlFor="message">Message *</label>
        <textarea id="message" rows={6} value={form.message} onChange={(event) => updateField('message', event.target.value)} required />
      </fieldset>
    );
  }

  return (
    <fieldset>
      <legend>Section C — Project info</legend>
      <CommonProjectFields form={form} updateField={updateField} projectSummaryRequired={projectSummaryRequired} />
    </fieldset>
  );
}

function CommonProjectFields({
  form,
  updateField,
  projectSummaryRequired,
  forceProjectLinkRequired,
  hideTimeline
}: {
  form: FormState;
  updateField: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  projectSummaryRequired: boolean;
  forceProjectLinkRequired?: boolean;
  hideTimeline?: boolean;
}) {
  return (
    <>
      <label htmlFor="projectSummary">
        Project summary {projectSummaryRequired ? '*' : ''}
      </label>
      <textarea
        id="projectSummary"
        rows={5}
        placeholder="What you want to achieve, context, and what is not working today."
        value={form.projectSummary}
        onChange={(event) => updateField('projectSummary', event.target.value)}
        required={projectSummaryRequired}
      />
      <p className="field-caption">
        If you do not have full details, a draft is fine: goal + link + constraints.
      </p>

      <hr className="field-divider" />

      <label htmlFor="projectLink">Product/site link {forceProjectLinkRequired ? '*' : '(if available)'}</label>
      <input
        id="projectLink"
        type="url"
        value={form.projectLink}
        onChange={(event) => updateField('projectLink', event.target.value)}
        required={forceProjectLinkRequired}
      />

      {!hideTimeline && (
        <>
          <label htmlFor="deadline">Timeline</label>
          <select id="deadline" value={form.deadline} onChange={(event) => updateField('deadline', event.target.value)}>
            <option value="">Select...</option>
            <option value="ASAP (1–2 weeks)">ASAP (1–2 weeks)</option>
            <option value="Within 1 month">Within 1 month</option>
            <option value="1–3 months">1–3 months</option>
            <option value="3+ months">3+ months</option>
            <option value="Flexible / to be defined">Flexible / to be defined</option>
          </select>
        </>
      )}

      <label>Budget range</label>
      <p className="field-caption">This helps me quickly understand whether I can help and avoid back-and-forth with no context.</p>
      <div className="radio-group">
        {['< 1k', '1–3k', '3–7k', '7–15k', '15k+', "I'm not sure / I want an estimate"].map((item) => (
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

      <hr className="field-divider" />

      <label>Engagement type</label>
      <div className="radio-group">
        {['Fixed price', 'Time & materials', 'Not sure'].map((item) => (
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

      <label htmlFor="startPreference">When would you like to start?</label>
      <select id="startPreference" value={form.startPreference} onChange={(event) => updateField('startPreference', event.target.value)}>
        <option value="">Select...</option>
        <option value="Immediately">Immediately</option>
        <option value="In 2–4 weeks">In 2–4 weeks</option>
        <option value="In 1–2 months">In 1–2 months</option>
        <option value="To be defined">To be defined</option>
      </select>
    </>
  );
}
