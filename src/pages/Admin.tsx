import { useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/contexts/I18nContext";
import { useAdminProducts } from "@/hooks/useAdminProducts";
import { ProductForm } from "@/components/admin/ProductForm";
import { ProductTable } from "@/components/admin/ProductTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, Plus, LogOut, LogIn, LayoutDashboard } from "lucide-react";
import type { ProductFormValues } from "@/types/admin";

export default function Admin() {
  const { t, lang } = useI18n();
  const { products, isLoading, addProduct, updateProduct, deleteProduct, isAdding, isUpdating, isDeleting } = useAdminProducts();
  
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormValues | null>(null);

  const handleAddProduct = (data: ProductFormValues) => {
    const newProduct = { ...data, id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}` };
    addProduct(newProduct, {
      onSuccess: () => {
        setIsDialogOpen(false);
      },
    });
  };

  const handleUpdateProduct = (data: ProductFormValues) => {
    updateProduct(data, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setEditingProduct(null);
      },
    });
  };

  const handleEdit = (product: ProductFormValues) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    deleteProduct(productId);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setIsDialogOpen(false);
      setEditingProduct(null);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <LayoutDashboard className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground">Sign in to manage products</p>
          <Button onClick={() => setIsLoggedIn(true)} className="w-full" size="lg">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Site
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/" aria-label="Back to site">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage products</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Signed in as Admin</span>
            <Button variant="ghost" size="sm" onClick={() => setIsLoggedIn(false)}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">All Products</h2>
            <p className="text-muted-foreground">
              {products.length} product{products.length !== 1 ? "s" : ""} in your menu
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingProduct(null);
              setIsDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : (
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />
        )}
      </main>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            <DialogDescription>
              {editingProduct
                ? "Update the product details below."
                : "Fill in the product details below."}
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            defaultValues={editingProduct || undefined}
            submitLabel={editingProduct ? "Update Product" : "Add Product"}
            isLoading={isAdding || isUpdating}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}