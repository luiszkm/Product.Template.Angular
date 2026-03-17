import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { UserOutput } from '../../../core/api/identity.types';
import { ApiError } from '../../../core/api/api-types';
import { UsersService, UserFilters } from '../services/users.service';

@Injectable()
export class UsersStore {
  private readonly usersService = inject(UsersService);

  readonly items = signal<UserOutput[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly validationErrors = signal<Record<string, string[]> | null>(null);
  readonly totalCount = signal(0);
  readonly pageNumber = signal(1);
  readonly pageSize = signal(10);
  readonly searchTerm = signal('');
  readonly sortBy = signal('');
  readonly sortDirection = signal<'asc' | 'desc'>('asc');

  readonly vm = computed(() => ({
    items: this.items(),
    loading: this.loading(),
    error: this.error(),
    validationErrors: this.validationErrors(),
    totalCount: this.totalCount(),
    pageNumber: this.pageNumber(),
    pageSize: this.pageSize(),
    searchTerm: this.searchTerm(),
    hasData: this.items().length > 0
  }));

  private readonly _resetPageEffect = effect(() => {
    const currentSearch = this.searchTerm();
    if (currentSearch.length === 0 || currentSearch.length >= 2) {
      this.pageNumber.set(1);
    }
  });

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    const filters: UserFilters = {
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
      searchTerm: this.searchTerm() || undefined,
      sortBy: this.sortBy() || undefined,
      sortDirection: this.sortDirection()
    };

    this.usersService
      .list(filters)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.items.set(response.data);
          this.totalCount.set(response.totalCount);
        },
        error: (apiError: ApiError) => {
          this.error.set(apiError.problem.detail ?? 'Erro ao carregar usuários.');
        }
      });
  }

  setSearch(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
  }

  setPage(pageNumber: number): void {
    this.pageNumber.set(pageNumber);
    this.load();
  }

  setSort(sortBy: string, sortDirection: 'asc' | 'desc'): void {
    this.sortBy.set(sortBy);
    this.sortDirection.set(sortDirection);
    this.pageNumber.set(1);
    this.load();
  }

  update(id: string, data: { firstName: string; lastName: string }): void {
    this.loading.set(true);
    this.error.set(null);
    this.validationErrors.set(null);

    this.usersService
      .update(id, { userId: id, firstName: data.firstName, lastName: data.lastName })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.load(),
        error: (apiError: ApiError) => {
          if (apiError.status === 400 && apiError.problem.errors) {
            this.validationErrors.set(apiError.problem.errors);
          } else {
            this.error.set(apiError.problem.detail ?? 'Erro ao atualizar usuário.');
          }
        }
      });
  }

  remove(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.usersService
      .remove(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.load(),
        error: (apiError: ApiError) => {
          this.error.set(apiError.problem.detail ?? 'Erro ao excluir usuário.');
        }
      });
  }
}
