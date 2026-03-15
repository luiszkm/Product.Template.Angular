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
- Tailwind CSS por padrão.
- Angular Material opcional e encapsulado em `shared/ui`.
- CSS utilitário e sem acoplamento global desnecessário.

## Qualidade
- ESLint + Prettier obrigatórios.
- Scaffold de teste para componentes reutilizáveis.
