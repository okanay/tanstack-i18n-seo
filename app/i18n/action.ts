import { getHeaders } from "@tanstack/react-start/server";
import { getLanguageFromCookie, getLanguageFromHeader } from "@/i18n/helpers";
import { createServerFn } from "@tanstack/react-start";

import { DEFAULT_LANGUAGE } from "@/i18n/config";

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
