import { Routes } from '@angular/router';
import { RolesPage } from './pages/roles.page';
import { RoleDetailPage } from './pages/role-detail.page';

export const AUTHORIZATION_ROUTES: Routes = [
  { path: '', component: RolesPage },
  { path: ':id', component: RoleDetailPage }
];
