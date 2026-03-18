import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../../core/api/api-client';
import { API_PATHS } from '../../../core/api/api-paths';
import { PaginatedResponse } from '../../../core/api/api-types';
import { TenantOutput, IsolationMode } from '../../../core/api/tenants.types';

@Injectable({ providedIn: 'root' })
export class TenantsService {
  private readonly api = inject(ApiClient);

  list(pageNumber: number, pageSize: number): Observable<PaginatedResponse<TenantOutput>> {
    return this.api.get<PaginatedResponse<TenantOutput>>(API_PATHS.tenants.base, {
      params: { pageNumber, pageSize }
    });
  }

  get(id: number): Observable<TenantOutput> {
    return this.api.get<TenantOutput>(API_PATHS.tenants.byId(id));
  }

  create(data: {
    tenantId: number;
    tenantKey: string;
    displayName: string;
    contactEmail?: string;
    isolationMode: IsolationMode;
  }): Observable<TenantOutput> {
    return this.api.post<TenantOutput, typeof data>(API_PATHS.tenants.base, data);
  }

  update(
    id: number,
    data: { tenantId: number; displayName: string; contactEmail?: string }
  ): Observable<TenantOutput> {
    return this.api.put<TenantOutput, typeof data>(API_PATHS.tenants.byId(id), data);
  }

  remove(id: number): Observable<void> {
    return this.api.delete<void>(API_PATHS.tenants.byId(id));
  }
}
