import Link from 'next/link';
import { nav, site } from '@/data/site';
import { CairoTime } from './CairoTime';
import { DButton } from './Links';
import { KitDrawing } from './KitDrawing';

export function Footer() {
  const year = 2026;
  return (
    <footer className="footer" data-tone="dark">
      <div className="footer__top">
        <h2 className="footer__title" data-split="lines">Have an idea that needs taking apart?</h2>
        <div className="footer__action">
          <DButton href="/contact/">Start a project</DButton>
          <a className="footer__email" href={`mailto:${site.email}`}>{site.email}</a>
          <p className="footer__time">
            It is <CairoTime /> in {site.city}. We reply within one working day.
          </p>
        </div>
      </div>
      <div className="footer__mark" data-lean>
        <KitDrawing uid="foot" className="footer__svg" dims={false} />
      </div>
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
