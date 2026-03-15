# Regra 08 - Segurança

## Autenticação / autorização
- JWT armazenado em `localStorage` (access) e `sessionStorage` (refresh).
- Nunca confiar apenas em ocultar UI para autorização — backend sempre valida.
- `authGuard` valida presença de token; `roleGuard` valida role/permission do JWT.
- Usar `APP_INITIALIZER` para restaurar sessão do storage ao carregar a app.

## RBAC — Controle de acesso baseado em roles

### Roles e permissões do sistema

| Role | Capacidades |
|------|-------------|
| `Admin` | Acesso total |
| `Manager` | Pode ler dados de usuários (`users.read`) |
| `User` | Acessa e edita apenas o próprio perfil |

| Permission | Quem tem | O que permite |
|-----------|----------|---------------|
| `users.read` | Admin, ou claim granular | Listar e ler usuários/roles |
| `users.manage` | Admin, ou claim granular | Criar, editar, deletar usuários e roles |

### Proteger rotas por permission

```ts
// app.routes.ts
{
  path: 'users',
  canActivate: [authGuard, roleGuard],
  data: { requiredPermission: 'users.read' },
  loadChildren: () => import('./features/users/users.routes')
}
```

### Ocultar elementos de UI condicionalmente

```ts
// No componente — usar AuthSessionService
readonly canManageUsers = computed(() =>
  this.session.isAdmin() || this.session.hasPermission('users.manage')
);
```

```html
@if (canManageUsers()) {
  <button (click)="onDeleteUser(id)">Remover</button>
}
```

> ⚠️ Ocultar UI é apenas UX — o backend valida todas as permissões independentemente.

### Owner-check (UserOnly policy)

Endpoints marcados como `UserOnly` só permitem acesso ao próprio usuário ou ao Admin:

```ts
// Antes de exibir/editar dados de um usuário
const canAccess = this.session.isAdmin()
  || this.session.userId() === targetUserId;
```

## Multi-tenant
- Nunca enviar requisição sem `X-Tenant` (o `ApiClient` injeta automaticamente).
- Não cachear dados sensíveis sem segmentação por tenant/usuário.
- `AuthSessionService.setTenant()` chamado no `APP_INITIALIZER` com `environment.tenantSlug`.

## Refresh Token
- O `refresh-token.interceptor` intercepta `401` e chama `POST /identity/refresh`.
- Token rotation: cada uso do refresh token gera um novo par access+refresh.
- Em caso de falha do refresh: `session.clear()` + redirect para `/login`.
- Não armazenar refresh token em `localStorage` — usar `sessionStorage`.

## Dados sensíveis
- Não logar token completo (apenas os primeiros 10 caracteres para debug).
- Não persistir dados críticos em texto puro.
- Tratar erros sem expor stack trace ao usuário.
- `X-Correlation-ID` pode ser exibido ao usuário para reporte de suporte.

## Input/output
- Validar formulários no frontend (UX) e backend (segurança).
- Usar bindings Angular seguros — nunca `innerHTML` com conteúdo externo não sanitizado.
