import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { ArrowLink } from '@/components/Links';
import { WorkPlates } from '@/components/WorkPlates';
import { capabilities, projects, statement } from '@/data/site';

export default function Home() {
  return (
    <>
      <Hero />
      {/* Parked: the kit (the mark taken apart over four scroll chapters). Its component
          (components/Kit.tsx), drawing and driver (motion/kit.ts) are intact; import Kit and render
          <Kit /> here to bring it back. */}

      {/* Who we are. The section is taller than the screen and its content holds in place, so the
          dark ground has room to travel: a large drop rolls in, then shrinks into the full stop at the
          end of the paragraph (setup.ts, statementDrop). */}
      <section className="statement" data-tone="dark" data-statement aria-labelledby="statement-title">
        <div className="statement__pin grid">
          <p className="statement__aside">{statement.label}</p>
          <h2 id="statement-title" className="statement__title display" data-split="lines">{statement.title}</h2>
          <p className="statement__text" data-reveal="up" data-delay="0.15">
            {statement.text}<span className="statement__drop" data-statement-end aria-hidden="true" />
          </p>
          <span className="statement__big" data-statement-big aria-hidden="true" />
        </div>
      </section>

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
        <p className="rule__labels"><span>Selected work</span></p>
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
