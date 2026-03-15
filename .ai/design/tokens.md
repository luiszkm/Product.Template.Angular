# Design Tokens

Valores centralizados para cores, espaçamentos, tipografia, sombras, bordas e estados.

---

## 🎨 Cores

### Cores Primárias
```css
--color-primary-50: #eff6ff;
--color-primary-100: #dbeafe;
--color-primary-200: #bfdbfe;
--color-primary-300: #93c5fd;
--color-primary-400: #60a5fa;
--color-primary-500: #3b82f6;  /* Base */
--color-primary-600: #2563eb;
--color-primary-700: #1d4ed8;
--color-primary-800: #1e40af;
--color-primary-900: #1e3a8a;
```

### Cores Neutras (Grays)
```css
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;
```

### Cores Semânticas
```css
/* Success */
--color-success-50: #f0fdf4;
--color-success-500: #22c55e;
--color-success-700: #15803d;

/* Warning */
--color-warning-50: #fffbeb;
--color-warning-500: #f59e0b;
--color-warning-700: #b45309;

/* Error */
--color-error-50: #fef2f2;
--color-error-500: #ef4444;
--color-error-700: #b91c1c;

/* Info */
--color-info-50: #f0f9ff;
--color-info-500: #0ea5e9;
--color-info-700: #0369a1;
```

### Cores de Superfície
```css
--color-background: #ffffff;
--color-surface: #f9fafb;
--color-surface-hover: #f3f4f6;
--color-border: #e5e7eb;
--color-divider: #d1d5db;
```

### Cores de Texto
```css
--color-text-primary: #111827;
--color-text-secondary: #6b7280;
--color-text-disabled: #9ca3af;
--color-text-inverse: #ffffff;
--color-text-link: #2563eb;
--color-text-link-hover: #1d4ed8;
```

---

## 📏 Espaçamentos

Sistema baseado em múltiplos de 4px:

```css
--spacing-0: 0;
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-5: 1.25rem;  /* 20px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-10: 2.5rem;  /* 40px */
--spacing-12: 3rem;    /* 48px */
--spacing-16: 4rem;    /* 64px */
--spacing-20: 5rem;    /* 80px */
--spacing-24: 6rem;    /* 96px */
```

### Uso Comum
```css
/* Padding de componentes */
--spacing-component-sm: var(--spacing-2);   /* 8px */
--spacing-component-md: var(--spacing-4);   /* 16px */
--spacing-component-lg: var(--spacing-6);   /* 24px */

/* Gap entre elementos */
--spacing-gap-xs: var(--spacing-1);   /* 4px */
--spacing-gap-sm: var(--spacing-2);   /* 8px */
--spacing-gap-md: var(--spacing-4);   /* 16px */
--spacing-gap-lg: var(--spacing-6);   /* 24px */

/* Margens de seção */
--spacing-section-sm: var(--spacing-8);   /* 32px */
--spacing-section-md: var(--spacing-12);  /* 48px */
--spacing-section-lg: var(--spacing-16);  /* 64px */
```

---

## 🔤 Tipografia

### Famílias
```css
--font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
--font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Courier New', monospace;
```

### Tamanhos
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
--font-size-4xl: 2.25rem;   /* 36px */
```

### Pesos
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Alturas de Linha
```css
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

### Estilos de Texto
```css
/* Headings */
--heading-1-size: var(--font-size-4xl);
--heading-1-weight: var(--font-weight-bold);
--heading-1-line-height: var(--line-height-tight);

--heading-2-size: var(--font-size-3xl);
--heading-2-weight: var(--font-weight-bold);
--heading-2-line-height: var(--line-height-tight);

--heading-3-size: var(--font-size-2xl);
--heading-3-weight: var(--font-weight-semibold);
--heading-3-line-height: var(--line-height-tight);

/* Body */
--body-size: var(--font-size-base);
--body-weight: var(--font-weight-normal);
--body-line-height: var(--line-height-normal);

/* Small */
--small-size: var(--font-size-sm);
--small-weight: var(--font-weight-normal);
--small-line-height: var(--line-height-normal);

/* Caption */
--caption-size: var(--font-size-xs);
--caption-weight: var(--font-weight-normal);
--caption-line-height: var(--line-height-normal);
```

---

## 🌑 Sombras

```css
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
```

### Uso Comum
```css
--shadow-card: var(--shadow-sm);
--shadow-card-hover: var(--shadow-md);
--shadow-modal: var(--shadow-xl);
--shadow-dropdown: var(--shadow-lg);
--shadow-button: var(--shadow-xs);
```

---

## 🔲 Bordas

### Raios
```css
--radius-none: 0;
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.375rem;  /* 6px */
--radius-lg: 0.5rem;    /* 8px */
--radius-xl: 0.75rem;   /* 12px */
--radius-2xl: 1rem;     /* 16px */
--radius-full: 9999px;
```

### Larguras
```css
--border-width-0: 0;
--border-width-1: 1px;
--border-width-2: 2px;
--border-width-4: 4px;
```

### Estilos
```css
--border-style-solid: solid;
--border-style-dashed: dashed;
--border-style-dotted: dotted;
```

---

## ⏱️ Transições

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

--transition-all: all var(--transition-base);
--transition-colors: color var(--transition-base), background-color var(--transition-base), border-color var(--transition-base);
--transition-opacity: opacity var(--transition-base);
--transition-transform: transform var(--transition-base);
```

---

## 📐 Z-Index

```css
--z-index-dropdown: 1000;
--z-index-sticky: 1020;
--z-index-fixed: 1030;
--z-index-modal-backdrop: 1040;
--z-index-modal: 1050;
--z-index-popover: 1060;
--z-index-tooltip: 1070;
```

---

## 🎯 Estados Interativos

### Opacidades
```css
--opacity-disabled: 0.5;
--opacity-hover: 0.8;
--opacity-focus: 1;
```

### Focus Ring
```css
--focus-ring-width: 2px;
--focus-ring-color: var(--color-primary-500);
--focus-ring-offset: 2px;
--focus-ring: 0 0 0 var(--focus-ring-width) var(--focus-ring-color);
```

---

## 💡 Como Usar

### No CSS Global (`src/styles.css`)
```css
:root {
  /* Importar todos os tokens */
  /* Já devem estar definidos aqui */
}
```

### Em Componentes
```css
/* ✅ Usar variáveis CSS */
.my-button {
  padding: var(--spacing-2) var(--spacing-4);
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  box-shadow: var(--shadow-button);
  transition: var(--transition-colors);
}

.my-button:hover {
  background-color: var(--color-primary-600);
}

/* ❌ NUNCA usar valores hard-coded */
.my-button {
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border-radius: 6px;
}
```

---

## 📚 Referências

- **Tailwind CSS Colors**: https://tailwindcss.com/docs/customizing-colors
- **Material Design Color System**: https://m3.material.io/styles/color/system/overview
- **8pt Grid System**: https://spec.fm/specifics/8-pt-grid

