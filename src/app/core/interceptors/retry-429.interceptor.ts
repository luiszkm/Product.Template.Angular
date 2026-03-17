import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, throwError, timer } from 'rxjs';

/**
 * Interceptor que retenta requisições que retornam 429 (Too Many Requests).
 * Usa o header Retry-After para aguardar antes de retentar (máx. 1 retry).
 */
export const retry429Interceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 429) {
        return throwError(() => error);
      }

      const retryAfter = error.headers?.get('Retry-After');
      const delayMs = retryAfter
        ? Math.min(parseInt(retryAfter, 10) * 1000, 60000)
        : 5000;

      return timer(delayMs).pipe(switchMap(() => next(req)));
    })
  );
};
