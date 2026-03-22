# Shared — Instruções para Agentes

Componentes, pipes e directivas reutilizáveis em todo o app.

## Estrutura
- `components/` — badge, language-selector, etc.
- `pipes/` — pipes partilhados
- `directives/` — directivas partilhadas

## Regras
- `standalone: true`, `OnPush`
- `input()`, `output()` signal-based
- Sem chamadas HTTP — receber dados via inputs
- Tokens ERP em CSS (`.ai/design/tokens.md`)
- Classes `.btn` para botões; inputs/selects com padding `var(--spacing-1) var(--spacing-2)` (ver `.ai/design/components.md`)

## Referências
- `.ai/prompts/create-component.md`
- `.ai/design/components.md`
- Exemplo: `shared/components/badge.component.ts`
