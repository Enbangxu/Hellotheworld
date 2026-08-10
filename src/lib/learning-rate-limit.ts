const windows = new Map<string, { count: number; reset: number }>();
export function allowTutorRequest(key: string, now = Date.now()) { const current = windows.get(key); if (!current || current.reset < now) { windows.set(key, { count: 1, reset: now + 60_000 }); return true; } if (current.count >= 20) return false; current.count += 1; return true; }
// A single-instance guard only. Production multi-instance deployments should use a shared limiter.
