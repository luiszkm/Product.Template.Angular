import { bootstrapApplication } from '@angular/platform-browser';
import { createAppConfig } from './app/app.config';
import { App } from './app/app';
import { environment as envFile } from './environments/environment';
import { validateEnv } from './environments/env.validator';

/**
 * Validação em runtime com Zod a partir dos ficheiros `environment` / `environment.development`
 * (file replacement no build). Não usar `process.env` no bundle do browser — o `define` do Angular
 * injeta expressões que referenciam `process` e rebentam no runtime.
 */
const settings = validateEnv({
  production: envFile.production,
  apiUrl: envFile.apiUrl,
  tenantSlug: envFile.tenantSlug,
  oauthRedirectUri: envFile.oauthRedirectUri
});

bootstrapApplication(App, createAppConfig(settings)).catch((err) => console.error(err));
