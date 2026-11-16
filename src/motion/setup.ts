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
  interludes();
  bigTitle();
  services();
  scramble();
  bench();
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
// drifts the footage and closes an ink veil over it, so the hero runs into the section below.
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
        .to(root.querySelector('[data-hero-body]'), { yPercent: 18, opacity: 0, duration: 0.7 }, 0);
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

// Interlude: the moment between the services and the work. It follows the scroll while it is on
// screen; under reduced motion it is static.
function interludes() {
  onPage(() => {
    if (prefersReducedMotion()) return;
    // The rule: the line draws from left to right and the drop rolls along it to the far end,
    // a whole number of turns so it arrives upright.
    const rule = document.querySelector<HTMLElement>('[data-rule]');
    const line = rule?.querySelector<HTMLElement>('[data-rule-line]');
    const drop = rule?.querySelector<HTMLElement>('[data-rule-drop]');
    const lane = rule?.querySelector<HTMLElement>('[data-rule-track]');
    if (rule && line && drop && lane) {
      const travel = () => lane.clientWidth - drop.offsetWidth - drop.offsetLeft * 2;
      const turns = () => Math.max(1, Math.round(travel() / (Math.PI * drop.offsetHeight)));
      gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: rule, start: 'top 92%', end: 'top 30%', scrub: 0.5, invalidateOnRefresh: true } })
        .fromTo(line, { scaleX: 0 }, { scaleX: 1 }, 0)
        .fromTo(drop, { x: 0, rotation: 0 }, { x: travel, rotation: () => turns() * 360 }, 0);
    }
  });
}

// "What we make": the three words of the title drift sideways at different speeds for as long as
// the title is on screen, so the composition keeps re-forming as you scroll. The outlined word
// travels furthest, crossing the other two.
function bigTitle() {
  onPage(() => {
    const el = document.querySelector<HTMLElement>('[data-wwm]');
    if (!el || prefersReducedMotion()) return;
    const word = (n: string) => el.querySelector<HTMLElement>(`[data-wwm-word="${n}"]`);
    const vw = (f: number) => () => innerWidth * f;
    gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true } })
      .fromTo(word('what'), { x: vw(0.16) }, { x: vw(-0.36) }, 0)
      .fromTo(word('we'), { x: vw(0.035) }, { x: vw(-0.07) }, 0)
      .fromTo(word('make'), { x: vw(0.04) }, { x: vw(-0.1) }, 0);
  });
}

// Service rows: the drop marks your place. It rolls down the list to the row at the middle of the
// screen as you scroll, and that row comes forward. Scroll is the only input: a pointer passing
// over the list while you scroll changes nothing. One driver: a target position, an eased
// position, and the roll derived from the distance travelled.
function services() {
  onPage(() => {
    const wrap = document.querySelector<HTMLElement>('[data-caps]');
    const drop = wrap?.querySelector<HTMLElement>('[data-caps-drop]');
    if (!wrap || !drop || prefersReducedMotion()) return;
    const rows = [...wrap.querySelectorAll<HTMLElement>('.cap')];
    if (!rows.length) return;
    wrap.classList.add('is-driven');
    let top = 0;
    let centres: number[] = [];
    const measure = () => {
      top = wrap.getBoundingClientRect().top + scrollY;
      centres = rows.map((r) => { const b = r.getBoundingClientRect(); return b.top + scrollY - top + b.height / 2; });
    };
    measure();
    let active = -1;
    let y = centres[0];
    let visible = false;
    const setY = gsap.quickSetter(drop, 'y', 'px');
    const setR = gsap.quickSetter(drop, 'rotation', 'deg');
    gsap.set(drop, { yPercent: -50 });
    // Position as a row count (2.5 = halfway between the third and fourth rows).
    const turns = (at: number) => {
      for (let i = 0; i < centres.length - 1; i++) {
        if (at <= centres[i + 1]) return i + (at - centres[i]) / (centres[i + 1] - centres[i]);
      }
      return centres.length - 1;
    };
    const nearest = (line: number) => centres.reduce((best, c, i) => (Math.abs(c - line) < Math.abs(centres[best] - line) ? i : best), 0);
    const draw = (instant = false) => {
      const target = nearest(scrollY + innerHeight * 0.5 - top);
      const to = centres[target];
      y = instant ? to : y + (to - y) * (1 - Math.pow(0.88, gsap.ticker.deltaRatio()));
      setY(y);
      setR(turns(y) * 360); // one full turn per row, so it always comes to rest upright
      if (target !== active) { active = target; rows.forEach((r, i) => r.classList.toggle('is-on', i === active)); }
    };
    draw(true);
    const tick = () => { if (visible) draw(); };
    gsap.ticker.add(tick);
    const st = ScrollTrigger.create({ trigger: wrap, start: 'top bottom', end: 'bottom top', onRefresh: () => { measure(); draw(true); }, onToggle: (self) => { visible = self.isActive; } });
    return () => { gsap.ticker.remove(tick); st.kill(); wrap.classList.remove('is-driven'); rows.forEach((r) => r.classList.remove('is-on')); };
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

// The bench (footer): the mark as three loose parts. They slide in scattered; the visitor drags
// each one to its outline, where it locks. All three locked = built, and the big button floods.
// A button does it for them, or takes it apart again. Drag and throw come from GSAP's Draggable
// and InertiaPlugin, loaded only when the bench is about to be seen.
function bench() {
  const UNITS = { block: [0, 0, 148, 377], step: [148, 250, 81, 127], drop: [247, 0, 274.5, 377] } as const;
  type Name = keyof typeof UNITS;
  const NAMES = Object.keys(UNITS) as Name[];
  onPage(() => {
    const root = document.querySelector<HTMLElement>('[data-bench]');
    const table = root?.querySelector<HTMLElement>('[data-bench-table]');
    const button = root?.querySelector<HTMLButtonElement>('[data-bench-btn]');
    if (!root || !table || prefersReducedMotion()) return;
    const footer = root.closest<HTMLElement>('.footer');
    const el = (kind: 'part' | 'ghost', n: Name) => table.querySelector<HTMLElement>(`[data-bench-${kind}="${n}"]`)!;
    const home = {} as Record<Name, { x: number; y: number }>;
    const away = {} as Record<Name, { x: number; y: number; r: number }>;
    const locked: Record<Name, boolean> = { block: false, step: false, drop: false };
    let alive = true;
    let entered = false;
    let drags: { kill: () => void }[] = [];

    root.classList.add('is-ready'); // it has no size until it is shown
    const layout = () => {
      const W = table.clientWidth;
      const H = table.clientHeight;
      const s = Math.min((H * 0.5) / 377, (W * 0.37) / 522);
      const ox = (W - 522 * s) / 2;
      const oy = (H - 377 * s) / 2;
      NAMES.forEach((n) => {
        const [x, y, w, h] = UNITS[n];
        gsap.set([el('part', n), el('ghost', n)], { width: w * s, height: h * s });
        home[n] = { x: ox + x * s, y: oy + y * s };
        gsap.set(el('ghost', n), { x: home[n].x, y: home[n].y });
      });
      // Loose positions: block top left, step low and left of centre, drop far right. Clear of the outline.
      away.block = { x: W * 0.05, y: H * 0.1, r: -9 };
      away.step = { x: Math.max(W * 0.05, ox - 81 * s - W * 0.06), y: H - 127 * s - H * 0.06, r: 13 };
      away.drop = { x: W - 274.5 * s - W * 0.04, y: H * 0.2, r: 16 };
    };
    const sync = () => {
      const built = NAMES.every((n) => locked[n]);
      root.classList.toggle('is-built', built);
      footer?.classList.toggle('is-built', built);
    };
    const send = (n: Name, toHome: boolean, delay = 0) => {
      locked[n] = toHome;
      const to = toHome ? { ...home[n], r: 0 } : away[n];
      return gsap.to(el('part', n), { x: to.x, y: to.y, rotation: to.r, duration: toHome ? 0.7 : 0.9, delay, ease: ease.out, overwrite: true, onComplete: sync });
    };
    // Where a released part came to rest: on its outline (lock), near it (pull it in), or anywhere else.
    const near = (n: Name) => Math.hypot(Number(gsap.getProperty(el('part', n), 'x')) - home[n].x, Number(gsap.getProperty(el('part', n), 'y')) - home[n].y) < table.clientHeight * 0.17;
    const settle = (n: Name) => {
      if (near(n)) send(n, true);
      else { locked[n] = false; sync(); }
    };
    const arm = async () => {
      const [{ Draggable }, { InertiaPlugin }] = await Promise.all([import('gsap/Draggable'), import('gsap/InertiaPlugin')]);
      if (!alive) return;
      gsap.registerPlugin(Draggable, InertiaPlugin);
      drags.forEach((d) => d.kill());
      drags = NAMES.map((n) => Draggable.create(el('part', n), {
        type: 'x,y',
        bounds: table,
        inertia: true,
        edgeResistance: 0.75,
        onPress() { locked[n] = false; sync(); },
        // Let go over the outline and it locks, however fast it was moving; otherwise it is thrown.
        onDragEnd() { if (near(n)) { this.tween?.kill(); send(n, true); } else if (!this.tween) settle(n); },
        onThrowComplete() { settle(n); },
      })[0]);
    };

    layout();
    NAMES.forEach((n) => gsap.set(el('part', n), { x: away[n].x, y: away[n].y, rotation: away[n].r, autoAlpha: 0 }));
    const enter = ScrollTrigger.create({
      trigger: table,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        entered = true;
        arm();
        const H = table.clientHeight;
        const W = table.clientWidth;
        gsap.fromTo(el('part', 'block'), { y: H + 40, autoAlpha: 1 }, { y: away.block.y, duration: 1.1, ease: ease.out });
        gsap.fromTo(el('part', 'step'), { y: H + 40, autoAlpha: 1 }, { y: away.step.y, duration: 1.1, delay: 0.12, ease: ease.out });
        gsap.fromTo(el('part', 'drop'), { x: W + 40, rotation: away.drop.r + 70, autoAlpha: 1 }, { x: away.drop.x, rotation: away.drop.r, duration: 1.2, delay: 0.24, ease: ease.out });
      },
    });
    // A resize moves the outlines: put every part back where its state says it belongs.
    let width = table.clientWidth;
    const onRefresh = () => {
      if (table.clientWidth === width) return;
      width = table.clientWidth;
      layout();
      NAMES.forEach((n) => { const to = locked[n] ? { ...home[n], r: 0 } : away[n]; gsap.set(el('part', n), { x: to.x, y: to.y, rotation: to.r }); });
      if (entered) arm();
    };
    ScrollTrigger.addEventListener('refresh', onRefresh);
    const onClick = () => {
      const build = !NAMES.every((n) => locked[n]);
      NAMES.forEach((n, i) => { if (!build || !locked[n]) send(n, build, i * 0.09); });
      if (!build) sync();
    };
    button?.addEventListener('click', onClick);
    return () => {
      alive = false;
      enter.kill();
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      button?.removeEventListener('click', onClick);
      drags.forEach((d) => d.kill());
      root.classList.remove('is-ready', 'is-built');
      footer?.classList.remove('is-built');
    };
  });
}
