# Google Ads

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

### Credentials

A Google Ads connection holds 6 values.

**Two kinds of value, and mixing them up matters.** A `provider` credential is ONE value for the whole installation — an OAuth app's client secret serves every connected account. An `account` credential is one per connected account. A host that stores the second where it stores the first lets one account's credentials reach another's.

| Field | Scope | Secret | Where it comes from |
|---|---|---|---|
| **OAuth client ID** | per installation | not secret | The Google Cloud OAuth client shared by the installation. |
| **OAuth client secret** | per installation | **secret** | The matching Google Cloud OAuth client secret. |
| **Developer token** | per installation | **secret** | The 22-character Google Ads API developer token from the manager account's API Center. Google says to treat it like a password; one token identifies the installed application. |
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
