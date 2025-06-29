import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


import { Button } from "../../shared/components/Buttons"


export const SearchForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (name) params.append("name", name);
    if (location) params.append("location", location);
    if (date) params.append("date", date);

    navigate(`/events?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <div className="bg-background border border-border rounded p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-1">{t("searchForm.header")}</h2>
          <p className="text-muted-foreground text-sm">{t("searchForm.description")}</p>
        </div>

        <form className="grid gap-4" onSubmit={handleSearch}>
          <div className="relative">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("searchForm.searchPlaceholder")}
              className="w-full h-10 pl-10 pr-3 rounded-[var(--radius)] border border-input bg-background text-sm"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative">
              <i className="fa-solid fa-location-dot absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t("searchForm.locationPlaceholder")}
                className="w-full h-10 pl-10 pr-3 rounded-[var(--radius)] border border-input bg-background text-sm"
              />
            </div>

            <div className="relative">
              <i className="fa-solid fa-calendar absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-10 pl-10 pr-3 rounded-[var(--radius)] border border-input bg-background text-sm"
              />
            </div>
          </div>

          <Button type="submit" variant="primary">
            {t("searchForm.btnLabel")}
          </Button>
        </form>
      </div>
    </div>
  );
};
