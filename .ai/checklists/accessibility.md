# Checklist — Acessibilidade

## Semântica de página
- [ ] Estrutura semântica usada: `<main>`, `<header>`, `<section>`, `<nav>` onde aplicável
- [ ] Hierarquia de headings correta: único `<h1>` por página, seguido de `<h2>`, `<h3>`

## Formulários
- [ ] Todo `<input>` possui `<label for="id">` ou `aria-label` associado
- [ ] Campos inválidos têm `[attr.aria-invalid]="ctrl.invalid && ctrl.touched"`
- [ ] Cada campo tem `aria-describedby="campo-error"` apontando para o `<span>` de erro
- [ ] Mensagens de erro usam `role="alert"` (anúncio imediato ao screen reader):
  ```html
  <span id="campo-error" class="field-error" role="alert">{{ fieldError('campo') }}</span>
  ```
- [ ] Formulário usa `<fieldset [disabled]="loading()">` durante operações assíncronas
- [ ] `onSubmit()` chama `markAllAsTouched()` antes de verificar validade

## Botões e interações
- [ ] Botões de ação (não-submit) têm `type="button"` explícito (evita submit acidental)
- [ ] Botões de ação por linha têm `aria-label` descritivo: `[attr.aria-label]="'Remover ' + item.name"`
- [ ] Elementos interativos são acessíveis por teclado (foco visível, `Tab`, `Enter`, `Space`)

## Tabelas
- [ ] Cabeçalhos usam `<th scope="col">` (ou `scope="row"` para linha)
- [ ] Tabela tem `aria-label` descritivo: `<table aria-label="Lista de produtos">`

## Estados assíncronos
- [ ] Estado de loading usa `role="status"` + `aria-live="polite"` (anúncio não urgente):
  ```html
  <p role="status" aria-live="polite">Carregando...</p>
  ```
- [ ] Estado de erro usa `role="alert"` (anúncio urgente)
- [ ] Estado vazio tem mensagem visível e acessível

## Ícones e imagens
- [ ] Ícones decorativos têm `aria-hidden="true"`
- [ ] Ícones funcionais (sem texto) têm `aria-label` ou `title`
- [ ] Imagens têm `alt` descritivo; imagens decorativas têm `alt=""`

## Contraste e foco
- [ ] Contraste mínimo 4.5:1 para texto normal, 3:1 para texto grande
- [ ] Foco visível preservado — nunca `outline: none` sem alternativa
