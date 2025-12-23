/**
 * Translation Types
 * Defines the structure of translation files
 */

export interface NavTranslations {
  home: string;
  services: string;
  advisors: string;
  team: string;
  contact: string;
}

export interface HeroTranslations {
  badge: string;
  title1: string;
  title2: string;
  description: string;
  cta_demo: string;
  cta_video: string;
  scroll_down: string;
}

export interface DemoCardTranslations {
  user_question: string;
  ai_label: string;
  ai_response: string;
  source: string;
  accuracy_label: string;
  accuracy_value: string;
}

export interface PartnersTranslations {
  title: string;
}

export interface ServicesTranslations {
  title1: string;
  title2: string;
  title3: string;
  description: string;
  card1_title: string;
  card1_desc: string;
  card2_title: string;
  card2_desc: string;
  card2_badge: string;
  card3_title: string;
  card3_desc: string;
}

export interface ProcessTranslations {
  title1: string;
  title2: string;
  title_highlight: string;
  title3: string;
  description: string;
  step1: string;
  step2: string;
  step3: string;
}

export interface AccuracyTranslations {
  title1: string;
  title2: string;
  description: string;
  feature1_title: string;
  feature1_desc: string;
  feature2_title: string;
  feature2_desc: string;
  feature3_title: string;
  feature3_desc: string;
}

export interface AdvisorsTranslations {
  title1: string;
  title2: string;
  advisor1_quote: string;
  advisor1_name: string;
  advisor1_role: string;
  advisor2_badge: string;
  advisor2_quote: string;
  advisor2_name: string;
  advisor2_role: string;
  advisor3_quote: string;
  advisor3_name: string;
  advisor3_role: string;
}

export interface TeamTranslations {
  title: string;
  description: string;
  hiring_link: string;
  member1_name: string;
  member1_role: string;
  member2_name: string;
  member2_role: string;
  member3_name: string;
  member3_role: string;
  member4_name: string;
  member4_role: string;
}

export interface CtaTranslations {
  title1: string;
  title_highlight: string;
  title2: string;
  title3: string;
  description: string;
  plan_title: string;
  plan_desc: string;
  cta_button: string;
}

export interface FaqTranslations {
  title1: string;
  title2: string;
  q1: string;
  a1: string;
  q2: string;
  a2: string;
  q3: string;
  a3: string;
}

export interface FooterTranslations {
  description: string;
  locations: string;
  customer_center: string;
  email_inquiry: string;
  form_title: string;
  form_name: string;
  form_email: string;
  form_type_placeholder: string;
  form_type_demo: string;
  form_type_pricing: string;
  form_type_partnership: string;
  form_message: string;
  form_submit: string;
  copyright: string;
  privacy: string;
  terms: string;
}

export interface ThemeTranslations {
  light_mode: string;
  dark_mode: string;
  switch_to_light: string;
  switch_to_dark: string;
}

export interface Translations {
  nav: NavTranslations;
  hero: HeroTranslations;
  demo_card: DemoCardTranslations;
  partners: PartnersTranslations;
  services: ServicesTranslations;
  process: ProcessTranslations;
  accuracy: AccuracyTranslations;
  advisors: AdvisorsTranslations;
  team: TeamTranslations;
  cta: CtaTranslations;
  faq: FaqTranslations;
  footer: FooterTranslations;
  theme: ThemeTranslations;
}
