import { ApplicationConfig, APP_INITIALIZER, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LUCIDE_ICONS, LucideIconProvider } from 'lucide-angular';
import {
  LayoutDashboard,
  Users,
  Shield,
  Key,
  Building2,
  Search,
  Sun,
  Moon,
  Bell,
  User,
  Menu,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut
} from 'lucide-angular';
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
import { APP_SETTINGS } from './core/config/app-settings.token';
import { refreshTokenInterceptor } from './core/interceptors/refresh-token.interceptor';
import { retry429Interceptor } from './core/interceptors/retry-429.interceptor';
import { i18nInterceptor } from './core/i18n/i18n.interceptor';
import { AuthSessionService } from './core/auth/auth-session.service';
import { ThemeService } from './core/theme/theme.service';
import type { AppEnvironment } from '../environments/env.validator';

const lucideIcons = {
  LayoutDashboard,
  Users,
  Shield,
  Key,
  Building2,
  Search,
  Sun,
  Moon,
  Bell,
  User,
  Menu,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut
};

export function createAppConfig(settings: AppEnvironment): ApplicationConfig {
  return {
    providers: [
      { provide: APP_SETTINGS, useValue: settings },
      provideBrowserGlobalErrorListeners(),
      { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(lucideIcons) },
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
      { provide: API_BASE_URL, useValue: settings.apiUrl },
      {
        provide: APP_INITIALIZER,
        useFactory: (session: AuthSessionService, theme: ThemeService) => () => {
          theme.init();
          session.restoreFromStorage();
          session.setTenant(settings.tenantSlug);
        },
        deps: [AuthSessionService, ThemeService],
        multi: true
      }
    ]
  };
}
