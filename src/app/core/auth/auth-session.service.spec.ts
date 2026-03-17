import { TestBed } from '@angular/core/testing';
import { AuthSessionService, LoginResponse, SessionUser } from './auth-session.service';

function createJwt(payload: Record<string, unknown>): string {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify(payload));
  const signature = btoa('signature');
  return `${header}.${body}.${signature}`;
}

describe('AuthSessionService', () => {
  let service: AuthSessionService;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    TestBed.configureTestingModule({
      providers: [AuthSessionService]
    });
    service = TestBed.inject(AuthSessionService);
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('hasPermission deve retornar true quando permission está no token', () => {
    const token = createJwt({
      sub: 'user-1',
      email: 'test@test.com',
      role: ['Admin'],
      permission: ['identity.user.read', 'identity.user.manage'],
      exp: Math.floor(Date.now() / 1000) + 3600
    });
    const user: SessionUser = { id: 'user-1', email: 'test@test.com', firstName: 'Test', roles: ['Admin'] };
    service.setSession({
      accessToken: token,
      tokenType: 'Bearer',
      expiresIn: 3600,
      user
    });

    expect(service.hasPermission('identity.user.read')).toBe(true);
    expect(service.hasPermission('identity.user.manage')).toBe(true);
    expect(service.hasPermission('tenants.read')).toBe(false);
  });

  it('hasPermission deve normalizar permission como string única', () => {
    const token = createJwt({
      sub: 'user-1',
      email: 'test@test.com',
      role: 'Admin',
      permission: 'identity.user.read',
      exp: Math.floor(Date.now() / 1000) + 3600
    });
    const user: SessionUser = { id: 'user-1', email: 'test@test.com', firstName: 'Test', roles: ['Admin'] };
    service.setSession({
      accessToken: token,
      tokenType: 'Bearer',
      expiresIn: 3600,
      user
    });

    expect(service.hasPermission('identity.user.read')).toBe(true);
  });

  it('hasRole deve retornar true quando role está no user', () => {
    const user: SessionUser = {
      id: 'user-1',
      email: 'test@test.com',
      firstName: 'Test',
      roles: ['Admin', 'Manager']
    };
    service.setSession({
      accessToken: createJwt({ sub: 'user-1', exp: Math.floor(Date.now() / 1000) + 3600 }),
      tokenType: 'Bearer',
      expiresIn: 3600,
      user
    });

    expect(service.hasRole('Admin')).toBe(true);
    expect(service.hasRole('Manager')).toBe(true);
    expect(service.hasRole('User')).toBe(false);
  });

  it('isAdmin deve retornar true quando user tem role Admin', () => {
    const user: SessionUser = { id: 'user-1', email: 'test@test.com', firstName: 'Test', roles: ['Admin'] };
    service.setSession({
      accessToken: createJwt({ sub: 'user-1', exp: Math.floor(Date.now() / 1000) + 3600 }),
      tokenType: 'Bearer',
      expiresIn: 3600,
      user
    });

    expect(service.isAdmin()).toBe(true);
  });

  it('hasPermission e hasRole devem retornar false quando não autenticado', () => {
    expect(service.hasPermission('identity.user.read')).toBe(false);
    expect(service.hasRole('Admin')).toBe(false);
  });

  it('logout deve limpar a sessão', () => {
    const user: SessionUser = { id: 'user-1', email: 'test@test.com', firstName: 'Test', roles: ['Admin'] };
    service.setSession({
      accessToken: createJwt({ sub: 'user-1', exp: Math.floor(Date.now() / 1000) + 3600 }),
      tokenType: 'Bearer',
      expiresIn: 3600,
      user
    });

    expect(service.isAuthenticated()).toBe(true);
    service.logout();
    expect(service.isAuthenticated()).toBe(false);
    expect(service.hasPermission('identity.user.read')).toBe(false);
    expect(service.hasRole('Admin')).toBe(false);
  });
});
