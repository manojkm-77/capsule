"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { toast } from "@/components/ui/toaster";

interface Order {
  id: string;
  orderId: string;
  customer: string;
  handle: string;
  product: string;
  amount: number;
  status: string;
  date: string;
}

const statusColors: Record<string, string> = {
  new: "bg-lime/15 text-lime",
  confirmed: "bg-white/5 text-white/50",
  shipped: "bg-white/5 text-white/50",
  delivered: "bg-lime/15 text-lime",
  cancelled: "bg-white/5 text-white/30",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    setOrders(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/orders", {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }),
    });
    toast(`Order ${status}`);
    fetchOrders();
  };

  return (
    <div>
      <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Orders</span>
      <h1 className="mt-2 font-display text-3xl">All Orders ({orders.length})</h1>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="mt-8 overflow-hidden rounded-2xl border border-white/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 bg-card/80">
              {["Order ID", "Customer", "Product", "Amount", "Status", "Date"].map((h) => (
                <th key={h} className="px-5 py-4 text-left font-mono text-[0.55rem] font-bold uppercase tracking-wider text-white/30">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-white/30">Loading...</td></tr>
            ) : orders.map((o, i) => (
              <motion.tr key={o.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="border-b border-white/5 transition-colors hover:bg-white/[0.02]">
                <td className="px-5 py-4 font-mono text-xs text-white/40">{o.orderId}</td>
                <td className="px-5 py-4">
                  <p className="font-medium">{o.customer}</p>
                  <p className="font-mono text-[0.6rem] text-white/30">{o.handle}</p>
                </td>
                <td className="px-5 py-4 text-white/60">{o.product}</td>
                <td className="px-5 py-4 font-mono text-lime">{formatPrice(o.amount)}</td>
                <td className="px-5 py-4">
                  <select value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}
                    className={`rounded-full px-3 py-1 font-mono text-[0.5rem] font-bold outline-none ${statusColors[o.status] || statusColors.new}`}>
                    {["new", "confirmed", "shipped", "delivered", "cancelled"].map((s) => (
                      <option key={s} value={s} className="bg-dark text-stitch">{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-5 py-4 font-mono text-xs text-white/30">{new Date(o.date).toLocaleDateString()}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
