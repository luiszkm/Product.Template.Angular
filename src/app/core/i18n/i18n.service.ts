import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AVAILABLE_LOCALES, getBrowserLocale, Locale } from '../../../i18n/i18n.config';

type Translations = Record<string, unknown>;

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly http = inject(HttpClient);

  private readonly _currentLocale = signal<string>(this.getStoredLocale());
  private readonly _translations = signal<Translations>({});
  private readonly _loading = signal(false);

  readonly currentLocale = this._currentLocale.asReadonly();
  readonly translations = this._translations.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly availableLocales = AVAILABLE_LOCALES;

  constructor() {
    this.loadTranslations(this._currentLocale());
  }

  /**
   * Traduz uma chave com interpolação de variáveis.
   * Exemplo: translate('errors.minLength', { min: 3 }) → "Mínimo de 3 caracteres"
   */
  translate(key: string, params?: Record<string, string | number>): string {
    const keys = key.split('.');
    let value: unknown = this._translations();

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        console.warn(`[I18n] Translation key not found: ${key}`);
        return key; // Fallback: retorna a própria key
      }
    }

    if (typeof value !== 'string') {
      console.warn(`[I18n] Translation value is not a string: ${key}`);
      return key;
    }

    // Interpolação de variáveis
    if (params) {
      return value.replace(/{{(\w+)}}/g, (_, param) => String(params[param] ?? ''));
    }

    return value;
  }

  /**
   * Muda o idioma atual e recarrega traduções.
   */
  setLocale(locale: string): void {
    if (!AVAILABLE_LOCALES.some((l: Locale) => l.code === locale)) {
      console.error(`[I18n] Locale not available: ${locale}`);
      return;
    }

    this._currentLocale.set(locale);
    localStorage.setItem('locale', locale);
    this.loadTranslations(locale);
  }

  private loadTranslations(locale: string): void {
    this._loading.set(true);

    this.http.get<Translations>(`/i18n/${locale}.json`).subscribe({
      next: (translations) => {
        this._translations.set(translations);
        this._loading.set(false);
        document.documentElement.lang = locale;
      },
      error: (err) => {
        console.error(`[I18n] Failed to load translations for ${locale}:`, err);
        this._loading.set(false);
      }
    });
  }

  private getStoredLocale(): string {
    const stored = localStorage.getItem('locale');
    if (stored && AVAILABLE_LOCALES.some((l: Locale) => l.code === stored)) {
      return stored;
    }
    return getBrowserLocale();
  }
}


