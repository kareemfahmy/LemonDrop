import Link from 'next/link';
import type { ReactNode } from 'react';

// Primary action: a D (square left, round right, the logo's own curve). On hover or focus a lemon
// drop slides in round-end first and floods it while the label rolls one line.
export function DButton({ href, children, className = '', external = false }: { href: string; children: string; className?: string; external?: boolean }) {
  const inner = (
    <>
      <span className="dbtn__fill" aria-hidden="true" />
      <span className="dbtn__label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      <span className="dbtn__arrow" aria-hidden="true">→</span>
    </>
  );
  if (external) return <a className={`dbtn ${className}`} href={href} data-label={children}>{inner}</a>;
  return <Link className={`dbtn ${className}`} href={href} data-label={children}>{inner}</Link>;
}

// Nav and secondary links: the label rolls inside a clipped line.
export function Roll({ href, children, current, className = '' }: { href: string; children: string; current?: boolean; className?: string }) {
  return (
    <Link className={`roll ${className}`} href={href} aria-current={current ? 'page' : undefined} data-label={children}>
      <span className="roll__marker" aria-hidden="true" />
      <span className="roll__clip">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </Link>
  );
}

// Text link with an arrow that nudges along its direction.
export function ArrowLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link className={`alink ${className}`} href={href}>
      <span className="alink__text">{children}</span>
      <span className="alink__arrow" aria-hidden="true">→</span>
    </Link>
  );
}
