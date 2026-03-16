export interface Locale {
  code: string;           // ISO 639-1 + ISO 3166-1
  label: string;          // Nome nativo do idioma
  flag: string;           // Emoji da bandeira
}

export const AVAILABLE_LOCALES: Locale[] = [
  { code: 'pt-BR', label: 'Português', flag: '🇧🇷' },
  { code: 'en-US', label: 'English', flag: '🇺🇸' }
];

export const DEFAULT_LOCALE = 'pt-BR';

export function getBrowserLocale(): string {
  const browserLang = navigator.language || 'pt-BR';

  // Normalizar para formato correto
  const normalized = browserLang.replace('_', '-');

  // Retornar se locale disponível
  const match = AVAILABLE_LOCALES.find(
    loc => loc.code === normalized || loc.code.startsWith(normalized.split('-')[0])
  );

  return match?.code ?? DEFAULT_LOCALE;
}

