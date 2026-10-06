// redirect.ts

/**
 * Redirects the user to a target URL with an optional query parameter.
 *
 * @param baseUrl - The base URL to redirect to.
 * @param queryParam - The query parameter key to check in the current URL (default: "query").
 */
export function redirectWithQuery(): void {
const params = new URLSearchParams(window.location.search);
const encodedQuery = params.get("query");

const baseUrl = "https://samplelocator.bbmri.de/search";
const targetUrl = new URL(baseUrl);

if (encodedQuery) {
  targetUrl.searchParams.set("query", encodedQuery);
}

window.location.href = targetUrl.toString();
}