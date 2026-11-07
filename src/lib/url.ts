/**
 * Base-path aware URL helpers. GitHub Pages project sites are served from
 * /<repo>/, so every internal link and public asset must go through these.
 */
const RAW_BASE = import.meta.env.BASE_URL || "/";
const BASE = RAW_BASE === "/" ? "" : `/${RAW_BASE.replace(/^\/+|\/+$/g, "")}`;

/** Internal path → URL that respects the configured base. */
export function withBase(path = "/"): string {
  const clean = path.replace(/^\/+/, "");
  if (!clean) return `${BASE}/`;
  return `${BASE}/${clean}`;
}

/** Absolute production URL for canonical links, sitemap and structured data. */
export function absoluteUrl(path = "/"): string {
  const site = import.meta.env.SITE || "http://localhost:4321";
  const clean = path.replace(/^\/+/, "");
  const basePath = BASE.replace(/^\/+/, "");

  // Astro.url.pathname already contains the base on project pages; do not double it.
  if (basePath && (clean === basePath || clean.startsWith(`${basePath}/`))) {
    return new URL(`/${clean}`, site).toString();
  }

  return new URL(withBase(path), site).toString();
}

export function isExternal(href: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(href);
}
