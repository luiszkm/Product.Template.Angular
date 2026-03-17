import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../../core/api/api-client';
import { RoleOutput } from '../../../core/api/authorization.types';

@Injectable({ providedIn: 'root' })
export class UserRolesService {
  private readonly api = inject(ApiClient);

  getRoles(userId: string): Observable<RoleOutput[]> {
    return this.api.get<RoleOutput[]>(`/authorization/users/${userId}/roles`);
  }

  addRole(userId: string, roleId: string): Observable<void> {
    return this.api.post<void, { roleId: string }>(`/authorization/users/${userId}/roles`, {
      roleId
    });
  }

  removeRole(userId: string, roleId: string): Observable<void> {
    return this.api.delete<void>(`/authorization/users/${userId}/roles/${roleId}`);
  }
}
