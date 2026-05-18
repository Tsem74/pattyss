import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";
import { ContactSection } from "@/components/home/ContactSection";
import interior from "@/assets/gallery-interior.jpg";

const About = () => {
  const { t, lang } = useI18n();

  useEffect(() => {
    document.title =
      lang === "fr"
        ? "À propos — Patty's Bizerte"
        : lang === "ar"
        ? "من نحن — Patty's بنزرت"
        : "About — Patty's Bizerte";
  }, [lang]);

  return (
    <>
      <section className="container py-12 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {t("about.story")}
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">{t("about.title")}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t("about.body")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/menu">
                  {t("hero.menu")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/reserve">
                  <Utensils className="h-4 w-4" />
                  {t("nav.reserve")}
                </Link>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-elegant">
            <img
              src={interior}
              alt="Patty's restaurant"
              loading="lazy"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
};

export default About;
