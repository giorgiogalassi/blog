const proofItems = [
  { value: '10+', label: 'Years Experience' },
  { value: '30+', label: 'Conference Talks' },
  { value: 'Angular', label: 'Architecture Specialist' },
  { value: 'Community', label: 'Lead' }
];

export function ProofBar() {
  return (
    <section className="proof-bar" aria-label="Professional proof points">
      {proofItems.map((item) => (
        <article key={item.label} className="proof-item">
          <p className="proof-value">{item.value}</p>
          <p className="proof-label">{item.label}</p>
        </article>
      ))}
    </section>
  );
}
