import { SwitchLanguage } from "@/components/switch-language";
import { Link } from "@/i18n/link";
import { createFileRoute } from "@tanstack/react-router";
import toast from "react-hot-toast";

export const Route = createFileRoute("/$lang/")({
  component: RouteComponent,
});

function RouteComponent() {
  const handleDummyToast = () => {
    toast("Here is your toast.");
  };

  return (
    <main className="mx-auto flex max-w-7xl flex-col gap-4 p-10">
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
    </main>
  );
}
