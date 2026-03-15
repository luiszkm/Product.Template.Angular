# GitHub Copilot Instructions — Product Template Angular

Este arquivo contém instruções específicas para o **GitHub Copilot** ao trabalhar neste repositório.

---

## 🎯 Contexto do Projeto

Você está trabalhando em um **template Angular enterprise AI-first** que se integra com um backend .NET 10 (Product.Template).

**Stack:**
- Angular 21.2 standalone components
- TypeScript 5.9 strict
- Signals (RxJS apenas para I/O)
- Reactive Forms
- Tailwind CSS (utility-first styling)
- RBAC (JWT com roles/permissions)
- Multi-tenant (header X-Tenant)

---

## 📚 Regras e Padrões

**SEMPRE leia e siga os arquivos em `.ai/rules/`** antes de gerar qualquer código:

| Regra | O que cobre | Quando usar |
|-------|------------|-------------|
| `.ai/rules/00-global.md` | Princípios gerais, convenções backend | Sempre |
| `.ai/rules/01-architecture.md` | Estrutura de pastas, camadas | Ao organizar arquivos |
| `.ai/rules/02-features.md` | Feature-first, responsabilidades | Ao criar features |
| `.ai/rules/03-components.md` | Standalone, OnPush, signals | Ao criar componentes |
| `.ai/rules/04-services.md` | Stateless, ApiClient | Ao criar services |
| `.ai/rules/05-state.md` | Signals, computed, effect, stores | Ao gerenciar estado |
| `.ai/rules/06-api.md` | Contratos, erros, headers | Ao integrar com API |
| `.ai/rules/07-style.md` | TypeScript, nomenclatura | Ao escrever código |
| `.ai/rules/08-security.md` | Auth, RBAC, multi-tenant | Ao proteger rotas/dados |
| `.ai/rules/09-performance.md` | OnPush, lazy loading | Ao otimizar |
| `.ai/rules/10-routing.md` | Guards, provideRouter | Ao criar rotas |
| `.ai/rules/11-forms.md` | Reactive Forms, validação | Ao criar formulários |
| `.ai/rules/12-tests.md` | Specs de Store/Service/Guard | Ao testar |
| `.ai/rules/13-observability.md` | Correlation ID, Retry-After | Ao tratar erros |
| `.ai/rules/14-tailwind.md` | Utility classes, @apply, responsividade | Ao estilizar componentes |

---

## 🤖 Prompts Especializados

**Use os prompts em `.ai/prompts/`** para gerar código completo:

- **Criar feature completa** → `.ai/prompts/create-feature.md`
- **Criar componente reutilizável** → `.ai/prompts/create-component.md`
- **Criar formulário** → `.ai/prompts/create-form.md`
- **Criar page** → `.ai/prompts/create-page.md`
- **Criar service** → `.ai/prompts/create-service.md`
- **Criar tabela** → `.ai/prompts/create-table.md`

---

## ✅ Regras Mandatórias

### TypeScript
```ts
// ✅ SEMPRE
const service = inject(ApiClient);
readonly canDelete = computed(() => this.session.isAdmin());
@if (loading()) { <p>Carregando...</p> }
@for (item of items(); track item.id) { ... }

// ❌ NUNCA
constructor(private apiClient: ApiClient) {}  // usar inject()
const canDelete = this.session.isAdmin();    // usar computed()
*ngIf="loading"                               // usar @if
*ngFor="let item of items"                    // usar @for
any                                           // proibido
```

### Componentes
```ts
// ✅ SEMPRE
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, DecimalPipe]  // pipes explícitos
})
export class MyComponent {
  readonly data = input.required<Data>();
  readonly action = output<string>();
  readonly computed = computed(() => ...);
}

// ❌ NUNCA
@Component({ standalone: false })             // NgModule proibido
changeDetection: ChangeDetectionStrategy.Default
@Input() data: Data;                          // usar input()
@Output() action = new EventEmitter();        // usar output()
```

### Formulários
```ts
// ✅ SEMPRE
readonly form = this.fb.nonNullable.group({
  email: ['', [Validators.required, Validators.email]]
});

readonly apiErrors = input<Record<string, string[]> | null>(null);

private readonly _applyApiErrors = effect(() => {
  const errors = this.apiErrors();
  if (!errors) return;
  for (const [field, messages] of Object.entries(errors)) {
    this.form.get(field.toLowerCase())?.setErrors({ apiError: messages[0] });
  }
});

fieldError(name: keyof typeof this.form.controls): string | null {
  const ctrl = this.form.controls[name];
  if (!ctrl.touched || ctrl.valid) return null;
  if (ctrl.hasError('required')) return 'Campo obrigatório.';
  if (ctrl.hasError('apiError')) return ctrl.getError('apiError');
  return null;
}

// ❌ NUNCA
this.fb.group({ ... })                        // usar nonNullable
[(ngModel)]                                   // proibido
*ngIf="form.get('email').errors?.required"    // usar fieldError()
```

### Store
```ts
// ✅ SEMPRE
@Injectable()
export class FeatureStore {
  private readonly service = inject(FeatureService);

  readonly items = signal<T[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly validationErrors = signal<Record<string, string[]> | null>(null);

  readonly vm = computed(() => ({
    items: this.items(),
    loading: this.loading(),
    error: this.error(),
    validationErrors: this.validationErrors()
  }));

  create(payload: CreateRequest): void {
    this.loading.set(true);
    this.error.set(null);
    this.validationErrors.set(null);

    this.service.create(payload)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => this.load(),
        error: (apiError: ApiError) => {
          if (apiError.status === 400 && apiError.problem.errors) {
            this.validationErrors.set(apiError.problem.errors);
          } else {
            const id = apiError.correlationId;
            this.error.set(
              apiError.status >= 500 && id
                ? `Erro inesperado. ID: ${id}`
                : apiError.problem.detail ?? 'Erro inesperado.'
            );
          }
        }
      });
  }
}

// ❌ NUNCA
constructor(private service: FeatureService) {}  // usar inject()
readonly items = new BehaviorSubject([]);        // usar signal
```

### Service
```ts
// ✅ SEMPRE
@Injectable({ providedIn: 'root' })
export class FeatureService {
  private readonly apiClient = inject(ApiClient);

  create(payload: CreateRequest): Observable<Feature> {
    return this.apiClient.post<Feature, CreateRequest>('/feature', payload, {
      idempotencyKey: crypto.randomUUID()
    });
  }
}

// ❌ NUNCA
constructor(private http: HttpClient) {}         // usar ApiClient
this.http.post(...)                              // usar ApiClient
```

### Rotas
```ts
// ✅ SEMPRE
{
  path: 'users',
  title: 'Usuários',
  canActivate: [authGuard, roleGuard],
  data: { requiredPermission: 'users.read' },
  loadChildren: () => import('./features/users/users.routes')
    .then(m => m.USERS_ROUTES)
}

// ❌ NUNCA
component: UsersPage                             // usar loadChildren
canActivate: [authGuard]                         // adicionar roleGuard se precisa permissão
```

### Tailwind CSS
```html
<!-- ✅ SEMPRE usar utility classes do Tailwind -->
<div class="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
  <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 
                 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
    Salvar
  </button>
</div>

<!-- ✅ Usar @apply para componentes reutilizáveis (somente em arquivos .css de componentes) -->
/* component.css */
.btn-primary {
  @apply px-4 py-2 bg-primary-600 text-white rounded-md;
  @apply hover:bg-primary-700 focus:outline-none focus:ring-2;
  @apply focus:ring-primary-500 focus:ring-offset-2;
}

<!-- ❌ NUNCA usar CSS inline ou custom CSS -->
<div style="display: flex; padding: 24px;">  <!-- usar Tailwind classes -->
</div>

<!-- ❌ NUNCA criar CSS custom quando existe utility do Tailwind -->
.my-custom-flex {                             <!-- usar classes Tailwind diretamente -->
  display: flex;
  align-items: center;
}
```

---

## 📋 Checklist de Validação

Antes de considerar o código completo, verifique:

- [ ] Sem `any`
- [ ] `inject()` usado (não `constructor`)
- [ ] `input()` / `output()` signal-based
- [ ] `@if` / `@for` (não `*ngIf` / `*ngFor`)
- [ ] `ChangeDetectionStrategy.OnPush`
- [ ] `standalone: true`
- [ ] Pipes importados explicitamente
- [ ] `validationErrors` no store
- [ ] `apiErrors` input no form + `effect()`
- [ ] `fieldError()` getter (não lógica no template)
- [ ] `idempotencyKey` em POST/PUT
- [ ] `correlationId` exibido em erros 5xx
- [ ] `providers: [Store]` na page
- [ ] `roleGuard` + `data` se precisa permissão
- [ ] `title` na rota
- [ ] Spec com `TestBed` (não `new`)
- [ ] Tailwind classes (não CSS inline ou custom)

---

## 🎓 Exemplo de Referência

Sempre que tiver dúvida, consulte a implementação **real** da feature `products` em `.ai/examples/feature-example.md`.

---

## 🚫 Antipadrões Proibidos

- NgModules
- `constructor(private ...)`
- `*ngIf` / `*ngFor` / `*ngSwitch`
- `[(ngModel)]`
- `@Input()` / `@Output()` (usar signal APIs)
- `any`
- Lógica de negócio no template
- HTTP direto sem `ApiClient`
- Store sem `validationErrors`
- Form sem `apiErrors` input
- Service sem `idempotencyKey` em POST
- Erro 5xx sem `correlationId`
- Page sem `providers: [Store]`
- Rota sem `title`
- Teste com `new Store()` (usar `TestBed`)
- CSS inline (usar Tailwind classes)
- CSS custom (usar Tailwind utilities ou @apply)

---

## 💡 Dicas para Gerar Código de Qualidade

1. **Sempre pergunte** se há uma regra em `.ai/rules/` antes de gerar
2. **Use os prompts** em `.ai/prompts/` como template
3. **Consulte o design system** em `.ai/design/` para interfaces
4. **Valide com os checklists** em `.ai/checklists/`
5. **Consulte o exemplo** em `.ai/examples/feature-example.md`
6. **Leia a documentação do backend** em `docs/backendSummary/`

---

## 🔗 Links Rápidos

- **Todas as regras:** `.ai/rules/`
- **Todos os prompts:** `.ai/prompts/`
- **Checklists:** `.ai/checklists/`
- **Exemplo real:** `.ai/examples/feature-example.md`
- **Backend docs:** `docs/backendSummary/`
- **Gap analysis:** `docs/gap-analysis.md`

