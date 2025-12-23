/**
 * Language Store using Zustand
 * Manages the current language state for i18n support
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'ko' | 'en';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'ko',
      setLanguage: (lang: Language): void => {
        set({ language: lang });
      },
    }),
    {
      name: 'language-storage',
    }
  )
);

export default useLanguageStore;
