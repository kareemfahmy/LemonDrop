import Link from 'next/link';
import { CairoTime } from '@/components/CairoTime';
import { Hero } from '@/components/Hero';
import { KitCover } from '@/components/KitCover';
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

      {/* Who we are. A full screen of dark ground with everything anchored to the bottom: label and
          headline on the left, the paragraph on the right on the same baseline, and a hairline with a
          row of small facts under them. The text rises line by line once; the D at the end of the
          paragraph grows out and fills (setup.ts, statementDrop). */}
      <section className="statement" data-tone="dark" aria-labelledby="statement-title">
        <div className="statement__main">
          <div className="statement__lead">
            <p className="statement__aside">{statement.label}</p>
            <h2 id="statement-title" className="statement__title display" data-split="lines">{statement.title}</h2>
          </div>
          <p className="statement__text" data-split="lines" data-delay="0.25">
            {statement.text}<span className="statement__drop" data-statement-end aria-hidden="true"><span className="statement__fill" data-statement-fill /></span>
          </p>
        </div>
        <ul className="statement__facts">
          {statement.facts.map((f) => <li key={f}>{f}</li>)}
          <li className="statement__clock"><span className="statement__dot" aria-hidden="true" />Cairo <CairoTime seconds /></li>
          <li>Replies within one working day</li>
        </ul>
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

      {/* The reel: a lemon screen that holds while the title runs past sideways, with the project
          covers drifting over it at their own speeds (setup.ts, reel). It is the heading of the work. */}
      <section className="reel" data-tone="light" data-reel aria-labelledby="work-title">
        <div className="reel__track" data-reel-track>
          <h2 id="work-title" className="reel__word">Selected work</h2>
          {projects.map((p, i) => (
            <Link key={p.slug} className={`reel__card reel__card--${i}`} href={`/work/${p.slug}/`} data-reel-card data-speed={[0.5, 1.1, 0.25, 0.8][i % 4]} data-label={p.title}>
              <span className="reel__cover"><KitCover project={p} label={false} /></span>
              <span className="reel__cap">{p.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="work" data-tone="light" aria-label="Projects">
        <div className="work__head">
          <p className="work__count">Four projects, each built from the same three parts</p>
        </div>
        <WorkPlates items={projects} />
        <p className="work__more"><ArrowLink href="/work/">See every project</ArrowLink></p>
      </section>
    </>
  );
}
