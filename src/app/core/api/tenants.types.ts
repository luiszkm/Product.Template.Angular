/** Contratos da API Tenants conforme frontend-integration-guide.md */

export type IsolationMode = 'SharedDb' | 'SchemaPerTenant' | 'DedicatedDb';

export interface TenantOutput {
  tenantId: number;
  tenantKey: string;
  displayName: string;
  contactEmail: string | null;
  isActive: boolean;
  isolationMode: IsolationMode;
  createdAt: string;
}
