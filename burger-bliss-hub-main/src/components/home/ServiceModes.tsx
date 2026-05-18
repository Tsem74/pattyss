import { Link } from "react-router-dom";
import { ShoppingBag, Truck, Utensils, ArrowRight } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

export const ServiceModes = () => {
  const { t } = useI18n();

  const modes = [
    {
      icon: ShoppingBag,
      key: "takeaway",
      to: "/menu",
    },
    {
      icon: Truck,
      key: "delivery",
      to: "/menu",
    },
    {
      icon: Utensils,
      key: "dinein",
      to: "/reserve",
    },
  ] as const;

  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-4xl font-bold md:text-5xl">{t("services.title")}</h2>
        <p className="mt-4 text-muted-foreground">{t("services.subtitle")}</p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {modes.map(({ icon: Icon, key, to }) => (
          <Link
            key={key}
            to={to}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card transition-smooth hover:-translate-y-1 hover:border-primary/40 hover:shadow-elegant"
          >
            <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4 text-primary transition-smooth group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-7 w-7" />
            </div>
            <h3 className="font-display text-2xl font-semibold">{t(`services.${key}`)}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{t(`services.${key}.desc`)}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              {t("services.cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
