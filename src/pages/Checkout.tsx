import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { ShoppingBag, Truck, Utensils, ArrowLeft, ArrowRight, Wallet, CreditCard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/contexts/I18nContext";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type OrderType = "takeaway" | "delivery" | "dinein";
type PaymentMethod = "cash" | "online";

const baseDetailsSchema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
});

const Checkout = () => {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const { detailedLines, subtotal, clear } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [orderType, setOrderType] = useState<OrderType>("takeaway");
  const [payment, setPayment] = useState<PaymentMethod>("cash");
  const [submitting, setSubmitting] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    instructions: "",
    time: "",
    date: "",
    party: "2",
  });

  useEffect(() => {
    document.title =
      lang === "fr"
        ? "Commande — Patty's Bizerte"
        : lang === "ar"
        ? "إتمام الطلب — Patty's بنزرت"
        : "Checkout — Patty's Bizerte";
  }, [lang]);

  const update = (k: keyof typeof details, v: string) => setDetails((d) => ({ ...d, [k]: v }));

  const isFoodOrder = orderType !== "dinein";
  const cartEmpty = detailedLines.length === 0;

  if (cartEmpty && isFoodOrder) {
    return (
      <div className="container max-w-md py-20 text-center">
        <h1 className="font-display text-3xl font-bold">{t("cart.empty")}</h1>
        <Button asChild className="mt-6">
          <Link to="/menu">{t("cart.empty.cta")}</Link>
        </Button>
        <div className="mt-4 text-sm text-muted-foreground">
          {t("services.dinein.desc")}{" "}
          <Link to="/reserve" className="text-primary underline">
            {t("nav.reserve")}
          </Link>
        </div>
      </div>
    );
  }

  const goNext = () => {
    if (step === 1) {
      if (orderType === "dinein") {
        navigate("/reserve");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const parsed = baseDetailsSchema.safeParse(details);
      if (!parsed.success) {
        toast.error(parsed.error.issues[0]?.message ?? "Please fill required fields");
        return;
      }
      if (orderType === "delivery" && details.address.trim().length < 5) {
        toast.error(t("checkout.address"));
        return;
      }
      setStep(3);
    }
  };

  const goBack = () => {
    if (step === 1) navigate(-1);
    else setStep((s) => (s - 1) as 1 | 2 | 3);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    const id = `P-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const orderSummary = {
      id,
      orderType,
      payment,
      details,
      lines: detailedLines.map((l) => ({
        name: l.item.name[lang],
        qty: l.qty,
        price: l.item.price,
        lineTotal: l.lineTotal,
      })),
      subtotal,
    };
    clear();
    navigate("/order-success", { state: orderSummary });
  };

  const types = [
    { key: "takeaway" as const, icon: ShoppingBag },
    { key: "delivery" as const, icon: Truck },
    { key: "dinein" as const, icon: Utensils },
  ];

  return (
    <div className="container max-w-3xl py-12 md:py-16">
      <header className="text-center">
        <h1 className="font-display text-4xl font-bold md:text-5xl">{t("checkout.title")}</h1>
      </header>

      {/* Stepper */}
      <ol className="mx-auto mt-8 flex max-w-xl items-center justify-between gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {[
          { n: 1, key: "type" },
          { n: 2, key: "details" },
          { n: 3, key: "payment" },
        ].map((s, i) => (
          <li key={s.n} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border text-xs",
                step >= (s.n as 1 | 2 | 3)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background",
              )}
            >
              {step > (s.n as 1 | 2 | 3) ? <Check className="h-3.5 w-3.5" /> : s.n}
            </span>
            <span className={cn("hidden sm:inline", step === s.n && "text-foreground")}>
              {t(`checkout.step.${s.key}`)}
            </span>
            {i < 2 && <span className="mx-1 h-px flex-1 bg-border" />}
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
          {/* Step 1: Type */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl font-semibold">{t("checkout.type.title")}</h2>
              <div className="grid gap-3">
                {types.map(({ key, icon: Icon }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setOrderType(key)}
                    className={cn(
                      "flex items-center gap-4 rounded-xl border p-4 text-start transition-smooth",
                      orderType === key
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/40",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-11 w-11 flex-shrink-0 place-items-center rounded-full",
                        orderType === key ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block font-semibold">{t(`services.${key}`)}</span>
                      <span className="text-sm text-muted-foreground">{t(`services.${key}.desc`)}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl font-semibold">{t("checkout.details.title")}</h2>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("checkout.name")}</Label>
                  <Input id="name" value={details.name} onChange={(e) => update("name", e.target.value)} maxLength={80} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("checkout.phone")}</Label>
                  <Input id="phone" type="tel" value={details.phone} onChange={(e) => update("phone", e.target.value)} maxLength={30} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("checkout.email")}</Label>
                <Input id="email" type="email" value={details.email} onChange={(e) => update("email", e.target.value)} maxLength={255} />
              </div>

              {orderType === "delivery" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="address">{t("checkout.address")}</Label>
                    <Textarea
                      id="address"
                      value={details.address}
                      onChange={(e) => update("address", e.target.value)}
                      maxLength={300}
                      rows={2}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructions">{t("checkout.instructions")}</Label>
                    <Textarea
                      id="instructions"
                      value={details.instructions}
                      onChange={(e) => update("instructions", e.target.value)}
                      maxLength={300}
                      rows={2}
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="time">{t("checkout.time")}</Label>
                <Input id="time" type="time" value={details.time} onChange={(e) => update("time", e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="font-display text-2xl font-semibold">{t("checkout.payment.title")}</h2>

              <button
                type="button"
                onClick={() => setPayment("cash")}
                className={cn(
                  "flex w-full items-center gap-4 rounded-xl border p-4 text-start transition-smooth",
                  payment === "cash" ? "border-primary bg-primary/5" : "border-border hover:border-primary/40",
                )}
              >
                <span className={cn("grid h-11 w-11 flex-shrink-0 place-items-center rounded-full", payment === "cash" ? "bg-primary text-primary-foreground" : "bg-muted")}>
                  <Wallet className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold">{t("checkout.pay.cash")}</span>
                  <span className="text-sm text-muted-foreground">{t("checkout.pay.cash.desc")}</span>
                </span>
              </button>

              <button
                type="button"
                disabled
                aria-disabled="true"
                onClick={() => toast.info(t("checkout.pay.online.desc"))}
                className="flex w-full cursor-not-allowed items-center gap-4 rounded-xl border border-dashed border-border p-4 text-start opacity-60"
              >
                <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-muted">
                  <CreditCard className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-semibold">{t("checkout.pay.online")}</span>
                  <span className="text-sm text-muted-foreground">{t("checkout.pay.online.desc")}</span>
                </span>
              </button>
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <Button variant="ghost" onClick={goBack}>
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" />
              {t("checkout.back")}
            </Button>
            {step < 3 ? (
              <Button onClick={goNext}>
                {t("checkout.next")}
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={submitting} size="lg">
                {submitting ? t("checkout.submitting") : t("checkout.submit")}
              </Button>
            )}
          </div>
        </div>

        {/* Order summary */}
        {isFoodOrder && (
          <aside className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold">{t("cart.title")}</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {detailedLines.map(({ item, qty, lineTotal }) => (
                <li key={item.id} className="flex items-start justify-between gap-3">
                  <span className="flex-1">
                    <span className="font-medium text-foreground">{qty}× </span>
                    {item.name[lang]}
                  </span>
                  <span className="text-muted-foreground">TND {lineTotal.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
              <span className="font-medium">{t("checkout.total")}</span>
              <span className="font-display text-xl font-bold text-primary">TND {subtotal.toFixed(2)}</span>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default Checkout;
