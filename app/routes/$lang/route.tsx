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
          rel: "preload stylesheet",
          as: "style",
          href: `/fonts/custom/font.css`,
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
