import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../../core/api/api-client';
import { PaginatedResponse } from '../../../core/api/api-types';
import { RoleOutput, RoleWithPermissionsOutput } from '../../../core/api/authorization.types';

@Injectable({ providedIn: 'root' })
export class RolesService {
  private readonly api = inject(ApiClient);

  list(pageNumber: number, pageSize: number): Observable<PaginatedResponse<RoleOutput>> {
    return this.api.get<PaginatedResponse<RoleOutput>>('/authorization/roles', {
      params: { pageNumber, pageSize }
    });
  }

  get(id: string): Observable<RoleWithPermissionsOutput> {
    return this.api.get<RoleWithPermissionsOutput>(`/authorization/roles/${id}`);
  }

  create(data: { name: string; description: string }): Observable<RoleOutput> {
    return this.api.post<RoleOutput, typeof data>('/authorization/roles', data);
  }

  update(id: string, data: { roleId: string; name: string; description: string }): Observable<RoleOutput> {
    return this.api.put<RoleOutput, typeof data>(`/authorization/roles/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.api.delete<void>(`/authorization/roles/${id}`);
  }

  getPermissions(id: string): Observable<RoleWithPermissionsOutput> {
    return this.api.get<RoleWithPermissionsOutput>(`/authorization/roles/${id}/permissions`);
  }

  addPermission(roleId: string, permissionId: string): Observable<void> {
    return this.api.post<void, { permissionId: string }>(
      `/authorization/roles/${roleId}/permissions`,
      { permissionId }
    );
  }

  removePermission(roleId: string, permissionId: string): Observable<void> {
    return this.api.delete<void>(`/authorization/roles/${roleId}/permissions/${permissionId}`);
  }
}
