import { createFileRoute, Link, useLocation, useNavigate } from "@tanstack/react-router"; // prettier-ignore
import { seoTranslations } from "@/i18n/languages";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("not-found")) {
      navigate({ to: "not-found" });
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        {t("notFoundTitle")}
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">{t("notFoundDescription")}</p>
      <Link
        to={`/`}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        {t("backToHome")}
      </Link>
    </div>
  );
}
