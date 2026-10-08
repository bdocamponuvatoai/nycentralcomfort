import type { MetadataRoute } from 'next';

import { absolute } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return { rules: { userAgent: '*', disallow: '/' } };
  }
  const bots = [
    'Googlebot',
    'Bingbot',
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'PerplexityBot',
    'Applebot-Extended',
  ];
  return {
    rules: [...bots.map((userAgent) => ({ userAgent, allow: '/' })), { userAgent: '*', allow: '/' }],
    sitemap: absolute('/sitemap.xml'),
  };
}
