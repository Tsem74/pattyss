import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type Language = "fr" | "ar" | "en";

type Dict = Record<string, string>;

const fr: Dict = {
  // nav
  "nav.home": "Accueil",
  "nav.menu": "Menu",
  "nav.gallery": "Galerie",
  "nav.about": "À propos",
  "nav.order": "Commander",
  "nav.reserve": "Réserver",
  "nav.cart": "Panier",
  // hero
  "hero.tagline": "Smash Burger · Bizerte",
  "hero.title": "Le smash burger fait avec amour.",
  "hero.subtitle": "Steaks smashés, poulet croustillant, sauces signature Patty's. Préparé minute à Bizerte.",
  "hero.cta": "Commander maintenant",
  "hero.menu": "Voir le menu",
  // info strip
  "info.rating": "Note Google",
  "info.price": "TND 10–20 / personne",
  "info.location": "Route de la Corniche, Bizerte",
  "info.hours": "Ouvert · ferme à 00h00",
  "info.reviews": "68 avis",
  // services
  "services.title": "Comment voulez-vous savourer ?",
  "services.subtitle": "Trois façons de profiter de Patty's, où que vous soyez.",
  "services.takeaway": "À emporter",
  "services.takeaway.desc": "Commandez et passez récupérer. Prêt en 15–20 min.",
  "services.delivery": "Livraison",
  "services.delivery.desc": "Livré chaud à votre porte dans Bizerte.",
  "services.dinein": "Sur place",
  "services.dinein.desc": "Réservez une table et profitez de l'ambiance.",
  "services.cta": "Choisir",
  // featured
  "featured.title": "Les incontournables",
  "featured.subtitle": "Nos burgers les plus aimés.",
  "featured.viewAll": "Voir tout le menu",
  // gallery
  "gallery.title": "Dans la cuisine",
  "gallery.subtitle": "Le feu, les saveurs, les moments.",
  "gallery.viewAll": "Voir la galerie",
  // reviews
  "reviews.title": "Ce que disent nos clients",
  "reviews.subtitle": "Note de 4,8 sur Google avec 68 avis.",
  // contact / footer
  "contact.title": "Nous trouver",
  "contact.address": "Route de la Corniche, Bizerte",
  "contact.phone": "54 344 744",
  "contact.hours": "Tous les jours · jusqu'à 00h00",
  "footer.rights": "Tous droits réservés.",
  "footer.tagline": "Hamburger fait avec passion à Bizerte.",
  // menu
  "menu.title": "Notre menu",
  "menu.subtitle": "Sélectionnez vos favoris et ajoutez-les au panier.",
  "menu.add": "Ajouter",
  "menu.cat.beef": "Beef Smashburgers",
  "menu.cat.chicken": "Chicken Burgers",
  "menu.cat.sides": "Sides & Wings",
  "menu.cat.drinks": "Boissons & Shakes",
  // cart
  "cart.title": "Votre panier",
  "cart.empty": "Votre panier est vide.",
  "cart.empty.cta": "Parcourir le menu",
  "cart.subtotal": "Sous-total",
  "cart.checkout": "Passer à la caisse",
  "cart.remove": "Retirer",
  "cart.notes": "Notes spéciales",
  "cart.notes.placeholder": "Allergies, préférences...",
  // checkout
  "checkout.title": "Finaliser la commande",
  "checkout.step.type": "Type",
  "checkout.step.details": "Détails",
  "checkout.step.payment": "Paiement",
  "checkout.step.confirm": "Confirmation",
  "checkout.type.title": "Comment souhaitez-vous votre commande ?",
  "checkout.details.title": "Vos coordonnées",
  "checkout.payment.title": "Mode de paiement",
  "checkout.name": "Nom complet",
  "checkout.phone": "Téléphone",
  "checkout.email": "Email (optionnel)",
  "checkout.address": "Adresse de livraison",
  "checkout.instructions": "Instructions (optionnel)",
  "checkout.time": "Heure souhaitée",
  "checkout.date": "Date",
  "checkout.party": "Nombre de personnes",
  "checkout.pay.cash": "Payer à la livraison / au retrait",
  "checkout.pay.cash.desc": "Espèces ou carte sur place.",
  "checkout.pay.online": "Payer en ligne par carte",
  "checkout.pay.online.desc": "Paiement sécurisé (bientôt disponible).",
  "checkout.next": "Suivant",
  "checkout.back": "Retour",
  "checkout.submit": "Confirmer la commande",
  "checkout.submitting": "Envoi en cours...",
  "checkout.success.title": "Commande confirmée !",
  "checkout.success.desc": "Merci ! Nous vous appellerons pour confirmer les détails.",
  "checkout.success.order": "Numéro de commande",
  "checkout.success.home": "Retour à l'accueil",
  "checkout.total": "Total",
  // reservation
  "reserve.title": "Réservez votre table",
  "reserve.subtitle": "Profitez de Patty's sur place dans une ambiance chaleureuse.",
  // about
  "about.title": "À propos de Patty's",
  "about.story": "Notre histoire",
  "about.body": "Né à Bizerte de la passion pour le bon burger, Patty's réunit des ingrédients frais, des recettes maison et un service chaleureux. Chaque burger est préparé minute, avec amour.",
  // misc
  "common.required": "Obligatoire",
  "common.optional": "Optionnel",
  "common.viewMore": "En savoir plus",
};

const en: Dict = {
  "nav.home": "Home",
  "nav.menu": "Menu",
  "nav.gallery": "Gallery",
  "nav.about": "About",
  "nav.order": "Order",
  "nav.reserve": "Reserve",
  "nav.cart": "Cart",
  "hero.tagline": "Smash Burger · Bizerte",
  "hero.title": "The smash burger made with love.",
  "hero.subtitle": "Smashed beef, crispy chicken, signature Patty's sauces. Made to order in Bizerte.",
  "hero.cta": "Order now",
  "hero.menu": "View menu",
  "info.rating": "Google rating",
  "info.price": "TND 10–20 / person",
  "info.location": "Route de la Corniche, Bizerte",
  "info.hours": "Open · closes 12 AM",
  "info.reviews": "68 reviews",
  "services.title": "How would you like it?",
  "services.subtitle": "Three ways to enjoy Patty's, wherever you are.",
  "services.takeaway": "Takeaway",
  "services.takeaway.desc": "Order ahead and pick up. Ready in 15–20 min.",
  "services.delivery": "Delivery",
  "services.delivery.desc": "Delivered hot to your door in Bizerte.",
  "services.dinein": "Dine-in",
  "services.dinein.desc": "Reserve a table and enjoy the ambiance.",
  "services.cta": "Choose",
  "featured.title": "Crowd favorites",
  "featured.subtitle": "Our most-loved burgers.",
  "featured.viewAll": "See full menu",
  "gallery.title": "Inside the kitchen",
  "gallery.subtitle": "The fire, the flavors, the moments.",
  "gallery.viewAll": "View gallery",
  "reviews.title": "What our guests say",
  "reviews.subtitle": "4.8 rating on Google with 68 reviews.",
  "contact.title": "Find us",
  "contact.address": "Route de la Corniche, Bizerte",
  "contact.phone": "54 344 744",
  "contact.hours": "Every day · until 12 AM",
  "footer.rights": "All rights reserved.",
  "footer.tagline": "Burgers made with passion in Bizerte.",
  "menu.title": "Our menu",
  "menu.subtitle": "Pick your favorites and add to cart.",
  "menu.add": "Add",
  "menu.cat.beef": "Beef Smashburgers",
  "menu.cat.chicken": "Chicken Burgers",
  "menu.cat.sides": "Sides & Wings",
  "menu.cat.drinks": "Drinks & Shakes",
  "cart.title": "Your cart",
  "cart.empty": "Your cart is empty.",
  "cart.empty.cta": "Browse menu",
  "cart.subtotal": "Subtotal",
  "cart.checkout": "Checkout",
  "cart.remove": "Remove",
  "cart.notes": "Special notes",
  "cart.notes.placeholder": "Allergies, preferences...",
  "checkout.title": "Complete your order",
  "checkout.step.type": "Type",
  "checkout.step.details": "Details",
  "checkout.step.payment": "Payment",
  "checkout.step.confirm": "Confirmation",
  "checkout.type.title": "How would you like your order?",
  "checkout.details.title": "Your details",
  "checkout.payment.title": "Payment method",
  "checkout.name": "Full name",
  "checkout.phone": "Phone",
  "checkout.email": "Email (optional)",
  "checkout.address": "Delivery address",
  "checkout.instructions": "Instructions (optional)",
  "checkout.time": "Requested time",
  "checkout.date": "Date",
  "checkout.party": "Party size",
  "checkout.pay.cash": "Pay on pickup / delivery",
  "checkout.pay.cash.desc": "Cash or card in person.",
  "checkout.pay.online": "Pay online by card",
  "checkout.pay.online.desc": "Secure payment (coming soon).",
  "checkout.next": "Next",
  "checkout.back": "Back",
  "checkout.submit": "Confirm order",
  "checkout.submitting": "Sending...",
  "checkout.success.title": "Order confirmed!",
  "checkout.success.desc": "Thank you! We'll call you to confirm the details.",
  "checkout.success.order": "Order number",
  "checkout.success.home": "Back to home",
  "checkout.total": "Total",
  "reserve.title": "Reserve your table",
  "reserve.subtitle": "Enjoy Patty's on-site in a warm atmosphere.",
  "about.title": "About Patty's",
  "about.story": "Our story",
  "about.body": "Born in Bizerte from a passion for great burgers, Patty's brings together fresh ingredients, house recipes and warm service. Each burger is made to order, with love.",
  "common.required": "Required",
  "common.optional": "Optional",
  "common.viewMore": "Learn more",
};

const ar: Dict = {
  "nav.home": "الرئيسية",
  "nav.menu": "القائمة",
  "nav.gallery": "المعرض",
  "nav.about": "من نحن",
  "nav.order": "اطلب",
  "nav.reserve": "احجز",
  "nav.cart": "السلة",
  "hero.tagline": "سماش برجر · بنزرت",
  "hero.title": "سماش برجر مصنوع بحب.",
  "hero.subtitle": "لحم مسحوق، دجاج مقرمش، صلصات Patty's الخاصة. يُحضّر طلبًا في بنزرت.",
  "hero.cta": "اطلب الآن",
  "hero.menu": "عرض القائمة",
  "info.rating": "تقييم جوجل",
  "info.price": "10–20 د.ت / شخص",
  "info.location": "طريق الكورنيش، بنزرت",
  "info.hours": "مفتوح · يغلق منتصف الليل",
  "info.reviews": "68 تقييم",
  "services.title": "كيف تفضّل تجربتك؟",
  "services.subtitle": "ثلاث طرق للاستمتاع بـ Patty's أينما كنت.",
  "services.takeaway": "للأخذ",
  "services.takeaway.desc": "اطلب واستلم. جاهز خلال 15–20 دقيقة.",
  "services.delivery": "توصيل",
  "services.delivery.desc": "نوصل لك ساخنًا في بنزرت.",
  "services.dinein": "في المطعم",
  "services.dinein.desc": "احجز طاولتك واستمتع بالأجواء.",
  "services.cta": "اختر",
  "featured.title": "الأكثر طلبًا",
  "featured.subtitle": "أحب برجراتنا إلى الزبائن.",
  "featured.viewAll": "كامل القائمة",
  "gallery.title": "داخل المطبخ",
  "gallery.subtitle": "النار، النكهات، اللحظات.",
  "gallery.viewAll": "عرض المعرض",
  "reviews.title": "ماذا يقول زبائننا",
  "reviews.subtitle": "تقييم 4.8 على جوجل من 68 تقييم.",
  "contact.title": "زورونا",
  "contact.address": "طريق الكورنيش، بنزرت",
  "contact.phone": "54 344 744",
  "contact.hours": "كل يوم · حتى منتصف الليل",
  "footer.rights": "جميع الحقوق محفوظة.",
  "footer.tagline": "برجر مصنوع بشغف في بنزرت.",
  "menu.title": "قائمتنا",
  "menu.subtitle": "اختر ما تحب وأضفه إلى السلة.",
  "menu.add": "أضف",
  "menu.cat.beef": "برجر لحم",
  "menu.cat.chicken": "برجر دجاج",
  "menu.cat.sides": "إضافات وأجنحة",
  "menu.cat.drinks": "مشروبات وشيك",
  "cart.title": "سلتك",
  "cart.empty": "سلتك فارغة.",
  "cart.empty.cta": "تصفح القائمة",
  "cart.subtotal": "المجموع الفرعي",
  "cart.checkout": "إتمام الطلب",
  "cart.remove": "حذف",
  "cart.notes": "ملاحظات خاصة",
  "cart.notes.placeholder": "حساسيات، تفضيلات...",
  "checkout.title": "إتمام الطلب",
  "checkout.step.type": "النوع",
  "checkout.step.details": "التفاصيل",
  "checkout.step.payment": "الدفع",
  "checkout.step.confirm": "التأكيد",
  "checkout.type.title": "كيف تريد طلبك؟",
  "checkout.details.title": "بياناتك",
  "checkout.payment.title": "طريقة الدفع",
  "checkout.name": "الاسم الكامل",
  "checkout.phone": "الهاتف",
  "checkout.email": "البريد (اختياري)",
  "checkout.address": "عنوان التوصيل",
  "checkout.instructions": "تعليمات (اختياري)",
  "checkout.time": "الوقت المطلوب",
  "checkout.date": "التاريخ",
  "checkout.party": "عدد الأشخاص",
  "checkout.pay.cash": "الدفع عند الاستلام / التوصيل",
  "checkout.pay.cash.desc": "نقدًا أو بالبطاقة على المكان.",
  "checkout.pay.online": "الدفع بالبطاقة عبر الإنترنت",
  "checkout.pay.online.desc": "دفع آمن (قريبًا).",
  "checkout.next": "التالي",
  "checkout.back": "رجوع",
  "checkout.submit": "تأكيد الطلب",
  "checkout.submitting": "جاري الإرسال...",
  "checkout.success.title": "تم تأكيد طلبك!",
  "checkout.success.desc": "شكرًا لك! سنتصل بك لتأكيد التفاصيل.",
  "checkout.success.order": "رقم الطلب",
  "checkout.success.home": "العودة إلى الرئيسية",
  "checkout.total": "المجموع",
  "reserve.title": "احجز طاولتك",
  "reserve.subtitle": "استمتع بـ Patty's داخل المطعم في أجواء دافئة.",
  "about.title": "عن Patty's",
  "about.story": "قصتنا",
  "about.body": "وُلدت Patty's في بنزرت من شغف بالبرجر اللذيذ، وتجمع بين مكونات طازجة ووصفات منزلية وخدمة دافئة. كل برجر يُحضّر طلبًا، بحب.",
  "common.required": "مطلوب",
  "common.optional": "اختياري",
  "common.viewMore": "اعرف المزيد",
};

const dictionaries: Record<Language, Dict> = { fr, en, ar };

interface I18nContextValue {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "pattys.lang";

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window === "undefined") return "fr";
    const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && ["fr", "ar", "en"].includes(stored)) return stored;
    return "fr";
  });

  const dir: "ltr" | "rtl" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang, dir]);

  const setLang = (l: Language) => setLangState(l);

  const value = useMemo<I18nContextValue>(() => {
    const dict = dictionaries[lang];
    return {
      lang,
      setLang,
      dir,
      t: (key: string) => dict[key] ?? dictionaries.en[key] ?? key,
    };
  }, [lang, dir]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
