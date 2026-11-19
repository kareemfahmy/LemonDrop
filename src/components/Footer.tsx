'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { footerCta, nav, site } from '@/data/site';
import { CairoTime } from './CairoTime';

// Footer: one compact section with two halves. Left, the primary action as a D (square left, round
// right) that floods with lemon on hover or focus, its label assembling from the three parts when
// it scrolls in. Right, the bench: the same three parts, loose, for the visitor to put together;
// building the mark floods the button. The action follows the page: on the contact page it offers
// the work, not the page you are on.
export function Footer() {
  const year = 2026;
  const path = usePathname();
  const cta = path.startsWith('/contact') ? footerCta.contact : footerCta.default;
  return (
    <footer className="footer" data-tone="dark">
      <div className="footer__main">
        <div className="footer__lead">
          {/* Keyed: the engine splits these into lines and characters, so a new text needs a new node. */}
          <h2 key={cta.ask} className="footer__title" data-split="lines">{cta.ask}</h2>
          <Link className="bigd" href={cta.href} aria-label={cta.label} data-label={cta.label}>
            <span className="bigd__fill" aria-hidden="true" />
            <span key={cta.label} className="bigd__label" aria-hidden="true" data-scramble>{cta.label}</span>
            <span className="bigd__arrow" aria-hidden="true">→</span>
          </Link>
          <div className="footer__action">
            <a className="footer__email" href={`mailto:${site.email}`}>{site.email}</a>
            <p className="footer__time">
              It is <CairoTime /> in {site.city}. We reply within one working day.
            </p>
          </div>
        </div>
        {/* The bench: the mark in three loose parts, to put together by hand (setup.ts, bench). A toy,
            so it is hidden from assistive tech and absent without JS or under reduced motion. */}
        <div className="bench" data-bench>
          <div className="bench__head">
            <p className="bench__hint">
              <span className="bench__open">Your turn. Put the mark together.</span>
              <span className="bench__built">Built properly. That is the whole job.</span>
            </p>
            <button type="button" className="bench__btn" data-bench-btn>
              <span className="bench__open">Do it for me</span>
              <span className="bench__built">Take it apart</span>
            </button>
          </div>
          <div className="bench__table" data-bench-table aria-hidden="true">
            <span className="bench__ghost bench__ghost--l" data-bench-ghost="block">
              <svg viewBox="0 0 229 377" preserveAspectRatio="none" focusable="false"><path d="M0.5 0.5H147.5V250.5H228.5V376.5H0.5Z" /></svg>
            </span>
            <span className="bench__ghost bench__ghost--drop" data-bench-ghost="drop" />
            <span className="bench__part bench__part--l" data-bench-part="block" />
            <span className="bench__part bench__part--drop" data-bench-part="drop" />
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>© {year} {site.name}</p>
        <ul className="footer__links">
          <li><Link href="/">Home</Link></li>
          {nav.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}
          {site.socials.map((s) => <li key={s.href}><a href={s.href} rel="me noopener" target="_blank">{s.label}</a></li>)}
        </ul>
        <p className="footer__colophon">Set in Inter and Geist Mono. The mark is an L and a drop.</p>
      </div>
    </footer>
  );
}
