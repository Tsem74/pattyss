import { Link } from "react-router-dom";
import { Star, MapPin, Clock, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";
import heroBurger from "@/assets/photo-smash.jpg";

export const Hero = () => {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <div className="container relative grid items-center gap-10 py-16 md:grid-cols-2 md:py-24 lg:py-32">
        <div className="relative z-10 animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-background/80 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {t("hero.tagline")}
          </span>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-balance md:text-6xl lg:text-7xl">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-md text-lg text-background/70">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="text-base shadow-elegant">
              <Link to="/menu">{t("hero.cta")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-background/30 bg-transparent text-base text-background hover:bg-background/10 hover:text-background"
            >
              <Link to="/menu">{t("hero.menu")}</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-background/70">
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="font-medium text-background">4.8</span>
              <span>({t("info.reviews")})</span>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-primary" />
              <span>{t("info.price")}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-primary/20 blur-3xl" />
          <img
            src={heroBurger}
            alt="Patty's signature burger"
            width={1600}
            height={1200}
            className="relative animate-slide-up rounded-3xl object-cover shadow-elegant"
          />
        </div>
      </div>

      {/* Info strip */}
      <div className="border-t border-background/10 bg-background/5 backdrop-blur">
        <div className="container grid gap-4 py-4 text-sm sm:grid-cols-3">
          <div className="flex items-center gap-2 text-background/80">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{t("info.location")}</span>
          </div>
          <div className="flex items-center gap-2 text-background/80">
            <Clock className="h-4 w-4 text-primary" />
            <span>{t("info.hours")}</span>
          </div>
          <div className="flex items-center gap-2 text-background/80">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span>4.8 · {t("info.reviews")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
