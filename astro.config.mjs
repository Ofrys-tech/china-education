import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// GitHub Pages project sites live under /<repo>/; set BASE_PATH in CI.
const site = process.env.SITE_URL ?? "http://localhost:4321";
const rawBase = process.env.BASE_PATH ?? "/";
const base = rawBase === "/" ? "/" : `/${rawBase.replace(/^\/+|\/+$/g, "")}/`;

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  output: "static",
  build: {
    format: "directory",
    inlineStylesheets: "auto",
  },
  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !["/404", "/styleguide", "/privacy"].some((path) => pathname.includes(path));
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
