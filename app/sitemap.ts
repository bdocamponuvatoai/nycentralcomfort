import type { MetadataRoute } from 'next';

import { photos } from '@/content/assets';
import { projects } from '@/content/projects';
import { services } from '@/content/services';
import { absolute } from '@/lib/seo';

// Bump when page content changes so search engines re-crawl.
const lastModified = new Date('2026-10-08');

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, images: string[] = []): MetadataRoute.Sitemap[number] => ({
    url: absolute(path),
    lastModified,
    changeFrequency: 'monthly',
    priority,
    images: images.map((src) => absolute(src)),
  });

  return [
    page('/', 1, [photos.heroDesktop.src.src]),
    page(
      '/services',
      0.9,
      services.map((s) => s.photo.src.src),
    ),
    ...services.map((s) => page(`/services/${s.id}`, 0.8, [s.photo.src.src])),
    page(
      '/gallery',
      0.7,
      projects.flatMap((p) => [p.cover, ...p.album].map((ph) => ph.src.src)),
    ),
    page('/about', 0.7, [photos.realMiniSplit.src.src]),
    page('/contact', 0.8),
  ];
}
