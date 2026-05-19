import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { menuItems } from "@/data/menu";
import type { ProductFormValues } from "@/types/admin";

const STORAGE_KEY = "pattys.admin.products";

function getStoredProducts(): ProductFormValues[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as ProductFormValues[];
    } catch {
      return [];
    }
  }
  return [];
}

function setStoredProducts(products: ProductFormValues[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
}

function initializeProducts(): ProductFormValues[] {
  const existing = getStoredProducts();
  if (existing.length > 0) {
    return existing;
  }
  const products: ProductFormValues[] = menuItems.map((item) => ({
    id: item.id,
    category: item.category,
    image: typeof item.image === "string" ? item.image : "",
    price: item.price,
    name: item.name,
    description: item.description,
    featured: item.featured || false,
    variants: item.variants || [],
  }));
  setStoredProducts(products);
  return products;
}

export function useAdminProducts() {
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => initializeProducts(),
    staleTime: Infinity,
  });

  const addMutation = useMutation({
    mutationFn: async (newProduct: ProductFormValues) => {
      const current = getStoredProducts();
      const updated = [...current, newProduct];
      setStoredProducts(updated);
      return newProduct;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedProduct: ProductFormValues) => {
      const current = getStoredProducts();
      const updated = current.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      setStoredProducts(updated);
      return updatedProduct;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (productId: string) => {
      const current = getStoredProducts();
      const updated = current.filter((p) => p.id !== productId);
      setStoredProducts(updated);
      return productId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
  });

  return {
    products,
    isLoading,
    addProduct: addMutation.mutate,
    updateProduct: updateMutation.mutate,
    deleteProduct: deleteMutation.mutate,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}