# Componentes Reutilizáveis

Biblioteca de componentes padronizados para uso em todo o projeto.

---

## 🔘 Botões

### Implementação Actual (classes em `src/styles.css`)

O projeto usa **classes CSS** em vez de componentes Angular para botões. Use sempre:

```html
<button type="button" class="btn btn-primary" (click)="save()">Salvar</button>
<button type="button" class="btn btn-secondary" (click)="cancel()">Cancelar</button>
<button type="button" class="btn btn-danger" (click)="remove()">Excluir</button>
```

**Variantes disponíveis:** `.btn-primary`, `.btn-secondary`, `.btn-danger`

### Classes CSS (implementadas em styles.css)
```css
.btn {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background-color var(--transition-fast), border-color var(--transition-fast);
}

.btn-primary {
  background: var(--primary-600);
  color: var(--primary-foreground);
  border: none;
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-700);
}

.btn-secondary {
  background: var(--surface);
  color: var(--foreground);
  border: 1px solid var(--border);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--muted);
  border-color: var(--neutral-400);
}

.btn-danger {
  background: color-mix(in srgb, var(--error) 10%, transparent);
  color: var(--error);
  border: 1px solid color-mix(in srgb, var(--error) 20%, transparent);
}

.btn-danger:hover:not(:disabled) {
  background: color-mix(in srgb, var(--error) 20%, transparent);
}
```

**Padding compacto:** `.btn` e controlos de formulário alinhados em `src/styles.css` e páginas usam **`var(--spacing-1) var(--spacing-2)`** (~8px × ~16px). Evitar duplicar blocos só para padding em `*__actions .btn` — a classe global já aplica.

### Campos de texto (inputs, selects, busca)

Em páginas (detalhe, listagens, login), inputs e selects seguem o mesmo par vertical/horizontal que os botões:

```css
/* Exemplo: .feature-detail__form .field input, filtros, busca */
width: 100%;
padding: var(--spacing-1) var(--spacing-2);
font-size: var(--font-size-base);
border: 1px solid var(--border);
border-radius: var(--radius-md);
background: var(--input-background);
color: var(--foreground);
```

**Paginação** das listagens (botões «anterior / próximo»): mesmo padding `var(--spacing-1) var(--spacing-2)` para consistência com `.btn`.

### app-button (referência futura)

```ts
// Interface - componente a implementar
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
```

```html
<!-- Uso quando componente existir -->
<app-button variant="primary" size="md" (click)="save()">Salvar</app-button>
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
  background: var(--muted);
  color: var(--foreground-secondary);
}

.badge-success {
  background: color-mix(in srgb, var(--success) 10%, transparent);
  color: var(--success);
}

.badge-warning {
  background: color-mix(in srgb, var(--warning) 10%, transparent);
  color: var(--warning);
}

.badge-error {
  background: color-mix(in srgb, var(--error) 10%, transparent);
  color: var(--error);
}

.badge-info {
  background: color-mix(in srgb, var(--info) 10%, transparent);
  color: var(--info);
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
  padding: var(--spacing-1) var(--spacing-2);
  min-width: 36px;
  min-height: 36px;
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
  padding: var(--spacing-1) var(--spacing-2) var(--spacing-1) var(--spacing-10);
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

