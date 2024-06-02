/** @type {import('vite').UserConfig} */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/v1/traces": "http://localhost:4318",
      "/api/cart": "http://localhost:8080",
      "/api/products": "http://localhost:8081",
    },
  },
  plugins: [react()],
});
