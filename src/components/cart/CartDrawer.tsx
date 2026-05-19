import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useI18n } from "@/contexts/I18nContext";

export const CartDrawer = () => {
  const { isOpen, closeCart, detailedLines, subtotal, setQty, removeItem } = useCart();
  const { t, lang } = useI18n();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate("/checkout");
  };

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && closeCart()}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b border-border p-6">
          <SheetTitle className="font-display text-2xl">{t("cart.title")}</SheetTitle>
        </SheetHeader>

        {detailedLines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
            <div className="rounded-full bg-muted p-6">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">{t("cart.empty")}</p>
            <Button asChild onClick={closeCart}>
              <Link to="/menu">{t("cart.empty.cta")}</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <ul className="space-y-4">
                {detailedLines.map(({ item, itemId, qty, unitPrice, lineTotal }) => (
                  <li key={itemId} className="flex gap-3 border-b border-border pb-4 last:border-0">
                    <img
                      src={item.image}
                      alt={item.name[lang]}
                      loading="lazy"
                      className="h-20 w-20 flex-shrink-0 rounded-md object-cover"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-medium leading-tight">{item.name[lang]}</h4>
                        <button
                          onClick={() => removeItem(itemId)}
                          className="text-muted-foreground hover:text-destructive"
                          aria-label={t("cart.remove")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">TND {unitPrice.toFixed(2)}</p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center rounded-full border border-border">
                          <button
                            onClick={() => setQty(itemId, qty - 1)}
                            className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground"
                            aria-label="-"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">{qty}</span>
                          <button
                            onClick={() => setQty(itemId, qty + 1)}
                            className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground"
                            aria-label="+"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="font-semibold">TND {lineTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="border-t border-border p-6">
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between text-base">
                  <span className="text-muted-foreground">{t("cart.subtotal")}</span>
                  <span className="font-display text-xl font-semibold">TND {subtotal.toFixed(2)}</span>
                </div>
                <Button onClick={handleCheckout} size="lg" className="w-full">
                  {t("cart.checkout")}
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
