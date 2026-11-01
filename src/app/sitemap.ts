import type { MetadataRoute } from 'next';
import { projects, site } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/work/', '/studio/', '/contact/', ...projects.map((p) => `/work/${p.slug}/`)].map((path) => ({ url: `${site.url}${path}` }));
}
