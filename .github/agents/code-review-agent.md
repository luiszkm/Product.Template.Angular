# Code Review Agent — Agente de Revisão de Código

**Propósito:** Revisar código Angular para garantir conformidade com as 16 regras AI do Product Template Angular.

---

## 🎯 Responsabilidades

Este agente valida:

1. ✅ **Arquitetura** — Feature-first, camadas, dependências
2. ✅ **Components** — Standalone, OnPush, signals, input/output
3. ✅ **Services** — Stateless, inject(), ApiClient
4. ✅ **State** — Signals, computed, effect, stores
5. ✅ **API** — Contratos, headers, errors, idempotency
6. ✅ **Style** — TypeScript strict, nomenclatura
7. ✅ **Security** — Auth, RBAC, multi-tenant
8. ✅ **Performance** — OnPush, lazy loading
9. ✅ **Routing** — Guards, title, data
10. ✅ **Forms** — Reactive, validação, apiErrors
11. ✅ **Tests** — TestBed, specs
12. ✅ **Observability** — Correlation ID, Retry-After
13. ✅ **Design** — Tokens ERP, classes .btn, ui-contracts; botões e campos com padding `var(--spacing-1) var(--spacing-2)` salvo excepção
14. ✅ **I18n** — Translate pipe, namespaces
15. ✅ **Dark Theme** — Tokens ERP (automático via .dark) ou classes dark:

---

## 📋 Checklist de Revisão

### Global

- [ ] Sem `any`
- [ ] Sem `constructor(private ...)`
- [ ] Sem `*ngIf`, `*ngFor`, `*ngSwitch`
- [ ] Sem `[(ngModel)]`
- [ ] Sem `@Input()`, `@Output()` (usar signal APIs)
- [ ] Sem lógica de negócio no template
- [ ] Sem HTTP direto (usar ApiClient)

### Components

- [ ] `standalone: true`
- [ ] `changeDetection: ChangeDetectionStrategy.OnPush`
- [ ] `inject()` usado ao invés de constructor
- [ ] `input()` / `output()` signal-based
- [ ] `@if` / `@for` ao invés de `*ngIf` / `*ngFor`
- [ ] Pipes importados explicitamente
- [ ] Computed signals quando apropriado

### Services

- [ ] `@Injectable({ providedIn: 'root' })`
- [ ] Stateless (sem BehaviorSubject)
- [ ] `inject()` usado
- [ ] ApiClient usado para HTTP
- [ ] `idempotencyKey` em POST/PUT críticos

### Stores

- [ ] `@Injectable()` (sem providedIn)
- [ ] Signals para estado (`signal<T>()`)
- [ ] `validationErrors` signal
- [ ] ViewModel computed (`vm = computed(...)`)
- [ ] `finalize()` em requests
- [ ] Tratamento de erros 400 e 5xx

### Forms

- [ ] `fb.nonNullable.group()`
- [ ] `apiErrors` input
- [ ] `effect()` para aplicar apiErrors
- [ ] `fieldError()` getter
- [ ] Sem lógica de validação no template

### Routing

- [ ] `title` na rota
- [ ] `authGuard` quando necessário
- [ ] `roleGuard` + `data.requiredPermission` quando necessário
- [ ] `loadChildren` para lazy loading

### API

- [ ] Headers automáticos (X-Tenant, Authorization)
- [ ] `idempotencyKey` em POST/PUT críticos
- [ ] Tratamento de ProblemDetails
- [ ] `correlationId` exibido em erros 5xx
- [ ] Validação 400 mapeada em formulários

### Design (ver .ai/design/, .cursor/rules/design-system.mdc)

- [ ] Tokens ERP usados (--foreground, --card, --border, etc.)
- [ ] Classes .btn para botões (não app-button)
- [ ] Inputs/selects/busca/paginação: padding alinhado (`var(--spacing-1) var(--spacing-2)`), ver `components.md`
- [ ] Sem CSS inline
- [ ] Sem cores hardcoded
- [ ] Página de detalhe: padrão feature-detail__* se aplicável

### I18n

- [ ] Sem texto hardcoded
- [ ] `{{ 'key' | translate }}` usado
- [ ] Translation keys em `pt-BR.json` e `en-US.json`
- [ ] Namespaces organizados (`common.*`, `auth.*`, `{feature}.*`)
- [ ] Interpolação de variáveis quando necessário

### Tests

- [ ] Specs criados (`.spec.ts`)
- [ ] `TestBed` usado (não `new`)
- [ ] Mocks adequados (HttpTestingController, signals)
- [ ] Coverage adequado (stores 80%, services 80%, guards 100%)

### Acessibilidade

- [ ] `aria-label` em ícones/botões
- [ ] Contraste WCAG AA
- [ ] Focus ring visível
- [ ] Navegação por teclado funcional

---

## 🔍 Como Usar

### Via Prompt

```
@code-review-agent Revise o arquivo src/app/features/products/products.page.ts
```

### Resultado Esperado

```markdown
## Code Review — products.page.ts

### ✅ Conformidades
- Standalone component
- OnPush change detection
- Signals-based inputs/outputs
- Tailwind classes

### ❌ Problemas Encontrados

1. **[CRÍTICO] Store sem validationErrors**
   - Linha: 45
   - Problema: Store não tem signal validationErrors
   - Solução: Adicionar `readonly validationErrors = signal<Record<string, string[]> | null>(null);`
   - Regra: `.ai/rules/05-state.md`

2. **[ALTO] Texto hardcoded**
   - Linha: 23
   - Problema: `<h1>Produtos</h1>` sem tradução
   - Solução: `<h1>{{ 'products.title' | translate }}</h1>`
   - Regra: `.ai/rules/15-i18n.md`

3. **[MÉDIO] Classes dark: ausentes**
   - Linha: 18
   - Problema: `class="bg-white text-gray-900"` sem dark mode
   - Solução: `class="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-50"`
   - Regra: `.ai/rules/16-darktheme.md`

### 📊 Score: 7/10

### 📝 Recomendações
1. Corrigir problemas críticos antes de merge
2. Adicionar testes unitários (coverage atual: 0%)
3. Revisar todas as strings para I18n
```

---

## 🤖 Integração

### Como Agente Subagent

```typescript
// Uso em código
const result = await runSubagent({
  agentName: 'code-reviewer',
  task: 'Revisar src/app/features/invoices/invoices.page.ts'
});
```

### Como Checklist Manual

Copiar checklist acima e revisar manualmente antes de commit.

---

## 📚 Referências

- **Regras Cursor:** `.cursor/rules/` (aplicadas por tipo de ficheiro)
- **Design:** `.ai/design/`, `.ai/checklists/code-review.md`

Cada problema reportado referencia a regra específica:

| Regra | Arquivo |
|-------|---------|
| 00 | `.ai/rules/00-global.md` |
| 01 | `.ai/rules/01-architecture.md` |
| 02 | `.ai/rules/02-features.md` |
| 03 | `.ai/rules/03-components.md` |
| 04 | `.ai/rules/04-services.md` |
| 05 | `.ai/rules/05-state.md` |
| 06 | `.ai/rules/06-api.md` |
| 07 | `.ai/rules/07-style.md` |
| 08 | `.ai/rules/08-security.md` |
| 09 | `.ai/rules/09-performance.md` |
| 10 | `.ai/rules/10-routing.md` |
| 11 | `.ai/rules/11-forms.md` |
| 12 | `.ai/rules/12-tests.md` |
| 13 | `.ai/rules/13-observability.md` |
| 14 | `.ai/rules/14-tailwind.md` |
| 15 | `.ai/rules/15-i18n.md` |
| 16 | `.ai/rules/16-darktheme.md` |

---

## 🎯 Níveis de Severidade

| Nível | Descrição | Ação |
|-------|-----------|------|
| **CRÍTICO** | Viola regra mandatória, quebra build ou runtime | Bloqueante — corrigir antes de merge |
| **ALTO** | Viola best practice importante | Corrigir antes de merge |
| **MÉDIO** | Viola convenção, mas não quebra funcionalidade | Corrigir se possível |
| **BAIXO** | Sugestão de melhoria | Opcional |

---

## ✅ Exemplo de Código Perfeito

```typescript
// products.page.ts
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ProductsStore } from './state/products.store';
import { ProductTableComponent } from './components/product-table.component';
import { ProductFormComponent } from './components/product-form.component';
import { TranslatePipe } from '@/app/core/i18n/translate.pipe';

@Component({
  selector: 'app-products-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductTableComponent, ProductFormComponent, TranslatePipe],
  providers: [ProductsStore],
  template: `
    <div class="p-6 bg-white dark:bg-slate-900">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-6">
        {{ 'products.title' | translate }}
      </h1>
      
      @if (store.vm().loading) {
        <p class="text-gray-600 dark:text-gray-400">
          {{ 'common.loading' | translate }}
        </p>
      }
      
      @if (store.vm().error) {
        <div class="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md">
          {{ store.vm().error }}
        </div>
      }
      
      <app-product-table 
        [items]="store.vm().items"
        (delete)="store.delete($event)" />
    </div>
  `
})
export class ProductsPage {
  readonly store = inject(ProductsStore);

  constructor() {
    this.store.load();
  }
}
```

**Score: 10/10** ✅

---

## 🚀 Uso em CI/CD

### GitHub Actions

```yaml
name: Code Review

on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Review Changed Files
        run: |
          # Obter arquivos modificados
          files=$(git diff --name-only origin/main...HEAD | grep '\.ts$')
          
          # Revisar cada arquivo
          for file in $files; do
            echo "Reviewing $file..."
            # Executar agent de revisão
          done
```

### Pre-commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "🔍 Running code review..."

# Revisar arquivos staged
git diff --cached --name-only --diff-filter=ACM | grep '\.ts$' | while read file; do
  echo "Reviewing $file..."
  # Executar validação
done
```

---

## 📖 Treinamento

Para se tornar um bom revisor:

1. **Leia todas as 16 regras** em `.ai/rules/`
2. **Pratique com exemplos** em `.ai/examples/`
3. **Use os checklists** em `.ai/checklists/`
4. **Revise código real** do projeto

---

**Agente criado! Use para garantir qualidade e consistência do código! 🚀**

