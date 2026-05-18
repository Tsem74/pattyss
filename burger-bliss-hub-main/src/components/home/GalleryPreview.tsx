import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";
import smash from "@/assets/photo-smash.jpg";
import wing from "@/assets/photo-wing.jpg";
import burgerFries from "@/assets/photo-burger-fries.jpg";

export const GalleryPreview = () => {
  const { t } = useI18n();

  return (
    <section className="container py-16 md:py-24">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-xl">
          <h2 className="font-display text-4xl font-bold md:text-5xl">{t("gallery.title")}</h2>
          <p className="mt-4 text-muted-foreground">{t("gallery.subtitle")}</p>
        </div>
        <Button asChild variant="ghost" className="text-primary hover:text-primary">
          <Link to="/gallery" className="inline-flex items-center gap-2">
            {t("gallery.viewAll")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3 md:grid-rows-2">
        <div className="overflow-hidden rounded-2xl md:row-span-2">
          <img src={smash} alt="Patty's Classic Smash Burger" loading="lazy" width={1200} height={1600} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
        </div>
        <div className="overflow-hidden rounded-2xl">
          <img src={wing} alt="Patty's saucy chicken wing" loading="lazy" width={1200} height={900} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
        </div>
        <div className="overflow-hidden rounded-2xl">
          <img src={burgerFries} alt="Smash burger with crinkle fries" loading="lazy" width={1200} height={900} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
        </div>
      </div>
    </section>
  );
};
