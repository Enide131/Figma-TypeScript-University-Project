import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Use relative base so built files work reliably on GitHub Pages.
  // This makes asset paths relative (./assets/...) which avoids path issues.
  base: './',
  plugins: [react()],
})
