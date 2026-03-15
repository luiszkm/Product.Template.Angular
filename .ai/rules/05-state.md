# Regra 05 - Estado com Signals

## Estratégia
- Usar `signal` para estado mutável.
- Usar `computed` para derivações.
- Usar `effect` para efeitos colaterais controlados (log, persistência, sincronização).

## Boas práticas
- Estado local de componente: preferir signal no componente.
- Estado de feature compartilhado: store por feature em `state/*.store.ts`.
- Converter Observable para signal com `toSignal` apenas quando simplificar UI.
- Manter estado mínimo, derivar o resto com `computed`.
- Usar `inject()` em stores — nunca `constructor(private ...)`.

## RxJS x Signals
- Signals: estado de UI e composição local.
- RxJS: fronteira assíncrona (HTTP/event streams).

## Padrão mínimo de store

```ts
@Injectable()
export class FeatureStore {
  private readonly service = inject(FeatureService);

  // Estado mínimo obrigatório
  readonly items         = signal<T[]>([]);
  readonly loading       = signal(false);
  readonly error         = signal<string | null>(null);
  readonly validationErrors = signal<Record<string, string[]> | null>(null);

  // View model derivado — único ponto de consumo no template
  readonly vm = computed(() => ({
    items:            this.items(),
    loading:          this.loading(),
    error:            this.error(),
    validationErrors: this.validationErrors(),
    hasData:          this.items().length > 0,
  }));
}
```

## Padrão de operação assíncrona

```ts
create(payload: CreateRequest): void {
  this.loading.set(true);
  this.error.set(null);
  this.validationErrors.set(null);   // ← limpar antes de cada operação

  this.service.create(payload)
    .pipe(finalize(() => this.loading.set(false)))
    .subscribe({
      next: () => this.load(),
      error: (apiError: ApiError) => {
        if (apiError.status === 400 && apiError.problem.errors) {
          this.validationErrors.set(apiError.problem.errors);
        } else {
          const id = apiError.correlationId;
          this.error.set(
            apiError.status >= 500 && id
              ? `Erro inesperado. ID de suporte: ${id}`
              : (apiError.problem.detail ?? 'Erro inesperado.')
          );
        }
      }
    });
}
```

## Effects privados

Usar `private readonly _nomeEffect = effect(...)` para side-effects internos do store (nunca expor `effect` publicamente):

```ts
private readonly _resetPageOnSearch = effect(() => {
  const search = this.search();
  if (search.length === 0 || search.length >= 2) this.pageNumber.set(1);
});
```
