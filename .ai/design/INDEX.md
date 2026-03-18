# 📂 Estrutura do Design System

Visão completa dos arquivos criados em `.ai/design/`.

```
.ai/design/
├── README.md                 # 📖 Guia principal (3.3 KB)
│   ├── Objetivo do design system
│   ├── Estrutura de arquivos
│   ├── Como usar (para agentes de IA)
│   ├── Princípios fundamentais
│   └── Checklist de validação
│
├── tokens.md                 # 🎨 Design Tokens (7.4 KB)
│   ├── Tokens ERP (--foreground, --card, dark mode)
│   ├── Cores (primárias, neutras, semânticas)
│   ├── Espaçamentos (base 8px)
│   ├── Tipografia (fontes, tamanhos, pesos)
│   ├── Sombras (xs, sm, md, lg, xl, 2xl)
│   ├── Bordas (raios, larguras, estilos)
│   ├── Transições (fast, base, slow)
│   ├── Z-Index (layers)
│   └── Estados (opacidades, focus ring)
│
├── ui-contracts.md           # 📐 Estruturas Padrão (17 KB)
│   ├── Estrutura de Página (header, filtros, alerts)
│   ├── Página de Detalhe (feature-detail__*)
│   ├── Formulários (campos, validação, erros)
│   ├── Tabelas (header, body, células, ações)
│   ├── Cards (básico, com imagem, footer)
│   ├── Alerts (success, error, warning, info)
│   └── Modais (backdrop, header, body, footer)
│
├── components.md             # 🧩 Biblioteca de Componentes (11 KB)
│   ├── Botões (variants, sizes)
│   ├── Botões de Ícone (icon buttons)
│   ├── Badges (status badges)
│   ├── Inputs (text, email, password)
│   ├── Selects (dropdowns)
│   ├── Spinners (loading)
│   ├── Tooltips (posicionados)
│   ├── Toasts (notificações)
│   ├── Dropdowns (menus)
│   ├── Pagination (paginação)
│   ├── Progress Bars (progresso)
│   ├── Search (busca com debounce)
│   └── Skeleton Loaders (placeholders)
│
├── accessibility.md          # ♿ Acessibilidade (9.8 KB)
│   ├── Princípios WCAG 2.1
│   ├── Navegação por Teclado (focus, skip links)
│   ├── ARIA (labels, roles, landmarks)
│   ├── Contraste de Cores (4.5:1 mínimo)
│   ├── Imagens e Ícones (alt text)
│   ├── Touch Targets (44x44px mínimo)
│   ├── Screen Reader Only (.sr-only)
│   ├── Formulários Acessíveis (labels, validação)
│   └── Animações (prefers-reduced-motion)
│
├── responsive.md             # 📱 Design Responsivo (12 KB)
│   ├── Breakpoints (640, 768, 1024, 1280, 1536)
│   ├── Grid System (container, grid, flexbox)
│   ├── Layouts Comuns (header, sidebar, cards)
│   ├── Tabelas Responsivas (scroll, cards)
│   ├── Formulários Responsivos (1-2 colunas)
│   ├── Tipografia Responsiva (clamp)
│   ├── Espaçamentos Responsivos
│   ├── Imagens Responsivas (srcset, picture)
│   └── Touch vs Mouse (hover states)
│
├── examples.md               # 💡 Exemplos Práticos (19 KB)
│   ├── Página CRUD Completa (products)
│   ├── Página de Detalhe (role-detail)
│   ├── Componente de Formulário
│   │   ├── product-form.component.ts
│   │   └── product-form.component.html
│   ├── Componente de Tabela
│   │   └── product-table.component.html
│   └── Resumo (checklist completo)
│
├── quick-reference.md        # ⚡ Referência Rápida (4.3 KB)
│   ├── Prompt Base para IA
│   ├── Tokens ERP Mais Usados
│   ├── Templates Prontos (página, formulário, tabela, página de detalhe)
│   ├── Checklist Rápido
│   └── Links Importantes
│
├── designer-guide.md         # 🎨 Guia para Designers (15 KB)
│   ├── Você Não Precisa Saber Angular
│   ├── Cores (paleta disponível)
│   ├── Espaçamentos (escala 4px)
│   ├── Tipografia (tamanhos, pesos)
│   ├── Componentes Prontos (botões, badges, inputs)
│   ├── Layouts de Página (estrutura)
│   ├── Formulários (estrutura, validação)
│   ├── Tabelas (estrutura, responsividade)
│   ├── Modais (estrutura)
│   ├── Alertas (tipos)
│   ├── Responsividade (breakpoints)
│   ├── Acessibilidade (checklist)
│   └── Exemplo Completo (especificação)
│
└── SUMMARY.md                # 📊 Resumo Executivo (12 KB)
    ├── O Que Foi Criado
    ├── Arquivos Detalhados (todos os 10 arquivos)
    ├── Como Usar (IA, devs, designers)
    ├── Benefícios (consistência, produtividade, etc.)
    ├── Estatísticas (tamanhos, linhas, tópicos)
    ├── Próximos Passos
    └── Recursos Adicionais
```

---

## 📊 Estatísticas

| Arquivo | Tamanho | Linhas | Público Alvo |
|---------|---------|--------|-------------|
| `README.md` | 3.3 KB | ~150 | Todos |
| `tokens.md` | 7.4 KB | ~350 | Devs + Designers |
| `ui-contracts.md` | 17 KB | ~700 | Devs + Agentes IA |
| `components.md` | 11 KB | ~500 | Devs + Agentes IA |
| `accessibility.md` | 9.8 KB | ~450 | Devs + QA |
| `responsive.md` | 12 KB | ~550 | Devs + Designers |
| `examples.md` | 19 KB | ~800 | Devs + Agentes IA |
| `quick-reference.md` | 4.3 KB | ~200 | Todos |
| `designer-guide.md` | 15 KB | ~650 | Designers |
| `SUMMARY.md` | 12 KB | ~500 | Todos |
| **TOTAL** | **~110 KB** | **~4850** | **10 arquivos** |

---

## 🎯 Fluxo de Uso

### Para Agentes de IA
```
1. quick-reference.md  → Referência rápida
2. tokens.md           → Cores/espaçamentos
3. ui-contracts.md     → Estrutura de layouts
4. components.md       → Componentes disponíveis
5. examples.md         → Código completo de exemplo
```

### Para Desenvolvedores
```
1. README.md           → Visão geral
2. quick-reference.md  → Tokens mais usados
3. examples.md         → Copy/paste e adaptar
4. ui-contracts.md     → Padrões de estrutura
5. accessibility.md    → Validação A11y
```

### Para Designers
```
1. designer-guide.md   → Guia completo (não precisa saber Angular)
2. tokens.md           → Paleta de cores e espaçamentos
3. examples.md         → Ver como fica renderizado
4. responsive.md       → Breakpoints e layouts
5. accessibility.md    → Contraste e ARIA
```

---

## ✅ O Que Você Consegue Fazer Agora

### 1. Gerar Páginas Automaticamente
```
Prompt: "Crie uma página de produtos seguindo .ai/design/"
Resultado: Código Angular completo, consistente, acessível
```

### 2. Especificar Design Sem Código
```
Designer: "Grid de 3 colunas, cards com imagem + título + preço"
IA: Gera código Angular seguindo tokens e UI contracts
```

### 3. Validar Automaticamente
```
Checklist:
✅ Usou tokens CSS
✅ Seguiu UI contract
✅ Componentes reutilizáveis
✅ Acessibilidade WCAG 2.1
✅ Responsivo mobile-first
```

### 4. Manter Consistência
```
Todos os desenvolvedores/designers/IAs seguem o mesmo padrão
→ Interface consistente
→ Código previsível
→ Manutenção fácil
```

---

## 🚀 Próximos Passos

1. ✅ **Design System criado**
2. ⏳ Implementar componentes base (app-button, app-badge, etc.)
3. ⏳ Criar storybook para visualização
4. ⏳ Adicionar testes automatizados
5. ⏳ Validar contraste automaticamente
6. ⏳ Treinar agentes com exemplos

---

## 📚 Navegação Rápida

| Preciso de... | Arquivo |
|--------------|---------|
| Visão geral | `README.md` |
| Cores, espaçamentos (ERP) | `tokens.md` |
| Layout shell (sidebar, topbar) | `docs/erp-layout-prompt.md` |
| Estrutura de página | `ui-contracts.md` |
| Componentes prontos | `components.md` |
| ARIA, contraste | `accessibility.md` |
| Breakpoints, grid | `responsive.md` |
| Exemplo completo | `examples.md` |
| Referência rápida | `quick-reference.md` |
| Guia para designers | `designer-guide.md` |
| Resumo executivo | `SUMMARY.md` |

---

**Design System v1.0.0** — Product Template Angular  
Criado em: 15 de março de 2026

