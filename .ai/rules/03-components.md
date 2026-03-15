# Regra 03 - Componentes

## Obrigatório
- `standalone: true`
- `changeDetection: ChangeDetectionStrategy.OnPush`
- Inputs/outputs tipados.
- Sem `any`.
- Template sem regra de negócio.
- Acessibilidade mínima: labels, `aria-*`, hierarquia semântica.

## Preferências
- Usar `input()` e `output()` signal-based APIs quando aplicável.
- Computações de view em `computed()` no TS.
- `@for` com `track`/`trackBy` para listas.

## Proibido
- Chamar serviço HTTP diretamente no template.
- Fazer parsing complexo no HTML.
- Mutar objeto input recebido.
