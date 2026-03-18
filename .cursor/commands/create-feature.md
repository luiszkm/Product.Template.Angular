# Criar Feature Angular

Cria uma feature Angular completa seguindo as regras do projeto.

## Instruções

1. Consulta `.ai/prompts/create-feature.md` para a estrutura completa.
2. Consulta `.ai/checklists/feature.md` para validação.
3. Consulta `.ai/examples/feature-example.md` para referência.
4. Usa `.ai/design/` para tokens ERP e classes .btn.

## O utilizador deve fornecer

- Nome da feature (ex: `invoices`)
- Domínio de negócio
- Endpoints REST (método, rota, payload, response)
- Autorizações (permission do backend)

## Saída

- Estrutura completa: routes, page, store, service, models, form, table
- Lazy loading configurado
- Registro em app.routes.ts
- Specs para store e service
- Checklist de conformidade
