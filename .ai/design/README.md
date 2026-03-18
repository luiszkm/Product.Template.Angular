# Design System — Product Template Angular

Guia completo de **design tokens** e **UI contracts** para gerar telas Angular automaticamente via IA.

---

## 🎨 Objetivo

Permitir que agentes de IA (GitHub Copilot, ChatGPT, etc.) gerem código Angular **consistente**, **acessível** e **alinhado ao design system** sem necessidade de revisão manual extensiva.

---

## 📚 Estrutura

| Arquivo | O que contém | Quando usar |
|---------|--------------|-------------|
| `tokens.md` | Cores, espaçamentos, tipografia, sombras, bordas, estados | Ao estilizar componentes/páginas |
| `ui-contracts.md` | Estrutura de páginas, formulários, tabelas, cards, modais | Ao gerar layouts |
| `components.md` | Componentes reutilizáveis (botões, inputs, badges, etc.) | Ao criar interfaces |
| `accessibility.md` | ARIA, foco, contraste, navegação por teclado | Ao garantir acessibilidade |
| `responsive.md` | Breakpoints, grid system, mobile-first | Ao criar layouts responsivos |
| `examples.md` | Exemplos práticos de páginas completas | Para referência visual |

---

## 🚀 Como Usar (Para Agentes de IA)

### 1. Leia os Tokens ERP
```ts
// ✅ Use tokens ERP (--foreground, --card, --primary-600, etc.)
<button class="btn btn-primary">Salvar</button>

// ❌ Não invente cores/espaços
<button style="background: #3498db; padding: 8px 16px;">Salvar</button>
```

### 2. Siga os UI Contracts
```ts
// ✅ Estrutura padronizada de formulário (ver ui-contracts.md)
<form [formGroup]="form" (ngSubmit)="submit()">
  <div class="form-group">
    <label for="name" class="form-label">Nome</label>
    <input id="name" type="text" formControlName="name" class="form-input">
    @if (fieldError('name'); as error) {
      <span class="form-error">{{ error }}</span>
    }
  </div>
</form>

// ❌ Estrutura inconsistente
<div>
  <span>Nome:</span>
  <input formControlName="name">
  <p *ngIf="form.get('name').errors">Erro</p>
</div>
```

### 3. Use Classes .btn Existentes
```ts
// ✅ Classes em styles.css (ver components.md)
<button type="button" class="btn btn-primary" (click)="save()">Salvar</button>

// ❌ HTML direto (inconsistente)
<button class="custom-btn">Salvar</button>
```

---

## ✅ Princípios

1. **Consistência**: Mesmos espaçamentos, cores e padrões em toda a aplicação
2. **Acessibilidade**: ARIA labels, contraste, navegação por teclado
3. **Responsividade**: Mobile-first, breakpoints padronizados
4. **Manutenibilidade**: Tokens centralizados, fácil de atualizar
5. **Escalabilidade**: Componentes reutilizáveis, design system modular
6. **Performance**: CSS otimizado, lazy loading de estilos

---

## 🎯 Checklist para Gerar Telas

Antes de gerar código, verifique:

- [ ] Usei tokens ERP de `tokens.md` (--foreground, --card, etc.)
- [ ] Segui a estrutura de `ui-contracts.md` (incl. Página de Detalhe se aplicável)
- [ ] Usei classes .btn (btn-primary, btn-secondary, btn-danger)
- [ ] Página de detalhe usa padrão `feature-detail__*`
- [ ] Layout shell: `docs/erp-layout-prompt.md`
- [ ] Implementei acessibilidade de `accessibility.md`
- [ ] Consultei exemplos de `examples.md`

---

## 📖 Exemplo Completo

Ver `.ai/design/examples.md` para uma página completa (CRUD de produtos) com todos os padrões aplicados.

---

## 🔗 Links Úteis

- **Tokens**: `.ai/design/tokens.md`
- **UI Contracts**: `.ai/design/ui-contracts.md`
- **Layout ERP (shell, sidebar)**: `docs/erp-layout-prompt.md`
- **Componentes**: `.ai/design/components.md`
- **Acessibilidade**: `.ai/design/accessibility.md`
- **Responsividade**: `.ai/design/responsive.md`
- **Exemplos**: `.ai/design/examples.md`

