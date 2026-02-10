import type { Metadata } from 'next';

import { FeedbackForm } from '@/app/feedback/feedback-form';
import { getSpeakerSessionYears, getSpeakerSessionsByYear } from '@/lib/sessionize';

export const metadata: Metadata = {
  title: 'Feedback speech',
  description: 'Lascia un feedback su uno dei miei speech selezionando anno e sessione da Sessionize.'
};

type FeedbackPageProps = {
  searchParams: Promise<{ year?: string }>;
};

function getCurrentYear() {
  return new Date().getFullYear();
}

export default async function FeedbackPage({ searchParams }: FeedbackPageProps) {
  const params = await searchParams;
  const availableYears = await getSpeakerSessionYears();

  const currentYear = getCurrentYear();
  const parsedYear = Number(params.year);
  const hasValidYear = Number.isFinite(parsedYear) && availableYears.includes(parsedYear);

  const selectedYear = hasValidYear ? parsedYear : (availableYears[0] ?? currentYear);
  const speeches = await getSpeakerSessionsByYear(selectedYear);

  return (
    <section className="page container">
      <h1>Feedback speech</h1>
      <p className="lead">
        Grazie per aver partecipato: scegli l&apos;anno, seleziona lo speech e lasciami un feedback rapido.
      </p>

      <form method="get" className="feedback-year-form" aria-label="Selezione anno speech">
        <label htmlFor="speech-year">Anno dello speech</label>
        <select id="speech-year" name="year" defaultValue={String(selectedYear)}>
          {[...new Set([currentYear, ...availableYears])]
            .sort((a, b) => b - a)
            .map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
        </select>
        <button type="submit" className="button-link button-reset">
          Carica speech
        </button>
      </form>

      {speeches.length === 0 ? (
        <p className="note">Nessuno speech trovato per l&apos;anno selezionato.</p>
      ) : null}

      <FeedbackForm
        year={selectedYear}
        speeches={speeches.map((speech) => ({
          id: speech.id,
          title: speech.title
        }))}
      />
    </section>
  );
}
