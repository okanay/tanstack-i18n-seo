// app/i18n/index.ts
import {
  DEFAULT_LANGUAGE,
  FALLBACK_LANGUAGE,
  I18N_COOKIE_NAME,
  I18N_STORAGE_KEY,
} from "./config";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { resources } from "./languages";

const i18nConfig = (initialLanguage: Language = DEFAULT_LANGUAGE) => {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources: resources,
      lng: initialLanguage,
      fallbackLng: FALLBACK_LANGUAGE || DEFAULT_LANGUAGE,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      ns: ["translation", "seo"],
      defaultNS: "translation",
      detection: {
        lookupCookie: I18N_COOKIE_NAME,
        lookupLocalStorage: I18N_STORAGE_KEY,
        caches: ["localStorage", "cookie"],
      },
    });
  } else if (i18n.language !== initialLanguage) {
    i18n.changeLanguage(initialLanguage);
  }

  return i18n;
};

export default i18nConfig;
