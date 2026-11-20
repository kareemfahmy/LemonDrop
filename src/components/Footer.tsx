'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { footerCta, nav, site } from '@/data/site';
import { CairoTime } from './CairoTime';
import { DButton } from './Links';

// Footer. The page lifts off it: the footer is fixed under the content and revealed as the last
// section scrolls away. Three columns of small type (the ask and its action with the studio's status,
// the site map, contact), then the field: the L and the D drawn in dots, reaching for each other from
// opposite sides as the footer is revealed; the dots scatter from the pointer and glow lemon near it
// (setup.ts, footerField). The name closes the page, set huge and dim, cut by the bottom edge.
// The action follows the page: on the contact page it offers the work, not the page you are on.
export function Footer() {
  const year = 2026;
  const path = usePathname();
  const cta = path.startsWith('/contact') ? footerCta.contact : footerCta.default;
  return (
    <footer className="footer" data-tone="dark" data-footer>
      <div className="footer__cols">
        <div className="footer__lead">
          {/* Keyed: the engine splits these into lines, so a new text needs a new node. */}
          <h2 key={cta.ask} className="footer__title" data-split="lines">{cta.ask}</h2>
          <DButton href={cta.href} className="dbtn--small">{cta.label}</DButton>
          <ul className="footer__status">
            <li><span className="footer__dot" aria-hidden="true" />Taking on new projects</li>
            <li><span className="footer__dot footer__dot--still" aria-hidden="true" />Replies within one working day</li>
          </ul>
        </div>
        <nav className="footer__nav" aria-label="Footer">
          <ul>
            <li><Link href="/">Home</Link></li>
            {nav.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}
            {site.socials.map((s) => <li key={s.href}><a href={s.href} rel="me noopener" target="_blank">{s.label}</a></li>)}
          </ul>
        </nav>
        <div className="footer__contact">
          <a className="footer__email" href={`mailto:${site.email}`}>{site.email}</a>
          <p className="footer__time">{site.city}, <CairoTime /></p>
          <p className="footer__colophon">Set in Inter and Geist Mono.</p>
        </div>
      </div>

      <div className="footer__field" data-field aria-hidden="true">
        <canvas className="footer__canvas" data-field-canvas />
        <p className="footer__legal">© {year} {site.name}<br />Made in {site.city}.<br />Built properly.</p>
      </div>

      <p className="footer__word" aria-hidden="true">
        <span className="wm">
          <span className="wm__g wm__g--mark">
            <svg className="wm__shape" viewBox="0 0 229 377" focusable="false"><path d="M0 0H148V250H229V377H0Z" /></svg>
          </span>
          {'EMON'.split('').map((c, i) => <span key={`a${i}`} className="wm__g">{c}</span>)}
          <span className="wm__g wm__g--mark wm__g--d">
            <svg className="wm__shape" viewBox="0 0 274.5 377" focusable="false"><path d="M0 0H86A188.5 188.5 0 0 1 86 377H0Z" /></svg>
          </span>
          {'ROP'.split('').map((c, i) => <span key={`b${i}`} className="wm__g">{c}</span>)}
        </span>
      </p>
    </footer>
  );
}
