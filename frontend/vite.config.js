import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://ayurvedic-backend-xpb5.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
