# Corrigir Design (Tokens ERP)

Corrige o CSS/HTML para usar tokens ERP e classes .btn.

## Instruções

1. Consulta `.ai/design/tokens.md` para tokens disponíveis.
2. Consulta `.ai/design/quick-reference.md` para referência rápida.
3. Substitui:
   - Cores hardcoded (#fff, #333, etc.) → `var(--foreground)`, `var(--card)`, `var(--border)`, etc.
   - Espaços fixos (8px, 16px) → `var(--spacing-1)`, `var(--spacing-2)`, etc.
   - Botões custom → classes `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`
   - Erros/alertas → `color-mix(in srgb, var(--error) 10%, transparent)`

## Ficheiros em contexto

Aplica as correções aos ficheiros .css e .html em contexto.
