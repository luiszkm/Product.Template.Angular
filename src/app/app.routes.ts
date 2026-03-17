import { Routes } from '@angular/router';
import { ShellLayoutComponent } from './layouts/shell/shell-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { LoginPage } from './core/auth/login.page';
import { RegisterPage } from './core/auth/register.page';
import { OAuthCallbackPage } from './core/auth/oauth-callback.page';
import { ConfirmEmailPage } from './core/auth/confirm-email.page';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'auth/callback', component: OAuthCallbackPage },
  { path: 'auth/confirm-email/:id', component: ConfirmEmailPage },
  {
    path: 'unauthorized',
    loadComponent: () => import('./core/errors/unauthorized.page').then(m => m.UnauthorizedPage)
  },
  {
    path: 'not-found',
    loadComponent: () => import('./core/errors/not-found.page').then(m => m.NotFoundPage)
  },
  {
    path: '',
    component: ShellLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'users' },
      {
        path: 'users',
        title: 'Usuários',
        canActivate: [roleGuard],
        data: { requiredPermission: 'identity.user.read' },
        loadChildren: () => import('./features/users/users.routes').then(m => m.USERS_ROUTES)
      },
      {
        path: 'roles',
        title: 'Roles',
        canActivate: [roleGuard],
        data: { requiredPermission: 'authorization.role.read' },
        loadChildren: () =>
          import('./features/authorization/authorization.routes').then(m => m.AUTHORIZATION_ROUTES)
      },
      {
        path: 'permissions',
        title: 'Permissões',
        canActivate: [roleGuard],
        data: { requiredPermission: 'authorization.permission.read' },
        loadComponent: () =>
          import('./features/authorization/pages/permissions.page').then(m => m.PermissionsPage)
      },
      {
        path: 'tenants',
        title: 'Tenants',
        canActivate: [roleGuard],
        data: { requiredPermission: 'tenants.read' },
        loadChildren: () =>
          import('./features/tenants/tenants.routes').then(m => m.TENANTS_ROUTES)
      }
    ]
  },
  { path: '**', redirectTo: 'not-found' }
];
