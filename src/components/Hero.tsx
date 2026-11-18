// Home hero: full-screen footage under a centred headline. The video is decorative (muted loop,
// no audio) and gets a visible pause control; playback, the intro fade and the scroll-out are
// wired in src/motion/setup.ts. Without JS or under reduced motion the poster stands in.
import { hero } from '@/data/site';

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
      <div className="hero__veil" data-hero-veil aria-hidden="true" />

      <div className="hero__body" data-hero-body>
        <h1 id="hero-title" className="hero__title" data-title="chars">
          {hero.title}
        </h1>
        <p className="hero__intro" data-reveal="up" data-intro data-delay="0.25">{hero.intro}</p>
      </div>

      <div className="hero__foot" data-reveal="fade" data-intro data-delay="0.45">
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
