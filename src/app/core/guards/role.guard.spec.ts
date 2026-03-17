import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthSessionService } from '../auth/auth-session.service';
import { roleGuard } from './role.guard';

describe('roleGuard', () => {
  let session: { isAdmin: () => boolean; hasPermission: (p: string) => boolean; hasRole: (r: string) => boolean };
  let createUrlTreeCalls: unknown[][] = [];

  beforeEach(() => {
    session = {
      isAdmin: () => false,
      hasPermission: () => false,
      hasRole: () => false
    };
    createUrlTreeCalls = [];
    const mockRouter = {
      createUrlTree: (commands: unknown[]) => {
        createUrlTreeCalls.push(commands);
        return {} as UrlTree;
      }
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthSessionService, useValue: session },
        { provide: Router, useValue: mockRouter }
      ]
    });
  });

  it('deve permitir acesso quando Admin', () => {
    session.isAdmin = () => true;

    const result = TestBed.runInInjectionContext(() =>
      roleGuard({ data: { requiredPermission: 'identity.user.read' } } as never, {} as never)
    );

    expect(result).toBe(true);
  });

  it('deve permitir acesso quando tem requiredPermission', () => {
    session.hasPermission = (p) => p === 'identity.user.read';

    const result = TestBed.runInInjectionContext(() =>
      roleGuard({ data: { requiredPermission: 'identity.user.read' } } as never, {} as never)
    );

    expect(result).toBe(true);
  });

  it('deve redirecionar para unauthorized quando não tem requiredPermission', () => {
    TestBed.runInInjectionContext(() =>
      roleGuard({ data: { requiredPermission: 'identity.user.read' } } as never, {} as never)
    );

    expect(createUrlTreeCalls).toHaveLength(1);
    expect(createUrlTreeCalls[0]).toEqual(['/unauthorized']);
  });

  it('deve permitir acesso quando tem requiredRole', () => {
    session.hasRole = (r) => r === 'Manager';

    const result = TestBed.runInInjectionContext(() =>
      roleGuard({ data: { requiredRole: 'Manager' } } as never, {} as never)
    );

    expect(result).toBe(true);
  });

  it('deve permitir acesso quando não há requiredPermission nem requiredRole', () => {
    const result = TestBed.runInInjectionContext(() =>
      roleGuard({ data: {} } as never, {} as never)
    );

    expect(result).toBe(true);
  });
});
