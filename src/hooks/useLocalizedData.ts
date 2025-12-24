import { useMemo } from 'react';
import {
  advisorsData,
  contactData,
  faqData,
  footerData,
  heroData,
  navigationData,
  servicesData,
  teamData,
  type Language,
} from '../data';
import useLanguageStore from '../store/languageStore';

/**
 * Hook to get localized data based on current language
 */
export function useLocalizedData() {
  const { language } = useLanguageStore();
  const lang = language as Language;

  const hero = useMemo(() => heroData[lang], [lang]);
  const services = useMemo(() => servicesData[lang], [lang]);
  const advisors = useMemo(() => advisorsData[lang], [lang]);
  const team = useMemo(() => teamData[lang], [lang]);
  const faq = useMemo(() => faqData[lang], [lang]);
  const contact = useMemo(() => contactData[lang], [lang]);
  const navigation = useMemo(() => navigationData[lang], [lang]);
  const footer = useMemo(() => footerData[lang], [lang]);

  return {
    hero,
    services,
    advisors,
    team,
    faq,
    contact,
    navigation,
    footer,
    language: lang,
  };
}
