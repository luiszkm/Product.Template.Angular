import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../../core/api/api-client';
import { PaginatedResponse } from '../../../core/api/api-types';
import { TenantOutput, IsolationMode } from '../../../core/api/tenants.types';

@Injectable({ providedIn: 'root' })
export class TenantsService {
  private readonly api = inject(ApiClient);

  list(pageNumber: number, pageSize: number): Observable<PaginatedResponse<TenantOutput>> {
    return this.api.get<PaginatedResponse<TenantOutput>>('/tenants', {
      params: { pageNumber, pageSize }
    });
  }

  get(id: number): Observable<TenantOutput> {
    return this.api.get<TenantOutput>(`/tenants/${id}`);
  }

  create(data: {
    tenantId: number;
    tenantKey: string;
    displayName: string;
    contactEmail?: string;
    isolationMode: IsolationMode;
  }): Observable<TenantOutput> {
    return this.api.post<TenantOutput, typeof data>('/tenants', data);
  }

  update(
    id: number,
    data: { tenantId: number; displayName: string; contactEmail?: string }
  ): Observable<TenantOutput> {
    return this.api.put<TenantOutput, typeof data>(`/tenants/${id}`, data);
  }

  remove(id: number): Observable<void> {
    return this.api.delete<void>(`/tenants/${id}`);
  }
}
