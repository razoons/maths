import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [vue(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Maths Game',
      short_name: 'Maths',
      start_url: '.',
      display: 'standalone',
      background_color: '#0aaee3',
      theme_color: '#f78d17',
      icons: [
        {
          src: 'icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
  base: '/maths/',
  build: {
    outDir: 'dist',
  }
})
