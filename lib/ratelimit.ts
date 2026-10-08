// Sliding-window limiter kept in memory. Used in development and as the fallback when no Redis
// store is connected (each serverless instance then keeps its own window). See lib/limiter.ts.
export function createMemoryLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, number[]>();
  return {
    async allow(key: string, now = Date.now()) {
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      if (recent.length >= limit) {
        hits.set(key, recent);
        return false;
      }
      recent.push(now);
      hits.set(key, recent);
      // Keep memory bounded on long-lived instances.
      if (hits.size > 5000) hits.delete(hits.keys().next().value!);
      return true;
    },
  };
}
