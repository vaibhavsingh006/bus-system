import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: "public/_redirects",
          dest: ".", // copy to dist/
        },
      ],
    }),
  ],
  build: {
    outDir: "dist",
  },
  publicDir: "public", // make sure this is present (default value)
  base: "./",
});

// const { defineConfig } = require("vite");
// const react = require("@vitejs/plugin-react");
// const tailwindcss = require("@tailwindcss/vite");
// const { viteStaticCopy } = require("vite-plugin-static-copy");

// module.exports = defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//     viteStaticCopy({
//       targets: [{ src: "public/_redirects", dest: "." }],
//     }),
//   ],
//   build: {
//     outDir: "dist",
//   },
//   publicDir: "public",
//   base: "./",
// });
