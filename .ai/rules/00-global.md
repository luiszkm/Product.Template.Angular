# Regra Global AI - Angular

## Objetivo
Gerar código Angular enterprise consistente com Clean Architecture, DDD pragmático (frontend), CQRS no consumo de API e integração AI-first.

## Índice de regras
| Arquivo | Tema |
|---------|------|
| `01-architecture.md` | Estrutura de camadas e dependências |
| `02-features.md` | Estrutura mínima de feature |
| `03-components.md` | Padrão de componentes standalone |
| `04-services.md` | Services stateless e ApiClient |
| `05-state.md` | Estado com signals e stores |
| `06-api.md` | Contratos de API, erros, headers |
| `07-style.md` | Estilo de código TypeScript/Angular |
| `08-security.md` | Auth, RBAC, multi-tenant, dados sensíveis |
| `09-performance.md` | OnPush, lazy loading, debounce |
| `10-routing.md` | Rotas, guards, provideRouter options |
| `11-forms.md` | Reactive Forms, validação, erros da API |
| `12-tests.md` | Testes de Store, Service, Guard, Component |
| `13-observability.md` | Correlation ID, Retry-After, health check |
| `14-tailwind.md` | Utility classes, @apply, responsividade |
| `15-i18n.md` | Internacionalização PT-BR/EN-US, translate pipe |
| `16-darktheme.md` | Dark theme com Tailwind, toggle, persistência |
- Usar somente componentes standalone.
- Não usar NgModules.
- Usar `ChangeDetectionStrategy.OnPush` em todos os componentes.
- Preferir `signals` para estado de UI e estado local.
- Preferir `inject()` ao construtor para reduzir boilerplate.
- Usar RxJS apenas para fluxos assíncronos de I/O (HTTP, websocket).
- Serviços de domínio/aplicação no front devem ser stateless.
- Proibir `any`; usar tipagem explícita e `unknown` quando necessário.
- Não colocar lógica de negócio em template.
- Seguir TypeScript strict.
- Todo acesso HTTP deve passar por `core/api/api-client.ts`.
- Environments via `src/environments/environment.ts` — nunca hardcodar URLs.

## Convenções backend a respeitar
- Enviar `X-Tenant` em todas as requisições.
- Enviar `Authorization: Bearer {token}` quando autenticado.
- Tratar respostas de erro no formato `ProblemDetails` (RFC 9457).
- Mapear `problem.errors` nos campos do formulário em erros `400 ValidationError`.
- Ler e registrar `X-Correlation-ID` para suporte e observabilidade.
- Respeitar `Retry-After` em respostas `429`.
- Usar `X-Idempotency-Key` em POST/PUT críticos.
- Suportar refresh token via `POST /identity/refresh` (rotação automática).

## Critérios de aceite de código gerado por IA
- Compila sem erro (`ng build` limpo).
- Não quebra lazy loading (features em chunks separados).
- Estrutura de pastas segue feature-first.
- Código inclui tipos de request/response (sem `any`).
- Guards protegem rotas corretamente (`authGuard` + `roleGuard`).
- Erros da API chegam até os campos do formulário quando aplicável.
- `X-Correlation-ID` exibido em erros 5xx.
- Inclui spec scaffold para componentes e stores críticos.
