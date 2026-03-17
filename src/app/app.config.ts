import { ApplicationConfig, APP_INITIALIZER, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions
} from '@angular/router';
import { routes } from './app.routes';
import { API_BASE_URL } from './core/api/api.config';
import { refreshTokenInterceptor } from './core/interceptors/refresh-token.interceptor';
import { retry429Interceptor } from './core/interceptors/retry-429.interceptor';
import { i18nInterceptor } from './core/i18n/i18n.interceptor';
import { AuthSessionService } from './core/auth/auth-session.service';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([retry429Interceptor, refreshTokenInterceptor, i18nInterceptor])
    ),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withComponentInputBinding(),
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
    { provide: API_BASE_URL, useValue: environment.apiUrl },
    {
      provide: APP_INITIALIZER,
      useFactory: (session: AuthSessionService) => () => {
        session.restoreFromStorage();
        session.setTenant(environment.tenantSlug);
      },
      deps: [AuthSessionService],
      multi: true
    }
  ]
};
