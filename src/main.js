import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import PatternView from './views/PatternView.vue'
import './assets/main.css'

const router = createRouter({
  // Usa o mesmo base path do vite.config.js em produção
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/pattern/:id', component: PatternView }
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  }
})

createApp(App).use(router).mount('#app')
