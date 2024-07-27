import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    proxy: {
      '/api': 'http://localhost:666',
    },
  },
  preview: {
    host: true,
    proxy: {
      '/api': 'http://backend:666',
    },
  },
})
