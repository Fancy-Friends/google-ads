# Google Ads

[![Fancified](art/fancified.svg)](https://particle.academy)

Google Ads for [fancy-flow][flow] — as **four imported, versioned packages**, one
per runtime. Not vendored source: a copy cannot be upgraded, and third-party APIs
change.

[flow]: https://github.com/Particle-Academy/fancy-flow

| Runtime | Package | Install |
|---|---|---|
| Authoring surface (every host) | `@particle-academy/google-ads-ui` | `npm install @particle-academy/google-ads-ui` |
| Node | `@particle-academy/google-ads-js` | `npm install @particle-academy/google-ads-js` |
| PHP 8.4+ | `particle-academy/google-ads-php` | `composer require particle-academy/google-ads-php` |
| Python 3.11+ | `fancy-google-ads` | `pip install fancy-google-ads` |

The `ui` package is the editor surface and is React on every host — a PHP or
Python project installs it *and* its own runtime package, and never the `js` one.

## What it costs you

One dependency: `@particle-academy/fancy-connector-core` (or
`particle-academy/fancy-connector-core` on Composer), which the `js` and `php`
packages pull in themselves. The Python package has **zero** runtime
dependencies.

**No Google Ads SDK.** Plain HTTP, deliberately: a vendor SDK is third-party code
subject to the kit's full approval bar, and one per provider is hundreds of
dependencies nobody is tracking.

## Setting it up

Everything below is generated from `provider/manifest.json`, so it cannot disagree with what the packages do.

### On Google Ads's side

1. **Create (or reuse) the Google Cloud project for **your app's name**** — Every Google connector shares ONE consent grant (oauth.grant "google"), so use one project and one OAuth client for all of them: one consent and one refresh token per person. ([developers.google.com](https://developers.google.com/workspace/guides/create-project))
2. **Enable the Google Ads API** — Console: APIs & Services, Library; open the Google Ads API and click Enable. ([developers.google.com](https://developers.google.com/workspace/guides/enable-apis))
3. **Configure the consent screen** — Console: Google Auth platform, Branding (app name **your app's name**, support email, contact email), then Audience: Internal for people inside your Google Workspace organisation only, or External (while it is in testing, add each tester under Test users). Then Data Access, Add or Remove Scopes, and add `https://www.googleapis.com/auth/adwords` beside the scopes of any other Google connector you use. You cannot remove the consent screen once it is configured. ([developers.google.com](https://developers.google.com/workspace/guides/configure-oauth-consent))
4. **Create a Web application OAuth client** — Console: Google Auth platform, Clients, Create Client; type Web application. Under Authorized redirect URIs click Add URI and paste **your host's OAuth redirect URL**, then Create. Copy the client ID and client secret when the client is created. ([developers.google.com](https://developers.google.com/workspace/guides/create-credentials))
5. **Get Google Ads API access and the developer token** — Developer tokens are no longer issued from the Google Ads API Center: do not sign up there. Apply from the Google Ads API Overview page in Cloud Console. Access now belongs to the Cloud PROJECT: a new project has Test access (test accounts only, 15,000 operations a day); Explorer access is usually approved automatically (up to 2,880 operations a day on production accounts); Basic and Standard need brand verification first. A production call from an unapproved project fails with CLOUD_PROJECT_NOT_APPROVED_FOR_PRODUCTION. ([developers.google.com](https://developers.google.com/google-ads/api/docs/api-policy/developer-token))
6. **Connect an account and check it works** — Connect one Google account through **your app's name**'s OAuth flow, then run the check below. ([developers.google.com](https://developers.google.com/google-ads/api/docs/api-policy/developer-token))

Every step in full — who does it, what to paste, which credentials it yields, and how you know it worked — is in [SETUP.md](SETUP.md).

### Credentials

A Google Ads connection holds 6 values.

**Two kinds of value, and mixing them up matters.** A `provider` credential is ONE value for the whole installation — an OAuth app's client secret serves every connected account. An `account` credential is one per connected account. A host that stores the second where it stores the first lets one account's credentials reach another's.

| Field | Scope | Secret | Where it comes from |
|---|---|---|---|
| **OAuth client ID** | per installation | not secret | The Google Cloud OAuth client shared by the installation. |
| **OAuth client secret** | per installation | **secret** | The matching Google Cloud OAuth client secret. |
| **Developer token** | per installation | **secret** | The Google Ads API developer token, applied for on the Google Ads API Overview page in Cloud Console (no longer the Ads API Center; access levels now belong to the Cloud project). Google says to treat it like a password; one token identifies the installed application. |
| **Access token** | per connected account | **secret** | The connected Google user's one-hour OAuth access token. |
| **Refresh token** | per connected account | **secret** | The reusable offline token used to replace expired access tokens. |
| **Manager customer ID** *(optional)* | per connected account | not secret | Optional. The manager account's 10-digit customer ID without hyphens. Required when the OAuth user reaches a client through that manager; omit it for direct access. |

Every request carries `developer-token` and `login-customer-id` *(when set)* alongside the primary authorization, filled from the credentials above.

### Authorising

Google Ads uses OAuth2 (authorization_code). The package DECLARES the exchange; the HOST performs it — a consent screen needs a browser, a redirect URI and somewhere to persist the result, and all three belong to the host.

- **Authorize URL** — https://accounts.google.com/o/oauth2/v2/auth
- **Token URL** — https://oauth2.googleapis.com/token
- **Scopes** — `https://www.googleapis.com/auth/adwords`
- **Access token lifetime** — 3600 seconds (1 hours). A host that never refreshes works all afternoon and is broken by morning.

**One consent grant, shared** (`grant: "google"`). Every connector declaring the same grant can run on ONE OAuth client, with one consent and one refresh token per person.

- **Authorize with** `access_type=offline`, `include_granted_scopes=true`. Ask for a feature's scopes when it is first used; the new token covers every scope granted before. A refresh token comes back only on the FIRST exchange, so keep the stored one when an exchange returns none.
- **Revoke** — POST https://oauth2.googleapis.com/revoke with `token`. **It removes the WHOLE grant**: every connector sharing it, not only this one. A per-feature disconnect stops using that feature's scopes locally; only a full disconnect revokes.
- **Identify the account by `sub`**: request `openid`, then verify the token response's id_token (issuer `https://accounts.google.com` or `accounts.google.com`, keys at https://www.googleapis.com/oauth2/v3/certs, audience = `clientId`). Never key a connection by email.
- **No restricted scopes** in this connector.

The refresh tokens do **not** rotate: the same one is reusable, so a refresh may safely be retried and may run concurrently. Stated rather than assumed, because the opposite — a provider that spends the token and revokes the grant on a replay — looks identical until it happens.

### The estate

Google Ads has a test estate on the same host, reached with credentials from a SEPARATE test account you register. Selecting sandbox mode uses those credentials.

> Use a dedicated Google Ads test manager and test client account. Test and production hierarchies cannot interact; test ads never serve or incur cost, but some features such as billing, conversion uploads and serving reports cannot be exercised there.

## What it can do

### Actions

#### `customer_list_accessible` — Accessible Google Ads customers

List Google Ads customer resource names directly accessible to the authenticated user. Manager-linked client accounts are not included; query the account hierarchy after choosing a directly accessible manager.

`GET /v25/customers:listAccessibleCustomers` · reads only — safe to replay

Takes no input.

## Run it before you have credentials

Every operation ships a **faker**, whether or not Google Ads has a sandbox. Set a
node's mode to `fake` and it returns the shape Google Ads actually publishes — the
same field names, deterministically — so you can wire the downstream nodes before
touching an account, a key, or a network.

## This repository is generated

`provider/` is the source. Everything under `packages/` is emitted from it and
**must not be hand-edited** — CI regenerates and diffs on every push, and the
next protocol sync destroys anything it finds. See [`AGENTS.md`](AGENTS.md).

## Two namespaces, which do not match on purpose

The repo is `github.com/Fancy-Friends/google-ads`; the packages publish under
`particle-academy`. Nothing derives one from the other — the names come from
weaver's `friends.json` and nowhere else.

## Licence

MIT.
