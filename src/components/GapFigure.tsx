// "Why one studio" figure: the three parts as three teams, with the handovers between them drawn
// as dimension gaps. Rendered assembled (the end state, also what no-JS and reduced motion see);
// setup.ts pulls the parts apart and lets the scroll close the gaps as the answer arrives.
import { BLOCK, DROP_PATH, STEP } from './Mark';

// How far each part sits from its place in the mark while the teams are apart (SVG units).
export const GAP_APART = { block: -100, step: 10, drop: 102 } as const;

export function GapFigure() {
  return (
    <svg className="gap" viewBox="-112 -78 772 540" data-gap aria-hidden="true" focusable="false">
      <clipPath id="gap-drop-fill" clipPathUnits="userSpaceOnUse">
        <rect data-gap-fill x="200" y="0" width="360" height="377" />
      </clipPath>
      <g data-gap-part="block">
        <g className="gap__nudge gap__nudge--block">
          <rect className="gap__solid" x={BLOCK.x} y={BLOCK.y} width={BLOCK.w} height={BLOCK.h} />
          <text className="gap__label" x={BLOCK.x} y={-22}>Strategy</text>
        </g>
      </g>
      <g data-gap-part="step">
        <g className="gap__nudge gap__nudge--step">
          <rect className="gap__solid" x={STEP.x} y={STEP.y} width={STEP.w} height={STEP.h} />
          <text className="gap__label" x={STEP.x} y={STEP.y - 22}>Code</text>
        </g>
      </g>
      <g data-gap-part="drop">
        <g className="gap__nudge gap__nudge--drop">
          {/* Only the shape rolls; its label stays level. */}
          <g data-gap-roll>
            <path className="gap__drop" d={DROP_PATH} clipPath="url(#gap-drop-fill)" />
            <path className="gap__outline" d={DROP_PATH} />
          </g>
          <text className="gap__label" x={300} y={-40}>Design</text>
        </g>
      </g>
      {/* The gaps, measured like the kit's dimensions. Drawn for the apart positions. */}
      <g className="gap__note" data-gap-note>
        <path d="M48 398V414M158 398V414M48 406H158" />
        <text x="48" y="444">handover</text>
        <path d="M239 398V414M349 398V414M239 406H349" />
        <text x="239" y="444">handover</text>
      </g>
    </svg>
  );
}
