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
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/hooks/useAdminOrders";
import { Package, Check, X, CookingPot, Truck, RotateCcw } from "lucide-react";

interface OrderTableProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: string) => void;
  isUpdating: boolean;
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  confirmed: "bg-blue-100 text-blue-800 border-blue-300",
  preparing: "bg-orange-100 text-orange-800 border-orange-300",
  ready: "bg-green-100 text-green-800 border-green-300",
  completed: "bg-gray-100 text-gray-500 border-gray-300",
  cancelled: "bg-red-100 text-red-800 border-red-300",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  preparing: "Preparing",
  ready: "Ready",
  completed: "Completed",
  cancelled: "Cancelled",
};

const terminalStatuses = new Set(["completed", "cancelled"]);

function canTransitionFrom(status: string): string[] {
  switch (status) {
    case "pending":
      return ["confirmed", "cancelled"];
    case "confirmed":
      return ["preparing", "cancelled"];
    case "preparing":
      return ["ready", "cancelled"];
    case "ready":
      return ["completed", "cancelled"];
    default:
      return [];
  }
}

function itemsSummary(items: Order["items"]): string {
  if (!items || items.length === 0) return "";
  return items.map((i) => `${i.qty}x ${i.name}`).join(", ");
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("fr-TN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function OrderTable({ orders, onUpdateStatus, isUpdating }: OrderTableProps) {
  const { t, lang } = useI18n();

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">No orders yet</h3>
        <p className="text-sm text-muted-foreground">Orders will appear here when customers place them.</p>
      </div>
    );
  }

  const actionIcon = (next: string) => {
    switch (next) {
      case "confirmed": return <Check className="h-3.5 w-3.5" />;
      case "preparing": return <CookingPot className="h-3.5 w-3.5" />;
      case "ready": return <Truck className="h-3.5 w-3.5" />;
      case "completed": return <RotateCcw className="h-3.5 w-3.5" />;
      case "cancelled": return <X className="h-3.5 w-3.5" />;
      default: return null;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order</TableHead>
            <TableHead className="w-[130px]">Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden md:table-cell">Items</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const nextStatuses = terminalStatuses.has(order.status) ? [] : canTransitionFrom(order.status);
            return (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs font-medium">{order.order_id}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{formatDate(order.created_at)}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{order.name}</span>
                    <span className="text-xs text-muted-foreground">{order.phone}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden max-w-[200px] truncate text-sm md:table-cell">
                  {itemsSummary(order.items)}
                </TableCell>
                <TableCell className="text-right font-semibold">TND {Number(order.subtotal).toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[order.status] || ""}>
                    {statusLabels[order.status] || order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {nextStatuses.length > 0 ? (
                    <div className="flex items-center justify-end gap-1">
                      {nextStatuses.map((next) => (
                        <Button
                          key={next}
                          variant="ghost"
                          size="icon"
                          disabled={isUpdating}
                          onClick={() => onUpdateStatus(order.order_id, next)}
                          title={statusLabels[next] || next}
                          className={next === "cancelled" ? "text-destructive hover:text-destructive" : ""}
                        >
                          {actionIcon(next)}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
