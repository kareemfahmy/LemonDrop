// The driver for the signature: ONE variable, the chapter k (0 = hero, 1 strategy, 2 design,
// 3 engineering, 4 shipped), mapped to every part of the exploded drawing: how far the parts come
// apart, which part is lit, the drop's roll and the dimension labels. Idle input adds a breath and
// a lean toward the pointer so the mark is never frozen. Also drives the footer mark (lean only).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobile, onPage, prefersReducedMotion } from '@/engine';
import { idle } from './idle';
import { FILL_BOX } from '@/components/KitDrawing';

type PartName = 'block' | 'step' | 'drop';
const PARTS: PartName[] = ['block', 'step', 'drop'];
// Exploded position, and the position when that part is the one being talked about (SVG units).
const E: Record<PartName, [number, number]> = { block: [-56, 0], step: [36, 72], drop: [100, -24] };
const F: Record<PartName, [number, number]> = { block: [-118, 0], step: [78, 124], drop: [176, -46] };
const CENTRE: Record<PartName, number> = { block: 1, drop: 2, step: 3 };
const DEPTH: Record<PartName, number> = { block: 8, step: 14, drop: 22 }; // pointer lean, SVG units
const ROLL = 0.26; // degrees of roll per unit the drop travels

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (a: number, b: number, v: number) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t); };

/** How far apart the parts are at chapter k (holds on each chapter, travels between them). */
const explode = (k: number) => (k <= 1 ? smooth(0.12, 0.88, k) : k >= 3 ? 1 - smooth(3.12, 3.88, k) : 1);
/** How much part p is the subject at chapter k. */
const weight = (p: PartName, k: number) => smooth(0, 1, clamp01(1.7 * (1 - Math.abs(k - CENTRE[p])) - 0.35));

type Rig = {
  parts: Record<PartName, SVGGElement>;
  shapes: Record<PartName, SVGGElement>;
  clips: Record<PartName, SVGRectElement>;
  dims: SVGGElement[];
  hasDims: boolean;
};

function rig(svg: SVGSVGElement): Rig {
  const parts = {} as Rig['parts'];
  const shapes = {} as Rig['shapes'];
  const clips = {} as Rig['clips'];
  PARTS.forEach((p) => {
    parts[p] = svg.querySelector(`[data-part="${p}"]`)!;
    shapes[p] = parts[p].querySelector('[data-shape]')!;
    clips[p] = parts[p].querySelector('[data-fill-clip]')!;
  });
  const dims = [...svg.querySelectorAll<SVGGElement>('[data-dim]')];
  return { parts, shapes, clips, dims, hasDims: dims.length > 0 };
}

function draw(r: Rig, k: number, breathe: number, lean: { x: number; y: number }, lit = true) {
  const e = Math.max(explode(k), breathe);
  for (const p of PARTS) {
    const w = weight(p, k);
    const ex = E[p][0] + (F[p][0] - E[p][0]) * w;
    const ey = E[p][1] + (F[p][1] - E[p][1]) * w;
    const x = ex * e + lean.x * DEPTH[p];
    const y = ey * e + lean.y * DEPTH[p];
    r.parts[p].setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)})`);
    if (p === 'drop') r.shapes.drop.setAttribute('transform', `rotate(${(ex * explode(k) * ROLL).toFixed(2)} 360 188.5)`);
    if (lit) {
      const v = 1 - explode(k) * (1 - w); // the fill rises inside the outline
      const { y: by, h } = FILL_BOX[p];
      r.clips[p].setAttribute('y', (by + h * (1 - v)).toFixed(1));
      r.clips[p].setAttribute('height', (h * v).toFixed(1));
    }
  }
  if (r.hasDims) {
    const o = explode(k).toFixed(3);
    r.dims.forEach((d) => { d.style.opacity = o; });
  }
}

export function startKit() {
  const reduced = prefersReducedMotion();

  onPage(() => {
    const section = document.querySelector<HTMLElement>('[data-kit]');
    const svg = section?.querySelector<SVGSVGElement>('.kit__svg');
    if (!section || !svg) return;
    const r = rig(svg);
    let k = 0;
    let visible = true;
    const render = () => {
      const breathe = reduced ? 0 : (0.5 + 0.5 * Math.sin(idle.t * 0.9)) * 0.07;
      draw(r, k, breathe, reduced ? { x: 0, y: 0 } : { x: idle.x * 2, y: idle.y * 2 });
    };
    // k follows the real chapter positions: chapter i is "on" when its copy reaches the reading
    // line (the top of the screen on desktop, just under the sticky mark on phones).
    const chapterEls = [...section.querySelectorAll<HTMLElement>('[data-chapter]')];
    let stops: number[] = [];
    const measure = () => {
      const line = isMobile() ? innerHeight * 0.3 : 0;
      const top = (el: HTMLElement) => el.getBoundingClientRect().top + scrollY;
      stops = [top(section), ...chapterEls.map((c) => top(c) - line)];
    };
    const chapterAt = (y: number) => {
      if (y <= stops[0]) return 0;
      for (let i = 0; i < stops.length - 1; i++) {
        if (y < stops[i + 1]) return i + (y - stops[i]) / (stops[i + 1] - stops[i]);
      }
      return stops.length - 1;
    };
    measure();
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      invalidateOnRefresh: true,
      onRefresh: measure,
      onUpdate: (self) => {
        const raw = chapterAt(self.scroll());
        k = reduced ? Math.round(raw) : raw;
        const active = Math.round(raw);
        chapterEls.forEach((c, i) => c.classList.toggle('is-active', i + 1 === active));
        if (reduced) render();
      },
    });
    const vis = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => { visible = self.isActive; },
    });
    render();
    if (reduced) return () => { st.kill(); vis.kill(); };
    const tick = () => { if (visible) render(); };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); st.kill(); vis.kill(); };
  });

  // Footer mark: assembled, breathing slightly and leaning toward the pointer.
  onPage(() => {
    const wrap = document.querySelector<HTMLElement>('[data-lean]');
    const svg = wrap?.querySelector<SVGSVGElement>('svg');
    if (!wrap || !svg || reduced) return;
    const r = rig(svg);
    let visible = false;
    const vis = ScrollTrigger.create({ trigger: wrap, start: 'top bottom', end: 'bottom top', onToggle: (s) => { visible = s.isActive; } });
    const tick = () => {
      if (!visible) return;
      const breathe = (0.5 + 0.5 * Math.sin(idle.t * 0.9)) * 0.1;
      draw(r, 0, breathe, { x: idle.x * 3, y: idle.y * 2 }, false);
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); vis.kill(); };
  });
}
