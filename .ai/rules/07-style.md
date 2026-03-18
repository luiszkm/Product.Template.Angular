# Regra 07 - Estilo de Código

## TypeScript
- `strict: true`.
- Proibir `any`.
- Funções pequenas e com intenção clara.
- Nomes explícitos e consistentes com domínio.

## Angular
- Standalone, OnPush, imports mínimos por componente.
- Preferir `inject()` ao construtor em **todos os artefatos** (components, stores, services, guards, interceptors).
- Não usar lógica condicional complexa no template.

## Convenções de nomenclatura de arquivos

| Artefato | Sufixo | Exemplo |
|----------|--------|---------|
| Page (rota) | `.page.ts` | `products.page.ts` |
| Componente reutilizável | `.component.ts` | `product-form.component.ts` |
| Service HTTP | `.service.ts` | `products.service.ts` |
| Store (signals) | `.store.ts` | `products.store.ts` |
| Guard funcional | `.guard.ts` | `auth.guard.ts` |
| Interceptor | `.interceptor.ts` | `refresh-token.interceptor.ts` |
| Model/interface | `.model.ts` | `product.model.ts` |
| Spec | `.spec.ts` | `products.store.spec.ts` |

## UI/CSS
- **Design tokens** em `src/styles.css` — usar `var(--foreground)`, `var(--card)`, `var(--primary-600)`, etc. Ver `.ai/design/tokens.md`.
- **Classes .btn** para botões: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`.
- Tailwind CSS disponível; páginas usam CSS custom com tokens para consistência e dark mode.
- Layout shell: `docs/erp-layout-prompt.md`.

## Qualidade
- ESLint + Prettier obrigatórios.
- Scaffold de teste para componentes reutilizáveis.
