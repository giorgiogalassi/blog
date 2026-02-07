import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Chi sono, come lavoro e cosa condivido in questo blog personale.'
};

export default function AboutPage() {
  return (
    <section className="page container">
      <h1>About</h1>
      <p className="lead">
        Sono un software engineer focalizzato su prodotti web mantenibili, DX e performance di base.
      </p>
      <p>
        In questo progetto preferisco semplicità e configurazione centralizzata per ridurre attrito
        quando il blog crescerà (tag, RSS, analytics, newsletter, MDX).
      </p>
    </section>
  );
}
