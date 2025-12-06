import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This allows your local dev server to be accessed from any network interface
    host: true, 
    
    // 👇 Add the ngrok host here to explicitly allow access
    allowedHosts: [
      '5ed988d72ac4.ngrok-free.app',
      // If you are using other public hosts or IP addresses, you can add them here
    ],
  },
})