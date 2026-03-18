import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../../core/api/api-client';
import { API_PATHS } from '../../../core/api/api-paths';
import { PaginatedResponse } from '../../../core/api/api-types';
import { UserOutput } from '../../../core/api/identity.types';

export interface UserFilters {
  pageNumber: number;
  pageSize: number;
  searchTerm?: string;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly api = inject(ApiClient);

  list(filters: UserFilters): Observable<PaginatedResponse<UserOutput>> {
    const params: Record<string, string | number | boolean> = {
      pageNumber: filters.pageNumber,
      pageSize: filters.pageSize
    };
    if (filters.searchTerm) params['searchTerm'] = filters.searchTerm;
    if (filters.sortBy) params['sortBy'] = filters.sortBy;
    if (filters.sortDirection) params['sortDirection'] = filters.sortDirection;
    return this.api.get<PaginatedResponse<UserOutput>>(API_PATHS.identity.base, { params });
  }

  get(id: string): Observable<UserOutput> {
    return this.api.get<UserOutput>(API_PATHS.identity.byId(id));
  }

  update(id: string, data: { userId: string; firstName: string; lastName: string }): Observable<UserOutput> {
    return this.api.put<UserOutput, typeof data>(API_PATHS.identity.byId(id), data);
  }

  remove(id: string): Observable<void> {
    return this.api.delete<void>(API_PATHS.identity.byId(id));
  }

  getRoles(id: string): Observable<string[]> {
    return this.api.get<string[]>(API_PATHS.identity.roles(id));
  }
}
