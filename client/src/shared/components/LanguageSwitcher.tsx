import { useLanguageSwitcher } from "../../app/hooks/useLanguageSwitcher";

export const LanguageSwitcher = () => {
  const { open, toggleOpen, currentLang, changeLanguage, languages, i18n, dropdownRef } = useLanguageSwitcher();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleOpen}
        className="flex h-10 items-center gap-2 px-3 py-2 border border-border rounded-[var(--radius)] bg-background text-sm transition-all hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="hidden md:inline font-medium">{currentLang.code.toUpperCase()}</span>
        <i className={`fa-solid fa-chevron-down text-xs transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 min-w-[160px] bg-background border border-border rounded-[var(--radius)] shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-accent ${
                i18n.language === lang.code ? "bg-muted text-primary" : ""
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="flex-1 font-medium">{lang.name}</span>
              {i18n.language === lang.code && <i className="fa-solid fa-check text-xs opacity-100" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
