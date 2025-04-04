import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Log environment variables at build time
  define: {
    'process.env.VITE_SPOONACULAR_API_KEY': JSON.stringify(process.env.VITE_SPOONACULAR_API_KEY),
  },
  // Log environment variables at build time
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
