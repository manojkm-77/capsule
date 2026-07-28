"use client";

import { Package } from "lucide-react";
import { motion } from "framer-motion";
import { orders, formatPrice, formatDate } from "@/lib/data";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EmptyState } from "@/components/ui/empty-state";

const statusColors: Record<string, string> = {
  delivered: "text-success bg-success/10",
  shipped: "text-primary bg-primary/10",
  confirmed: "text-muted bg-[#F5F5F5]",
  new: "text-primary bg-primary/5",
  cancelled: "text-sale bg-sale/10",
};

export default function OrdersPage() {
  return (
    <div className="container-caps py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Orders" }]} />
      <h1 className="mt-6 text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight">My Orders</h1>
      <p className="mt-2 text-[14px] text-muted">{orders.length} orders placed</p>

      {orders.length > 0 ? (
        <div className="mt-8 space-y-3">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between rounded-[20px] border border-border p-5"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#F5F5F5]">
                  <Package className="h-5 w-5 text-muted" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-[14px] font-medium">{order.product}</p>
                  <p className="text-[12px] text-muted">{order.id} &middot; {formatDate(order.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[14px] font-semibold">{formatPrice(order.amount)}</span>
                <p className={`mt-0.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${statusColors[order.status] || "text-muted bg-[#F5F5F5]"}`}>
                  {order.status}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Package className="h-16 w-16" strokeWidth={1.8} />}
          title="No orders yet"
          description="Your order history will appear here."
          action={{ label: "Start Shopping", href: "/shop" }}
        />
      )}
    </div>
  );
}
