"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import enMessages from "@/messages/en.json";
import amMessages from "@/messages/am.json";

export type Locale = "en" | "am";

type Messages = Record<string, string>;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const STORAGE_KEY = "daf-locale";
const messageMap: Record<Locale, Messages> = {
  en: enMessages,
  am: amMessages,
};

const I18nContext = createContext<I18nContextType>({
  locale: "en",
  setLocale: () => {},
  t: (key: string) => key,
});

function normalizeLocale(value: string | null | undefined): Locale | null {
  if (!value) return null;
  return value.toLowerCase().startsWith("am") ? "am" : value.toLowerCase().startsWith("en") ? "en" : null;
}

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";

  try {
    const saved = normalizeLocale(localStorage.getItem(STORAGE_KEY));
    if (saved) return saved;
  } catch {}

  return normalizeLocale(window.navigator.language) || "en";
}

function applyDocumentLocale(locale: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale;
  document.documentElement.dir = "ltr";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    applyDocumentLocale(nextLocale);

    try {
      localStorage.setItem(STORAGE_KEY, nextLocale);
    } catch {}
  }, []);

  const t = useCallback(
    (key: string) => {
      return messageMap[locale][key] || messageMap.en[key] || key;
    },
    [locale]
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
