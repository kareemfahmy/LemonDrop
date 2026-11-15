// Declarative motion through data attributes. Authoring happens in markup:
//   data-split="lines|words|chars"   masked text reveal (SplitText), on scroll or on intro
//   data-split-with                   on an inline child (an icon, a shape): rises with the text
//   data-reveal="up|fade|clip|scale"  block reveal
//   data-reveal="appear"              media reveal: the frame wipes open while its content settles
//                                     back; data-appear="<index>" gives each item its own timing
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

// Same move, different clocks: items that enter together never land as one block.
const appearTiming = [
  { delay: 0, duration: 1.3 },
  { delay: 0.24, duration: 1.6 },
  { delay: 0.1, duration: 1.2 },
  { delay: 0.36, duration: 1.45 },
] as const;

function appearTween(el: HTMLElement, paused: boolean) {
  const t = appearTiming[(parseInt(el.dataset.appear || '0', 10) || 0) % appearTiming.length];
  const at = t.delay + parseFloat(el.dataset.delay || '0');
  const inner = el.firstElementChild;
  gsap.set(el, { visibility: 'visible' });
  const tl = gsap.timeline({ paused, scrollTrigger: paused ? undefined : { trigger: el, start: 'top 92%', once: true } });
  tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: t.duration, ease: ease.out, clearProps: 'clipPath' }, at);
  if (inner) tl.fromTo(inner, { scale: 1.3 }, { scale: 1, duration: t.duration + 0.3, ease: ease.out, clearProps: 'scale,transform' }, at);
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
