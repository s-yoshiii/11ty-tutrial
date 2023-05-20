import { defineConfig } from "vite";
import { resolve } from "path";
import { eleventyPlugin } from "vite-plugin-eleventy";
export default defineConfig({
  root: "src",
  publicDir: resolve(__dirname, "public"),
  plugins: [eleventyPlugin()],
  server: {
    port: 3000,
    open: true,
  },
  sourcemap: process.env.NODE_ENV !== "production",
  build: {
    outDir: "../build",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "./src/index.html"),
        about: resolve(__dirname, "./src/about/index.html"),
      },
      output: {
        chunkFileNames: "assets/js/[name].js",
        entryFileNames: "assets/js/[name].js",
        assetFileNames: (assetInfo) => {
          console.log(assetInfo);
          let extType = assetInfo.name.split(".")[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = "images";
          } else if (/woff|woff2|eot|ttf/.test(extType)) {
            extType = "fonts";
          } else if (/s?css/.test(extType)) {
            extType = "css";
          }
          return `assets/${extType}/[name][extname]`;
        },
      },
    },
  },
  // resolve: {
  //   alias: {
  //     "@styles": new URL("src/common/css", import.meta.url).pathname,
  //     "@js": new URL("src/common/js", import.meta.url).pathname,
  //   },
  // },
  css: {
    postcss: {
      plugins: [require("autoprefixer")],
    },
  },
});
