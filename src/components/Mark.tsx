// The LemonDrop mark, rebuilt as vector from the supplied PNG (measured on a 522 × 377 box).
// Three parts: the block (L stem), the step (L foot) and the drop (the D: a block plus a half-disc).
export const MARK_W = 522;
export const MARK_H = 377;
export const BLOCK = { x: 0, y: 0, w: 148, h: 377 };
export const STEP = { x: 148, y: 250, w: 81, h: 127 };
export const DROP_PATH = 'M247 0H333.5A188.5 188.5 0 0 1 333.5 377H247Z';
export const DROP_ORIGIN = '360 188.5'; // rotation centre for the rolling drop

type Props = {
  className?: string;
  title?: string;
  drop?: string; // fill for the drop; the identity uses currentColor, the kit uses lemon
  apart?: boolean; // start with the parts outside the frame (the loader assembles them)
};

export function Mark({ className, title, drop = 'currentColor', apart = false }: Props) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${MARK_W} ${MARK_H}`}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <g data-part="block" transform={apart ? 'translate(0 400)' : undefined}><rect x={BLOCK.x} y={BLOCK.y} width={BLOCK.w} height={BLOCK.h} fill="currentColor" /></g>
      <g data-part="step" transform={apart ? 'translate(0 160)' : undefined}><rect x={STEP.x} y={STEP.y} width={STEP.w} height={STEP.h} fill="currentColor" /></g>
      <g data-part="drop" transform={apart ? 'translate(300 0) rotate(78 360 188.5)' : undefined}><path d={DROP_PATH} fill={drop} /></g>
    </svg>
  );
}
