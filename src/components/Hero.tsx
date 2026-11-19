// Home hero: full-screen footage. Signature (the window): as the loader hands its mark to the
// header, the screen is ink with the LD mark cut out of it at full height, so the footage is first
// seen through the three parts of the mark. Then the parts come apart (block left, step down, drop
// rolling right) and take the ink with them, opening the footage edge to edge, and the name rises
// along the bottom. Wired in src/motion/setup.ts (hero). Without JS or under reduced motion there
// is no window: the poster and the type are simply there.
import { hero } from '@/data/site';
import { BLOCK, DROP_PATH, STEP } from './Mark';

export function Hero() {
  return (
    <section className="hero" data-hero data-tone="dark" aria-labelledby="hero-title">
      <div className="hero__media" data-hero-media aria-hidden="true">
        <video
          className="hero__video"
          data-hero-video
          muted
          loop
          playsInline
          preload="none"
          poster={hero.video.poster}
          width={1280}
          height={720}
          tabIndex={-1}
        >
          <source src={hero.video.src} type="video/mp4" />
        </video>
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <svg className="hero__window" data-hero-window aria-hidden="true" focusable="false">
        <defs>
          <mask id="hero-window-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            <rect width="100%" height="100%" fill="#fff" />
            <g data-window-mark>
              <g data-window-part="block"><rect x={BLOCK.x} y={BLOCK.y} width={BLOCK.w} height={BLOCK.h} /></g>
              <g data-window-part="step"><rect x={STEP.x} y={STEP.y} width={STEP.w} height={STEP.h} /></g>
              <g data-window-part="drop"><path d={DROP_PATH} /></g>
            </g>
          </mask>
        </defs>
        <rect className="hero__ink" width="100%" height="100%" mask="url(#hero-window-mask)" />
      </svg>
      <div className="hero__veil" data-hero-veil aria-hidden="true" />

      <div className="hero__body" data-hero-body>
        <p className="hero__intro" data-reveal="up" data-intro data-delay="1.7">{hero.intro}</p>
        <h1 id="hero-title" className="hero__title" data-title="chars">
          {hero.title}
        </h1>
      </div>

      <div className="hero__foot" data-reveal="fade" data-intro data-delay="1.9">
        <ul className="hero__meta">
          {hero.meta.map((m) => <li key={m}>{m}</li>)}
        </ul>
        <p className="hero__cue kit__cue"><span className="kit__cue-mark" aria-hidden="true" />{hero.cue}</p>
        <button className="hero__toggle" type="button" data-hero-toggle aria-pressed="false">
          <span className="hero__toggle-icon" aria-hidden="true" />
          <span data-hero-toggle-label>Pause video</span>
        </button>
      </div>
    </section>
  );
}
