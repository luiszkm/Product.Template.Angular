# Exemplo de Feature — Products (Implementação Real)

Este é o exemplo de referência da feature **Products**, já implementada no template seguindo todas as regras em `.ai/rules/`.

**Design:** Ver `.ai/design/` para tokens ERP, classes .btn, estrutura de páginas e página de detalhe.

---

## Estrutura completa

```
src/app/features/products/
  products.routes.ts                      ← lazy loading + title
  pages/
    products.page.ts                      ← OnPush, providers: [ProductsStore]
    products.page.html
    products.page.css
  services/
    products.service.ts                   ← inject(ApiClient), idempotencyKey
  models/
    product.model.ts                      ← Product, CreateRequest, Filters
  state/
    products.store.ts                     ← inject(), signals, validationErrors
  components/
    product-form.component.ts/.html/.css  ← apiErrors input, effect(), fieldError()
    product-table.component.ts/.html/.css ← DecimalPipe, track, server pagination
```

---

## Fluxo de dados (CQRS-like)

```
1. ProductsPage.ngOnInit()
   ↓ chama
2. ProductsStore.load()
   ↓ chama
3. ProductsService.list(filters)
   ↓ chama
4. ApiClient.get<PaginatedResponse>('/products', { params })
   ↓ headers automáticos: X-Tenant, Authorization
   ↓ retorna
5. Observable<PaginatedResponse<Product>>
   ↓ subscribe em ProductsStore
   ↓ atualiza
6. items.set(data), totalCount.set(...), loading.set(false)
   ↓ computed
7. vm = { items, loading, error, validationErrors, ... }
   ↓ binding
8. Template renderiza ProductFormComponent + ProductTableComponent
```

---

## Arquivos-chave

### `products.routes.ts`
```ts
export const PRODUCTS_ROUTES: Routes = [{
  path: '',
  component: ProductsPage,
  title: 'Produtos'
}];
```

### `products.store.ts` (padrão completo)
- `inject(ProductsService)` — sem construtor
- Signals: `items`, `loading`, `error`, `validationErrors`, paginação
- `vm = computed(() => ({ ... }))` — único ponto de leitura
- `create()`: limpa `validationErrors` antes; mapeia `400` → `validationErrors`; `5xx` → `error` com `correlationId`
- Effect privado: `_resetPageOnSearch = effect(() => ...)`

### `products.service.ts` (stateless)
- `inject(ApiClient)` — sem construtor
- `create()` com `idempotencyKey: crypto.randomUUID()`
- Tipagem completa: `Observable<PaginatedResponse<Product>>`

### `product-form.component.ts` (validação + API errors)
- `FormBuilder.nonNullable.group()`
- `apiErrors = input<Record<string, string[]> | null>(null)`
- `effect()` que aplica `apiErrors` nos controles
- `fieldError(name)` — lógica de validação fora do template
- `<fieldset [disabled]="vm().loading">`

### `products.page.ts` (orquestração)
- `providers: [ProductsStore]` — store local à page
- `vm = this.store.vm` — leitura reativa
- `[apiErrors]="vm().validationErrors"` → passado ao form
- Exibe `vm().error` (que inclui `correlationId`) para 5xx

### `product-table.component.ts` (apresentação)
- `input.required<Product[]>()`
- `imports: [DecimalPipe]` — pipe explícito
- `@for (item of items(); track item.id)`
- Paginação server-side: `pageChange.emit(numero)`

---

## Convenções seguidas

| Convenção | Implementação |
|-----------|---------------|
| Sem NgModule | ✅ Tudo standalone |
| OnPush | ✅ Em todos os componentes |
| `inject()` | ✅ Em store, service, page |
| Signals | ✅ `signal`, `computed`, `effect` |
| `validationErrors` | ✅ Store → Page → Form (via `apiErrors` input) |
| `correlationId` | ✅ Capturado no `ApiClient`, exibido em 5xx |
| `idempotencyKey` | ✅ Em `ProductsService.create()` |
| `X-Tenant` + `Authorization` | ✅ Injetados automaticamente pelo `ApiClient` |
| Lazy loading | ✅ Chunk separado no build: `chunk-53JHR2E2.js (products-routes)` |
| `@if` / `@for` | ✅ Sintaxe Angular 17+ |
| Specs | ✅ `products.store.spec.ts` com TestBed (não implementado ainda — ver `12-tests.md`) |

---

## Registro na rota raiz

Em `app.routes.ts`, dentro do `ShellLayoutComponent`:
```ts
{
  path: 'products',
  title: 'Produtos',
  loadChildren: () => import('./features/products/products.routes')
    .then(m => m.PRODUCTS_ROUTES)
}
```

Se precisasse de autorização:
```ts
{
  path: 'products',
  title: 'Produtos',
  canActivate: [authGuard, roleGuard],
  data: { requiredPermission: 'products.manage' },
  loadChildren: () => import('./features/products/products.routes')
    .then(m => m.PRODUCTS_ROUTES)
}
```

---

## Como usar como referência

1. Copiar estrutura de pastas para nova feature
2. Renomear `products` → `{nova-feature}`
3. Ajustar tipos em `models/`
4. Implementar endpoints no `service`
5. Ajustar signals no `store`
6. Customizar form e table conforme necessário
7. Registrar rota lazy em `app.routes.ts`
8. Executar `ng build` para validar chunk separado

---

## Próximos passos (TODOs no template)

- [x] Implementar specs completos (store, service, components) — coberto em `products.store.spec.ts` (store); estender a service/components quando necessário
- [x] Adicionar busca com debounce (já tem structure, falta UI) — UI + `scheduleSearch` com debounce 300ms em `ProductsStore`
- [x] Adicionar operação `update()` (só tem `create` e `remove`) — `ProductsStore.update` + modal de edição na página de produtos
- [x] Adicionar filtros avançados (categoria, range de preço) — toolbar com categoria e preço min/máx. (query enviada se o backend suportar)
