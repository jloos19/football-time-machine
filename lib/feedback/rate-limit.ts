/**
 * Lightweight in-memory rate limit for feedback submissions.
 * Best-effort on serverless (per-instance); enough for beta abuse dampening.
 */

type RateBucket = number[];

const buckets = new Map<string, RateBucket>();

export type FeedbackRateLimitOptions = {
  windowMs?: number;
  max?: number;
  now?: number;
};

const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_MAX = 8;

export function checkFeedbackRateLimit(
  key: string,
  options: FeedbackRateLimitOptions = {}
): { allowed: true } | { allowed: false; retryAfterSec: number } {
  const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS;
  const max = options.max ?? DEFAULT_MAX;
  const now = options.now ?? Date.now();
  const normalized = key.trim() || "anonymous";

  const prior = buckets.get(normalized) ?? [];
  const recent = prior.filter((ts) => now - ts < windowMs);

  if (recent.length >= max) {
    const oldest = recent[0]!;
    const retryAfterSec = Math.max(1, Math.ceil((windowMs - (now - oldest)) / 1000));
    buckets.set(normalized, recent);
    return { allowed: false, retryAfterSec };
  }

  recent.push(now);
  buckets.set(normalized, recent);
  return { allowed: true };
}

/** Test helper — clears all buckets. */
export function resetFeedbackRateLimit(): void {
  buckets.clear();
}
