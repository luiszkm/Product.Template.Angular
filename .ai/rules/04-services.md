# Regra 04 - Services

## Objetivo
Serviços são adaptadores de I/O, sem estado persistente de UI.

## Regras
- Um service não armazena estado de tela.
- Services usam `ApiClient` para GET/POST/PUT/DELETE.
- Tipar request/response com interfaces explícitas.
- Erros devem propagar `ProblemDetails` tipado.

## Assinaturas recomendadas
- `list(params): Observable<PaginatedResponse<T>>`
- `getById(id): Observable<T>`
- `create(payload): Observable<T>`
- `update(id, payload): Observable<T>`
- `remove(id): Observable<void>`

## Proibido
- Service acoplar DOM ou Router.
- Estado de sessão em variáveis mutáveis de service (usar auth/session store dedicada).
