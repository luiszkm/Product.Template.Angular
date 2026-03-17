import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { TenantOutput } from '../../../core/api/tenants.types';
import { ApiError } from '../../../core/api/api-types';
import { TenantsService } from '../services/tenants.service';

@Injectable()
export class TenantsStore {
  private readonly tenantsService = inject(TenantsService);
  private readonly router = inject(Router);

  readonly items = signal<TenantOutput[]>([]);
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

    this.tenantsService
      .list(this.pageNumber(), this.pageSize())
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          this.items.set(response.data);
          this.totalCount.set(response.totalCount);
        },
        error: (apiError: ApiError) => {
          this.error.set(apiError.problem.detail ?? 'Erro ao carregar tenants.');
        }
      });
  }

  setPage(pageNumber: number): void {
    this.pageNumber.set(pageNumber);
    this.load();
  }

  create(data: {
    tenantId: number;
    tenantKey: string;
    displayName: string;
    contactEmail?: string;
    isolationMode: 'SharedDb' | 'SchemaPerTenant' | 'DedicatedDb';
  }): void {
    this.loading.set(true);
    this.error.set(null);
    this.validationErrors.set(null);

    this.tenantsService
      .create(data)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.load(),
        error: (apiError: ApiError) => {
          if (apiError.status === 400 && apiError.problem.errors) {
            this.validationErrors.set(apiError.problem.errors);
          } else {
            this.error.set(apiError.problem.detail ?? 'Erro ao criar tenant.');
          }
        }
      });
  }

  remove(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.tenantsService
      .remove(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.load(),
        error: (apiError: ApiError) => {
          this.error.set(apiError.problem.detail ?? 'Erro ao desativar tenant.');
        }
      });
  }
}
