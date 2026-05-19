import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SizeSelector } from "@/components/ui/size-selector";
import { useI18n } from "@/contexts/I18nContext";
import { useCart } from "@/contexts/CartContext";
import { categories, menuItems, type Category, type MenuItemVariant } from "@/data/menu";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const Menu = () => {
  const { t, lang } = useI18n();
  const { addItem, openCart } = useCart();
  const [active, setActive] = useState<Category>("beef");
  const [selectedVariants, setSelectedVariants] = useState<Record<string, MenuItemVariant>>({});

  useEffect(() => {
    document.title =
      lang === "fr"
        ? "Menu — Patty's Bizerte"
        : lang === "ar"
        ? "القائمة — Patty's بنزرت"
        : "Menu — Patty's Bizerte";
  }, [lang]);

  const filtered = useMemo(() => menuItems.filter((m) => m.category === active), [active]);

  const handleVariantSelect = (itemId: string, variant: MenuItemVariant) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [itemId]: variant,
    }));
  };

  const handleAdd = (id: string, name: string) => {
    const variant = selectedVariants[id];
    const cartItemId = variant ? variant.id : id;
    addItem(cartItemId);
    toast.success(`${name} ✓`, {
      action: { label: t("nav.cart"), onClick: openCart },
    });
  };

  return (
    <div className="container py-12 md:py-16">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold md:text-5xl">{t("menu.title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("menu.subtitle")}</p>
      </header>

      <div className="sticky top-16 z-20 mt-10 -mx-4 border-y border-border bg-background/85 px-4 backdrop-blur">
        <div className="flex gap-2 overflow-x-auto py-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={cn(
                "whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-smooth",
                active === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground/70 hover:border-primary/40 hover:text-foreground",
              )}
            >
              {t(`menu.cat.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          const hasVariants = item.variants && item.variants.length > 0;
          const selectedVariant = selectedVariants[item.id];
          const displayPrice = selectedVariant ? selectedVariant.price : item.price;

          return (
            <article
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-smooth hover:-translate-y-1 hover:shadow-elegant"
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
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-xl font-semibold leading-tight">
                    {item.name[lang]}
                  </h3>
                  <span className="font-display text-lg font-bold text-primary">
                    TND {displayPrice}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {item.description[lang]}
                </p>

                {hasVariants && item.variants && (
                  <SizeSelector
                    variants={item.variants}
                    onSelect={(variant) => handleVariantSelect(item.id, variant)}
                    defaultVariantId={selectedVariant?.id}
                  />
                )}

                <Button
                  onClick={() => handleAdd(item.id, item.name[lang])}
                  variant="secondary"
                  className={hasVariants ? "mt-3 w-full" : "mt-4 w-full"}
                >
                  <Plus className="h-4 w-4" />
                  {t("menu.add")}
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
