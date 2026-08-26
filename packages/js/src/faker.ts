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
 * The Google Ads faker.
 *
 * Shapes, not behaviour: the goal is that a downstream node sees the field
 * NAMES Google Ads actually publishes, so an author can wire {{ $json.data.id
 * }} against a fake and have it keep working against the real thing.
 *
 * Deterministic — same inputs, same output. A faker returning a fresh uuid
 * every call cannot be asserted on, so its fixtures degrade to "it did not
 * throw", which is the assertion that catches nothing.
 */

import type { ConnectorFaker, FakeRequest } from "@particle-academy/fancy-connector-core";

function fakeCustomerListAccessible({ config, fake }: FakeRequest): unknown {
  return {
    "resourceNames": [
      "customers/1234567890",
      "customers/9876543210",
    ],
  };
}

export const googleAdsFaker: ConnectorFaker = (operation, request) => {
  switch (operation) {
    case "customer_list_accessible":
      return fakeCustomerListAccessible(request);

    default:
      // A faker asked for an operation it has no shape for must SAY so. Making
      // something up would produce a green run whose output silently has none
      // of the fields the author is about to reference.
      throw new Error(
        `google_ads: no fake response is defined for "${operation}". ` +
          "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker " +
          "cannot be developed against, tested, or demonstrated.",
      );
  }
};
