<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleAds;

use ParticleAcademy\Connectors\Mode;
use ParticleAcademy\Connectors\PreparedRequest;
use ParticleAcademy\Connectors\SandboxKind;
use ParticleAcademy\Connectors\ServiceDescriptor;

/*
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
 * The PHP twin of the js package's `src/service.ts`.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Use a dedicated Google Ads test manager and test client account. Test and
 * production hierarchies cannot interact; test ads never serve or incur cost,
 * but some features such as billing, conversion uploads and serving reports
 * cannot be exercised there.
 */
final class GoogleAds
{
    // The connector API version this package was GENERATED against. A
    // literal, never imported: an imported constant lets an upgrade rewrite
    // the very claim it exists to detect.
    public const CONNECTOR_API_VERSION = 1;

    public const SERVICE = 'google_ads';

    public const LIVE_URL = 'https://googleads.googleapis.com';
    public const SANDBOX_URL = 'https://googleads.googleapis.com';

    /** @var list<string> Credential keys a remote call cannot proceed without. */
    public const REQUIRES = [
        'accessToken',
        'refreshToken',
        'clientId',
        'clientSecret',
        'developerToken',
        'loginCustomerId',
    ];

    public static function descriptor(): ServiceDescriptor
    {
        return new ServiceDescriptor(
            service: self::SERVICE,
            title: 'Google Ads',
            sandbox: SandboxKind::SeparateAccount,
            baseUrls: [
                Mode::Live->value => self::LIVE_URL,
                Mode::Sandbox->value => self::SANDBOX_URL,
            ],
            requires: self::REQUIRES,
            authorize: self::authorize(...),
            faker: GoogleAdsFaker::respond(...),
        );
    }

    /**
     * Apply Google Ads's auth scheme to an outgoing request.
     *
     * Google Ads requires the OAuth bearer AND the developer-token header on
     * ordinary calls. developerToken identifies the installed API application;
     * loginCustomerId selects the manager account only when access to a client is
     * through that manager. An absent optional manager id omits the header rather
     * than sending it empty.
     *
     * @param array<string,string> $credentials
     */
    public static function authorize(array $credentials, PreparedRequest $request, Mode $mode): void
    {
        $request->withHeader('Authorization', 'Bearer '.($credentials['accessToken'] ?? ''));

        $request->withHeader('developer-token', (string) ($credentials['developerToken'] ?? ''));
        if (($credentials['loginCustomerId'] ?? '') !== '') {
            $request->withHeader('login-customer-id', (string) $credentials['loginCustomerId']);
        }
    }
}
