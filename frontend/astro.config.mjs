// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [icon(), mdx()],
  markdown: {
    shikiConfig: {
      theme: "css-variables",
    },
  },
});
