#!/usr/bin/env node

/**
 * Script de teste para validação de variáveis de ambiente.
 * Testa cenários válidos e inválidos do env.validator.ts
 */

const { z } = require('zod');

// Copiar schema do env.validator.ts
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

function testValidation(testCase, data) {
  console.log(`\n🧪 Testando: ${testCase}`);
  try {
    const result = envSchema.parse(data);
    console.log('   ✅ PASSOU:', JSON.stringify(result, null, 2).replace(/\n/g, '\n      '));
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log('   ❌ FALHOU:');
      error.issues.forEach(issue => {
        console.log(`      - ${issue.path.join('.')}: ${issue.message}`);
      });
    }
  }
}

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔬 TESTE DE VALIDAÇÃO DE VARIÁVEIS DE AMBIENTE');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// ✅ CASOS VÁLIDOS
testValidation('Configuração válida (development)', {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1',
  tenantSlug: 'public',
  oauthRedirectUri: 'http://localhost:4200/auth/callback'
});

testValidation('Configuração válida (production)', {
  production: true,
  apiUrl: 'https://api.exemplo.com/api/v1',
  tenantSlug: 'acme-corp-2024',
  oauthRedirectUri: 'https://app.exemplo.com/auth/callback'
});

// ❌ CASOS INVÁLIDOS
testValidation('API URL com trailing slash (inválido)', {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1/',  // ❌ trailing slash
  tenantSlug: 'public',
  oauthRedirectUri: 'http://localhost:4200/auth/callback'
});

testValidation('API URL inválida', {
  production: false,
  apiUrl: 'not-a-url',  // ❌ não é URL
  tenantSlug: 'public',
  oauthRedirectUri: 'http://localhost:4200/auth/callback'
});

testValidation('Tenant slug com maiúsculas (inválido)', {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1',
  tenantSlug: 'PublicTenant',  // ❌ maiúsculas
  oauthRedirectUri: 'http://localhost:4200/auth/callback'
});

testValidation('Tenant slug com caracteres especiais (inválido)', {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1',
  tenantSlug: 'public_tenant',  // ❌ underscore
  oauthRedirectUri: 'http://localhost:4200/auth/callback'
});

testValidation('OAuth URI relativa (inválido)', {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1',
  tenantSlug: 'public',
  oauthRedirectUri: '/auth/callback'  // ❌ URL relativa
});

testValidation('Variável ausente', {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1',
  tenantSlug: 'public'
  // ❌ oauthRedirectUri ausente
});

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('✅ Testes concluídos!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

