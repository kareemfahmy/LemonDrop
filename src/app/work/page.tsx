import type { Metadata } from 'next';
import Link from 'next/link';
import { KitCover } from '@/components/KitCover';
import { projects } from '@/data/site';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected LemonDrop projects: online stores, product interfaces, brand sites and internal tools, each planned, designed and engineered by one studio.',
};

export default function WorkPage() {
  return (
    <>
      <section className="page-head grid" data-tone="light">
        <h1 className="page-head__title display" data-title>Work</h1>
        <p className="page-head__meta">{projects.length} projects. Placeholder case studies until the real ones are published.</p>
        <p className="page-head__lede">Stores, products, brands and tools. Different briefs, the same method: take the idea apart, then build every part properly.</p>
      </section>
      <section className="wall grid" data-tone="light" aria-label="All projects">
        {projects.map((p) => (
          <article key={p.slug} className="wall__item" data-reveal="up">
            <Link className="card" href={`/work/${p.slug}/`} data-label={p.title}>
              <div className="card__media"><KitCover project={p} label={false} /></div>
              <div className="card__body">
                <h2 className="card__title">{p.title}</h2>
                <span className="card__year tabular">{p.year}</span>
                <p className="card__summary">{p.client}. {p.summary}</p>
              </div>
            </Link>
          </article>
        ))}
      </section>
    </>
  );
}
