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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Order } from "@/hooks/useAdminOrders";
import {
  Package,
  Clock,
  Check,
  X,
  CookingPot,
  Truck,
  RotateCcw,
  ChevronDown,
  ChevronRight,
  Archive,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface OrderTableProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: string) => void;
  isUpdating: boolean;
}

const FINISHED = new Set(["completed", "cancelled"]);

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200",
  preparing: "bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200",
  ready: "bg-green-100 text-green-800 border-green-300 hover:bg-green-200",
  completed: "bg-gray-100 text-gray-500 border-gray-300 hover:bg-gray-200",
  cancelled: "bg-red-100 text-red-800 border-red-300 hover:bg-red-200",
};

interface StatusOption {
  value: string;
  icon: LucideIcon;
  labelKey: string;
}

const STATUS_OPTIONS: StatusOption[] = [
  { value: "pending", icon: Clock, labelKey: "admin.order.status.pending" },
  { value: "confirmed", icon: Check, labelKey: "admin.order.status.confirmed" },
  { value: "preparing", icon: CookingPot, labelKey: "admin.order.status.preparing" },
  { value: "ready", icon: Truck, labelKey: "admin.order.status.ready" },
  { value: "completed", icon: RotateCcw, labelKey: "admin.order.status.completed" },
  { value: "cancelled", icon: X, labelKey: "admin.order.status.cancelled" },
];

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

function StatusDropdown({
  order,
  onUpdateStatus,
  isUpdating,
  t,
}: {
  order: Order;
  onUpdateStatus: (orderId: string, status: string) => void;
  isUpdating: boolean;
  t: (key: string) => string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={isUpdating}
          className={`gap-1.5 font-medium ${statusColors[order.status] || ""}`}
        >
          {(() => {
            const opt = STATUS_OPTIONS.find((s) => s.value === order.status);
            if (opt) {
              const Icon = opt.icon;
              return <Icon className="h-3.5 w-3.5" />;
            }
            return null;
          })()}
          <span>{t(STATUS_OPTIONS.find((s) => s.value === order.status)?.labelKey || order.status)}</span>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px]">
        {STATUS_OPTIONS.map((s) => {
          const Icon = s.icon;
          return (
            <DropdownMenuItem
              key={s.value}
              disabled={s.value === order.status || isUpdating}
              onClick={() => onUpdateStatus(order.order_id, s.value)}
              className="gap-2"
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1">{t(s.labelKey)}</span>
              {s.value === order.status && <Check className="h-3.5 w-3.5 text-primary" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function OrderTableSection({
  orders,
  onUpdateStatus,
  isUpdating,
  t,
}: {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: string) => void;
  isUpdating: boolean;
  t: (key: string) => string;
}) {
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
            <TableHead className="w-[180px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
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
                <StatusDropdown order={order} onUpdateStatus={onUpdateStatus} isUpdating={isUpdating} t={t} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function OrderTable({ orders, onUpdateStatus, isUpdating }: OrderTableProps) {
  const { t } = useI18n();

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

  const activeOrders = orders.filter((o) => !FINISHED.has(o.status));
  const completedOrders = orders.filter((o) => FINISHED.has(o.status));

  return (
    <div className="space-y-8">
      {/* Active orders */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Package className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-semibold">{t("admin.order.active")}</h3>
          <span className="text-sm text-muted-foreground">({activeOrders.length})</span>
        </div>
        {activeOrders.length > 0 ? (
          <OrderTableSection
            orders={activeOrders}
            onUpdateStatus={onUpdateStatus}
            isUpdating={isUpdating}
            t={t}
          />
        ) : (
          <div className="py-8 text-center text-sm italic text-muted-foreground">No active orders</div>
        )}
      </section>

      {/* Completed / cancelled orders */}
      <Collapsible>
        <div className="flex items-center gap-2">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="group gap-1.5 p-0 font-semibold hover:bg-transparent">
              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
              <Archive className="h-4 w-4 text-muted-foreground" />
              <span>{t("admin.order.completed_section")}</span>
              <span className="text-sm text-muted-foreground">({completedOrders.length})</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-3">
          {completedOrders.length > 0 ? (
            <div className="opacity-60">
              <OrderTableSection
                orders={completedOrders}
                onUpdateStatus={onUpdateStatus}
                isUpdating={isUpdating}
                t={t}
              />
            </div>
          ) : (
            <div className="py-8 text-center text-sm italic text-muted-foreground">No completed orders</div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
