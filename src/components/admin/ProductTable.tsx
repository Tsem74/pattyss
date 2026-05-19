import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { ProductFormValues } from "@/types/admin";
import { Pencil, Trash2, Star, Package } from "lucide-react";
import { useState } from "react";

interface ProductTableProps {
  products: ProductFormValues[];
  onEdit: (product: ProductFormValues) => void;
  onDelete: (productId: string) => void;
  onToggleFeatured: (productId: string, currentFeatured: boolean) => void;
  isDeleting: boolean;
}

const categoryColors: Record<string, string> = {
  beef: "bg-amber-100 text-amber-800",
  chicken: "bg-orange-100 text-orange-800",
  sides: "bg-green-100 text-green-800",
  drinks: "bg-blue-100 text-blue-800",
};

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function ProductTable({ products, onEdit, onDelete, onToggleFeatured, isDeleting }: ProductTableProps) {
  const { t, tt, lang } = useI18n();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">{t("admin.noproducts")}</h3>
        <p className="text-sm text-muted-foreground">{t("admin.noproducts.desc")}</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">{t("admin.image")}</TableHead>
              <TableHead>{t("admin.name")}</TableHead>
              <TableHead>{t("admin.category")}</TableHead>
              <TableHead>{t("admin.price")}</TableHead>
              <TableHead className="text-center">{t("admin.featured")}</TableHead>
              <TableHead className="text-right">{t("admin.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const hasVariants = product.variants && product.variants.length > 0;
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="h-10 w-10 overflow-hidden rounded-md bg-muted">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name[lang]}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <Star className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{product.name[lang]}</span>
                      <span className="text-xs text-muted-foreground">
                        {product.name.fr} / {product.name.en}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        categoryColors[product.category] || "bg-gray-100 text-gray-800"
                      )}
                    >
                      {t(`menu.cat.${product.category}`)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {hasVariants ? (
                      <div className="text-sm">
                        <div className="font-medium">
                          {tt("admin.variants.count", { n: product.variants!.length, s: product.variants!.length > 1 ? "s" : "" })}
                        </div>
                        <div className="text-muted-foreground">
                          {product.variants!.map((v) => `${v.size}: ${v.price}TND`).join(", ")}
                        </div>
                      </div>
                    ) : (
                      <span className="font-medium">
                        {product.price !== undefined ? `${product.price} TND` : "-"}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <button
                      type="button"
                      onClick={() => onToggleFeatured(product.id, !!product.featured)}
                      className="mx-auto block"
                      title={product.featured ? "Unmark featured" : "Mark as featured"}
                    >
                      <Star
                        className={cn(
                          "h-5 w-5 transition-colors",
                          product.featured
                            ? "fill-yellow-500 text-yellow-500 hover:fill-yellow-500/60"
                            : "text-muted-foreground hover:text-yellow-500",
                        )}
                      />
                    </button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(product)}
                        title={t("admin.edit")}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(product.id)}
                        title={t("admin.delete.title")}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("admin.deleteproduct")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("admin.delete.confirm")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("admin.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? t("admin.deleting") : t("admin.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}