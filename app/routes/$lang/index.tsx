import { SwitchLanguage } from "@/components/switch-language";
import { Link } from "@/i18n/link";
import { createFileRoute } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/$lang/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  const handleDummyToast = () => {
    toast(t("index.title"));
  };

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-4 p-10">
      <h1>{t("index.title")}</h1>
      <SwitchLanguage />
      <button
        onClick={handleDummyToast}
        className="w-fit cursor-pointer rounded border border-gray-200 bg-gray-100 px-4 py-2 font-medium transition-colors duration-300 hover:opacity-75"
      >
        Create Toast
      </button>
      <Link
        className="w-fit rounded border border-gray-200 bg-gray-100 px-4 py-2 font-medium transition-colors duration-300 hover:opacity-75"
        to="/blog/1"
      >
        Blog Page
      </Link>
      <img
        src="/images/dummy.webp"
        alt="Dummy Image"
        loading="lazy"
        fetchPriority="low"
        className="size-[440px] object-cover"
      />
      <Link
        className="w-fit rounded border border-gray-200 bg-gray-100 px-4 py-2 font-medium transition-colors duration-300 hover:opacity-75"
        to="/blog/0"
      >
        Not Found Blog
      </Link>
    </main>
  );
}
