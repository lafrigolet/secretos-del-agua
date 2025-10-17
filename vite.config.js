import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: '/secretos-del-agua/',
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: "autoUpdate", // service worker auto-updates
      includeAssets: [
        "favicon.ico",
        "logo-black-192.png",
        "logo-text-black-512.png",
        "logo-text-black-512.png",
        "apple-touch-icon.png"
      ],
      manifest: {
        name: "Secretos del Agua",
        short_name: "Secretos",
        description: "A PWA app for Secretos del Agua",
        theme_color: "#2e2121",
        background_color: "#f8efe7",
        display: "standalone",
        start_url: "/secretos-del-agua/",
        icons: [
          {
            src: "logo-black-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo-text-black-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
})
