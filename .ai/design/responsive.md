# Design Responsivo

Padrões de layout responsivo para garantir que a aplicação funcione bem em todos os dispositivos.

---

## 📐 Breakpoints

### Valores Padrão
```css
/* Mobile first */
:root {
  --breakpoint-sm: 640px;   /* Tablets pequenos */
  --breakpoint-md: 768px;   /* Tablets */
  --breakpoint-lg: 1024px;  /* Desktops pequenos */
  --breakpoint-xl: 1280px;  /* Desktops grandes */
  --breakpoint-2xl: 1536px; /* Telas muito grandes */
}
```

### Media Queries
```css
/* ✅ Mobile first (recomendado) */
.container {
  padding: var(--spacing-4);
}

@media (min-width: 768px) {
  .container {
    padding: var(--spacing-6);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: var(--spacing-8);
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* ❌ Desktop first (evitar) */
.container {
  padding: var(--spacing-8);
}

@media (max-width: 1024px) {
  .container {
    padding: var(--spacing-6);
  }
}
```

---

## 📱 Grid System

### Container
```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
    padding: 0 var(--spacing-6);
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container {
    max-width: 1536px;
  }
}
```

### Grid Layout
```css
.grid {
  display: grid;
  gap: var(--spacing-4);
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1280px) {
  .grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Flexbox Responsivo
```css
.flex {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

@media (min-width: 768px) {
  .flex {
    flex-direction: row;
  }
}
```

---

## 📄 Layouts Comuns

### Header Responsivo
```html
<header class="header">
  <div class="header-container">
    <a href="/" class="logo">
      <img src="logo.svg" alt="Logo" />
    </a>
    
    <!-- Mobile: Menu hambúrguer -->
    <button
      class="menu-toggle"
      [attr.aria-expanded]="menuOpen()"
      (click)="toggleMenu()"
    >
      <span class="sr-only">Menu</span>
      <svg aria-hidden="true"><!-- ícone hambúrguer --></svg>
    </button>
    
    <!-- Desktop: Menu horizontal -->
    <nav class="nav" [class.nav-open]="menuOpen()">
      <a href="/products">Produtos</a>
      <a href="/orders">Pedidos</a>
      <a href="/users">Usuários</a>
    </nav>
  </div>
</header>
```

```css
.header {
  background: var(--color-background);
  border-bottom: var(--border-width-1) solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: var(--z-index-sticky);
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-4);
  max-width: 1440px;
  margin: 0 auto;
}

.menu-toggle {
  display: block;
  background: none;
  border: none;
  cursor: pointer;
}

.nav {
  display: none;
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background: var(--color-background);
  border-bottom: var(--border-width-1) solid var(--color-border);
  padding: var(--spacing-4);
}

.nav-open {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

@media (min-width: 768px) {
  .menu-toggle {
    display: none;
  }
  
  .nav {
    display: flex;
    position: static;
    flex-direction: row;
    gap: var(--spacing-6);
    padding: 0;
    border: none;
  }
}
```

### Sidebar Layout
```html
<div class="layout">
  <!-- Sidebar -->
  <aside class="sidebar" [class.sidebar-open]="sidebarOpen()">
    <nav>
      <!-- Links -->
    </nav>
  </aside>
  
  <!-- Main Content -->
  <main class="main-content">
    <button class="sidebar-toggle" (click)="toggleSidebar()">
      <svg aria-hidden="true"><!-- ícone --></svg>
    </button>
    
    <!-- Conteúdo -->
  </main>
</div>
```

```css
.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background: var(--color-surface);
  border-right: var(--border-width-1) solid var(--color-border);
  padding: var(--spacing-6);
  transform: translateX(-100%);
  transition: transform var(--transition-base);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-fixed);
}

.sidebar-open {
  transform: translateX(0);
}

.main-content {
  flex: 1;
  padding: var(--spacing-4);
}

.sidebar-toggle {
  display: block;
  margin-bottom: var(--spacing-4);
}

@media (min-width: 1024px) {
  .sidebar {
    position: static;
    transform: none;
  }
  
  .sidebar-toggle {
    display: none;
  }
}
```

### Card Grid
```html
<div class="card-grid">
  @for (item of items(); track item.id) {
    <div class="card">
      <!-- Conteúdo do card -->
    </div>
  }
</div>
```

```css
.card-grid {
  display: grid;
  gap: var(--spacing-4);
  grid-template-columns: 1fr;
}

/* 1 coluna em mobile */
@media (min-width: 640px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 2 colunas em tablet */
@media (min-width: 768px) {
  .card-grid {
    gap: var(--spacing-6);
  }
}

/* 3 colunas em desktop */
@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 4 colunas em telas grandes */
@media (min-width: 1280px) {
  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## 📊 Tabelas Responsivas

### Scroll Horizontal (Recomendado)
```html
<div class="table-wrapper">
  <table class="table">
    <!-- Tabela normal -->
  </table>
</div>
```

```css
.table-wrapper {
  overflow-x: auto;
  border: var(--border-width-1) solid var(--color-border);
  border-radius: var(--radius-lg);
}

.table {
  min-width: 600px;
  width: 100%;
}
```

### Cards em Mobile (Avançado)
```html
<div class="table-responsive">
  @for (item of items(); track item.id) {
    <div class="table-card">
      <div class="table-card-row">
        <span class="table-card-label">Nome:</span>
        <span class="table-card-value">{{ item.name }}</span>
      </div>
      <div class="table-card-row">
        <span class="table-card-label">Preço:</span>
        <span class="table-card-value">{{ item.price | currency }}</span>
      </div>
      <div class="table-card-actions">
        <button>Editar</button>
        <button>Excluir</button>
      </div>
    </div>
  }
</div>
```

```css
/* Mobile: Cards */
.table-responsive {
  display: block;
}

.table-card {
  border: var(--border-width-1) solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  margin-bottom: var(--spacing-3);
}

.table-card-row {
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-2) 0;
  border-bottom: var(--border-width-1) solid var(--color-border);
}

.table-card-label {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
}

/* Desktop: Tabela normal */
@media (min-width: 768px) {
  .table-responsive {
    display: table;
  }
  
  .table-card {
    display: table-row;
    border: none;
    padding: 0;
    margin: 0;
  }
  
  /* ... estilos de tabela normal */
}
```

---

## 📝 Formulários Responsivos

### Layout Responsivo
```css
.form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);
}

/* Desktop: 2 colunas para alguns campos */
@media (min-width: 768px) {
  .form-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-4);
  }
}
```

```html
<form [formGroup]="form" class="form">
  <!-- 1 coluna em mobile, 2 em desktop -->
  <div class="form-row">
    <div class="form-group">
      <label>Nome</label>
      <input formControlName="firstName" />
    </div>
    <div class="form-group">
      <label>Sobrenome</label>
      <input formControlName="lastName" />
    </div>
  </div>
  
  <!-- Sempre 1 coluna -->
  <div class="form-group">
    <label>E-mail</label>
    <input formControlName="email" />
  </div>
</form>
```

---

## 🎨 Tipografia Responsiva

### Tamanhos Fluidos
```css
/* ✅ Tamanhos fluidos com clamp() */
.heading-1 {
  font-size: clamp(1.875rem, 5vw, 2.25rem);  /* 30px - 36px */
  line-height: var(--line-height-tight);
}

.heading-2 {
  font-size: clamp(1.5rem, 4vw, 1.875rem);  /* 24px - 30px */
}

.body {
  font-size: clamp(0.875rem, 2vw, 1rem);  /* 14px - 16px */
}
```

### Breakpoints Específicos
```css
.page-title {
  font-size: var(--font-size-2xl);  /* 24px */
}

@media (min-width: 768px) {
  .page-title {
    font-size: var(--font-size-3xl);  /* 30px */
  }
}

@media (min-width: 1024px) {
  .page-title {
    font-size: var(--font-size-4xl);  /* 36px */
  }
}
```

---

## 📐 Espaçamentos Responsivos

```css
/* ✅ Espaçamentos que crescem com o viewport */
.section {
  padding: var(--spacing-4);  /* 16px em mobile */
}

@media (min-width: 768px) {
  .section {
    padding: var(--spacing-6);  /* 24px em tablet */
  }
}

@media (min-width: 1024px) {
  .section {
    padding: var(--spacing-8);  /* 32px em desktop */
  }
}
```

---

## 🖼️ Imagens Responsivas

### Srcset
```html
<!-- ✅ Múltiplas resoluções -->
<img
  src="product-400.jpg"
  srcset="
    product-400.jpg 400w,
    product-800.jpg 800w,
    product-1200.jpg 1200w
  "
  sizes="
    (max-width: 768px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
  alt="Produto"
/>
```

### Picture Element
```html
<!-- ✅ Diferentes imagens para diferentes viewports -->
<picture>
  <source
    media="(min-width: 1024px)"
    srcset="hero-desktop.jpg"
  />
  <source
    media="(min-width: 768px)"
    srcset="hero-tablet.jpg"
  />
  <img src="hero-mobile.jpg" alt="Hero" />
</picture>
```

### CSS Object-fit
```css
.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

@media (min-width: 768px) {
  .product-image {
    height: 300px;
  }
}
```

---

## 📲 Touch vs Mouse

### Hover States
```css
/* ✅ Hover apenas em dispositivos que suportam */
@media (hover: hover) {
  .button:hover {
    background: var(--color-primary-600);
  }
}

/* ✅ Active para touch */
.button:active {
  transform: scale(0.98);
}
```

### Touch Targets
```css
/* ✅ Botões compactos no desktop; área mínima em touch */
.btn {
  min-height: 36px;
  padding: var(--spacing-1) var(--spacing-2);
}

@media (hover: none) {
  .btn {
    min-height: 44px;  /* iOS guideline */
    padding: var(--spacing-2) var(--spacing-3);
  }
}
```

---

## 🎯 Container Queries (Futuro)

```css
/* Container queries para componentes verdadeiramente responsivos */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
  }
}

@container (min-width: 600px) {
  .card {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

## ✅ Checklist de Responsividade

- [ ] Mobile first (min-width media queries)
- [ ] Breakpoints consistentes (640, 768, 1024, 1280, 1536)
- [ ] Layouts testados em mobile, tablet, desktop
- [ ] Tabelas com scroll horizontal ou transformação
- [ ] Tipografia responsiva (clamp ou breakpoints)
- [ ] Espaçamentos responsivos
- [ ] Imagens com srcset/picture
- [ ] Touch targets mínimo 44x44px em mobile
- [ ] Hover states apenas em @media (hover: hover)
- [ ] Menu hambúrguer em mobile, horizontal em desktop
- [ ] Sidebar colapsável em mobile
- [ ] Testado em Chrome DevTools (device emulation)
- [ ] Testado em dispositivos reais

---

## 🔧 Ferramentas

### Testes
- **Chrome DevTools**: Device toolbar (Ctrl+Shift+M)
- **Responsive Viewer**: Extensão para testar múltiplos viewports
- **BrowserStack**: Testes em dispositivos reais

### Viewports Comuns
```
iPhone SE:         375 x 667
iPhone 12/13/14:   390 x 844
iPhone 14 Pro Max: 430 x 932
iPad:              768 x 1024
iPad Pro:          1024 x 1366
Desktop HD:        1920 x 1080
Desktop 4K:        3840 x 2160
```

---

## 📚 Referências

- **CSS Grid**: https://css-tricks.com/snippets/css/complete-guide-grid/
- **Flexbox**: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- **Responsive Images**: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
- **Container Queries**: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries

