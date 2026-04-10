import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 550,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }

          if (id.includes('recharts') || id.includes('d3')) {
            return 'charts-vendor';
          }

          if (id.includes('moment')) {
            return 'date-vendor';
          }

          if (id.includes('emoji-picker-react')) {
            return 'emoji-vendor';
          }

          if (id.includes('axios')) {
            return 'network-vendor';
          }

          return 'vendor';
        },
      },
    },
  },
})
