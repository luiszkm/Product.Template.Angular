import { Routes } from '@angular/router';
import { ShellLayoutComponent } from './layouts/shell/shell-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { LoginPage } from './core/auth/login.page';
import { OAuthCallbackPage } from './core/auth/oauth-callback.page';

export const routes: Routes = [
  { path: 'login',         component: LoginPage },
  { path: 'auth/callback', component: OAuthCallbackPage },
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
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      {
        path: 'products',
        title: 'Produtos',
        loadChildren: () => import('./features/products/products.routes').then(m => m.PRODUCTS_ROUTES)
      },
      {
        path: 'users',
        title: 'Usuários',
        canActivate: [roleGuard],
        data: { requiredPermission: 'users.read' },
        loadChildren: () => import('./features/users/users.routes').then(m => m.USERS_ROUTES)
      },
      {
        path: 'orders',
        title: 'Pedidos',
        loadChildren: () => import('./features/orders/orders.routes').then(m => m.ORDERS_ROUTES)
      }
    ]
  },
  { path: '**', redirectTo: 'not-found' }
];
