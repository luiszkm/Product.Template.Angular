import { z } from 'zod';

/**
 * Schema de validação para variáveis de ambiente.
 *
 * REGRAS:
 * - Todas as variáveis são obrigatórias (fail-fast)
 * - URLs devem ser válidas e sem trailing slash
 * - tenantSlug deve ser alfanumérico (lowercase)
 * - oauthRedirectUri deve ser URL absoluta
 */
const envSchema = z.object({
  production: z.boolean(),
  apiUrl: z.string()
    .url('API_URL deve ser uma URL válida')
    .refine(url => !url.endsWith('/'), {
      message: 'API_URL não deve terminar com /'
    }),
  tenantSlug: z.string()
    .min(1, 'TENANT_SLUG é obrigatório')
    .regex(/^[a-z0-9-]+$/, 'TENANT_SLUG deve conter apenas letras minúsculas, números e hífens'),
  oauthRedirectUri: z.string()
    .url('OAUTH_REDIRECT_URI deve ser uma URL válida')
});

/**
 * Tipo inferido do schema (type-safe)
 */
export type Environment = z.infer<typeof envSchema>;

/**
 * Valida e retorna as variáveis de ambiente.
 * Lança erro detalhado se alguma validação falhar (fail-fast).
 *
 * @param raw - Objeto com variáveis de ambiente brutas
 * @returns Objeto tipado e validado
 * @throws {Error} Se validação falhar
 */
export function validateEnv(raw: Record<string, unknown>): Environment {
  try {
    return envSchema.parse(raw);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.issues.map(
        (err) => `  ❌ ${err.path.join('.')}: ${err.message}`
      );

      throw new Error(
        `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
        `❌ ERRO DE CONFIGURAÇÃO DE AMBIENTE\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
        `As seguintes variáveis de ambiente são inválidas:\n\n` +
        `${messages.join('\n')}\n\n` +
        `Verifique os arquivos .env.development ou .env.production\n` +
        `e consulte .env.example para referência.\n` +
        `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`
      );
    }
    throw error;
  }
}

/**
 * Lê variáveis de ambiente do objeto global (injetado pelo build).
 * Prefixo: NG_APP_*
 */
export function loadEnvFromGlobal(isProduction: boolean): Environment {
  // Type assertion para acessar variáveis injetadas pelo Angular builder
  const globalEnv = globalThis as unknown as Record<string, string>;

  return validateEnv({
    production: isProduction,
    apiUrl: globalEnv['NG_APP_API_URL'],
    tenantSlug: globalEnv['NG_APP_TENANT_SLUG'],
    oauthRedirectUri: globalEnv['NG_APP_OAUTH_REDIRECT_URI']
  });
}

