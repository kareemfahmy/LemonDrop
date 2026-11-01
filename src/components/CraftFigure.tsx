// Honest working figures for a case study: the palette with real hex values, the key flow as a
// sequence, and a labelled layout schematic in line. Drawn diagrams, never mock screenshots.
import type { Project } from '@/data/site';

const lum = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const c = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const on = (hex: string) => (lum(hex) > 0.35 ? '#111110' : '#efefec');

export function CraftFigure({ project, item }: { project: Project; item: Project['craft'][number] }) {
  const [ground, drop, parts] = project.palette;
  const T = { fontFamily: 'var(--f-body)', fontSize: 28 } as const;

  if (item.kind === 'palette') {
    const sw = [
      { x: 0, w: 470, c: ground, name: 'Ground' },
      { x: 470, w: 210, c: parts, name: 'Parts' },
    ];
    return (
      <svg viewBox="0 0 800 500" role="img" aria-label={`Palette for ${project.title}: ${ground}, ${parts} and ${drop}`}>
        {sw.map((s) => (
          <g key={s.name}>
            <rect x={s.x} y="0" width={s.w} height="500" fill={s.c} />
            <text x={s.x + 28} y="452" fill={on(s.c)} style={T}>{s.name}</text>
            <text x={s.x + 28} y="414" fill={on(s.c)} style={{ ...T, fontSize: 22, opacity: 0.8 }}>{s.c.toUpperCase()}</text>
          </g>
        ))}
        <rect x="680" y="0" width="120" height="500" fill={parts} />
        <path d="M680 0H700A100 250 0 0 1 700 500H680Z" fill={drop} />
        <text x="696" y="452" fill={on(drop)} style={T}>Drop</text>
        <text x="696" y="414" fill={on(drop)} style={{ ...T, fontSize: 18, opacity: 0.8 }}>{drop.toUpperCase()}</text>
      </svg>
    );
  }

  if (item.kind === 'flow') {
    const steps = item.steps ?? [];
    const w = 170, gap = 23, y = 180;
    return (
      <svg viewBox="0 0 800 500" role="img" aria-label={`Flow for ${project.title}: ${steps.join(', then ')}`}>
        <rect width="800" height="500" fill={parts} />
        {steps.map((s, i) => {
          const x = 14 + i * (w + gap);
          const last = i === steps.length - 1;
          return (
            <g key={s}>
              {last
                ? <path d={`M${x} ${y}H${x + w - 70}A70 70 0 0 1 ${x + w - 70} ${y + 140}H${x}Z`} fill={drop} />
                : <rect x={x} y={y} width={w} height="140" fill="none" stroke={ground} strokeWidth="2" />}
              {!last && <path d={`M${x + w + 2} ${y + 70}H${x + w + gap - 2}`} stroke={ground} strokeWidth="2" />}
              <text x={x + 16} y={y + 44} fill={last ? on(drop) : ground} style={{ ...T, fontSize: 20, opacity: 0.75 }}>{i + 1}</text>
              <text x={x + 16} y={y + 118} fill={last ? on(drop) : ground} style={{ ...T, fontSize: steps.join('').length > 40 ? 21 : 24 }}>{s}</text>
            </g>
          );
        })}
      </svg>
    );
  }

  const [a, b, c] = item.labels ?? ['Media', 'Content', 'Action'];
  return (
    <svg viewBox="0 0 800 500" role="img" aria-label={`Layout schematic for ${project.title}: ${a}, ${b} and ${c}`}>
      <rect width="800" height="500" fill={ground} />
      <g fill="none" stroke={parts} strokeWidth="2" opacity="0.9">
        <rect x="40" y="40" width="720" height="420" />
        <path d="M40 92H760" />
        <rect x="70" y="122" width="380" height="308" />
        <path d="M70 122L450 430M450 122L70 430" opacity="0.35" />
        <path d="M490 150H720M490 186H700M490 222H714M490 258H660" />
      </g>
      <path d="M490 360H640A35 35 0 0 1 640 430H490Z" fill={drop} />
      <g fill={parts} style={{ ...T, fontSize: 22 }}>
        <text x="86" y="160">{a}</text>
        <text x="490" y="304">{b}</text>
        <text x="506" y="404" fill={on(drop)}>{c}</text>
      </g>
    </svg>
  );
}
