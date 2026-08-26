/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_ads
 */

/**
 * Google Ads, as one service descriptor shared by every Google Ads operation.
 *
 * @particle-academy/fancy-connector-core carries what is true of ALL
 * connectors. This carries what is true of Google Ads: its base URL, its auth
 * scheme, its idempotency header, and its faker.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Use a dedicated Google Ads test manager and test client account. Test and
 * production hierarchies cannot interact; test ads never serve or incur cost,
 * but some features such as billing, conversion uploads and serving reports
 * cannot be exercised there.
 */

import type { ConnectorMode, PreparedRequest, ServiceDescriptor } from "@particle-academy/fancy-connector-core";

import { googleAdsFaker } from "./faker.js";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported. An imported constant lets an upgrade rewrite the
 * very claim it exists to detect, after which the copy agrees with itself
 * forever.
 */
export const CONNECTOR_API_VERSION = 1;

export const GOOGLE_ADS_BASE_URLS = {
  "live": "https://googleads.googleapis.com",
  "sandbox": "https://googleads.googleapis.com"
} as const;

/** Credential keys a remote call cannot proceed without. */
export const GOOGLE_ADS_REQUIRES = [
  "accessToken",
  "refreshToken",
  "clientId",
  "clientSecret",
  "developerToken",
  "loginCustomerId"
] as const;

/**
 * Apply Google Ads's auth scheme to an outgoing request.
 *
 * Google Ads requires the OAuth bearer AND the developer-token header on
 * ordinary calls. developerToken identifies the installed API application;
 * loginCustomerId selects the manager account only when access to a client is
 * through that manager. An absent optional manager id omits the header rather
 * than sending it empty.
 *
 * The mode is passed in because for some providers auth and estate are the
 * same decision expressed in the URL; here it is unused, and saying so is
 * cheaper than wondering later whether it was forgotten.
 */
export function googleAdsAuthorize(
  credentials: Record<string, string | undefined>,
  request: PreparedRequest,
  _mode: ConnectorMode,
): void {
  request.headers.Authorization = `Bearer ${credentials.accessToken ?? ""}`;

  request.headers["developer-token"] = String(credentials.developerToken ?? "");
  if (credentials.loginCustomerId) {
    request.headers["login-customer-id"] = String(credentials.loginCustomerId);
  }
}

/** The Google Ads service, for the TypeScript runtime. */
export const GOOGLE_ADS: ServiceDescriptor = {
  service: "google_ads",
  title: "Google Ads",
  sandbox: "separate-account",
  baseUrls: { ...GOOGLE_ADS_BASE_URLS },
  requires: [...GOOGLE_ADS_REQUIRES],
  authorize: googleAdsAuthorize,
  faker: googleAdsFaker,
};
