// app/i18n/languages/index.ts
import translationEn from "./en/translation.json";
import translationTr from "./tr/translation.json";
import seoEn from "./en/seo.json";
import seoTr from "./tr/seo.json";

// Translation Files.
export const translations = {
  en: translationEn,
  tr: translationTr,
};

// Static SEO Files.
export const seoTranslations = {
  en: seoEn,
  tr: seoTr,
};

// Tüm kaynaklar
export const resources = {
  en: {
    translation: translationEn,
  },
  tr: {
    translation: translationTr,
  },
};
