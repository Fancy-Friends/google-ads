# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/customer-list-accessible.json by weaver's
# generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/customer-list-accessible.json (or weaver's template/) and
# regenerate:
#
# npm run provider -- google_ads

"""List Google Ads customer resource names directly accessible to the
authenticated user. Manager-linked client accounts are not included; query
the account hierarchy after choosing a directly accessible manager.

GET /v25/customers:listAccessibleCustomers —
https://developers.google.com/google-ads/api/rest/reference/rest/v25/customers/listAccessibleCustomers

This describes the request. `call` resolves the connection, picks the
estate, and either calls Google Ads or calls the faker.
"""

from __future__ import annotations

from typing import Any

from .._runtime import CallResult, Mode, call
from ..service import descriptor

OPERATION = "customer_list_accessible"
METHOD = "GET"
PATH = "/v25/customers:listAccessibleCustomers"
SIDE_EFFECTS = "none"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the form body for one call, failing loudly and specifically."""
    out: dict[str, Any] = {}

    return out


def customer_list_accessible(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """List Google Ads customer resource names directly accessible to the authenticated user.
    Manager-linked client accounts are not included; query the account hierarchy after choosing a
    directly accessible manager.
    """
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        form=body(config),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )
