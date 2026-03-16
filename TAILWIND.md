# Tailwind CSS — Product Template Angular

Este projeto usa **Tailwind CSS v3** como framework de estilização padrão.

## ✅ O que foi configurado

### 1. Instalação
```bash
npm install -D tailwindcss@3 postcss autoprefixer
```

### 2. Configuração (`tailwind.config.js`)
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ Class-based dark mode
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ... até 900
          600: '#2563eb', // cor principal
        },
      },
    },
  },
  plugins: [],
}
```

### 3. Estilos globais (`src/styles.css`)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Design tokens e estilos base... */
```

## 📚 Documentação

Toda a documentação sobre como usar Tailwind CSS neste projeto está em:

- **Regra completa**: `.ai/rules/14-tailwind.md`
- **Dark Theme**: `.ai/rules/16-darktheme.md` e `DARKTHEME.md`
- **Instruções do Copilot**: `.github/copilot-instructions.md`

## 🎯 Convenções obrigatórias

### ✅ SEMPRE
- Usar utility classes do Tailwind para estilização
- Aplicar responsividade com breakpoints (`sm:`, `md:`, `lg:`, etc.)
- Usar estados interativos (`hover:`, `focus:`, `disabled:`, etc.)
- Preservar acessibilidade (focus ring, outline, etc.)

### ✅ QUANDO NECESSÁRIO
- Usar `@apply` em arquivos `.css` de componentes reutilizáveis
- Exemplos: botões, cards, inputs, alerts

### ❌ NUNCA
- CSS inline (`style="..."`)
- CSS custom global em `styles.css` para layout de features
- Classes custom quando existe utility equivalente do Tailwind
- `!important` para sobrescrever Tailwind

## 🚀 Exemplos práticos

### Botão primário
```html
<button class="px-4 py-2 bg-primary-600 text-white rounded-md 
               hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600
               focus:ring-2 focus:ring-primary-500 
               disabled:opacity-50">
  Salvar
</button>
```

### Formulário
```html
<input
  type="email"
  class="block w-full px-3 py-2 
         border border-gray-300 dark:border-gray-600 
         bg-white dark:bg-slate-800
         text-gray-900 dark:text-gray-50
         rounded-md
         focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
/>
```

### Card
```html
<div class="bg-white dark:bg-slate-800 
            border border-gray-200 dark:border-gray-700
            rounded-lg shadow-md hover:shadow-lg 
            p-6 transition-shadow">
  <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-50">Título</h3>
  <p class="text-sm text-gray-600 dark:text-gray-400">Descrição...</p>
</div>
```

### Layout responsivo
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Cards -->
</div>
```

## 🎨 Palette de cores

| Cor | Class | Uso |
|-----|-------|-----|
| Primary 600 | `bg-primary-600` | Botões primários, links |
| Gray 50 | `bg-gray-50` | Background de tabelas |
| Gray 700 | `text-gray-700` | Texto secundário |
| Red 600 | `text-red-600` | Erros, alertas de perigo |
| Green 600 | `text-green-600` | Sucesso, confirmações |

## 📱 Breakpoints

| Nome | Min-width | Uso |
|------|-----------|-----|
| `sm` | 640px | Tablets pequenos |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Desktops grandes |

## 🔧 Ferramentas recomendadas

### VSCode Extension
**Tailwind CSS IntelliSense**
- Autocomplete de classes
- Preview de cores e espaçamentos
- Validação de classes

### Prettier Plugin
```bash
npm install -D prettier-plugin-tailwindcss
```

Ordena automaticamente as classes Tailwind segundo a convenção oficial.

## ✅ Checklist de validação

Antes de fazer commit, verifique:

- [ ] Nenhum `style="..."` nos templates
- [ ] Classes Tailwind usadas para layout, espaçamento, cores
- [ ] `@apply` usado apenas em componentes reutilizáveis
- [ ] Responsividade implementada com breakpoints
- [ ] Estados interativos implementados (hover, focus, disabled)
- [ ] Acessibilidade preservada (outline, focus ring)

## 📊 Performance

- **Purge automático**: Classes não usadas são removidas em produção
- **CSS final**: ~8-10 KB gzipped
- **Runtime**: Zero overhead, apenas classes CSS estáticas

## 🔗 Links úteis

- [Documentação oficial do Tailwind CSS](https://tailwindcss.com/docs)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Regra 14 - Tailwind](./.ai/rules/14-tailwind.md)

