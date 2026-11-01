'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { nav } from '@/data/site';
import { startScroll, stopScroll } from '@/engine';
import { DButton, Roll } from './Links';
import { Mark } from './Mark';

const isCurrent = (path: string, href: string) => path === href || path === href.replace(/\/$/, '') || path.startsWith(href);

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  // Close on navigation.
  useEffect(() => {
    const close = () => setOpen(false);
    document.addEventListener('ld:navigate', close);
    return () => document.removeEventListener('ld:navigate', close);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) { startScroll(); return; }
    stopScroll();
    const links = () => [...(menu.current?.querySelectorAll<HTMLElement>('a, button') ?? [])];
    links()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); button.current?.focus(); return; }
      if (e.key !== 'Tab') return;
      const all = [button.current!, ...links()];
      const i = all.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (i <= 0 ? all.length - 1 : i - 1) : (i + 1) % all.length;
      e.preventDefault();
      all[next]?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="header" data-header>
      <Link className="header__logo" href="/" aria-label="LemonDrop, home" data-label="Home">
        <Mark className="header__mark" />
        <span className="header__word" aria-hidden="true">LemonDrop</span>
      </Link>
      <nav className="header__nav" aria-label="Main">
        <ul>
          {nav.map((n) => (
            <li key={n.href}><Roll href={n.href} current={isCurrent(path, n.href)}>{n.label}</Roll></li>
          ))}
        </ul>
        <DButton href="/contact/" className="dbtn--small">Start a project</DButton>
      </nav>
      <button
        ref={button}
        className="header__menu"
        type="button"
        aria-expanded={open}
        aria-controls="menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="header__menu-text">{open ? 'Close' : 'Menu'}</span>
        <span className="header__menu-drop" aria-hidden="true" />
      </button>
      <div id="menu" ref={menu} className="menu" hidden={!open}>
        <nav aria-label="Menu">
          <ul className="menu__list">
            <li><Link href="/" aria-current={path === '/' ? 'page' : undefined}>Home</Link></li>
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} aria-current={isCurrent(path, n.href) ? 'page' : undefined}>{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <DButton href="/contact/">Start a project</DButton>
      </div>
    </header>
  );
}
