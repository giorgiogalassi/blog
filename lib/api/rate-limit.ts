type RateLimitEntry = {
  attempts: number;
  resetAt: number;
};

type RateLimitConfig = {
  maxAttempts: number;
  windowMs: number;
};

export function createInMemoryRateLimiter(config: RateLimitConfig) {
  const store = new Map<string, RateLimitEntry>();

  return function isRateLimited(key: string) {
    const now = Date.now();
    const entry = store.get(key);

    if (!entry || entry.resetAt < now) {
      store.set(key, { attempts: 1, resetAt: now + config.windowMs });
      return false;
    }

    entry.attempts += 1;
    store.set(key, entry);
    return entry.attempts > config.maxAttempts;
  };
}
