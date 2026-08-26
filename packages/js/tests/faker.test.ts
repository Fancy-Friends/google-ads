/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_ads
 */

/**
 * The golden fixtures.
 *
 * Deterministic on purpose: the same seed produces the same bytes in
 * TypeScript, PHP and Python, so this file and its twins in the other packages
 * assert the SAME values. That turns the faker into a parity test rather than
 * a convenience — which matters, because cross-runtime drift does not fail
 * loudly. It completes, down one path, with no error.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

import { googleAdsFaker } from "../src/faker.js";

test("customer_list_accessible fakes the shape Google Ads publishes", () => {
  const config = {};

  const faked = googleAdsFaker("customer_list_accessible", fakeRequest("google_ads", "customer_list_accessible", config));

  assert.deepEqual(faked, {
    "resourceNames": [
      "customers/1234567890",
      "customers/9876543210"
    ]
  });
});

test("an operation with no fixture throws rather than inventing a shape", () => {
  assert.throws(() => googleAdsFaker("no_such_operation", fakeRequest("google_ads", "no_such_operation", {})), /no fake response/);
});
