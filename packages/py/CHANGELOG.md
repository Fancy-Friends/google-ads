# Changelog

All notable changes to `@particle-academy/google-ads-ui`,
`@particle-academy/google-ads-js`, `particle-academy/google-ads-php` and
`fancy-google-ads`.

## [0.1.1] — 2026-09-06

### Changed

- **Published through npm Trusted Publishing, so these packages now carry PROVENANCE.**

Every earlier release went out under a scope-wide npm token. This one is
published by an OIDC exchange from the release workflow itself, and npm records
which workflow in which repository built it.
`npm view @particle-academy/google-ads-ui@0.1.1` shows the attestation; releases before
this one have none.

What it buys a consumer: the tarball on the registry can be tied to a public
commit and a public workflow run, rather than to whoever held a token. What it
does not buy: nothing about the code changed, and the runtime behaviour of all
four packages is identical to 0.1.0.

- **`repository.directory` in the npm packages.**

`@particle-academy/google-ads-ui` and `@particle-academy/google-ads-js` live at
`packages/ui` and `packages/js` inside the provider repo. npm's `repository`
field now says so, which makes the "Repository" link on each package page point
at the package rather than at the repository root.

## [0.1.0] - 2026-08-24

### Added

- List Google Ads customers directly accessible to an OAuth identity.
- Send the required developer token alongside OAuth bearer authorization.
- Support an optional manager customer header for manager-account access.
- Model Google Ads' isolated test-account hierarchy.
- Provide a deterministic fixture matching the v25 discovery response.

[0.1.0]: https://github.com/Fancy-Friends/google-ads/releases/tag/v0.1.0
