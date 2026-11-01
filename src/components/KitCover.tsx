// Project covers: the three parts of the mark arranged differently for each project, in that
// project's colours. Honest generative compositions, not mock screenshots. Replace with real
// imagery when the work is real (see site.ts).
import type { Project } from '@/data/site';
import { BLOCK, DROP_PATH, STEP } from './Mark';

const Block = ({ t, c }: { t: string; c: string }) => <rect transform={t} x={BLOCK.x} y={BLOCK.y} width={BLOCK.w} height={BLOCK.h} fill={c} />;
const Step = ({ t, c }: { t: string; c: string }) => <rect transform={`${t} translate(-148 -250)`} x={STEP.x} y={STEP.y} width={STEP.w} height={STEP.h} fill={c} />;
const Drop = ({ t, c }: { t: string; c: string }) => <path transform={`${t} translate(-247 0)`} d={DROP_PATH} fill={c} />;

export function KitCover({ project, className, label = true }: { project: Project; className?: string; label?: boolean }) {
  const [ground, drop, parts] = project.palette;
  const body = (() => {
    switch (project.layout) {
      case 'tilt': // the assembled mark, oversized and tipped, leaving the frame
        return (
          <g transform="translate(300 170) rotate(-12) scale(1.18)">
            <Block t="" c={parts} />
            <Step t="translate(148 250)" c={parts} />
            <Drop t="translate(247 0)" c={drop} />
          </g>
        );
      case 'tower': // stacked: dome, beam, post
        return (
          <g>
            <Drop t="translate(211.5 314.5) rotate(-90)" c={drop} />
            <Block t="translate(588.5 314.5) rotate(90)" c={parts} />
            <Step t="translate(359.5 462.5)" c={parts} />
          </g>
        );
      case 'row': // laid out in order on one baseline, like a parts list
        return (
          <g>
            <Block t="translate(96 186) scale(0.75)" c={parts} />
            <Step t="translate(240 375) scale(0.75)" c={parts} />
            <Drop t="translate(352 186) scale(0.75)" c={drop} />
            <rect x="0" y="469" width="800" height="2" fill={parts} opacity="0.5" />
          </g>
        );
      case 'sunrise': // the drop rising over a block horizon
        return (
          <g>
            <Drop t="translate(192.5 392) rotate(-90) scale(1.1)" c={drop} />
            <rect x="0" y="392" width="800" height="208" fill={parts} />
            <Step t="translate(628 312) scale(0.63)" c={parts} />
          </g>
        );
    }
  })();
  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      role={label ? 'img' : undefined}
      aria-label={label ? `Cover for ${project.title}: a composition of the LemonDrop parts in the project colours` : undefined}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <rect width="800" height="600" fill={ground} />
      {body}
    </svg>
  );
}
