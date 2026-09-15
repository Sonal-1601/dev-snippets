const UNITS = ["B", "KB", "MB", "GB", "TB", "PB"];

/**
 * Format a byte count for humans: 1536 -> "1.5 KB".
 * Uses 1024-based units and drops trailing ".0".
 */
export function formatBytes(n, decimals = 1) {
  if (!Number.isFinite(n) || n < 0) throw new RangeError(`invalid byte count: ${n}`);
  if (n === 0) return "0 B";

  const i = Math.min(Math.floor(Math.log(n) / Math.log(1024)), UNITS.length - 1);
  const value = n / 1024 ** i;
  const str = value.toFixed(decimals).replace(/\.0+$/, "");
  return `${str} ${UNITS[i]}`;
}
