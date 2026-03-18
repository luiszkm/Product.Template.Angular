import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../../core/api/api-client';
import { API_PATHS } from '../../../core/api/api-paths';
import { RoleOutput } from '../../../core/api/authorization.types';

@Injectable({ providedIn: 'root' })
export class UserRolesService {
  private readonly api = inject(ApiClient);

  getRoles(userId: string): Observable<RoleOutput[]> {
    return this.api.get<RoleOutput[]>(API_PATHS.authorization.userRoles.base(userId));
  }

  addRole(userId: string, roleId: string): Observable<void> {
    return this.api.post<void, { roleId: string }>(API_PATHS.authorization.userRoles.base(userId), {
      roleId
    });
  }

  removeRole(userId: string, roleId: string): Observable<void> {
    return this.api.delete<void>(API_PATHS.authorization.userRoles.remove(userId, roleId));
  }
}
