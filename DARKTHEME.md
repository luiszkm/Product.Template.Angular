# Dark Theme — Modo Escuro

Sistema de dark theme implementado com Tailwind CSS class-based para o Product Template Angular.

---

## 📚 Visão Geral

- **Estratégia:** Class-based (classe `dark` no `<html>`)
- **Temas:** Light, Dark, System (auto-detect OS)
- **Persistência:** localStorage
- **Transições:** Suaves (200ms)
- **Contraste:** WCAG AA em ambos os temas

---

## 🚀 Uso Rápido

### No Template

```html
<!-- Background e texto -->
<div class="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-50">
  Conteúdo adaptável
</div>

<!-- Bordas -->
<div class="border border-gray-200 dark:border-gray-700">
  Card
</div>

<!-- Hover states -->
<button class="bg-primary-600 hover:bg-primary-700 
               dark:bg-primary-500 dark:hover:bg-primary-600">
  Ação
</button>

<!-- Sombras -->
<div class="shadow-md dark:shadow-lg dark:shadow-black/50">
  Card com sombra
</div>
```

### No Component

```typescript
import { Component, inject } from '@angular/core';
import { ThemeService } from '@/app/core/theme/theme.service';

@Component({
  selector: 'app-my-component',
  standalone: true,
  template: `
    <button (click)="theme.toggleTheme()">
      {{ theme.isDark() ? '☀️ Light' : '🌙 Dark' }}
    </button>
  `
})
export class MyComponent {
  readonly theme = inject(ThemeService);
}
```

### Mudar Tema

```typescript
// Component
theme.setTheme('dark');    // Forçar dark
theme.setTheme('light');   // Forçar light
theme.setTheme('system');  // Seguir sistema
theme.toggleTheme();       // Alternar light/dark
```

### Toggle Component

```html
<!-- Toggle já incluído no shell -->
<app-theme-toggle />
```

---

## 📂 Estrutura

```
src/
├── app/
│   └── core/
│       └── theme/
│           ├── theme.service.ts          # Service principal
│           ├── theme.service.spec.ts     # Testes
│           └── theme-toggle.component.ts # Componente toggle
└── styles/
    └── themes/
        └── tokens.css                    # CSS variables
```

---

## 🎨 Convenções de Cores

### Tokens Semânticos

| Token | Light | Dark | Uso |
|-------|-------|------|-----|
| `bg-background` | white | slate-900 | Fundo principal |
| `text-foreground` | slate-900 | slate-50 | Texto principal |
| `bg-muted` | slate-100 | slate-800 | Fundo secundário |
| `border-border` | slate-200 | slate-700 | Bordas |

### Escala de Cinzas

```html
<!-- Light mode -->
<div class="bg-gray-50 text-gray-900">...</div>

<!-- Dark mode (inverter escala) -->
<div class="dark:bg-gray-800 dark:text-gray-50">...</div>
```

---

## 🎨 Padrões de Componentes

### Card

```html
<div class="p-6 bg-white dark:bg-slate-800 
            border border-gray-200 dark:border-gray-700 
            rounded-lg shadow-md dark:shadow-lg">
  Conteúdo
</div>
```

### Botão Primário

```html
<button class="px-4 py-2 
               bg-primary-600 hover:bg-primary-700 
               dark:bg-primary-500 dark:hover:bg-primary-600
               text-white rounded-md">
  Ação
</button>
```

### Input

```html
<input 
  type="text"
  class="w-full px-3 py-2 
         bg-white dark:bg-slate-800 
         border border-gray-300 dark:border-gray-600 
         text-gray-900 dark:text-gray-50 
         rounded-md"
/>
```

---

## ⚙️ Configuração

### tailwind.config.js

```js
module.exports = {
  darkMode: 'class', // ✅ OBRIGATÓRIO
  // ...
};
```

### src/styles/themes/tokens.css

```css
:root {
  --color-background: 255 255 255;
  --color-foreground: 15 23 42;
  --color-muted: 241 245 249;
  --color-border: 226 232 240;
}

.dark {
  --color-background: 15 23 42;
  --color-foreground: 248 250 252;
  --color-muted: 30 41 59;
  --color-border: 51 65 85;
}
```

---

## 🧪 Testes

```bash
# Rodar testes do ThemeService
npm test -- --include="**/theme.service.spec.ts"
```

---

## ✅ Checklist

Ao criar/estilizar componentes:

- [ ] Classes `dark:` em backgrounds
- [ ] Classes `dark:` em textos
- [ ] Classes `dark:` em bordas
- [ ] Classes `dark:` em hover/focus states
- [ ] Sombras ajustadas para dark mode
- [ ] Contraste WCAG AA verificado
- [ ] Testado em ambos os temas (light e dark)
- [ ] ThemeToggle visível no layout

---

## 🚫 Antipadrões

❌ **NUNCA usar media queries manualmente:**

```css
/* ❌ PROIBIDO */
@media (prefers-color-scheme: dark) {
  body { background: black; }
}
```

❌ **NUNCA hardcodar cores:**

```html
<!-- ❌ PROIBIDO -->
<div style="background: #1a1a1a;">...</div>
```

❌ **NUNCA esquecer estados dark em hover/focus:**

```html
<!-- ❌ INCOMPLETO -->
<button class="bg-blue-600 hover:bg-blue-700">...</button>

<!-- ✅ COMPLETO -->
<button class="bg-blue-600 hover:bg-blue-700 
               dark:bg-blue-500 dark:hover:bg-blue-600">...</button>
```

---

## 🔗 Documentação Completa

- **Regra AI:** `.ai/rules/16-darktheme.md`
- **Exemplos:** Este arquivo
- **Testes:** `src/app/core/theme/theme.service.spec.ts`

---

**Dúvidas?** Consulte `.ai/rules/16-darktheme.md`

