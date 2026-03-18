# Regra 14 — Estilização (Tailwind + Design Tokens)

## Estratégia do projeto
O projeto usa **design tokens** em `src/styles.css` para páginas e componentes. Ver `.ai/design/`.

- **Páginas e detail pages**: CSS custom com `var(--foreground)`, `var(--card)`, `var(--border)`, etc. Suporta dark mode via classe `.dark`.
- **Tailwind**: Disponível para utilitários; cores primárias em `tailwind.config.js`.
- **Botões**: Usar classes `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger` de `styles.css`.
- Proibido CSS inline (`style="..."`).

## Configuração

O Tailwind está configurado em `tailwind.config.js` com:
- `content`: `./src/**/*.{html,ts}` (para purge automático)
- `theme.extend.colors.primary`: palette customizada alinhada com design tokens

## Padrão obrigatório

### ✅ Páginas: usar tokens ERP em CSS custom

```html
<!-- feature.page.html -->
<section class="feature-page">
  <div class="feature-page__card">
    <button type="button" class="btn btn-primary">Salvar</button>
  </div>
</section>
```

```css
/* feature.page.css */
.feature-page__card {
  padding: var(--spacing-4);
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}
```

### ✅ Tailwind: quando usar utility classes

```html
<div class="flex items-center gap-4 p-6">
  <button class="btn btn-primary">Salvar</button>
</div>
```

### ✅ Usar @apply para componentes reutilizáveis

**Somente** em arquivos `.css` de componentes reutilizáveis (ex: botões, cards, inputs):

```css
/* button.component.css */
.btn-primary {
  @apply px-4 py-2 bg-primary-600 text-white rounded-md;
  @apply hover:bg-primary-700 focus:outline-none focus:ring-2;
  @apply focus:ring-primary-500 focus:ring-offset-2;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
  @apply transition-colors duration-200;
}

.btn-secondary {
  @apply px-4 py-2 bg-gray-200 text-gray-900 rounded-md;
  @apply hover:bg-gray-300 focus:outline-none focus:ring-2;
  @apply focus:ring-gray-500 focus:ring-offset-2;
}
```

### ❌ NUNCA usar CSS inline

```html
<!-- ❌ PROIBIDO -->
<div style="display: flex; padding: 24px; background: white;">
  <button style="color: red;">Deletar</button>
</div>

<!-- ✅ CORRETO -->
<div class="flex p-6 bg-white">
  <button class="text-red-600 hover:text-red-700">Deletar</button>
</div>
```

### ❌ NUNCA criar CSS custom quando existe utility

```css
/* ❌ PROIBIDO */
.my-flex-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.my-card {
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

```html
<!-- ✅ CORRETO -->
<div class="flex items-center gap-4">...</div>
<div class="p-6 bg-white rounded-lg shadow-md">...</div>
```

## Convenções de nomenclatura

### Espaçamentos
- `p-4` (padding: 1rem)
- `m-6` (margin: 1.5rem)
- `gap-2` (gap: 0.5rem)
- `space-x-4` (horizontal spacing entre children)

### Cores
- `bg-primary-600` (background primário)
- `text-gray-700` (texto secundário)
- `border-gray-300` (bordas)
- `hover:bg-primary-700` (hover state)

### Tipografia
- `text-sm` (0.875rem)
- `text-base` (1rem)
- `font-medium` (500)
- `font-semibold` (600)

### Layout
- `flex` + `items-center` + `justify-between`
- `grid grid-cols-3 gap-4`
- `w-full` / `h-full`
- `max-w-7xl` / `mx-auto`

### Estados
- `hover:bg-primary-700`
- `focus:ring-2 focus:ring-primary-500`
- `disabled:opacity-50`
- `active:bg-primary-800`

### Responsividade
- `md:flex` (flex no breakpoint md+)
- `lg:grid-cols-4` (4 colunas no breakpoint lg+)
- `sm:text-base md:text-lg`

## Breakpoints padrão

| Breakpoint | Min-width | Uso |
|------------|-----------|-----|
| `sm` | 640px | Tablets pequenos |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Desktops grandes |

## Palette de cores customizada

Definida em `tailwind.config.js`:

```js
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... até 900
    600: '#2563eb', // cor principal
  }
}
```

Usar `bg-primary-600`, `text-primary-700`, etc.

## Formulários

```html
<div class="space-y-4">
  <div>
    <label for="email" class="block text-sm font-medium text-gray-700">
      Email
    </label>
    <input
      id="email"
      type="email"
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md
             focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
             disabled:bg-gray-100 disabled:cursor-not-allowed"
    />
    @if (emailError) {
      <p class="mt-1 text-sm text-red-600" role="alert">{{ emailError }}</p>
    }
  </div>
</div>
```

## Botões (preferir classes de styles.css)

```html
<!-- Primary -->
<button type="button" class="btn btn-primary">Salvar</button>

<!-- Secondary -->
<button type="button" class="btn btn-secondary">Cancelar</button>

<!-- Danger -->
<button type="button" class="btn btn-danger">Deletar</button>
```

Ver `.ai/design/components.md` para detalhes.

## Cards

```html
<div class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  <h3 class="text-lg font-semibold text-gray-900 mb-2">Título</h3>
  <p class="text-sm text-gray-600">Descrição do card...</p>
</div>
```

## Tabelas

```html
<div class="overflow-x-auto">
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Nome
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      @for (item of items(); track item.id) {
        <tr class="hover:bg-gray-50">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ item.name }}
          </td>
        </tr>
      }
    </tbody>
  </table>
</div>
```

## Loading States

```html
<!-- Spinner -->
<div class="flex items-center justify-center">
  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
</div>

<!-- Skeleton -->
<div class="animate-pulse space-y-4">
  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
  <div class="h-4 bg-gray-200 rounded w-1/2"></div>
</div>
```

## Alertas

```html
<!-- Success -->
<div class="bg-green-50 border border-green-200 rounded-md p-4">
  <p class="text-sm text-green-800">Operação realizada com sucesso!</p>
</div>

<!-- Error -->
<div class="bg-red-50 border border-red-200 rounded-md p-4">
  <p class="text-sm text-red-800">Erro ao processar requisição.</p>
</div>

<!-- Warning -->
<div class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
  <p class="text-sm text-yellow-800">Atenção: dados podem estar desatualizados.</p>
</div>

<!-- Info -->
<div class="bg-blue-50 border border-blue-200 rounded-md p-4">
  <p class="text-sm text-blue-800">Esta funcionalidade está em beta.</p>
</div>
```

## Modals

```html
<div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Título do Modal</h2>
    <p class="text-sm text-gray-600 mb-6">Conteúdo...</p>
    <div class="flex justify-end gap-3">
      <button class="px-4 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300">
        Cancelar
      </button>
      <button class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
        Confirmar
      </button>
    </div>
  </div>
</div>
```

## Dark Mode

O projeto usa tokens ERP que mudam com a classe `.dark` no `html`. Ver `rules/16-darktheme.md`.

Ao usar `var(--foreground)`, `var(--card)`, `var(--border)`, etc., o dark mode é automático — não é necessário `dark:` em cada elemento.

## Performance

- Tailwind purga classes não usadas automaticamente via `content` em produção
- Resultado: CSS final ~10-20KB gzipped
- Não há overhead de runtime, apenas classes aplicadas

## Ferramentas recomendadas

- **VSCode Extension**: "Tailwind CSS IntelliSense"
- **Prettier Plugin**: `prettier-plugin-tailwindcss` (ordena classes)

## Migração de CSS existente

Se um componente já tem CSS custom:

1. Identificar padrões (flex, padding, cores)
2. Substituir por utilities do Tailwind
3. Mover regras complexas/reutilizáveis para `@apply` em `.css` do componente
4. Remover arquivo `.css` se ficou vazio

## Antipadrões proibidos

- CSS inline (`style="..."`)
- CSS global em `styles.css` para layout de features
- Classes custom quando existe utility equivalente
- `!important` para sobrescrever Tailwind (refatorar especificidade)
- Unidades absolutas (px) em vez de rem/em quando possível

## Checklist de validação

- [ ] Nenhum `style="..."` nos templates
- [ ] Classes Tailwind usadas para layout, espaçamento, cores
- [ ] `@apply` usado apenas em componentes reutilizáveis
- [ ] Responsividade com breakpoints (`sm:`, `md:`, etc.)
- [ ] Estados interativos (`hover:`, `focus:`, `disabled:`)
- [ ] Acessibilidade preservada (outline, focus ring)

