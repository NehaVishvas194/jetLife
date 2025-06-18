import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: '/jettravel',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
     proxy: {
      '/api': {
        target: 'https://mobappssolutions.in/jet/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
