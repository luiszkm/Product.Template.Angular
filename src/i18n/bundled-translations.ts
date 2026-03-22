import { DEFAULT_LOCALE } from './i18n.config';
import enUS from './en-US.json';
import ptBR from './pt-BR.json';

export type BundledTranslations = Record<string, unknown>;

/** Traduções embutidas no bundle — disponíveis antes do primeiro paint (sem GET). */
export const BUNDLED_TRANSLATIONS: Record<string, BundledTranslations> = {
  'pt-BR': ptBR as BundledTranslations,
  'en-US': enUS as BundledTranslations
};

export function getBundledTranslations(locale: string): BundledTranslations {
  return BUNDLED_TRANSLATIONS[locale] ?? BUNDLED_TRANSLATIONS[DEFAULT_LOCALE];
}
