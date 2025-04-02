import { getHeaders } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";

import {
  DEFAULT_LANGUAGE,
  I18N_COOKIE_NAME,
  SUPPORTED_LANGUAGES,
} from "@/i18n/config";

export const detectLanguage = createServerFn({
  method: "GET",
}).handler(async () => {
  const headers = getHeaders();

  // Cookie'den dil tercihini kontrol et
  const cookies = headers["cookie"];
  const langFromCookie = getLanguageFromCookie(cookies || "");

  // Accept-Language header'ını kontrol et
  const acceptLanguage = headers["accept-language"];
  const langFromHeader = getLanguageFromHeader(acceptLanguage || "");

  // Öncelik sırasına göre dil belirle
  return langFromCookie || langFromHeader || DEFAULT_LANGUAGE;
});

export function getLanguageFromHeader(acceptLanguage: string): Language | null {
  if (!acceptLanguage) return null;
  const languages = acceptLanguage.split(",");
  for (const lang of languages) {
    const langCode = lang.split(";")[0].trim().split("-")[0];
    if (SUPPORTED_LANGUAGES.includes(langCode as Language)) {
      return langCode as Language;
    }
  }
  return null;
}

export function getLanguageFromCookie(cookieHeader: string): Language | null {
  if (!cookieHeader) return null;

  const cookies = parseCookies(cookieHeader);
  const langFromCookie = cookies[I18N_COOKIE_NAME];

  if (!langFromCookie) return null;

  return SUPPORTED_LANGUAGES.includes(langFromCookie as Language)
    ? (langFromCookie as Language)
    : null;
}

function parseCookies(cookieString: string): Record<string, string> {
  const cookies: Record<string, string> = {};

  if (!cookieString) return cookies;

  const cookiePairs = cookieString.split(";");
  for (const pair of cookiePairs) {
    const [key, value] = pair.trim().split("=");
    if (key && value) {
      cookies[key] = decodeURIComponent(value);
    }
  }

  return cookies;
}
