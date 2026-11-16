import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Kit } from '@/components/Kit';
import { ArrowLink } from '@/components/Links';
import { WorkPlates } from '@/components/WorkPlates';
import { capabilities, projects, statement } from '@/data/site';

export default function Home() {
  return (
    <>
      <Hero />
      <Kit />

      <section className="statement grid" data-tone="light" aria-labelledby="statement-title">
        <p className="statement__aside">Why one studio</p>
        <h2 id="statement-title" className="statement__title display" data-split="lines">{statement.title}</h2>
        <p className="statement__text" data-reveal="up" data-delay="0.15">
          {statement.text}<span className="statement__drop" aria-hidden="true" />
        </p>
      </section>

      {/* Interlude: the three disciplines as one moving line of type, each followed by its part of
          the mark. Decorative; it slides sideways with the scroll (setup.ts, interludes). */}
      <div className="band" data-tone="light" data-band aria-hidden="true">
        <div className="band__track" data-band-track>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="band__group">
              <span className="band__word">Planned</span>
              <span className="band__part band__part--block" />
              <span className="band__word">Designed</span>
              <span className="band__part band__part--drop" />
              <span className="band__word">Built</span>
              <span className="band__part band__part--step" />
            </span>
          ))}
        </div>
      </div>

      <section className="caps" data-tone="light" aria-labelledby="caps-title">
        <div className="caps__head">
          <p className="caps__note">Follow the drop. Pick one and your brief starts with it filled in.</p>
          {/* Three words on three lines of their own, drifting sideways at different speeds as the
              page scrolls (setup.ts, bigTitle). The outlined word inverts where it crosses the others. */}
          <h2 id="caps-title" className="wwm" data-wwm aria-label="What we make">
            <span className="wwm__we" data-wwm-word="we" aria-hidden="true">We</span>
            <span className="wwm__what" data-wwm-word="what" aria-hidden="true">What</span>
            <span className="wwm__make" data-wwm-word="make" aria-hidden="true">Make</span>
          </h2>
        </div>
        <div className="caps__rows" data-caps>
          <span className="caps__drop" data-caps-drop aria-hidden="true" />
          <ul className="caps__list">
            {capabilities.map((c) => (
              <li key={c.title}>
                <Link className="cap" href={`/contact/?need=${encodeURIComponent(c.need)}`} data-label="Start a project">
                  <h3 className="cap__name">{c.title}</h3>
                  <span className="cap__line">{c.line}</span>
                  <span className="cap__go" aria-hidden="true">Start a brief <span className="cap__arrow">→</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="caps__more"><ArrowLink href="/studio/">How the studio works</ArrowLink></p>
      </section>

      {/* Interlude: a dimension line from one section to the next. It draws across as you scroll and
          the drop rolls along it (setup.ts, interludes). Decorative. */}
      <div className="rule" data-tone="light" data-rule aria-hidden="true">
        <div className="rule__track" data-rule-track>
          <span className="rule__line" data-rule-line />
          <span className="rule__drop" data-rule-drop />
        </div>
        <p className="rule__labels"><span>What we make</span><span>Selected work</span></p>
      </div>

      <section className="work" data-tone="light" aria-labelledby="work-title">
        <div className="work__head">
          <h2 id="work-title" className="work__title display" data-split="lines">Selected work</h2>
          <p className="work__count">Four projects, each built from the same three parts</p>
        </div>
        <WorkPlates items={projects} />
        <p className="work__more"><ArrowLink href="/work/">See every project</ArrowLink></p>
      </section>
    </>
  );
}
