/**
 * Minimal in-memory rate limiter.
 *
 * Good enough to stop a script kiddie from hammering the invite form on a
 * single long-running server. On serverless platforms (Vercel) each cold
 * start resets this map, so for stronger protection in production, swap
 * this for Upstash Redis or Vercel KV — the call site (`checkRateLimit`)
 * stays the same either way.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function checkRateLimit(key: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (bucket.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  bucket.count += 1;
  return { allowed: true, remaining: limit - bucket.count };
}
