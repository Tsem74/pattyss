import { useState } from "react";
import { Link } from "react-router-dom";
import { useI18n, type Language } from "@/contexts/I18nContext";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useAdminProducts } from "@/hooks/useAdminProducts";
import { useAdminOrders, useUpdateOrderStatus } from "@/hooks/useAdminOrders";
import { ProductForm } from "@/components/admin/ProductForm";
import { ProductTable } from "@/components/admin/ProductTable";
import { OrderTable } from "@/components/admin/OrderTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowLeft, Plus, LogOut, LogIn, LayoutDashboard, Package, ShoppingBag } from "lucide-react";
import type { ProductFormValues } from "@/types/admin";

export default function Admin() {
  const { t, tt, lang, setLang } = useI18n();
  const { products, isLoading, addProduct, updateProduct, deleteProduct, isAdding, isUpdating, isDeleting } = useAdminProducts();
  const { isAuthenticated, loading: authLoading, error: authError, signIn, signOut } = useAdminAuth();
  const { data: orders = [], isLoading: ordersLoading } = useAdminOrders();
  const { mutate: updateOrderStatus, isPending: isUpdatingOrder } = useUpdateOrderStatus();
  const [tab, setTab] = useState("products");
  const [password, setPassword] = useState("");
  const [editingProduct, setEditingProduct] = useState<ProductFormValues | null>(null);

  const handleAddProduct = (data: ProductFormValues) => {
    addProduct(data, {
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

  const handleToggleFeatured = (productId: string, currentFeatured: boolean) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      updateProduct({ ...product, featured: !currentFeatured });
    }
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setIsDialogOpen(false);
      setEditingProduct(null);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <LayoutDashboard className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">{t("admin.login")}</h1>
          <p className="text-muted-foreground">{t("admin.signin.desc")}</p>
          <div className="space-y-4 text-left">
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    signIn(password);
                  }
                }}
              />
            </div>
            {authError && <p className="text-sm text-destructive">{authError}</p>}
            <Button onClick={() => signIn(password)} className="w-full" size="lg">
              <LogIn className="me-2 h-4 w-4" />
              {t("admin.signin")}
            </Button>
          </div>
          <Button variant="outline" asChild className="w-full">
            <Link to="/">
              <ArrowLeft className="me-2 h-4 w-4 rtl:rotate-180" />
              {t("admin.backtosite")}
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
              <Link to="/" aria-label={t("admin.backtosite")}>
                <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
              </Link>
            </Button>
            <div>
              <h1 className="text-lg font-semibold">{t("admin.title")}</h1>
              <p className="text-sm text-muted-foreground">{t("admin.allproducts")}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-full border border-border p-0.5">
              {(["fr", "ar", "en"] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs font-semibold transition-smooth",
                    lang === l
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {l === "fr" ? "FR" : l === "ar" ? "ع" : "EN"}
                </button>
              ))}
            </div>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="me-2 h-4 w-4" />
              {t("admin.logout")}
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                {t("admin.allproducts")}
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" />
                Orders
              </TabsTrigger>
            </TabsList>

            {tab === "products" && (
              <Button
                onClick={() => {
                  setEditingProduct(null);
                  setIsDialogOpen(true);
                }}
              >
                <Plus className="me-2 h-4 w-4" />
                {t("admin.addproduct")}
              </Button>
            )}
          </div>

          <TabsContent value="products">
            <div className="mb-6">
              <p className="text-muted-foreground">
                {tt("admin.products.count", { n: products.length, s: products.length !== 1 ? "s" : "" })}
              </p>
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
                onToggleFeatured={handleToggleFeatured}
                isDeleting={isDeleting}
              />
            )}
          </TabsContent>

          <TabsContent value="orders">
            <div className="mb-6">
              <p className="text-muted-foreground">
                {orders.length} order{orders.length !== 1 ? "s" : ""}
              </p>
            </div>

            {ordersLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            ) : (
              <OrderTable
                orders={orders}
                onUpdateStatus={(orderId, status) => updateOrderStatus({ orderId, status })}
                isUpdating={isUpdatingOrder}
              />
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? t("admin.editproduct") : t("admin.addnewproduct")}
            </DialogTitle>
            <DialogDescription>
              {editingProduct
                ? t("admin.updatedetails")
                : t("admin.filldetails")}
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
            defaultValues={editingProduct || undefined}
            submitLabel={editingProduct ? t("admin.updateproduct") : t("admin.addproduct")}
            isLoading={isAdding || isUpdating}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}