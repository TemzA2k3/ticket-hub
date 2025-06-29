import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";

export const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "lt", name: "Lietuvių", flag: "🇱🇹" },
];

export const useLanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const toggleOpen = () => setOpen((prev) => !prev);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    open,
    toggleOpen,
    currentLang,
    changeLanguage,
    languages,
    i18n,
    dropdownRef,
  };
};
