# Acessibilidade (A11y)

Padrões de acessibilidade para garantir que todos os usuários possam usar a aplicação.

---

## 🎯 Princípios WCAG 2.1

### 1. Perceptível
- Contraste mínimo de 4.5:1 para texto
- Alternativas textuais para imagens
- Legendas e transcrições para mídia

### 2. Operável
- Navegação completa por teclado
- Tempo suficiente para leitura
- Sem conteúdo que pisca rapidamente

### 3. Compreensível
- Linguagem clara e simples
- Comportamento previsível
- Prevenção de erros

### 4. Robusto
- Compatível com tecnologias assistivas
- HTML semântico válido

---

## ⌨️ Navegação por Teclado

### Ordem de Foco
```html
<!-- ✅ Ordem lógica de foco -->
<form>
  <input tabindex="0" />  <!-- 1º -->
  <input tabindex="0" />  <!-- 2º -->
  <button tabindex="0">Enviar</button>  <!-- 3º -->
</form>

<!-- ❌ Não usar tabindex positivo -->
<input tabindex="5" />  <!-- Evitar -->
```

### Skip Links
```html
<!-- Pular para conteúdo principal -->
<a href="#main-content" class="skip-link">
  Pular para o conteúdo principal
</a>

<main id="main-content">
  <!-- Conteúdo -->
</main>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-primary-500);
  color: var(--color-text-inverse);
  padding: var(--spacing-2) var(--spacing-4);
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
```

### Focus Visible
```css
/* ✅ Focus visível em todos os elementos interativos */
button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: var(--focus-ring-width) solid var(--focus-ring-color);
  outline-offset: var(--focus-ring-offset);
}

/* ❌ Nunca remover completamente */
/* outline: none;  <- PROIBIDO sem alternativa */
```

### Atalhos de Teclado
```ts
// Exemplo: Salvar com Ctrl+S
@HostListener('document:keydown.control.s', ['$event'])
handleSave(event: KeyboardEvent): void {
  event.preventDefault();
  this.save();
}
```

---

## 🏷️ ARIA Labels e Roles

### Landmarks
```html
<!-- Estrutura semântica com ARIA -->
<header role="banner">
  <nav role="navigation" aria-label="Principal">
    <!-- Navegação -->
  </nav>
</header>

<main role="main" id="main-content">
  <!-- Conteúdo principal -->
</main>

<aside role="complementary" aria-label="Informações relacionadas">
  <!-- Sidebar -->
</aside>

<footer role="contentinfo">
  <!-- Rodapé -->
</footer>
```

### Botões e Links
```html
<!-- ✅ Botão com ação -->
<button type="button" aria-label="Fechar modal">
  <svg aria-hidden="true"><!-- ícone X --></svg>
</button>

<!-- ✅ Link com descrição -->
<a href="/products/123" aria-label="Ver detalhes do produto iPhone 15">
  Ver mais
</a>

<!-- ✅ Botão de ícone -->
<button aria-label="Editar produto">
  <svg aria-hidden="true"><!-- ícone de edição --></svg>
</button>
```

### Formulários
```html
<!-- ✅ Label associado ao input -->
<label for="email">E-mail</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid="false"
  aria-describedby="email-error"
/>
<span id="email-error" role="alert">
  @if (emailError(); as error) {
    {{ error }}
  }
</span>

<!-- ✅ Grupo de campos -->
<fieldset>
  <legend>Informações de contato</legend>
  <!-- Inputs -->
</fieldset>

<!-- ✅ Required explícito -->
<label for="name">
  Nome
  <span aria-label="obrigatório">*</span>
</label>
<input id="name" required aria-required="true" />
```

### Estados Dinâmicos
```html
<!-- ✅ Loading state -->
<button
  [attr.aria-busy]="loading()"
  [disabled]="loading()"
>
  @if (loading()) {
    <span class="spinner" aria-hidden="true"></span>
    <span class="sr-only">Carregando...</span>
  } @else {
    Salvar
  }
</button>

<!-- ✅ Expandir/Colapsar -->
<button
  [attr.aria-expanded]="isOpen()"
  aria-controls="content-panel"
  (click)="toggle()"
>
  {{ isOpen() ? 'Fechar' : 'Abrir' }}
</button>
<div id="content-panel" [hidden]="!isOpen()">
  <!-- Conteúdo -->
</div>

<!-- ✅ Modal -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  [attr.aria-hidden]="!isOpen()"
>
  <h2 id="modal-title">Título do Modal</h2>
  <!-- Conteúdo -->
</div>
```

### Tabelas
```html
<!-- ✅ Tabela com cabeçalhos -->
<table role="table" aria-label="Produtos">
  <thead>
    <tr>
      <th scope="col">Nome</th>
      <th scope="col">Preço</th>
      <th scope="col">Ações</th>
    </tr>
  </thead>
  <tbody>
    @for (product of products(); track product.id) {
      <tr>
        <td>{{ product.name }}</td>
        <td>{{ product.price | currency }}</td>
        <td>
          <button aria-label="Editar {{ product.name }}">
            Editar
          </button>
        </td>
      </tr>
    }
  </tbody>
</table>
```

### Live Regions
```html
<!-- ✅ Notificações para leitores de tela -->
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  class="sr-only"
>
  @if (successMessage()) {
    {{ successMessage() }}
  }
</div>

<!-- ✅ Erros críticos -->
<div
  role="alert"
  aria-live="assertive"
  aria-atomic="true"
>
  @if (criticalError()) {
    {{ criticalError() }}
  }
</div>
```

---

## 🎨 Contraste de Cores

### Níveis WCAG
```css
/* ✅ Texto normal: mínimo 4.5:1 */
.text-normal {
  color: var(--color-gray-700);  /* #374151 */
  background: var(--color-background);  /* #ffffff */
  /* Contraste: 10.89:1 ✓ */
}

/* ✅ Texto grande (18px+): mínimo 3:1 */
.text-large {
  color: var(--color-gray-600);  /* #4b5563 */
  background: var(--color-background);  /* #ffffff */
  /* Contraste: 7.52:1 ✓ */
}

/* ✅ Componentes UI: mínimo 3:1 */
.button-outline {
  border: 1px solid var(--color-gray-400);  /* #9ca3af */
  /* Contraste com fundo: 3.17:1 ✓ */
}
```

### Ferramentas de Verificação
- Chrome DevTools: Lighthouse (Accessibility audit)
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- WAVE: https://wave.webaim.org/

---

## 🖼️ Imagens e Ícones

### Imagens Decorativas
```html
<!-- ✅ Imagem decorativa -->
<img src="decoration.png" alt="" role="presentation" />

<!-- ✅ Ícone decorativo -->
<svg aria-hidden="true"><!-- ícone --></svg>
```

### Imagens Informativas
```html
<!-- ✅ Imagem com alt text -->
<img src="product.jpg" alt="iPhone 15 Pro na cor azul titânio" />

<!-- ✅ Gráfico -->
<img src="chart.png" alt="Gráfico de vendas mostrando crescimento de 30% em março" />
```

### Ícones com Significado
```html
<!-- ✅ Ícone com label -->
<button aria-label="Adicionar ao carrinho">
  <svg aria-hidden="true">
    <!-- ícone de carrinho -->
  </svg>
</button>

<!-- ✅ Ícone com texto visível -->
<button>
  <svg aria-hidden="true"><!-- ícone --></svg>
  <span>Salvar</span>
</button>
```

---

## 📱 Touch Targets

### Tamanho Mínimo
```css
/* ✅ Botões/links com mínimo 44x44px (iOS) ou 48x48px (Android) */
.btn,
.icon-button,
a {
  min-height: 44px;
  min-width: 44px;
}

/* ✅ Espaçamento entre targets */
.button-group {
  display: flex;
  gap: var(--spacing-2);  /* Mínimo 8px */
}
```

---

## 🔊 Screen Reader Only

### Classe Utilitária
```css
/* ✅ Conteúdo visível apenas para leitores de tela */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

```html
<!-- Uso -->
<button>
  <svg aria-hidden="true"><!-- ícone --></svg>
  <span class="sr-only">Fechar</span>
</button>
```

---

## 📋 Formulários Acessíveis

### Validação
```html
<!-- ✅ Erro anunciado ao leitor de tela -->
<div class="form-group">
  <label for="email">E-mail</label>
  <input
    id="email"
    type="email"
    [attr.aria-invalid]="emailError() ? 'true' : 'false'"
    aria-describedby="email-error"
  />
  @if (emailError(); as error) {
    <span id="email-error" role="alert" class="form-error">
      {{ error }}
    </span>
  }
</div>
```

### Autocompletar
```html
<!-- ✅ Autocomplete para dados sensíveis -->
<input
  type="email"
  autocomplete="email"
  aria-label="E-mail"
/>

<input
  type="password"
  autocomplete="current-password"
  aria-label="Senha"
/>
```

---

## 🎬 Animações

### Respeitar Preferências
```css
/* ✅ Desabilitar animações se usuário preferir */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## ✅ Checklist de Acessibilidade

- [ ] Navegação completa por teclado
- [ ] Focus visível em todos os elementos interativos
- [ ] Skip links para conteúdo principal
- [ ] ARIA labels em botões/ícones
- [ ] ARIA states em elementos dinâmicos
- [ ] Alt text em imagens informativas
- [ ] Contraste mínimo 4.5:1 para texto
- [ ] Touch targets mínimo 44x44px
- [ ] Formulários com labels associados
- [ ] Erros de validação com role="alert"
- [ ] Live regions para notificações
- [ ] Landmarks semânticos (header, nav, main, footer)
- [ ] HTML válido e semântico
- [ ] Respeitar prefers-reduced-motion
- [ ] Testado com leitor de tela (NVDA/JAWS/VoiceOver)

---

## 🔧 Ferramentas

### Testes Automatizados
- **axe DevTools**: Extensão do Chrome/Firefox
- **Lighthouse**: Chrome DevTools → Audits
- **WAVE**: https://wave.webaim.org/

### Testes Manuais
- **NVDA** (Windows): https://www.nvaccess.org/
- **JAWS** (Windows): https://www.freedomscientific.com/
- **VoiceOver** (macOS/iOS): Cmd+F5

### Verificação de Contraste
- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Chrome DevTools**: Color picker mostra ratio de contraste

---

## 📚 Referências

- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Authoring Practices**: https://www.w3.org/WAI/ARIA/apg/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **A11y Project**: https://www.a11yproject.com/

