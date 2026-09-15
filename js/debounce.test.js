import { test } from "node:test";
import assert from "node:assert/strict";
import { debounce } from "./debounce.js";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

test("only the last call within the window fires", async () => {
  const calls = [];
  const d = debounce((v) => calls.push(v), 20);
  d(1);
  d(2);
  d(3);
  await sleep(40);
  assert.deepEqual(calls, [3]);
});

test("cancel prevents the pending call", async () => {
  const calls = [];
  const d = debounce((v) => calls.push(v), 20);
  d("x");
  d.cancel();
  await sleep(40);
  assert.deepEqual(calls, []);
});
