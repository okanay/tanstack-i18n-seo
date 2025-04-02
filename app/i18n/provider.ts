// import React, {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useState,
// } from "react";
// import {
//   DEFAULT_COOKIE_OPTIONS,
//   DEFAULT_LANGUAGE,
//   I18N_COOKIE_NAME,
//   I18N_STORAGE_KEY,
//   SUPPORTED_LANGUAGES,
// } from "./constants";

// import Cookies from "js-cookie";
// import { I18nextProvider } from "react-i18next";
// import { Language } from "./types";

// import i18Config from "./config";

// // Context için tip tanımı
// interface LanguageContextType {
//   language: Language;
//   isReady: boolean;
//   changeLanguage: (lng: Language) => void;
//   toggleLangauges: () => void;
// }

// const LanguageContext = createContext<LanguageContextType | undefined>(
//   undefined,
// );

// interface Props {
//   children: React.ReactNode;
//   serverLanguage?: Language;
// }

// export const LanguageProvider: React.FC<Props> = ({
//   children,
//   serverLanguage = DEFAULT_LANGUAGE,
// }) => {
//   const [isReady, setIsReady] = useState(false);
//   const [language, setLanguage] = useState<Language>(serverLanguage);

//   const i18n = i18Config(serverLanguage);

//   const changeLanguage = useCallback(
//     (lng: Language) => {
//       if (lng === language || !i18n.isInitialized) return;

//       Cookies.set(I18N_COOKIE_NAME, lng, DEFAULT_COOKIE_OPTIONS);

//       if (typeof window !== "undefined") {
//         localStorage.setItem(I18N_STORAGE_KEY, lng);

//         if (document && document.documentElement) {
//           document.documentElement.lang = lng;
//         }
//       }

//       i18n.changeLanguage(lng).then(() => {
//         setLanguage(lng);

//         if (typeof window !== "undefined") {
//           const pathParts = window.location.pathname.split("/");
//           if (pathParts.length >= 2) {
//             const remainingPath = pathParts.slice(2).join("/");
//             window.location.href = /${lng}/${remainingPath};
//           } else {
//             window.location.href = /${lng};
//           }
//         }
//       });
//     },
//     [language, i18n],
//   );

//   const toggleLangauges = useCallback(() => {
//     const currentIndex = SUPPORTED_LANGUAGES.indexOf(language);
//     const nextIndex = (currentIndex + 1) % SUPPORTED_LANGUAGES.length;
//     const newLanguage = SUPPORTED_LANGUAGES[nextIndex];
//     changeLanguage(newLanguage);
//   }, [language, changeLanguage]);

//   useEffect(() => {
//     const handleReady = () => setIsReady(true);

//     if (i18n.isInitialized) {
//       setTimeout(handleReady, 0);
//     } else {
//       i18n.on("initialized", handleReady);
//       i18n.on("loaded", handleReady);

//       return () => {
//         i18n.off("initialized", handleReady);
//         i18n.off("loaded", handleReady);
//       };
//     }
//   }, [i18n]);

//   if (!isReady) return null;

//   return (
//     <LanguageContext.Provider
//       value={{
//         language,
//         isReady,
//         changeLanguage,
//         toggleLangauges,
//       }}
//     >
//       <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
//     </LanguageContext.Provider>
//   );
// };

// // Context hook'u
// export const useLanguage = (): LanguageContextType => {
//   const context = useContext(LanguageContext);

//   if (context === undefined) {
//     throw new Error("useLanguage must be used within a LanguageProvider");
//   }

//   return context;
// };
