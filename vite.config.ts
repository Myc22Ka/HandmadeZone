import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: "/src",
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      '/user': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  test: {
    browser: {
      enabled: true,
      name: 'chromium',
      provider: 'playwright',
    },
  },
  css : {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  }
})
