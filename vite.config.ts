import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "home-connect-card-pack.js",
    },
    sourcemap: true,
    minify: "esbuild",
    target: "es2022",
    rollupOptions: {
      output: { inlineDynamicImports: true },
    },
  },
});
