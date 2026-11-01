import { Kit } from '@/components/Kit';
import { ArrowLink } from '@/components/Links';
import { WorkIndex } from '@/components/WorkIndex';
import { capabilities, projects, statement } from '@/data/site';

export default function Home() {
  return (
    <>
      <Kit />

      <section className="statement grid" data-tone="light" aria-label="Why one studio">
        <p className="statement__aside">Why one studio</p>
        <p className="statement__text" data-split="lines">
          {statement}<span className="statement__drop" aria-hidden="true" />
        </p>
      </section>

      <section className="work" data-tone="light" aria-labelledby="work-title">
        <div className="work__head">
          <h2 id="work-title" className="work__title display" data-split="lines">Selected work</h2>
          <p className="work__count">Four projects, each built from the same three parts</p>
        </div>
        <WorkIndex items={projects} />
        <p className="work__more"><ArrowLink href="/work/">See every project</ArrowLink></p>
      </section>

      <section className="caps grid" data-tone="light" aria-labelledby="caps-title">
        <div className="caps__head">
          <h2 id="caps-title" className="caps__title display" data-split="lines">What we make</h2>
        </div>
        <ul className="caps__list">
          {capabilities.map((c) => (
            <li key={c.title}>
              <h3 className="caps__name">{c.title}</h3>
              <p className="caps__line">{c.line}</p>
            </li>
          ))}
          <li className="caps__more"><ArrowLink href="/studio/">How the studio works</ArrowLink></li>
        </ul>
      </section>
    </>
  );
}
