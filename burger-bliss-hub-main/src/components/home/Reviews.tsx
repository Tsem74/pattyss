import { Star } from "lucide-react";
import { useI18n } from "@/contexts/I18nContext";

interface Review {
  name: string;
  text: { fr: string; en: string; ar: string };
  rating: number;
}

const reviews: Review[] = [
  {
    name: "Amine B.",
    rating: 5,
    text: {
      fr: "Le meilleur burger de Bizerte, sans hésiter. Pain ultra moelleux et viande savoureuse.",
      en: "The best burger in Bizerte, hands down. Ultra-soft bun and flavorful meat.",
      ar: "أفضل برجر في بنزرت بلا منازع. خبز طري ولحم لذيذ.",
    },
  },
  {
    name: "Sarah M.",
    rating: 5,
    text: {
      fr: "Service rapide, accueil chaleureux et frites maison incroyables.",
      en: "Fast service, warm welcome, and incredible house fries.",
      ar: "خدمة سريعة، استقبال دافئ وبطاطا مقلية مذهلة.",
    },
  },
  {
    name: "Karim Z.",
    rating: 4,
    text: {
      fr: "Très bon rapport qualité-prix. Le Double Spicy est addictif !",
      en: "Great value for money. The Double Spicy is addictive!",
      ar: "جودة ممتازة بسعر جيد. الدبل سبايسي يسبب الإدمان!",
    },
  },
];

export const Reviews = () => {
  const { t, lang } = useI18n();

  return (
    <section className="bg-foreground py-16 text-background md:py-24">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-primary text-primary" />
            ))}
          </div>
          <h2 className="font-display text-4xl font-bold md:text-5xl">{t("reviews.title")}</h2>
          <p className="mt-4 text-background/70">{t("reviews.subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="rounded-2xl border border-background/10 bg-background/5 p-6 backdrop-blur"
            >
              <div className="mb-4 flex">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-background/85">"{r.text[lang]}"</blockquote>
              <figcaption className="mt-6 text-sm font-medium text-background">— {r.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
