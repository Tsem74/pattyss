import { Hero } from "@/components/home/Hero";
import { ServiceModes } from "@/components/home/ServiceModes";
import { FeaturedMenu } from "@/components/home/FeaturedMenu";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Reviews } from "@/components/home/Reviews";
import { ContactSection } from "@/components/home/ContactSection";
import { useEffect } from "react";
import { useI18n } from "@/contexts/I18nContext";

const Index = () => {
  const { t, lang } = useI18n();

  useEffect(() => {
    document.title =
      lang === "fr"
        ? "Patty's — Hamburger artisanal à Bizerte | Commander en ligne"
        : lang === "ar"
        ? "Patty's — برجر حرفي في بنزرت | اطلب أونلاين"
        : "Patty's — Handcrafted burgers in Bizerte | Order online";

    const desc = t("hero.subtitle");
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);
  }, [t, lang]);

  return (
    <>
      <Hero />
      <ServiceModes />
      <FeaturedMenu />
      <GalleryPreview />
      <Reviews />
      <ContactSection />
    </>
  );
};

export default Index;
