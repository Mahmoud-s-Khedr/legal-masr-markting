import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const translationFiles = import.meta.glob("./{ar,en}/*.json", {
  eager: true,
  import: "default",
});

const resources = {
  ar: {},
  en: {},
};

for (const [path, translations] of Object.entries(translationFiles)) {
  const match = path.match(/^\.\/(ar|en)\/(.+)\.json$/);

  if (!match) continue;

  const [, language, namespace] = match;

  resources[language][namespace] = translations;
}

i18n.use(initReactI18next).init({
  resources,

  lng: "ar",

  fallbackLng: "ar",

  defaultNS: "translation",

  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (language) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem("language", language);
  }

  if (typeof document !== "undefined") {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }
});

export default i18n;
