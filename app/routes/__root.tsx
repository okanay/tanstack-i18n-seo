import { detectLanguage } from "@/i18n/action";
import { SUPPORTED_LANGUAGES } from "@/i18n/config";
import { seoTranslations } from "@/i18n/languages";
import LanguageProvider from "@/i18n/provider";
import { HeadContent, Outlet, Scripts, createRootRoute, redirect } from "@tanstack/react-router"; // prettier-ignore
import globals from "@/styles/globals.css?url";

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
  head: ({ loaderData: { lang } }) => {
    const seoData = seoTranslations[lang];

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
          title: seoData.root.title,
        },
        {
          name: "description",
          content: seoData.root.description,
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
  const { lang } = Route.useLoaderData();

  return (
    <RootDocument>
      <LanguageProvider serverLanguage={lang}>
        <Outlet />
      </LanguageProvider>
    </RootDocument>
  );
}
