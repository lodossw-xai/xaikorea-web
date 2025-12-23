/**
 * useI18n Hook
 * Provides translation utilities for components
 * Constitution II: View & Logic Separation
 */
import { useCallback } from 'react';
import {
  getTranslations,
  translate,
  type Translations,
} from '../features/i18n';
import useLanguageStore, { type Language } from '../store/languageStore';

interface UseI18nReturn {
  /** Current language */
  language: Language;
  /** Set the current language */
  setLanguage: (lang: Language) => void;
  /** Get translation by dot notation key (e.g., 'nav.home') */
  t: (key: string) => string;
  /** Get all translations for current language */
  translations: Translations;
}

/**
 * Custom hook for internationalization
 * @returns Translation utilities and language state
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { t, language, setLanguage } = useI18n();
 *   return <h1>{t('hero.title1')}</h1>;
 * }
 * ```
 */
function useI18n(): UseI18nReturn {
  const { language, setLanguage } = useLanguageStore();

  const t = useCallback(
    (key: string): string => translate(key, language),
    [language]
  );

  const translations = getTranslations(language);

  return {
    language,
    setLanguage,
    t,
    translations,
  };
}

export default useI18n;
