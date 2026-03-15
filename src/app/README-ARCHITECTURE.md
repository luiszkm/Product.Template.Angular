# Arquitetura Angular AI-First

## Estrutura

```text
src/app/
  core/
    api/
    auth/
    guards/
    interceptors/
  shared/
    components/
    directives/
    pipes/
    ui/
  features/
    users/
    products/
    orders/
  layouts/
  app.routes.ts
```

## Princípios
- Standalone components + OnPush.
- Feature-first + lazy loading.
- Services stateless.
- Estado com signals.
- Contratos de API tipados.
- Segurança multi-tenant com `X-Tenant`.

## Padrão de estado recomendado
- `signal` para estado mutável.
- `computed` para view model.
- `effect` para side-effects controlados.

## Regras de performance
- `trackBy` em listas.
- Evitar lógica pesada no template.
- Não criar subscriptions desnecessárias.
