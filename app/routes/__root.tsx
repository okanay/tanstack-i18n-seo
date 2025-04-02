import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  redirect,
} from "@tanstack/react-router";

import { getHeaders } from "@tanstack/react-start/server";
import { getLanguageFromCookie, getLanguageFromHeader } from "@/i18n/helpers";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@/i18n/config";

import globals from "@/styles/globals.css?url";

export const Route = createRootRoute({
  loader: async (ctx) => {
    const headers = getHeaders();

    // 1. URL'den dil parametresini kontrol et
    const pathSegments = ctx.location.pathname.split("/");
    const langFromUrl = pathSegments[1];
    const isValidLangFromUrl = SUPPORTED_LANGUAGES.includes(
      langFromUrl as Language,
    );

    // 2. Cookie'den dil tercihini kontrol et
    const cookies = headers["cookie"];
    const langFromCookie = getLanguageFromCookie(cookies || "");

    // 3. Accept-Language header'ını kontrol et
    const acceptLanguage = headers["accept-language"];
    const langFromHeader = getLanguageFromHeader(acceptLanguage || "");

    // 4. Öncelik sırasına göre dil belirle
    const lang = isValidLangFromUrl
      ? langFromUrl
      : langFromCookie
        ? langFromCookie
        : langFromHeader
          ? langFromHeader
          : DEFAULT_LANGUAGE;

    // 5. URL'de dil parametresi yoksa, yönlendirme yap
    if (!isValidLangFromUrl && pathSegments.length > 1) {
      // Örn: /about --> /tr/about
      return redirect({ to: `/${lang}${ctx.location.pathname}`, throw: true });
    }

    return {
      lang,
    };
  },
  head: ({ loaderData: {} }) => {
    return {
      links: [
        {
          rel: "stylesheet",
          href: globals,
        },
        {
          rel: "sitemap",
          type: "application/xml",
          title: "sitemap",
          href: `/api/sitemap`,
        },
        {
          rel: "icon",
          href: "/favicon.ico",
        },
      ],
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "theme-color",
          media: "(prefers-color-scheme: light)",
          content: "#ffffff",
        },
        {
          name: "theme-color",
          media: "(prefers-color-scheme: dark)",
          content: "#000000",
        },
        {
          title: "TanStack Start",
        },
        {
          name: "description",
          content:
            "TanStack Start is a starter template for building web applications with TanStack tools.",
        },
      ],
    };
  },
  component: RootComponent,
});

function RootDocument({ children }: Readonly<{ children: React.ReactNode }>) {
  const { lang } = Route.useLoaderData();

  return (
    <html lang={lang}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}
