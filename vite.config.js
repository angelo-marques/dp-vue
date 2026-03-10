import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  // ⚠️ Altere 'design-patterns' para o nome exato do seu repositório no GitHub
  // Ex: se o repo for github.com/angelo-marques/design-patterns → base: '/design-patterns/'
  base: process.env.NODE_ENV === 'production' ? '/design-patterns/' : '/',

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
