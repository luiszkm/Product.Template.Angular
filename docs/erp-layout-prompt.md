# Prompt Completo para Replicar Layout ERP Moderno

## Descrição Geral

Crie um sistema ERP completo e moderno com design inspirado em Apple, JetBrains (YouTrack), Linear e Notion. O sistema deve ter tema dark e light com transição suave, interface minimalista, alta legibilidade e foco em produtividade.

---

## Design System - Tokens de Cores

### Light Theme (Apple Inspired)

#### Backgrounds
```css
--background: #fafafa
--background-secondary: #f5f5f5
--surface: #ffffff
--elevated-surface: #ffffff
``` 

#### Foregrounds
```css
--foreground: #1a1a1a
--foreground-secondary: #6b7280
```

#### Primary Colors (Blue Tech Elegant)
```css
--primary-50: #eff6ff
--primary-100: #dbeafe
--primary-200: #bfdbfe
--primary-300: #93c5fd
--primary-400: #60a5fa
--primary-500: #3b82f6 (main)
--primary-600: #2563eb
--primary-700: #1d4ed8
--primary-800: #1e40af
--primary-900: #1e3a8a
--primary-foreground: #ffffff
```

#### Neutral Colors (Modern Gray Scale)
```css
--neutral-0: #ffffff
--neutral-50: #fafafa
--neutral-100: #f5f5f5
--neutral-200: #e5e5e5
--neutral-300: #d4d4d4
--neutral-400: #a3a3a3
--neutral-500: #737373
--neutral-600: #525252
--neutral-700: #404040
--neutral-800: #262626
--neutral-900: #171717
```

#### Status Colors
```css
--success: #10b981
--success-foreground: #ffffff

--warning: #f59e0b
--warning-foreground: #ffffff

--error: #ef4444
--error-foreground: #ffffff

--info: #3b82f6
--info-foreground: #ffffff
```

#### UI Elements
```css
--card: #ffffff
--card-foreground: #1a1a1a

--border: rgba(0, 0, 0, 0.08)
--input-background: #f5f5f5
--muted: #f5f5f5
--muted-foreground: #737373
```

#### Sidebar
```css
--sidebar: #ffffff
--sidebar-foreground: #1a1a1a
--sidebar-primary: #3b82f6
--sidebar-primary-foreground: #ffffff
--sidebar-accent: #f5f5f5
--sidebar-accent-foreground: #1a1a1a
--sidebar-border: rgba(0, 0, 0, 0.08)
```

---

### Dark Theme (JetBrains/YouTrack Inspired)

#### Backgrounds
```css
--background: #1a1a1a (cinza azulado profundo)
--background-secondary: #212121
--surface: #262626 (cinza escuro suave)
--elevated-surface: #2d2d2d
```

#### Foregrounds
```css
--foreground: #fafafa
--foreground-secondary: #a3a3a3
```

#### Primary Colors (Blue Tech Elegant)
```css
--primary-50: #1e3a8a
--primary-100: #1e40af
--primary-200: #1d4ed8
--primary-300: #2563eb
--primary-400: #3b82f6
--primary-500: #60a5fa (main inverted)
--primary-600: #93c5fd
--primary-700: #bfdbfe
--primary-800: #dbeafe
--primary-900: #eff6ff
--primary-foreground: #ffffff
```

#### Neutral Colors (Modern Gray Scale - Inverted)
```css
--neutral-0: #171717
--neutral-50: #1a1a1a
--neutral-100: #212121
--neutral-200: #262626
--neutral-300: #2d2d2d
--neutral-400: #404040
--neutral-500: #525252
--neutral-600: #737373
--neutral-700: #a3a3a3
--neutral-800: #d4d4d4
--neutral-900: #fafafa
```

#### Status Colors (Same as Light)
```css
--success: #10b981
--success-foreground: #ffffff

--warning: #f59e0b
--warning-foreground: #1a1a1a

--error: #ef4444
--error-foreground: #ffffff

--info: #3b82f6
--info-foreground: #ffffff
```

#### UI Elements
```css
--card: #262626
--card-foreground: #fafafa

--border: rgba(255, 255, 255, 0.08) (bordas 1px sutis)
--input-background: #2d2d2d
--muted: #2d2d2d
--muted-foreground: #a3a3a3
```

#### Sidebar
```css
--sidebar: #212121
--sidebar-foreground: #fafafa
--sidebar-primary: #3b82f6
--sidebar-primary-foreground: #ffffff
--sidebar-accent: #2d2d2d
--sidebar-accent-foreground: #fafafa
--sidebar-border: rgba(255, 255, 255, 0.08)
```

---

## Tokens de Tipografia

### Fonte
```css
Font-family: Inter (ou SF Pro style)
```

### Escala de Tamanhos
```css
--font-size: 16px (base)

H1: 2xl (text-2xl)
H2: xl (text-xl)
H3: lg (text-lg)
H4: base (text-base)
Body: base
Caption: sm (text-sm)
Label: xs (text-xs)
```

### Pesos
```css
--font-weight-normal: 400
--font-weight-medium: 500
--font-weight-semibold: 600
```

---

## Tokens de Espaçamento

### Sistema baseado em 8px
```css
--spacing-1: 0.5rem (8px)
--spacing-2: 1rem (16px)
--spacing-3: 1.5rem (24px)
--spacing-4: 2rem (32px)
--spacing-6: 3rem (48px)
--spacing-8: 4rem (64px)
```

### Border Radius
```css
--radius: 0.5rem (8px)
--radius-sm: calc(var(--radius) - 4px) = 4px
--radius-md: calc(var(--radius) - 2px) = 6px
--radius-lg: var(--radius) = 8px
--radius-xl: calc(var(--radius) + 4px) = 12px
```

---

## Layout Structure

### Estrutura Geral
```
┌─────────────────────────────────────────────────┐
│                    TopBar (56px)                 │
├──────────┬──────────────────────────────────────┤
│          │                                       │
│ Sidebar  │        Main Content Area             │
│ (240px)  │         (Scrollable)                 │
│          │                                       │
│          │                                       │
└──────────┴──────────────────────────────────────┘
```

---

## Componentes Detalhados

### 1. Sidebar (240px width)

#### Estrutura
- **Header**: Logo/Título do sistema
  - Padding: 24px (1.5rem)
  - Border-bottom: 1px solid var(--sidebar-border)
  - Font-size: text-xl
  - Font-weight: semibold

- **Navigation Items**:
  - Padding container: 12px (0.75rem)
  - Espaçamento entre itens: 4px (space-y-1)
  - Cada item:
    - Padding: 12px horizontal, 8px vertical
    - Border-radius: 6px (rounded-md)
    - Display: flex, items-center, gap: 12px
    - Icon size: 20px (w-5 h-5)
    - Font-size: text-sm
    - Font-weight: medium
  
- **Estado Ativo**:
  - Background: var(--sidebar-accent)
  - Color: var(--sidebar-accent-foreground)

- **Estado Hover**:
  - Background: var(--sidebar-accent) com 50% opacity
  - Transition: colors

- **Itens do Menu**:
  1. Dashboard (LayoutDashboard icon)
  2. Clientes (Users icon)
  3. Vendas (ShoppingCart icon)
  4. Financeiro (DollarSign icon)
  5. Estoque (Package icon)
  6. Relatórios (FileText icon)
  7. Administração (Settings icon)

---

### 2. TopBar (56px height)

#### Estrutura
- Background: var(--surface)
- Border-bottom: 1px solid var(--border)
- Padding horizontal: 24px

#### Elementos da Esquerda
- **Search Input**:
  - Width: 100% (max-width: 640px)
  - Background: var(--input-background)
  - Border-radius: 8px (rounded-lg)
  - Padding: 8px 16px 8px 40px
  - Icon position: absolute left-12px
  - Icon size: 16px (w-4 h-4)
  - Icon color: var(--foreground-secondary)
  - Placeholder: "Busca global..."
  - Focus: ring-2 ring-primary

#### Elementos da Direita
- **Theme Toggle Button**:
  - Padding: 8px
  - Border-radius: 8px
  - Hover: background var(--accent)
  - Icon: Moon (dark mode) / Sun (light mode)
  - Icon size: 20px

- **Notification Button**:
  - Padding: 8px
  - Border-radius: 8px
  - Hover: background var(--accent)
  - Badge: red dot (8px) absolute top-right
  - Icon: Bell, size 20px

- **User Profile**:
  - Display: flex, items-center, gap: 12px
  - Border-left: 1px solid var(--border)
  - Padding-left: 12px
  - **Text**:
    - Nome: text-sm, font-medium
    - Cargo: text-xs, color var(--foreground-secondary)
  - **Avatar**:
    - Size: 36px (w-9 h-9)
    - Border-radius: full (rounded-full)
    - Background: var(--primary)
    - Color: var(--primary-foreground)
    - Icon: User, size 20px

---

### 3. Main Content Area

#### Container
- Padding: 32px (p-8)
- Max-width: 1600px
- Margin: auto
- Space-y: 32px

#### Header Section
- **Title**: 
  - Font-size: text-3xl
  - Font-weight: semibold
  - Margin-bottom: 8px
  - Text: "Dashboard"
  
- **Subtitle**:
  - Color: var(--foreground-secondary)
  - Text: "Visão geral do sistema ERP"

---

### 4. Metric Cards

#### Grid Layout
- Grid: 1 coluna (mobile) → 2 colunas (md) → 4 colunas (lg)
- Gap: 24px (gap-6)

#### Card Structure
- Background: var(--card)
- Border: 1px solid var(--border)
- Border-radius: 8px (rounded-lg)
- Padding: 24px
- Hover: shadow-sm, transition

#### Card Content
- Display: flex, justify-between

**Left Side:**
- Title: 
  - Font-size: text-sm
  - Color: var(--foreground-secondary)
  - Margin-bottom: 4px
  
- Value:
  - Font-size: text-2xl
  - Font-weight: semibold
  - Color: var(--card-foreground)
  - Margin-bottom: 8px

- Change Indicator:
  - Display: flex, gap: 4px
  - Change value: text-xs, font-medium
  - Color: var(--success) para "up" / var(--error) para "down"
  - Label: text-xs, color var(--foreground-secondary)
  - Text: "vs mês anterior"

**Right Side:**
- Icon Container:
  - Size: 40px (w-10 h-10)
  - Border-radius: 8px (rounded-lg)
  - Background: var(--primary) com 10% opacity
  - Color: var(--primary)
  - Icon size: 20px

#### Cards Implementados
1. **Receita Total**
   - Value: "R$ 189.450"
   - Change: "+12.5%" (up)
   - Icon: DollarSign

2. **Novos Clientes**
   - Value: "1.234"
   - Change: "+8.2%" (up)
   - Icon: Users

3. **Vendas**
   - Value: "856"
   - Change: "+15.3%" (up)
   - Icon: ShoppingCart

4. **Taxa de Crescimento**
   - Value: "23.1%"
   - Change: "-2.4%" (down)
   - Icon: TrendingUp

---

### 5. Charts Section

#### Grid Layout
- Grid: 1 coluna (mobile) → 2 colunas (lg)
- Gap: 24px (gap-6)

#### Chart Container
- Background: var(--card)
- Border: 1px solid var(--border)
- Border-radius: 8px
- Padding: 24px

- **Title**:
  - Font-weight: semibold
  - Color: var(--card-foreground)
  - Margin-bottom: 16px

- **Chart Height**: 300px

#### Chart 1: Sales Chart (Line Chart)
- **Title**: "Vendas vs Meta"
- **Type**: Line Chart com 2 linhas
- **Data**:
  ```javascript
  [
    { month: "Jan", vendas: 45000, meta: 50000 },
    { month: "Fev", vendas: 52000, meta: 50000 },
    { month: "Mar", vendas: 48000, meta: 50000 },
    { month: "Abr", vendas: 61000, meta: 55000 },
    { month: "Mai", vendas: 55000, meta: 55000 },
    { month: "Jun", vendas: 67000, meta: 60000 }
  ]
  ```
- **Line 1 (Vendas)**:
  - Color: var(--chart-1) = #3b82f6
  - Stroke-width: 2px
  - Type: monotone
  
- **Line 2 (Meta)**:
  - Color: var(--chart-2) = #10b981
  - Stroke-width: 2px
  - Stroke-dasharray: "5 5" (linha tracejada)
  - Type: monotone

- **Grid**: stroke-dasharray "3 3", color var(--border)
- **Axis**: color var(--foreground-secondary), font-size 12px

#### Chart 2: Revenue Chart (Area Chart)
- **Title**: "Receita Mensal"
- **Type**: Area Chart com gradiente
- **Data**:
  ```javascript
  [
    { month: "Jan", receita: 120000 },
    { month: "Fev", receita: 145000 },
    { month: "Mar", receita: 132000 },
    { month: "Abr", receita: 168000 },
    { month: "Mai", receita: 156000 },
    { month: "Jun", receita: 189000 }
  ]
  ```
- **Area**:
  - Stroke: var(--chart-1) = #3b82f6
  - Stroke-width: 2px
  - Fill: gradient (30% opacity no topo → 0% na base)
  - Type: monotone

- **Grid**: stroke-dasharray "3 3", color var(--border)
- **Axis**: color var(--foreground-secondary), font-size 12px

---

### 6. Data Table

#### Container
- Background: var(--card)
- Border: 1px solid var(--border)
- Border-radius: 8px
- Overflow: hidden

#### Header
- Padding: 16px 24px
- Border-bottom: 1px solid var(--border)
- Title: "Transações Recentes"
- Font-weight: semibold

#### Table Structure

**Table Head:**
- Background: var(--muted) com 50% opacity
- Padding cells: 12px 24px
- Font-size: text-xs
- Font-weight: medium
- Color: var(--foreground-secondary)
- Text-transform: uppercase
- Letter-spacing: wider

**Columns:**
1. ID
2. Cliente
3. Valor
4. Status
5. Data

**Table Body:**
- Divider: 1px solid var(--border) entre rows
- Row hover: background var(--muted) com 30% opacity
- Transition: colors

**Cell Styling:**
- Padding: 16px 24px
- White-space: nowrap
- Font-size: text-sm
- Color IDs/Valores: font-medium
- Color texto normal: var(--card-foreground)
- Color datas: var(--foreground-secondary)

#### Sample Data
```javascript
[
  { id: "#12345", customer: "Maria Santos", amount: "R$ 1.250,00", status: "completed", date: "17/03/2026" },
  { id: "#12346", customer: "Pedro Oliveira", amount: "R$ 890,00", status: "pending", date: "17/03/2026" },
  { id: "#12347", customer: "Ana Costa", amount: "R$ 2.100,00", status: "completed", date: "16/03/2026" },
  { id: "#12348", customer: "Carlos Silva", amount: "R$ 450,00", status: "failed", date: "16/03/2026" },
  { id: "#12349", customer: "Juliana Lima", amount: "R$ 3.200,00", status: "completed", date: "15/03/2026" }
]
```

---

### 7. Badge Component

#### Variantes e Cores

**Success:**
- Background: var(--success) com 10% opacity
- Color: var(--success) = #10b981
- Border: 1px solid var(--success) com 20% opacity
- Text: "Concluído"

**Warning:**
- Background: var(--warning) com 10% opacity
- Color: var(--warning) = #f59e0b
- Border: 1px solid var(--warning) com 20% opacity
- Text: "Pendente"

**Error:**
- Background: var(--error) com 10% opacity
- Color: var(--error) = #ef4444
- Border: 1px solid var(--error) com 20% opacity
- Text: "Falhou"

**Info:**
- Background: var(--info) com 10% opacity
- Color: var(--info) = #3b82f6
- Border: 1px solid var(--info) com 20% opacity

**Neutral:**
- Background: var(--muted)
- Color: var(--foreground-secondary)
- Border: 1px solid var(--border)

#### Styling
- Display: inline-flex
- Align-items: center
- Padding: 4px 8px
- Border-radius: 6px (rounded-md)
- Font-size: text-xs
- Font-weight: medium
- Border: 1px

---

## Chart Colors

### Primary Chart Colors
```css
--chart-1: #3b82f6 (Blue - Primary)
--chart-2: #10b981 (Green - Success)
--chart-3: #f59e0b (Orange - Warning)
--chart-4: #8b5cf6 (Purple)
--chart-5: #ef4444 (Red - Error)
```

---

## Características do Design

### Princípios
1. **Minimalismo**: Elementos limpos, sem decoração excessiva
2. **Consistência**: Espaçamento baseado em grid 8px
3. **Hierarquia Visual**: Uso de cores, tamanhos e pesos para criar hierarquia
4. **Legibilidade**: Alto contraste, tipografia clara
5. **Produtividade**: Interface focada em eficiência

### Evitar
- Cores muito saturadas
- Sombras pesadas (usar apenas shadow-sm)
- Bordas fortes (usar rgba com baixa opacidade)
- Preto puro (#000000)

### Preferir
- Superfícies suaves
- Contraste elegante
- Bordas sutis (1px com opacidade baixa)
- Transições suaves (transition-colors)
- Hover states discretos

---

## Interações e Estados

### Hover States
- Buttons: background var(--accent)
- Table rows: background var(--muted) 30% opacity
- Sidebar items: background var(--sidebar-accent) 50% opacity
- Cards: shadow-sm

### Active States
- Sidebar items: background var(--sidebar-accent), full opacity
- Focus inputs: ring-2 ring-primary

### Transitions
- Padrão: transition-colors (para mudanças de cor)
- Shadow: transition-shadow (para cards)

---

## Implementação Técnica

### Stack Sugerida
- React 18+
- Tailwind CSS v4
- next-themes (para theme switching)
- lucide-react (ícones)
- recharts (gráficos)

### Theme Provider
```jsx
<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
  <App />
</ThemeProvider>
```

### Theme Toggle
```jsx
const { theme, setTheme } = useTheme();
setTheme(theme === "dark" ? "light" : "dark");
```

---

## Responsividade

### Breakpoints
- Mobile: < 768px (1 coluna para metrics)
- Tablet: 768px - 1024px (2 colunas para metrics, 1 para charts)
- Desktop: > 1024px (4 colunas para metrics, 2 para charts)

### Mobile Considerations
- Sidebar: pode ser colapsável em mobile
- Table: overflow-x-auto para scroll horizontal
- Charts: responsive container com width 100%

---

## Acessibilidade

### Requisitos
- Contraste mínimo WCAG AA (4.5:1 para texto normal)
- Labels para botões de ação (aria-label)
- Navegação por teclado suportada
- Estados de foco visíveis (ring)
- Texto alternativo para ícones

---

## Resultado Final

O resultado deve ser uma interface ERP moderna, clean e profissional que:
- Funciona perfeitamente em dark e light mode
- Tem hierarquia visual clara
- É agradável para uso prolongado
- Mantém alta densidade informacional sem parecer carregada
- Inspira confiança e profissionalismo
- É facilmente escalável e manutenível

---

## Checklist de Implementação

- [ ] Configurar tokens de cores no CSS
- [ ] Implementar ThemeProvider e toggle
- [ ] Criar Sidebar com 240px width
- [ ] Criar TopBar com 56px height
- [ ] Implementar busca global
- [ ] Criar 4 Metric Cards com ícones
- [ ] Implementar 2 gráficos (Line + Area)
- [ ] Criar Data Table com 5 colunas
- [ ] Implementar Badge component com variantes
- [ ] Adicionar hover states em todos elementos interativos
- [ ] Testar responsividade (mobile, tablet, desktop)
- [ ] Validar contraste de cores (WCAG AA)
- [ ] Testar troca de tema (smooth transition)
- [ ] Verificar consistência de espaçamento (8px grid)

---

## Notas Finais

Este prompt contém todas as especificações necessárias para replicar o layout ERP criado. Cada token, medida, cor e componente foi documentado com precisão. Use este documento como referência única para implementação ou para passar para outras ferramentas de design/desenvolvimento.
