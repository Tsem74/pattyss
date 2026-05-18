import { z } from "zod";

export const categoryEnum = z.enum(["beef", "chicken", "sides", "drinks"]);

export type Category = z.infer<typeof categoryEnum>;

export const variantLabelSchema = z.object({
  fr: z.string().min(1, "Required"),
  en: z.string().min(1, "Required"),
  ar: z.string().min(1, "Required"),
});

export type VariantLabel = z.infer<typeof variantLabelSchema>;

export const variantSchema = z.object({
  id: z.string().min(1),
  size: z.coerce.number().int().min(1, "Must be at least 1"),
  price: z.coerce.number().min(0, "Price must be positive"),
  label: variantLabelSchema,
});

export type MenuItemVariant = z.infer<typeof variantSchema>;

export const multiLangStringSchema = z.object({
  fr: z.string().min(1, "Required"),
  en: z.string().min(1, "Required"),
  ar: z.string().min(1, "Required"),
});

export type MultiLangString = z.infer<typeof multiLangStringSchema>;

export const productFormSchema = z.object({
  id: z.string(),
  category: categoryEnum,
  image: z.string().min(1, "Image is required"),
  price: z.coerce.number().min(0).optional(),
  name: multiLangStringSchema,
  description: multiLangStringSchema,
  featured: z.boolean().default(false),
  variants: z.array(variantSchema).optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function getDefaultProduct(): ProductFormValues {
  return {
    id: generateId(),
    category: "beef",
    image: "",
    price: 0,
    name: { fr: "", en: "", ar: "" },
    description: { fr: "", en: "", ar: "" },
    featured: false,
    variants: [],
  };
}