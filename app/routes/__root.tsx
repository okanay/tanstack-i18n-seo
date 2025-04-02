import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  redirect,
} from "@tanstack/react-router";

import globals from "@/styles/globals.css?url";
import { detectLanguage } from "@/i18n/action";
import { SUPPORTED_LANGUAGES } from "@/i18n/config";

export const Route = createRootRoute({
  loader: async (ctx) => {
    // URL'den dil parametresini kontrol et
    const pathSegments = ctx.location.pathname.split("/");
    const langParam = pathSegments[1];
    const isValidLangParam = SUPPORTED_LANGUAGES.includes(
      langParam as Language,
    );

    // Eğer URL içinde geçerli bir dil parametresi yoksa
    if (ctx.location.pathname === "/" || !isValidLangParam) {
      const detectedLanguage = await detectLanguage();

      // Kök dizin ise dil yönlendirmesi yap
      if (ctx.location.pathname === "/") {
        throw redirect({
          to: `/${detectedLanguage}`,
        });
      }

      // Geçersiz dil parametresi ise ve başka bir path ise
      // Aynı pathi doğru dille yönlendir
      if (!isValidLangParam && pathSegments.length > 1) {
        const restOfPath = pathSegments.slice(1).join("/");
        throw redirect({
          to: `/${detectedLanguage}/${restOfPath}`,
        });
      }

      return {
        lang: detectedLanguage,
      };
    } else {
      // Geçerli bir dil parametresi varsa, direkt kullan
      return {
        lang: langParam as Language,
      };
    }
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
