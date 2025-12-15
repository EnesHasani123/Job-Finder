import { defineConfig } from "vite";

// Proxy /api to backend during dev. Change target if your backend uses another port.
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
