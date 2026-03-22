import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppModalComponent } from '../../../shared/components/modal.component';
import { ProductFormComponent, ProductFormValue } from '../components/product-form.component';
import { ProductTableComponent } from '../components/product-table.component';
import { ProductsStore } from '../state/products.store';
import { Product } from '../models/product.model';
import type { UpdateProductRequest } from '../models/product.model';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [AppModalComponent, ProductFormComponent, ProductTableComponent, FormsModule],
  templateUrl: './products.page.html',
  styleUrl: './products.page.css',
  providers: [ProductsStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsPage implements OnInit {
  private readonly store = inject(ProductsStore);

  readonly vm = this.store.vm;
  readonly createModalOpen = signal(false);
  readonly editModalOpen = signal(false);
  readonly productToEdit = signal<Product | null>(null);

  readonly searchDraft = signal('');
  readonly categoryDraft = signal('');
  readonly minPriceDraft = signal<string>('');
  readonly maxPriceDraft = signal<string>('');

  ngOnInit(): void {
    this.store.load();
  }

  onSearchInput(value: string): void {
    this.searchDraft.set(value);
    this.store.scheduleSearch(value);
  }

  onApplyFilters(): void {
    this.store.category.set(this.categoryDraft());
    const min = this.minPriceDraft().trim();
    const max = this.maxPriceDraft().trim();
    const minN = min === '' ? undefined : Number(min);
    const maxN = max === '' ? undefined : Number(max);
    this.store.minPrice.set(minN !== undefined && !Number.isNaN(minN) ? minN : undefined);
    this.store.maxPrice.set(maxN !== undefined && !Number.isNaN(maxN) ? maxN : undefined);
    this.store.applyAdvancedFilters();
  }

  onCreate(input: ProductFormValue): void {
    this.store.create(input);
    this.createModalOpen.set(false);
  }

  closeCreateModal(): void {
    this.createModalOpen.set(false);
  }

  onEdit(product: Product): void {
    this.productToEdit.set(product);
    this.editModalOpen.set(true);
  }

  onUpdate(input: UpdateProductRequest): void {
    this.store.update(input);
    this.editModalOpen.set(false);
    this.productToEdit.set(null);
  }

  closeEditModal(): void {
    this.editModalOpen.set(false);
    this.productToEdit.set(null);
  }

  onRemove(id: string): void {
    this.store.remove(id);
  }
}
