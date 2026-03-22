import { DestroyRef, Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { Product, ProductFilters, UpdateProductRequest } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { ApiError } from '../../../core/api/api-types';

@Injectable()
export class ProductsStore {
  private readonly productsService = inject(ProductsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchSubject = new Subject<string>();

  readonly items = signal<Product[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly validationErrors = signal<Record<string, string[]> | null>(null);
  readonly totalCount = signal<number>(0);
  readonly pageNumber = signal<number>(1);
  readonly pageSize = signal<number>(10);
  readonly search = signal<string>('');
  readonly category = signal<string>('');
  readonly minPrice = signal<number | undefined>(undefined);
  readonly maxPrice = signal<number | undefined>(undefined);

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

  constructor() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((term) => {
        this.search.set(term);
        this.pageNumber.set(1);
        this.load();
      });
  }

  /** Atualiza a pesquisa com debounce (chamar a partir do campo de busca). */
  scheduleSearch(term: string): void {
    this.searchSubject.next(term);
  }

  /** Aplica categoria e intervalo de preço e recarrega a lista. */
  applyAdvancedFilters(): void {
    this.pageNumber.set(1);
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    const filters: ProductFilters = {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
      search: this.search() || undefined,
      category: this.category().trim() || undefined,
      minPrice: this.minPrice(),
      maxPrice: this.maxPrice()
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

  update(input: UpdateProductRequest): void {
    this.loading.set(true);
    this.error.set(null);
    this.validationErrors.set(null);

    this.productsService
      .update(input)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.load(),
        error: (apiError: ApiError) => {
          if (apiError.status === 400 && apiError.problem.errors) {
            this.validationErrors.set(apiError.problem.errors);
          } else {
            this.error.set(apiError.problem.detail ?? 'Erro ao atualizar produto.');
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
