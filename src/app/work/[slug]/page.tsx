import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CraftFigure } from '@/components/CraftFigure';
import { KitCover } from '@/components/KitCover';
import { projects, site } from '@/data/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/work/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: `${p.title}, ${p.sector.toLowerCase()} for a ${p.client.toLowerCase()}`, description: p.summary };
}

export default async function CasePage({ params }: PageProps<'/work/[slug]'>) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title,
    about: p.summary,
    dateCreated: String(p.year),
    creator: { '@type': 'Organization', name: site.name, url: site.url },
  };

  return (
    <article>
      <header className="case-head grid" data-tone="light">
        <p className="case-head__eyebrow">{p.sector}, {p.year}</p>
        <h1 className="case-head__title display" data-title>{p.title}</h1>
        <p className="case-head__summary">{p.summary}</p>
        <dl className="case-meta">
          <dt>Client</dt><dd>{p.client}</dd>
          <dt>Year</dt><dd className="tabular">{p.year}</dd>
          <dt>Parts</dt><dd>{p.services.join(', ')}</dd>
        </dl>
      </header>

      <div className="case-cover" data-tone="light">
        <div className="case-cover__media" data-reveal="clip" data-intro data-delay="0.2">
          <KitCover project={p} />
        </div>
        {p.placeholder && (
          <p className="case-note">Placeholder case study: the client, brief and outcome are illustrative and will be replaced with real work.</p>
        )}
      </div>

      <div className="case-body grid" data-tone="light">
        <section className="case-block" aria-labelledby="context">
          <h2 id="context" className="case-block__h">Context</h2>
          <p className="case-block__p" data-split="lines">{p.context}</p>
        </section>
        <section className="case-block" aria-labelledby="idea">
          <h2 id="idea" className="case-block__h">The idea</h2>
          <p className="case-block__p" data-split="lines">{p.idea}</p>
        </section>
        <section className="craft" aria-labelledby="craft">
          <h2 id="craft" className="craft__h">Craft</h2>
          {p.craft.map((c) => (
            <figure key={c.kind} className="craft__fig" data-reveal="up">
              <div className="craft__frame"><CraftFigure project={p} item={c} /></div>
              <figcaption className="craft__cap">{c.caption}</figcaption>
            </figure>
          ))}
        </section>
        <section className="case-block" aria-labelledby="outcome">
          <h2 id="outcome" className="case-block__h">What shipped</h2>
          <p className="case-block__p">{p.outcome}</p>
        </section>
      </div>

      <nav className="next" data-tone="light" aria-label="Next project">
        <p className="next__label">Next project</p>
        <Link className="next__link" href={`/work/${next.slug}/`} data-label={next.title}>
          <span className="next__drop" aria-hidden="true" />
          <span className="next__title">{next.title}</span>
        </Link>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    </article>
  );
}
