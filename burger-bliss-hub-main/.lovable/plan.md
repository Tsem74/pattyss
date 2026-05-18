# Menu sync with uploaded Patty's boards

Based on the 4 uploaded menu boards (Beef Smashburger, Chicken Burger, Patty's Sides, Patty's Drinks), I'll reconcile `src/data/menu.ts` so items, prices, and images match the official menu. The data is already mostly correct — the main gap is **drink images** (all currently reuse `photo-fries.jpg`) and a few specific burger/side photos.

## What will change

### 1. Generate missing images (AI, Nano banana 2 — fast + high quality)

One dedicated photo per item that lacks a proper image. Consistent style: top-down or 3/4 studio shot, clean background matching brand (warm off-white / subtle purple accents), appetising natural lighting.

**Drinks (currently all use fries photo — biggest gap):**
- `drink-water-small.jpg` — 0.5 L mineral water bottle
- `drink-water-large.jpg` — 1 L mineral water bottle
- `drink-can.jpg` — generic soda can (Coke-style, unbranded)
- `drink-lemonade-classic.jpg` — classic lemonade in glass with lemon
- `drink-lemonade-strawberry.jpg` — strawberry lemonade
- `drink-lemonade-passion.jpg` — passion fruit lemonade
- `drink-lemonade-blueberry.jpg` — blueberry lemonade
- `drink-lemonade-mango.jpg` — mango lemonade
- `drink-mojito-classic.jpg` — classic mojito, mint + lime
- `drink-mojito-strawberry.jpg`
- `drink-mojito-passion.jpg`
- `drink-mojito-blueberry.jpg`
- `drink-mojito-mango.jpg`
- `drink-smoothie-dragon.jpg` — Dragon Summer (pink dragon-fruit smoothie)
- `drink-smoothie-mango.jpg`
- `drink-smoothie-passion.jpg`
- `drink-smoothie-peach.jpg`
- `drink-milkshake-classic.jpg` — vanilla/strawberry milkshake with whipped cream
- `drink-milkshake-special.jpg` — Patty's Special (cookies/lotus loaded shake)

**Sides (to differentiate loaded fries variants):**
- `side-cheesy-fries.jpg`
- `side-dynamite-fries.jpg` (spicy orange sauce drizzle)
- `side-cheesy-mushrooms-fries.jpg`
- `side-chicken-loaded-fries.jpg`
- `side-beef-loaded-fries.jpg`

Keep existing `photo-fries.jpg` for Classic Fries, `photo-wing.jpg` for all wings, `photo-stripes.jpg` for all stripes.

**Burgers/chicken:** existing photos (`photo-smash.jpg`, `photo-double-smash.jpg`, `photo-combo.jpg`, `photo-burger-fries.jpg`) are kept — they already match the 4 burger items.

### 2. Update `src/data/menu.ts`
- Import the new images.
- Reassign `image:` for every drink and the loaded-fries sides to their dedicated photo.
- No price/name changes needed — current data already matches the boards (Classic Smash 13.5, Double 16.5, Crispy Supreme 12.5, Double Crispy 14.5, wings/stripes 4.5/6.5/8.5, fries tiers, drinks all match).

### 3. No other files touched
`Menu.tsx`, cart, i18n remain unchanged — they already consume `item.image`.

## Technical notes
- Images generated via `google/gemini-3.1-flash-image-preview` through the Lovable AI gateway, saved as JPGs in `src/assets/` at ~1024×1024, then imported as ES modules in `menu.ts`.
- Generation done in a single batch script to keep it fast.
- After generation, I'll spot-check a few images visually before wiring them up.

Approve and I'll execute.