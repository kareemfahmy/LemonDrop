import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Mark } from '@/components/Mark';
import { Motion } from '@/components/Motion';
import { site } from '@/data/site';
import { display, text } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: './' },
  openGraph: { type: 'website', siteName: site.name, locale: 'en_GB', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'The LemonDrop mark taken apart into its three parts' }] },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
};

export const viewport: Viewport = { themeColor: '#111110', colorScheme: 'light dark' };

// Runs before first paint: hidden-until-revealed styles only apply when JS and motion are on.
const flags = `document.documentElement.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  description: site.description,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  email: site.email,
  founder: { '@type': 'Person', name: site.founder },
  address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'EG' },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: flags }} />
      </head>
      <body>
        <a className="skip-link" href="#main" data-no-transition>Skip to content</a>
        <div id="curtain" aria-hidden="true">
          <div className="curtain__panel">
            <span className="curtain__clip"><span className="curtain__label" data-curtain-label /></span>
          </div>
        </div>
        <div id="loader" role="status" aria-label="Loading LemonDrop">
          <div className="loader__mark">
            <Mark className="loader__svg" apart />
          </div>
          <div className="loader__foot">
            <span className="loader__clip"><span className="loader__count tabular" data-loader-out data-loader-count>000</span></span>
            <span className="loader__clip"><span className="loader__note" data-loader-out>Assembling the parts</span></span>
          </div>
          <div className="loader__bar" data-loader-bar />
        </div>
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <div className="grain" aria-hidden="true" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        <Motion />
      </body>
    </html>
  );
}
