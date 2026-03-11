# Design Patterns — Angelo Marques de Oliveira Silva

> 23 padrões GoF em Java, C#, Python e Ruby · Referência bilíngue PT/EN

## Stack

- **Vue 3** (Composition API + `<script setup>`)
- **Vite 5** — build rápido
- **Vue Router 4** — SPA com rotas `/` e `/pattern/:id`
- Sem UI framework externo — CSS puro com design system próprio

## Requisitos

- Node.js 18+
- npm 9+

## Instalação e execução

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento (http://localhost:5173)
npm run dev

# Build de produção (gera pasta dist/)
npm run build

# Preview do build de produção
npm run preview
```

## Deploy

### Netlify (drag & drop)
```bash
npm run build
# Arraste a pasta dist/ para app.netlify.com/drop
```

### GitHub Pages (via Actions)
```bash
# O workflow .github/workflows/deploy-pages.yml já faz build + deploy automático
# ao dar push na branch main/master.
```

### Vercel
```bash
# Projeto pronto para SPA (vercel.json com rewrite para index.html)
vercel --prod
```

## Estrutura do projeto

```
dp-vue/
├── index.html              ← Entry point HTML
├── vite.config.js          ← Configuração Vite
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.js             ← Bootstrap Vue + Router
    ├── App.vue             ← Layout raiz (Nav + RouterView + Footer)
    ├── assets/
    │   └── main.css        ← Design system global
    ├── data/
    │   ├── patterns.js     ← Metadata dos 23 padrões
    │   └── patternCodes.js ← Código dos 23 padrões (4 linguagens cada)
    ├── views/
    │   ├── HomeView.vue    ← Hero + Grid + About
    │   └── PatternView.vue ← Detalhe de um padrão com code tabs
    └── components/
        ├── PatternCard.vue ← Componente reutilizável de card
        └── patterns/
            ├── Singleton.vue
            ├── FactoryMethod.vue
            └── ... (23 componentes)
```

## Autor

**Angelo Marques de Oliveira Silva**  
Tech Lead · FullStack · .NET 8/9/10 · AI Dev  
Serra, ES — Brasil  
[LinkedIn](https://www.linkedin.com/in/angelomarquesdeoliveirasilva) · [GitHub](https://github.com/angelo-marques)
