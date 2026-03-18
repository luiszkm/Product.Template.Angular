# Prompt AI — Criar Feature Angular

## Objetivo
Gerar uma feature Angular completa seguindo todas as regras em `.ai/rules/`.

## Entrada esperada
- **Nome da feature** (ex: `invoices`).
- **Domínio de negócio** (o que faz).
- **Endpoints REST disponíveis** (método, rota, payload, response).
- **Autorizações necessárias** (role/permission do backend, ex: `invoices.read`).

## Estrutura a criar

```
src/app/features/{feature}/
  {feature}.routes.ts          ← lazy loaded, com route title
  pages/
    {feature}.page.ts          ← OnPush, providers: [Store]
    {feature}.page.html
    {feature}.page.css
  components/
    {feature}-form.component.ts/.html/.css/.spec.ts
    {feature}-table.component.ts/.html/.css/.spec.ts
  models/
    {feature}.model.ts         ← interfaces: Entity, CreateRequest, UpdateRequest, Filters
  services/
    {feature}.service.ts       ← stateless, usa inject(ApiClient)
    {feature}.service.spec.ts
  state/
    {feature}.store.ts         ← usa inject(), signals, vm computed
    {feature}.store.spec.ts
```

## Instruções para o agente

### 1. routes.ts
```ts
export const FEATURE_ROUTES: Routes = [{
  path: '',
  component: FeaturePage,
  title: 'Nome da Feature'
}];
```

### 2. Store (padrão obrigatório)
- Usar `inject()` — nunca construtor.
- Sinais: `items`, `loading`, `error`, `validationErrors`, paginação.
- `vm = computed(() => ({ ... }))` como único ponto de leitura.
- Em `create()`/`update()`: limpar `validationErrors` antes; mapear `400` com `errors` → `validationErrors`; 5xx → `error` com `correlationId`.

### 3. Service (padrão obrigatório)
- `inject(ApiClient)` — nunca construtor.
- `create()` com `idempotencyKey: crypto.randomUUID()`.
- Tipar todos os payloads e respostas (sem `any`).

### 4. Form Component
- `FormBuilder.nonNullable.group()`.
- `apiErrors = input<Record<string, string[]> | null>(null)`.
- `effect()` que aplica `apiErrors` nos controles.
- `fieldError(name)` getter — nunca lógica de validação no template.
- `<fieldset [disabled]="loading">`.
- `markAllAsTouched()` antes de validar no submit.

### 5. Page
- `providers: [FeatureStore]` no decorador.
- Passar `[apiErrors]="vm().validationErrors"` para o form.
- Exibir `vm().error` com `correlationId` quando 5xx.

### 6. Registro na rota pai
Adicionar em `app.routes.ts` dentro do shell:
```ts
{
  path: '{feature}',
  title: 'Nome',
  canActivate: [authGuard, roleGuard],          // se requer autenticação
  data: { requiredPermission: '{feature}.read' }, // se requer permission
  loadChildren: () => import('./features/{feature}/{feature}.routes')
    .then(m => m.FEATURE_ROUTES)
}
```

## Design (ver .ai/design/)
- Tokens ERP em CSS de páginas e componentes.
- Classes .btn para botões.
- Página de detalhe (se aplicável): padrão feature-detail__* em ui-contracts.md.

## Saída obrigatória
- Todos os arquivos listados acima, compiláveis sem erro.
- Spec de store (3 casos: sucesso, erro 5xx, erro 400 com validationErrors).
- Spec de service (1 caso por método HTTP).
- Checklist de conformidade:
  - [ ] Lazy loading no chunk separado
  - [ ] `inject()` em todos os artefatos
  - [ ] `validationErrors` propagados até o form
  - [ ] `correlationId` exibido em erros 5xx
  - [ ] `idempotencyKey` no POST do service
  - [ ] `X-Tenant` e `Authorization` via ApiClient (automático)
  - [ ] `roleGuard` configurado se necessário
