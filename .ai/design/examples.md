# Exemplos Práticos

Exemplos completos de páginas e componentes aplicando todos os padrões de design.

---

## 🛍️ Página CRUD Completa: Produtos

### products.page.ts
```typescript
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsStore } from '../state/products.store';
import { ProductTableComponent } from '../components/product-table.component';
import { ProductFormComponent } from '../components/product-form.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ProductTableComponent, ProductFormComponent],
  providers: [ProductsStore],
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.css']
})
export class ProductsPage {
  private readonly store = inject(ProductsStore);
  
  readonly vm = this.store.vm;
  readonly showForm = signal(false);
  readonly editingId = signal<string | null>(null);

  ngOnInit(): void {
    this.store.load();
  }

  openCreateForm(): void {
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEditForm(id: string): void {
    this.editingId.set(id);
    this.showForm.set(true);
  }

  closeForm(): void {
    this.showForm.set(false);
    this.editingId.set(null);
  }

  handleSave(product: CreateProductRequest): void {
    if (this.editingId()) {
      this.store.update(this.editingId()!, product);
    } else {
      this.store.create(product);
    }
    this.closeForm();
  }

  handleDelete(id: string): void {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      this.store.delete(id);
    }
  }
}
```

### products.page.html
```html
<div class="page-container">
  <!-- Header -->
  <header class="page-header">
    <div class="page-header-content">
      <div class="page-title-group">
        <h1 class="page-title">Produtos</h1>
        <p class="page-subtitle">
          Gerencie o catálogo de produtos da sua loja
        </p>
      </div>
      <div class="page-actions">
        <app-button
          variant="primary"
          size="md"
          (click)="openCreateForm()"
        >
          <svg aria-hidden="true" class="icon"><!-- ícone + --></svg>
          Novo Produto
        </app-button>
      </div>
    </div>

    <!-- Filtros -->
    <div class="page-filters">
      <app-search
        placeholder="Buscar produtos..."
        [debounceMs]="300"
        (search)="store.search($event)"
      />
      
      <app-select
        label="Categoria"
        placeholder="Todas"
        [options]="vm().categories"
        (change)="store.filterByCategory($event)"
      />

      <app-select
        label="Status"
        placeholder="Todos"
        [options]="[
          { value: 'active', label: 'Ativos' },
          { value: 'inactive', label: 'Inativos' }
        ]"
        (change)="store.filterByStatus($event)"
      />
    </div>
  </header>

  <!-- Alerts -->
  @if (vm().error; as error) {
    <div class="alert alert-error" role="alert">
      <svg class="alert-icon" aria-hidden="true"><!-- ícone erro --></svg>
      <div class="alert-content">
        <strong class="alert-title">Erro!</strong>
        <p class="alert-message">{{ error }}</p>
      </div>
      <button class="alert-close" (click)="store.clearError()" aria-label="Fechar">
        ×
      </button>
    </div>
  }

  @if (vm().successMessage; as msg) {
    <div class="alert alert-success" role="alert">
      <svg class="alert-icon" aria-hidden="true"><!-- ícone sucesso --></svg>
      <div class="alert-content">
        <p class="alert-message">{{ msg }}</p>
      </div>
    </div>
  }

  <!-- Loading -->
  @if (vm().loading) {
    <div class="loading-container">
      <app-spinner size="lg" color="primary" />
      <p class="sr-only">Carregando produtos...</p>
    </div>
  }

  <!-- Conteúdo Principal -->
  @if (!vm().loading) {
    <main class="page-content">
      @if (vm().items.length > 0) {
        <app-product-table
          [products]="vm().items"
          (edit)="openEditForm($event)"
          (delete)="handleDelete($event)"
        />

        <!-- Paginação -->
        <app-pagination
          [totalItems]="vm().total"
          [itemsPerPage]="vm().pageSize"
          [currentPage]="vm().currentPage"
          (pageChange)="store.loadPage($event)"
        />
      } @else {
        <div class="empty-state">
          <svg class="empty-state-icon" aria-hidden="true">
            <!-- ícone de caixa vazia -->
          </svg>
          <h2 class="empty-state-title">Nenhum produto encontrado</h2>
          <p class="empty-state-description">
            Comece criando seu primeiro produto para ver algo aqui.
          </p>
          <app-button
            variant="primary"
            size="lg"
            (click)="openCreateForm()"
          >
            Criar Primeiro Produto
          </app-button>
        </div>
      }
    </main>
  }

  <!-- Modal de Formulário -->
  @if (showForm()) {
    <div
      class="modal-backdrop"
      (click)="closeForm()"
      role="presentation"
    >
      <div
        class="modal"
        (click)="$event.stopPropagation()"
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-title"
      >
        <div class="modal-header">
          <h2 id="form-title" class="modal-title">
            {{ editingId() ? 'Editar Produto' : 'Novo Produto' }}
          </h2>
          <button
            class="modal-close"
            (click)="closeForm()"
            aria-label="Fechar formulário"
          >
            ×
          </button>
        </div>

        <div class="modal-body">
          <app-product-form
            [productId]="editingId()"
            [apiErrors]="vm().validationErrors"
            (save)="handleSave($event)"
            (cancel)="closeForm()"
          />
        </div>
      </div>
    </div>
  }
</div>
```

### products.page.css
```css
.page-container {
  padding: var(--spacing-4);
  max-width: 1440px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .page-container {
    padding: var(--spacing-6);
  }
}

@media (min-width: 1024px) {
  .page-container {
    padding: var(--spacing-8);
  }
}

.page-header {
  margin-bottom: var(--spacing-6);
}

.page-header-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
  margin-bottom: var(--spacing-4);
}

@media (min-width: 768px) {
  .page-header-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
}

.page-title-group {
  flex: 1;
}

.page-title {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-2);
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
  flex-direction: column;
  gap: var(--spacing-3);
}

@media (min-width: 768px) {
  .page-filters {
    flex-direction: row;
    align-items: flex-end;
  }
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-12);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-12);
  text-align: center;
}

.empty-state-icon {
  width: 120px;
  height: 120px;
  color: var(--color-gray-400);
  margin-bottom: var(--spacing-6);
}

.empty-state-title {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-2);
}

.empty-state-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  max-width: 400px;
  margin: 0 0 var(--spacing-6);
}

.icon {
  width: 20px;
  height: 20px;
}
```

---

## 📋 Componente de Formulário

### product-form.component.ts
```typescript
import {
  Component,
  input,
  output,
  inject,
  signal,
  effect,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly service = inject(ProductsService);

  readonly productId = input<string | null>(null);
  readonly apiErrors = input<Record<string, string[]> | null>(null);
  
  readonly save = output<CreateProductRequest>();
  readonly cancel = output<void>();

  readonly loading = signal(false);
  readonly categories = signal<Category[]>([]);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    sku: ['', [Validators.required, Validators.pattern(/^[A-Z0-9-]+$/)]],
    category: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0.01)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    description: ['', Validators.maxLength(500)],
    active: [true]
  });

  private readonly _applyApiErrors = effect(() => {
    const errors = this.apiErrors();
    if (!errors) return;

    for (const [field, messages] of Object.entries(errors)) {
      const control = this.form.get(field.toLowerCase());
      if (control) {
        control.setErrors({ apiError: messages[0] });
        control.markAsTouched();
      }
    }
  });

  ngOnInit(): void {
    this.loadCategories();
    if (this.productId()) {
      this.loadProduct();
    }
  }

  private loadCategories(): void {
    this.service.getCategories().subscribe({
      next: (categories) => this.categories.set(categories)
    });
  }

  private loadProduct(): void {
    this.loading.set(true);
    this.service.getById(this.productId()!).subscribe({
      next: (product) => {
        this.form.patchValue(product);
        this.loading.set(false);
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.save.emit(this.form.getRawValue());
  }

  handleCancel(): void {
    this.cancel.emit();
  }

  fieldError(name: keyof typeof this.form.controls): string | null {
    const ctrl = this.form.controls[name];
    if (!ctrl.touched || ctrl.valid) return null;

    if (ctrl.hasError('required')) return 'Campo obrigatório.';
    if (ctrl.hasError('minlength')) {
      const min = ctrl.getError('minlength').requiredLength;
      return `Mínimo de ${min} caracteres.`;
    }
    if (ctrl.hasError('maxlength')) {
      const max = ctrl.getError('maxlength').requiredLength;
      return `Máximo de ${max} caracteres.`;
    }
    if (ctrl.hasError('min')) {
      const min = ctrl.getError('min').min;
      return `Valor mínimo: ${min}.`;
    }
    if (ctrl.hasError('pattern')) return 'Formato inválido. Use apenas letras maiúsculas, números e hífens.';
    if (ctrl.hasError('apiError')) return ctrl.getError('apiError');

    return 'Campo inválido.';
  }
}
```

### product-form.component.html
```html
<form [formGroup]="form" (ngSubmit)="submit()" class="form">
  <!-- Nome -->
  <div class="form-group">
    <label for="name" class="form-label">
      Nome do Produto
      <span class="form-label-required" aria-label="obrigatório">*</span>
    </label>
    <input
      id="name"
      type="text"
      formControlName="name"
      class="form-input"
      [class.form-input-error]="fieldError('name')"
      placeholder="Ex: iPhone 15 Pro"
      [attr.aria-invalid]="fieldError('name') ? 'true' : 'false'"
      aria-describedby="name-error name-help"
    />
    @if (fieldError('name'); as error) {
      <span id="name-error" role="alert" class="form-error">
        {{ error }}
      </span>
    } @else {
      <span id="name-help" class="form-help">
        Entre 3 e 100 caracteres
      </span>
    }
  </div>

  <!-- SKU e Categoria (2 colunas em desktop) -->
  <div class="form-row">
    <div class="form-group">
      <label for="sku" class="form-label">
        SKU
        <span class="form-label-required">*</span>
      </label>
      <input
        id="sku"
        type="text"
        formControlName="sku"
        class="form-input"
        [class.form-input-error]="fieldError('sku')"
        placeholder="Ex: IPHONE-15-PRO"
        [attr.aria-invalid]="fieldError('sku') ? 'true' : 'false'"
        aria-describedby="sku-error sku-help"
      />
      @if (fieldError('sku'); as error) {
        <span id="sku-error" role="alert" class="form-error">{{ error }}</span>
      } @else {
        <span id="sku-help" class="form-help">Apenas letras maiúsculas, números e hífens</span>
      }
    </div>

    <div class="form-group">
      <label for="category" class="form-label">
        Categoria
        <span class="form-label-required">*</span>
      </label>
      <select
        id="category"
        formControlName="category"
        class="form-select"
        [class.form-input-error]="fieldError('category')"
        [attr.aria-invalid]="fieldError('category') ? 'true' : 'false'"
        aria-describedby="category-error"
      >
        <option value="">Selecione uma categoria...</option>
        @for (cat of categories(); track cat.id) {
          <option [value]="cat.id">{{ cat.name }}</option>
        }
      </select>
      @if (fieldError('category'); as error) {
        <span id="category-error" role="alert" class="form-error">{{ error }}</span>
      }
    </div>
  </div>

  <!-- Preço e Estoque (2 colunas) -->
  <div class="form-row">
    <div class="form-group">
      <label for="price" class="form-label">
        Preço
        <span class="form-label-required">*</span>
      </label>
      <input
        id="price"
        type="number"
        formControlName="price"
        step="0.01"
        min="0"
        class="form-input"
        [class.form-input-error]="fieldError('price')"
        placeholder="0,00"
        [attr.aria-invalid]="fieldError('price') ? 'true' : 'false'"
        aria-describedby="price-error"
      />
      @if (fieldError('price'); as error) {
        <span id="price-error" role="alert" class="form-error">{{ error }}</span>
      }
    </div>

    <div class="form-group">
      <label for="stock" class="form-label">
        Estoque
        <span class="form-label-required">*</span>
      </label>
      <input
        id="stock"
        type="number"
        formControlName="stock"
        min="0"
        class="form-input"
        [class.form-input-error]="fieldError('stock')"
        placeholder="0"
        [attr.aria-invalid]="fieldError('stock') ? 'true' : 'false'"
        aria-describedby="stock-error"
      />
      @if (fieldError('stock'); as error) {
        <span id="stock-error" role="alert" class="form-error">{{ error }}</span>
      }
    </div>
  </div>

  <!-- Descrição -->
  <div class="form-group">
    <label for="description" class="form-label">Descrição</label>
    <textarea
      id="description"
      formControlName="description"
      rows="4"
      class="form-textarea"
      [class.form-input-error]="fieldError('description')"
      placeholder="Descreva as características do produto..."
      [attr.aria-invalid]="fieldError('description') ? 'true' : 'false'"
      aria-describedby="description-error description-help"
    ></textarea>
    @if (fieldError('description'); as error) {
      <span id="description-error" role="alert" class="form-error">{{ error }}</span>
    } @else {
      <span id="description-help" class="form-help">Máximo de 500 caracteres</span>
    }
  </div>

  <!-- Ativo -->
  <div class="form-group">
    <label class="form-checkbox">
      <input type="checkbox" formControlName="active" />
      <span>Produto ativo</span>
    </label>
  </div>

  <!-- Ações -->
  <div class="form-actions">
    <app-button
      type="button"
      variant="secondary"
      size="md"
      (click)="handleCancel()"
      [disabled]="loading()"
    >
      Cancelar
    </app-button>
    <app-button
      type="submit"
      variant="primary"
      size="md"
      [disabled]="form.invalid || loading()"
      [loading]="loading()"
    >
      {{ productId() ? 'Atualizar' : 'Criar' }} Produto
    </app-button>
  </div>
</form>
```

---

## 📊 Componente de Tabela

### product-table.component.html
```html
<div class="table-container">
  <table class="table" role="table" aria-label="Lista de produtos">
    <thead class="table-header">
      <tr>
        <th scope="col" class="table-th">Produto</th>
        <th scope="col" class="table-th">Categoria</th>
        <th scope="col" class="table-th table-th-numeric">Preço</th>
        <th scope="col" class="table-th table-th-numeric">Estoque</th>
        <th scope="col" class="table-th table-th-center">Status</th>
        <th scope="col" class="table-th table-th-actions">Ações</th>
      </tr>
    </thead>
    <tbody class="table-body">
      @for (product of products(); track product.id) {
        <tr class="table-row">
          <td class="table-td">
            <div class="table-cell-primary">{{ product.name }}</div>
            <div class="table-cell-secondary">SKU: {{ product.sku }}</div>
          </td>
          <td class="table-td">{{ product.category }}</td>
          <td class="table-td table-td-numeric">
            {{ product.price | currency:'BRL' }}
          </td>
          <td class="table-td table-td-numeric">
            {{ product.stock }}
          </td>
          <td class="table-td table-td-center">
            <app-badge [variant]="product.active ? 'success' : 'default'">
              {{ product.active ? 'Ativo' : 'Inativo' }}
            </app-badge>
          </td>
          <td class="table-td table-td-actions">
            <div class="table-actions">
              <app-icon-button
                icon="edit"
                variant="ghost"
                size="sm"
                [title]="'Editar ' + product.name"
                (click)="edit.emit(product.id)"
              />
              <app-icon-button
                icon="delete"
                variant="ghost"
                size="sm"
                [title]="'Excluir ' + product.name"
                (click)="delete.emit(product.id)"
              />
            </div>
          </td>
        </tr>
      } @empty {
        <tr>
          <td colspan="6" class="table-empty">
            Nenhum produto encontrado.
          </td>
        </tr>
      }
    </tbody>
  </table>
</div>
```

---

## 📋 Página de Detalhe (role-detail)

Referência: `src/app/features/authorization/pages/role-detail.page.html`

### role-detail.page.html
```html
<section class="role-detail">
  <header class="role-detail__header">
    <a routerLink="/roles" class="role-detail__back">← Voltar para Roles</a>
    @if (vm().role; as role) {
      <h1 class="role-detail__title">{{ role.name }}</h1>
      <p class="role-detail__subtitle">{{ role.description || 'Sem descrição' }}</p>
    }
  </header>

  @if (vm().loading && !vm().role) {
    <p class="role-detail__loading">Carregando...</p>
  } @else if (vm().error) {
    <p class="role-detail__error" role="alert">{{ vm().error }}</p>
  } @else if (vm().role; as role) {
    <div class="role-detail__card">
      @if (editing()) {
        <form [formGroup]="form" (ngSubmit)="saveEdit()" class="role-detail__form">
          <div class="field">
            <label for="name">Nome</label>
            <input id="name" formControlName="name" />
          </div>
          <div class="field">
            <label for="description">Descrição</label>
            <input id="description" formControlName="description" />
          </div>
          <div class="role-detail__actions">
            <button type="submit" class="btn btn-primary">Salvar</button>
            <button type="button" class="btn btn-secondary" (click)="cancelEdit()">Cancelar</button>
          </div>
        </form>
      } @else {
        @if (canManage) {
          <div class="role-detail__actions">
            <button type="button" class="btn btn-primary" (click)="startEdit()">Editar</button>
            <button type="button" class="btn btn-danger" (click)="onRemove()">Excluir</button>
          </div>
        }
      }

      <div class="role-detail__permissions">
        <h3>Permissões</h3>
        @if (role.permissions.length > 0) {
          <ul>
            @for (p of role.permissions; track p.id) {
              <li>
                {{ p.name }} — {{ p.description }}
                @if (canManage) {
                  <button type="button" (click)="onRemovePermission(p.id)">Remover</button>
                }
              </li>
            }
          </ul>
        } @else {
          <p>Nenhuma permissão atribuída.</p>
        }

        @if (canManage && availablePermissions().length > 0) {
          <div class="role-detail__add">
            <select #permSelect (change)="onPermissionSelect(permSelect.value)">
              <option value="">Adicionar permissão...</option>
              @for (p of availablePermissions(); track p.id) {
                <option [value]="p.id">{{ p.name }}</option>
              }
            </select>
          </div>
        }
      </div>
    </div>
  }
</section>
```

### role-detail.page.css (tokens ERP)
```css
.role-detail {
  max-width: 1600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

.role-detail__header { margin-bottom: var(--spacing-4); }

.role-detail__title {
  margin: var(--spacing-2) 0 var(--spacing-1);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-semibold);
  color: var(--foreground);
}

.role-detail__subtitle {
  margin: 0;
  font-size: var(--font-size-base);
  color: var(--foreground-secondary);
}

.role-detail__back {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--primary-600);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.role-detail__back:hover { color: var(--primary-700); }

.role-detail__error {
  padding: var(--spacing-3) var(--spacing-4);
  background: color-mix(in srgb, var(--error) 10%, transparent);
  color: var(--error);
  border: 1px solid color-mix(in srgb, var(--error) 20%, transparent);
  border-radius: var(--radius-md);
}

.role-detail__card {
  padding: var(--spacing-4);
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.role-detail__form .field {
  margin-bottom: var(--spacing-4);
}

.role-detail__form .field label {
  display: block;
  margin-bottom: var(--spacing-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--foreground);
}

.role-detail__form .field input {
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-base);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--input-background);
  color: var(--foreground);
}

.role-detail__form .field input:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--primary-500);
}

.role-detail__actions {
  display: flex;
  gap: var(--spacing-3);
  margin-bottom: var(--spacing-4);
}

.role-detail__loading {
  font-size: var(--font-size-sm);
  color: var(--foreground-secondary);
}
```

O mesmo padrão aplica-se a `user-detail` e `tenant-detail`. Ver `ui-contracts.md` para a estrutura genérica.

---

## ✅ Resumo

Este exemplo completo demonstra:

- ✅ Tokens ERP (--foreground, --card, color-mix para erros)
- ✅ UI contracts (estrutura de página, formulário, tabela, página de detalhe)
- ✅ Classes .btn (btn-primary, btn-secondary, btn-danger)
- ✅ Acessibilidade (ARIA, foco, contraste)
- ✅ Responsividade (mobile-first, breakpoints)
- ✅ Signals e OnPush
- ✅ Reactive Forms com validação
- ✅ Tratamento de erros
- ✅ Loading states
- ✅ Empty states
- ✅ Modal pattern

**Use este exemplo como referência ao gerar novas páginas!**

