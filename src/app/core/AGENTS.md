# Core — Instruções para Agentes

Módulos centrais: auth, API, guards, interceptors, theme, i18n.

## Regras
- **API:** Todo HTTP via `ApiClient` (api/api-client.ts)
- **Auth:** `AuthSessionService` para sessão; guards em `guards/`
- **Guards:** `authGuard`, `roleGuard` — CanActivateFn funcionais
- **Interceptors:** refresh-token, retry-429, i18n
- **Theme:** `ThemeService` aplica classe `.dark` no html

## Não fazer
- Importar features em core
- Lógica de negócio específica de feature
- HTTP directo (usar ApiClient)

## Referências
- `.ai/rules/06-api.md`, `08-security.md`, `10-routing.md`
- `.ai/rules/16-darktheme.md`
