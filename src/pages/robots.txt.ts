import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL;
  const sitemap = site ? new URL(`${base}sitemap-index.xml`, site).toString() : "";
  const disallow = ["styleguide/", "404.html"].map((path) => `Disallow: ${base}${path}`).join("\n");

  const body = ["User-agent: *", "Allow: /", disallow, "", sitemap ? `Sitemap: ${sitemap}` : ""]
    .filter(Boolean)
    .join("\n");

  return new Response(`${body}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
