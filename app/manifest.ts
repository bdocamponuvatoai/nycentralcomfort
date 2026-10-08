import type { MetadataRoute } from 'next';

import { site } from '@/content/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#faf7f2',
    theme_color: '#faf7f2',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
