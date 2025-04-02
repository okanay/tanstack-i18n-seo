export type Language = "tr" | "en" | string;

export const LANGUAGES: Record<string, Language> = {
  TURKISH: "tr",
  ENGLISH: "en",
} as const;

export const SUPPORTED_LANGUAGES: Language[] = Object.values(LANGUAGES);

export const DEFAULT_LANGUAGE: Language = LANGUAGES.ENGLISH;
export const FALLBACK_LANGUAGE: Language = "";

export const I18N_STORAGE_KEY = "language";
export const I18N_COOKIE_NAME = "language";
export const I18N_COOKIE_OPTIONS = {
  expires: 365,
  path: "/",
  sameSite: "lax",
};
