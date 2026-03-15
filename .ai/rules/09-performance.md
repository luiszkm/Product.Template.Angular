# Regra 09 - Performance

## Regras mandatórias
- OnPush em todos os componentes.
- Lazy loading em features (`loadChildren`).
- `withPreloading(PreloadAllModules)` no `provideRouter` para pré-carregar chunks após a carga inicial.
- `withViewTransitions()` para transições suaves entre páginas.
- `track` em `@for` para listas (equivalente ao `trackBy`).
- Evitar subscriptions manuais desnecessárias — preferir `toSignal` ou `async` pipe.
- Preferir signals para reduzir churn de change detection.

## Boas práticas
- Evitar recomputações caras no template.
- Debounce em buscas digitadas.
- Paginação server-side para listas grandes.
- Memoização de view model com `computed`.

## Observabilidade de performance
- Medir tempo de carregamento de page e chamadas API críticas.
- Logar correlation id em falhas de performance backend-dependent.
