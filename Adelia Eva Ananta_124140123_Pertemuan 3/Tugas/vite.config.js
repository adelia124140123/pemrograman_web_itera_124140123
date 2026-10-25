import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Konfigurasi Vitest
  test: {
    globals: true,               // describe, test, expect bisa dipakai tanpa import
    environment: 'jsdom',        // browser palsu (DOM dan localStorage) untuk test
    setupFiles: './src/setupTests.js',
  },
})