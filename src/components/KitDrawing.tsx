// The exploded-assembly drawing of the mark. Each part is <g data-part> (moved by the kit driver)
// holding <g data-shape> (outline + a fill that rises inside it; the drop rotates as it rolls) and
// <g data-dim> (a dimension label shown when the parts come apart). Decorative: the chapters next
// to it carry the same information as text.
import { BLOCK, DROP_ORIGIN, DROP_PATH, MARK_H, MARK_W, STEP } from './Mark';

type PartName = 'block' | 'step' | 'drop';
type Lit = Partial<Record<PartName, number>>;

// Vertical extent of each part, for the rising fill.
export const FILL_BOX: Record<PartName, { y: number; h: number }> = {
  block: { y: 0, h: 377 },
  step: { y: 250, h: 127 },
  drop: { y: 0, h: 377 },
};

const fillRect = (p: PartName, lit: number) => {
  const { y, h } = FILL_BOX[p];
  return { y: y + h * (1 - lit), height: h * lit };
};

export function KitDrawing({
  uid,
  className,
  lit = { block: 1, step: 1, drop: 1 },
  offsets,
  dims = true,
}: {
  uid: string;
  className?: string;
  lit?: Lit;
  offsets?: { block?: [number, number]; step?: [number, number]; drop?: [number, number, number] };
  dims?: boolean;
}) {
  const t = (o?: number[]) => (o ? `translate(${o[0]} ${o[1]})` : undefined);
  const dropRot = offsets?.drop?.[2] ? `rotate(${offsets.drop[2]} ${DROP_ORIGIN})` : undefined;
  const shape = (p: PartName) =>
    p === 'block' ? <rect x={BLOCK.x} y={BLOCK.y} width={BLOCK.w} height={BLOCK.h} />
    : p === 'step' ? <rect x={STEP.x} y={STEP.y} width={STEP.w} height={STEP.h} />
    : <path d={DROP_PATH} />;
  const part = (p: PartName) => {
    const r = fillRect(p, lit[p] ?? 1);
    return (
      <>
        <clipPath id={`${uid}-${p}`} clipPathUnits="userSpaceOnUse">
          <rect data-fill-clip x="-40" width="620" y={r.y} height={r.height} />
        </clipPath>
        <g className="kit__fill" clipPath={`url(#${uid}-${p})`}>{shape(p)}</g>
        <g className="kit__outline">{shape(p)}</g>
      </>
    );
  };
  return (
    <svg className={className} viewBox="-190 -130 902 637" aria-hidden="true" focusable="false">
      <rect data-bounds x="0" y="0" width={MARK_W} height={MARK_H} fill="none" />
      <g data-part="block" transform={t(offsets?.block)}>
        <g data-shape className="kit__shape">{part('block')}</g>
        {dims && (
          <g data-dim className="kit__dim">
            <path d="M0 -34V-18M148 -34V-18M0 -26H148" />
            <text x="0" y="-48"><tspan className="kit__key">A</tspan> Block, 148 × 377</text>
          </g>
        )}
      </g>
      <g data-part="step" transform={t(offsets?.step)}>
        <g data-shape className="kit__shape">{part('step')}</g>
        {dims && (
          <g data-dim className="kit__dim">
            <path d="M148 395V411M229 395V411M148 403H229" />
            <text x="148" y="440"><tspan className="kit__key">B</tspan> Step, 81 × 127</text>
          </g>
        )}
      </g>
      <g data-part="drop" transform={t(offsets?.drop)}>
        <g data-shape className="kit__shape kit__shape--drop" transform={dropRot}>
          {part('drop')}
          {dims && <path className="kit__radius" data-dim d="M333.5 188.5L466.8 55.2" />}
        </g>
        {dims && (
          <g data-dim className="kit__dim">
            <text x="300" y="-48"><tspan className="kit__key">C</tspan> Drop, r 188.5</text>
          </g>
        )}
      </g>
    </svg>
  );
}
