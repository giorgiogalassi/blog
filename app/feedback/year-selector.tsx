'use client';

type YearSelectorProps = {
  selectedYear: number;
  years: number[];
};

export function YearSelector({ selectedYear, years }: YearSelectorProps) {
  return (
    <form method="get" className="feedback-year-form" aria-label="Talk year selection">
      <label htmlFor="speech-year">Talk year</label>
      <select
        id="speech-year"
        name="year"
        defaultValue={String(selectedYear)}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
}
