import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: "https://travelnext.works",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/aeroVE5"),
      },
    },
  },
});
