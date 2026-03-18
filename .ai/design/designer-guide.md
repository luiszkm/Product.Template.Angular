# Guia para Designers

Como usar este design system para criar interfaces Angular, mesmo sem conhecer programação.

---

## 🎯 Você Não Precisa Saber Angular

Este guia permite que você especifique designs que **agentes de IA** (como GitHub Copilot ou ChatGPT) transformarão automaticamente em código Angular funcional.

---

## 📐 1. Cores (Tokens ERP)

O projeto usa tokens CSS que suportam light/dark mode automaticamente. Ver `tokens.md`.

**Interface:**
- `--foreground` → Texto principal
- `--foreground-secondary` → Texto secundário
- `--card` → Fundo de cards
- `--card-foreground` → Texto em cards
- `--primary-600` → Links, botões primários
- `--primary-700` → Hover
- `--error` → Erros, botões de perigo
- `--border` → Bordas
- `--input-background` → Fundo de inputs

**Semânticas:**
- `--success` → Verde (sucesso, ativo)
- `--error` → Vermelho (erro, perigo)
- `--warning` → Amarelo (aviso)
- `--info` → Azul (informação)

### Como Especificar
```
✅ "Botão primário (classes .btn .btn-primary)"
✅ "Card com background var(--card) e borda var(--border)"
✅ "Badge verde (success) com texto 'Ativo'"
```

---

## 📏 2. Espaçamentos

### Escala (base 8px — ver `tokens.md`)

| Nome | Tamanho | Uso |
|------|---------|-----|
| `spacing-1` | 8px | Gap mínimo |
| `spacing-2` | 16px | Gap pequeno, padding |
| `spacing-3` | 24px | Gap médio |
| `spacing-4` | 32px | Padding padrão, seções |
| `spacing-6` | 48px | Gap grande |

### Como Especificar
```
✅ "Card com padding var(--spacing-4)"
✅ "Gap var(--spacing-2) entre botões"
✅ "Margem inferior var(--spacing-4)"
```

---

## 🔤 3. Tipografia

### Tamanhos

| Nome | Tamanho | Uso |
|------|---------|-----|
| `font-xs` | 12px | Legendas, badges |
| `font-sm` | 14px | Labels, texto secundário |
| `font-base` | 16px | Texto normal |
| `font-lg` | 18px | Destaque |
| `font-2xl` | 24px | Títulos médios |
| `font-3xl` | 30px | Títulos grandes |

### Pesos

| Nome | Peso | Uso |
|------|------|-----|
| `normal` | 400 | Texto normal |
| `medium` | 500 | Labels, destaque leve |
| `semibold` | 600 | Subtítulos |
| `bold` | 700 | Títulos |

### Como Especificar
```
✅ "Título em font-size-3xl, font-weight-semibold, color var(--foreground)"
✅ "Label em font-size-sm, font-weight-medium, color var(--foreground-secondary)"
✅ "Texto normal em font-size-base, color var(--card-foreground)"
```

---

## 🎨 4. Componentes Prontos

### Botões (classes em `styles.css`)

O projeto usa classes `.btn` em vez de componentes. Ver `components.md`.

**Variantes:**
- `.btn-primary` → Ação principal
- `.btn-secondary` → Ação secundária (borda)
- `.btn-danger` → Ação destrutiva

**Especificar:**
```
✅ "Botão primário com texto 'Salvar'" → class="btn btn-primary"
✅ "Botão secundário com texto 'Cancelar'" → class="btn btn-secondary"
✅ "Botão de perigo com texto 'Excluir'" → class="btn btn-danger"
```

### Badges

**Variantes:**
- `success` → Verde (ativo, sucesso)
- `error` → Vermelho (erro, inativo)
- `warning` → Amarelo (pendente, atenção)
- `info` → Azul (rascunho, informação)

**Especificar:**
```
✅ "Badge verde com texto 'Ativo'"
✅ "Badge vermelho com texto 'Inativo'"
```

### Inputs

**Especificar:**
```
✅ "Input com label 'E-mail', placeholder 'seu@email.com', obrigatório"
✅ "Select com label 'Categoria', opções: Eletrônicos, Roupas, Alimentos"
✅ "Textarea com label 'Descrição', 4 linhas, máximo 500 caracteres"
```

---

## 📄 5. Layouts de Página

### Estrutura Padrão

```
┌─────────────────────────────────────────┐
│ HEADER                                  │
│ ┌─────────────┐  ┌─────────────────┐   │
│ │ Título      │  │ [Novo Produto]  │   │
│ │ Subtitle    │  └─────────────────┘   │
│ └─────────────┘                         │
│                                         │
│ [🔍 Buscar...]  [Categoria ▼]          │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ CONTEÚDO                                │
│                                         │
│ [Tabela / Grid / Formulário]           │
│                                         │
└─────────────────────────────────────────┘
```

**Especificar:**
```
✅ "Página com título 'Produtos', subtítulo 'Gerencie o catálogo'"
✅ "Botão 'Novo Produto' no canto superior direito"
✅ "Filtros: busca + dropdown de categoria"
✅ "Tabela listando produtos"
```

### Card Grid

```
┌─────┐ ┌─────┐ ┌─────┐
│Card │ │Card │ │Card │
│     │ │     │ │     │
└─────┘ └─────┘ └─────┘
```

**Especificar:**
```
✅ "Grid de 3 colunas no desktop, 1 no mobile"
✅ "Cada card tem imagem, título, preço e botão 'Comprar'"
```

---

## 📝 6. Formulários

### Estrutura

```
┌─────────────────────────────────────┐
│ Nome do Produto *                   │
│ ┌─────────────────────────────────┐ │
│ │ [Input aqui]                    │ │
│ └─────────────────────────────────┘ │
│ Entre 3 e 100 caracteres            │
└─────────────────────────────────────┘

┌───────────────┐ ┌─────────────────┐
│ SKU *         │ │ Categoria *     │
│ [Input]       │ │ [Select ▼]      │
└───────────────┘ └─────────────────┘

                  [Cancelar] [Salvar]
```

**Especificar:**
```
✅ "Campo 'Nome' obrigatório, validação: 3-100 caracteres"
✅ "Campo 'SKU' obrigatório, formato: letras maiúsculas + números + hífens"
✅ "Select 'Categoria' obrigatório, opções: vem da API"
✅ "Botões: 'Cancelar' (secundário) à esquerda, 'Salvar' (primário) à direita"
```

### Validação de Erros

```
Nome do Produto *
┌─────────────────────────────────────┐
│ [A]                                 │ ← Borda vermelha
└─────────────────────────────────────┘
⚠️ Mínimo de 3 caracteres.              ← Texto vermelho
```

**Especificar:**
```
✅ "Mostrar erro abaixo do campo"
✅ "Borda vermelha (error-500) quando inválido"
✅ "Mensagens: 'Campo obrigatório', 'Mínimo X caracteres', etc."
```

---

## 📊 7. Tabelas

### Estrutura

```
┌──────────────┬──────────┬────────┬────────┐
│ Produto      │ Categoria│ Preço  │ Ações  │ ← Header (fundo cinza claro)
├──────────────┼──────────┼────────┼────────┤
│ iPhone 15    │ Eletrô.  │ R$5.000│ [✏️ 🗑️] │ ← Linha com hover
│ SKU: IP15PRO │          │        │        │ ← Texto secundário
├──────────────┼──────────┼────────┼────────┤
│ MacBook Pro  │ Eletrô.  │ R$15K  │ [✏️ 🗑️] │
│ SKU: MBP16   │          │        │        │
└──────────────┴──────────┴────────┴────────┘
```

**Especificar:**
```
✅ "Colunas: Produto (esquerda), Categoria, Preço (direita, numérico), Ações (centro)"
✅ "Primeira coluna tem 2 linhas: nome (bold) + SKU (secundário)"
✅ "Preço formatado: R$ 1.234,56"
✅ "Ações: botões de editar (✏️) e excluir (🗑️)"
✅ "Hover: fundo cinza claro (gray-50)"
```

### Responsividade

**Desktop:** Tabela normal  
**Mobile:** Cards verticais

```
┌─────────────────────────────┐
│ Nome: iPhone 15             │
│ Categoria: Eletrônicos      │
│ Preço: R$ 5.000             │
│ [Editar] [Excluir]          │
└─────────────────────────────┘
```

---

## 🎯 8. Modais

### Estrutura

```
         ┌────────────────────────┐
         │ Novo Produto       [X] │ ← Header
         ├────────────────────────┤
         │                        │
         │ [Formulário aqui]      │ ← Body
         │                        │
         ├────────────────────────┤
         │      [Cancelar] [Criar]│ ← Footer
         └────────────────────────┘
```

**Especificar:**
```
✅ "Modal com título 'Novo Produto'"
✅ "Botão X no canto superior direito"
✅ "Formulário no corpo (ver seção Formulários)"
✅ "Footer com botões alinhados à direita"
✅ "Backdrop (fundo escuro transparente) fecha o modal ao clicar"
```

---

## 🔔 9. Alertas

### Tipos

**Sucesso (Verde):**
```
┌────────────────────────────────────┐
│ ✓ Produto salvo com sucesso!  [X] │
└────────────────────────────────────┘
```

**Erro (Vermelho):**
```
┌────────────────────────────────────┐
│ ⚠️ Erro ao salvar produto.    [X] │
│    ID: abc-123-def                 │
└────────────────────────────────────┘
```

**Especificar:**
```
✅ "Alert verde com mensagem 'Produto salvo com sucesso!'"
✅ "Alert vermelho com mensagem de erro + ID de correlação se 500"
```

---

## 📱 10. Responsividade

### Breakpoints

| Dispositivo | Largura | Layout |
|------------|---------|--------|
| Mobile | < 768px | 1 coluna, menu hambúrguer |
| Tablet | 768px - 1023px | 2 colunas, menu expandido |
| Desktop | ≥ 1024px | 3-4 colunas, sidebar |

**Especificar:**
```
✅ "Grid de 1 coluna em mobile, 2 em tablet, 3 em desktop"
✅ "Menu hambúrguer em mobile, horizontal em desktop"
✅ "Sidebar fixa em desktop, escondida em mobile"
```

---

## ♿ 11. Acessibilidade

### Checklist Básico

**Sempre incluir:**
- [ ] Contraste mínimo 4.5:1 (texto normal)
- [ ] Labels em todos os inputs
- [ ] ARIA labels em botões de ícone
- [ ] Alt text em imagens
- [ ] Navegação por teclado (Tab, Enter, Esc)
- [ ] Focus visível (anel azul ao redor)

**Especificar:**
```
✅ "Botão de ícone com aria-label 'Editar produto'"
✅ "Imagem com alt text 'iPhone 15 Pro na cor azul'"
✅ "Focus ring azul (primary-500) ao navegar por Tab"
```

---

## 🚀 Como Usar Este Guia

### 1. Defina a Página

```
Criar uma página de listagem de produtos com:
- Título "Produtos"
- Subtítulo "Gerencie o catálogo da sua loja"
- Botão "Novo Produto" (primário, médio) no canto superior direito
- Filtros: busca + dropdown de categoria
- Tabela com colunas: Produto, Categoria, Preço, Status, Ações
- Modal para criar/editar produto
```

### 2. Passe para a IA

```
Use o design system em .ai/design/ para gerar esta página conforme a especificação acima.
```

### 3. Revise o Código Gerado

A IA vai gerar código Angular seguindo:
- ✅ Tokens CSS (cores, espaçamentos)
- ✅ UI contracts (estrutura padronizada)
- ✅ Componentes reutilizáveis
- ✅ Acessibilidade (ARIA, contraste)
- ✅ Responsividade (mobile-first)

---

## 📚 Referência Completa

Para detalhes técnicos, consulte:
- **Tokens ERP**: `.ai/design/tokens.md`
- **UI Contracts**: `.ai/design/ui-contracts.md`
- **Componentes**: `.ai/design/components.md`
- **Exemplos**: `.ai/design/examples.md`
- **Layout shell (sidebar, topbar)**: `docs/erp-layout-prompt.md`

---

## ✅ Exemplo Completo

```
Criar uma página de produtos com:

HEADER:
- Título "Produtos" (font-2xl, semibold)
- Subtítulo "Gerencie o catálogo" (font-sm, secondary)
- Botão "Novo Produto" (primary, md) alinhado à direita

FILTROS:
- Input de busca "Buscar produtos..." (width 400px)
- Select "Categoria" com opções da API
- Select "Status" com opções: Todos, Ativos, Inativos

TABELA:
- Colunas: Produto (esquerda), Categoria, Preço (direita), Estoque (direita), Status (centro), Ações (centro)
- Produto: nome (bold) + SKU (secondary)
- Preço: formatado BRL
- Status: badge (success=Ativo, default=Inativo)
- Ações: botões de editar (ícone) e excluir (ícone)
- Hover: background gray-50
- Empty state: "Nenhum produto encontrado" com botão "Criar Primeiro Produto"

MODAL:
- Título "Novo Produto" ou "Editar Produto"
- Formulário com campos:
  - Nome (text, obrigatório, 3-100 chars)
  - SKU (text, obrigatório, pattern A-Z0-9-)
  - Categoria (select, obrigatório)
  - Preço (number, obrigatório, min 0.01)
  - Estoque (number, obrigatório, min 0)
  - Descrição (textarea, opcional, max 500 chars)
  - Ativo (checkbox)
- Botões: "Cancelar" (secondary) e "Salvar" (primary)

ALERTAS:
- Sucesso: "Produto salvo com sucesso!" (verde)
- Erro: "Erro ao salvar. ID: {correlationId}" (vermelho)

RESPONSIVIDADE:
- Mobile: 1 coluna, tabela em cards
- Desktop: layout completo
```

**A IA vai gerar tudo automaticamente!** 🚀

