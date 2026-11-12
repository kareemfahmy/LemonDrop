// Global motion for lemondrop.studio. Runs once on the client, before the first page initializes.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ease, isTouch, onPage, onScroll, prefersReducedMotion, setLoaderExit, setLoaderFormat, setTransition } from '@/engine';
import { startIdle } from './idle';
import { startKit } from './kit';

gsap.registerPlugin(ScrollTrigger, SplitText);

const smooth = (a: number, b: number, v: number) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };

export function setupMotion() {
  startIdle();
  startKit();
  loader();
  transition();
  hero();
  tone();
  headerAway();
  titles();
  workPreview();
  scramble();
}

// Loader: the parts arrive one by one and lock into the mark as fonts and assets load. The counter
// hook receives the real progress, so it also drives the assembly. Exit: the assembled mark flies to
// the header logo and becomes it, while the ink ground clears to show the page underneath.
function loader() {
  let parts: Record<string, SVGGElement> | null = null;
  setLoaderFormat((p) => {
    parts ??= Object.fromEntries(
      [...document.querySelectorAll<SVGGElement>('#loader [data-part]')].map((g) => [g.dataset.part!, g]),
    );
    const b = 1 - smooth(0, 38, p);
    const s = 1 - smooth(30, 68, p);
    const d = 1 - smooth(60, 100, p);
    parts.block?.setAttribute('transform', `translate(0 ${(b * 400).toFixed(1)})`);
    parts.step?.setAttribute('transform', `translate(0 ${(s * 160).toFixed(1)})`);
    parts.drop?.setAttribute('transform', `translate(${(d * 300).toFixed(1)} 0) rotate(${(d * 300 * 0.26).toFixed(1)} 360 188.5)`);
    return String(Math.round(p)).padStart(3, '0');
  });
  setLoaderExit((root, late) => {
    const mark = root.querySelector<HTMLElement>('.loader__mark')!;
    const target = document.querySelector<SVGElement>('[data-header] .header__mark');
    const tl = gsap.timeline();
    if (late) return tl.to(root, { autoAlpha: 0, duration: 0.35, ease: ease.soft });
    tl.to(root.querySelectorAll('[data-loader-out]'), { yPercent: 110, duration: 0.45, ease: ease.inOut, stagger: 0.04 });
    tl.to(root.querySelector('[data-loader-bar]'), { scaleX: 0, transformOrigin: 'right center', duration: 0.45, ease: ease.inOut }, 0);
    if (target && target.getBoundingClientRect().width > 0) {
      const from = mark.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const colour = getComputedStyle(target).color; // the logo follows the page tone
      gsap.set(target, { autoAlpha: 0 }); // the real logo waits for the flying one
      tl.to(mark, {
        x: to.left - from.left,
        y: to.top - from.top,
        scale: to.width / from.width,
        transformOrigin: '0 0',
        duration: 0.85,
        ease: ease.inOut,
      }, 0.05);
      tl.to(root, { backgroundColor: 'rgba(17, 17, 16, 0)', duration: 0.5, ease: ease.soft }, 0.3);
      tl.to(root.querySelector('.loader__svg'), { color: colour, duration: 0.5, ease: ease.soft }, 0.3);
      tl.to(root.querySelector('[data-part="drop"] path'), { fill: colour, duration: 0.3, ease: ease.soft }, 0.6);
      tl.set(target, { clearProps: 'opacity,visibility' });
      tl.set(root, { autoAlpha: 0 });
    } else {
      tl.to(mark, { yPercent: -30, autoAlpha: 0, duration: 0.5, ease: ease.inOut }, 0.05);
      tl.to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.6, ease: ease.inOut }, 0.15);
    }
    return tl;
  });
}

// Home hero: footage under the headline. It fades up with the page intro (so the loader hands over
// to flat ink first), plays only while the hero is on screen, and can be paused. Scrolling away
// drifts the footage and closes an ink veil over it, so the hero runs into the kit below.
function hero() {
  onPage(({ intro, instant }) => {
    const root = document.querySelector<HTMLElement>('[data-hero]');
    const video = root?.querySelector<HTMLVideoElement>('[data-hero-video]');
    if (!root || !video) return;
    const media = root.querySelector<HTMLElement>('[data-hero-media]')!;
    const toggle = root.querySelector<HTMLButtonElement>('[data-hero-toggle]');
    const label = root.querySelector<HTMLElement>('[data-hero-toggle-label]');
    const reduced = prefersReducedMotion();
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    let wanted = !reduced && !saveData; // the visitor's choice; off by default when they asked for less
    let inView = true;
    let alive = true;
    let ready = false; // set once fonts are in, so the footage never competes with them
    const sync = () => {
      if (!alive) return;
      if (wanted && inView && ready) { video.muted = true; video.play().catch(() => {}); } else video.pause();
      toggle?.setAttribute('aria-pressed', String(!wanted));
      if (label) label.textContent = wanted ? 'Pause video' : 'Play video';
    };
    const onClick = () => { wanted = !wanted; sync(); };
    toggle?.addEventListener('click', onClick);
    sync();
    document.fonts.ready.then(() => { ready = true; sync(); });
    ScrollTrigger.create({ trigger: root, start: 'top bottom', end: 'bottom top', onToggle: (self) => { inView = self.isActive; sync(); } });

    if (!reduced) {
      if (!instant) {
        gsap.set(media, { autoAlpha: 0, scale: 1.06 });
        intro.add(gsap.to(media, { autoAlpha: 1, scale: 1, duration: 1.8, ease: ease.out }), 0);
      }
      gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true } })
        .to(video, { yPercent: 14 }, 0)
        .to(root.querySelector('[data-hero-veil]'), { opacity: 1 }, 0)
        .to(root.querySelector('[data-hero-body]'), { yPercent: 18, autoAlpha: 0, duration: 0.7 }, 0);
    }
    return () => { alive = false; toggle?.removeEventListener('click', onClick); video.pause(); };
  });
}

// Page transition: a D rolls across the screen. Ink body, lemon bowl leading, the destination's
// name riding in the middle. It covers left to right, then keeps rolling off to the right.
function transition() {
  let label = '';
  document.addEventListener('ld:navigate', (e) => { label = (e as CustomEvent).detail?.label ?? ''; });
  setTransition({
    leave: (c) => {
      const panel = c.querySelector<HTMLElement>('.curtain__panel')!;
      const text = c.querySelector<HTMLElement>('[data-curtain-label]');
      if (text) text.textContent = label;
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(panel, { x: -(innerWidth + innerHeight / 2) }, { x: 0, duration: 0.85, ease: ease.inOut })
        .fromTo(text, { yPercent: 110 }, { yPercent: 0, duration: 0.6, ease: ease.out }, 0.45);
    },
    enter: (c) => {
      const panel = c.querySelector<HTMLElement>('.curtain__panel')!;
      const text = c.querySelector<HTMLElement>('[data-curtain-label]');
      return gsap.timeline()
        .to(text, { yPercent: -110, duration: 0.45, ease: ease.inOut })
        .to(panel, { x: innerWidth, duration: 0.85, ease: ease.inOut }, 0.15)
        .set(c, { autoAlpha: 0 });
    },
  });
}

// Header tone: follows the section under it. Sections paint their own colours, so content is
// always right; only the fixed header needs to know where it is.
function tone() {
  const html = document.documentElement;
  onPage(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('[data-tone]')];
    html.dataset.tone = sections[0]?.dataset.tone ?? 'light';
    const sts = sections.map((s) => ScrollTrigger.create({
      trigger: s,
      start: 'top 36px',
      end: 'bottom 36px',
      onToggle: (self) => { if (self.isActive) html.dataset.tone = s.dataset.tone; },
    }));
    return () => sts.forEach((st) => st.kill());
  });
}

// The header steps aside while reading down and returns only after a deliberate scroll up. Away
// from the top it comes back on a solid band in the section's tone, so it never sits on type.
function headerAway() {
  let last = 0;
  let up = 0;
  const html = document.documentElement;
  onScroll(({ y }) => {
    const d = y - last;
    last = y;
    html.classList.toggle('header-solid', y > 80);
    if (html.classList.contains('menu-open')) return;
    if (y < 200) { up = 0; html.classList.remove('header-away'); return; }
    if (d > 0) { up = 0; html.classList.add('header-away'); }
    else if (d < 0 && (up -= d) > 80) html.classList.remove('header-away');
  });
  onPage(() => { up = 0; html.classList.remove('header-away', 'header-solid'); });
}

// Page titles: real text at first paint (it is the LCP and sits under the loader), then split into
// lines that slide up and lock as the page intro plays.
function titles() {
  onPage(({ intro, instant }) => {
    if (prefersReducedMotion() || instant) return;
    document.querySelectorAll<HTMLElement>('[data-title]').forEach((el) => {
      const split = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'split-line' });
      gsap.set(split.lines, { yPercent: 110 });
      intro.add(gsap.to(split.lines, { yPercent: 0, duration: 1.2, stagger: 0.08, ease: ease.out }), 0);
    });
  });
}

// Work index: a D-shaped preview of the project's cover follows the pointer (fine pointers only;
// touch shows inline covers instead).
function workPreview() {
  onPage(() => {
    const list = document.querySelector<HTMLElement>('[data-index]');
    const box = document.querySelector<HTMLElement>('[data-preview-box]');
    if (!list || !box || isTouch() || prefersReducedMotion()) return;
    const covers = [...box.querySelectorAll<HTMLElement>('[data-cover]')];
    const x = gsap.quickTo(box, 'x', { duration: 0.6, ease: ease.soft });
    const y = gsap.quickTo(box, 'y', { duration: 0.6, ease: ease.soft });
    const rot = gsap.quickTo(box, 'rotation', { duration: 0.8, ease: ease.soft });
    let lastX = 0, px = 0, py = 0;
    // Anchored over the right-hand columns so the title and client stay readable; the pointer
    // still steers it a little and tips it as it moves.
    const anchor = () => innerWidth - box.offsetWidth / 2 - parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.5;
    const move = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      x(anchor() + (px / innerWidth - 0.5) * 40); y(py); rot(gsap.utils.clamp(-6, 6, (px - lastX) * 0.3)); lastX = px;
    };
    const show = (e: Event) => {
      const i = (e.currentTarget as HTMLElement).dataset.preview;
      covers.forEach((c) => c.classList.toggle('is-on', c.dataset.cover === i));
      gsap.to(box, { autoAlpha: 1, scale: 1, duration: 0.5, ease: ease.out, overwrite: 'auto' });
    };
    const hide = () => gsap.to(box, { autoAlpha: 0, scale: 0.8, duration: 0.35, ease: ease.out, overwrite: 'auto' });
    const rows = [...list.querySelectorAll<HTMLElement>('[data-preview]')];
    rows.forEach((a) => a.addEventListener('pointerenter', show));
    list.addEventListener('pointerleave', hide);
    addEventListener('pointermove', move);
    const off = onScroll(() => { if (!list.contains(document.elementFromPoint(px, py))) hide(); });
    return () => {
      rows.forEach((a) => a.removeEventListener('pointerenter', show));
      list.removeEventListener('pointerleave', hide);
      removeEventListener('pointermove', move);
      off();
      gsap.set(box, { autoAlpha: 0 });
    };
  });
}

// Scramble: a label assembles from the parts. Each letter holds its own slot (no layout shift) and
// shows as a block, a step or a drop until it settles, in a random order. Plays once when the
// label scrolls in and again on hover. The real text stays in the DOM; the link carries the name.
function scramble() {
  const SHAPES = ['block', 'step', 'drop'];
  onPage(() => {
    if (prefersReducedMotion()) return;
    const offs: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>('[data-scramble]').forEach((el) => {
      const split = SplitText.create(el, { type: 'words,chars', charsClass: 'scr', aria: 'none' });
      const chars = split.chars as HTMLElement[];
      const order = gsap.utils.shuffle(chars.map((_, i) => i));
      const state = { p: 0 };
      const draw = () => chars.forEach((c, i) => {
        const settle = 0.18 + (order[i] / chars.length) * 0.78;
        if (state.p >= settle) delete c.dataset.s;
        else c.dataset.s = SHAPES[(i + Math.floor(state.p * 16)) % 3];
      });
      draw();
      const play = (duration: number) => gsap.fromTo(state, { p: 0 }, { p: 1, duration, ease: 'none', onUpdate: draw, overwrite: true });
      ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => play(1.5) });
      const host = el.closest('a') ?? el;
      if (!isTouch()) {
        const again = () => { if (state.p === 1) play(0.8); };
        host.addEventListener('pointerenter', again);
        offs.push(() => host.removeEventListener('pointerenter', again));
      }
    });
    return () => offs.forEach((f) => f());
  });
}
