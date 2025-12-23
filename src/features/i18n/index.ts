/**
 * i18n Feature Module
 * Exports translation utilities and types
 */

import type { Language } from '../../store/languageStore';
import enTranslations from './locales/en.json';
import koTranslations from './locales/ko.json';
import type { Translations } from './types';

export type { Language } from '../../store/languageStore';
export type { Translations } from './types';

const translations: Record<Language, Translations> = {
  ko: koTranslations as Translations,
  en: enTranslations as Translations,
};

/**
 * Get translations for a specific language
 */
export function getTranslations(language: Language): Translations {
  return translations[language];
}

/**
 * Get a specific translation key using dot notation
 * @example t('nav.home', 'ko') => '홈'
 */
export function translate(key: string, language: Language): string {
  const keys = key.split('.');
  let result: unknown = translations[language];

  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k];
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
  }

  return typeof result === 'string' ? result : key;
}
