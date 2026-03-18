# AI Frontend Kit

Este diretório define como agentes AI devem gerar e revisar o frontend Angular.

## Ordem recomendada de uso
1. **Regras Cursor** (`.cursor/rules/`) — aplicadas automaticamente por tipo de ficheiro.
2. Ler `rules/`.
3. Consultar **design system** em `design/` (tokens ERP, UI contracts, componentes).
4. Executar prompt base em `prompts/`.
5. Validar com `checklists/`.
6. Consultar padrão em `examples/`.

## Design System (.ai/design/)
- **tokens.md** — Tokens ERP (--foreground, --card, etc.), dark mode, espaçamentos (base 8px).
- **ui-contracts.md** — Estrutura de páginas, formulários, tabelas, **página de detalhe**.
- **components.md** — Classes .btn, badges, inputs.
- **quick-reference.md** — Referência rápida para IA.
- **Layout shell**: `docs/erp-layout-prompt.md`.

## Integração
- **Cursor:** Regras em `.cursor/rules/` referenciam `.ai/` como fonte.
- **Agentes:** `.github/agents/` usam `.ai/` e `.cursor/rules/` como padrões.
