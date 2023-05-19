import { defineConfig } from "vite";
import { eleventyPlugin } from "vite-plugin-eleventy";
export default defineConfig({
  root: "src",
  plugins: [eleventyPlugin()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "../build",
    emptyOutDir: false,
  },
  resolve: {
    alias: {
      "@styles": new URL("src/common/css", import.meta.url).pathname,
      "@js": new URL("src/common/js", import.meta.url).pathname,
    },
  },
  css: {
    postcss: {
      plugins: [require("autoprefixer")],
    },
  },
});
