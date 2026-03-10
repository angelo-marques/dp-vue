<template>
  <div class="pattern-card">
    <div class="card-header">
      <div>
        <h2 class="card-title">{{ name }}</h2>
        <p class="card-sub">{{ subtitle }}</p>
      </div>
      <span class="badge" :class="badgeClass">{{ category }}</span>
    </div>
    <p class="card-desc">{{ description }}</p>
    <hr />
    <div class="code-section">
      <div class="lang-tabs">
        <button
          v-for="lang in langs"
          :key="lang"
          class="lang-btn"
          :class="{ active: activeLang === lang, [langClass(lang)]: true }"
          @click="activeLang = lang"
        >{{ lang }}</button>
      </div>
      <div class="code-box">
        <div class="code-header">
          <div class="dots"><span class="r"></span><span class="y"></span><span class="g"></span></div>
          <span class="filename">{{ filename }}</span>
          <button class="copy-btn" @click="copy">{{ copied ? 'copied!' : 'copy' }}</button>
        </div>
        <pre><code v-html="activeCode"></code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  name: String,
  subtitle: String,
  category: String,
  categoryKey: String,
  description: String,
  codes: Object,   // { Java, CSharp, Python, Ruby }
  filenames: Object
})

const langs = ['Java', 'C#', 'Python', 'Ruby']
const activeLang = ref('Java')
const copied = ref(false)

const langKey = { Java: 'Java', 'C#': 'CSharp', Python: 'Python', Ruby: 'Ruby' }

const badgeClass = computed(() => ({
  'badge-creational': props.categoryKey === 'creational',
  'badge-structural':  props.categoryKey === 'structural',
  'badge-behavioral':  props.categoryKey === 'behavioral',
}))

const activeCode = computed(() => props.codes[langKey[activeLang.value]] || '')
const filename   = computed(() => props.filenames?.[langKey[activeLang.value]] || '')

function langClass(l) {
  return { Java: 'lj', 'C#': 'lc', Python: 'lp', Ruby: 'lr' }[l]
}

function copy() {
  const pre = document.createElement('div')
  pre.innerHTML = activeCode.value
  navigator.clipboard.writeText(pre.textContent)
  copied.value = true
  setTimeout(() => copied.value = false, 1500)
}
</script>

<style scoped>
.pattern-card {
  background: #101828;
  border: 1px solid #1e2d4a;
  border-radius: 18px;
  overflow: hidden;
  transition: all .3s;
}
.pattern-card:hover {
  transform: translateY(-3px);
  border-color: #253557;
  box-shadow: 0 16px 50px rgba(0,0,0,.4);
}
.card-header {
  padding: 22px 22px 14px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}
.card-title { font-size: 17px; font-weight: 800; letter-spacing: -.4px; margin-bottom: 4px; color: #e2e8f0; }
.card-sub   { font-size: 11px; color: #64748b; font-family: monospace; }
.badge { padding: 3px 9px; border-radius: 5px; font-size: 9px; font-weight: 700; font-family: monospace; letter-spacing: .5px; white-space: nowrap; flex-shrink: 0; }
.badge-creational { background: rgba(0,212,255,.1); color: #00d4ff; }
.badge-structural  { background: rgba(124,58,237,.1); color: #a78bfa; }
.badge-behavioral  { background: rgba(16,185,129,.1); color: #10b981; }
.card-desc { padding: 0 22px 18px; font-size: 13px; color: #94a3b8; line-height: 1.6; }
hr { border: none; border-top: 1px solid #1e2d4a; margin: 0; }
.code-section { padding: 18px 22px; }
.lang-tabs { display: flex; gap: 3px; margin-bottom: 12px; background: #0d1428; border-radius: 8px; padding: 3px; }
.lang-btn { flex: 1; padding: 5px 8px; border-radius: 6px; font-size: 10px; font-weight: 700; font-family: monospace; cursor: pointer; border: none; background: transparent; transition: all .2s; }
.lang-btn.active { background: #1a2540; }
.lj { color: #f89820; } .lc { color: #9b59b6; } .lp { color: #3776ab; } .lr { color: #cc342d; }
.code-box { background: #050810; border: 1px solid #1e2d4a; border-radius: 8px; overflow: hidden; }
.code-header { display: flex; align-items: center; justify-content: space-between; padding: 8px 14px; background: #0d1428; border-bottom: 1px solid #1e2d4a; }
.dots { display: flex; gap: 5px; }
.dots span { width: 9px; height: 9px; border-radius: 50%; }
.dots .r { background: #ff5f57; } .dots .y { background: #ffbd2e; } .dots .g { background: #28c840; }
.filename { font-family: monospace; font-size: 10px; color: #64748b; }
.copy-btn { background: transparent; border: none; color: #64748b; font-size: 10px; font-family: monospace; cursor: pointer; padding: 3px 7px; border-radius: 4px; transition: all .2s; }
.copy-btn:hover { color: #00d4ff; }
pre { padding: 14px; overflow-x: auto; font-size: 11.5px; line-height: 1.7; margin: 0; }
pre code { font-family: 'JetBrains Mono', monospace; color: #e2e8f0; }
/* Syntax */
:deep(.kw)  { color: #569cd6; }
:deep(.kw2) { color: #c586c0; }
:deep(.cl)  { color: #4ec9b0; }
:deep(.fn)  { color: #dcdcaa; }
:deep(.st)  { color: #ce9178; }
:deep(.cm)  { color: #6a9955; font-style: italic; }
:deep(.nm)  { color: #b5cea8; }
:deep(.dc)  { color: #9cdcfe; }
</style>
