// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// TODO: replace `site` with the real production domain before deploy.
//   The sitemap integration is configured here but only emits valid URLs
//   once `site` points to the final canonical origin.
export default defineConfig({
  site: "https://didi-team.example",
  output: "static",
  integrations: [sitemap()],
});
