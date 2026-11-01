import type { Metadata } from 'next';
import { KitDrawing } from '@/components/KitDrawing';
import { DButton } from '@/components/Links';
import { studio } from '@/data/site';

export const metadata: Metadata = {
  title: 'Studio',
  description: 'How LemonDrop works: one studio for strategy, design and engineering, a short written plan, weekly releases and care after launch. Based in Cairo.',
};

const exploded = {
  block: [-56, 0] as [number, number],
  step: [36, 72] as [number, number],
  drop: [100, -24, 26] as [number, number, number],
};

export default function StudioPage() {
  return (
    <>
      <section className="page-head grid" data-tone="light">
        <h1 className="page-head__title page-head__title--long display" data-title>{studio.title}</h1>
        <p className="page-head__lede">{studio.lead}</p>
      </section>

      <section className="method grid" data-tone="light" aria-labelledby="method">
        <h2 id="method" className="method__h display" data-split="lines">Three parts, one room</h2>
        {studio.method.map((m) => (
          <div key={m.part} className="method__item" data-reveal="up">
            <div className="method__fig">
              <KitDrawing
                uid={`m-${m.part}`}
                className="method__svg"
                offsets={exploded}
                lit={{ block: m.part === 'block' ? 1 : 0, step: m.part === 'step' ? 1 : 0, drop: m.part === 'drop' ? 1 : 0 }}
                dims={false}
              />
            </div>
            <h3 className="method__title">{m.title}</h3>
            <p className="method__text">{m.text}</p>
          </div>
        ))}
      </section>

      <section className="services grid" data-tone="dark" aria-labelledby="services">
        <h2 id="services" className="services__h display" data-split="lines">What you can hire us for</h2>
        <ul className="services__grid">
          {studio.services.map((s) => (
            <li key={s.title}>
              <h3 className="services__title">{s.title}</h3>
              <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="founder grid" data-tone="dark" aria-labelledby="founder">
        <p className="founder__label">Who you work with</p>
        <h2 id="founder" className="founder__name display" data-split="lines">{studio.founder.name}</h2>
        <p className="founder__role">{studio.founder.role}</p>
        <p className="founder__bio">{studio.founder.bio}</p>
      </section>

      <section className="steps grid" data-tone="light" aria-labelledby="steps">
        <h2 id="steps" className="steps__h display" data-split="lines">How a project runs</h2>
        <ol className="steps__list">
          {studio.steps.map((s) => (
            <li key={s.title}>
              <span className="steps__title">{s.title}</span>
              <span className="steps__text">{s.text}</span>
            </li>
          ))}
        </ol>
        <p className="steps__cta"><DButton href="/contact/">Start with an intro call</DButton></p>
      </section>
    </>
  );
}
