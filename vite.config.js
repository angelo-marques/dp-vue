import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

const isGithubPagesBuild = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  // Em produção local/Vercel usa '/', no GitHub Pages usa '/dp-vue/'
  base: isGithubPagesBuild ? '/dp-vue/' : '/',

  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
