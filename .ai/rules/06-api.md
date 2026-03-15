# Regra 06 - API e Contratos

## Cliente único
- Toda requisição passa por `core/api/api-client.ts`.

## Convenções obrigatórias
- Base URL via `environment.apiUrl` — nunca hardcoded.
- Header `X-Tenant` em todas as chamadas (injetado automaticamente pelo `ApiClient`).
- Header `Authorization: Bearer` em chamadas protegidas (injetado automaticamente).
- `X-Idempotency-Key` em operações críticas de criação/atualização.
- `X-Correlation-ID` capturado da resposta e incluído em `ApiError.correlationId`.
- `Retry-After` capturado da resposta `429` e incluído em `ApiError.retryAfterSeconds`.

## Endpoints de autenticação (identity)

| Método | Rota | Acesso | Uso no frontend |
|--------|------|--------|-----------------|
| GET | `/identity/providers` | Público | Exibir botões dinâmicos no login |
| POST | `/identity/login` | Público | Login email+senha → JWT |
| POST | `/identity/register` | Público | Cadastro de novo usuário |
| POST | `/identity/external-login` | Público | OAuth2 callback (Microsoft) |
| POST | `/identity/refresh` | Público | Renovar access token (rotation) |

## Contratos de resposta

```ts
// Login / refresh response
interface LoginResponse {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: number;        // segundos (padrão: 3600)
  refreshToken?: string;    // disponível na feature enterprise
  user: { id: string; email: string; firstName: string; roles: string[]; };
}

// Paginação padrão
interface PaginatedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  data: T[];
}

// Erro padrão (RFC 9457)
interface ProblemDetails {
  title: string;
  status: number;
  type?: string;
  detail?: string;
  errors?: Record<string, string[]>; // FluentValidation field errors
}

interface ApiError {
  problem: ProblemDetails;
  status: number;
  correlationId?: string;
  retryAfterSeconds?: number;
}
```

## Tratamento de erros obrigatório

| Status | Ação no frontend |
|--------|-----------------|
| `400` com `errors` | Mapear `problem.errors` nos campos do formulário |
| `400` sem `errors` | Exibir `problem.detail` como erro global |
| `401` | Tentar refresh token; se falhar → limpar sessão e redirecionar login |
| `403` | Exibir "Acesso negado" (não redirecionar silenciosamente) |
| `404` | Exibir "Não encontrado" |
| `409` | Tratar como regra de negócio (ex: email duplicado no campo) |
| `429` | Exibir `retryAfterSeconds` como contagem regressiva |
| `5xx` | Mensagem genérica + exibir `correlationId` ao usuário |

## Datas e IDs
- Datas em UTC (ISO 8601): `"2026-03-15T14:30:00Z"` → converter para local na UI.
- IDs são GUID (UUID v4): `"3fa85f64-5717-4562-b3fc-2c963f66afa6"`.
