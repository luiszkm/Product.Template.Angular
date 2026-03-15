# Componentes Reutilizáveis

Biblioteca de componentes padronizados para uso em todo o projeto.

---

## 🔘 Botões

### app-button

```ts
// Interface
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
```

```html
<!-- Uso -->
<app-button variant="primary" size="md" (click)="save()">
  Salvar
</app-button>

<app-button variant="secondary" size="sm" [disabled]="true">
  Desabilitado
</app-button>

<app-button variant="danger" size="lg" [loading]="saving()">
  Excluir
</app-button>

<app-button variant="ghost" size="md">
  Cancelar
</app-button>
```

### Classes CSS
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  font-family: var(--font-family-sans);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  border: var(--border-width-1) solid transparent;
  cursor: pointer;
  transition: var(--transition-colors);
  text-decoration: none;
  white-space: nowrap;
}

.btn:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

.btn:disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}

/* Variants */
.btn-primary {
  background: var(--color-primary-500);
  color: var(--color-text-inverse);
}

.btn-primary:hover:not(:disabled) {
  background: var(--color-primary-600);
}

.btn-secondary {
  background: var(--color-background);
  color: var(--color-text-primary);
  border-color: var(--color-border);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--color-surface);
}

.btn-danger {
  background: var(--color-error-500);
  color: var(--color-text-inverse);
}

.btn-danger:hover:not(:disabled) {
  background: var(--color-error-600);
}

.btn-ghost {
  background: transparent;
  color: var(--color-text-secondary);
}

.btn-ghost:hover:not(:disabled) {
  background: var(--color-surface);
  color: var(--color-text-primary);
}

/* Sizes */
.btn-sm {
  padding: var(--spacing-1) var(--spacing-3);
  font-size: var(--font-size-sm);
}

.btn-md {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-base);
}

.btn-lg {
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--font-size-lg);
}
```

---

## 🎯 Botão de Ícone

### app-icon-button

```ts
interface IconButtonProps {
  icon: string;
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  title?: string;
}
```

```html
<!-- Uso -->
<app-icon-button
  icon="edit"
  variant="ghost"
  size="sm"
  title="Editar"
  (click)="edit()"
/>

<app-icon-button
  icon="delete"
  variant="danger"
  size="md"
  title="Excluir"
  (click)="delete()"
/>
```

---

## 🏷️ Badge

### app-badge

```ts
interface BadgeProps {
  variant: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}
```

```html
<!-- Uso -->
<app-badge variant="success">Ativo</app-badge>
<app-badge variant="error">Inativo</app-badge>
<app-badge variant="warning">Pendente</app-badge>
<app-badge variant="info">Rascunho</app-badge>
```

### Classes CSS
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-default {
  background: var(--color-gray-100);
  color: var(--color-gray-700);
}

.badge-success {
  background: var(--color-success-50);
  color: var(--color-success-700);
}

.badge-warning {
  background: var(--color-warning-50);
  color: var(--color-warning-700);
}

.badge-error {
  background: var(--color-error-50);
  color: var(--color-error-700);
}

.badge-info {
  background: var(--color-info-50);
  color: var(--color-info-700);
}
```

---

## 📥 Input

### app-input

```ts
interface InputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string | null;
  helpText?: string;
}
```

```html
<!-- Uso -->
<app-input
  label="E-mail"
  type="email"
  placeholder="seu@email.com"
  [required]="true"
  [error]="emailError()"
  helpText="Digite seu e-mail corporativo"
/>
```

---

## 🔽 Select

### app-select

```ts
interface SelectProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string | null;
  options: Array<{ value: string | number; label: string }>;
}
```

```html
<!-- Uso -->
<app-select
  label="Categoria"
  placeholder="Selecione uma categoria"
  [options]="categories()"
  [required]="true"
  [error]="categoryError()"
/>
```

---

## ⏳ Loading Spinner

### app-spinner

```ts
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white';
}
```

```html
<!-- Uso -->
<app-spinner size="md" color="primary" />

@if (loading()) {
  <div class="loading-overlay">
    <app-spinner size="lg" />
  </div>
}
```

### Classes CSS
```css
.spinner {
  display: inline-block;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
}

.spinner-sm {
  width: 16px;
  height: 16px;
}

.spinner-md {
  width: 24px;
  height: 24px;
}

.spinner-lg {
  width: 32px;
  height: 32px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: var(--z-index-modal);
}
```

---

## 💬 Tooltip

### app-tooltip

```ts
interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}
```

```html
<!-- Uso -->
<app-tooltip content="Clique para editar" position="top">
  <button>Editar</button>
</app-tooltip>
```

---

## 🍞 Toast/Notification

### app-toast

```ts
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number; // ms
}
```

```html
<!-- Uso no serviço -->
this.toastService.show({
  message: 'Produto salvo com sucesso!',
  type: 'success',
  duration: 3000
});
```

---

## 📋 Dropdown Menu

### app-dropdown

```ts
interface DropdownProps {
  items: Array<{
    label: string;
    icon?: string;
    action: () => void;
    disabled?: boolean;
    danger?: boolean;
  }>;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
}
```

```html
<!-- Uso -->
<app-dropdown [items]="menuItems()" position="bottom-right">
  <button>Ações</button>
</app-dropdown>
```

---

## 🔢 Pagination

### app-pagination

```ts
interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
```

```html
<!-- Uso -->
<app-pagination
  [totalItems]="total()"
  [itemsPerPage]="pageSize()"
  [currentPage]="currentPage()"
  (pageChange)="loadPage($event)"
/>
```

### Classes CSS
```css
.pagination {
  display: flex;
  align-items: center;
  gap: var(--spacing-1);
  justify-content: center;
}

.pagination-button {
  padding: var(--spacing-2);
  min-width: 36px;
  height: 36px;
  border: var(--border-width-1) solid var(--color-border);
  background: var(--color-background);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-colors);
}

.pagination-button:hover:not(:disabled) {
  background: var(--color-surface);
}

.pagination-button:disabled {
  opacity: var(--opacity-disabled);
  cursor: not-allowed;
}

.pagination-button-active {
  background: var(--color-primary-500);
  color: var(--color-text-inverse);
  border-color: var(--color-primary-500);
}
```

---

## 📊 Progress Bar

### app-progress

```ts
interface ProgressProps {
  value: number; // 0-100
  variant?: 'default' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
}
```

```html
<!-- Uso -->
<app-progress [value]="uploadProgress()" variant="success" [showLabel]="true" />
```

### Classes CSS
```css
.progress-container {
  width: 100%;
  background: var(--color-gray-200);
  border-radius: var(--radius-full);
  overflow: hidden;
  height: 8px;
}

.progress-bar {
  height: 100%;
  background: var(--color-primary-500);
  transition: width 0.3s ease;
}

.progress-bar-success {
  background: var(--color-success-500);
}

.progress-bar-warning {
  background: var(--color-warning-500);
}

.progress-bar-error {
  background: var(--color-error-500);
}
```

---

## 🔍 Search Input

### app-search

```ts
interface SearchProps {
  placeholder?: string;
  debounceMs?: number;
  onSearch: (query: string) => void;
}
```

```html
<!-- Uso -->
<app-search
  placeholder="Buscar produtos..."
  [debounceMs]="300"
  (search)="handleSearch($event)"
/>
```

### Classes CSS
```css
.search-container {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3) var(--spacing-2) var(--spacing-10);
  border: var(--border-width-1) solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--font-size-base);
  transition: var(--transition-colors);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: var(--focus-ring);
}

.search-icon {
  position: absolute;
  left: var(--spacing-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-secondary);
  pointer-events: none;
}
```

---

## 🎨 Skeleton Loader

### app-skeleton

```ts
interface SkeletonProps {
  variant: 'text' | 'circle' | 'rect';
  width?: string;
  height?: string;
}
```

```html
<!-- Uso -->
@if (loading()) {
  <app-skeleton variant="text" width="200px" />
  <app-skeleton variant="circle" width="40px" height="40px" />
  <app-skeleton variant="rect" width="100%" height="100px" />
} @else {
  <!-- Conteúdo real -->
}
```

### Classes CSS
```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-gray-200) 25%,
    var(--color-gray-300) 50%,
    var(--color-gray-200) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

.skeleton-text {
  height: 1em;
  border-radius: var(--radius-sm);
}

.skeleton-circle {
  border-radius: 50%;
}

.skeleton-rect {
  border-radius: var(--radius-md);
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## ✅ Checklist de Componentes

- [ ] Componente usa `standalone: true`
- [ ] Componente usa `OnPush`
- [ ] Props são `input()` signal-based
- [ ] Eventos são `output()`
- [ ] Estilos usam tokens CSS
- [ ] Acessibilidade (ARIA, foco, contraste)
- [ ] Estados interativos (hover, focus, disabled)
- [ ] Responsivo
- [ ] Documentação com exemplos de uso

