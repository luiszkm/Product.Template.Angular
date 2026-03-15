# Regra 01 - Arquitetura Angular

## Arquitetura alvo
- Frontend com organização feature-first.
- Separação por camadas:
  - `core`: infraestrutura global (api, auth, guards, interceptors, errors).
  - `shared`: componentes reutilizáveis e utilitários de UI.
  - `features`: casos de uso por domínio (users, products, orders).
  - `layouts`: cascas de layout e shell de navegação.
  - `environments`: configuração por ambiente (development, production).

## Estrutura de pastas obrigatória

```
src/
  environments/
    environment.ts               ← produção (apiUrl, tenantSlug, oauthRedirectUri)
    environment.development.ts   ← desenvolvimento
  app/
    app.config.ts                ← providers: router, http, interceptors, APP_INITIALIZER
    app.routes.ts                ← rotas root com lazy loading
    core/
      api/                       ← ApiClient, api-types, api.config
      auth/                      ← AuthSessionService, LoginPage, OAuthCallbackPage
      guards/                    ← authGuard, roleGuard
      interceptors/              ← refresh-token.interceptor
      errors/                    ← unauthorized.page, not-found.page
    shared/
      components/
      directives/
      pipes/
      ui/
    features/
      {feature}/
        {feature}.routes.ts
        pages/
        components/
        models/
        services/
        state/
    layouts/
      shell/
```

## Padrões
- Pages e componentes em standalone.
- Rotas com lazy loading por feature.
- Não compartilhar estado mutável em serviços globais.
- Estado de feature isolado em `state/*.store.ts` com signals.
- `APP_INITIALIZER` para restaurar sessão do storage ao iniciar.

## Dependências permitidas
- `core` pode ser usado por `features`, `shared` e `layouts`.
- `shared` pode ser usado por `features` e `layouts`.
- `features` não podem depender entre si diretamente.

## Antipadrões proibidos
- NgModules.
- Componente gigante com lógica de API e UI misturada.
- Acesso HTTP direto em componente (sempre via `ApiClient`).
- URL de API hardcodada fora de `environments/`.
- Reuso cruzado entre features sem passar por `core` ou `shared`.
