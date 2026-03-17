/** Contratos da API Authorization conforme frontend-integration-guide.md */

export interface RoleOutput {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface PermissionOutput {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface RoleWithPermissionsOutput extends RoleOutput {
  permissions: PermissionOutput[];
}
