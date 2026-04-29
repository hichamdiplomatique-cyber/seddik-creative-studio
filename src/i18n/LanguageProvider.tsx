import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { LANG_META, translations, type Lang } from "./translations";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
};

const LanguageContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "atelier.lang";

function detectInitial(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (saved && saved in LANG_META) return saved;
  const nav = window.navigator.language?.slice(0, 2).toLowerCase();
  if (nav === "fr" || nav === "ar" || nav === "es") return nav as Lang;
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(detectInitial());
  }, []);

  useEffect(() => {
    const dir = LANG_META[lang].dir;
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = dir;
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, l);
  };

  const value = useMemo<Ctx>(() => {
    const dict = translations[lang];
    return {
      lang,
      setLang,
      dir: LANG_META[lang].dir,
      t: (k: string) => dict[k] ?? translations.en[k] ?? k,
    };
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}