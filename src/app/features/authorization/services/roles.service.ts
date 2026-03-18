import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../../core/api/api-client';
import { API_PATHS } from '../../../core/api/api-paths';
import { PaginatedResponse } from '../../../core/api/api-types';
import { RoleOutput, RoleWithPermissionsOutput } from '../../../core/api/authorization.types';

@Injectable({ providedIn: 'root' })
export class RolesService {
  private readonly api = inject(ApiClient);

  list(pageNumber: number, pageSize: number): Observable<PaginatedResponse<RoleOutput>> {
    return this.api.get<PaginatedResponse<RoleOutput>>(API_PATHS.authorization.roles.base, {
      params: { pageNumber, pageSize }
    });
  }

  get(id: string): Observable<RoleWithPermissionsOutput> {
    return this.api.get<RoleWithPermissionsOutput>(API_PATHS.authorization.roles.byId(id));
  }

  create(data: { name: string; description: string }): Observable<RoleOutput> {
    return this.api.post<RoleOutput, typeof data>(API_PATHS.authorization.roles.base, data);
  }

  update(id: string, data: { roleId: string; name: string; description: string }): Observable<RoleOutput> {
    return this.api.put<RoleOutput, typeof data>(API_PATHS.authorization.roles.byId(id), data);
  }

  remove(id: string): Observable<void> {
    return this.api.delete<void>(API_PATHS.authorization.roles.byId(id));
  }

  getPermissions(id: string): Observable<RoleWithPermissionsOutput> {
    return this.api.get<RoleWithPermissionsOutput>(API_PATHS.authorization.roles.permissions(id));
  }

  addPermission(roleId: string, permissionId: string): Observable<void> {
    return this.api.post<void, { permissionId: string }>(
      API_PATHS.authorization.roles.addPermission(roleId),
      { permissionId }
    );
  }

  removePermission(roleId: string, permissionId: string): Observable<void> {
    return this.api.delete<void>(API_PATHS.authorization.roles.removePermission(roleId, permissionId));
  }
}
