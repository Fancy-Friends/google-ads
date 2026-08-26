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
 * List Google Ads customer resource names directly accessible to the
 * authenticated user. Manager-linked client accounts are not included; query
 * the account hierarchy after choosing a directly accessible manager.
 *
 * GET /v25/customers:listAccessibleCustomers —
 * https://developers.google.com/google-ads/api/rest/reference/rest/v25/customers/listAccessibleCustomers
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Google Ads or calls the
 * faker.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { GOOGLE_ADS } from "../service.js";

export const CUSTOMER_LIST_ACCESSIBLE_OPERATION = "customer_list_accessible";

export type CustomerListAccessibleOptions = {
  /** The node's resolved config. Keys: . */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function googleAdsCustomerListAccessible(options: CustomerListAccessibleOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  return callConnector(GOOGLE_ADS, {
    operation: CUSTOMER_LIST_ACCESSIBLE_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "GET",
      path: "/v25/customers:listAccessibleCustomers",
      query: {},
    },
  });
}
