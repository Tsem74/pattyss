import { useState } from "react";
import { useI18n } from "@/contexts/I18nContext";
import { MenuItemVariant } from "@/data/menu";
import { cn } from "@/lib/utils";

export interface SizeSelectorProps {
  variants: MenuItemVariant[];
  onSelect: (variant: MenuItemVariant) => void;
  defaultVariantId?: string;
}

export const SizeSelector = ({
  variants,
  onSelect,
  defaultVariantId,
}: SizeSelectorProps) => {
  const { lang } = useI18n();
  const defaultVariant = defaultVariantId
    ? variants.find((v) => v.id === defaultVariantId)
    : variants[0];

  const [selected, setSelected] = useState<MenuItemVariant>(
    defaultVariant || variants[0]
  );

  const handleSelect = (variant: MenuItemVariant) => {
    setSelected(variant);
    onSelect(variant);
  };

  return (
    <div className="mt-4 space-y-3">
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => handleSelect(variant)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-all",
              selected.id === variant.id
                ? "border-primary bg-primary text-primary-foreground shadow-md"
                : "border-border bg-background text-foreground hover:border-primary/40"
            )}
          >
            {variant.label[lang]}
          </button>
        ))}
      </div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-muted-foreground">
          {selected.size} {lang === "fr" ? "pièces" : lang === "ar" ? "قطع" : "pcs"}
        </span>
        <span className="font-display text-lg font-bold text-primary">
          TND {selected.price}
        </span>
      </div>
    </div>
  );
};
