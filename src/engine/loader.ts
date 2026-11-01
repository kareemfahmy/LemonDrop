// First-load sequence. Progress follows REAL work (fonts + critical images), eased by GSAP,
// with a floor so it reads as intentional and a ceiling so it never becomes a usability problem.
// Markup (#loader) lives in the layout; its look is authored per project.
import { gsap } from 'gsap';
import { ease, prefersReducedMotion } from './env';

let format = (p: number) => String(Math.round(p)).padStart(3, '0');
/** Customize the counter text, e.g. a clock, a year, a frame count. p goes 0 → 100. */
export const setLoaderFormat = (fn: (p: number) => string) => { format = fn; };
type Exit = (root: HTMLElement, late: boolean) => gsap.core.Timeline;
let exit: Exit | null = null;
/** Replace the exit choreography (the loader → hero handoff). `late`: JS booted late, keep it short. */
export const setLoaderExit = (fn: Exit) => { exit = fn; };

// Timed from navigation start (the loader is visible from the first paint, not from boot).
const MIN = 1.1; // seconds: long enough to read as a designed moment
const MAX = 2.6; // seconds: a longer loader is a usability problem
const EXIT = 0.8; // seconds reserved for the exit

function criticalAssets(): Promise<unknown>[] {
  const imgs = [...document.querySelectorAll<HTMLImageElement>('img[data-critical], [data-intro] img')];
  return [document.fonts.ready, ...imgs.map((i) => (i.complete ? Promise.resolve() : i.decode().catch(() => {})))];
}

export async function runLoader(): Promise<void> {
  const root = document.getElementById('loader');
  if (!root) return;
  if (document.documentElement.classList.contains('seen')) return finish(root);
  if (prefersReducedMotion()) {
    await Promise.race([Promise.all(criticalAssets()), wait(MAX)]);
    await gsap.to(root, { autoAlpha: 0, duration: 0.3 });
    return finish(root);
  }
  const count = root.querySelector<HTMLElement>('[data-loader-count]');
  const bar = root.querySelector<HTMLElement>('[data-loader-bar]');
  const tasks = criticalAssets();
  let done = 0;
  const shown = { v: 0 };
  const target = { v: 0 };
  tasks.forEach((t) => t.then(() => { done++; target.v = (done / tasks.length) * 100; }));
  const late = performance.now() / 1000 > MAX - EXIT - 0.3; // slow device: skip the counting

  await new Promise<void>((resolve) => {
    const tick = () => {
      const elapsed = performance.now() / 1000;
      const timeCap = Math.min(100, (elapsed / MIN) * 100); // never faster than MIN
      const goal = late || elapsed > MAX - EXIT - 0.3 ? 100 : Math.min(target.v, timeCap); // leave room for the exit
      shown.v += (goal - shown.v) * (late ? 1 : 1 - Math.pow(0.8, gsap.ticker.deltaRatio())); // frame-rate independent
      if (goal === 100 && shown.v > 99.5) shown.v = 100;
      if (count) count.textContent = format(shown.v);
      if (bar) bar.style.transform = `scaleX(${shown.v / 100})`;
      if (shown.v === 100) { gsap.ticker.remove(tick); resolve(); }
    };
    gsap.ticker.add(tick);
  });

  if (exit) { await exit(root, late); return finish(root); }
  await gsap.timeline()
    .to(root.querySelectorAll('[data-loader-out]'), { yPercent: -110, duration: 0.7, ease: ease.inOut, stagger: 0.05 })
    .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: ease.inOut }, '-=0.35');
  finish(root);
}

// Hide rather than remove: in React apps the loader node belongs to React.
function finish(root: HTMLElement) {
  root.hidden = true;
  try { sessionStorage.setItem('ld-seen', '1'); } catch {}
  document.documentElement.classList.add('is-loaded');
}

const wait = (s: number) => new Promise((r) => setTimeout(r, s * 1000));
