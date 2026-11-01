export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const isTouch = () => matchMedia('(hover: none), (pointer: coarse)').matches;
export const isMobile = () => matchMedia('(max-width: 767px)').matches;

// Shared easing vocabulary. Use these names everywhere; never invent per-component curves.
export const ease = {
  out: 'expo.out', // slide and lock: entrances, parts settling
  inOut: 'expo.inOut', // curtain, page transitions
  soft: 'power3.out', // hovers, small UI
  spring: 'back.out(1.6)', // unused on purpose: the motion verb has no bounce
} as const;
