import { useContext } from "react";
import { LanguageContext } from "./provider";
import { DEFAULT_LANGUAGE } from "./config";
import { useTranslation } from "react-i18next";

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}

export function useAppTranslation(namespace: string = "translation") {
  // i18next'in useTranslation hook'unu kullan
  const { t, i18n } = useTranslation(namespace);
  const { language = DEFAULT_LANGUAGE } = useLanguage();

  return {
    t,
    i18n,
    language,
    dir: i18n.dir(language), // Yazı yönü (RTL/LTR)
  };
}

// SEO başlık ve açıklamaları için yardımcı fonksiyon
export function useSeoTranslation(section: string) {
  const { t } = useTranslation("seo");

  return {
    title: t(`${section}.title`),
    description: t(`${section}.description`),
  };
}
