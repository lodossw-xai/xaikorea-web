// Data exports
export { default as advisorsData } from './advisors.json';
export { default as contactData } from './contact.json';
export { default as faqData } from './faq.json';
export { default as footerData } from './footer.json';
export { default as heroData } from './hero.json';
export { default as navigationData } from './navigation.json';
export { default as servicesData } from './services.json';
export { default as teamData } from './team.json';

// Types
export type Language = 'ko' | 'en';

export interface LocalizedData<T> {
  ko: T;
  en: T;
}

// Helper function to get localized data
export function getLocalizedData<T>(
  data: LocalizedData<T>,
  language: Language
): T {
  return data[language];
}
