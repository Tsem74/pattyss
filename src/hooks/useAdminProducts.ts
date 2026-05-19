import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabaseClient";
import { menuItems } from "@/data/menu";
import type { ProductFormValues } from "@/types/admin";

const STORAGE_KEY = "pattys.admin.products";

function rowToProduct(row: any): ProductFormValues {
  return {
    id: row.id,
    category: row.category,
    image: row.image,
    price: row.price ?? undefined,
    name: row.name,
    description: row.description,
    featured: row.featured ?? false,
    variants: row.variants ?? [],
  };
}

function toDbRow(p: ProductFormValues) {
  return {
    id: p.id,
    category: p.category,
    image: p.image,
    price: p.price ?? null,
    name: p.name,
    description: p.description,
    featured: p.featured ?? false,
    variants: p.variants ?? [],
    updated_at: new Date().toISOString(),
  };
}

function seedFromMenu(): ProductFormValues[] {
  return menuItems.map((item) => ({
    id: item.id,
    category: item.category,
    image: typeof item.image === "string" ? item.image : "",
    price: item.price,
    name: item.name,
    description: item.description,
    featured: item.featured || false,
    variants: item.variants || [],
  }));
}

function migrateFromLocalStorage(): ProductFormValues[] | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as ProductFormValues[];
  } catch {
    return null;
  }
}

export function useAdminProducts() {
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin", "products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at");

      if (error) throw error;

      if (data && data.length > 0) {
        return data.map(rowToProduct);
      }

      const products = migrateFromLocalStorage() || seedFromMenu();

      const { error: insertError } = await supabase
        .from("products")
        .insert(products.map(toDbRow));

      if (insertError) throw insertError;

      return products;
    },
    staleTime: Infinity,
  });

  const addMutation = useMutation({
    mutationFn: async (newProduct: ProductFormValues) => {
      const { data, error } = await supabase
        .from("products")
        .insert(toDbRow(newProduct))
        .select()
        .single();

      if (error) throw error;
      return rowToProduct(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedProduct: ProductFormValues) => {
      const { error } = await supabase
        .from("products")
        .update(toDbRow(updatedProduct))
        .eq("id", updatedProduct.id);

      if (error) throw error;
      return updatedProduct;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;
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
