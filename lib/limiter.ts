import 'server-only';

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import { createMemoryLimiter } from './ratelimit.ts';

export type Limiter = { allow(key: string): Promise<boolean> };

const LIMIT = 5;
const WINDOW = '1 h';

/**
 * 5 inquiries per hour per client. Uses Upstash Redis when connected (shared across all serverless
 * instances); falls back to a per-instance memory window for local development.
 * Accepts both Upstash and Vercel Marketplace (KV_*) variable names.
 */
export function createLimiter(): Limiter {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

  if (url && token) {
    const ratelimit = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(LIMIT, WINDOW),
      prefix: 'nycc:inquiry',
      analytics: false,
    });
    return { allow: async (key) => (await ratelimit.limit(key)).success };
  }

  return createMemoryLimiter({ limit: LIMIT, windowMs: 60 * 60 * 1000 });
}
