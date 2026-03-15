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
import { AuthSessionService } from './core/auth/auth-session.service';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([refreshTokenInterceptor])
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
