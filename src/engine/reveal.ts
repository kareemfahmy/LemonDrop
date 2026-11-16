// Declarative motion through data attributes. Authoring happens in markup:
//   data-split="lines|words|chars"   masked text reveal (SplitText), on scroll or on intro
//   data-split-with                   on an inline child (an icon, a shape): rises with the text
//   data-reveal="up|fade|clip|scale"  block reveal
//   data-reveal="appear"              media reveal: the frame grows from a corner while its content
//                                     settles back; replays each time it re-enters; data-appear="<index>"
//                                     gives each item its own corner and timing
//   data-intro                        play with the page intro instead of on scroll
//   data-delay="0.2"                  extra delay (seconds)
//   data-parallax="0.15"              scrubbed vertical drift (fraction of element height)
// Every effect is skipped under reduced motion; CSS keeps content visible without JS.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ease, prefersReducedMotion } from './env';

gsap.registerPlugin(ScrollTrigger, SplitText);

const durations = { lines: 1.2, words: 1.1, chars: 0.9 } as const;
const staggers = { lines: 0.08, words: 0.035, chars: 0.018 } as const;

// autoSplit re-splits after font load / resize. A text that already revealed must stay revealed,
// so the state lives outside onSplit.
// Every text reveal on the site is the same move: it rises once from behind its line mask when it
// comes into view, and stays. Nothing is tied to scroll position.
function splitTween(el: HTMLElement, isIntro: boolean) {
  const type = (el.dataset.split || 'lines') as keyof typeof durations;
  const delay = parseFloat(el.dataset.delay || '0');
  const s = { tween: undefined as gsap.core.Tween | undefined, done: false, requested: false };
  SplitText.create(el, {
    type: type === 'lines' ? 'lines' : `lines,${type}`,
    mask: 'lines',
    autoSplit: true,
    linesClass: 'split-line',
    onSplit(self) {
      gsap.set(el, { visibility: 'visible' });
      if (s.done) return;
      const units = type === 'lines' ? self.lines : type === 'words' ? self.words : self.chars;
      // An inline shape rides with the last line. It is shorter than the line box, so it travels further.
      const extras = [...el.querySelectorAll<HTMLElement>('[data-split-with]')];
      // Slide and lock: straight up, no rotation.
      s.tween = gsap.from([...units, ...extras], {
        yPercent: (_, t: HTMLElement) => (t.hasAttribute('data-split-with') ? 190 : 110),
        duration: durations[type],
        stagger: staggers[type],
        ease: ease.out,
        delay,
        paused: isIntro && !s.requested,
        onComplete: () => { s.done = true; },
        scrollTrigger: isIntro ? undefined : { trigger: el, start: 'top 88%', once: true },
      });
      return s.tween;
    },
  });
  return () => { s.requested = true; s.tween?.play(); };
}

// Media reveal: the frame grows from a small window in one corner to its full size while the
// picture inside settles back from a larger scale. Each item has its own corner, delay and
// duration, so items that enter together never land as one block. Scrolling triggers it but does
// not drive it: it plays through once in view, resets only when the item has completely left the
// screen, and plays again the next time it comes in.
const appearSpec = [
  { delay: 0, duration: 1.5, from: 'inset(0% 0% 82% 76%)', origin: '100% 0%' },
  { delay: 0.2, duration: 1.75, from: 'inset(0% 78% 84% 0%)', origin: '0% 0%' },
  { delay: 0.08, duration: 1.4, from: 'inset(80% 0% 0% 74%)', origin: '100% 100%' },
  { delay: 0.32, duration: 1.6, from: 'inset(0% 80% 80% 0%)', origin: '0% 0%' },
] as const;

function appearTween(el: HTMLElement, isIntro: boolean) {
  const t = appearSpec[(parseInt(el.dataset.appear || '0', 10) || 0) % appearSpec.length];
  const at = t.delay + parseFloat(el.dataset.delay || '0');
  const inner = el.firstElementChild;
  const tl = gsap.timeline({ paused: true });
  tl.set(el, { autoAlpha: 1 }, at);
  tl.fromTo(el, { clipPath: t.from }, { clipPath: 'inset(0% 0% 0% 0%)', duration: t.duration, ease: ease.out }, at);
  if (inner) tl.fromTo(inner, { scale: 1.45, transformOrigin: t.origin }, { scale: 1, duration: t.duration + 0.25, ease: ease.out }, at);
  gsap.set(el, { autoAlpha: 0 });
  if (isIntro) return tl;
  let shown = false;
  const play = () => { if (!shown) { shown = true; tl.play(0); } };
  const reset = () => { shown = false; tl.pause(0); gsap.set(el, { autoAlpha: 0 }); };
  ScrollTrigger.create({ trigger: el, start: 'top 94%', end: 'bottom 6%', onEnter: play, onEnterBack: play });
  ScrollTrigger.create({ trigger: el, start: 'top bottom', end: 'bottom top', onLeave: reset, onLeaveBack: reset });
  return tl;
}

function blockTween(el: HTMLElement, paused: boolean): gsap.core.Animation {
  const kind = el.dataset.reveal || 'up';
  if (kind === 'appear') return appearTween(el, paused);
  const delay = parseFloat(el.dataset.delay || '0');
  const from: gsap.TweenVars =
    kind === 'fade' ? { autoAlpha: 0 }
    : kind === 'clip' ? { clipPath: 'inset(100% 0% 0% 0%)', autoAlpha: 1 }
    : kind === 'scale' ? { scale: 1.15, clipPath: 'inset(12% 12% 12% 12%)', autoAlpha: 1 }
    : { y: 48, autoAlpha: 0 };
  const to: gsap.TweenVars = kind === 'clip' || kind === 'scale' ? { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 } : {};
  gsap.set(el, { visibility: 'visible' });
  return gsap.fromTo(el, from, {
    ...to,
    y: 0,
    autoAlpha: 1,
    duration: kind === 'fade' ? 1 : 1.3,
    ease: ease.out,
    delay,
    paused,
    scrollTrigger: paused ? undefined : { trigger: el, start: 'top 90%', once: true },
  });
}

/** Wire every reveal inside `root`. Returns the intro timeline (paused) for the page entrance. */
export function initReveals(root: ParentNode = document, instant = false) {
  const intro = gsap.timeline({ paused: true });
  if (prefersReducedMotion()) return intro;
  // No loader covered the first paint: intro content is already visible, leave it be.
  if (instant) root.querySelectorAll<HTMLElement>('[data-intro]').forEach((el) => { el.removeAttribute('data-intro'); el.removeAttribute('data-split'); el.removeAttribute('data-reveal'); });

  root.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const isIntro = el.hasAttribute('data-intro');
    const play = splitTween(el, isIntro);
    if (isIntro) intro.add(play, 0);
  });
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    // Not rendered at this size (display: none): nothing to reveal. A scroll trigger on a box with
    // no position fires and removes itself mid-setup, which breaks the triggers created after it.
    if (!el.getClientRects().length) { gsap.set(el, { visibility: 'visible' }); return; }
    const isIntro = el.hasAttribute('data-intro');
    const t = blockTween(el, isIntro);
    if (isIntro) intro.add(() => t.play(), 0);
  });
  root.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = parseFloat(el.dataset.parallax || '0.15');
    gsap.fromTo(el, { yPercent: -amount * 100 }, {
      yPercent: amount * 100,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
  return intro;
}
