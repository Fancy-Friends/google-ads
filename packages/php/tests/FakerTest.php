<?php

declare(strict_types=1);

use ParticleAcademy\GoogleAds\GoogleAdsFaker;
use ParticleAcademy\Connectors\FakeValues;

/*
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
 * The golden fixtures — the SAME values the TypeScript and Python packages
 * assert.
 *
 * Bit-for-bit identical is the claim, and this is what checks it.
 * Cross-runtime drift does not fail loudly on its own: it completes, down one
 * path, with no error.
 */

it('customer_list_accessible fakes the shape Google Ads publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('google_ads', 'customer_list_accessible', $config));

    $faked = GoogleAdsFaker::respond('customer_list_accessible', ['config' => $config, 'fake' => $fake]);

    expect($faked)->toBe([
        'resourceNames' => [
            'customers/1234567890',
            'customers/9876543210',
        ],
    ]);
});

it('throws for an operation with no fixture rather than inventing a shape', function () {
    $fake = new FakeValues(FakeValues::seedForCall('google_ads', 'no_such_operation', []));

    expect(fn () => GoogleAdsFaker::respond('no_such_operation', ['config' => [], 'fake' => $fake]))
        ->toThrow(InvalidArgumentException::class);
});
