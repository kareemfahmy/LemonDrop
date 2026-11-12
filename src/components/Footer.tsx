import Link from 'next/link';
import { nav, site } from '@/data/site';
import { CairoTime } from './CairoTime';

// Footer finale: the primary action at the scale of the page. One D (square left, round right),
// the same shape as the small button, that floods with lemon from its square end on hover or
// focus. Its label assembles from the three parts when it scrolls in (setup.ts, scramble).
export function Footer() {
  const year = 2026;
  return (
    <footer className="footer" data-tone="dark">
      <div className="footer__top">
        <h2 className="footer__title" data-split="lines">Have an idea that needs taking apart?</h2>
        <div className="footer__action">
          <a className="footer__email" href={`mailto:${site.email}`}>{site.email}</a>
          <p className="footer__time">
            It is <CairoTime /> in {site.city}. We reply within one working day.
          </p>
        </div>
      </div>
      <Link className="bigd" href="/contact/" aria-label="Start a project" data-label="Start a project">
        <span className="bigd__fill" aria-hidden="true" />
        <span className="bigd__label" aria-hidden="true" data-scramble>Start a project</span>
        <span className="bigd__arrow" aria-hidden="true">→</span>
      </Link>
      <div className="footer__bottom">
        <p>© {year} {site.name}</p>
        <ul className="footer__links">
          <li><Link href="/">Home</Link></li>
          {nav.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}
          {site.socials.map((s) => <li key={s.href}><a href={s.href} rel="me noopener" target="_blank">{s.label}</a></li>)}
        </ul>
        <p className="footer__colophon">Set in Archivo and Host Grotesk. The mark is three parts.</p>
      </div>
    </footer>
  );
}
