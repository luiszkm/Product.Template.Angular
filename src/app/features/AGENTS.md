# Features — Instruções para Agentes

Cada feature segue a estrutura em `.ai/rules/02-features.md` e `.ai/prompts/create-feature.md`.

## Estrutura obrigatória
```
{feature}/
  {feature}.routes.ts
  pages/           ← .page.ts, .page.html, .page.css
  components/      ← -form, -table ou outros
  models/          ← Entity, CreateRequest, UpdateRequest, Filters
  services/        ← stateless, inject(ApiClient)
  state/           ← store com vm computed
```

## Referências
- **Página de detalhe:** `authorization/pages/role-detail.page.*` ou `users/pages/user-detail.page.*`
- **Design:** `.ai/design/` — tokens ERP, classes .btn
- **Checklist:** `.ai/checklists/feature.md`
