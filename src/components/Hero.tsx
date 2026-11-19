// Home hero: full-screen footage. Signature (the window): as the loader hands its mark to the
// header, the screen is ink with the LD mark cut out of it at full height, so the footage is first
// seen through the mark's two shapes. Then they come apart (the L left, the drop rolling right) and take the ink with them, opening the footage edge to edge, and the name rises
// along the bottom. Wired in src/motion/setup.ts (hero). Without JS or under reduced motion there
// is no window: the poster and the type are simply there.
import { hero } from '@/data/site';
import { DROP_PATH, L_PATH } from './Mark';

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
          width={hero.video.width}
          height={hero.video.height}
          tabIndex={-1}
        >
          <source src={hero.video.mobile} type="video/mp4" media="(max-width: 767px)" />
          <source src={hero.video.src} type="video/mp4" />
        </video>
      </div>
      <div className="hero__shade" aria-hidden="true" />
      <svg className="hero__window" data-hero-window aria-hidden="true" focusable="false">
        <defs>
          <mask id="hero-window-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
            <rect width="100%" height="100%" fill="#fff" />
            <g data-window-mark>
              <g data-window-part="block"><path d={L_PATH} /></g>
              <g data-window-part="drop"><path d={DROP_PATH} /></g>
            </g>
          </mask>
        </defs>
        <rect className="hero__ink" width="100%" height="100%" mask="url(#hero-window-mask)" />
      </svg>
      <div className="hero__veil" data-hero-veil aria-hidden="true" />

      <div className="hero__body" data-hero-body>
        <p className="hero__intro" data-reveal="up" data-intro data-delay="1.7">{hero.intro}</p>
        {/* The wordmark: the L and the D are the mark's own solid shapes (the L's stem and foot joined
            into one piece); the letters between them are the display face used by the section headlines.
            Screen readers get the plain name. Each glyph rises in its own mask (setup.ts, titles). */}
        <h1 id="hero-title" className="hero__title" data-title="wordmark">
          <span className="sr-only">{hero.title}</span>
          <span className="wm" aria-hidden="true">
            <span className="wm__g wm__g--mark">
              <svg className="wm__shape" viewBox="0 0 229 377" focusable="false"><path d="M0 0H148V250H229V377H0Z" /></svg>
            </span>
            {'EMON'.split('').map((c, i) => <span key={`a${i}`} className="wm__g">{c}</span>)}
            <span className="wm__g wm__g--mark wm__g--d">
              <svg className="wm__shape" viewBox="0 0 274.5 377" focusable="false"><path d="M0 0H86A188.5 188.5 0 0 1 86 377H0Z" /></svg>
            </span>
            {'ROP'.split('').map((c, i) => <span key={`b${i}`} className="wm__g">{c}</span>)}
          </span>
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
