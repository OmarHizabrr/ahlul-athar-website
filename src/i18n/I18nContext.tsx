'use client';

import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import ar from "./ar.json";
import en from "./en.json";

const dictionaries = {
  ar,
  en,
} as const;

type Language = keyof typeof dictionaries;
type Dictionary = (typeof dictionaries)[Language];

interface I18nContextValue {
  language: Language;
  direction: "rtl" | "ltr";
  dictionary: Dictionary;
  t: (path: string, replacements?: Record<string, string | number>) => string;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
}

const STORAGE_KEY = "ahlul-athar-language";

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function resolvePath(
  dictionary: Dictionary,
  path: string,
): string | number | boolean | Record<string, unknown> | Array<unknown> {
  return path
    .split(".")
    .reduce<unknown>((acc, key) => (acc as Record<string, unknown>)?.[key], dictionary) as
    | string
    | number
    | boolean
    | Record<string, unknown>
    | Array<unknown>;
}

function applyReplacements(
  value: string,
  replacements?: Record<string, string | number>,
): string {
  if (!replacements) {
    return value;
  }

  return Object.entries(replacements).reduce((acc, [key, replacement]) => {
    const pattern = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    return acc.replace(pattern, String(replacement));
  }, value);
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored && stored in dictionaries) {
        return stored;
      }
    }
    return "ar";
  });

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const dir = language === "ar" ? "rtl" : "ltr";
    const langCode = language === "ar" ? "ar" : "en";

    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", langCode);
    document.body.dir = dir;

    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, language);
    }
  }, [language]);

  const dictionary = useMemo(() => dictionaries[language], [language]);

  const translate = useCallback(
    (path: string, replacements?: Record<string, string | number>) => {
      const value = resolvePath(dictionary, path);
      if (typeof value === "string") {
        return applyReplacements(value, replacements);
      }
      throw new Error(`Translation for path "${path}" is not a string.`);
    },
    [dictionary],
  );

  const setLanguage = useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === "ar" ? "en" : "ar"));
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      direction: language === "ar" ? "rtl" : "ltr",
      dictionary,
      t: translate,
      setLanguage,
      toggleLanguage,
    }),
    [dictionary, language, setLanguage, toggleLanguage, translate],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18nContext() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18nContext must be used within a LanguageProvider");
  }
  return context;
}

