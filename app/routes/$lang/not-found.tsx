import { createFileRoute } from "@tanstack/react-router";
import { seoTranslations } from "@/i18n/languages";
import { useTranslation } from "react-i18next";
import { Link } from "@/i18n/link";

export const Route = createFileRoute("/$lang/not-found")({
  loader: async ({ params }) => {
    const lang = params.lang;
    return { lang };
  },
  head: ({ loaderData: { lang } }) => {
    const seoData = seoTranslations[lang];
    return {
      meta: [
        {
          title: seoData.notFound.title,
        },
        {
          name: "description",
          content: seoData.notFound.description,
        },
      ],
    };
  },
  component: DefaultNotFound,
});

export function DefaultNotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
      <h2 className="mb-6 text-2xl font-semibold text-gray-700">
        {t("not-found.title")}
      </h2>
      <p className="mb-8 max-w-md text-gray-600">
        {t("not-found.description")}
      </p>
      <Link
        to={`/`}
        preload={false}
        className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
      >
        {t("not-found.link")}
      </Link>
    </div>
  );
}
