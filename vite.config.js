import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 5173,
  },
  define: {
    global: {
      console: {
        log: function (message) {
          console.log(message)
        }
      }
    },
  }
})
