# Guia Rápido de Uso — Design System

Referência rápida para gerar telas consistentes com IA.

---

## 🚀 Para Agentes de IA

### Prompt Base
```
Ao gerar código Angular para este projeto:

1. Consulte `.ai/design/tokens.md` para cores, espaçamentos e tipografia
2. Siga `.ai/design/ui-contracts.md` para estrutura de páginas e formulários
3. Use componentes de `.ai/design/components.md` quando disponíveis
4. Implemente acessibilidade conforme `.ai/design/accessibility.md`
5. Aplique responsividade conforme `.ai/design/responsive.md`
6. Consulte `.ai/design/examples.md` para referência completa

Nunca use valores hard-coded - sempre use tokens CSS (var(--*)).
```

---

## 🎨 Tokens Mais Usados

### Cores
```css
/* Primárias */
var(--color-primary-500)      /* Botões, links */
var(--color-primary-600)      /* Hover */

/* Texto */
var(--color-text-primary)     /* Texto principal */
var(--color-text-secondary)   /* Texto secundário */

/* Superfície */
var(--color-background)       /* Fundo principal */
var(--color-surface)          /* Cards, inputs */
var(--color-border)           /* Bordas */

/* Semânticas */
var(--color-success-500)      /* Sucesso */
var(--color-error-500)        /* Erro */
var(--color-warning-500)      /* Aviso */
```

### Espaçamentos
```css
var(--spacing-2)   /* 8px - gap pequeno */
var(--spacing-4)   /* 16px - padding padrão */
var(--spacing-6)   /* 24px - gap grande */
var(--spacing-8)   /* 32px - seções */
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
        <app-button variant="primary" (click)="create()">
          Novo
        </app-button>
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
    <app-button type="button" variant="secondary" (click)="cancel()">
      Cancelar
    </app-button>
    <app-button type="submit" variant="primary" [disabled]="form.invalid">
      Salvar
    </app-button>
  </div>
</form>
```

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
            <app-icon-button icon="edit" (click)="edit(item.id)" />
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

- [ ] Usou tokens CSS (não valores hard-coded)
- [ ] Seguiu estrutura de UI contract
- [ ] Reutilizou componentes existentes
- [ ] Adicionou ARIA labels
- [ ] Implementou focus visível
- [ ] Aplicou mobile-first
- [ ] Testou contraste de cores

---

## 📚 Links Importantes

- **Tokens**: `.ai/design/tokens.md`
- **UI Contracts**: `.ai/design/ui-contracts.md`
- **Componentes**: `.ai/design/components.md`
- **Acessibilidade**: `.ai/design/accessibility.md`
- **Responsividade**: `.ai/design/responsive.md`
- **Exemplos**: `.ai/design/examples.md`

