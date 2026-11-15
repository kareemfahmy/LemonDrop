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

      <section className="work" data-tone="light" aria-labelledby="work-title">
        <div className="work__head">
          <h2 id="work-title" className="work__title display" data-split="lines">Selected work</h2>
          <p className="work__count">Four projects, each built from the same three parts</p>
        </div>
        <WorkPlates items={projects} />
        <p className="work__more"><ArrowLink href="/work/">See every project</ArrowLink></p>
      </section>

      <section className="caps" data-tone="light" aria-labelledby="caps-title">
        <div className="caps__head">
          <h2 id="caps-title" className="caps__title display" data-split="lines">What we make</h2>
          <p className="caps__note">Follow the drop. Pick one and your brief starts with it filled in.</p>
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
    </>
  );
}
