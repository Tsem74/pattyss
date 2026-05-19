import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/contexts/I18nContext";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient"; // Imported your Supabase connection

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  party: z.coerce.number().int().min(1).max(20),
  date: z.string().min(1),
  time: z.string().min(1),
  notes: z.string().max(500).optional(),
});

const Reserve = () => {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    party: "2",
    date: "",
    time: "",
    notes: "",
  });

  useEffect(() => {
    document.title =
      lang === "fr"
        ? "Réservation — Patty's Bizerte"
        : lang === "ar"
        ? "حجز طاولة — Patty's بنزرت"
        : "Reserve — Patty's Bizerte";
  }, [lang]);

  const update = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Validate inputs using your Zod schema
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid form");
      return;
    }
    
    setSubmitting(true);

    try {
      // 2. Insert data directly into the Supabase 'reservations' table
      const { error } = await supabase
        .from("reservations")
        .insert([
          {
            name: parsed.data.name,
            phone: parsed.data.phone,
            email: parsed.data.email || null, // Stores NULL if left blank
            //party: parsed.data.party,
            guests: parsed.data.party,
            date: parsed.data.date,
            time: parsed.data.time,
            notes: parsed.data.notes || null,
          },
        ]);

      if (error) throw error;

      // 3. Keep your existing success routine, passing down data to confirmation screen
      const id = `R-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
      toast.success(lang === "fr" ? "Réservation enregistrée !" : "تم تسجيل الحجز بنجاح!");
      
      navigate("/order-success", {
        state: { orderId: id, type: "reservation", form: parsed.data },
      });
      
    } catch (error: any) {
      console.error("Supabase Error:", error);
      toast.error(error.message || "An error occurred while saving your booking.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container max-w-2xl py-12 md:py-16">
      <header className="text-center">
        <h1 className="font-display text-4xl font-bold md:text-5xl">{t("reserve.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("reserve.subtitle")}</p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-card md:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="r-name">{t("checkout.name")}</Label>
            <Input id="r-name" value={form.name} onChange={(e) => update("name", e.target.value)} required maxLength={80} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="r-phone">{t("checkout.phone")}</Label>
            <Input id="r-phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required maxLength={30} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="r-email">{t("checkout.email")}</Label>
          <Input id="r-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="r-party">{t("checkout.party")}</Label>
            <Input id="r-party" type="number" min={1} max={20} value={form.party} onChange={(e) => update("party", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="r-date">{t("checkout.date")}</Label>
            <Input id="r-date" type="date" value={form.date} onChange={(e) => update("date", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="r-time">{t("checkout.time")}</Label>
            <Input id="r-time" type="time" value={form.time} onChange={(e) => update("time", e.target.value)} required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="r-notes">{t("checkout.instructions")}</Label>
          <Textarea id="r-notes" value={form.notes} onChange={(e) => update("notes", e.target.value)} maxLength={500} rows={3} />
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? t("checkout.submitting") : t("checkout.submit")}
        </Button>
      </form>
    </div>
  );
};

export default Reserve;