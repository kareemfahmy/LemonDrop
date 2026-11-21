import Link from 'next/link';
import type { Project } from '@/data/site';
import { KitCover } from './KitCover';

// Selected work: one portrait plate per project, each appearing on its own clock
// (data-reveal="appear"). The plates are the only way into the projects from the home page, so
// each is a real link with its name, client and year. Covers are the generated placeholders until
// real imagery exists (see DESIGN.md, "Project imagery").
export function WorkPlates({ items }: { items: Project[] }) {
  return (
    <ul className="plates">
      {items.map((p, i) => (
        <li key={p.slug} className="plate">
          <Link className="plate__link" href={`/work/${p.slug}/`} data-label={p.title}>
            <span className="plate__media" data-reveal="appear" data-appear={i}>
              <KitCover project={p} label={false} />
            </span>
            <span className="plate__cap">
              <h3 className="plate__name"><span className="plate__mark" data-plate-mark aria-hidden="true" />{p.title}</h3>
              <span className="plate__meta">{p.sector}, <span className="tabular">{p.year}</span></span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
