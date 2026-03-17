import { Injectable, computed, signal } from '@angular/core';

export interface SessionUser {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  lastLoginAt?: string | null;
  roles: string[];
}

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  refreshToken?: string;
  user: SessionUser;
}

interface JwtPayload {
  sub: string;
  email: string;
  given_name?: string;
  role: string | string[];
  permission?: string | string[];
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  private readonly tokenSignal = signal<string | null>(null);
  private readonly refreshTokenSignal = signal<string | null>(null);
  private readonly tenantSignal = signal<string>('public');
  private readonly userSignal = signal<SessionUser | null>(null);

  readonly user = this.userSignal.asReadonly();

  readonly permissions = computed<string[]>(() => {
    const token = this.tokenSignal();
    if (!token) return [];
    try {
      const payload = this.decodeJwt(token);
      const p = payload.permission ?? [];
      return Array.isArray(p) ? p : [p];
    } catch {
      return [];
    }
  });

  token(): string | null {
    return this.tokenSignal();
  }

  refreshToken(): string | null {
    return this.refreshTokenSignal();
  }

  tenant(): string {
    return this.tenantSignal();
  }

  userId(): string | null {
    return this.userSignal()?.id ?? null;
  }

  isAuthenticated(): boolean {
    return this.tokenSignal() !== null;
  }

  hasRole(role: string): boolean {
    return this.userSignal()?.roles.includes(role) ?? false;
  }

  hasPermission(permission: string): boolean {
    return this.permissions().includes(permission);
  }

  isAdmin(): boolean {
    return this.hasRole('Admin');
  }

  isTokenExpiringSoon(): boolean {
    const token = this.tokenSignal();
    if (!token) return false;
    try {
      const payload = this.decodeJwt(token);
      return Date.now() >= (payload.exp - 300) * 1000; // 5 min antes
    } catch {
      return true;
    }
  }

  setSession(response: LoginResponse): void {
    this.tokenSignal.set(response.accessToken);
    this.userSignal.set(response.user);
    if (response.refreshToken) {
      this.refreshTokenSignal.set(response.refreshToken);
    }
    // Persistir token entre reloads
    try {
      localStorage.setItem('access_token', response.accessToken);
      if (response.refreshToken) {
        sessionStorage.setItem('refresh_token', response.refreshToken);
      }
    } catch { /* SSR / teste */ }
  }

  restoreFromStorage(): void {
    try {
      const token = localStorage.getItem('access_token');
      const refreshToken = sessionStorage.getItem('refresh_token');
      if (token) {
        this.tokenSignal.set(token);
        const payload = this.decodeJwt(token);
        // Reconstituir usuário mínimo do JWT
        const roles = payload.role
          ? Array.isArray(payload.role) ? payload.role : [payload.role]
          : [];
        this.userSignal.set({
          id: payload.sub,
          email: payload.email,
          firstName: payload.given_name ?? '',
          roles
        });
      }
      if (refreshToken) this.refreshTokenSignal.set(refreshToken);
    } catch { /* token inválido */ }
  }

  setTenant(tenant: string): void {
    this.tenantSignal.set(tenant);
  }

  updateToken(accessToken: string, refreshToken?: string): void {
    this.tokenSignal.set(accessToken);
    try { localStorage.setItem('access_token', accessToken); } catch { /* */ }
    if (refreshToken) {
      this.refreshTokenSignal.set(refreshToken);
      try { sessionStorage.setItem('refresh_token', refreshToken); } catch { /* */ }
    }
  }

  clear(): void {
    this.tokenSignal.set(null);
    this.refreshTokenSignal.set(null);
    this.userSignal.set(null);
    try {
      localStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
    } catch { /* */ }
  }

  /** Alias semântico para clear() — use antes de redirecionar para login */
  logout(): void {
    this.clear();
  }

  private decodeJwt(token: string): JwtPayload {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
  }
}
