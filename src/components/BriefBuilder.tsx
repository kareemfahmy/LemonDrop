'use client';
import { useMemo, useState } from 'react';
import { contact, site } from '@/data/site';
import { DButton } from './Links';

const list = (items: string[]) =>
  items.length < 2 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;

// Choices in, one clear sentence out, then the email is written for you.
export function BriefBuilder() {
  const [needs, setNeeds] = useState<string[]>([]);
  const [when, setWhen] = useState<string>('');
  const [name, setName] = useState('');
  const [note, setNote] = useState('');

  const sentence = useMemo(() => {
    const what = needs.length ? list(needs.map((n) => n.charAt(0).toLowerCase() + n.slice(1))) : 'something';
    const time = when ? ` ${when.charAt(0).toLowerCase() + when.slice(1)}` : '';
    return `${name ? `${name} needs` : 'You need'} ${what}${time}.`;
  }, [needs, when, name]);

  const href = useMemo(() => {
    const subject = `New project: ${needs.length ? list(needs) : 'an idea'}`;
    const body = [sentence, note && `\n${note}`, `\nTimeline: ${when || 'not decided'}`].filter(Boolean).join('\n');
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [needs, when, note, sentence]);

  const toggle = (n: string) => setNeeds((v) => (v.includes(n) ? v.filter((x) => x !== n) : [...v, n]));

  return (
    <>
      <form className="brief__form" onSubmit={(e) => { e.preventDefault(); location.href = href; }}>
        <fieldset>
          <legend>What do you need?</legend>
          <div className="chips">
            {contact.needs.map((n) => (
              <button key={n} type="button" className="chip" aria-pressed={needs.includes(n)} onClick={() => toggle(n)}>{n}</button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>When?</legend>
          <div className="chips" role="radiogroup" aria-label="Timeline">
            {contact.timelines.map((t) => (
              <button key={t} type="button" role="radio" className="chip" aria-checked={when === t} onClick={() => setWhen(when === t ? '' : t)}>{t}</button>
            ))}
          </div>
        </fieldset>
        <label className="field">
          <span className="brief__labeltext">Your name</span>
          <input type="text" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label className="field">
          <span className="brief__labeltext">The idea, in a sentence or two</span>
          <textarea name="note" value={note} onChange={(e) => setNote(e.target.value)} />
        </label>
      </form>
      <aside className="brief__aside" aria-label="Your brief">
        <p className="brief__small">Your brief, pressed into one line</p>
        <p className="brief__press" aria-live="polite">{sentence}</p>
        <DButton href={href} external>Send the brief</DButton>
        <p className="brief__small">Opens your email app with everything filled in. Prefer to write it yourself? <a className="link" href={`mailto:${site.email}`}>{site.email}</a></p>
      </aside>
    </>
  );
}
