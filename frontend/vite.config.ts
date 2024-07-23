import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  preview: {
    host: true,
    proxy: {
      '/api': 'http://backend:3000',
    },
  },
})
