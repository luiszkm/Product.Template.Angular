import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../../core/api/api-client';
import { PaginatedResponse } from '../../../core/api/api-types';
import { PermissionOutput } from '../../../core/api/authorization.types';

@Injectable({ providedIn: 'root' })
export class PermissionsService {
  private readonly api = inject(ApiClient);

  list(pageNumber: number, pageSize: number): Observable<PaginatedResponse<PermissionOutput>> {
    return this.api.get<PaginatedResponse<PermissionOutput>>('/authorization/permissions', {
      params: { pageNumber, pageSize }
    });
  }

  create(data: { name: string; description: string }): Observable<PermissionOutput> {
    return this.api.post<PermissionOutput, typeof data>('/authorization/permissions', data);
  }

  update(
    id: string,
    data: { permissionId: string; name: string; description: string }
  ): Observable<PermissionOutput> {
    return this.api.put<PermissionOutput, typeof data>(`/authorization/permissions/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.api.delete<void>(`/authorization/permissions/${id}`);
  }
}
