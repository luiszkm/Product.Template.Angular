# Regra 02 - Features

## Estrutura mínima por feature
- `feature.routes.ts`
- `pages/*.page.ts`
- `components/*`
- `models/*`
- `services/*`
- `state/*.store.ts` (quando houver estado)

## Responsabilidades
- Page: orquestra interação de tela.
- Components: UI pura e eventos.
- Service: chamadas HTTP stateless.
- Store (signals): estado e regras de composição de dados para a view.
- Model: contratos tipados do domínio de UI/API.

## Regras
- Toda feature deve ser lazy loaded.
- Toda page deve usar OnPush.
- Toda feature deve ter barrel opcional apenas para export controlado.
- Nunca expor DTO bruto diretamente para a UI sem mapear quando necessário.
