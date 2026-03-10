<template>
  <div class="app">
    <!-- NAV -->
    <nav class="nav">
      <div class="container nav-inner">
        <RouterLink to="/" class="nav-brand">
          <div class="logo">DP</div>
          <span>Design<span class="ac">Patterns</span></span>
        </RouterLink>

        <div class="nav-right">
          <div class="lang-toggle">
            <button :class="{ active: lang === 'pt' }" @click="lang = 'pt'">PT</button>
            <button :class="{ active: lang === 'en' }" @click="lang = 'en'">EN</button>
          </div>
          <a href="https://github.com/angelo-marques/DotnetAiTestAgent" target="_blank" class="nav-gh">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>
        </div>
      </div>
    </nav>

    <!-- ROUTER VIEW -->
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" :lang="lang" :key="$route.fullPath" />
      </Transition>
    </RouterView>

    <!-- FOOTER -->
    <footer class="footer">
      <div class="container footer-inner">
        <div class="footer-brand">
          <div class="logo-sm">DP</div>
          <span><strong>Design Patterns</strong> · 23 GoF · Java · C# · Python · Ruby</span>
        </div>
        <div class="footer-links">
          <a href="https://www.linkedin.com/in/angelomarquesdeoliveirasilva" target="_blank">LinkedIn</a>
          <a href="https://github.com/angelo-marques" target="_blank">GitHub</a>
        </div>
        <div class="footer-copy">© 2025 Angelo Marques de Oliveira Silva</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const lang = ref('pt')
provide('lang', lang)
</script>

<style scoped>
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: rgba(5,8,16,.85);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--br);
  height: 64px;
}
.nav-inner {
  display: flex; align-items: center; justify-content: space-between;
  height: 64px;
}
.nav-brand {
  display: flex; align-items: center; gap: .75rem;
  font-family: 'Space Mono', monospace; font-weight: 700; font-size: 1.1rem;
}
.logo {
  width: 36px; height: 36px; border-radius: 8px;
  background: linear-gradient(135deg, var(--ac2), var(--ac));
  display: flex; align-items: center; justify-content: center;
  font-size: .8rem; font-weight: 800; font-family: 'Space Mono', monospace;
}
.ac { color: var(--ac); }
.nav-right { display: flex; align-items: center; gap: 1rem; }
.lang-toggle {
  display: flex; border: 1px solid var(--br); border-radius: 8px; overflow: hidden;
}
.lang-toggle button {
  background: none; border: none; color: var(--tx2); cursor: pointer;
  padding: .35rem .75rem; font-size: .85rem; font-family: 'Space Mono', monospace;
  transition: all .2s;
}
.lang-toggle button.active { background: var(--ac); color: #000; font-weight: 700; }
.nav-gh { color: var(--tx2); display: flex; transition: color .2s; }
.nav-gh:hover { color: var(--ac); }

.footer {
  margin-top: 6rem;
  border-top: 1px solid var(--br);
  padding: 2rem 0;
}
.footer-inner {
  display: flex; flex-wrap: wrap; gap: 1rem;
  align-items: center; justify-content: space-between;
}
.footer-brand { display: flex; align-items: center; gap: .75rem; font-size: .9rem; }
.logo-sm {
  width: 28px; height: 28px; border-radius: 6px;
  background: linear-gradient(135deg, var(--ac2), var(--ac));
  display: flex; align-items: center; justify-content: center;
  font-size: .65rem; font-weight: 800; font-family: 'Space Mono', monospace;
}
.footer-links { display: flex; gap: 1.5rem; }
.footer-links a { color: var(--tx2); font-size: .9rem; transition: color .2s; }
.footer-links a:hover { color: var(--ac); }
.footer-copy { color: var(--tx3); font-size: .8rem; }
</style>
