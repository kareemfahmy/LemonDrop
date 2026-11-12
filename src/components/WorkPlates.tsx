import Link from 'next/link';
import type { Project } from '@/data/site';
import { KitCover } from './KitCover';

// Project visuals above the index: one portrait plate per project, each appearing on its own
// clock (data-reveal="appear"). Pointer-only shortcuts: the index below carries the same links for
// keyboards and screen readers, so the plates stay out of the tab order. Covers are the generated
// placeholders until real imagery exists (see DESIGN.md, "Project imagery").
export function WorkPlates({ items }: { items: Project[] }) {
  return (
    <ul className="plates" aria-hidden="true">
      {items.map((p, i) => (
        <li key={p.slug} className="plate">
          <Link className="plate__link" href={`/work/${p.slug}/`} tabIndex={-1} data-label={p.title}>
            <span className="plate__media" data-reveal="appear" data-appear={i}>
              <KitCover project={p} label={false} />
            </span>
            <span className="plate__cap">
              <span>{p.title}</span>
              <span className="tabular">{p.year}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
