# Documentação dos Agentes

Os agentes deste diretório padronizam o fluxo AI para frontend Angular.

## Integração Cursor

- **Regras:** `.cursor/rules/` — aplicadas automaticamente por tipo de ficheiro
- **AGENTS.md:** Raiz do projeto — instruções gerais e referência a agentes

## Agentes
- `frontend-architect.agent.md`: valida arquitetura e limites de camadas.
- `component-builder.agent.md`: gera componentes reutilizáveis.
- `feature-builder.agent.md`: gera features completas.
- `ui-reviewer.agent.md`: revisa acessibilidade e qualidade visual.
- `performance-optimizer.agent.md`: revisa e otimiza performance.

## Modo de uso recomendado
1. `frontend-architect` define/valida estrutura.
2. `feature-builder` cria o caso de uso.
3. `component-builder` cria peças reutilizáveis.
4. `ui-reviewer` valida UX/a11y.
5. `performance-optimizer` valida desempenho.

## Fontes de verdade
- Regras: `.ai/rules/`
- Prompts: `.ai/prompts/`
- Checklists: `.ai/checklists/`
- Exemplo: `.ai/examples/feature-example.md`
