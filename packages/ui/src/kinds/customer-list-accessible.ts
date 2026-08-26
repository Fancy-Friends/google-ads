/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/customer-list-accessible.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/customer-list-accessible.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_ads
 */

/**
 * Accessible Google Ads customers — List Google Ads customer resource names
 * directly accessible to the authenticated user. Manager-linked client
 * accounts are not included; query the account hierarchy after choosing a
 * directly accessible manager.
 *
 * https://developers.google.com/google-ads/api/rest/reference/rest/v25/customers/listAccessibleCustomers
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleAdsMeta } from "../service.js";

export const GOOGLE_ADS_CUSTOMER_LIST_KIND = "@particle-academy/google_ads_customer_list";
export const GOOGLE_ADS_CUSTOMER_LIST_OPERATION = "customer_list_accessible";

export const GOOGLE_ADS_CUSTOMER_LIST_META = googleAdsMeta("action", "list directly accessible customers", "https://developers.google.com/google-ads/api/rest/reference/rest/v25/customers/listAccessibleCustomers");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_ADS_CUSTOMER_LIST_OUTPUT: OutputField[] = [
  {
    "path": "data.resourceNames",
    "type": "array",
    "description": "Customer resource names in customers/{customer_id} form that the OAuth identity can access directly."
  }
];

export const googleAdsCustomerListKind: NodeKindDefinition = defineConnectorKind(GOOGLE_ADS_CUSTOMER_LIST_META, {
  name: GOOGLE_ADS_CUSTOMER_LIST_KIND,
  aliases: ["google_ads_customer_list"],
  label: "Accessible Google Ads customers",
  description: "List Google Ads customer resource names directly accessible to the authenticated user. Manager-linked client accounts are not included; query the account hierarchy after choosing a directly accessible manager.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: GOOGLE_ADS_CUSTOMER_LIST_OUTPUT,
  configSchema: [],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_ADS_CUSTOMER_LIST_META, config as Record<string, unknown>, "list directly accessible customers"),
});
