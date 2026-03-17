import { Injectable, computed, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { UserOutput } from '../../../core/api/identity.types';
import { RoleOutput } from '../../../core/api/authorization.types';
import { ApiError } from '../../../core/api/api-types';
import { UsersService } from '../services/users.service';
import { UserRolesService } from '../../authorization/services/user-roles.service';
import { RolesService } from '../../authorization/services/roles.service';

@Injectable()
export class UserDetailStore {
  private readonly usersService = inject(UsersService);
  private readonly userRolesService = inject(UserRolesService);
  private readonly rolesService = inject(RolesService);
  private readonly router = inject(Router);

  readonly user = signal<UserOutput | null>(null);
  readonly roles = signal<RoleOutput[]>([]);
  readonly allRoles = signal<RoleOutput[]>([]);
  readonly loading = signal(false);
  readonly loadingRoles = signal(false);
  readonly error = signal<string | null>(null);
  readonly validationErrors = signal<Record<string, string[]> | null>(null);

  readonly vm = computed(() => ({
    user: this.user(),
    roles: this.roles(),
    allRoles: this.allRoles(),
    loading: this.loading(),
    loadingRoles: this.loadingRoles(),
    error: this.error(),
    validationErrors: this.validationErrors()
  }));

  load(id: string): void {
    this.loading.set(true);
    this.error.set(null);
    this.user.set(null);

    this.usersService
      .get(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (u) => this.user.set(u),
        error: (apiError: ApiError) => {
          this.error.set(apiError.problem.detail ?? 'Erro ao carregar usuário.');
          if (apiError.status === 404) {
            this.router.navigate(['/not-found']);
          }
        }
      });
  }

  loadRoles(userId: string): void {
    this.loadingRoles.set(true);
    this.userRolesService
      .getRoles(userId)
      .pipe(finalize(() => this.loadingRoles.set(false)))
      .subscribe({
        next: (r) => this.roles.set(r),
        error: () => this.roles.set([])
      });
  }

  loadAllRoles(): void {
    this.rolesService.list(1, 100).subscribe({
      next: (res) => this.allRoles.set(res.data),
      error: () => this.allRoles.set([])
    });
  }

  addRole(userId: string, roleId: string): void {
    this.userRolesService.addRole(userId, roleId).subscribe({
      next: () => this.loadRoles(userId),
      error: () => {}
    });
  }

  removeRole(userId: string, roleId: string): void {
    this.userRolesService.removeRole(userId, roleId).subscribe({
      next: () => this.loadRoles(userId),
      error: () => {}
    });
  }

  update(id: string, data: { firstName: string; lastName: string }): void {
    this.loading.set(true);
    this.error.set(null);
    this.validationErrors.set(null);

    this.usersService
      .update(id, { userId: id, firstName: data.firstName, lastName: data.lastName })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (u) => this.user.set(u),
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
        next: () => this.router.navigate(['/users']),
        error: (apiError: ApiError) => {
          this.error.set(apiError.problem.detail ?? 'Erro ao excluir usuário.');
        }
      });
  }
}
