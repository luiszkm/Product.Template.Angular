import { Routes } from '@angular/router';
import { TenantsPage } from './pages/tenants.page';
import { TenantDetailPage } from './pages/tenant-detail.page';

export const TENANTS_ROUTES: Routes = [
  { path: '', component: TenantsPage },
  { path: ':id', component: TenantDetailPage }
];
