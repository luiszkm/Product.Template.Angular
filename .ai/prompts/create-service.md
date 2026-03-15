# Prompt AI — Criar Service Angular

## Objetivo
Gerar service stateless de integração REST, tipado e alinhado com os contratos do backend.

## Entrada esperada
- Nome da feature/entidade.
- Endpoints disponíveis (método, rota, payload, response).
- Se alguma operação é crítica (requer idempotência).

## Instruções para o agente

### Estrutura do service

```ts
@Injectable({ providedIn: 'root' })
export class FeatureService {
  private readonly apiClient = inject(ApiClient); // ← inject(), nunca construtor

  list(filters: FeatureFilters): Observable<PaginatedResponse<Feature>> {
    return this.apiClient.get<PaginatedResponse<Feature>>('/feature', {
      params: {
        pageNumber: filters.pageNumber,
        pageSize:   filters.pageSize,
        search:     filters.search
      }
    });
  }

  getById(id: string): Observable<Feature> {
    return this.apiClient.get<Feature>(`/feature/${id}`);
  }

  create(payload: CreateFeatureRequest): Observable<Feature> {
    return this.apiClient.post<Feature, CreateFeatureRequest>('/feature', payload, {
      idempotencyKey: crypto.randomUUID()  // ← obrigatório em POST
    });
  }

  update(payload: UpdateFeatureRequest): Observable<Feature> {
    return this.apiClient.put<Feature, UpdateFeatureRequest>(
      `/feature/${payload.id}`, payload,
      { idempotencyKey: crypto.randomUUID() }  // ← obrigatório em PUT crítico
    );
  }

  remove(id: string): Observable<void> {
    return this.apiClient.delete<void>(`/feature/${id}`);
  }
}
```

### Models obrigatórios em `models/{feature}.model.ts`

```ts
export interface Feature {
  id: string;          // GUID
  // ... campos da entidade
  createdAt: string;   // UTC ISO 8601
}

export interface FeatureFilters {
  pageNumber: number;
  pageSize: number;
  search?: string;
}

export interface CreateFeatureRequest {
  // ... campos de criação
}

export interface UpdateFeatureRequest extends CreateFeatureRequest {
  id: string;
}
```

## Spec obrigatório

```ts
describe('FeatureService', () => {
  let service: FeatureService;
  let apiClient: jasmine.SpyObj<ApiClient>;

  beforeEach(() => {
    apiClient = jasmine.createSpyObj('ApiClient', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
      providers: [
        FeatureService,
        { provide: ApiClient, useValue: apiClient },
        { provide: API_BASE_URL, useValue: 'http://test' }
      ]
    });
    service = TestBed.inject(FeatureService);
  });

  it('deve chamar GET /feature com params corretos', () => { /* ... */ });
  it('deve chamar POST /feature com idempotencyKey', () => { /* ... */ });
});
```

## Restrições
- Não armazenar nenhum estado de tela.
- Não acoplar `Router` ou DOM.
- Sem `any` — todos os generics tipados.
- Erros propagam como `ApiError` via `throwError()` — não silenciar exceções.
- `X-Tenant` e `Authorization` são injetados automaticamente pelo `ApiClient`.
