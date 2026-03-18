# Cursor Rules — Product Template Angular

Regras aplicadas automaticamente pelo Cursor Agent com base no tipo de ficheiro.

## Regras

| Ficheiro | Aplicação | Descrição |
|----------|-----------|-----------|
| `angular-global.mdc` | Sempre | Regras globais Angular (standalone, OnPush, inject, signals) |
| `design-system.mdc` | Pages/Components CSS/HTML | Tokens ERP, classes .btn, estrutura de páginas |
| `angular-pages.mdc` | *.page.ts, *.page.html | Páginas, store, vm, RBAC |
| `angular-components.mdc` | *.component.ts/html | Componentes, signals, acessibilidade |
| `angular-stores.mdc` | *.store.ts | Estado, vm computed, validationErrors |
| `angular-services.mdc` | *.service.ts | Services HTTP, ApiClient, idempotencyKey |
| `angular-forms.mdc` | *-form*.ts/html | Formulários reativos, apiErrors, fieldError |
| `angular-routing.mdc` | *.routes.ts, app.routes.ts | Lazy loading, guards, title |
| `angular-models.mdc` | *.model.ts | Entity, CreateRequest, UpdateRequest |
| `angular-tests.mdc` | *.spec.ts | TestBed, mocks, coverage |
| `angular-guards.mdc` | *.guard.ts | authGuard, roleGuard |

## Comandos

`.cursor/commands/` — digite `/` no chat:
- `create-feature`, `create-component`, `code-review`, `fix-design`, `add-detail-page`

## Fontes

- **Regras detalhadas:** `.ai/rules/` (01 a 16)
- **Design system:** `.ai/design/`
- **Prompts:** `.ai/prompts/`
- **Checklists:** `.ai/checklists/`

## Uso manual

Mencionar regra no chat: `@angular-pages` ou `@design-system`
