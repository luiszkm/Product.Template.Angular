# Product Template Angular

> Template Angular enterprise AI-first para integração com backend Product.Template (.NET 10)

[![Angular](https://img.shields.io/badge/Angular-21.2-DD0031?logo=angular)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Standalone](https://img.shields.io/badge/Components-Standalone-success)]()
[![OnPush](https://img.shields.io/badge/Change%20Detection-OnPush-success)]()

---

## 🎯 Visão Geral

Template enterprise-grade de aplicação Angular standalone seguindo:
- **Clean Architecture** adaptada para frontend
- **Feature-first** com lazy loading obrigatório
- **Signals** para estado reativo (RxJS apenas para I/O)
- **Tailwind CSS 3** para estilização utility-first
- **RBAC** (roles e permissions do JWT)
- **Multi-tenant** (header `X-Tenant` obrigatório)
- **ProblemDetails RFC 9457** para tratamento de erros
- **AI-ready** com 14 regras + 6 prompts + 3 checklists

---

## 🚀 Quick Start

### Pré-requisitos
- Node.js 20+
- Angular CLI 21.2+
- Backend Product.Template rodando em `http://localhost:8080`

### Instalação

```bash
# Clone o repositório (ou crie um repo a partir do template no GitHub)
git clone <repo-url>
cd ProductTemplateAngular

# Instale dependências
npm install

# Variáveis de ambiente (obrigatório para arranque)
cp .env.example .env.development
# Edite NG_APP_API_URL, NG_APP_TENANT_SLUG, NG_APP_OAUTH_REDIRECT_URI

# Inicie o dev server (carrega .env.development)
npm start

# Acesse http://localhost:4200
```

**Novo projeto a partir deste template** (GitHub Template, clone raso, renomeação do projeto): ver [docs/TEMPLATE-SETUP.md](docs/TEMPLATE-SETUP.md).

### Build de produção

```bash
ng build --configuration production
```

Artifacts em `dist/ProductTemplateAngular/`.

---

## 📂 Estrutura do Projeto

```
src/
  environments/             ← Configuração por ambiente (dev, prod)
  app/
    core/                   ← Infraestrutura global
      api/                  ← ApiClient, tipos, configuração
      auth/                 ← Autenticação, JWT, OAuth, refresh token
      guards/               ← authGuard, roleGuard
      interceptors/         ← refresh-token.interceptor
      errors/               ← Páginas 403, 404
    shared/                 ← Componentes reutilizáveis cross-feature
    features/               ← Features de negócio (lazy loaded)
      products/
      users/
      orders/
    layouts/                ← Shell de navegação
.ai/                        ← 🤖 Regras e prompts AI
  rules/                    ← 14 arquivos de regras
  prompts/                  ← 6 prompts de geração
  checklists/               ← 3 checklists de validação
  examples/                 ← Exemplo de referência (products)
docs/                       ← Documentação
  TEMPLATE-SETUP.md         ← Template: setup rápido, checklist, init-template
  backendSummary/           ← Contratos da API backend
  gap-analysis.md           ← Auditoria de alinhamento
```

---

## 🤖 Desenvolvimento com IA (GitHub Copilot / Cursor / Windsurf)

Este template foi projetado para **maximizar a produtividade com IA**. Todas as convenções, padrões e antipadrões estão documentados em `.ai/`.

### Como usar

1. **Abra o workspace** no seu IDE com Copilot/Cursor/Windsurf
2. **A IA lerá automaticamente** os arquivos em `.ai/rules/` e `.ai/prompts/`
3. **Use os prompts** para gerar código consistente:

```
📌 Prompt: "Crie uma feature de invoices com CRUD completo"
→ A IA gerará seguindo .ai/prompts/create-feature.md

📌 Prompt: "Crie um componente de avatar de usuário"
→ A IA gerará seguindo .ai/prompts/create-component.md

📌 Prompt: "Adicione validação de CPF no formulário de usuário"
→ A IA aplicará as regras de .ai/rules/11-forms.md
```

### Regras AI cobertas

| Regra | Cobre |
|-------|-------|
| `00-global.md` | Princípios gerais, critérios de aceite |
| `01-architecture.md` | Estrutura de pastas, camadas, dependências |
| `02-features.md` | Feature-first, responsabilidades |
| `03-components.md` | Standalone, OnPush, signals |
| `04-services.md` | Stateless, ApiClient |
| `05-state.md` | Signals, computed, effect, stores |
| `06-api.md` | Contratos, erros, headers |
| `07-style.md` | Código TypeScript, nomenclatura |
| `08-security.md` | Auth, RBAC, multi-tenant, refresh token |
| `09-performance.md` | OnPush, lazy loading, preloading |
| `10-routing.md` | Guards, OAuth callback, provideRouter |
| `11-forms.md` | Reactive Forms, validação, erros da API |
| `12-tests.md` | Specs de Store, Service, Guard, Component |
| `13-observability.md` | Correlation ID, Retry-After, health check |
| `14-tailwind.md` | Utility classes, @apply, responsividade |
| `15-i18n.md` | Internacionalização PT-BR/EN-US, translate pipe |
| `16-darktheme.md` | Dark theme, toggle, class-based, persistência |

Antes de commitar, execute os checklists:

```bash
# Valide um componente
cat .ai/checklists/component.md

# Valide uma feature completa
cat .ai/checklists/feature.md

# Valide acessibilidade
cat .ai/checklists/accessibility.md
```

---

## 🔐 Autenticação e Autorização

### Fluxos suportados

| Método | Endpoint | Implementação |
|--------|----------|---------------|
| Email + Senha | `POST /identity/login` | ✅ `LoginPage` |
| Microsoft OAuth | `POST /identity/external-login` | ✅ `OAuthCallbackPage` |
| Refresh Token | `POST /identity/refresh` | ✅ `refresh-token.interceptor` |

### RBAC

Roles e permissions são lidas do **JWT** e gerenciadas pelo `AuthSessionService`:

```ts
// No componente
readonly canDelete = computed(() =>
  this.session.isAdmin() || this.session.hasPermission('users.manage')
);

// No template
@if (canDelete()) {
  <button (click)="onDelete()">Remover</button>
}

// Na rota (app.routes.ts)
{
  path: 'users',
  canActivate: [authGuard, roleGuard],
  data: { requiredPermission: 'users.read' }
}
```

---

## 📡 Integração com API Backend

### Headers automáticos (via `ApiClient`)

| Header | Valor | Quando |
|--------|-------|--------|
| `X-Tenant` | `environment.tenantSlug` | Sempre |
| `Authorization` | `Bearer {token}` | Quando autenticado |
| `X-Idempotency-Key` | `crypto.randomUUID()` | POST/PUT críticos |

### Tratamento de erros (ProblemDetails RFC 9457)

```ts
// Erro 400 com validação de campos
{
  "status": 400,
  "errors": {
    "email": ["Email inválido."],
    "password": ["Mínimo 8 caracteres."]
  }
}
→ Mapeado automaticamente nos campos do formulário

// Erro 5xx
{
  "status": 500,
  "detail": "Erro interno"
}
+ Header: X-Correlation-ID: abc-123
→ Exibido ao usuário: "Erro inesperado. ID de suporte: abc-123"
```

---

## 🧪 Testes

```bash
# Executar testes unitários
ng test

# Executar com cobertura
ng test --coverage

# Build + testes em CI
ng build --configuration production && ng test --watch=false
```

### Cobertura esperada

| Artefato | Cobertura mínima |
|----------|------------------|
| Stores | 80% branches |
| Services | 80% branches |
| Guards | 100% |
| Components reutilizáveis | 70% |

Veja padrões em `.ai/rules/12-tests.md`.

---

## 🎨 Estilização (Tailwind CSS)

Este projeto usa **Tailwind CSS v3** como framework de estilização padrão.

### Convenções obrigatórias

✅ **SEMPRE usar utility classes:**
```html
<button class="px-4 py-2 bg-primary-600 text-white rounded-md 
               hover:bg-primary-700 focus:ring-2 focus:ring-primary-500">
  Salvar
</button>
```

✅ **Usar @apply para componentes reutilizáveis:**
```css
/* button.component.css */
.btn-primary {
  @apply px-4 py-2 bg-primary-600 text-white rounded-md;
  @apply hover:bg-primary-700 focus:ring-2 focus:ring-primary-500;
}
```

❌ **NUNCA usar CSS inline:**
```html
<!-- ❌ Proibido -->
<div style="display: flex; padding: 24px;">

<!-- ✅ Correto -->
<div class="flex p-6">
```

### Documentação completa

- **Guia rápido:** [`TAILWIND.md`](TAILWIND.md)
- **Regras e padrões:** [`.ai/rules/14-tailwind.md`](.ai/rules/14-tailwind.md)

### Ferramentas recomendadas

- **VSCode Extension:** "Tailwind CSS IntelliSense"
- **Prettier Plugin:** `prettier-plugin-tailwindcss`

---

## 🌙 Dark Theme

O template suporta **dark mode** com alternância dinâmica.

### Uso básico

```html
<!-- Componentes adaptam automaticamente -->
<div class="bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-50">
  Conteúdo adaptável
</div>

<!-- Toggle já incluído no shell layout -->
<app-theme-toggle />
```

### Configuração

```typescript
// Component
readonly theme = inject(ThemeService);

// Mudar tema
theme.setTheme('dark');  // 'light' | 'dark' | 'system'
theme.toggleTheme();     // Alterna entre light/dark
```

### Padrões

- ✅ Class-based dark mode (Tailwind `dark:` classes)
- ✅ Persistência no localStorage
- ✅ Detecção automática do tema do OS (`system` mode)
- ✅ Transições suaves entre temas
- ✅ Contraste WCAG AA em ambos os temas

**Detalhes:** Ver `.ai/rules/16-darktheme.md`

---

## 🌍 Multi-tenant

Configure o tenant em `src/environments/environment.ts`:

```ts
export const environment = {
  apiUrl: 'https://api.exemplo.com/api/v1',
  tenantSlug: 'acme',  // ← slug do tenant
  oauthRedirectUri: 'https://app.exemplo.com/auth/callback'
};
```

O header `X-Tenant: acme` será enviado automaticamente em todas as requisições.

---

## 📚 Documentação Adicional

| Arquivo | Conteúdo |
|---------|----------|
| `docs/backendSummary/api-contracts.md` | Todos os endpoints da API |
| `docs/backendSummary/auth-guide.md` | Fluxos de autenticação |
| `docs/backendSummary/rbac-guide.md` | Roles, permissions, policies |
| `docs/backendSummary/error-handling.md` | ProblemDetails, códigos HTTP |
| `docs/gap-analysis.md` | Auditoria de alinhamento |
| `.ai/examples/feature-example.md` | Referência da feature Products |

---

## 🛠️ Stack Tecnológica

- **Angular 21.2** — Framework com standalone components
- **TypeScript 5.9** — Strict mode habilitado
- **Signals** — Estado reativo (RxJS apenas para I/O)
- **Reactive Forms** — Validação tipada
- **Jasmine + Karma** — Testes unitários
- **Tailwind CSS** — Utilitários (opcional)

---

## 🤝 Contribuindo

1. Leia as regras em `.ai/rules/00-global.md`
2. Use os prompts em `.ai/prompts/` para gerar código
3. Valide com os checklists em `.ai/checklists/`
4. Execute `ng build` e `ng test` antes de commitar
5. Certifique-se que a feature fica em chunk lazy separado

---

## 📄 Licença

[MIT](LICENSE) — Template enterprise mantido pelo time de arquitetura.

---

## 🔗 Links Úteis

- [Angular Documentation](https://angular.dev)
- [Backend Product.Template](link-do-backend-repo)
- [Documentação da API](link-do-scalar-ou-swagger)
- [Guia de RBAC](docs/backendSummary/rbac-guide.md)
