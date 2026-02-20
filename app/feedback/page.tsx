import type { Metadata } from 'next';

import { FeedbackForm } from '@/app/feedback/feedback-form';
import { YearSelector } from '@/app/feedback/year-selector';
import { getSpeakerSessionYears, getSpeakerSessionsByYear } from '@/lib/sessionize';

export const metadata: Metadata = {
  title: 'Talk feedback',
  description: 'Share feedback about one of my talks by selecting year and session from Sessionize.'
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
  const fallbackYear = availableYears[0] ?? getCurrentYear();

  const parsedYear = Number(params.year);
  const hasValidYear = Number.isFinite(parsedYear) && availableYears.includes(parsedYear);
  const selectedYear = hasValidYear ? parsedYear : fallbackYear;

  const speeches = await getSpeakerSessionsByYear(selectedYear);
  const years = [...new Set([fallbackYear, ...availableYears])].sort((a, b) => b - a);

  return (
    <section className="page container feedback-page">
      <h1>Talk feedback</h1>
      <p className="lead">
        Thanks for attending. Pick the year and choose the talk you want to review.
      </p>

      <YearSelector selectedYear={selectedYear} years={years} />

      {speeches.length === 0 ? <p className="note">No talks found for the selected year.</p> : null}

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
