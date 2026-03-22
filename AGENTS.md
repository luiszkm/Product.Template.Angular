# Instruções para Agentes — Product Template Angular

Este projeto usa regras e padrões definidos em `.ai/` e `.cursor/rules/`.

## Ordem de consulta

1. **Regras Cursor** (`.cursor/rules/`) — aplicadas automaticamente por tipo de ficheiro
2. **Design System** (`.ai/design/`) — tokens ERP, UI contracts, componentes
3. **Regras detalhadas** (`.ai/rules/`) — 01 a 16
4. **Prompts** (`.ai/prompts/`) — create-page, create-form, create-table, create-feature
5. **Checklists** (`.ai/checklists/`) — validação antes de merge

## Agentes especializados

| Agente | Quando usar | Fonte |
|--------|-------------|-------|
| **Feature Builder** | Criar feature completa | `.github/agents/feature-builder.agent.md` |
| **Component Builder** | Criar componente reutilizável | `.github/agents/component-builder.agent.md` |
| **UI Reviewer** | Revisar acessibilidade e design | `.github/agents/ui-reviewer.agent.md` |
| **Code Reviewer** | Revisar código antes de merge | `.github/agents/code-review-agent.md` |
| **Frontend Architect** | Validar arquitetura | `.github/agents/frontend-architect.agent.md` |

## Regras rápidas

- **Angular:** standalone, OnPush, inject(), signals, sem any
- **Design:** tokens ERP (--foreground, --card), classes .btn; padding compacto de botões e campos: `var(--spacing-1) var(--spacing-2)` (ver `.ai/design/components.md`)
- **Páginas de detalhe:** padrão feature-detail__* em ui-contracts.md
- **API:** ApiClient, X-Tenant, validationErrors, correlationId

## Comandos

Digite `/` no chat para aceder:
- `/create-feature` — Criar feature completa
- `/create-component` — Criar componente reutilizável
- `/code-review` — Revisar código
- `/fix-design` — Corrigir CSS para tokens ERP
- `/add-detail-page` — Adicionar página de detalhe

## Referências

- Design: `.ai/design/quick-reference.md`
- Codebase: `docs/CODEBASE.md`
- Exemplo feature: `.ai/examples/feature-example.md`
- Layout shell: `docs/erp-layout-prompt.md`
