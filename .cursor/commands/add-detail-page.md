# Adicionar Página de Detalhe

Cria uma página de detalhe seguindo o padrão role-detail/user-detail/tenant-detail.

## Instruções

1. Consulta `.ai/design/ui-contracts.md` — secção "Página de Detalhe (Detail Page)".
2. Usa como referência:
   - `src/app/features/authorization/pages/role-detail.page.html`
   - `src/app/features/authorization/pages/role-detail.page.css`
3. Estrutura obrigatória:
   - `section.feature-detail`
   - `feature-detail__header` com `__back`, `__title`, `__subtitle`
   - `feature-detail__loading`, `feature-detail__error`
   - `feature-detail__card` com `__info` (dl/dt/dd) ou `__form`
   - `feature-detail__actions` com classes .btn

## O utilizador deve fornecer

- Nome da feature (ex: `product-detail`)
- Campos a exibir (info) ou formulário de edição
- Rota de voltar (ex: `/products`)
