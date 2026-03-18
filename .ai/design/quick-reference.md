# Guia Rápido de Uso — Design System

Referência rápida para gerar telas consistentes com IA.

---

## 🚀 Para Agentes de IA

### Prompt Base
```
Ao gerar código Angular para este projeto:

1. Consulte `.ai/design/tokens.md` para tokens ERP (--foreground, --card, etc.)
2. Siga `.ai/design/ui-contracts.md` para estrutura de páginas e formulários
3. Use classes .btn, .btn-primary, .btn-secondary, .btn-danger (ver components.md)
4. Páginas de detalhe: padrão feature-detail__* em ui-contracts.md
5. Layout shell: docs/erp-layout-prompt.md
6. Implemente acessibilidade conforme `.ai/design/accessibility.md`
7. Consulte `.ai/design/examples.md` para referência completa

Nunca use valores hard-coded - sempre use tokens CSS (var(--*)).
```

---

## 🎨 Tokens Mais Usados (ERP)

### Cores
```css
/* Interface (preferidos - suportam dark mode) */
var(--foreground)             /* Texto principal */
var(--foreground-secondary)   /* Texto secundário */
var(--card)                   /* Fundo de cards */
var(--card-foreground)        /* Texto em cards */
var(--primary-600)           /* Links, botões primários */
var(--primary-700)           /* Hover */
var(--error)                  /* Erros, botões de perigo */
var(--border)                 /* Bordas */
var(--input-background)      /* Fundo de inputs */

/* Alertas com color-mix */
background: color-mix(in srgb, var(--error) 10%, transparent);
border: 1px solid color-mix(in srgb, var(--error) 20%, transparent);
```

### Espaçamentos (base 8px)
```css
var(--spacing-1)   /* 8px - gap pequeno */
var(--spacing-2)   /* 16px - padding padrão */
var(--spacing-3)   /* 24px - gap médio */
var(--spacing-4)   /* 32px - seções, gap grande */
var(--spacing-6)   /* 48px */
```

### Tipografia
```css
var(--font-size-sm)           /* 14px - labels */
var(--font-size-base)         /* 16px - texto */
var(--font-size-2xl)          /* 24px - títulos */

var(--font-weight-medium)     /* 500 - labels */
var(--font-weight-semibold)   /* 600 - títulos */
```

---

## 📋 Templates Prontos

### Página CRUD
```html
<div class="page-container">
  <header class="page-header">
    <div class="page-header-content">
      <div class="page-title-group">
        <h1 class="page-title">{{ title }}</h1>
        <p class="page-subtitle">{{ subtitle }}</p>
      </div>
      <div class="page-actions">
        <button type="button" class="btn btn-primary" (click)="create()">Novo</button>
      </div>
    </div>
  </header>

  <main class="page-content">
    <!-- Tabela ou grid -->
  </main>
</div>
```

### Formulário
```html
<form [formGroup]="form" (ngSubmit)="submit()" class="form">
  <div class="form-group">
    <label for="name" class="form-label">
      Nome
      <span class="form-label-required">*</span>
    </label>
    <input
      id="name"
      type="text"
      formControlName="name"
      class="form-input"
      [class.form-input-error]="fieldError('name')"
    />
    @if (fieldError('name'); as error) {
      <span class="form-error">{{ error }}</span>
    }
  </div>

  <div class="form-actions">
    <button type="button" class="btn btn-secondary" (click)="cancel()">Cancelar</button>
    <button type="submit" class="btn btn-primary" [disabled]="form.invalid">Salvar</button>
  </div>
</form>
```

### Página de Detalhe
```html
<section class="feature-detail">
  <header class="feature-detail__header">
    <a routerLink="/feature" class="feature-detail__back">← Voltar para Feature</a>
    @if (item(); as item) {
      <h1 class="feature-detail__title">{{ item.name }}</h1>
      <p class="feature-detail__subtitle">{{ item.subtitle }}</p>
    }
  </header>

  @if (loading()) {
    <p class="feature-detail__loading">Carregando...</p>
  } @else if (error()) {
    <p class="feature-detail__error" role="alert">{{ error() }}</p>
  } @else if (item(); as item) {
    <div class="feature-detail__card">
      <dl class="feature-detail__info">
        <dt>Campo</dt>
        <dd>{{ item.field }}</dd>
      </dl>
      <div class="feature-detail__actions">
        <button type="button" class="btn btn-primary" (click)="edit()">Editar</button>
        <button type="button" class="btn btn-danger" (click)="remove()">Excluir</button>
      </div>
    </div>
  }
</section>
```
Ver estrutura completa em `ui-contracts.md` (secção Página de Detalhe).

### Tabela
```html
<div class="table-container">
  <table class="table">
    <thead class="table-header">
      <tr>
        <th class="table-th">Nome</th>
        <th class="table-th table-th-numeric">Preço</th>
        <th class="table-th table-th-actions">Ações</th>
      </tr>
    </thead>
    <tbody class="table-body">
      @for (item of items(); track item.id) {
        <tr class="table-row">
          <td class="table-td">{{ item.name }}</td>
          <td class="table-td table-td-numeric">
            {{ item.price | currency:'BRL' }}
          </td>
          <td class="table-td table-td-actions">
            <button type="button" class="btn btn-secondary" (click)="edit(item.id)">Editar</button>
          </td>
        </tr>
      }
    </tbody>
  </table>
</div>
```

---

## ✅ Checklist Rápido

Antes de gerar código, verifique:

- [ ] Usou tokens ERP (--foreground, --card, etc.)
- [ ] Seguiu estrutura de UI contract (incl. Página de Detalhe se aplicável)
- [ ] Usou classes .btn em vez de componentes inexistentes
- [ ] Adicionou ARIA labels
- [ ] Implementou focus visível
- [ ] Aplicou mobile-first
- [ ] Testou contraste de cores

---

## 📚 Links Importantes

- **Tokens**: `.ai/design/tokens.md`
- **UI Contracts**: `.ai/design/ui-contracts.md`
- **Layout ERP (shell, sidebar)**: `docs/erp-layout-prompt.md`
- **Componentes**: `.ai/design/components.md`
- **Acessibilidade**: `.ai/design/accessibility.md`
- **Responsividade**: `.ai/design/responsive.md`
- **Exemplos**: `.ai/design/examples.md`

