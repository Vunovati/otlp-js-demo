import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/v1/traces": "http://host.docker.internal:4318", // the vite server is proxying back to host so that we skip the cors issues
    },
  },
  plugins: [react()],
});
