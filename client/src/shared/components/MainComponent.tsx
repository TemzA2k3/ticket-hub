import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { SearchForm } from "../../features/search-form/SearchForm";
import { Button } from "./Buttons";


export const MainComponent = () => {

    const { t } = useTranslation();
  
    return (
      <section className="bg-muted py-[6rem]">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {t("main.header")}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {t("main.description")}
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                <Link to="/events">
                    <Button variant="primary">
                        {t("main.browseEvents")}
                    </Button>
                </Link>
                <Link to="/about">
                    <Button variant="outline">
                        {t("main.howItWorks")}
                    </Button>   
                </Link>
              </div>
            </div>
            <SearchForm/>
          </div>
        </div>
      </section>
    );
  };
  