# Regra 13 — Observabilidade

## Princípio
Cada erro vindo da API carrega um `X-Correlation-ID`. Esse ID deve chegar até o usuário para suporte rastreável, e deve ser emitido em todos os logs de erro.

## X-Correlation-ID

### Captura (já feito no ApiClient)
O `ApiClient` captura `X-Correlation-ID` do header de resposta e o inclui no `ApiError.correlationId`.

### Exibição ao usuário
Erros `5xx` devem exibir o correlationId para o usuário reportar ao suporte:

```ts
// store ou handler de erro
handleError(apiError: ApiError): void {
  const id = apiError.correlationId;
  if (apiError.status >= 500) {
    this.error.set(
      id
        ? `Erro inesperado. Contate o suporte informando o ID: ${id}`
        : 'Erro inesperado. Tente novamente mais tarde.'
    );
  }
}
```

### Log estruturado de erros
```ts
// Em qualquer handler de erro crítico
console.error('[API Error]', {
  status: apiError.status,
  type: apiError.problem.type,
  detail: apiError.problem.detail,
  correlationId: apiError.correlationId,
  path: currentRoute,
  timestamp: new Date().toISOString()
});
```

## Rate Limiting — Retry-After

Respostas `429 Too Many Requests` incluem o header `Retry-After` (segundos). O frontend deve:

1. Exibir mensagem com o tempo de espera ao usuário.
2. **Não** fazer retry automático sem o controle do usuário em formulários.
3. Para polling/refresh automático, usar `retry({ count, delay })` do RxJS 7+:

```ts
// RxJS 7+ — retry com delay baseado no Retry-After
import { retry, timer } from 'rxjs';

this.apiClient.get('/status').pipe(
  retry({
    count: 3,
    delay: (error: ApiError) => {
      const seconds = error.retryAfterSeconds ?? 60;
      return timer(seconds * 1000);
    }
  })
).subscribe(...)
```

> ⚠️ `retryWhen` está **deprecado** no RxJS 7+ — usar sempre `retry({ count, delay })`.

```ts
// No store/interceptor, ao receber 429 sem retry automático:
const retryAfter = apiError.retryAfterSeconds ?? 60;
this.error.set(`Muitas requisições. Aguarde ${retryAfter}s antes de tentar novamente.`);
```


## Health Check

A UI pode monitorar a disponibilidade da API com `/health/live`:

```ts
// Uso: verificar antes de exibir tela de manutenção
async function isApiAlive(baseUrl: string): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl.replace('/api/v1', '')}/health/live`);
    return res.ok;
  } catch {
    return false;
  }
}
```

## Performance — Métricas de navegação

Medir tempo de carregamento de pages críticas com `Performance API`:

```ts
// no ngOnInit da page
ngOnInit(): void {
  performance.mark('products-page-start');
  this.store.load();
}

// após dados carregarem (no effect ou subscribe de sucesso)
performance.mark('products-page-end');
performance.measure('products-page-load', 'products-page-start', 'products-page-end');
const [entry] = performance.getEntriesByName('products-page-load');
console.info('[Perf] products-page-load:', entry.duration.toFixed(1) + 'ms');
```

## Token Expiration — Detecção proativa

Antes de cada operação crítica, verificar se o token expira em menos de 5 minutos:

```ts
// Em AuthSessionService
isTokenExpiringSoon(): boolean {
  const token = this.token();
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return Date.now() >= (payload.exp - 300) * 1000; // 5 min antes
  } catch {
    return true;
  }
}
```

Se o backend implementar refresh token, chamar `POST /identity/refresh` automaticamente.

## Refresh Token (Enterprise)

O backend retorna `refreshToken` junto com `accessToken` no login. O frontend deve:

1. **Armazenar** o `refreshToken` de forma segura (sessionStorage ou cookie HttpOnly).
2. **Rotacionar** automaticamente antes de expirar: ao detectar `isTokenExpiringSoon() === true`, chamar `POST /identity/refresh`.
3. Em caso de falha no refresh (token revogado/expirado), limpar sessão e redirecionar para login.

```ts
// POST /api/v1/identity/refresh
interface RefreshRequest  { refreshToken: string; }
interface RefreshResponse { accessToken: string; refreshToken: string; expiresIn: number; }
```

## Deprecação de API

Se a API retornar header `Deprecation: true`, logar aviso com a data de sunset:

```ts
const deprecation = response.headers.get('Deprecation');
const sunset = response.headers.get('Sunset');
if (deprecation === 'true') {
  console.warn(`[API Deprecation] Endpoint deprecado. Sunset: ${sunset}`);
}
```

## Erros globais não tratados

O `provideBrowserGlobalErrorListeners()` (já em `app.config.ts`) captura erros não tratados. Complementar com handler para logar correlationId quando disponível.

## Resumo — Headers de observabilidade

| Header | Direção | Uso no frontend |
|--------|---------|-----------------|
| `X-Correlation-ID` | Resposta | Exibir em erros 5xx, logar sempre |
| `X-Tenant` | Requisição | Enviado pelo `ApiClient` em todas as chamadas |
| `Retry-After` | Resposta (429) | Exibir contagem regressiva ao usuário |
| `Deprecation` / `Sunset` | Resposta | Logar aviso no console |
| `X-Pagination` | Resposta | Ler metadados de paginação quando presente |

