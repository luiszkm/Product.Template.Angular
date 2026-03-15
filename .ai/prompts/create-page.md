# Prompt AI — Criar Page Angular

## Objetivo
Gerar page standalone para rota de feature, orquestrando store, form e table.

## Entrada esperada
- Nome da feature e da page.
- Store da feature disponível.
- Componentes filhos (form, table).
- Se requer autorização (role/permission).

## Instruções para o agente

### Estrutura da page

```ts
@Component({
  selector: 'app-{feature}-page',
  standalone: true,
  imports: [FeatureFormComponent, FeatureTableComponent],
  templateUrl: './{feature}.page.html',
  styleUrl: './{feature}.page.css',
  providers: [FeatureStore],          // ← store fornecido no escopo da page
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturePage implements OnInit {
  private readonly store = inject(FeatureStore);
  private readonly session = inject(AuthSessionService); // apenas se precisar de RBAC na UI

  readonly vm = this.store.vm;

  // RBAC condicional na UI (se aplicável)
  readonly canCreate = computed(() =>
    this.session.isAdmin() || this.session.hasPermission('{feature}.manage')
  );

  ngOnInit(): void {
    this.store.load();
  }

  onCreate(payload: CreateRequest): void { this.store.create(payload); }
  onUpdate(payload: UpdateRequest): void { this.store.update(payload); }
  onRemove(id: string): void            { this.store.remove(id); }
  onPageChange(page: number): void      { this.store.setPage(page); }
}
```

### Template obrigatório

```html
<section>
  <!-- Erro global com correlationId para 5xx -->
  @if (vm().error) {
    <p class="error" role="alert">{{ vm().error }}</p>
  }

  <!-- Form: recebe loading + apiErrors da store -->
  @if (canCreate()) {
    <app-feature-form
      [loading]="vm().loading"
      [apiErrors]="vm().validationErrors"
      (submit)="onCreate($event)" />
  }

  <!-- Tabela -->
  <app-feature-table
    [items]="vm().items"
    [loading]="vm().loading"
    [totalCount]="vm().totalCount"
    [pageNumber]="vm().pageNumber"
    (pageChange)="onPageChange($event)"
    (remove)="onRemove($event)" />
</section>
```

## Regras obrigatórias
1. `providers: [FeatureStore]` — store fornecido por page, não root.
2. `vm = this.store.vm` como único ponto de leitura do estado.
3. `[apiErrors]="vm().validationErrors"` sempre passado para o form.
4. Erros 5xx exibem `vm().error` (que inclui `correlationId`).
5. RBAC na UI via `computed()` usando `AuthSessionService`.
6. Sem lógica de negócio no template.
7. Delegar toda operação assíncrona para o store.

## Restrições
- Sem NgModule.
- Sem `any`.
- Sem chamada HTTP direta na page.
- Sem `*ngIf` — usar `@if` do Angular 17+.
