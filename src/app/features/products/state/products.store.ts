import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Product, ProductFilters } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { ApiError } from '../../../core/api/api-types';

@Injectable()
export class ProductsStore {
  private readonly productsService = inject(ProductsService);

  readonly items = signal<Product[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly validationErrors = signal<Record<string, string[]> | null>(null);
  readonly totalCount = signal<number>(0);
  readonly pageNumber = signal<number>(1);
  readonly pageSize = signal<number>(10);
  readonly search = signal<string>('');

  readonly vm = computed(() => ({
    items: this.items(),
    loading: this.loading(),
    error: this.error(),
    validationErrors: this.validationErrors(),
    totalCount: this.totalCount(),
    pageNumber: this.pageNumber(),
    pageSize: this.pageSize(),
    hasData: this.items().length > 0
  }));

  private readonly _resetPageEffect = effect(() => {
    const currentSearch = this.search();
    if (currentSearch.length === 0 || currentSearch.length >= 2) {
      this.pageNumber.set(1);
    }
  });

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    const filters: ProductFilters = {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
      search: this.search() || undefined
    };

    this.productsService
      .list(filters)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.items.set(response.data);
          this.totalCount.set(response.totalCount);
        },
        error: (apiError: ApiError) => {
          this.error.set(apiError.problem.detail ?? 'Erro ao carregar produtos.');
        }
      });
  }

  setSearch(search: string): void {
    this.search.set(search);
  }

  setPage(pageNumber: number): void {
    this.pageNumber.set(pageNumber);
    this.load();
  }

  create(input: { name: string; sku: string; price: number; stock: number }): void {
    this.loading.set(true);
    this.error.set(null);
    this.validationErrors.set(null);

    this.productsService
      .create(input)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.load(),
        error: (apiError: ApiError) => {
          if (apiError.status === 400 && apiError.problem.errors) {
            this.validationErrors.set(apiError.problem.errors);
          } else {
            this.error.set(apiError.problem.detail ?? 'Erro ao criar produto.');
          }
        }
      });
  }

  remove(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.productsService
      .remove(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.load(),
        error: (apiError: ApiError) => {
          this.error.set(apiError.problem.detail ?? 'Erro ao remover produto.');
        }
      });
  }
}
