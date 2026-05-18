import { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, type ProductFormValues, type Category, getDefaultProduct, generateId } from "@/types/admin";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, X, Upload, Loader2 } from "lucide-react";

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => void;
  defaultValues?: ProductFormValues;
  submitLabel: string;
  isLoading?: boolean;
}

const categoryOptions: { value: Category; labelKey: string }[] = [
  { value: "beef", labelKey: "menu.cat.beef" },
  { value: "chicken", labelKey: "menu.cat.chicken" },
  { value: "sides", labelKey: "menu.cat.sides" },
  { value: "drinks", labelKey: "menu.cat.drinks" },
];

const langLabels = { fr: "FR", en: "EN", ar: "ع" };

export function ProductForm({ onSubmit, defaultValues, submitLabel, isLoading }: ProductFormProps) {
  const { t, lang } = useI18n();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string>(defaultValues?.image || "");
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: defaultValues || getDefaultProduct(),
  });

  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({
    control: form.control,
    name: "variants",
  });

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert(t("admin.filesize.error"));
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      alert(t("admin.filetype.error"));
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImagePreview(result);
      form.setValue("image", result);
      setIsUploading(false);
    };
    reader.onerror = () => {
      setIsUploading(false);
      alert(t("admin.file.error"));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    form.setValue("image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const renderLangField = (baseName: "name" | "description") => (
    <div className="grid grid-cols-3 gap-2">
      {(["fr", "en", "ar"] as const).map((l) => (
        <div key={l} className="space-y-1">
          <label className="text-xs font-medium text-muted-foreground">{langLabels[l]}</label>
          <Input
            {...form.register(`${baseName}.${l}` as const)}
            placeholder={langLabels[l]}
            dir={l === "ar" ? "rtl" : "ltr"}
            className={l === "ar" ? "text-right" : ""}
          />
        </div>
      ))}
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("admin.category")}</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={t("admin.selectcategory")} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {t(opt.labelKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("admin.baseprice")}</FormLabel>
                <FormControl>
                  <Input type="number" step="0.5" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormLabel>{t("admin.name.label")}</FormLabel>
          {renderLangField("name")}
          <FormMessage>{form.formState.errors.name?.root?.message}</FormMessage>
        </div>

        <div>
          <FormLabel>{t("admin.description.label")}</FormLabel>
          {renderLangField("description")}
          <FormMessage>{form.formState.errors.description?.root?.message}</FormMessage>
        </div>

        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>{t("admin.productimage")}</FormLabel>
              <FormControl>
                <div className="space-y-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  {imagePreview ? (
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="max-h-48 rounded-lg border object-contain"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -end-2"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="w-full"
                    >
                      {isUploading ? (
                        <Loader2 className="me-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="me-2 h-4 w-4" />
                      )}
                      {t("admin.uploadimage")}
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <FormLabel className="mb-0">{t("admin.variants")}</FormLabel>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                appendVariant({
                  id: generateId(),
                  size: 4,
                  price: 4.5,
                  label: { fr: "4 pcs", en: "4 pcs", ar: "4 قطع" },
                })
              }
            >
              <Plus className="me-1 h-4 w-4" />
              {t("admin.addvariant")}
            </Button>
          </div>

          {variantFields.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("admin.novariants")}</p>
          ) : (
            <div className="space-y-3">
              {variantFields.map((variantField, index) => (
                <div
                  key={variantField.id}
                  className="flex flex-wrap items-start gap-2 rounded-lg border p-3"
                >
                  <div className="flex-1 min-w-[100px] space-y-1">
                    <label className="text-xs text-muted-foreground">{t("admin.size")}</label>
                    <Input
                      type="number"
                      {...form.register(`variants.${index}.size` as const, {
                        valueAsNumber: true,
                      })}
                      min={1}
                    />
                  </div>
                  <div className="flex-1 min-w-[100px] space-y-1">
                    <label className="text-xs text-muted-foreground">{t("admin.price.short")}</label>
                    <Input
                      type="number"
                      step="0.5"
                      {...form.register(`variants.${index}.price` as const, {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs text-muted-foreground">{t("admin.variant.label")}</label>
                    <div className="grid grid-cols-3 gap-1 mt-1">
                      {(["fr", "en", "ar"] as const).map((l) => (
                        <Input
                          key={l}
                          {...form.register(`variants.${index}.label.${l}` as const)}
                          placeholder={langLabels[l]}
                          dir={l === "ar" ? "rtl" : "ltr"}
                        />
                      ))}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => removeVariant(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
}