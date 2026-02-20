import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sessions',
  description: 'Legacy speaking URL. See the updated speaking page.'
};

export default function SessionsPage() {
  return (
    <section className="page container">
      <div className="card">
        <h1>Sessions moved</h1>
        <p className="lead">
          The updated speaking page is now available at <code>/speaking</code>.
        </p>
        <Link href="/speaking" className="button-link">
          Go to speaking page
        </Link>
      </div>
    </section>
  );
}
