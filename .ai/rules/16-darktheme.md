# Regra 16 — Dark Theme

## Objetivo
Implementar suporte a **dark theme** com alternância dinâmica, persistência de preferência e detecção automática do tema do sistema operacional.

---

## Stack Dark Theme

| Ferramenta | Função |
|------------|--------|
| Tailwind CSS Dark Mode | API oficial `dark:` para classes condicionais |
| CSS Variables | Tokens de design system (cores, sombras) |
| ThemeService | Service para gerenciar tema ativo |
| localStorage | Persistir preferência do usuário |
| matchMedia | Detectar preferência do OS |

---

## Estratégia Obrigatória

### 1. Abordagem: Class-based Dark Mode

Usar a estratégia **class** do Tailwind CSS (não `media`):

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class', // ✅ OBRIGATÓRIO
  // ...
}
```

- Classe `dark` no `<html>` ativa o modo escuro
- Controle programático via JavaScript
- Compatível com persistência localStorage

---

## Estrutura de Arquivos

```
src/
├── app/
│   └── core/
│       └── theme/
│           ├── theme.service.ts           # Service de gerenciamento
│           ├── theme.service.spec.ts      # Testes
│           └── theme-toggle.component.ts  # Componente de toggle
└── styles/
    └── themes/
        ├── tokens.css                     # CSS variables (cores, sombras)
        └── dark.css                       # Overrides dark mode
```

---

## Configuração

### tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ Class-based
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // Design tokens
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb', // padrão
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        // Background e foreground
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
        border: 'var(--color-border)'
      }
    }
  }
};
```

### src/styles/themes/tokens.css

```css
:root {
  /* Light theme (default) */
  --color-background: 255 255 255;        /* white */
  --color-foreground: 15 23 42;           /* slate-900 */
  --color-muted: 241 245 249;             /* slate-100 */
  --color-border: 226 232 240;            /* slate-200 */
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

.dark {
  /* Dark theme */
  --color-background: 15 23 42;           /* slate-900 */
  --color-foreground: 248 250 252;        /* slate-50 */
  --color-muted: 30 41 59;                /* slate-800 */
  --color-border: 51 65 85;               /* slate-700 */
  
  /* Shadows ajustadas para dark */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5);
}
```

### src/styles.css

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Importar tokens */
@import './styles/themes/tokens.css';

/* Base styles */
body {
  @apply bg-background text-foreground transition-colors duration-200;
}
```

---

## ThemeService

### core/theme/theme.service.ts

```typescript
import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'theme-preference';
  
  private readonly _theme = signal<Theme>(this.getStoredTheme());
  private readonly _isDark = signal(false);

  readonly theme = this._theme.asReadonly();
  readonly isDark = this._isDark.asReadonly();

  constructor() {
    // Aplicar tema inicial
    this.applyTheme(this._theme());

    // Observar mudanças no tema do sistema
    this.watchSystemTheme();

    // Effect para aplicar tema quando mudar
    effect(() => {
      this.applyTheme(this._theme());
    });
  }

  /**
   * Define o tema (light, dark ou system).
   */
  setTheme(theme: Theme): void {
    this._theme.set(theme);
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  /**
   * Toggle entre light e dark (ignora system).
   */
  toggleTheme(): void {
    const newTheme = this._isDark() ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  /**
   * Aplica o tema no documento.
   */
  private applyTheme(theme: Theme): void {
    const isDark = this.shouldUseDarkMode(theme);
    this._isDark.set(isDark);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  /**
   * Verifica se deve usar dark mode baseado no tema.
   */
  private shouldUseDarkMode(theme: Theme): boolean {
    if (theme === 'dark') return true;
    if (theme === 'light') return false;
    
    // system: detectar preferência do OS
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * Observa mudanças na preferência do sistema.
   */
  private watchSystemTheme(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      if (this._theme() === 'system') {
        this._isDark.set(e.matches);
        this.applyTheme('system');
      }
    });
  }

  /**
   * Recupera tema armazenado ou usa padrão.
   */
  private getStoredTheme(): Theme {
    const stored = localStorage.getItem(this.STORAGE_KEY) as Theme;
    return stored && ['light', 'dark', 'system'].includes(stored)
      ? stored
      : 'system'; // padrão: seguir sistema
  }
}
```

---

## Theme Toggle Component

### core/theme/theme-toggle.component.ts

```typescript
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      (click)="theme.toggleTheme()"
      class="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 
             transition-colors focus:outline-none focus:ring-2 
             focus:ring-primary-500 focus:ring-offset-2"
      [attr.aria-label]="theme.isDark() ? 'Ativar modo claro' : 'Ativar modo escuro'">
      @if (theme.isDark()) {
        <!-- Ícone Sol (Light Mode) -->
        <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" 
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" 
                clip-rule="evenodd"/>
        </svg>
      } @else {
        <!-- Ícone Lua (Dark Mode) -->
        <svg class="w-5 h-5 text-gray-700 dark:text-gray-200" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
        </svg>
      }
    </button>
  `
})
export class ThemeToggleComponent {
  readonly theme = inject(ThemeService);
}
```

---

## Padrões de Uso

### ✅ SEMPRE usar classes dark: do Tailwind

```html
<!-- Background e texto -->
<div class="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-50">
  Conteúdo
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

### ✅ Usar CSS variables para tokens complexos

```html
<!-- Background usando token -->
<div class="bg-background text-foreground">
  Fundo adaptável
</div>

<!-- Border usando token -->
<div class="border border-border">
  Borda adaptável
</div>
```

### ✅ Adicionar toggle no layout

```typescript
// shell-layout.component.ts
import { ThemeToggleComponent } from '../../core/theme/theme-toggle.component';

@Component({
  // ...
  imports: [..., ThemeToggleComponent],
  template: `
    <header class="shell__header">
      <h1>App</h1>
      <div class="shell__actions">
        <app-theme-toggle />
        <app-language-selector />
      </div>
    </header>
  `
})
export class ShellLayoutComponent {}
```

---

## Convenções de Cores

### Paleta Semântica

| Token | Light | Dark | Uso |
|-------|-------|------|-----|
| `background` | white | slate-900 | Fundo principal |
| `foreground` | slate-900 | slate-50 | Texto principal |
| `muted` | slate-100 | slate-800 | Backgrounds secundários |
| `border` | slate-200 | slate-700 | Bordas |
| `primary-*` | blue-* | blue-* | Ações primárias |
| `destructive` | red-600 | red-500 | Ações destrutivas |
| `success` | green-600 | green-500 | Sucesso |
| `warning` | yellow-600 | yellow-500 | Avisos |

### Escala de Cinzas

```css
/* Light theme: usar gray-100 a gray-900 */
.card-light {
  @apply bg-gray-50 border border-gray-200;
}

/* Dark theme: inverter escala */
.card-dark {
  @apply dark:bg-gray-800 dark:border-gray-700;
}
```

---

## Componentes Reutilizáveis

### Card Adaptável

```html
<div class="p-6 bg-white dark:bg-slate-800 
            border border-gray-200 dark:border-gray-700 
            rounded-lg shadow-md dark:shadow-lg">
  <h2 class="text-xl font-bold text-gray-900 dark:text-gray-50">
    Título
  </h2>
  <p class="text-gray-600 dark:text-gray-400">
    Descrição
  </p>
</div>
```

### Botão Adaptável

```html
<button class="px-4 py-2 
               bg-primary-600 hover:bg-primary-700 
               dark:bg-primary-500 dark:hover:bg-primary-600
               text-white rounded-md 
               focus:outline-none focus:ring-2 focus:ring-primary-500">
  Ação
</button>
```

### Input Adaptável

```html
<input 
  type="text"
  class="w-full px-3 py-2 
         bg-white dark:bg-slate-800 
         border border-gray-300 dark:border-gray-600 
         text-gray-900 dark:text-gray-50 
         placeholder-gray-500 dark:placeholder-gray-400
         rounded-md 
         focus:outline-none focus:ring-2 focus:ring-primary-500"
  placeholder="Digite aqui..."
/>
```

---

## Antipadrões Proibidos

### ❌ NUNCA usar media queries manualmente

```css
/* ❌ PROIBIDO */
@media (prefers-color-scheme: dark) {
  body {
    background: black;
  }
}

/* ✅ CORRETO - usar classe .dark */
.dark body {
  background: theme('colors.slate.900');
}
```

### ❌ NUNCA hardcodar cores

```html
<!-- ❌ PROIBIDO -->
<div style="background: #1a1a1a; color: #fff;">
  Texto
</div>

<!-- ✅ CORRETO -->
<div class="bg-slate-900 text-white dark:bg-slate-800">
  Texto
</div>
```

### ❌ NUNCA esquecer estados dark em hover/focus

```html
<!-- ❌ INCOMPLETO -->
<button class="bg-blue-600 hover:bg-blue-700">
  Ação
</button>

<!-- ✅ COMPLETO -->
<button class="bg-blue-600 hover:bg-blue-700 
               dark:bg-blue-500 dark:hover:bg-blue-600">
  Ação
</button>
```

---

## Inicialização no App

### app.config.ts (Opcional - ThemeService é providedIn: 'root')

```typescript
import { APP_INITIALIZER } from '@angular/core';
import { ThemeService } from './core/theme/theme.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...outros providers
    {
      provide: APP_INITIALIZER,
      useFactory: (theme: ThemeService) => () => {
        // ThemeService já aplica tema no constructor
        // Este initializer é opcional, apenas para garantir
      },
      deps: [ThemeService],
      multi: true
    }
  ]
};
```

---

## Testes

### theme.service.spec.ts

```typescript
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('deve usar tema padrão "system"', () => {
    expect(service.theme()).toBe('system');
  });

  it('deve mudar para dark theme', () => {
    service.setTheme('dark');
    
    expect(service.theme()).toBe('dark');
    expect(service.isDark()).toBe(true);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('deve mudar para light theme', () => {
    service.setTheme('light');
    
    expect(service.theme()).toBe('light');
    expect(service.isDark()).toBe(false);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('deve fazer toggle entre light e dark', () => {
    service.setTheme('light');
    service.toggleTheme();
    
    expect(service.theme()).toBe('dark');
    expect(service.isDark()).toBe(true);
  });

  it('deve persistir tema no localStorage', () => {
    service.setTheme('dark');
    
    expect(localStorage.getItem('theme-preference')).toBe('dark');
  });

  it('deve restaurar tema do localStorage', () => {
    localStorage.setItem('theme-preference', 'dark');
    
    const newService = TestBed.inject(ThemeService);
    
    expect(newService.theme()).toBe('dark');
  });
});
```

---

## Acessibilidade

### Preferências do Usuário

- ✅ Respeitar `prefers-color-scheme` do OS (modo `system`)
- ✅ Permitir override manual (light/dark)
- ✅ Persistir preferência
- ✅ Aplicar tema sem flash (FOUC)

### Contraste

```css
/* Garantir contraste mínimo WCAG AA */
.text-primary {
  @apply text-gray-900 dark:text-gray-50; /* contraste >= 7:1 */
}

.text-secondary {
  @apply text-gray-600 dark:text-gray-400; /* contraste >= 4.5:1 */
}
```

### ARIA

```html
<button 
  (click)="theme.toggleTheme()"
  [attr.aria-label]="theme.isDark() ? 'Ativar modo claro' : 'Ativar modo escuro'"
  [attr.aria-pressed]="theme.isDark()">
  Toggle Theme
</button>
```

---

## Performance

### Evitar Flash of Unstyled Content (FOUC)

```html
<!-- index.html - Script inline ANTES do Angular -->
<script>
  (function() {
    const theme = localStorage.getItem('theme-preference') || 'system';
    const isDark = theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

### Transições Suaves

```css
/* styles.css */
* {
  @apply transition-colors duration-200; /* suaviza mudanças */
}

/* Desabilitar transições durante carregamento */
.no-transitions * {
  transition: none !important;
}
```

---

## Checklist Dark Theme

Antes de considerar uma feature completa, validar:

- [ ] Todos os componentes testados em light e dark
- [ ] Classes `dark:` aplicadas em backgrounds
- [ ] Classes `dark:` aplicadas em textos
- [ ] Classes `dark:` aplicadas em bordas
- [ ] Classes `dark:` aplicadas em hover/focus states
- [ ] Sombras ajustadas para dark mode
- [ ] Contraste WCAG AA em ambos os temas
- [ ] ThemeToggle visível no layout
- [ ] Tema persiste no localStorage
- [ ] Sem flash ao carregar (FOUC prevention)
- [ ] Preferência do sistema respeitada (system mode)
- [ ] Testes do ThemeService passando

---

## Exemplo Completo

Ver implementação real em:
- `src/app/core/theme/theme.service.ts`
- `src/app/core/theme/theme-toggle.component.ts`
- `src/styles/themes/tokens.css`
- `tailwind.config.js`

---

## Recursos

- **Tailwind Dark Mode**: https://tailwindcss.com/docs/dark-mode
- **prefers-color-scheme**: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
- **WCAG Contrast**: https://webaim.org/resources/contrastchecker/
- **CSS Variables**: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties

