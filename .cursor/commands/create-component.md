# Criar Componente Reutilizável

Cria um componente Angular standalone reutilizável.

## Instruções

1. Consulta `.ai/prompts/create-component.md` para regras obrigatórias.
2. Consulta `.ai/checklists/component.md` para validação.
3. Consulta `.ai/design/components.md` e `tokens.md` para estilo.

## O utilizador deve fornecer

- Nome do componente (ex: `user-avatar`, `status-badge`)
- Inputs e outputs necessários
- Comportamento esperado

## Regras

- `standalone: true`, `OnPush`
- `input()`, `output()` signal-based
- `inject()` — nunca constructor
- Tokens ERP em CSS, classes .btn para botões
- Spec com TestBed (criação, output válido, output inválido)
