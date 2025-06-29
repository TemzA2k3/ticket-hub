import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const Footer = () => {
    const { t } = useTranslation();

    return (
      <footer className="bg-muted border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-row gap-6 mb-6 justify-between">
            <div className="flex flex-col gap-2">
              <a href="#home" className="flex items-center gap-2 text-xl font-semibold">
                <i className="fa-solid fa-ticket"></i>
                <span>TicketHub</span>
              </a>
              <p className="text-sm text-muted-foreground">
                {t("footer.description")}
              </p>
            </div>
  
            <div className="flex flex-row gap-2 md:flex-row md:gap-4">
              <Link to="/terms" className="text-sm hover:underline">{t("footer.termsOfService")}</Link>
              <Link to="/privacy" className="text-sm hover:underline">{t("footer.privacyPolicy")}</Link>
              <Link to="/faq" className="text-sm hover:underline">{t("footer.faq")}</Link>
              <Link to="/contact" className="text-sm hover:underline">{t("footer.contact")}</Link>
            </div>
          </div>
  
          <div className="text-center pt-4 border-t border-border text-sm text-muted-foreground">
            <p>&copy; 2025 TicketHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  