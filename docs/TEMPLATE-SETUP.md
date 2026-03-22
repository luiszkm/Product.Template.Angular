# Setup rápido a partir deste template

Guia para **consumidores** do template (novo projeto) e **mantenedores** do repositório fonte.

---

## Para mantenedores: ativar GitHub Template Repository

O repositório no GitHub não vira template automaticamente. Quem gere o repo fonte deve:

1. Abrir o repositório no GitHub.
2. Ir a **Settings** (definições do repositório).
3. Na secção **General**, localizar **Template repository**.
4. Marcar a opção **Template repository** e guardar.

Depois disso, o botão **Use this template** aparece na página principal do repositório e permite criar novos repositórios sem histórico do template (conforme opções do GitHub).

---

## Caminhos para obter o código

### 1. GitHub Template (recomendado)

Após o template estar ativo no GitHub:

1. Clicar em **Use this template** → **Create a new repository**.
2. Clonar o novo repositório e seguir [Setup local mínimo](#setup-local-mínimo).

### 2. Clone raso

Útil para CI ou quando o Git está noutra plataforma (GitLab, Azure DevOps, etc.):

```bash
git clone --depth 1 <url-do-template> meu-projeto
cd meu-projeto
rm -rf .git
git init
```

### 3. Snapshot sem pasta `.git` (degit)

```bash
npx degit <utilizador>/<repositorio> meu-projeto
cd meu-projeto
```

Substitua `<utilizador>/<repositorio>` pelo caminho do repositório no GitHub.

---

## Setup local mínimo

```bash
npm install
cp .env.example .env.development
# Editar .env.development: NG_APP_API_URL, NG_APP_TENANT_SLUG, NG_APP_OAUTH_REDIRECT_URI
npm start
```

A aplicação fica em `http://localhost:4200` (por defeito). As variáveis são validadas em arranque; ver [`src/environments/env.validator.ts`](../src/environments/env.validator.ts).

Para produção local, copie também para `.env.production` ou use os scripts `build` / `start:prod` definidos em `package.json`.

---

## Checklist: personalizar o novo projeto

### Obrigatório para integrar com o backend

| Passo | Detalhe |
|--------|---------|
| Ficheiros `.env` | Copiar `.env.example` para `.env.development` e `.env.production` e ajustar URLs, tenant e OAuth. |

### Recomendado: nome e branding da aplicação

| Passo | Detalhe |
|--------|---------|
| Renomeação assistida | Executar `npm run init-template` (ver abaixo) **ou** editar manualmente os ficheiros indicados na tabela seguinte. |

| O quê | Onde |
|--------|------|
| Nome do pacote npm | `package.json`, `package-lock.json` |
| Nome do projeto Angular CLI (`ng build`, `dist/`) | `angular.json` (chave do projeto e `buildTarget`) |
| Título no browser | `src/index.html` |
| Texto da sidebar | `src/app/layouts/shell/shell-layout.component.html` |
| README / CONTRIBUTING (caminhos `cd`, `dist/`) | `README.md`, `CONTRIBUTING.md` |
| Comentário dos estilos globais | `src/styles.css` |

---

## Script `init-template`

Substitui os valores por defeito do template pelos do seu produto (uma única vez, após clonar).

**Uso:**

```bash
npm run init-template -- \
  --npm-name acme-portal \
  --angular-project AcmePortal \
  --app-title "Acme Portal" \
  --shell-brand "Acme"
```

| Argumento | Descrição |
|-----------|-----------|
| `--npm-name` | Nome npm em *kebab-case* (ex.: `acme-portal`). |
| `--angular-project` | Nome do projeto no `angular.json`, em *PascalCase* (ex.: `AcmePortal`). Deve coincidir com a pasta de saída em `dist/<nome>/`. |
| `--app-title` | Texto do `<title>` em `index.html`, cabeçalho do `README` e comentário em `src/styles.css`. |
| `--shell-brand` | Texto visível na sidebar (substitui "Product Template"). |

**Depois do script:** executar `npm install` para garantir consistência do `package-lock.json` se alterar manualmente outras dependências.

---

## CI de exemplo (opcional)

Para validar cada clone, pode adicionar um workflow em `.github/workflows/` que execute `npm ci` e `ng build --configuration production`. Não está incluído por defeito para não impor GitHub Actions a todos os consumidores do template.
