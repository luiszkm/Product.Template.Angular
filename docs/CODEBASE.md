# Estrutura do Codebase — Product Template Angular

Guia para agentes e desenvolvedores navegarem no projeto.

## Estrutura principal

```
src/app/
├── core/           # Auth, API, guards, interceptors, theme, i18n
├── features/      # Features por domínio (users, products, etc.)
├── layouts/       # Shell (sidebar, topbar)
shared/      # Componentes, pipes, directivas reutilizáveis
```

## Core (`src/app/core/`)

| Pasta | Conteúdo |
|-------|----------|
| `api/` | ApiClient, tipos (identity, authorization, tenants) |
| `auth/` | Login, register, AuthSessionService, OAuth callback |
| `guards/` | authGuard, roleGuard |
| `interceptors/` | refresh-token, retry-429, i18n |
| `theme/` | ThemeService (dark/light) |
| `i18n/` | I18nService, TranslatePipe |

## Features (`src/app/features/`)

Cada feature segue: `{feature}.routes.ts`, `pages/`, `components/`, `models/`, `services/`, `state/`

| Feature | Descrição |
|---------|-----------|
| `users` | Gestão de utilizadores |
| `authorization` | Roles, permissions, user-roles |
| `tenants` | Multi-tenant |
| `products` | CRUD produtos |
| `dashboard` | Métricas, gráficos |
| `orders` | Pedidos |

## Layouts (`src/app/layouts/`)

- `shell/` — ShellLayoutComponent (sidebar 240px colapsável, topbar 56px)
- Layout ERP: `docs/erp-layout-prompt.md`

## Shared (`src/app/shared/`)

- `components/` — badge, language-selector
- `pipes/`, `directives/` — utilitários

## Convenções de ficheiros

| Sufixo | Uso |
|--------|-----|
| `.page.ts` | Página de rota |
| `.component.ts` | Componente reutilizável |
| `.service.ts` | Service HTTP stateless |
| `.store.ts` | Estado com signals |
| `.model.ts` | Interfaces (Entity, CreateRequest, etc.) |
| `.guard.ts` | CanActivateFn |
| `.routes.ts` | Rotas da feature |

## Regras e documentação

- **Cursor:** `.cursor/rules/`, `AGENTS.md`
- **AI:** `.ai/rules/`, `.ai/design/`, `.ai/prompts/`
- **Layout ERP:** `docs/erp-layout-prompt.md`
- **Template / novo projeto:** `docs/TEMPLATE-SETUP.md`
