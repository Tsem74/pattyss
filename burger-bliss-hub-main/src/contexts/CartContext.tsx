import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { menuItems, type MenuItem } from "@/data/menu";

export interface CartLine {
  itemId: string;
  qty: number;
  notes?: string;
}

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (itemId: string, qty?: number, notes?: string) => void;
  removeItem: (itemId: string) => void;
  setQty: (itemId: string, qty: number) => void;
  setNotes: (itemId: string, notes: string) => void;
  clear: () => void;
  totalQty: number;
  subtotal: number;
  detailedLines: Array<CartLine & { item: MenuItem; lineTotal: number }>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "pattys.cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [lines, setLines] = useState<CartLine[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as CartLine[]) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // ignore
    }
  }, [lines]);

  const addItem = useCallback((itemId: string, qty = 1, notes?: string) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.itemId === itemId);
      if (existing) {
        return prev.map((l) =>
          l.itemId === itemId ? { ...l, qty: l.qty + qty, notes: notes ?? l.notes } : l,
        );
      }
      return [...prev, { itemId, qty, notes }];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setLines((prev) => prev.filter((l) => l.itemId !== itemId));
  }, []);

  const setQty = useCallback((itemId: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.itemId !== itemId)
        : prev.map((l) => (l.itemId === itemId ? { ...l, qty } : l)),
    );
  }, []);

  const setNotes = useCallback((itemId: string, notes: string) => {
    setLines((prev) => prev.map((l) => (l.itemId === itemId ? { ...l, notes } : l)));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const detailedLines = lines
      .map((line) => {
        // Try to find a top-level menu item matching the line id,
        // otherwise find the parent item that contains the variant id.
        const parentItem =
          menuItems.find((m) => m.id === line.itemId) ||
          menuItems.find((m) => m.variants?.some((v) => v.id === line.itemId));

        if (!parentItem) return null;

        // If this line is for a variant, use the variant price, otherwise use the item's price.
        const variant = parentItem.variants?.find((v) => v.id === line.itemId);
        const unitPrice = variant ? variant.price : parentItem.price ?? 0;

        return { ...line, item: parentItem, lineTotal: unitPrice * line.qty };
      })
      .filter(Boolean) as Array<CartLine & { item: MenuItem; lineTotal: number }>;

    const totalQty = detailedLines.reduce((s, l) => s + l.qty, 0);
    const subtotal = detailedLines.reduce((s, l) => s + l.lineTotal, 0);

    return {
      lines,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((v) => !v),
      addItem,
      removeItem,
      setQty,
      setNotes,
      clear,
      totalQty,
      subtotal,
      detailedLines,
    };
  }, [lines, isOpen, addItem, removeItem, setQty, setNotes, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
