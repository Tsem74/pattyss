import smashClassic from "@/assets/photo-smash.jpg";
import smashDouble from "@/assets/photo-double-smash.jpg";
import burgerCombo from "@/assets/photo-combo.jpg";
import fries from "@/assets/photo-fries.jpg";
import burgerFries from "@/assets/photo-burger-fries.jpg";
import chickenWing from "@/assets/photo-wing.jpg";
import chickenStripes from "@/assets/photo-stripes.jpg";
import drinkLemonadeClassic from "@/assets/drink-lemonade-classic.jpg";
import drinkLemonadeStrawberry from "@/assets/drink-lemonade-strawberry.jpg";
import drinkLemonadePassion from "@/assets/drink-lemonade-passion.jpg";
import drinkLemonadeBlueberry from "@/assets/drink-lemonade-blueberry.jpg";
import drinkLemonadeMango from "@/assets/drink-lemonade-mango.jpg";
import drinkMojitoClassic from "@/assets/drink-mojito-classic.jpg";
import drinkMojitoStrawberry from "@/assets/drink-mojito-strawberry.jpg";
import drinkMojitoPassion from "@/assets/drink-mojito-passion.jpg";
import drinkMojitoBlueberry from "@/assets/drink-mojito-blueberry.jpg";
import drinkMojitoMango from "@/assets/drink-mojito-mango.jpg";
import drinkSmoothieDragon from "@/assets/drink-smoothie-dragon.jpg";
import drinkSmoothieMango from "@/assets/drink-smoothie-mango.jpg";
import drinkSmoothiePassion from "@/assets/drink-smoothie-passion.jpg";
import drinkSmoothiePeach from "@/assets/drink-smoothie-peach.jpg";
import drinkMilkshakeClassic from "@/assets/drink-milkshake-classic.jpg";
import drinkMilkshakeSpecial from "@/assets/drink-milkshake-special.jpg";
import sideCheesyFries from "@/assets/side-cheesy-fries.jpg";
import sideDynamiteFries from "@/assets/side-dynamite-fries.jpg";
//import sideCheesyMushroomsFries from "@/assets/side-cheesy-mushrooms-fries.jpg";
import sideChickenLoadedFries from "@/assets/side-chicken-loaded-fries.jpg";
import sideBeefLoadedFries from "@/assets/side-beef-loaded-fries.jpg";
import drinkCan from "@/assets/canette.jpg";
import waterLarge from "@/assets/drink-water-large.jpg";

export type Category = "beef" | "chicken" | "sides" | "drinks";

export interface MenuItemVariant {
  id: string; // e.g., "wings-4", "wings-6", "wings-8"
  size: number; // e.g., 4, 6, 8
  price: number; // TND
  label: { fr: string; en: string; ar: string }; // e.g., "4 pcs", "6 pcs", "8 pcs"
}

export interface MenuItem {
  id: string;
  category: Category;
  image: string;
  price?: number; // TND - optional if variants are used
  name: { fr: string; en: string; ar: string };
  description: { fr: string; en: string; ar: string };
  featured?: boolean;
  variants?: MenuItemVariant[]; // For items with size options
}

export const menuItems: MenuItem[] = [
  // ===== BEEF SMASHBURGERS =====
  {
    id: "classic-smash",
    category: "beef",
    image: smashClassic,
    price: 13.5,
    featured: true,
    name: { fr: "Classic Smash", en: "Classic Smash", ar: "كلاسيك سماش" },
    description: {
      fr: "Steak smashé, mayo, ketchup, moutarde, laitue, tomate, oignon, pickles, oignons & champignons caramélisés.",
      en: "Smashed beef patty, mayo, ketchup, mustard, lettuce, tomato, onion, pickles, caramelised onions & mushrooms.",
      ar: "لحم بقري مسحوق، مايونيز، كاتشب، خردل، خس، طماطم، بصل، مخلل، بصل وفطر مكرمل.",
    },
  },
  {
    id: "double-smash",
    category: "beef",
    image: smashDouble,
    price: 16.5,
    featured: true,
    name: { fr: "Double Smash", en: "Double Smash", ar: "دبل سماش" },
    description: {
      fr: "Double steak smashé, garniture complète, sauces Patty's au choix.",
      en: "Double smashed patty, full toppings, your choice of Patty's sauce.",
      ar: "قطعتان من اللحم المسحوق، إضافات كاملة، صلصة Patty's على اختيارك.",
    },
  },
  // ===== CHICKEN BURGERS =====
  {
    id: "crispy-supreme",
    category: "chicken",
    image: burgerCombo,
    price: 12.5,
    featured: true,
    name: { fr: "Crispy Supreme", en: "Crispy Supreme", ar: "كريسبي سوبريم" },
    description: {
      fr: "Filet de poulet croustillant, mayo, ketchup, laitue, tomate, oignon, pickles, sauce cheese Patty's.",
      en: "Crispy chicken fillet, mayo, ketchup, lettuce, tomato, onion, pickles, Patty's cheese sauce.",
      ar: "فيليه دجاج مقرمش، مايونيز، كاتشب، خس، طماطم، بصل، مخلل، صلصة جبن Patty's.",
    },
  },
  {
    id: "double-crispy-supreme",
    category: "chicken",
    image: burgerFries,
    price: 14.5,
    name: { fr: "Double Crispy Supreme", en: "Double Crispy Supreme", ar: "دبل كريسبي سوبريم" },
    description: {
      fr: "Double filet de poulet croustillant, garniture complète, sauce Patty's au choix.",
      en: "Double crispy chicken fillet, full toppings, your choice of Patty's sauce.",
      ar: "قطعتان من فيليه الدجاج المقرمش، إضافات كاملة، صلصة Patty's على اختيارك.",
    },
  },
  // ===== SIDES — FRIES =====
  {
    id: "classic-fries",
    category: "sides",
    image: fries,
    price: 2.5,
    name: { fr: "Classic Fries", en: "Classic Fries", ar: "بطاطا كلاسيك" },
    description: {
      fr: "Frites croustillantes, fleur de sel.",
      en: "Crispy fries, sea salt.",
      ar: "بطاطا مقرمشة بالملح.",
    },
  },
  {
    id: "cheesy-fries",
    category: "sides",
    image: sideCheesyFries,
    price: 3.5,
    name: { fr: "Cheesy Fries", en: "Cheesy Fries", ar: "تشيزي فرايز" },
    description: {
      fr: "Frites nappées de sauce fromage maison.",
      en: "Fries topped with house cheese sauce.",
      ar: "بطاطا مغطاة بصلصة الجبن.",
    },
  },
  {
    id: "dynamite-fries",
    category: "sides",
    image: sideDynamiteFries,
    price: 3.5,
    featured: true,
    name: { fr: "Dynamite Fries", en: "Dynamite Fries", ar: "ديناميت فرايز" },
    description: {
      fr: "Frites + sauce Dynamite signature, épicée et crémeuse.",
      en: "Fries + signature Dynamite sauce, spicy and creamy.",
      ar: "بطاطا مع صلصة الديناميت الحارة الكريمية.",
    },
  },
  // {
  //   id: "cheesy-mushrooms-fries",
  //   category: "sides",
  //   image: sideCheesyMushroomsFries,
  //   price: 4.5,
  //   name: { fr: "Cheesy Mushrooms Fries", en: "Cheesy Mushrooms Fries", ar: "فرايز بالجبن والفطر" },
  //   description: {
  //     fr: "Frites, sauce fromage maison & champignons sautés.",
  //     en: "Fries, house cheese sauce & sautéed mushrooms.",
  //     ar: "بطاطا مع صلصة الجبن والفطر السوتيه.",
  //   },
  // },
  {
    id: "chicken-loaded-fries",
    category: "sides",
    image: sideChickenLoadedFries,
    price: 6.5,
    name: { fr: "Chicken Loaded Fries", en: "Chicken Loaded Fries", ar: "تشيكن لوديد فرايز" },
    description: {
      fr: "Frites garnies de poulet, fromage fondu et sauce au choix.",
      en: "Fries loaded with chicken, melted cheese and sauce of choice.",
      ar: "بطاطا محشوة بالدجاج والجبن وصلصة على اختيارك.",
    },
  },
  {
    id: "beef-loaded-fries",
    category: "sides",
    image: sideBeefLoadedFries,
    price: 7.5,
    name: { fr: "Beef Loaded Fries", en: "Beef Loaded Fries", ar: "بيف لوديد فرايز" },
    description: {
      fr: "Frites garnies de bœuf smashé, fromage fondu et sauce au choix.",
      en: "Fries loaded with smashed beef, melted cheese and sauce of choice.",
      ar: "بطاطا محشوة باللحم المسحوق والجبن وصلصة على اختيارك.",
    },
  },
  // ===== SIDES — WINGS =====
  {
    id: "wings",
    category: "sides",
    image: chickenWing,
    name: { fr: "Chicken Wings", en: "Chicken Wings", ar: "أجنحة دجاج" },
    description: {
      fr: "Ailes de poulet glacées à la sauce signature au choix.",
      en: "Chicken wings glazed in your choice of signature sauce.",
      ar: "أجنحة دجاج بصلصة Patty's على اختيارك.",
    },
    variants: [
      {
        id: "wings-4",
        size: 4,
        price: 4.5,
        label: { fr: "4 pièces", en: "4 pcs", ar: "4 قطع" },
      },
      {
        id: "wings-6",
        size: 6,
        price: 6.5,
        label: { fr: "6 pièces", en: "6 pcs", ar: "6 قطع" },
      },
      {
        id: "wings-8",
        size: 8,
        price: 8.5,
        label: { fr: "8 pièces", en: "8 pcs", ar: "8 قطع" },
      },
    ],
  },
  // ===== SIDES — STRIPES =====
  {
    id: "stripes",
    category: "sides",
    image: chickenStripes,
    name: { fr: "Chicken Stripes", en: "Chicken Stripes", ar: "تشيكن سترايبس" },
    description: {
      fr: "Stripes de poulet panées, sauce au choix.",
      en: "Breaded chicken stripes, dipping sauce of choice.",
      ar: "شرائح دجاج مقرمشة مع صلصة على اختيارك.",
    },
    variants: [
      {
        id: "stripes-4",
        size: 4,
        price: 4.5,
        label: { fr: "4 pièces", en: "4 pcs", ar: "4 قطع" },
      },
      {
        id: "stripes-6",
        size: 6,
        price: 6.5,
        label: { fr: "6 pièces", en: "6 pcs", ar: "6 قطع" },
      },
      {
        id: "stripes-8",
        size: 8,
        price: 8.5,
        label: { fr: "8 pièces", en: "8 pcs", ar: "8 قطع" },
      },
    ],
  },
  // ===== DRINKS — BASICS =====
  {
    id: "water-05",
    category: "drinks",
    image: waterLarge,
    price: 1.5,
    name: { fr: "Eau minérale 0,5 L", en: "Mineral water 0.5 L", ar: "ماء معدني 0.5 ل" },
    description: { fr: "Bouteille 50 cl.", en: "50 cl bottle.", ar: "قارورة 50 سل." },
  },
  {
    id: "water-1",
    category: "drinks",
    image: waterLarge,
    price: 2.5,
    name: { fr: "Eau minérale 1,0 L", en: "Mineral water 1.0 L", ar: "ماء معدني 1.0 ل" },
    description: { fr: "Bouteille 1 L.", en: "1 L bottle.", ar: "قارورة 1 ل." },
  },
  {
    id: "canette",
    category: "drinks",
    image: drinkCan,
    price: 2.5,
    name: { fr: "Canette", en: "Soda can", ar: "علبة مشروب" },
    description: { fr: "Coca, Fanta, Sprite, Boga.", en: "Coke, Fanta, Sprite, Boga.", ar: "كوكا، فانتا، سبرايت، بوقا." },
  },
  // ===== DRINKS — LEMONADE =====
  {
    id: "lemonade-classic",
    category: "drinks",
    image: drinkLemonadeClassic,
    price: 4,
    name: { fr: "Limonade classique", en: "Classic lemonade", ar: "ليموناضة كلاسيك" },
    description: { fr: "Citron pressé maison.", en: "Freshly pressed lemon.", ar: "عصير ليمون طازج." },
  },
  {
    id: "lemonade-strawberry",
    category: "drinks",
    image: drinkLemonadeStrawberry,
    price: 6.5,
    name: { fr: "Limonade fraise", en: "Strawberry lemonade", ar: "ليموناضة بالفراولة" },
    description: { fr: "Citron pressé & fraise fraîche.", en: "Pressed lemon & fresh strawberry.", ar: "ليمون طازج وفراولة." },
  },
  {
    id: "lemonade-passion",
    category: "drinks",
    image: drinkLemonadePassion,
    price: 6.5,
    name: { fr: "Limonade fruit de la passion", en: "Passion fruit lemonade", ar: "ليموناضة بفاكهة العاطفة" },
    description: { fr: "Citron pressé & fruit de la passion.", en: "Pressed lemon & passion fruit.", ar: "ليمون طازج مع فاكهة العاطفة." },
  },
  {
    id: "lemonade-blueberry",
    category: "drinks",
    image: drinkLemonadeBlueberry,
    price: 6.5,
    name: { fr: "Limonade myrtille", en: "Blueberry lemonade", ar: "ليموناضة بالتوت" },
    description: { fr: "Citron pressé & myrtilles.", en: "Pressed lemon & blueberries.", ar: "ليمون طازج مع التوت الأزرق." },
  },
  {
    id: "lemonade-mango",
    category: "drinks",
    image: drinkLemonadeMango,
    price: 6.5,
    name: { fr: "Limonade mangue", en: "Mango lemonade", ar: "ليموناضة بالمانجو" },
    description: { fr: "Citron pressé & mangue.", en: "Pressed lemon & mango.", ar: "ليمون طازج مع المانجو." },
  },
  // ===== DRINKS — MOJITO =====
  {
    id: "mojito-classic",
    category: "drinks",
    image: drinkMojitoClassic,
    price: 8.5,
    featured: true,
    name: { fr: "Mojito classique", en: "Classic mojito", ar: "موهيتو كلاسيك" },
    description: { fr: "Menthe fraîche, citron vert, sucre de canne.", en: "Fresh mint, lime, cane sugar.", ar: "نعناع طازج، ليم، سكر القصب." },
  },
  {
    id: "mojito-strawberry",
    category: "drinks",
    image: drinkMojitoStrawberry,
    price: 9.5,
    name: { fr: "Mojito fraise", en: "Strawberry mojito", ar: "موهيتو بالفراولة" },
    description: { fr: "Mojito + fraise fraîche.", en: "Mojito + fresh strawberry.", ar: "موهيتو مع الفراولة." },
  },
  {
    id: "mojito-passion",
    category: "drinks",
    image: drinkMojitoPassion,
    price: 9.5,
    name: { fr: "Mojito fruit de la passion", en: "Passion fruit mojito", ar: "موهيتو بفاكهة العاطفة" },
    description: { fr: "Mojito + fruit de la passion.", en: "Mojito + passion fruit.", ar: "موهيتو مع فاكهة العاطفة." },
  },
  {
    id: "mojito-blueberry",
    category: "drinks",
    image: drinkMojitoBlueberry,
    price: 9.5,
    name: { fr: "Mojito myrtille", en: "Blueberry mojito", ar: "موهيتو بالتوت" },
    description: { fr: "Mojito + myrtilles.", en: "Mojito + blueberries.", ar: "موهيتو مع التوت الأزرق." },
  },
  {
    id: "mojito-mango",
    category: "drinks",
    image: drinkMojitoMango,
    price: 9.5,
    name: { fr: "Mojito mangue", en: "Mango mojito", ar: "موهيتو بالمانجو" },
    description: { fr: "Mojito + mangue.", en: "Mojito + mango.", ar: "موهيتو مع المانجو." },
  },
  // ===== DRINKS — SMOOTHIES =====
  {
    id: "smoothie-dragon",
    category: "drinks",
    image: drinkSmoothieDragon,
    price: 10.5,
    name: { fr: "Smoothie Dragon Summer", en: "Dragon Summer smoothie", ar: "سموذي دراقون سامر" },
    description: { fr: "Mélange tropical fruit du dragon.", en: "Tropical dragon fruit blend.", ar: "خليط استوائي بفاكهة التنين." },
  },
  {
    id: "smoothie-mango",
    category: "drinks",
    image: drinkSmoothieMango,
    price: 10.5,
    name: { fr: "Smoothie mangue", en: "Mango smoothie", ar: "سموذي مانجو" },
    description: { fr: "Mangue fraîche onctueuse.", en: "Smooth fresh mango.", ar: "مانجو طازجة كريمية." },
  },
  {
    id: "smoothie-passion",
    category: "drinks",
    image: drinkSmoothiePassion,
    price: 10.5,
    name: { fr: "Smoothie fruit de la passion", en: "Passion fruit smoothie", ar: "سموذي فاكهة العاطفة" },
    description: { fr: "Fruit de la passion frais.", en: "Fresh passion fruit.", ar: "فاكهة العاطفة الطازجة." },
  },
  {
    id: "smoothie-peach",
    category: "drinks",
    image: drinkSmoothiePeach,
    price: 10.5,
    name: { fr: "Smoothie pêche", en: "Peach smoothie", ar: "سموذي خوخ" },
    description: { fr: "Pêche juteuse.", en: "Juicy peach.", ar: "خوخ منعش." },
  },
  // ===== DRINKS — MILKSHAKES =====
  {
    id: "milkshake-classic",
    category: "drinks",
    image: drinkMilkshakeClassic,
    price: 11.5,
    name: { fr: "Milkshake classique", en: "Classic milkshake", ar: "ميلكشيك كلاسيك" },
    description: { fr: "Vanille, fraise, chocolat, banane ou mangue.", en: "Vanilla, strawberry, chocolate, banana or mango.", ar: "فانيلا، فراولة، شوكولاتة، موز أو مانجو." },
  },
  {
    id: "milkshake-special",
    category: "drinks",
    image: drinkMilkshakeSpecial,
    price: 13,
    featured: true,
    name: { fr: "Patty's Special Shake", en: "Patty's Special Shake", ar: "شيك Patty's سبيشل" },
    description: { fr: "Cookies black, lotus, pistache, noisette ou caramel beurre salé.", en: "Black cookies, lotus, pistachio, hazelnut or salted caramel.", ar: "كوكيز أسود، لوتس، فستق، بندق أو كراميل بالملح." },
  },
];

export const categories: Category[] = ["beef", "chicken", "sides", "drinks"];