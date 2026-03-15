# Design System — Documentação Criada

Este documento resume o **Design System completo** criado para permitir que agentes de IA gerem telas Angular automaticamente e de forma consistente.

---

## 📦 O Que Foi Criado

### 1. **README.md**
Guia principal do design system com visão geral e navegação.

**Conteúdo:**
- Objetivo do design system
- Estrutura de arquivos
- Como usar (para agentes de IA)
- Princípios fundamentais
- Checklist de validação

---

### 2. **tokens.md** (7.4 KB)
Todos os design tokens centralizados.

**Conteúdo:**
- 🎨 **Cores**: Primárias, neutras, semânticas, superfície, texto
- 📏 **Espaçamentos**: Sistema baseado em 4px (spacing-1 a spacing-24)
- 🔤 **Tipografia**: Famílias, tamanhos, pesos, alturas de linha
- 🌑 **Sombras**: xs, sm, md, lg, xl, 2xl
- 🔲 **Bordas**: Raios, larguras, estilos
- ⏱️ **Transições**: Fast, base, slow
- 📐 **Z-Index**: Dropdown, sticky, modal, tooltip
- 🎯 **Estados**: Opacidades, focus ring

**Uso:**
```css
.btn-primary {
  background: var(--color-primary-500);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
}
```

---

### 3. **ui-contracts.md** (17 KB)
Estruturas padronizadas para páginas e componentes.

**Conteúdo:**
- 📄 **Estrutura de Página**: Header, filtros, alerts, conteúdo
- 📝 **Formulários**: Campos, validação, erros, ações
- 📊 **Tabelas**: Header, body, células numéricas, ações
- 🗂️ **Cards**: Básico, com imagem, header, body, footer
- 🔔 **Alerts**: Success, error, warning, info
- 🎯 **Modal**: Backdrop, header, body, footer

**Uso:**
```html
<div class="page-container">
  <header class="page-header">
    <h1 class="page-title">Título</h1>
    <div class="page-actions">
      <app-button variant="primary">Novo</app-button>
    </div>
  </header>
  <main class="page-content">
    <!-- Conteúdo -->
  </main>
</div>
```

---

### 4. **components.md** (11 KB)
Biblioteca de componentes reutilizáveis.

**Conteúdo:**
- 🔘 **Botões**: Variants (primary, secondary, danger, ghost), sizes
- 🎯 **Botão de Ícone**: Icon buttons com tooltip
- 🏷️ **Badge**: Status badges (success, error, warning, info)
- 📥 **Input**: Input com label, erro, help text
- 🔽 **Select**: Select com validação
- ⏳ **Spinner**: Loading indicator
- 💬 **Tooltip**: Tooltips posicionados
- 🍞 **Toast**: Notificações temporárias
- 📋 **Dropdown**: Menu dropdown
- 🔢 **Pagination**: Paginação de listas
- 📊 **Progress Bar**: Barra de progresso
- 🔍 **Search**: Input de busca com debounce
- 🎨 **Skeleton**: Loading placeholders

**Uso:**
```html
<app-button variant="primary" size="md" (click)="save()">
  Salvar
</app-button>

<app-badge variant="success">Ativo</app-badge>

<app-spinner size="lg" color="primary" />
```

---

### 5. **accessibility.md** (9.8 KB)
Padrões de acessibilidade (WCAG 2.1).

**Conteúdo:**
- 🎯 **Princípios WCAG**: Perceptível, operável, compreensível, robusto
- ⌨️ **Navegação por Teclado**: Focus, skip links, tabindex
- 🏷️ **ARIA**: Labels, roles, landmarks, estados dinâmicos
- 🎨 **Contraste**: Mínimo 4.5:1 para texto
- 🖼️ **Imagens**: Alt text, ícones decorativos vs informativos
- 📱 **Touch Targets**: Mínimo 44x44px
- 🔊 **Screen Reader**: Classe sr-only, live regions
- 📋 **Formulários**: Labels, validação, autocomplete
- 🎬 **Animações**: Respeitar prefers-reduced-motion

**Uso:**
```html
<button aria-label="Fechar modal">
  <svg aria-hidden="true"><!-- ícone --></svg>
</button>

<div role="alert" aria-live="assertive">
  {{ errorMessage }}
</div>
```

---

### 6. **responsive.md** (12 KB)
Padrões de design responsivo.

**Conteúdo:**
- 📐 **Breakpoints**: 640px, 768px, 1024px, 1280px, 1536px
- 📱 **Grid System**: Container, grid layout, flexbox
- 📄 **Layouts**: Header, sidebar, card grid
- 📊 **Tabelas**: Scroll horizontal, cards em mobile
- 📝 **Formulários**: 1 coluna mobile, 2 colunas desktop
- 🎨 **Tipografia**: Tamanhos fluidos com clamp()
- 🖼️ **Imagens**: Srcset, picture, object-fit
- 📲 **Touch vs Mouse**: Hover states, touch targets

**Uso:**
```css
.grid {
  display: grid;
  gap: var(--spacing-4);
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

### 7. **examples.md** (19 KB)
Exemplos práticos de páginas completas.

**Conteúdo:**
- 🛍️ **Página CRUD**: Products (page, html, css)
- 📋 **Formulário**: ProductFormComponent completo
- 📊 **Tabela**: ProductTableComponent completo
- ✅ **Resumo**: Checklist de tudo aplicado

**Uso:**
- Consulte este arquivo sempre que for gerar uma nova página
- Copy/paste e adapte conforme necessário
- Referência completa de boas práticas

---

### 8. **quick-reference.md** (4.3 KB)
Referência rápida para uso diário.

**Conteúdo:**
- 🚀 **Prompt Base** para agentes de IA
- 🎨 **Tokens Mais Usados**
- 📋 **Templates Prontos** (página, formulário, tabela)
- ✅ **Checklist Rápido**
- 📚 **Links Importantes**

---

## 🎨 Arquivos Complementares

### 9. **src/styles.css** (Atualizado)
Tokens CSS implementados no arquivo global.

**Conteúdo:**
- Todas as variáveis CSS (`--color-*`, `--spacing-*`, etc.)
- Reset e base styles
- Utilitários (sr-only, focus-visible)
- Suporte a prefers-reduced-motion

---

### 10. **.github/copilot-instructions.md** (Atualizado)
Instruções do Copilot atualizadas com referências ao design system.

**Adições:**
- Seção **🎨 Design System** com tabela de arquivos
- Links nos **Links Rápidos**
- Menção nas **Dicas para Gerar Código de Qualidade**

---

## 🎯 Como Usar

### Para Agentes de IA
```
Ao gerar código Angular:

1. Leia `.ai/design/tokens.md` para cores/espaçamentos
2. Siga `.ai/design/ui-contracts.md` para estrutura
3. Use componentes de `.ai/design/components.md`
4. Implemente `.ai/design/accessibility.md`
5. Aplique `.ai/design/responsive.md`
6. Consulte `.ai/design/examples.md` para referência

NUNCA use valores hard-coded - sempre tokens CSS.
```

### Para Desenvolvedores
1. **Consulte tokens.md** antes de estilizar
2. **Siga ui-contracts.md** para estrutura de páginas
3. **Reutilize components.md** em vez de criar do zero
4. **Valide accessibility.md** antes de commitar
5. **Teste responsive.md** em diferentes viewports
6. **Compare com examples.md** para garantir consistência

### Para Designers
1. **Use tokens.md** como fonte única de verdade
2. **Siga ui-contracts.md** para layouts
3. **Consulte components.md** para componentes disponíveis
4. **Valide accessibility.md** (contraste, ARIA)
5. **Projete mobile-first** conforme responsive.md

---

## ✅ Benefícios

### 1. **Consistência**
- Mesmas cores, espaçamentos e padrões em toda a aplicação
- Design system centralizado e versionado

### 2. **Produtividade**
- Agentes de IA geram código correto na primeira vez
- Desenvolvedores sabem exatamente onde buscar padrões
- Designers têm referência clara de componentes

### 3. **Manutenibilidade**
- Tokens centralizados facilitam mudanças globais
- Componentes reutilizáveis reduzem duplicação
- Documentação sempre atualizada

### 4. **Acessibilidade**
- Padrões WCAG 2.1 embutidos
- ARIA, contraste, navegação por teclado garantidos
- Testes automatizados possíveis

### 5. **Performance**
- CSS otimizado com tokens
- Mobile-first reduz carga inicial
- Lazy loading de estilos

---

## 📊 Estatísticas

| Arquivo | Tamanho | Linhas | Tópicos |
|---------|---------|--------|---------|
| tokens.md | 7.4 KB | ~350 | Cores, espaçamentos, tipografia, sombras, bordas |
| ui-contracts.md | 17 KB | ~700 | Páginas, formulários, tabelas, cards, alerts, modais |
| components.md | 11 KB | ~500 | 13 componentes reutilizáveis |
| accessibility.md | 9.8 KB | ~450 | WCAG 2.1, ARIA, contraste, teclado |
| responsive.md | 12 KB | ~550 | Breakpoints, grid, layouts, imagens |
| examples.md | 19 KB | ~800 | Página CRUD completa |
| **TOTAL** | **76.5 KB** | **~3350** | **6 arquivos** |

---

## 🚀 Próximos Passos

1. **Implementar componentes base** (app-button, app-badge, etc.)
2. **Criar testes** para componentes e layouts
3. **Adicionar storybook** para visualização
4. **Validar automaticamente** contraste e acessibilidade
5. **Criar templates** no Angular CLI
6. **Treinar agentes** com os padrões

---

## 📚 Recursos Adicionais

- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **Tailwind Colors**: https://tailwindcss.com/docs/customizing-colors
- **Material Design**: https://m3.material.io/
- **A11y Project**: https://www.a11yproject.com/

---

**Criado em:** 15 de março de 2026  
**Versão:** 1.0.0  
**Projeto:** Product Template Angular

