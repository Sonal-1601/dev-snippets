import { test } from "node:test";
import assert from "node:assert/strict";
import { formatBytes } from "./bytes.js";

test("formats common sizes", () => {
  assert.equal(formatBytes(0), "0 B");
  assert.equal(formatBytes(512), "512 B");
  assert.equal(formatBytes(1024), "1 KB");
  assert.equal(formatBytes(1536), "1.5 KB");
  assert.equal(formatBytes(5 * 1024 ** 2), "5 MB");
  assert.equal(formatBytes(3.25 * 1024 ** 3, 2), "3.25 GB");
});

test("rejects negative and non-finite input", () => {
  assert.throws(() => formatBytes(-1), RangeError);
  assert.throws(() => formatBytes(NaN), RangeError);
});
