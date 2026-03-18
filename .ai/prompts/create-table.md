# Prompt AI — Criar Tabela de Dados

## Objetivo
Gerar componente de tabela standalone com paginação server-side, estados de UI e ações por linha.

## Entrada esperada
- Tipo da entidade a exibir.
- Colunas e seus tipos (incluindo quais usam pipe de formatação).
- Ações disponíveis por linha (ex: editar, remover).
- Se suporta paginação.

## Instruções para o agente

### Estrutura do componente

```ts
@Component({ standalone: true, imports: [DecimalPipe, DatePipe, CurrencyPipe], ... })
export class FeatureTableComponent {
  // Inputs — signal-based
  readonly items       = input.required<Feature[]>();
  readonly loading     = input(false);
  readonly totalCount  = input(0);
  readonly pageNumber  = input(1);
  readonly pageSize    = input(10);

  // Outputs
  readonly remove      = output<string>();       // id
  readonly pageChange  = output<number>();       // nova página

  // Computed
  readonly totalPages  = computed(() => Math.ceil(this.totalCount() / this.pageSize()));
  readonly isEmpty     = computed(() => !this.loading() && this.items().length === 0);

  trackById(_: number, item: Feature): string { return item.id; }
}
```

### Template obrigatório

```html
@if (loading()) {
  <p role="status" aria-live="polite">Carregando...</p>
}

@if (isEmpty()) {
  <p>Nenhum item encontrado.</p>
}

@if (!isEmpty()) {
  <table aria-label="Lista de itens">
    <thead>
      <tr>
        <th scope="col">Nome</th>
        <th scope="col">Preço</th>
        <th scope="col">Data</th>
        <th scope="col">Ações</th>
      </tr>
    </thead>
    <tbody>
      @for (item of items(); track item.id) {
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.price | number: '1.2-2' }}</td>
          <td>{{ item.createdAt | date: 'dd/MM/yyyy' }}</td>
          <td>
            <button type="button"
                    [attr.aria-label]="'Remover ' + item.name"
                    (click)="remove.emit(item.id)">
              Remover
            </button>
          </td>
        </tr>
      }
    </tbody>
  </table>

  <!-- Paginação server-side -->
  <nav aria-label="Paginação">
    <button [disabled]="pageNumber() <= 1"
            (click)="pageChange.emit(pageNumber() - 1)">Anterior</button>
    <span>{{ pageNumber() }} / {{ totalPages() }}</span>
    <button [disabled]="pageNumber() >= totalPages()"
            (click)="pageChange.emit(pageNumber() + 1)">Próxima</button>
  </nav>
}
```

## Regras obrigatórias
1. `@for` com `track item.id` — nunca sem track.
2. Importar **explicitamente** os pipes usados: `DecimalPipe`, `DatePipe`, `CurrencyPipe`.
3. Datas formatadas para local (backend envia UTC, exibir em `dd/MM/yyyy` ou `relative`).
4. `aria-label` em botões de ação (ex: `"Remover Produto X"`).
5. `<th scope="col">` em cabeçalhos.
6. `role="status" aria-live="polite"` no estado de loading.
7. Sem estado de negócio — apenas renderização e eventos.
8. Paginação server-side: emitir `pageChange(numero)` — nunca paginar no frontend.

## Estilo (ver .ai/design/)
- Usar tokens ERP em CSS: `var(--card)`, `var(--border)`, `var(--foreground-secondary)`.
- Botões de acção: `.btn`, `.btn-secondary`, `.btn-danger`.

## Restrições
- Sem chamada HTTP direta.
- Sem lógica de ordenação local para datasets grandes — emitir evento e deixar backend ordenar.
- Sem `any`.
