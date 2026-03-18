export const environment = {
  production: true,
  apiUrl: 'https://api.exemplo.com/api',
  tenantSlug: 'acme',
  oauthRedirectUri: 'https://app.exemplo.com/auth/callback',
  /** Versionamento por módulo (não na base URL) */
  apiVersions: {
    products: 'v1',
    tenants: 'v1',
    identity: 'v1',
    authorization: 'v1',
  } as const,
};

