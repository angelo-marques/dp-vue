<template>
  <main class="home" style="padding-top:64px">

    <!-- HERO -->
    <section class="hero">
      <div class="orb orb1"></div>
      <div class="orb orb2"></div>
      <div class="container hero-inner">
        <div class="hero-text">
          <div class="badge">
            <span class="dot"></span>
            {{ lang==='pt' ? 'Referência GoF Completa' : 'Complete GoF Reference' }}
          </div>
          <h1>
            {{ lang==='pt' ? 'Todos os 23 padrões' : 'All 23 design patterns' }}<br>
            <span class="grad">Design Patterns</span><br>
            {{ lang==='pt' ? 'em 4 linguagens' : 'in 4 languages' }}
          </h1>
          <p class="hero-sub">
            {{ lang==='pt'
              ? 'Java · C# · Python · Ruby com exemplos reais, syntax highlighting e explicações bilíngues.'
              : 'Java · C# · Python · Ruby with real examples, syntax highlighting and bilingual explanations.' }}
          </p>
          <div class="hero-cta">
            <a href="#patterns" class="btn-primary">
              {{ lang==='pt' ? 'Ver Padrões' : 'View Patterns' }}
            </a>
            <a href="#about" class="btn-ghost">
              {{ lang==='pt' ? 'Sobre o Autor' : 'About the Author' }}
            </a>
          </div>
        </div>

        <div class="hero-card">
          <div class="profile-card">
            <div class="profile-avatar">AS</div>
            <div>
              <div class="profile-name">Angelo Marques de Oliveira Silva</div>
              <div class="profile-role">Tech Lead · FullStack · .NET 8/9/10 · AI Dev</div>
            </div>
            <div class="tag-grid">
              <span class="tag t1">C# · .NET Core</span>
              <span class="tag t2">Design Patterns</span>
              <span class="tag t3">DDD · TDD · CQRS</span>
              <span class="tag t4">AI · Ollama · LLM</span>
              <span class="tag t1">Azure · AWS · Docker</span>
              <span class="tag t2">Clean Architecture</span>
              <span class="tag t3">Java · Python · Ruby</span>
              <span class="tag t4">Scrum · Kanban · XP</span>
            </div>
            <div class="stats-row">
              <div class="stat"><span class="stat-num">23</span><span class="stat-lbl">Padrões</span></div>
              <div class="stat"><span class="stat-num">4</span><span class="stat-lbl">Linguagens</span></div>
              <div class="stat"><span class="stat-num">15+</span><span class="stat-lbl">Anos</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PATTERNS GRID -->
    <section id="patterns" class="patterns-section">
      <div class="container">
        <div class="section-header">
          <h2>{{ lang==='pt' ? 'Todos os Padrões GoF' : 'All GoF Patterns' }}</h2>
          <p>{{ lang==='pt' ? '23 padrões organizados por categoria' : '23 patterns organized by category' }}</p>
        </div>

        <div class="filter-tabs">
          <button
            v-for="f in filters" :key="f.val"
            :class="['filter-btn', { active: activeFilter===f.val }]"
            @click="activeFilter=f.val"
          >{{ lang==='pt' ? f.labelPt : f.labelEn }}</button>
        </div>

        <TransitionGroup name="grid" tag="div" class="patterns-grid">
          <RouterLink
            v-for="p in filtered"
            :key="p.id"
            :to="'/pattern/'+p.id"
            class="pattern-card"
            :class="'border-'+p.cat"
          >
            <div class="pc-top">
              <span :class="['cat-badge', 'cb-'+p.cat]">
                {{ lang==='pt' ? p.catLabelPt : p.catLabelEn }}
              </span>
              <span class="pc-num">#{{ p.id.slice(1).padStart(2,'0') }}</span>
            </div>
            <h3 class="pc-name">{{ p.name }}</h3>
            <p class="pc-sub">{{ lang==='pt' ? p.subtitlePt : p.subtitleEn }}</p>
            <p class="pc-desc">{{ lang==='pt' ? p.descPt : p.descEn }}</p>
            <div class="pc-footer">
              <div class="lang-dots">
                <span class="ld java">Java</span>
                <span class="ld cs">C#</span>
                <span class="ld py">Python</span>
                <span class="ld rb">Ruby</span>
              </div>
              <span class="pc-arrow">→</span>
            </div>
          </RouterLink>
        </TransitionGroup>
      </div>
    </section>

    <!-- ABOUT -->
    <section id="about" class="about-section">
      <div class="container about-inner">
        <div class="about-sticky">
          <div class="about-card">
            <div class="about-avatar">AS</div>
            <h3>Angelo Marques<br>de Oliveira Silva</h3>
            <p class="about-location">📍 Serra, ES — Brasil</p>
            <a href="https://www.linkedin.com/in/angelomarquesdeoliveirasilva" target="_blank" class="btn-linkedin">
              LinkedIn
            </a>
          </div>
        </div>

        <div class="about-content">
          <h2>{{ lang==='pt' ? 'Sobre o Projeto' : 'About the Project' }}</h2>
          <p>
            {{ lang==='pt'
              ? 'Este repositório reúne todos os 23 padrões de projeto GoF implementados em Java, C#, Python e Ruby. Cada padrão inclui contexto, intenção, diagrama conceitual e código funcional com syntax highlighting.'
              : 'This repository gathers all 23 GoF design patterns implemented in Java, C#, Python and Ruby. Each pattern includes context, intent, conceptual diagram and functional code with syntax highlighting.' }}
          </p>

          <div class="skill-list">
            <div v-for="s in skills" :key="s.label" class="skill-item">
              <div class="skill-label">
                <span>{{ s.label }}</span>
                <span class="skill-pct">{{ s.pct }}%</span>
              </div>
              <div class="skill-bar"><div class="skill-fill" :style="{width:s.pct+'%', background:s.color}"></div></div>
            </div>
          </div>

          <div class="timeline">
            <div v-for="e in timeline" :key="e.year" class="tl-item">
              <div class="tl-dot" :style="{background:e.color}"></div>
              <div>
                <div class="tl-year">{{ e.year }}</div>
                <div class="tl-text">{{ lang==='pt' ? e.textPt : e.textEn }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import { PATTERNS } from '@/data/patterns.js'

const lang = inject('lang')

const filters = [
  { val:'all',        labelPt:'Todos (23)',    labelEn:'All (23)' },
  { val:'creational', labelPt:'Criacionais',   labelEn:'Creational' },
  { val:'structural', labelPt:'Estruturais',   labelEn:'Structural' },
  { val:'behavioral', labelPt:'Comportamentais',labelEn:'Behavioral' },
]
const activeFilter = ref('all')
const filtered = computed(() =>
  activeFilter.value === 'all' ? PATTERNS : PATTERNS.filter(p => p.cat === activeFilter.value)
)

const skills = [
  { label: 'C# / .NET',          pct: 95, color: '#7c3aed' },
  { label: 'Java',                pct: 85, color: '#f59e0b' },
  { label: 'Python',              pct: 80, color: '#3b82f6' },
  { label: 'Ruby',                pct: 70, color: '#ef4444' },
  { label: 'AI / LLM / Ollama',   pct: 88, color: '#00d4ff' },
  { label: 'Azure / AWS / Docker', pct: 82, color: '#10b981' },
]

const timeline = [
  { year:'2010', color:'#00d4ff', textPt:'Início da carreira em desenvolvimento .NET', textEn:'Started career in .NET development' },
  { year:'2015', color:'#7c3aed', textPt:'Tech Lead & Arquitetura de Sistemas',       textEn:'Tech Lead & Systems Architecture' },
  { year:'2020', color:'#10b981', textPt:'Especialização em DDD, CQRS e Clean Arch',  textEn:'Specialization in DDD, CQRS and Clean Arch' },
  { year:'2024', color:'#f59e0b', textPt:'AI Dev — Autonomous Agents com .NET + LLM', textEn:'AI Dev — Autonomous Agents with .NET + LLM' },
]
</script>

<style scoped>
/* ── HERO ── */
.hero {
  position: relative; overflow: hidden; min-height: 90vh;
  display: flex; align-items: center;
}
.orb {
  position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none;
}
.orb1 { width:600px;height:600px; top:-200px;left:-200px; background:rgba(124,58,237,.15); }
.orb2 { width:500px;height:500px; bottom:-100px;right:-100px; background:rgba(0,212,255,.1); }

.hero-inner {
  display: grid; grid-template-columns: 1fr 1fr; gap: 4rem;
  align-items: center; padding: 4rem 1.5rem;
}
.badge {
  display: inline-flex; align-items: center; gap: .5rem;
  border: 1px solid rgba(0,212,255,.3); border-radius: 99px;
  padding: .35rem .9rem; font-size: .8rem; color: var(--ac);
  font-family: 'Space Mono', monospace; margin-bottom: 1.5rem;
}
.dot { width:8px;height:8px;border-radius:50%;background:var(--ac);animation:pulse 2s infinite; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }

h1 { font-size: clamp(2rem,4vw,3.5rem); line-height: 1.15; font-weight: 800; margin-bottom: 1.25rem; }
.grad {
  background: linear-gradient(90deg, var(--ac), var(--ac2));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.hero-sub { color: var(--tx2); font-size: 1.1rem; line-height: 1.7; margin-bottom: 2rem; }
.hero-cta { display: flex; gap: 1rem; flex-wrap: wrap; }
.btn-primary {
  background: var(--ac); color: #000; font-weight: 700; border-radius: 10px;
  padding: .75rem 1.75rem; font-size: .95rem; transition: all .2s;
}
.btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,212,255,.35); }
.btn-ghost {
  border: 1px solid var(--br); color: var(--tx); border-radius: 10px;
  padding: .75rem 1.75rem; font-size: .95rem; transition: all .2s;
}
.btn-ghost:hover { border-color:var(--ac); color:var(--ac); }

/* Profile card */
.profile-card {
  background: rgba(13,17,23,.8);
  border: 1px solid var(--br);
  border-radius: var(--r);
  padding: 2rem;
  backdrop-filter: blur(10px);
}
.profile-avatar {
  width: 72px; height: 72px; border-radius: 16px;
  background: linear-gradient(135deg, var(--ac2), var(--ac));
  display: flex; align-items: center; justify-content: center;
  font-size: 1.4rem; font-weight: 800; font-family: 'Space Mono', monospace;
  margin-bottom: 1rem;
}
.profile-name { font-size: 1.25rem; font-weight: 700; margin-bottom: .25rem; }
.profile-role { color: var(--ac); font-size: .85rem; font-family: 'Space Mono', monospace; margin-bottom: 1.25rem; }
.tag-grid { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 1.5rem; }
.tag {
  font-size: .78rem; border-radius: 99px; padding: .3rem .8rem;
  font-family: 'Space Mono', monospace;
}
.t1 { background:rgba(0,212,255,.1);  color:var(--ac);  border:1px solid rgba(0,212,255,.2); }
.t2 { background:rgba(124,58,237,.1); color:var(--ac2); border:1px solid rgba(124,58,237,.2); }
.t3 { background:rgba(16,185,129,.1); color:var(--ac3); border:1px solid rgba(16,185,129,.2); }
.t4 { background:rgba(245,158,11,.1); color:var(--ac4); border:1px solid rgba(245,158,11,.2); }
.stats-row { display: flex; gap: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--br); }
.stat { display: flex; flex-direction: column; align-items: center; gap: .2rem; }
.stat-num { font-size: 1.5rem; font-weight: 800; color: var(--ac); font-family: 'Space Mono', monospace; }
.stat-lbl { font-size: .75rem; color: var(--tx2); }

/* ── PATTERNS GRID ── */
.patterns-section { padding: 5rem 0; }
.section-header { text-align: center; margin-bottom: 3rem; }
.section-header h2 { font-size: 2.5rem; font-weight: 800; margin-bottom: .5rem; }
.section-header p { color: var(--tx2); }
.filter-tabs { display: flex; justify-content: center; gap: .75rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
.filter-btn {
  background: var(--bg3); border: 1px solid var(--br); border-radius: 99px;
  color: var(--tx2); cursor: pointer; padding: .45rem 1.25rem; font-size: .88rem;
  transition: all .2s;
}
.filter-btn:hover, .filter-btn.active {
  background: var(--ac); color: #000; border-color: var(--ac); font-weight: 600;
}

.patterns-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}
.pattern-card {
  display: flex; flex-direction: column;
  background: var(--bg2); border: 1px solid var(--br);
  border-radius: var(--r); padding: 1.5rem;
  transition: all .25s; cursor: pointer;
}
.pattern-card:hover { transform:translateY(-4px); box-shadow:0 12px 32px rgba(0,0,0,.4); }
.border-creational:hover { border-color: rgba(0,212,255,.4); }
.border-structural:hover  { border-color: rgba(124,58,237,.4); }
.border-behavioral:hover  { border-color: rgba(16,185,129,.4); }

.pc-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; }
.cat-badge { font-size:.72rem; border-radius:99px; padding:.25rem .7rem; font-family:'Space Mono',monospace; }
.cb-creational { background:rgba(0,212,255,.1);  color:var(--ac);  border:1px solid rgba(0,212,255,.2); }
.cb-structural  { background:rgba(124,58,237,.1); color:var(--ac2); border:1px solid rgba(124,58,237,.2); }
.cb-behavioral  { background:rgba(16,185,129,.1); color:var(--ac3); border:1px solid rgba(16,185,129,.2); }
.pc-num { font-size:.75rem; color:var(--tx3); font-family:'Space Mono',monospace; }
.pc-name { font-size:1.2rem; font-weight:700; margin-bottom:.35rem; }
.pc-sub { font-size:.82rem; color:var(--ac2); font-family:'Space Mono',monospace; margin-bottom:.75rem; }
.pc-desc {
  font-size:.88rem; color:var(--tx2); line-height:1.6;
  flex:1; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;
}
.pc-footer { display:flex; align-items:center; justify-content:space-between; margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--br); }
.lang-dots { display:flex; gap:.4rem; }
.ld {
  font-size:.68rem; border-radius:4px; padding:.15rem .45rem;
  font-family:'Space Mono',monospace;
}
.java { background:rgba(245,158,11,.15); color:var(--ac4); }
.cs   { background:rgba(124,58,237,.15); color:var(--ac2); }
.py   { background:rgba(59,130,246,.15); color:#60a5fa; }
.rb   { background:rgba(239,68,68,.15);  color:#f87171; }
.pc-arrow { color:var(--tx3); font-size:1.1rem; transition:transform .2s; }
.pattern-card:hover .pc-arrow { transform:translateX(4px); color:var(--ac); }

/* Grid transition */
.grid-move { transition: transform .4s; }
.grid-enter-active, .grid-leave-active { transition: all .3s; }
.grid-enter-from { opacity:0; transform:scale(.95); }
.grid-leave-to { opacity:0; transform:scale(.95); position:absolute; }

/* ── ABOUT ── */
.about-section { padding: 5rem 0; }
.about-inner { display: grid; grid-template-columns: 280px 1fr; gap: 4rem; align-items: start; }
.about-sticky { position: sticky; top: 80px; }
.about-card {
  background: var(--bg2); border: 1px solid var(--br); border-radius: var(--r);
  padding: 2rem; text-align: center;
}
.about-avatar {
  width: 80px; height: 80px; border-radius: 18px; margin: 0 auto 1rem;
  background: linear-gradient(135deg, var(--ac2), var(--ac));
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; font-weight: 800; font-family: 'Space Mono', monospace;
}
.about-card h3 { font-size: 1.15rem; font-weight: 700; margin-bottom: .5rem; }
.about-location { color: var(--tx2); font-size: .85rem; margin-bottom: 1.25rem; }
.btn-linkedin {
  display: block; background: #0077b5; color: #fff; font-weight: 600;
  border-radius: 8px; padding: .65rem 1rem; font-size: .9rem; transition: all .2s;
}
.btn-linkedin:hover { background: #005f99; }

.about-content h2 { font-size: 2rem; font-weight: 800; margin-bottom: 1rem; }
.about-content p { color: var(--tx2); line-height: 1.8; margin-bottom: 2rem; }

.skill-list { display: flex; flex-direction: column; gap: .9rem; margin-bottom: 2.5rem; }
.skill-item {}
.skill-label { display: flex; justify-content: space-between; font-size: .9rem; margin-bottom: .4rem; }
.skill-pct { color: var(--tx3); font-family: 'Space Mono', monospace; }
.skill-bar { height: 6px; background: var(--bg3); border-radius: 99px; overflow: hidden; }
.skill-fill { height: 100%; border-radius: 99px; transition: width .8s ease; }

.timeline { display: flex; flex-direction: column; gap: 1.25rem; }
.tl-item { display: flex; gap: 1rem; align-items: flex-start; }
.tl-dot { width: 12px; height: 12px; border-radius: 50%; margin-top: .35rem; flex-shrink: 0; }
.tl-year { font-size: .8rem; color: var(--tx3); font-family: 'Space Mono', monospace; margin-bottom: .2rem; }
.tl-text { font-size: .9rem; }

@media (max-width: 900px) {
  .hero-inner { grid-template-columns: 1fr; }
  .hero-card { display: none; }
  .about-inner { grid-template-columns: 1fr; }
  .about-sticky { position: static; }
}
</style>
