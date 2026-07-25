"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package } from "lucide-react";

const data = [
  { month: "Jan", revenue: 32000, orders: 12, visitors: 340 },
  { month: "Feb", revenue: 28000, orders: 10, visitors: 290 },
  { month: "Mar", revenue: 45000, orders: 18, visitors: 520 },
  { month: "Apr", revenue: 38000, orders: 15, visitors: 480 },
  { month: "May", revenue: 52000, orders: 22, visitors: 680 },
  { month: "Jun", revenue: 49000, orders: 20, visitors: 610 },
];

export default function AnalyticsPage() {
  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const maxOrders = Math.max(...data.map((d) => d.orders));

  return (
    <div>
      <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Analytics</span>
      <h1 className="mt-2 font-display text-3xl">Performance</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Revenue", value: "₹2,45,000", change: "+18.3%", icon: DollarSign, up: true },
          { label: "Order Volume", value: "98", change: "+12.7%", icon: ShoppingCart, up: true },
          { label: "Total Customers", value: "156", change: "+22.4%", icon: Users, up: true },
          { label: "Conversion", value: "3.2%", change: "-0.8%", icon: TrendingDown, up: false },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-white/5 bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <s.icon className="h-4 w-4 text-lime" />
              <span className={`flex items-center gap-1 font-mono text-[0.55rem] font-bold ${s.up ? "text-lime" : "text-white/30"}`}>
                {s.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {s.change}
              </span>
            </div>
            <p className="mt-3 text-xl font-bold">{s.value}</p>
            <p className="font-mono text-[0.55rem] uppercase tracking-wider text-white/30">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/5 bg-card p-6"
        >
          <h2 className="mb-6 text-sm font-bold">Revenue (Last 6 Months)</h2>
          <div className="flex items-end justify-between gap-2" style={{ height: 200 }}>
            {data.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="font-mono text-[0.55rem] text-white/30">₹{(d.revenue / 1000).toFixed(0)}k</span>
                <div
                  className="w-full rounded-t-lg bg-lime/80 transition-all hover:bg-lime"
                  style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                />
                <span className="font-mono text-[0.5rem] text-white/30">{d.month}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl border border-white/5 bg-card p-6"
        >
          <h2 className="mb-6 text-sm font-bold">Orders (Last 6 Months)</h2>
          <div className="flex items-end justify-between gap-2" style={{ height: 200 }}>
            {data.map((d) => (
              <div key={d.month} className="flex flex-1 flex-col items-center gap-2">
                <span className="font-mono text-[0.55rem] text-white/30">{d.orders}</span>
                <div
                  className="w-full rounded-t-lg bg-lime/80 transition-all hover:bg-lime"
                  style={{ height: `${(d.orders / maxOrders) * 100}%` }}
                />
                <span className="font-mono text-[0.5rem] text-white/30">{d.month}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
