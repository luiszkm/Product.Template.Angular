# 🤖 Code Review Agent

Agente de revisão de código automática baseado nas 16 regras AI do Product Template Angular.

---

## 🎯 Objetivo

Garantir que todo código produzido está em conformidade com:
- 16 regras AI (`.ai/rules/`)
- Best practices Angular
- Padrões do projeto
- Clean Architecture
- Type-safety

---

## 🚀 Como Usar

### 1. Revisão Manual (Checklist)

```bash
# Ver checklist completo
cat .ai/checklists/code-review.md

# Copiar para PR
cp .ai/checklists/code-review.md review-pr-123.md
# Preencher durante review
```

### 2. Revisão Automática (Script)

```bash
# Revisar arquivo específico
npm run review src/app/features/products/products.page.ts

# Revisar todos os arquivos
npm run review:all

# Revisar arquivos modificados (Git)
git diff --name-only | grep '\.ts$' | xargs -I {} npm run review {}
```

### 3. Via Prompt (AI Assistant)

```
Por favor, revise o arquivo src/app/features/invoices/invoices.page.ts
usando as regras em .ai/rules/
```

---

## 📋 O que é Verificado

### Crítico (Bloqueante)

- ❌ Sem `any`
- ❌ Sem `constructor(private ...)`
- ❌ Sem `*ngIf` / `*ngFor` / `*ngSwitch`
- ❌ Sem `[(ngModel)]`
- ❌ Sem `@Input()` / `@Output()`
- ❌ Sem CSS inline
- ❌ Build deve passar
- ❌ Testes devem passar

### Alto

- ⚠️ `standalone: true`
- ⚠️ `ChangeDetectionStrategy.OnPush`
- ⚠️ Store com `validationErrors`
- ⚠️ ApiClient usado (não HttpClient)
- ⚠️ Sem texto hardcoded
- ⚠️ Form com `apiErrors` input

### Médio

- 📝 ViewModel computed em stores
- 📝 Classes `dark:` em cores
- 📝 `fieldError()` getter em forms
- 📝 Interfaces/types para objetos

### Baixo

- 💡 Sugestões de otimização
- 💡 Melhorias de acessibilidade
- 💡 Refactoring opportunities

---

## 📊 Score

```
Score: 85/100 (85%)

✅ Aprovado: >= 80%
⚠️  Review: 60-79%
❌ Reprovado: < 60%

Bloqueantes: 0 problemas críticos
```

---

## 🔍 Exemplo de Output

```bash
$ npm run review src/app/features/products/products.page.ts

🔍 Reviewing: src/app/features/products/products.page.ts

═══════════════════════════════════════════
  CODE REVIEW REPORT
═══════════════════════════════════════════

Score: 42/50 (84%)

📋 Problemas Encontrados: 3

🟡 MÉDIO (2)
  Linha 45: Store deve ter ViewModel (vm = computed(...))
  → Regra: .ai/rules/05-state.md

  Linha 18: Classes de cor sem suporte dark mode. Adicionar classes dark:
  → Regra: .ai/rules/16-darktheme.md

🟢 BAIXO (1)
  Linha 1: Considere criar interfaces/types para melhor tipagem
  → Regra: .ai/rules/07-style.md

═══════════════════════════════════════════

✅ APROVADO — Código em conformidade com os padrões
```

---

## 🛠️ Integração CI/CD

### GitHub Actions

```yaml
name: Code Review

on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install Dependencies
        run: npm ci
      
      - name: Review Changed Files
        run: |
          git diff --name-only origin/main...HEAD | grep '\.ts$' | while read file; do
            echo "Reviewing $file..."
            npm run review "$file" || exit 1
          done
```

### Pre-commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

echo "🔍 Running code review on staged files..."

# Revisar apenas arquivos .ts staged
git diff --cached --name-only --diff-filter=ACM | grep '\.ts$' | while read file; do
  if [ -f "$file" ]; then
    npm run review "$file"
    if [ $? -ne 0 ]; then
      echo "❌ Code review failed for $file"
      exit 1
    fi
  fi
done

echo "✅ All files passed code review"
```

### Pre-push Hook

```bash
#!/bin/bash
# .git/hooks/pre-push

echo "🔍 Running full code review..."

npm run review:all

if [ $? -ne 0 ]; then
  echo "❌ Code review failed. Fix issues before pushing."
  exit 1
fi

echo "✅ Code review passed"
```

---

## 📚 Documentação

| Arquivo | Descrição |
|---------|-----------|
| `.ai/agents/code-review-agent.md` | Definição completa do agente |
| `.ai/checklists/code-review.md` | Checklist detalhado (120 pontos) |
| `scripts/code-review.js` | Script de revisão automática |

---

## 🎓 Treinamento

Para revisar código efetivamente:

1. **Leia todas as 16 regras:** `.ai/rules/00-global.md` a `16-darktheme.md`
2. **Estude os exemplos:** `.ai/examples/feature-example.md`
3. **Use os checklists:** `.ai/checklists/`
4. **Pratique:** Revise PRs reais do projeto
5. **Automatize:** Configure hooks e CI/CD

---

## ❓ FAQ

**Q: O script automatizado substitui revisão manual?**  
A: Não. O script detecta padrões óbvios, mas revisão humana é essencial para lógica de negócio, arquitetura e edge cases.

**Q: Score mínimo para aprovar?**  
A: 80%. Scores 60-79% podem ser aprovados com ressalvas. Abaixo de 60% deve ser reprovado.

**Q: E se houver um problema crítico?**  
A: Merge bloqueado até corrigir. Zero tolerância para problemas críticos.

**Q: Posso ignorar alguma regra?**  
A: Apenas com justificativa documentada e aprovação do tech lead. Adicionar comentário `// eslint-disable-next-line rule-name -- Justificativa`.

**Q: Como adicionar novas regras ao script?**  
A: Editar `scripts/code-review.js` e adicionar método `checkNomeRegra()`.

---

## 🔗 Links

- **Regras AI:** `.ai/rules/`
- **Exemplos:** `.ai/examples/`
- **Checklists:** `.ai/checklists/`
- **Copilot Instructions:** `.github/copilot-instructions.md`

---

**Criado para garantir qualidade e consistência! 🚀**

