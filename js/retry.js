/**
 * Retry an async function with exponential backoff.
 *
 * @param {() => Promise<T>} fn
 * @param {{ retries?: number, baseMs?: number, factor?: number, shouldRetry?: (err: unknown) => boolean }} [opts]
 * @returns {Promise<T>}
 */
export async function retry(fn, opts = {}) {
  const { retries = 3, baseMs = 100, factor = 2, shouldRetry = () => true } = opts;

  let attempt = 0;
  for (;;) {
    try {
      return await fn();
    } catch (err) {
      if (attempt >= retries || !shouldRetry(err)) throw err;
      const delay = baseMs * factor ** attempt;
      attempt += 1;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}
