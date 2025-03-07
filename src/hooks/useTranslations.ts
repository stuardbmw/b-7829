import { useState, useCallback, useEffect } from "react";
import { translations } from "@/utils/translations";

export type Language = "EN" | "UA" | "NO";
export type TranslationKey = keyof typeof translations.en;

export const useTranslations = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    return (savedLanguage as Language) || "EN";
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleLanguageChange = useCallback((newLanguage: Language) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem("preferredLanguage", newLanguage);
  }, []);

  const t = useCallback((key: TranslationKey) => {
    const langKey = currentLanguage.toLowerCase() as keyof typeof translations;
    return translations[langKey][key];
  }, [currentLanguage]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage") as Language;
    if (savedLanguage && savedLanguage !== currentLanguage) {
      setCurrentLanguage(savedLanguage);
    }
    setIsLoading(false);
  }, []);

  return {
    t,
    currentLanguage,
    setCurrentLanguage: handleLanguageChange,
    isLoading
  };
};