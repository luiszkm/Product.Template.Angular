import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { API_BASE_URL } from './api.config';
import { ApiError, ProblemDetails } from './api-types';
import { AuthSessionService } from '../auth/auth-session.service';

export interface RequestOptions {
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  idempotencyKey?: string;
}

@Injectable({ providedIn: 'root' })
export class ApiClient {
  private readonly http = inject(HttpClient);
  private readonly session = inject(AuthSessionService);

  constructor(@Inject(API_BASE_URL) private readonly baseUrl: string) {}

  get<T>(path: string, options?: RequestOptions): Observable<T> {
    return this.request<T>('GET', path, undefined, options);
  }

  post<T, TBody>(path: string, body: TBody, options?: RequestOptions): Observable<T> {
    return this.request<T>('POST', path, body, options);
  }

  put<T, TBody>(path: string, body: TBody, options?: RequestOptions): Observable<T> {
    return this.request<T>('PUT', path, body, options);
  }

  delete<T>(path: string, options?: RequestOptions): Observable<T> {
    return this.request<T>('DELETE', path, undefined, options);
  }

  private request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    body?: unknown,
    options?: RequestOptions
  ): Observable<T> {
    const httpParams = this.buildParams(options?.params);
    const headers = this.buildHeaders(options);

    return this.http
      .request<T>(method, `${this.baseUrl}${path}`, {
        body,
        params: httpParams,
        headers,
        observe: 'response'
      })
      .pipe(
        map((response: HttpResponse<T>) => response.body as T),
        catchError((error: { status: number; error: ProblemDetails; headers?: HttpHeaders }) => {
          const status = error.status;
          const problem = error.error ?? { title: 'Unexpected Error', status };
          const correlationId = error.headers?.get('X-Correlation-ID') ?? undefined;
          const retryAfter = error.headers?.get('Retry-After');
          const retryAfterSeconds = retryAfter ? parseInt(retryAfter, 10) : undefined;

          if (status === 401) {
            this.session.clear();
          }

          const apiError: ApiError = { problem, status, correlationId, retryAfterSeconds };
          return throwError(() => apiError);
        })
      );
  }

  private buildParams(params?: RequestOptions['params']): HttpParams {
    let httpParams = new HttpParams();

    if (!params) {
      return httpParams;
    }

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        httpParams = httpParams.set(key, String(value));
      }
    }

    return httpParams;
  }

  private buildHeaders(options?: RequestOptions): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Tenant': this.session.tenant()
    });

    const token = this.session.token();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    if (options?.idempotencyKey) {
      headers = headers.set('X-Idempotency-Key', options.idempotencyKey);
    }

    if (options?.headers) {
      for (const [key, value] of Object.entries(options.headers)) {
        headers = headers.set(key, value);
      }
    }

    return headers;
  }
}
