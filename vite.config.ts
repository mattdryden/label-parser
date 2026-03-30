import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    preview: {
    host: true,
    port: process.env.PORT,
    strictPort: true,
    allowedHosts: [
      'walrus-app-wj3f5.ondigitalocean.app'
    ]
  }
,
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
})
