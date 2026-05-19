import { MapPin, Phone, Clock } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

export const ContactSection = () => {
  const { t } = useI18n();

  return (
    <section className="container py-16 md:py-24">
      <div className="grid gap-10 overflow-hidden rounded-3xl border border-border bg-card shadow-card md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 md:p-12">
          <h2 className="font-display text-4xl font-bold md:text-5xl">{t("contact.title")}</h2>
          <ul className="mt-8 space-y-5 text-base">
            <li className="flex items-start gap-3">
              <span className="mt-1 grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground">
                  {t("contact.title")}
                </div>
                <div className="font-medium">{t("contact.address")}</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                <Phone className="h-4 w-4" />
              </span>
              <div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground">
                  {t("nav.cart").replace(/./g, "")}
                  Tel
                </div>
                <a href="tel:+21654344744" className="font-medium hover:text-primary">
                  +216 {t("contact.phone")}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 grid h-9 w-9 place-items-center rounded-full bg-primary/10 text-primary">
                <Clock className="h-4 w-4" />
              </span>
              <div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground">
                  Horaires
                </div>
                <div className="font-medium">{t("contact.hours")}</div>
              </div>
            </li>
          </ul>
        </div>
        <div className="min-h-[320px] bg-muted">
          <iframe
            title="Patty's location map"
            src="https://www.google.com/maps?q=Route%20de%20la%20Corniche%2C%20Bizerte&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            style={{ border: 0, minHeight: 320 }}
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
};
