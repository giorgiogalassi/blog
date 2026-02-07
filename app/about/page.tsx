import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Who I am, how I work, and what I publish on this personal blog.'
};

export default function AboutPage() {
  return (
    <section className="page container">
      <h1>About</h1>
      <p className="lead">
        I am a software engineer focused on maintainable web products, developer experience, and
        baseline performance.
      </p>
      <p>
        In this project I prioritize simplicity and centralized configuration to reduce friction as
        the blog grows (tags, RSS, analytics, newsletter, MDX).
      </p>
    </section>
  );
}
