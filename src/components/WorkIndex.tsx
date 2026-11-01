import Link from 'next/link';
import type { Project } from '@/data/site';
import { KitCover } from './KitCover';

// Index list. Fine pointers get a D-shaped preview that follows the pointer (setup.ts);
// touch gets an inline cover in each row.
export function WorkIndex({ items, headingLevel = 'h3' }: { items: Project[]; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel;
  return (
    <>
      <ul className="index" data-index>
        {items.map((p, i) => (
          <li key={p.slug}>
            <Link className="row" href={`/work/${p.slug}/`} data-preview={i} data-label={p.title}>
              <span className="row__marker" aria-hidden="true" />
              <span className="row__thumb" aria-hidden="true"><KitCover project={p} label={false} /></span>
              <H className="row__title">{p.title}</H>
              <span className="row__client">{p.client}</span>
              <span className="row__sector">{p.sector}</span>
              <span className="row__year tabular">{p.year}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="preview" data-preview-box aria-hidden="true">
        {items.map((p, i) => (
          <div key={p.slug} className="preview__cover" data-cover={i}><KitCover project={p} label={false} /></div>
        ))}
      </div>
    </>
  );
}
