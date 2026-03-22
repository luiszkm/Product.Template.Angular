# UI Contracts

Estruturas padronizadas para páginas, formulários, tabelas, cards e modais.

---

## 📄 Estrutura de Página

### Layout Padrão
```html
<div class="page-container">
  <!-- Header -->
  <header class="page-header">
    <div class="page-header-content">
      <div class="page-title-group">
        <h1 class="page-title">{{ title }}</h1>
        @if (subtitle) {
          <p class="page-subtitle">{{ subtitle }}</p>
        }
      </div>
      <div class="page-actions">
        <!-- Ações primárias (ex: Novo, Exportar) -->
        <app-button variant="primary" (click)="create()">
          Novo Produto
        </app-button>
      </div>
    </div>
    
    <!-- Filtros/Busca (opcional) -->
    @if (showFilters) {
      <div class="page-filters">
        <input type="search" placeholder="Buscar..." class="search-input">
        <!-- Outros filtros -->
      </div>
    }
  </header>

  <!-- Alerts/Notificações -->
  @if (error(); as err) {
    <div class="alert alert-error">{{ err }}</div>
  }
  @if (successMessage(); as msg) {
    <div class="alert alert-success">{{ msg }}</div>
  }

  <!-- Conteúdo Principal -->
  <main class="page-content">
    @if (loading()) {
      <div class="loading-spinner">Carregando...</div>
    } @else {
      <!-- Tabela, grid, formulário, etc. -->
    }
  </main>
</div>
```

### Classes CSS
```css
.page-container {
  padding: var(--spacing-6);
  max-width: 1440px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: var(--spacing-6);
}

.page-header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);
}

.page-title-group {
  flex: 1;
}

.page-title {
  font-size: var(--heading-2-size);
  font-weight: var(--heading-2-weight);
  line-height: var(--heading-2-line-height);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-1);
}

.page-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.page-actions {
  display: flex;
  gap: var(--spacing-2);
}

.page-filters {
  padding: var(--spacing-4);
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  display: flex;
  gap: var(--spacing-3);
  flex-wrap: wrap;
}

.page-content {
  /* Conteúdo ocupa o espaço restante */
}
```

---

## 📋 Página de Detalhe (Detail Page)

Padrão usado em role-detail, user-detail, tenant-detail. Referência: `src/app/features/authorization/pages/role-detail.page.html`

### Estrutura HTML
```html
<section class="feature-detail">
  <header class="feature-detail__header">
    <a routerLink="/feature" class="feature-detail__back">← Voltar para Feature</a>
    @if (item(); as item) {
      <h1 class="feature-detail__title">{{ item.name }}</h1>
      <p class="feature-detail__subtitle">{{ item.subtitle || 'Sem descrição' }}</p>
    }
  </header>

  @if (loading()) {
    <p class="feature-detail__loading">Carregando...</p>
  } @else if (error()) {
    <p class="feature-detail__error" role="alert">{{ error() }}</p>
  } @else if (item(); as item) {
    <div class="feature-detail__card">
      @if (editing()) {
        <form [formGroup]="form" (ngSubmit)="saveEdit()" class="feature-detail__form">
          <div class="field">
            <label for="name">Nome</label>
            <input id="name" formControlName="name" />
          </div>
          <div class="feature-detail__actions">
            <button type="submit" class="btn btn-primary">Salvar</button>
            <button type="button" class="btn btn-secondary" (click)="cancelEdit()">Cancelar</button>
          </div>
        </form>
      } @else {
        <dl class="feature-detail__info">
          <dt>Campo 1</dt>
          <dd>{{ item.field1 }}</dd>
          <dt>Campo 2</dt>
          <dd>{{ item.field2 }}</dd>
        </dl>
        <div class="feature-detail__actions">
          <button type="button" class="btn btn-primary" (click)="startEdit()">Editar</button>
          <button type="button" class="btn btn-danger" (click)="onRemove()">Excluir</button>
        </div>
      }
    </div>
  }
</section>
```

### Classes CSS (usar tokens ERP)
```css
.feature-detail {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.feature-detail__header { margin-bottom: var(--spacing-4); }

.feature-detail__title {
  margin: var(--spacing-2) 0 var(--spacing-1);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--foreground);
}

.feature-detail__subtitle {
  margin: 0;
  font-size: var(--font-size-base);
  color: var(--foreground-secondary);
}

.feature-detail__back {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--primary-600);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.feature-detail__back:hover { color: var(--primary-700); }

.feature-detail__error {
  padding: var(--spacing-3) var(--spacing-4);
  background: color-mix(in srgb, var(--error) 10%, transparent);
  color: var(--error);
  border: 1px solid color-mix(in srgb, var(--error) 20%, transparent);
  border-radius: var(--radius-md);
}

.feature-detail__card {
  padding: var(--spacing-4);
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.feature-detail__info {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: var(--spacing-2) var(--spacing-4);
  margin-bottom: var(--spacing-4);
}

.feature-detail__info dt {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--foreground-secondary);
}

.feature-detail__info dd {
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--card-foreground);
}

.feature-detail__form .field {
  margin-bottom: var(--spacing-4);
}

.feature-detail__form .field label {
  display: block;
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--foreground);
}

.feature-detail__form .field input {
  width: 100%;
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-base);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--input-background);
  color: var(--foreground);
}

.feature-detail__form .field input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary-500);
}

.feature-detail__actions {
  display: flex;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-4);
}

.feature-detail__loading {
  font-size: var(--font-size-sm);
  color: var(--foreground-secondary);
}
```

### Variante .field vs .form-group
- **`.form-group`**: usado em formulários modais/listagem (ver secção Formulários)
- **`.field`**: usado em páginas de detalhe (role-detail, user-detail, tenant-detail). Estrutura mais compacta com `label` + `input` directos.

---

## 📝 Formulários

### Estrutura Padrão
```html
<form [formGroup]="form" (ngSubmit)="submit()" class="form">
  <!-- Grupo de Campo -->
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
      placeholder="Digite o nome do produto"
    >
    @if (fieldError('name'); as error) {
      <span class="form-error">{{ error }}</span>
    }
    @if (!fieldError('name') && helpText) {
      <span class="form-help">{{ helpText }}</span>
    }
  </div>

  <!-- Select -->
  <div class="form-group">
    <label for="category" class="form-label">Categoria</label>
    <select id="category" formControlName="category" class="form-select">
      <option value="">Selecione...</option>
      @for (cat of categories(); track cat.id) {
        <option [value]="cat.id">{{ cat.name }}</option>
      }
    </select>
  </div>

  <!-- Textarea -->
  <div class="form-group">
    <label for="description" class="form-label">Descrição</label>
    <textarea
      id="description"
      formControlName="description"
      rows="4"
      class="form-textarea"
    ></textarea>
  </div>

  <!-- Checkbox -->
  <div class="form-group">
    <label class="form-checkbox">
      <input type="checkbox" formControlName="active">
      <span>Produto ativo</span>
    </label>
  </div>

  <!-- Radio Group -->
  <div class="form-group">
    <span class="form-label">Status</span>
    <div class="form-radio-group">
      <label class="form-radio">
        <input type="radio" formControlName="status" value="draft">
        <span>Rascunho</span>
      </label>
      <label class="form-radio">
        <input type="radio" formControlName="status" value="published">
        <span>Publicado</span>
      </label>
    </div>
  </div>

  <!-- Ações -->
  <div class="form-actions">
    <app-button
      type="button"
      variant="secondary"
      (click)="cancel()"
    >
      Cancelar
    </app-button>
    <app-button
      type="submit"
      variant="primary"
      [disabled]="form.invalid || loading()"
      [loading]="loading()"
    >
      Salvar
    </app-button>
  </div>
</form>
```

### Classes CSS
```css
.form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-5);
  max-width: 600px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.form-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.form-label-required {
  color: var(--color-error-500);
  margin-left: var(--spacing-1);
}

.form-input,
.form-select,
.form-textarea {
  padding: var(--spacing-1) var(--spacing-2);
  border: var(--border-width-1) solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  font-family: var(--font-family-sans);
  color: var(--color-text-primary);
  background: var(--color-background);
  transition: var(--transition-colors);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: var(--focus-ring);
}

.form-input-error {
  border-color: var(--color-error-500);
}

.form-error {
  font-size: var(--font-size-sm);
  color: var(--color-error-500);
}

.form-help {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.form-checkbox,
.form-radio {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  cursor: pointer;
}

.form-radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-3);
  margin-top: var(--spacing-2);
  padding-top: var(--spacing-5);
  border-top: var(--border-width-1) solid var(--color-border);
}
```

### Validação
```ts
// No componente
fieldError(name: keyof typeof this.form.controls): string | null {
  const ctrl = this.form.controls[name];
  if (!ctrl.touched || ctrl.valid) return null;
  
  if (ctrl.hasError('required')) return 'Campo obrigatório.';
  if (ctrl.hasError('email')) return 'E-mail inválido.';
  if (ctrl.hasError('minlength')) {
    const min = ctrl.getError('minlength').requiredLength;
    return `Mínimo de ${min} caracteres.`;
  }
  if (ctrl.hasError('maxlength')) {
    const max = ctrl.getError('maxlength').requiredLength;
    return `Máximo de ${max} caracteres.`;
  }
  if (ctrl.hasError('pattern')) return 'Formato inválido.';
  if (ctrl.hasError('apiError')) return ctrl.getError('apiError');
  
  return 'Campo inválido.';
}
```

---

## 📊 Tabelas

### Estrutura Padrão
```html
<div class="table-container">
  <table class="table">
    <thead class="table-header">
      <tr>
        <th class="table-th">Nome</th>
        <th class="table-th">Categoria</th>
        <th class="table-th table-th-numeric">Preço</th>
        <th class="table-th table-th-center">Status</th>
        <th class="table-th table-th-actions">Ações</th>
      </tr>
    </thead>
    <tbody class="table-body">
      @for (item of items(); track item.id) {
        <tr class="table-row">
          <td class="table-td">
            <div class="table-cell-primary">{{ item.name }}</div>
            @if (item.sku) {
              <div class="table-cell-secondary">SKU: {{ item.sku }}</div>
            }
          </td>
          <td class="table-td">{{ item.category }}</td>
          <td class="table-td table-td-numeric">
            {{ item.price | currency:'BRL' }}
          </td>
          <td class="table-td table-td-center">
            <app-badge [variant]="item.active ? 'success' : 'default'">
              {{ item.active ? 'Ativo' : 'Inativo' }}
            </app-badge>
          </td>
          <td class="table-td table-td-actions">
            <div class="table-actions">
              <app-icon-button
                icon="edit"
                variant="ghost"
                size="sm"
                (click)="edit(item.id)"
                title="Editar"
              />
              <app-icon-button
                icon="delete"
                variant="ghost"
                size="sm"
                (click)="delete(item.id)"
                title="Excluir"
              />
            </div>
          </td>
        </tr>
      } @empty {
        <tr>
          <td colspan="5" class="table-empty">
            Nenhum produto encontrado.
          </td>
        </tr>
      }
    </tbody>
  </table>
</div>
```

### Classes CSS
```css
.table-container {
  overflow-x: auto;
  border: var(--border-width-1) solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-background);
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table-header {
  background: var(--color-surface);
  border-bottom: var(--border-width-1) solid var(--color-border);
}

.table-th {
  padding: var(--spacing-3) var(--spacing-4);
  text-align: left;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.table-th-numeric {
  text-align: right;
}

.table-th-center {
  text-align: center;
}

.table-th-actions {
  width: 120px;
  text-align: center;
}

.table-row {
  border-bottom: var(--border-width-1) solid var(--color-border);
  transition: var(--transition-colors);
}

.table-row:hover {
  background: var(--color-surface-hover);
}

.table-td {
  padding: var(--spacing-4);
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.table-td-numeric {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.table-td-center {
  text-align: center;
}

.table-td-actions {
  text-align: center;
}

.table-cell-primary {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.table-cell-secondary {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-top: var(--spacing-1);
}

.table-actions {
  display: inline-flex;
  gap: var(--spacing-1);
}

.table-empty {
  padding: var(--spacing-12) var(--spacing-4);
  text-align: center;
  color: var(--color-text-secondary);
}
```

---

## 🗂️ Cards

### Card Básico
```html
<div class="card">
  <div class="card-header">
    <h3 class="card-title">Título do Card</h3>
    @if (subtitle) {
      <p class="card-subtitle">{{ subtitle }}</p>
    }
  </div>
  <div class="card-body">
    <!-- Conteúdo -->
  </div>
  @if (showFooter) {
    <div class="card-footer">
      <!-- Ações ou informações adicionais -->
    </div>
  }
</div>
```

### Card com Imagem
```html
<div class="card">
  <img [src]="imageUrl" [alt]="imageAlt" class="card-image">
  <div class="card-body">
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-text">{{ description }}</p>
  </div>
  <div class="card-footer">
    <app-button variant="primary" size="sm">Ver Detalhes</app-button>
  </div>
</div>
```

### Classes CSS
```css
.card {
  background: var(--color-background);
  border: var(--border-width-1) solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition: var(--transition-all);
}

.card:hover {
  box-shadow: var(--shadow-card-hover);
}

.card-header {
  padding: var(--spacing-4) var(--spacing-5);
  border-bottom: var(--border-width-1) solid var(--color-border);
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.card-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: var(--spacing-1) 0 0;
}

.card-body {
  padding: var(--spacing-5);
}

.card-text {
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

.card-footer {
  padding: var(--spacing-4) var(--spacing-5);
  background: var(--color-surface);
  border-top: var(--border-width-1) solid var(--color-border);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-2);
}

.card-image {
  width: 100%;
  height: auto;
  display: block;
}
```

---

## 🔔 Alerts

```html
<!-- Success -->
<div class="alert alert-success">
  <svg class="alert-icon"><!-- ícone de sucesso --></svg>
  <div class="alert-content">
    <strong class="alert-title">Sucesso!</strong>
    <p class="alert-message">Produto salvo com sucesso.</p>
  </div>
  <button class="alert-close" (click)="closeAlert()">×</button>
</div>

<!-- Error -->
<div class="alert alert-error">
  <svg class="alert-icon"><!-- ícone de erro --></svg>
  <div class="alert-content">
    <strong class="alert-title">Erro!</strong>
    <p class="alert-message">{{ errorMessage }}</p>
  </div>
</div>

<!-- Warning -->
<div class="alert alert-warning">
  <svg class="alert-icon"><!-- ícone de aviso --></svg>
  <div class="alert-content">
    <p class="alert-message">Atenção: esta ação não pode ser desfeita.</p>
  </div>
</div>

<!-- Info -->
<div class="alert alert-info">
  <svg class="alert-icon"><!-- ícone de info --></svg>
  <div class="alert-content">
    <p class="alert-message">Dica: use Ctrl+S para salvar rapidamente.</p>
  </div>
</div>
```

### Classes CSS
```css
.alert {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  border: var(--border-width-1) solid;
  margin-bottom: var(--spacing-4);
}

.alert-success {
  background: var(--color-success-50);
  border-color: var(--color-success-500);
  color: var(--color-success-700);
}

.alert-error {
  background: var(--color-error-50);
  border-color: var(--color-error-500);
  color: var(--color-error-700);
}

.alert-warning {
  background: var(--color-warning-50);
  border-color: var(--color-warning-500);
  color: var(--color-warning-700);
}

.alert-info {
  background: var(--color-info-50);
  border-color: var(--color-info-500);
  color: var(--color-info-700);
}

.alert-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.alert-content {
  flex: 1;
}

.alert-title {
  font-weight: var(--font-weight-semibold);
  display: block;
  margin-bottom: var(--spacing-1);
}

.alert-message {
  margin: 0;
  font-size: var(--font-size-sm);
}

.alert-close {
  background: none;
  border: none;
  font-size: var(--font-size-xl);
  cursor: pointer;
  opacity: 0.6;
  transition: var(--transition-opacity);
}

.alert-close:hover {
  opacity: 1;
}
```

---

## 🎯 Modal/Dialog

```html
@if (isOpen()) {
  <div class="modal-backdrop" (click)="close()">
    <div class="modal" (click)="$event.stopPropagation()" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h2 class="modal-title">{{ title }}</h2>
        <button class="modal-close" (click)="close()" aria-label="Fechar">×</button>
      </div>
      
      <div class="modal-body">
        <!-- Conteúdo do modal -->
      </div>
      
      <div class="modal-footer">
        <app-button variant="secondary" (click)="close()">Cancelar</app-button>
        <app-button variant="primary" (click)="confirm()">Confirmar</app-button>
      </div>
    </div>
  </div>
}
```

### Classes CSS
```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-index-modal-backdrop);
  padding: var(--spacing-4);
}

.modal {
  background: var(--color-background);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-modal);
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: var(--z-index-modal);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-5) var(--spacing-6);
  border-bottom: var(--border-width-1) solid var(--color-border);
}

.modal-title {
  font-size: var(--heading-3-size);
  font-weight: var(--heading-3-weight);
  margin: 0;
}

.modal-close {
  background: none;
  border: none;
  font-size: var(--font-size-2xl);
  cursor: pointer;
  opacity: 0.6;
  transition: var(--transition-opacity);
}

.modal-close:hover {
  opacity: 1;
}

.modal-body {
  padding: var(--spacing-6);
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-3);
  padding: var(--spacing-5) var(--spacing-6);
  border-top: var(--border-width-1) solid var(--color-border);
}
```

---

## ✅ Checklist de UI Contract

- [ ] Página tem header com título e ações
- [ ] Página de detalhe usa padrão `feature-detail__*` (ver secção Página de Detalhe)
- [ ] Formulário usa `form-group` ou `.field` (detail pages)
- [ ] Erros de validação via `fieldError()`
- [ ] Tabela tem hover, células numéricas alinhadas à direita
- [ ] Cards têm sombra e transição no hover
- [ ] Alerts têm ícones e cores semânticas
- [ ] Modais têm backdrop, header, body, footer
- [ ] Espaçamentos usam tokens CSS
- [ ] Cores usam tokens CSS
- [ ] Border-radius usa tokens CSS

