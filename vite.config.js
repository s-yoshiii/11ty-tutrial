import { defineConfig } from "vite";
import { resolve } from "path";
import { eleventyPlugin } from "vite-plugin-eleventy";
const glob = require("glob");
const entries = glob.sync(["./src/**/*.scss"]);
console.log(entries);
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
        about: "./src/common/css/html.scss",
        ejs: "./src/common/css/ejs.scss",
      },
      output: {
        chunkFileNames: "assets/js/[name].js",
        entryFileNames: "assets/js/[name].js",
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".")[1];
          console.log(assetInfo.name);
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
