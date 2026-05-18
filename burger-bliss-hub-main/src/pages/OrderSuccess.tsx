import { useEffect } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";

const OrderSuccess = () => {
  const { t, lang } = useI18n();
  const location = useLocation();
  const state = location.state as { id?: string; orderId?: string } | null;
  const id = state?.id ?? state?.orderId;

  useEffect(() => {
    document.title =
      lang === "fr"
        ? "Commande confirmée — Patty's"
        : lang === "ar"
        ? "تم تأكيد الطلب — Patty's"
        : "Order confirmed — Patty's";
  }, [lang]);

  if (!id) return <Navigate to="/" replace />;

  return (
    <div className="container max-w-lg py-20 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-primary/10 text-primary">
        <Check className="h-10 w-10" strokeWidth={3} />
      </div>
      <h1 className="mt-6 font-display text-4xl font-bold">{t("checkout.success.title")}</h1>
      <p className="mt-3 text-muted-foreground">{t("checkout.success.desc")}</p>

      <div className="mt-8 rounded-xl border border-border bg-card p-5 text-sm">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">
          {t("checkout.success.order")}
        </div>
        <div className="mt-1 font-display text-2xl font-bold text-primary">{id}</div>
      </div>

      <a
        href="tel:+21654344744"
        className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <Phone className="h-4 w-4" />
        +216 {t("contact.phone")}
      </a>

      <div className="mt-8">
        <Button asChild size="lg">
          <Link to="/">{t("checkout.success.home")}</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderSuccess;
