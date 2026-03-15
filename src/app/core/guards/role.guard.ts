import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthSessionService } from '../auth/auth-session.service';

/**
 * Guard de autorização por role/permission.
 * Usar em conjunto com authGuard.
 *
 * Uso nas rotas:
 * {
 *   path: 'users',
 *   canActivate: [authGuard, roleGuard],
 *   data: { requiredPermission: 'users.read' }
 *         // ou: requiredRole: 'Admin'
 * }
 */
export const roleGuard: CanActivateFn = (route) => {
  const session = inject(AuthSessionService);
  const router = inject(Router);

  // Admin tem acesso total
  if (session.isAdmin()) return true;

  const requiredPermission = route.data?.['requiredPermission'] as string | undefined;
  const requiredRole = route.data?.['requiredRole'] as string | undefined;

  if (requiredPermission && !session.hasPermission(requiredPermission)) {
    return router.createUrlTree(['/unauthorized']);
  }

  if (requiredRole && !session.hasRole(requiredRole)) {
    return router.createUrlTree(['/unauthorized']);
  }

  return true;
};

