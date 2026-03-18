import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../../core/api/api-client';
import { API_PATHS } from '../../../core/api/api-paths';
import { PaginatedResponse } from '../../../core/api/api-types';
import { PermissionOutput } from '../../../core/api/authorization.types';

@Injectable({ providedIn: 'root' })
export class PermissionsService {
  private readonly api = inject(ApiClient);

  list(pageNumber: number, pageSize: number): Observable<PaginatedResponse<PermissionOutput>> {
    return this.api.get<PaginatedResponse<PermissionOutput>>(API_PATHS.authorization.permissions.base, {
      params: { pageNumber, pageSize }
    });
  }

  create(data: { name: string; description: string }): Observable<PermissionOutput> {
    return this.api.post<PermissionOutput, typeof data>(API_PATHS.authorization.permissions.base, data);
  }

  update(
    id: string,
    data: { permissionId: string; name: string; description: string }
  ): Observable<PermissionOutput> {
    return this.api.put<PermissionOutput, typeof data>(API_PATHS.authorization.permissions.byId(id), data);
  }

  remove(id: string): Observable<void> {
    return this.api.delete<void>(API_PATHS.authorization.permissions.byId(id));
  }
}
