import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
// export default defineConfig({
//  base: "/jettravel/",
//   plugins: [react()],
//   server: {
//     host: true,
//     port: 5173,
//     proxy: {
//       "/api": {
//         target: "https://testapi.iati.com",
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
// });

export default defineConfig({
  base: "/jettravel",
  plugins: [react()],
  server: {
    host: true,
    port: 443,
    proxy: {
      "/api": {
        target: "https://hotelapi.iati.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});