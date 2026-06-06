import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    vue(),
    // Only enable devtools in development - removes overhead from prod builds
    mode === 'development' && vueDevTools(),
    tailwindcss(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    // Split heavy vendor libraries into separate chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router', 'vue-i18n'],
          'vendor-gsap': ['gsap'],
          'vendor-lottie': ['lottie-web'],
        }
      }
    },
    // Enable CSS code splitting for faster initial load
    cssCodeSplit: true,
    // Target modern browsers for smaller bundle
    target: 'es2020',
  }
}))
