import { Link } from "react-router-dom";
import { Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";
import { useCart } from "@/contexts/CartContext";
import { menuItems } from "@/data/menu";
import { toast } from "sonner";

export const FeaturedMenu = () => {
  const { t, lang } = useI18n();
  const { addItem, openCart } = useCart();
  const featured = menuItems.filter((m) => m.featured);

  const handleAdd = (id: string, name: string) => {
    addItem(id);
    toast.success(`${name} ✓`, {
      action: { label: t("nav.cart"), onClick: openCart },
    });
  };

  return (
    <section className="bg-secondary/30 py-16 md:py-24">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-bold md:text-5xl">{t("featured.title")}</h2>
            <p className="mt-4 text-muted-foreground">{t("featured.subtitle")}</p>
          </div>
          <Button asChild variant="ghost" className="text-primary hover:text-primary">
            <Link to="/menu" className="inline-flex items-center gap-2">
              {t("featured.viewAll")}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <article
              key={item.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.name[lang]}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold leading-tight">{item.name[lang]}</h3>
                  <span className="font-display text-lg font-bold text-primary">TND {item.price}</span>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.description[lang]}</p>
                <Button
                  onClick={() => handleAdd(item.id, item.name[lang])}
                  variant="secondary"
                  className="mt-4 w-full"
                >
                  <Plus className="h-4 w-4" />
                  {t("menu.add")}
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
