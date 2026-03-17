import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthSessionService } from '../auth/auth-session.service';
import { environment } from '../../../environments/environment';

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Interceptor de refresh token.
 * Em caso de 401 com refresh token disponível, tenta renovar o access token.
 * Se o refresh falhar, limpa a sessão e redireciona para login.
 * O backend exige X-Tenant em todas as requisições, incluindo refresh.
 */
export const refreshTokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const session = inject(AuthSessionService);
  const router = inject(Router);
  const http = inject(HttpClient);

  // Não interceptar a própria chamada de refresh
  if (req.url.includes('/identity/refresh') || req.url.includes('/identity/login')) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      const refreshToken = session.refreshToken();
      if (!refreshToken) {
        session.clear();
        router.navigateByUrl('/login');
        return throwError(() => error);
      }

      // Tentar renovar o token — incluir X-Tenant obrigatório em todas as requisições
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Tenant': session.tenant()
      });
      return http
        .post<RefreshResponse>(`${environment.apiUrl}/identity/refresh`, { refreshToken }, { headers })
        .pipe(
          switchMap((response) => {
            session.updateToken(response.accessToken, response.refreshToken);

            // Retry da requisição original com o novo token
            const retried = req.clone({
              setHeaders: { Authorization: `Bearer ${response.accessToken}` }
            });
            return next(retried);
          }),
          catchError((refreshError) => {
            // Refresh falhou — sessão expirada, redirecionar para login
            session.clear();
            router.navigateByUrl('/login');
            return throwError(() => refreshError);
          })
        );
    })
  );
};

