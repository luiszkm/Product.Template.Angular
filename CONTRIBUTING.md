# Guia de Contribuição — Product Template Angular

Obrigado por contribuir! Este template segue padrões enterprise AI-first. Leia este guia antes de submeter código.

---

## 📋 Antes de Começar

1. **Leia as regras AI** em `.ai/rules/00-global.md`
2. **Configure seu ambiente** seguindo o `README.md`
3. **Familiarize-se com a estrutura** da feature `products` em `.ai/examples/feature-example.md`

---

## 🤖 Desenvolvendo com IA

### IDEs suportados
- **GitHub Copilot** (VS Code / JetBrains)
- **Cursor**
- **Windsurf**

### Como usar os prompts

Os prompts em `.ai/prompts/` guiam a IA para gerar código consistente. Use-os como **instruções diretas** para a IA:

```
📌 "Siga .ai/prompts/create-feature.md para criar uma feature de invoices"
📌 "Use .ai/prompts/create-form.md para gerar o formulário de pedido"
📌 "Aplique .ai/rules/08-security.md ao implementar o roleGuard"
```

A IA lerá os arquivos e gerará código **já alinhado** com todos os padrões.

---

## ✅ Checklist de Pull Request

Antes de abrir um PR, certifique-se:

### Build e testes
- [ ] `ng build --configuration production` sem erros
- [ ] `ng test` passa (cobertura mínima: stores 80%, services 80%)
- [ ] Feature lazy loaded em chunk separado (verifique no build output)

### Código
- [ ] Sem `any` no código TypeScript
- [ ] `inject()` usado em vez de `constructor(private ...)` em stores, services, guards
- [ ] `input()` / `output()` signal-based em componentes (Angular 17+)
- [ ] `ChangeDetectionStrategy.OnPush` em todos os componentes
- [ ] `@if` / `@for` / `@switch` em vez de `*ngIf` / `*ngFor`

### Features
- [ ] Estrutura segue `.ai/rules/02-features.md`
- [ ] Store com `validationErrors` signal
- [ ] Service com `idempotencyKey` em POST/PUT
- [ ] Form com `apiErrors` input + `effect()` para mapear erros da API
- [ ] Page com `providers: [FeatureStore]`
- [ ] Rota com `title` e `roleGuard` (se necessário)

### Segurança
- [ ] `X-Tenant` e `Authorization` via `ApiClient` (automático ✓)
- [ ] RBAC aplicado com `roleGuard` + `route.data` quando aplicável
- [ ] Formulários validados no frontend e backend
- [ ] Erros 5xx exibem `correlationId`

### Acessibilidade
- [ ] `aria-invalid`, `aria-describedby`, `role="alert"` em campos com erro
- [ ] `type="button"` em botões não-submit
- [ ] `<th scope="col">` em tabelas
- [ ] `aria-label` em botões de ação

### Validação com checklists
- [ ] Component: `.ai/checklists/component.md`
- [ ] Feature: `.ai/checklists/feature.md`
- [ ] Accessibility: `.ai/checklists/accessibility.md`

---

## 🏗️ Criando uma Nova Feature

### 1. Planeje a estrutura

```
src/app/features/{nome-feature}/
  {nome-feature}.routes.ts
  pages/{nome-feature}.page.ts/.html/.css
  services/{nome-feature}.service.ts
  models/{nome-feature}.model.ts
  state/{nome-feature}.store.ts
  components/
    {nome}-form.component.ts/.html/.css/.spec.ts
    {nome}-table.component.ts/.html/.css/.spec.ts
```

### 2. Use o prompt da IA

```
Prompt para IA:
"Siga .ai/prompts/create-feature.md para criar uma feature de invoices com:
- Endpoints: GET /invoices, POST /invoices, DELETE /invoices/{id}
- Campos: number, customerId, total, status, items[]
- Autorização: requer permission 'invoices.read' e 'invoices.manage'"
```

A IA gerará **todos os arquivos** seguindo os padrões.

### 3. Registre a rota em `app.routes.ts`

```ts
{
  path: 'invoices',
  title: 'Faturas',
  canActivate: [authGuard, roleGuard],
  data: { requiredPermission: 'invoices.read' },
  loadChildren: () => import('./features/invoices/invoices.routes')
    .then(m => m.INVOICES_ROUTES)
}
```

### 4. Valide

```bash
ng build --configuration production
# Verifique: chunk-XXXXX.js | invoices-routes | X.XX kB
```

---

## 🧪 Escrevendo Testes

Siga os padrões em `.ai/rules/12-tests.md`.

### Store
```ts
describe('InvoicesStore', () => {
  let store: InvoicesStore;
  let service: jasmine.SpyObj<InvoicesService>;

  beforeEach(() => {
    service = jasmine.createSpyObj('InvoicesService', ['list', 'create']);
    TestBed.configureTestingModule({
      providers: [InvoicesStore, { provide: InvoicesService, useValue: service }]
    });
    store = TestBed.inject(InvoicesStore);
  });

  it('deve carregar itens com sucesso', () => { /* ... */ });
  it('deve setar validationErrors em erro 400', () => { /* ... */ });
  it('deve setar error com correlationId em erro 5xx', () => { /* ... */ });
});
```

### Service
```ts
it('deve chamar POST /invoices com idempotencyKey', () => {
  apiClient.post.and.returnValue(of(mockInvoice));
  service.create(payload).subscribe();
  expect(apiClient.post).toHaveBeenCalledWith('/invoices', payload, {
    idempotencyKey: jasmine.any(String)
  });
});
```

---

## 🎨 Estilo de Código

### TypeScript
- Strict mode habilitado — sem `any`
- Funções pequenas e com responsabilidade única
- Nomes descritivos (PT-BR para domínio de negócio, EN para técnico)

### Angular
- `standalone: true` obrigatório
- `OnPush` obrigatório
- Preferir `computed()` a getters no template
- Usar `effect()` para side-effects (ex: aplicar `apiErrors`)

### Nomenclatura de arquivos
| Tipo | Sufixo | Exemplo |
|------|--------|---------|
| Page | `.page.ts` | `invoices.page.ts` |
| Component | `.component.ts` | `invoice-form.component.ts` |
| Service | `.service.ts` | `invoices.service.ts` |
| Store | `.store.ts` | `invoices.store.ts` |
| Guard | `.guard.ts` | `role.guard.ts` |
| Model | `.model.ts` | `invoice.model.ts` |

---

## 🔍 Code Review

### O que os revisores vão verificar

1. **Build limpo** — nenhum warning ou erro
2. **Chunk lazy separado** — feature não aumenta o bundle inicial
3. **Checklist preenchido** — feature, component, accessibility
4. **Padrão de erros** — `validationErrors` → `apiErrors` → controles do form
5. **RBAC aplicado** — `roleGuard` quando necessário
6. **Specs implementados** — store e service cobertos
7. **Sem `any`** — tipagem completa
8. **`inject()` usado** — sem `constructor(private ...)`
9. **Tailwind CSS** — sem CSS inline, apenas utility classes

---

## 📦 Commits

### Formato (Conventional Commits)

```
feat(invoices): adiciona CRUD de faturas

- Feature completa com form, table, store
- RBAC: requer invoices.read
- Validação alinhada ao backend
- Specs com 85% de cobertura

Closes #123
```

### Prefixos
- `feat:` — nova feature
- `fix:` — correção de bug
- `refactor:` — refatoração sem mudança de comportamento
- `test:` — adição/correção de testes
- `docs:` — documentação
- `chore:` — tarefas de build, configs

---

## 🚀 Deploy

### Environments

Configure os arquivos de environment:

**`src/environments/environment.ts`** (produção)
```ts
export const environment = {
  production: true,
  apiUrl: 'https://api.exemplo.com/api/v1',
  tenantSlug: 'acme',
  oauthRedirectUri: 'https://app.exemplo.com/auth/callback'
};
```

**`src/environments/environment.development.ts`** (dev)
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1',
  tenantSlug: 'public',
  oauthRedirectUri: 'http://localhost:4200/auth/callback'
};
```

### Build de produção

```bash
ng build --configuration production
```

Output em `dist/ProductTemplateAngular/`.

---

## 🆘 Obtendo Ajuda

1. Leia a documentação em `docs/`
2. Verifique exemplos em `.ai/examples/`
3. Consulte as regras específicas em `.ai/rules/`
4. Pergunte no canal #frontend do Slack

---

## 📖 Leitura Obrigatória

- `.ai/rules/00-global.md` — Princípios gerais
- `.ai/examples/feature-example.md` — Feature de referência
- `docs/backendSummary/README.md` — Contratos da API
- `docs/gap-analysis.md` — Auditoria de alinhamento

