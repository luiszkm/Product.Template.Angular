import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { I18nService } from './i18n.service';

/**
 * Adiciona header Accept-Language em todas as requisições HTTP.
 * O backend pode usar para retornar mensagens de erro traduzidas.
 */
export const i18nInterceptor: HttpInterceptorFn = (req, next) => {
  const i18n = inject(I18nService);

  const cloned = req.clone({
    setHeaders: {
      'Accept-Language': i18n.currentLocale()
    }
  });

  return next(cloned);
};

