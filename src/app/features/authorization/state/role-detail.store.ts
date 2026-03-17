import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { RoleWithPermissionsOutput } from '../../../core/api/authorization.types';
import { ApiError } from '../../../core/api/api-types';
import { RolesService } from '../services/roles.service';
import { PermissionsService } from '../services/permissions.service';
import { PermissionOutput } from '../../../core/api/authorization.types';

@Injectable()
export class RoleDetailStore {
  private readonly rolesService = inject(RolesService);
  private readonly permissionsService = inject(PermissionsService);
  private readonly router = inject(Router);

  readonly role = signal<RoleWithPermissionsOutput | null>(null);
  readonly allPermissions = signal<PermissionOutput[]>([]);
  readonly loading = signal(false);
  readonly loadingPermissions = signal(false);
  readonly error = signal<string | null>(null);

  readonly vm = computed(() => ({
    role: this.role(),
    allPermissions: this.allPermissions(),
    loading: this.loading(),
    loadingPermissions: this.loadingPermissions(),
    error: this.error()
  }));

  load(id: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.role.set(null);

    this.rolesService
      .get(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (r) => this.role.set(r),
        error: (apiError: ApiError) => {
          this.error.set(apiError.problem.detail ?? 'Erro ao carregar role.');
          if (apiError.status === 404) {
            this.router.navigate(['/not-found']);
          }
        }
      });
  }

  loadAllPermissions(): void {
    this.loadingPermissions.set(true);
    this.permissionsService
      .list(1, 100)
      .pipe(finalize(() => this.loadingPermissions.set(false)))
      .subscribe({
        next: (res) => this.allPermissions.set(res.data),
        error: () => this.allPermissions.set([])
      });
  }

  addPermission(roleId: string, permissionId: string): void {
    this.rolesService.addPermission(roleId, permissionId).subscribe({
      next: () => this.load(roleId),
      error: () => {}
    });
  }

  removePermission(roleId: string, permissionId: string): void {
    this.rolesService.removePermission(roleId, permissionId).subscribe({
      next: () => this.load(roleId),
      error: () => {}
    });
  }

  remove(roleId: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.rolesService
      .remove(roleId)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.router.navigate(['/roles']),
        error: (apiError: ApiError) => {
          this.error.set(apiError.problem.detail ?? 'Erro ao excluir role.');
        }
      });
  }
}
