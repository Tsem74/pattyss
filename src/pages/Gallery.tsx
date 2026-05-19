import { useEffect } from "react";
import smash from "@/assets/photo-smash.jpg";
import wing from "@/assets/photo-wing.jpg";
import burgerFries from "@/assets/photo-burger-fries.jpg";
import boardBeef from "@/assets/menu-board-beef.png";
import boardChicken from "@/assets/menu-board-chicken.png";
import boardSides from "@/assets/menu-board-sides.png";
import boardDrinks from "@/assets/menu-board-drinks.png";
import mascot from "@/assets/mascot.jpg";
import { useI18n } from "@/contexts/I18nContext";

const Gallery = () => {
  const { t, lang } = useI18n();

  useEffect(() => {
    document.title =
      lang === "fr"
        ? "Galerie — Patty's Smash Burger Bizerte"
        : lang === "ar"
        ? "المعرض — Patty's بنزرت"
        : "Gallery — Patty's Smash Burger Bizerte";
  }, [lang]);

  const images = [
    { src: smash, alt: "Patty's Classic Smash Burger" },
    { src: wing, alt: "Saucy chicken wing" },
    { src: burgerFries, alt: "Smash burger with crinkle fries" },
    { src: boardBeef, alt: "Beef Smashburger menu board" },
    { src: boardChicken, alt: "Chicken Burger menu board" },
    { src: boardSides, alt: "Patty's Sides menu board" },
    { src: boardDrinks, alt: "Patty's Drinks menu board" },
    { src: mascot, alt: "Patty's mascot" },
  ];

  return (
    <div className="container py-12 md:py-16">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold md:text-5xl">{t("gallery.title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("gallery.subtitle")}</p>
      </header>

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {images.map((img, i) => (
          <div
            key={i}
            className="break-inside-avoid overflow-hidden rounded-2xl border border-border bg-muted"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
