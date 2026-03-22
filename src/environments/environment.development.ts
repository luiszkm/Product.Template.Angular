export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  tenantSlug: 'public',
  oauthRedirectUri: 'http://localhost:4200/auth/callback',
  /** Versionamento por módulo (não na base URL) */
  apiVersions: {
    products: 'v1',
    tenants: 'v1',
    identity: 'v1',
    authorization: 'v1',
  } as const,
};

