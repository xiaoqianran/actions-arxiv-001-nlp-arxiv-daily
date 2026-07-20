// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";

const isProd = process.env.NODE_ENV === "production";

// GitHub Pages: https://xiaoqianran.github.io/actions-arxiv001-nlp-arxiv-daily/
export default defineConfig({
  site: isProd ? "https://xiaoqianran.github.io" : undefined,
  base: isProd ? "/actions-arxiv001-nlp-arxiv-daily" : undefined,
  // Pagefind indexes "directory" outputs by default (`/foo/index.html`); the
  // integration's docs note `format: "file"` works too, but we stick with the
  // default since that's what GitHub Pages serves cleanest.
  output: "static",
  // pagefind() must run AFTER sitemap so it indexes the final dist tree.
  integrations: [sitemap(), pagefind()],
  vite: {
    plugins: [tailwindcss()],
  },
});
