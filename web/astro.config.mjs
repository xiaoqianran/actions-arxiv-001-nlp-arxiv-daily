// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";

const isProd = process.env.NODE_ENV === "production";

// GitHub project Pages live at https://<owner>.github.io/<repo>/.
// Prefer GITHUB_REPOSITORY in Actions so a fork keeps working even if the
// slug changes; fall back to this repo's actual name (note the hyphen in
// `arxiv-001` — a mismatch here 404s every CSS/JS/nav URL).
const [owner, repo] = (
  process.env.GITHUB_REPOSITORY ??
  "xiaoqianran/actions-arxiv-001-nlp-arxiv-daily"
).split("/");

export default defineConfig({
  site: isProd ? `https://${owner}.github.io` : undefined,
  base: isProd ? `/${repo}` : undefined,
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
