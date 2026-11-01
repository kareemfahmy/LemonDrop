// Home hero + signature: a sticky stage holds the mark; the hero and four chapters scroll beside it.
// The kit driver (src/motion/kit.ts) maps scroll progress to how far the parts come apart, which part
// is lit, and the dimension labels.
import { chapters, hero } from '@/data/site';
import { KitDrawing } from './KitDrawing';

export function Kit() {
  return (
    <section className="kit" data-kit data-tone="dark" aria-labelledby="kit-title">
      <div className="kit__stage" aria-hidden="true">
        <div className="kit__frame" data-kit-frame>
          <KitDrawing uid="kit" className="kit__svg" />
        </div>
      </div>

      <div className="kit__hero">
        <h1 id="kit-title" className="kit__title" data-title>
          {hero.title}
        </h1>
        <p className="kit__intro" data-reveal="up" data-intro data-delay="0.2">{hero.intro}</p>
        <ul className="kit__meta" data-reveal="fade" data-intro data-delay="0.35">
          {hero.meta.map((m) => <li key={m}>{m}</li>)}
          <li className="kit__cue"><span className="kit__cue-mark" aria-hidden="true" />{hero.cue}</li>
        </ul>
      </div>

      {chapters.map((c, i) => (
        <article key={c.title} className={`kit__chapter${c.part === 'all' ? ' kit__chapter--all' : ''}`} data-chapter={i + 1} style={{ gridRow: i + 2 }}>
          <p className="kit__label">
            <span className={`kit__swatch kit__swatch--${c.part}`} aria-hidden="true" />
            {c.label}
          </p>
          <h2 className="kit__h2" data-split="lines">{c.title}</h2>
          <p className="kit__text">{c.text}</p>
          <ul className="kit__list">
            {c.list.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </article>
      ))}
    </section>
  );
}
