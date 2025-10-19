import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/secretos-del-agua/',

  plugins: [
    tailwindcss(),
    react()
  ],

  server: {
    proxy: {
      // Anything starting with /api will be forwarded to your Node server
      '/api': {
        target: 'http://localhost:3000',  // your Node backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
