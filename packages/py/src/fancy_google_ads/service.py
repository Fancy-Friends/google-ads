# GENERATED FILE — do not edit.
#
# Emitted from provider/manifest.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/manifest.json (or weaver's template/) and regenerate:
#
# npm run provider -- google_ads

"""Google Ads, as one service descriptor shared by every Google Ads operation.

The Python twin of the js and php packages' service modules.

## The sandbox trap, written down where it is used

Use a dedicated Google Ads test manager and test client account. Test and
production hierarchies cannot interact; test ads never serve or incur cost,
but some features such as billing, conversion uploads and serving reports
cannot be exercised there.
"""

from __future__ import annotations

from ._runtime import PreparedRequest, ServiceDescriptor
from .faker import respond

# The connector API version this package was GENERATED against. A literal,
# never imported: an imported constant lets an upgrade rewrite the very claim
# it exists to detect, after which the copy agrees with itself forever.
CONNECTOR_API_VERSION = 1

SERVICE = "google_ads"
TITLE = "Google Ads"
SANDBOX = "separate-account"
BASE_URLS = {
    "live": "https://googleads.googleapis.com",
    "sandbox": "https://googleads.googleapis.com",
}

"""Credential keys a remote call cannot proceed without."""
REQUIRES = [
    "accessToken",
    "refreshToken",
    "clientId",
    "clientSecret",
    "developerToken",
    "loginCustomerId",
]


def authorize(
    credentials: dict[str, str | None],
    request: PreparedRequest,
    mode: str,
) -> None:
    """Apply Google Ads's auth scheme to an outgoing request.
    
    Google Ads requires the OAuth bearer AND the developer-token header on
    ordinary calls. developerToken identifies the installed API application;
    loginCustomerId selects the manager account only when access to a client is
    through that manager. An absent optional manager id omits the header rather
    than sending it empty.
    """
    request.headers["Authorization"] = f"Bearer {credentials.get('accessToken') or ''}"

    request.headers["developer-token"] = str(credentials.get("developerToken") or "")
    if credentials.get("loginCustomerId"):
        request.headers["login-customer-id"] = str(credentials["loginCustomerId"])


def descriptor() -> ServiceDescriptor:
    """The Google Ads service, for the Python runtime."""
    return ServiceDescriptor(
        service=SERVICE,
        title=TITLE,
        sandbox=SANDBOX,
        base_urls=BASE_URLS,
        requires=REQUIRES,
        authorize=authorize,
        faker=respond,
        idempotency_header=None,
    )
