import { useState, useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, type ProductFormValues, type Category, getDefaultProduct, generateId } from "@/types/admin";
import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Plus, X, Upload, ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => void;
  defaultValues?: ProductFormValues;
  submitLabel: string;
  isLoading?: boolean;
}

const categoryOptions: { value: Category; label: string }[] = [
  { value: "beef", label: "Beef Smashburgers" },
  { value: "chicken", label: "Chicken Burgers" },
  { value: "sides", label: "Sides & Wings" },
  { value: "drinks", label: "Drinks & Shakes" },
];

const langLabels = { fr: "FR", en: "EN", ar: "ع" };

export function ProductForm({ onSubmit, defaultValues, submitLabel, isLoading }: ProductFormProps) {
  const { lang } = useI18n();
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
      alert("File size must be less than 5MB");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPG, PNG, WebP and GIF files are allowed");
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
      alert("Failed to read file");
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

  const renderLangField = (baseName: "name" | "description" | "label") => {
    const isLabel = baseName === "label";
    return (
      <div className="grid grid-cols-3 gap-2">
        {(["fr", "en", "ar"] as const).map((l) => (
          <div key={l} className="space-y-1">
            <label className="text-xs font-medium text-muted-foreground">
              {langLabels[l]} {isLabel ? "" : baseName}
            </label>
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
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categoryOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
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
                <FormLabel>Base Price (TND)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.5" min="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <FormLabel>Name (FR / EN / AR)</FormLabel>
          {renderLangField("name")}
          <FormMessage>{form.formState.errors.name?.root?.message}</FormMessage>
        </div>

        <div>
          <FormLabel>Description (FR / EN / AR)</FormLabel>
          {renderLangField("description")}
          <FormMessage>{form.formState.errors.description?.root?.message}</FormMessage>
        </div>

        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Product Image</FormLabel>
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
                        className="absolute -top-2 -right-2"
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
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="mr-2 h-4 w-4" />
                      )}
                      Click to upload image
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Featured</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Show on homepage featured section
                </p>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <FormLabel className="mb-0">Variants (e.g., wing sizes)</FormLabel>
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
              <Plus className="mr-1 h-4 w-4" />
              Add Variant
            </Button>
          </div>

          {variantFields.length === 0 ? (
            <p className="text-sm text-muted-foreground">No variants added</p>
          ) : (
            <div className="space-y-3">
              {variantFields.map((variantField, index) => (
                <div
                  key={variantField.id}
                  className="flex flex-wrap items-start gap-2 rounded-lg border p-3"
                >
                  <div className="flex-1 min-w-[100px] space-y-1">
                    <label className="text-xs text-muted-foreground">Size</label>
                    <Input
                      type="number"
                      {...form.register(`variants.${index}.size` as const, {
                        valueAsNumber: true,
                      })}
                      min={1}
                    />
                  </div>
                  <div className="flex-1 min-w-[100px] space-y-1">
                    <label className="text-xs text-muted-foreground">Price (TND)</label>
                    <Input
                      type="number"
                      step="0.5"
                      {...form.register(`variants.${index}.price` as const, {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                  <div className="w-full">
                    <label className="text-xs text-muted-foreground">Label (FR/EN/AR)</label>
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
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
}