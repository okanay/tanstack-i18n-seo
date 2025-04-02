// app/i18n/languages/index.ts
import translationEn from "./en/translation.json";
import translationTr from "./tr/translation.json";
import seoEn from "./en/seo.json";
import seoTr from "./tr/seo.json";

// Çeviri dosyaları
export const translations = {
  en: translationEn,
  tr: translationTr,
};

// SEO dosyaları
export const seoTranslations = {
  en: seoEn,
  tr: seoTr,
};

// Tüm kaynaklar
export const resources = {
  en: {
    translation: translationEn,
    seo: seoEn,
  },
  tr: {
    translation: translationTr,
    seo: seoTr,
  },
};
