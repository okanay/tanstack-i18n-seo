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
    toast("Here is your toast.");
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
        to="/blog"
      >
        Blog Page
      </Link>
      <Link
        className="w-fit rounded border border-gray-200 bg-gray-100 px-4 py-2 font-medium transition-colors duration-300 hover:opacity-75"
        to="/not-found"
      >
        Not Found Page
      </Link>
    </main>
  );
}
