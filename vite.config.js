import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Uncomment the next line if deploying to GitHub Pages under /mybiblebelt
  // base: '/mybiblebelt/',
})
