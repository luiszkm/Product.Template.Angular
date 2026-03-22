# Code Review

Revisa os ficheiros em contexto usando o checklist do projeto.

## Instruções

1. Consulta `.ai/checklists/code-review.md` para o checklist completo.
2. Consulta `.ai/checklists/feature.md` ou `component.md` conforme o tipo de código.
3. Para cada ficheiro relevante em contexto, valida:
   - Arquitetura e estrutura
   - Angular (standalone, OnPush, inject, signals)
   - Design (tokens ERP, classes .btn; padding de controlos `var(--spacing-1) var(--spacing-2)`)
   - Acessibilidade
   - Segurança e API

## Formato de resposta

1. **Conformidades** — o que está correto
2. **Problemas** — com severidade (CRÍTICO, ALTO, MÉDIO, BAIXO), ficheiro e linha
3. **Sugestões** — snippets de correção
4. **Score** — X/10 e recomendação (aprovado/reprovado)
