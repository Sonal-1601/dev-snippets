import { test } from "node:test";
import assert from "node:assert/strict";
import { retry } from "./retry.js";

test("resolves once the function succeeds", async () => {
  let n = 0;
  const result = await retry(
    async () => {
      n += 1;
      if (n < 3) throw new Error("not yet");
      return "ok";
    },
    { retries: 5, baseMs: 1 },
  );
  assert.equal(result, "ok");
  assert.equal(n, 3);
});

test("gives up after the configured retries", async () => {
  let n = 0;
  await assert.rejects(
    retry(
      async () => {
        n += 1;
        throw new Error("always");
      },
      { retries: 2, baseMs: 1 },
    ),
    /always/,
  );
  assert.equal(n, 3);
});

test("shouldRetry can short-circuit", async () => {
  let n = 0;
  await assert.rejects(
    retry(
      async () => {
        n += 1;
        throw new Error("fatal");
      },
      { retries: 5, baseMs: 1, shouldRetry: (e) => !/fatal/.test(e.message) },
    ),
  );
  assert.equal(n, 1);
});
