import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // IMPORTANT: set `base` to your GitHub repo name when deploying to
  // https://<username>.github.io/<repo>/ — updated to match your repository name.
  base: '/Figma-TypeScript-University-Project/',
  plugins: [react()],
})
