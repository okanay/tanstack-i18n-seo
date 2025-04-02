import { I18N_COOKIE_NAME, SUPPORTED_LANGUAGES } from "./config";

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
