# Checklist — Feature Angular

## Estrutura de arquivos
- [ ] `{feature}.routes.ts` com `title` na rota
- [ ] `pages/{feature}.page.ts` — OnPush, `providers: [FeatureStore]`
- [ ] `services/{feature}.service.ts` — stateless, `inject(ApiClient)`
- [ ] `models/{feature}.model.ts` — Entity, CreateRequest, UpdateRequest, Filters
- [ ] `state/{feature}.store.ts` — `inject()`, signals, `vm` computed
- [ ] `components/{feature}-form.component.ts` — form reativo com `apiErrors` input
- [ ] `components/{feature}-table.component.ts` — tabela com paginação server-side
- [ ] Specs: `*.store.spec.ts` e `*.service.spec.ts`

## Routing
- [ ] Feature lazy loaded via `loadChildren` em `app.routes.ts`
- [ ] `canActivate: [authGuard]` aplicado (se rota protegida)
- [ ] `canActivate: [authGuard, roleGuard]` + `data: { requiredPermission }` (se requer permissão)
- [ ] Rota com `title` configurado
- [ ] Wildcard `**` definido em `app.routes.ts` apontando para `not-found`

## Store
- [ ] `inject()` — nunca `constructor(private ...)`
- [ ] Signals: `items`, `loading`, `error`, `validationErrors`, `pageNumber`, `pageSize`, `totalCount`
- [ ] `vm = computed(() => ({ ... }))` como único ponto de leitura
- [ ] `create()`/`update()`: limpa `validationErrors` antes de chamar
- [ ] Erros `400` com `errors` → `validationErrors.set(problem.errors)`
- [ ] Erros `5xx` → `error.set(...)` com `correlationId` quando presente
- [ ] Effects privados: `private readonly _nomeEffect = effect(...)`

## Service
- [ ] `inject(ApiClient)` — nunca construtor
- [ ] `create()` com `idempotencyKey: crypto.randomUUID()`
- [ ] `update()` com `idempotencyKey` se operação crítica
- [ ] Todos os payloads e respostas tipados (sem `any`)
- [ ] Erros propagam via `throwError()` — não silenciados

## Form component
- [ ] `FormBuilder.nonNullable.group()`
- [ ] `apiErrors = input<Record<string, string[]> | null>(null)`
- [ ] `effect()` que aplica `apiErrors` nos controles
- [ ] `fieldError(name)` getter — sem lógica de validação no template
- [ ] `<fieldset [disabled]="loading()">` durante submit
- [ ] `markAllAsTouched()` antes de validar
- [ ] Validators alinhados ao backend (ver `11-forms.md`)

## Page
- [ ] `providers: [FeatureStore]` no decorador
- [ ] `[apiErrors]="vm().validationErrors"` passado ao form
- [ ] `[loading]="vm().loading"` passado ao form e à tabela
- [ ] Erro global exibido com `correlationId` para erros 5xx
- [ ] RBAC na UI: `computed(() => session.isAdmin() || session.hasPermission('x'))` se aplicável

## API e segurança
- [ ] `X-Tenant` enviado automaticamente pelo `ApiClient` ✓
- [ ] `Authorization: Bearer` enviado automaticamente pelo `ApiClient` ✓
- [ ] `401` → refresh token via interceptor → fallback para login ✓
- [ ] Refresh token gerenciado pelo `refresh-token.interceptor` ✓
- [ ] `idempotencyKey` em POST/PUT críticos

## Design (ver .ai/design/)
- [ ] Tokens ERP usados em CSS (--foreground, --card, --border, etc.)
- [ ] Botões com classes .btn, .btn-primary, .btn-secondary, .btn-danger
- [ ] Inputs/selects/busca/paginação com padding `var(--spacing-1) var(--spacing-2)` (ver `components.md`)
- [ ] Página de detalhe (se aplicável) segue padrão feature-detail__*

## Qualidade
- [ ] Compila sem erro (`ng build` limpo)
- [ ] Feature em chunk lazy separado no build output
- [ ] Specs cobrem: load sucesso, load erro 5xx, create erro 400 com `validationErrors`
- [ ] Sem `any` em todo o código da feature
- [ ] `@for` com `track` em todas as listas
