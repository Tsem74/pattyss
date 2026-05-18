import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block" aria-label="Patty's Smash Burger">
              <img src={logo} alt="Patty's Smash Burger" className="h-12 w-auto" width={180} height={72} />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="rounded-full border border-border p-2 text-muted-foreground transition-smooth hover:border-primary hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="rounded-full border border-border p-2 text-muted-foreground transition-smooth hover:border-primary hover:text-primary"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("contact.title")}
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>{t("contact.address")}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <a href="tel:+21654344744" className="hover:text-foreground">
                  {t("contact.phone")}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span>{t("contact.hours")}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("nav.menu")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/menu" className="hover:text-foreground">{t("nav.menu")}</Link></li>
              <li><Link to="/gallery" className="hover:text-foreground">{t("nav.gallery")}</Link></li>
              <li><Link to="/about" className="hover:text-foreground">{t("nav.about")}</Link></li>
              <li><Link to="/reserve" className="hover:text-foreground">{t("nav.reserve")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {year} Patty's. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};
