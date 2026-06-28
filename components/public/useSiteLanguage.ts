"use client";

import { useEffect, useState } from "react";
import type { Locale, LocalizedText } from "@/lib/site-content";

export function useSiteLanguage() {
  const [language, setLanguageState] = useState<Locale>("en");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("lawLensLanguage");
    if (savedLanguage === "ne") {
      setLanguageState("ne");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  function setLanguage(nextLanguage: Locale) {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("lawLensLanguage", nextLanguage);
  }

  function t(value: LocalizedText) {
    if (typeof value === "string") {
      return value;
    }

    return value[language] ?? value.en;
  }

  return { language, setLanguage, t };
}
