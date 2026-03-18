# Checklist de Code Review — Completo

Use este checklist para revisar código antes de commit/merge.

---

## 🎯 Como Usar

1. **Copie este checklist** para cada PR/feature
2. **Marque cada item** durante a revisão
3. **Score mínimo:** 80% para merge
4. **Problemas críticos:** Zero tolerância

---

## 📋 CHECKLIST COMPLETO

### 1. Arquitetura (Regra 01)

- [ ] Arquivo na pasta correta (`features/`, `core/`, `shared/`)
- [ ] Feature-first (arquivos agrupados por feature)
- [ ] Lazy loading configurado (routes com `loadChildren`)
- [ ] Sem dependências circulares
- [ ] Camadas respeitadas (core não importa features)

**Score:** ___/5

---

### 2. Components (Regra 03)

- [ ] `standalone: true`
- [ ] `changeDetection: ChangeDetectionStrategy.OnPush`
- [ ] `inject()` usado (não `constructor(private ...)`)
- [ ] `input()` / `input.required<T>()` (não `@Input()`)
- [ ] `output<T>()` (não `@Output()`)
- [ ] `@if` / `@for` (não `*ngIf` / `*ngFor`)
- [ ] Computed signals quando apropriado
- [ ] Pipes importados explicitamente
- [ ] Sem lógica de negócio no template
- [ ] Nome de arquivo: `*.component.ts`

**Score:** ___/10

---

### 3. Services (Regra 04)

- [ ] `@Injectable({ providedIn: 'root' })` ou específico
- [ ] Stateless (sem signals/BehaviorSubject)
- [ ] `inject()` usado
- [ ] ApiClient usado para HTTP (não HttpClient direto)
- [ ] Métodos retornam `Observable<T>`
- [ ] `idempotencyKey` em POST/PUT críticos
- [ ] Nome de arquivo: `*.service.ts`

**Score:** ___/7

---

### 4. Stores (Regra 05)

- [ ] `@Injectable()` (sem providedIn)
- [ ] Signals para estado (`signal<T>()`)
- [ ] `readonly items = signal<T[]>([])`
- [ ] `readonly loading = signal(false)`
- [ ] `readonly error = signal<string | null>(null)`
- [ ] `readonly validationErrors = signal<Record<string, string[]> | null>(null)`
- [ ] ViewModel: `readonly vm = computed(() => ({ ... }))`
- [ ] Métodos void (não retornam Observable)
- [ ] `finalize(() => this.loading.set(false))`
- [ ] Tratamento erro 400 (validationErrors)
- [ ] Tratamento erro 5xx (correlationId)
- [ ] Nome de arquivo: `*.store.ts`
- [ ] Provider na page: `providers: [FeatureStore]`

**Score:** ___/13

---

### 5. Forms (Regra 11)

- [ ] `fb.nonNullable.group({ ... })`
- [ ] `apiErrors = input<Record<string, string[]> | null>(null)`
- [ ] `effect()` para aplicar apiErrors
- [ ] `fieldError(name)` getter
- [ ] Sem `[(ngModel)]`
- [ ] Sem lógica de validação no template
- [ ] Validators apropriados (required, email, min, max)
- [ ] Reactive (não template-driven)

**Score:** ___/8

---

### 6. Routing (Regra 10)

- [ ] `title` definido
- [ ] `authGuard` quando necessário
- [ ] `roleGuard` quando precisa permissão
- [ ] `data: { requiredPermission: '...' }` quando roleGuard
- [ ] `loadChildren` para lazy loading
- [ ] Sem `component:` direto (usar loadChildren)

**Score:** ___/6

---

### 7. API Integration (Regra 06)

- [ ] Headers automáticos (X-Tenant via ApiClient)
- [ ] Authorization header quando autenticado
- [ ] `idempotencyKey` em POST/PUT críticos
- [ ] Tratamento de ProblemDetails
- [ ] Erro 400: `validationErrors.set(apiError.problem.errors)`
- [ ] Erro 5xx: exibir `correlationId`
- [ ] Retry-After respeitado (429)

**Score:** ___/7

---

### 8. TypeScript (Regra 07)

- [ ] Sem `any`
- [ ] Strict mode respeitado
- [ ] Tipos explícitos em parâmetros
- [ ] Tipos de retorno explícitos em métodos públicos
- [ ] Interfaces para objetos complexos
- [ ] Enums ou union types para literais
- [ ] `readonly` em propriedades que não mudam
- [ ] Nomenclatura: camelCase (variáveis), PascalCase (classes)

**Score:** ___/8

---

### 9. Design / Estilo (Regra 14, .ai/design/)

- [ ] Tokens ERP usados em CSS: `var(--foreground)`, `var(--card)`, `var(--border)`, etc.
- [ ] Botões com classes `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`
- [ ] Sem CSS inline (`style="..."`)
- [ ] Sem cores hardcoded (usar tokens)
- [ ] Página de detalhe: padrão `feature-detail__*` se aplicável

**Score:** ___/5

---

### 10. Dark Theme (Regra 16)

- [ ] Tokens ERP usados (--foreground, --card, etc.) — dark mode automático via .dark
- [ ] Ou classes `dark:` quando Tailwind utility
- [ ] Contraste WCAG AA verificado
- [ ] Sem `@media (prefers-color-scheme)` manual
- [ ] Sem cores hardcoded

**Score:** ___/5

---

### 11. I18n (Regra 15)

- [ ] Sem texto hardcoded em templates
- [ ] `{{ 'key' | translate }}` usado
- [ ] `TranslatePipe` importado
- [ ] Translation keys em `pt-BR.json`
- [ ] Translation keys em `en-US.json`
- [ ] Namespaces organizados (`common.*`, `auth.*`, `{feature}.*`)
- [ ] Interpolação: `{{ 'key' | translate:{ param: value } }}`
- [ ] Placeholders traduzidos: `[placeholder]="'key' | translate"`

**Score:** ___/8

---

### 12. Security (Regra 08)

- [ ] `authGuard` em rotas privadas
- [ ] `roleGuard` quando necessário
- [ ] Permissões verificadas: `session.hasPermission('...')`
- [ ] Tenant enviado (via ApiClient)
- [ ] Sem dados sensíveis no localStorage (apenas tokens)
- [ ] CORS respeitado
- [ ] Sem XSS (Angular sanitiza por padrão)

**Score:** ___/7

---

### 13. Performance (Regra 09)

- [ ] OnPush em todos os componentes
- [ ] Lazy loading configurado
- [ ] `trackBy` em `@for`
- [ ] Debounce em inputs de busca
- [ ] Virtual scroll em listas grandes (>100 items)
- [ ] Imagens otimizadas
- [ ] Sem memory leaks (unsubscribe em ngOnDestroy se necessário)

**Score:** ___/7

---

### 14. Tests (Regra 12)

- [ ] Arquivo `.spec.ts` existe
- [ ] `TestBed.configureTestingModule` usado
- [ ] Não usar `new ClassName()` (usar TestBed.inject)
- [ ] Mocks apropriados (HttpTestingController, signals)
- [ ] Coverage adequado (stores 80%, services 80%, guards 100%)
- [ ] Testes passando (`npm test`)

**Score:** ___/6

---

### 15. Acessibilidade

- [ ] `aria-label` em ícones/botões sem texto
- [ ] `aria-labelledby` quando apropriado
- [ ] `role` quando necessário
- [ ] Contraste WCAG AA (4.5:1 texto, 3:1 UI)
- [ ] Focus ring visível
- [ ] Navegação por teclado funcional
- [ ] Alt text em imagens
- [ ] Form labels associados

**Score:** ___/8

---

### 16. Observability (Regra 13)

- [ ] Correlation ID exibido em erros 5xx
- [ ] Retry-After respeitado em 429
- [ ] Logs de erro informativos
- [ ] Mensagens de erro user-friendly

**Score:** ___/4

---

## 📊 SCORE TOTAL

```
Total de pontos: ___/120
Porcentagem: ___%

✅ Aprovado: >= 80% (96 pontos)
⚠️  Review: 60-79% (72-95 pontos)
❌ Reprovado: < 60% (< 72 pontos)
```

---

## 🚨 BLOQUEANTES (Zero Tolerância)

- [ ] Build passa (`npm run build`)
- [ ] Testes passam (`npm test`)
- [ ] Sem `any`
- [ ] Sem `constructor(private ...)`
- [ ] Sem `*ngIf` / `*ngFor`
- [ ] Sem `[(ngModel)]`
- [ ] Sem CSS inline
- [ ] Sem texto hardcoded (exceto placeholders técnicos)

**Se qualquer bloqueante falhar:** ❌ **MERGE BLOQUEADO**

---

## 📝 COMENTÁRIOS DO REVISOR

### Pontos Positivos


### Problemas Encontrados


### Sugestões de Melhoria


---

## ✅ APROVAÇÃO

- [ ] Score >= 80%
- [ ] Todos os bloqueantes passaram
- [ ] Build e testes passando
- [ ] Documentação atualizada (se necessário)

**Revisor:** _________________  
**Data:** _________________  
**Status:** [ ] Aprovado  [ ] Aprovado com ressalvas  [ ] Reprovado

---

## 🔗 Referências

- **Design system:** `.ai/design/` (tokens ERP, UI contracts, componentes)
- **Regras completas:** `.ai/rules/`
- **Exemplos:** `.ai/examples/`
- **Checklists:** `.ai/checklists/`
- **Copilot instructions:** `.github/copilot-instructions.md`

