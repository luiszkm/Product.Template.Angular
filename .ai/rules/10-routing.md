# Regra 10 — Routing

## Princípios gerais
- Toda feature deve ser lazy loaded com `loadChildren`.
- Rotas públicas (login, callback OAuth) ficam fora do `ShellLayoutComponent`.
- Rotas protegidas ficam sob o layout shell com `canActivate: [authGuard]`.
- Usar `withComponentInputBinding()` para vincular params de rota a `@Input` do componente.
- Usar `withViewTransitions()` para transições suaves entre páginas.
- Usar `withPreloading(PreloadAllModules)` para pré-carregar chunks após carga inicial.
- Usar `withInMemoryScrolling({ scrollPositionRestoration: 'top' })`.

## Estrutura de rotas obrigatória

```ts
// app.routes.ts
export const routes: Routes = [
  { path: 'login',           component: LoginPage },
  { path: 'auth/callback',   component: OAuthCallbackPage }, // Microsoft OAuth
  { path: 'unauthorized',    loadComponent: () => import('./core/errors/unauthorized.page') },
  { path: 'not-found',       loadComponent: () => import('./core/errors/not-found.page') },
  {
    path: '',
    component: ShellLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'products' },
      {
        path: 'products',
        loadChildren: () => import('./features/products/products.routes').then(m => m.PRODUCTS_ROUTES)
      }
    ]
  },
  { path: '**', redirectTo: 'not-found' }
];
```

## provideRouter obrigatório

```ts
// app.config.ts
provideRouter(
  routes,
  withPreloading(PreloadAllModules),
  withComponentInputBinding(),
  withViewTransitions(),
  withInMemoryScrolling({ scrollPositionRestoration: 'top' })
)
```

## Route data para RBAC

Rotas protegidas por role/permission devem declarar `data` e usar guard dedicado:

```ts
{
  path: 'users',
  loadChildren: () => import('./features/users/users.routes').then(m => m.USERS_ROUTES),
  canActivate: [authGuard, roleGuard],
  data: { requiredPermission: 'users.read' }
}
```

## Guards obrigatórios

| Guard | Arquivo | Propósito |
|-------|---------|-----------|
| `authGuard` | `core/guards/auth.guard.ts` | Valida token presente |
| `roleGuard` | `core/guards/role.guard.ts` | Valida role ou permission no JWT |

### roleGuard padrão

```ts
export const roleGuard: CanActivateFn = (route) => {
  const session = inject(AuthSessionService);
  const router = inject(Router);
  const required = route.data['requiredPermission'] as string | undefined;
  const requiredRole = route.data['requiredRole'] as string | undefined;

  if (required && !session.hasPermission(required)) {
    return router.createUrlTree(['/unauthorized']);
  }
  if (requiredRole && !session.hasRole(requiredRole)) {
    return router.createUrlTree(['/unauthorized']);
  }
  return true;
};
```

## Callback OAuth

A rota `/auth/callback` deve ser pública e processar o `?code=` retornado pelo Azure AD:

```ts
{ path: 'auth/callback', component: OAuthCallbackPage }
```

A página lê `ActivatedRoute.queryParams`, chama `POST /identity/external-login` e redireciona.

## Title Strategy

Definir título de página via `Route.title` ou `TitleStrategy` customizada:

```ts
{ path: 'products', title: 'Produtos', loadChildren: ... }
```

## Antipadrões proibidos
- `loadComponent` em rotas que têm filhos (usar `loadChildren`).
- Guard que faz requisição HTTP a cada navegação sem cache de sessão.
- Rotas sem wildcard `**` → sempre definir fallback.
- Não usar `RouterModule.forRoot()` — usar `provideRouter()` funcional.

