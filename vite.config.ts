import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({define: {
    global: 'window', // global 객체를 window로 대체
  },
  plugins: [react()],
})
