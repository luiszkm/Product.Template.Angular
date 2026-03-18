import { environment } from '../../../environments/environment';

const v = environment.apiVersions;

/**
 * Paths versionados por módulo.
 * A base URL (apiUrl) não contém versão; cada módulo define a sua.
 */
export const API_PATHS = {
  products: {
    base: `/${v.products}/products`,
    byId: (id: string) => `/${v.products}/products/${id}`,
  },
  tenants: {
    base: `/${v.tenants}/tenants`,
    byId: (id: number) => `/${v.tenants}/tenants/${id}`,
  },
  identity: {
    base: `/${v.identity}/identity`,
    byId: (id: string) => `/${v.identity}/identity/${id}`,
    providers: `/${v.identity}/identity/providers`,
    login: `/${v.identity}/identity/login`,
    refresh: `/${v.identity}/identity/refresh`,
    register: `/${v.identity}/identity/register`,
    externalLogin: `/${v.identity}/identity/external-login`,
    confirmEmail: (id: string) => `/${v.identity}/identity/${id}/confirm-email`,
    roles: (id: string) => `/${v.identity}/identity/${id}/roles`,
  },
  authorization: {
    roles: {
      base: `/${v.authorization}/authorization/roles`,
      byId: (id: string) => `/${v.authorization}/authorization/roles/${id}`,
      permissions: (id: string) => `/${v.authorization}/authorization/roles/${id}/permissions`,
      addPermission: (roleId: string) => `/${v.authorization}/authorization/roles/${roleId}/permissions`,
      removePermission: (roleId: string, permissionId: string) =>
        `/${v.authorization}/authorization/roles/${roleId}/permissions/${permissionId}`,
    },
    permissions: {
      base: `/${v.authorization}/authorization/permissions`,
      byId: (id: string) => `/${v.authorization}/authorization/permissions/${id}`,
    },
    userRoles: {
      base: (userId: string) => `/${v.authorization}/authorization/users/${userId}/roles`,
      remove: (userId: string, roleId: string) =>
        `/${v.authorization}/authorization/users/${userId}/roles/${roleId}`,
    },
  },
} as const;
