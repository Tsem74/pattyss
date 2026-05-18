import { useI18n } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
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
import { Pencil, Trash2, Star } from "lucide-react";
import { useState } from "react";

interface ProductTableProps {
  products: ProductFormValues[];
  onEdit: (product: ProductFormValues) => void;
  onDelete: (productId: string) => void;
  isDeleting: boolean;
}

const categoryColors: Record<string, string> = {
  beef: "bg-amber-100 text-amber-800",
  chicken: "bg-orange-100 text-orange-800",
  sides: "bg-green-100 text-green-800",
  drinks: "bg-blue-100 text-blue-800",
};

export function ProductTable({ products, onEdit, onDelete, isDeleting }: ProductTableProps) {
  const { lang } = useI18n();
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
          <Star className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">No products found</h3>
        <p className="text-sm text-muted-foreground">Add your first product to get started.</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-center">Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    {hasVariants ? (
                      <div className="text-sm">
                        <div className="font-medium">
                          {product.variants!.length} variants
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
                    {product.featured ? (
                      <Star className="mx-auto h-4 w-4 fill-yellow-500 text-yellow-500" />
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(product)}
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteId(product.id)}
                        title="Delete"
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
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}