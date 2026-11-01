import type { Metadata } from 'next';
import { BriefBuilder } from '@/components/BriefBuilder';
import { contact } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Start a project with LemonDrop. Choose what you need and when, add a sentence about the idea, and we reply within one working day, Cairo time.',
};

export default function ContactPage() {
  return (
    <>
      <section className="page-head grid" data-tone="light">
        <h1 className="page-head__title page-head__title--long display" data-title>{contact.title}</h1>
        <p className="page-head__lede">{contact.lead}</p>
      </section>
      <section className="brief grid" data-tone="light" aria-label="Project brief">
        <BriefBuilder />
      </section>
    </>
  );
}
