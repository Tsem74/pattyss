import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useI18n, type Language } from "@/contexts/I18nContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const langLabels: Record<Language, string> = { fr: "FR", ar: "ع", en: "EN" };

export const Header = () => {
  const { t, lang, setLang } = useI18n();
  const { totalQty, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { to: "/", label: t("nav.home"), end: true },
    { to: "/menu", label: t("nav.menu") },
    { to: "/gallery", label: t("nav.gallery") },
    { to: "/about", label: t("nav.about") },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/85 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2" aria-label="Patty's Smash Burger">
          <img src={logo} alt="Patty's Smash Burger" className="h-10 w-auto md:h-11" width={160} height={64} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-smooth",
                  isActive
                    ? "text-primary"
                    : "text-foreground/70 hover:text-foreground",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-border bg-background p-1 sm:flex">
            {(["fr", "ar", "en"] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold transition-smooth",
                  lang === l
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                aria-label={`Switch to ${l.toUpperCase()}`}
              >
                {langLabels[l]}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={openCart}
            aria-label={t("nav.cart")}
          >
            <ShoppingBag className="h-5 w-5" />
            {totalQty > 0 && (
              <span className="absolute -end-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                {totalQty}
              </span>
            )}
          </Button>

          <Button asChild className="hidden md:inline-flex">
            <Link to="/menu">{t("nav.order")}</Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/50 bg-background md:hidden">
          <nav className="container flex flex-col py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-3 text-base font-medium transition-smooth",
                    isActive ? "text-primary" : "text-foreground/80",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-2 flex items-center gap-1 rounded-full border border-border bg-background p-1 sm:hidden">
              {(["fr", "ar", "en"] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    "flex-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-smooth",
                    lang === l
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {langLabels[l]}
                </button>
              ))}
            </div>
            <Button asChild className="mt-3" onClick={() => setMobileOpen(false)}>
              <Link to="/menu">{t("nav.order")}</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
