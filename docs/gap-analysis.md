# Gap Analysis — Angular Template vs. Backend Template

> Auditoria de alinhamento entre o frontend Angular e o backend `Product.Template`.
> Data: Março 2026 | **Status: ✅ Todos os gaps resolvidos**

---

## ✅ O que está bem implementado (original)

| Área | Detalhes |
|------|----------|
| `ApiClient` centralizado | Único ponto de acesso HTTP via `core/api/api-client.ts` |
| `X-Tenant` em todas as requests | Enviado automaticamente pelo `ApiClient` |
| `Authorization: Bearer` | Injetado automaticamente quando há token |
| `X-Idempotency-Key` | Suportado em `RequestOptions.idempotencyKey` |
| `ProblemDetails` tipado | `ApiError` + `ProblemDetails` em `api-types.ts` |
| `X-Correlation-ID` capturado | Capturado no `catchError` do `ApiClient` |
| `PaginatedResponse<T>` tipado | Interface em `api-types.ts` |
| Standalone + OnPush | Todos os componentes seguem o padrão |
| Signals para estado | `ProductsStore` usa `signal`, `computed`, `effect` |
| Lazy loading | `loadChildren` em todas as features |
| Reactive Forms | `ProductFormComponent` usa `FormBuilder.nonNullable` |
| `strict: true` TypeScript | `tsconfig.json` com strict mode |
| Feature-first structure | `features/products/` completo com todas as camadas |

---

## ✅ Lacunas resolvidas nesta sessão

| # | Item | Arquivo(s) criado/alterado |
|---|------|---------------------------|
| 1 | **AuthSessionService** com user, roles, permissions, JWT decode, refresh token | `core/auth/auth-session.service.ts` |
| 2 | **Refresh Token** — `refreshToken` armazenado, `POST /identity/refresh` via interceptor | `core/interceptors/refresh-token.interceptor.ts` |
| 3 | **roleGuard** — protege rotas por `requiredPermission` / `requiredRole` no `route.data` | `core/guards/role.guard.ts` |
| 4 | **provideRouter** com `withPreloading`, `withComponentInputBinding`, `withViewTransitions`, `withInMemoryScrolling` | `app.config.ts` |
| 5 | **HTTP Interceptors** — `withInterceptors([refreshTokenInterceptor])` no `provideHttpClient` | `app.config.ts` |
| 6 | **Environments** — `src/environments/environment.ts` + `.development.ts`, `fileReplacements` no `angular.json` | `environments/`, `angular.json` |
| 7 | **OAuth callback** — rota `/auth/callback` + `OAuthCallbackPage` | `core/auth/oauth-callback.page.ts`, `app.routes.ts` |
| 8 | **Páginas de erro** — `/unauthorized` (403) e `/not-found` (404) | `core/errors/unauthorized.page.ts`, `core/errors/not-found.page.ts` |
| 9 | **LoginPage real** — GET providers, POST login, mapeamento 400/401/429, botão Microsoft | `core/auth/login.page.ts`, `login.page.html` |
| 10 | **ProductsStore inject()** — removido constructor, usando `inject()` + `APP_INITIALIZER` para `restoreFromStorage` | `products.store.ts`, `app.config.ts` |
| 11 | **app.spec.ts** — testes relevantes (cria componente, router-outlet presente) | `app.spec.ts` |
| 12 | **Validation errors da API** — `validationErrors` no store, `apiErrors` input no form, `fieldError()` + template | `products.store.ts`, `product-form.component.ts/html` |

---

## Regras AI adicionadas

| Arquivo | Conteúdo |
|---------|----------|
| `.ai/rules/10-routing.md` | Lazy loading, guards, route data RBAC, OAuth callback, provideRouter options |
| `.ai/rules/11-forms.md` | Reactive Forms, nonNullable, validações alinhadas ao backend, API error mapping |
| `.ai/rules/12-tests.md` | Padrões de teste para Store, Service, Guard e Component |
| `.ai/rules/13-observability.md` | X-Correlation-ID, Retry-After, health check, performance API, refresh token |

---

## Arquitetura final de ficheiros relevantes

```
src/
  environments/
    environment.ts                   ← produção
    environment.development.ts       ← desenvolvimento (dev server)
  app/
    app.config.ts                    ← provideRouter + withPreloading + interceptors + APP_INITIALIZER
    app.routes.ts                    ← rotas completas + roleGuard + OAuth + erros
    core/
      api/
        api-client.ts                ← captura Retry-After + X-Correlation-ID
        api-types.ts                 ← ApiError com retryAfterSeconds
      auth/
        auth-session.service.ts      ← user, roles, permissions, JWT decode, refresh token
        login.page.ts + .html        ← GET providers, POST login, Microsoft OAuth
        oauth-callback.page.ts       ← callback do Azure AD
      guards/
        auth.guard.ts                ← valida autenticação
        role.guard.ts                ← valida role/permission via route.data
      interceptors/
        refresh-token.interceptor.ts ← rotação automática de token
      errors/
        unauthorized.page.ts         ← 403
        not-found.page.ts            ← 404
    features/products/
      state/products.store.ts        ← inject() + validationErrors signal
      components/product-form.component.ts  ← apiErrors input + fieldError() + effect
```
