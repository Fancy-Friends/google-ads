<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleAds\Actions;

use ParticleAcademy\GoogleAds\GoogleAds;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
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
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Google Ads or calls the faker.
 */
final class CustomerListAccessible
{
    public const OPERATION = 'customer_list_accessible';
    public const METHOD = 'GET';
    public const PATH = '/v25/customers:listAccessibleCustomers';
    public const SIDE_EFFECTS = 'none';

    /**
     * Build the form body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from Google Ads.
     *
     * @param array<string,mixed> $config
     * An EMPTY body is `{}`, not `[]` — and PHP cannot tell those apart, because
     * both are `array()` and `json_encode` picks the list. So an empty one is
     * returned as an object. TypeScript and Python have no such ambiguity, which
     * is why this is a difference only the byte-parity suite can see.
     *
     * @return array<string,mixed>|\stdClass
     */
    public static function body(array $config): array|\stdClass
    {
        $body = [];

        $body = $body === [] ? new \stdClass() : $body;
        return $body;
    }
}
