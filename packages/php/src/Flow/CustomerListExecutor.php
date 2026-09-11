<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleAds\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\GoogleAds\Actions\CustomerListAccessible;
use ParticleAcademy\GoogleAds\GoogleAds;

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
 * Accessible Google Ads customers, run on a fancy-flow-php host.
 *
 * The PHP twin of `googleAdsCustomerListExecutor` in
 * @particle-academy/google-ads-js: the same request, built from the node's
 * config by the same `Actions\CustomerListAccessible` a host would call
 * directly, and the same value on `out` — the client's `{data, mode,
 * connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Google Ads. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/google_ads_customer_list',
    aliases: [
        'google_ads_customer_list',
    ],
    category: 'io',
    label: 'Accessible Google Ads customers',
    description: 'List Google Ads customer resource names directly accessible to the authenticated user. Manager-linked client accounts are not included; query the account hierarchy after choosing a directly accessible manager.',
    inputs: [
        [
            'id' => 'in',
        ],
    ],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'none',
    outputShape: [
        [
            'path' => 'data.resourceNames',
            'type' => 'array',
            'description' => 'Customer resource names in customers/{customer_id} form that the OAuth identity can access directly.',
        ],
    ],
)]
final class CustomerListExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            GoogleAds::descriptor(),
            CustomerListAccessible::OPERATION,
            $config,
            [
                'method' => CustomerListAccessible::METHOD,
                'path' => CustomerListAccessible::PATH,
                'query' => CustomerListAccessible::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'google_ads customer_list_accessible'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
