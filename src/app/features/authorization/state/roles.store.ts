import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { RoleOutput } from '../../../core/api/authorization.types';
import { ApiError } from '../../../core/api/api-types';
import { RolesService } from '../services/roles.service';

@Injectable()
export class RolesStore {
  private readonly rolesService = inject(RolesService);
  private readonly router = inject(Router);

  readonly items = signal<RoleOutput[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly validationErrors = signal<Record<string, string[]> | null>(null);
  readonly totalCount = signal(0);
  readonly pageNumber = signal(1);
  readonly pageSize = signal(10);

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

  load(): void {
    this.loading.set(true);
    this.error.set(null);

    this.rolesService
      .list(this.pageNumber(), this.pageSize())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.items.set(response.data);
          this.totalCount.set(response.totalCount);
        },
        error: (apiError: ApiError) => {
          this.error.set(apiError.problem.detail ?? 'Erro ao carregar roles.');
        }
      });
  }

  setPage(pageNumber: number): void {
    this.pageNumber.set(pageNumber);
    this.load();
  }

  create(data: { name: string; description: string }): void {
    this.loading.set(true);
    this.error.set(null);
    this.validationErrors.set(null);

    this.rolesService
      .create(data)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.load(),
        error: (apiError: ApiError) => {
          if (apiError.status === 400 && apiError.problem.errors) {
            this.validationErrors.set(apiError.problem.errors);
          } else {
            this.error.set(apiError.problem.detail ?? 'Erro ao criar role.');
          }
        }
      });
  }

  remove(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.rolesService
      .remove(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.load(),
        error: (apiError: ApiError) => {
          this.error.set(apiError.problem.detail ?? 'Erro ao excluir role.');
        }
      });
  }
}
