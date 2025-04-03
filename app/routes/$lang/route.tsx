// app/routes/(languages)/route.tsx
import { seoTranslations } from "@/i18n/languages";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$lang")({
  loader: async ({ params: { lang } }) => {
    return { lang };
  },
  head: ({ loaderData: { lang } }) => {
    const seoData = seoTranslations[lang];
    return {
      meta: [
        {
          title: seoData.root.title,
        },
        {
          name: "description",
          content: seoData.root.description,
        },
      ],
      links: [
        {
          rel: "stylesheet",
          href: `/fonts/custom/font.css`,
        },
        {
          rel: "preload",
          href: `/fonts/custom/extra-bold.woff2`,
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
          importance: "low",
        },
        {
          rel: "preload",
          href: `/fonts/custom/bold.woff2`,
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
          importance: "low",
        },
        {
          rel: "preload",
          href: `/fonts/custom/semibold.woff2`,
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
          importance: "low",
        },
        {
          rel: "preload",
          href: `/fonts/custom/medium.woff2`,
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
          importance: "low",
        },
        {
          rel: "preload",
          href: `/fonts/custom/regular.woff2`,
          as: "font",
          type: "font/woff2",
          crossOrigin: "anonymous",
          importance: "low",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
          color: "#ffffff",
        },
      ],
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
