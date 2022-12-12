import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import solidDevTools from "solid-devtools/vite";

export default defineConfig({
  plugins: [
    solidDevTools({
      name: true,
      componentLocation: true,
    }),
    solidPlugin(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
