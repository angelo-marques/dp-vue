<template>
  <main class="pv" style="padding-top:64px" v-if="pattern">
    <!-- BACK + BREADCRUMB -->
    <div class="container pv-nav">
      <RouterLink to="/" class="back-link">← {{ lang==='pt' ? 'Voltar' : 'Back' }}</RouterLink>
      <span class="breadcrumb">
        <span :class="'cb-'+pattern.cat">{{ lang==='pt' ? pattern.catLabelPt : pattern.catLabelEn }}</span>
        / {{ pattern.name }}
      </span>
    </div>

    <!-- HEADER -->
    <section class="pv-header">
      <div class="container">
        <span :class="['cat-badge', 'cb-'+pattern.cat]">
          {{ lang==='pt' ? pattern.catLabelPt : pattern.catLabelEn }}
        </span>
        <h1>{{ pattern.name }}</h1>
        <p class="pv-sub">{{ lang==='pt' ? pattern.subtitlePt : pattern.subtitleEn }}</p>
        <p class="pv-desc">{{ lang==='pt' ? pattern.descPt : pattern.descEn }}</p>
      </div>
    </section>

    <!-- CODE TABS -->
    <section class="pv-code">
      <div class="container">
        <div class="code-header">
          <div class="lang-tabs">
            <button
              v-for="l in langs" :key="l.key"
              :class="['lt', 'lt-'+l.key, { active: activeLang===l.key }]"
              @click="activeLang=l.key"
            >{{ l.label }}</button>
          </div>
          <div class="file-name">{{ pattern.files?.[activeLang] ?? activeLang+'.txt' }}</div>
          <button class="copy-btn" @click="copy">
            {{ copied ? '✓ Copiado' : '⎘ Copiar' }}
          </button>
        </div>

        <div class="code-block">
          <pre><code v-html="currentCode"></code></pre>
        </div>
      </div>
    </section>

    <!-- NAV BETWEEN PATTERNS -->
    <div class="container pv-pagination">
      <RouterLink v-if="prev" :to="'/pattern/'+prev.id" class="pag-btn pag-prev">
        ← {{ prev.name }}
      </RouterLink>
      <div v-else></div>
      <RouterLink to="/" class="pag-home">⊞ {{ lang==='pt' ? 'Todos os Padrões' : 'All Patterns' }}</RouterLink>
      <RouterLink v-if="next" :to="'/pattern/'+next.id" class="pag-btn pag-next">
        {{ next.name }} →
      </RouterLink>
      <div v-else></div>
    </div>
  </main>

  <div v-else class="not-found container">
    <h2>{{ lang==='pt' ? 'Padrão não encontrado' : 'Pattern not found' }}</h2>
    <RouterLink to="/">← {{ lang==='pt' ? 'Voltar' : 'Back' }}</RouterLink>
  </div>
</template>

<script setup>
import { ref, computed, inject, defineAsyncComponent } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { PATTERNS, getPattern } from '@/data/patterns.js'

const lang = inject('lang')
const route = useRoute()

const id = computed(() => route.params.id)
const pattern = computed(() => getPattern(id.value))

const idx = computed(() => PATTERNS.findIndex(p => p.id === id.value))
const prev = computed(() => idx.value > 0 ? PATTERNS[idx.value - 1] : null)
const next = computed(() => idx.value < PATTERNS.length - 1 ? PATTERNS[idx.value + 1] : null)

// Dynamically load the pattern component to get its code
const patternComponent = computed(() => {
  if (!pattern.value) return null
  return defineAsyncComponent(() =>
    import(`@/components/patterns/${pattern.value.component}.vue`)
      .catch(() => ({ setup: () => ({}) }))
  )
})

// The codes are exported from each pattern's Vue file
// We load them via dynamic import
const loadedCodes = ref({})
const loadedFiles = ref({})

async function loadCodes() {
  if (!pattern.value) return
  try {
    const mod = await import(`@/components/patterns/${pattern.value.component}.vue`)
    // Each pattern Vue file exports codes and filenames via defineExpose or setup
    // Since they use Options API style setup(), we access them differently
    // Actually the codes are embedded in the component template—we'll extract them
  } catch (e) {
    console.warn('Could not load pattern codes:', e)
  }
}

// ── Inline code map (extracted from Vue components) ──
// This avoids needing to dynamically parse Vue SFCs
import { PATTERN_CODES } from '@/data/patternCodes.js'

const langs = [
  { key: 'Java',   label: 'Java'   },
  { key: 'C#',     label: 'C#'     },
  { key: 'Python', label: 'Python' },
  { key: 'Ruby',   label: 'Ruby'   },
]
const activeLang = ref('Java')

const currentCode = computed(() => {
  if (!pattern.value) return ''
  const codes = PATTERN_CODES[pattern.value.id]
  return codes?.[activeLang.value] ?? ''
})

// Copy
const copied = ref(false)
function copy() {
  const plain = currentCode.value.replace(/<[^>]+>/g, '')
  navigator.clipboard.writeText(plain).then(() => {
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  })
}
</script>

<style scoped>
.pv-nav {
  display: flex; align-items: center; gap: 1rem;
  padding-top: 1.5rem; padding-bottom: 1rem;
}
.back-link { color: var(--tx2); font-size: .9rem; transition: color .2s; }
.back-link:hover { color: var(--ac); }
.breadcrumb { color: var(--tx3); font-size: .85rem; }

.pv-header { padding: 2rem 0 3rem; }
.cat-badge {
  font-size: .78rem; border-radius: 99px; padding: .3rem .85rem;
  font-family: 'Space Mono', monospace; display: inline-block; margin-bottom: 1rem;
}
.cb-creational { background:rgba(0,212,255,.1);  color:var(--ac);  border:1px solid rgba(0,212,255,.3); }
.cb-structural  { background:rgba(124,58,237,.1); color:var(--ac2); border:1px solid rgba(124,58,237,.3); }
.cb-behavioral  { background:rgba(16,185,129,.1); color:var(--ac3); border:1px solid rgba(16,185,129,.3); }

.pv-header h1 { font-size: clamp(2rem,4vw,3rem); font-weight: 800; margin-bottom: .5rem; }
.pv-sub { color: var(--ac2); font-family: 'Space Mono', monospace; font-size: .9rem; margin-bottom: 1rem; }
.pv-desc { color: var(--tx2); line-height: 1.8; max-width: 680px; font-size: 1rem; }

.pv-code { padding-bottom: 3rem; }
.code-header {
  display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
  margin-bottom: 1rem;
}
.lang-tabs { display: flex; gap: .5rem; }
.lt {
  background: var(--bg3); border: 1px solid var(--br); border-radius: 8px;
  color: var(--tx2); cursor: pointer; padding: .4rem 1rem; font-size: .85rem;
  font-family: 'Space Mono', monospace; transition: all .2s;
}
.lt-Java.active   { background:rgba(245,158,11,.2); color:var(--ac4); border-color:var(--ac4); }
.lt-CS.active, .lt-C\#.active { background:rgba(124,58,237,.2); color:var(--ac2); border-color:var(--ac2); }
.lt-Python.active { background:rgba(59,130,246,.2); color:#60a5fa; border-color:#60a5fa; }
.lt-Ruby.active   { background:rgba(239,68,68,.2);  color:#f87171; border-color:#f87171; }
.lt:hover:not(.active) { border-color: var(--tx3); color: var(--tx); }

.file-name { color: var(--tx3); font-size: .8rem; font-family: 'Space Mono', monospace; margin-left: auto; }
.copy-btn {
  background: var(--bg3); border: 1px solid var(--br); border-radius: 8px;
  color: var(--tx2); cursor: pointer; padding: .4rem 1rem; font-size: .82rem;
  font-family: 'Space Mono', monospace; transition: all .2s;
}
.copy-btn:hover { border-color: var(--ac); color: var(--ac); }

.code-block {
  background: var(--bg2); border: 1px solid var(--br); border-radius: var(--r);
  overflow: auto; max-height: 70vh;
}
.code-block pre {
  padding: 1.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: .88rem;
  line-height: 1.7;
  color: var(--tx);
  white-space: pre;
}

.pv-pagination {
  display: grid; grid-template-columns: 1fr auto 1fr;
  gap: 1rem; align-items: center; padding-bottom: 4rem; margin-top: 3rem;
}
.pag-btn {
  background: var(--bg2); border: 1px solid var(--br); border-radius: 10px;
  color: var(--tx2); padding: .75rem 1.25rem; font-size: .9rem;
  transition: all .2s; display: block;
}
.pag-btn:hover { border-color: var(--ac); color: var(--ac); }
.pag-prev { text-align: left; }
.pag-next { text-align: right; }
.pag-home {
  background: var(--bg3); border: 1px solid var(--br); border-radius: 10px;
  color: var(--tx2); padding: .75rem 1.5rem; font-size: .88rem;
  text-align: center; transition: all .2s;
}
.pag-home:hover { border-color: var(--ac); color: var(--ac); }

.not-found { padding: 8rem 0; text-align: center; }
.not-found h2 { font-size: 2rem; margin-bottom: 1rem; }
</style>
