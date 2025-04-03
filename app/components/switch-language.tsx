import { useLanguage } from "@/i18n/use-language";

export const SwitchLanguage = () => {
  const { changeLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => changeLanguage("en")}
        className="w-fit rounded border border-gray-200 bg-gray-100 px-4 py-2 font-medium transition-colors duration-300 hover:opacity-75"
      >
        English
      </button>
      <button
        onClick={() => changeLanguage("tr")}
        className="w-fit rounded border border-gray-200 bg-gray-100 px-4 py-2 font-medium transition-colors duration-300 hover:opacity-75"
      >
        Türkçe
      </button>
    </div>
  );
};
