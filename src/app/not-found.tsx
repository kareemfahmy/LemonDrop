import type { Metadata } from 'next';
import { KitDrawing } from '@/components/KitDrawing';
import { DButton } from '@/components/Links';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This LemonDrop page does not exist. The parts are here, but nobody assembled them.',
};

// The parts lie where they fell: nothing here was ever assembled.
export default function NotFound() {
  return (
    <section className="lost grid" data-tone="dark">
      <div className="lost__fig" aria-hidden="true">
        <KitDrawing
          uid="lost"
          className="lost__svg"
          offsets={{ block: [-110, 190], step: [210, 20], drop: [250, 120, 118] }}
          lit={{ block: 1, step: 1, drop: 1 }}
        />
      </div>
      <h1 className="lost__title display" data-title>This page was never assembled.</h1>
      <p className="lost__text">The address leads to a pile of parts. The work, the studio and the contact page are all built and in one piece.</p>
      <p className="lost__cta"><DButton href="/">Back to the finished thing</DButton></p>
    </section>
  );
}
