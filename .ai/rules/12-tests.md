# Regra 12 — Testes

## Stack e ferramentas
- **Jasmine + Karma** (padrão Angular) ou **Jest** se configurado no projeto.
- Arquivos colocados junto ao source: `feature.spec.ts` ao lado de `feature.ts`.
- Cobertura mínima esperada: **stores** e **services** ≥ 80% de branches.

## O que testar (obrigatório)

| Artefato | O que testar |
|----------|-------------|
| **Store** | `load()` sucesso, `load()` erro, mutações de signal, `vm` computed |
| **Service** | Que chama `ApiClient` com path/params corretos |
| **Guard** | Retorna `true` se autenticado; redireciona se não |
| **Component reutilizável** | Renderiza com inputs; emite outputs corretos |
| **Page** | Smoke test (cria sem erros); integra com store mockado |

## Padrão de teste de Store

> ⚠️ Stores usam `inject()` — **nunca instanciar com `new Store()`**. Usar `TestBed.inject()`.

```ts
describe('ProductsStore', () => {
  let store: ProductsStore;
  let service: jasmine.SpyObj<ProductsService>;

  beforeEach(() => {
    service = jasmine.createSpyObj('ProductsService', ['list', 'create', 'remove']);

    TestBed.configureTestingModule({
      providers: [
        ProductsStore,
        { provide: ProductsService, useValue: service }
      ]
    });

    store = TestBed.inject(ProductsStore);
  });

  it('deve setar items após load com sucesso', () => {
    service.list.and.returnValue(of({
      data: [{ id: '1', name: 'Produto A', sku: 'SKU1', price: 10, stock: 5, createdAt: '' }],
      pageNumber: 1, pageSize: 10, totalCount: 1
    }));

    store.load();

    expect(store.items()).toHaveSize(1);
    expect(store.loading()).toBeFalse();
    expect(store.error()).toBeNull();
    expect(store.validationErrors()).toBeNull();
  });

  it('deve setar error após falha 500 no load', () => {
    const apiError: ApiError = {
      status: 500,
      problem: { title: 'Error', status: 500, detail: 'Erro interno' },
      correlationId: 'abc-123'
    };
    service.list.and.returnValue(throwError(() => apiError));

    store.load();

    expect(store.error()).toContain('abc-123');
    expect(store.loading()).toBeFalse();
  });

  it('deve setar validationErrors após 400 com errors no create', () => {
    const apiError: ApiError = {
      status: 400,
      problem: { title: 'Validation', status: 400, errors: { name: ['Nome obrigatório.'] } }
    };
    service.create.and.returnValue(throwError(() => apiError));

    store.create({ name: '', sku: 'X', price: 1, stock: 0 });

    expect(store.validationErrors()).toEqual({ name: ['Nome obrigatório.'] });
    expect(store.error()).toBeNull();
  });
});
```

## Padrão de teste de Service

```ts
describe('ProductsService', () => {
  let service: ProductsService;
  let apiClient: jasmine.SpyObj<ApiClient>;

  beforeEach(() => {
    apiClient = jasmine.createSpyObj('ApiClient', ['get', 'post', 'put', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        { provide: ApiClient, useValue: apiClient },
        { provide: API_BASE_URL, useValue: 'http://test' }
      ]
    });

    service = TestBed.inject(ProductsService);
  });

  it('deve chamar GET /products com filtros corretos', () => {
    apiClient.get.and.returnValue(of({ data: [], pageNumber: 1, pageSize: 10, totalCount: 0 }));
    service.list({ pageNumber: 2, pageSize: 5 }).subscribe();
    expect(apiClient.get).toHaveBeenCalledWith('/products', {
      params: { pageNumber: 2, pageSize: 5, search: undefined }
    });
  });
});
```

## Padrão de teste de Guard

```ts
describe('authGuard', () => {
  it('deve permitir acesso se autenticado', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthSessionService, useValue: { isAuthenticated: () => true } },
        provideRouter([])
      ]
    });
    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    );
    expect(result).toBeTrue();
  });

  it('deve redirecionar para /login se não autenticado', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthSessionService, useValue: { isAuthenticated: () => false } },
        provideRouter([])
      ]
    });
    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    );
    expect(result).toBeInstanceOf(UrlTree);
  });
});
```

## Padrão de teste de Componente

```ts
describe('ProductFormComponent', () => {
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFormComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(ProductFormComponent);
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('não deve emitir se formulário inválido', () => {
    const spy = jasmine.createSpy();
    fixture.componentInstance.create.subscribe(spy);

    fixture.componentInstance.onSubmit();

    expect(spy).not.toHaveBeenCalled();
  });

  it('deve emitir FormValue com dados válidos', () => {
    const spy = jasmine.createSpy();
    fixture.componentInstance.create.subscribe(spy);

    fixture.componentInstance.form.setValue({
      name: 'Produto Teste', sku: 'SKU01', price: 9.99, stock: 10
    });
    fixture.componentInstance.onSubmit();

    expect(spy).toHaveBeenCalledWith({ name: 'Produto Teste', sku: 'SKU01', price: 9.99, stock: 10 });
  });
});
```

## Convenções de nomenclatura

- `describe` = nome do artefato (classe, função, guard).
- `it` = "deve [comportamento esperado]" (PT-BR).
- Mocks com `jasmine.createSpyObj` ou objetos literais mínimos.
- Não usar `any` em testes — tipar os spies corretamente.

## Cobertura de estados críticos

Para cada operação assíncrona (load, create, update, remove) testar:
1. **Estado loading** (`loading()` sobe para `true` durante operação).
2. **Sucesso** (dados atualizados, `loading` volta a `false`, `error` nulo).
3. **Erro** (`error()` setado com mensagem, `loading` volta a `false`).

## Antipadrões proibidos
- Testes que dependem de ordem de execução.
- Usar `done()` sem timeout — preferir `fakeAsync + tick`.
- Mockar `HttpClient` diretamente — mockar `ApiClient` (nível acima).
- Testes sem `expect` (testes sem asserção passam silenciosamente).
- `fixture.detectChanges()` manual quando `autoDetectChanges` resolveria.

