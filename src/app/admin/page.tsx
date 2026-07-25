"use client";

import { motion } from "framer-motion";
import { TrendingUp, DollarSign, ShoppingCart, Users, Package, AlertTriangle } from "lucide-react";
import { products, orders } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";

const stats = [
  { label: "Total Revenue", value: "₹2,45,000", change: "+12.5%", icon: DollarSign, up: true },
  { label: "Orders", value: "48", change: "+8.2%", icon: ShoppingCart, up: true },
  { label: "Products", value: "24", change: "+3", icon: Package, up: true },
  { label: "Customers", value: "156", change: "+22.4%", icon: Users, up: true },
];

const recentOrders = orders.slice(0, 5);
const lowStock = products.filter((p) => p.stock <= 3);

export default function AdminDashboard() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">
          Admin
        </span>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">
          Dashboard
        </h1>
      </motion.div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-white/5 bg-card p-6 card-hover"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime/10">
                <s.icon className="h-5 w-5 text-lime" />
              </div>
              <span className={`flex items-center gap-1 font-mono text-[0.6rem] font-bold ${s.up ? "text-lime" : "text-white/30"}`}>
                <TrendingUp className="h-3 w-3" />
                {s.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold">{s.value}</p>
            <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-wider text-white/30">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/5 bg-card p-6 lg:col-span-2"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold">Recent Orders</h2>
            <Link href="/admin/orders" className="font-mono text-[0.55rem] uppercase tracking-wider text-lime hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-dark/50 p-4">
                <div>
                  <p className="text-sm font-medium">{o.customer}</p>
                  <p className="font-mono text-[0.6rem] text-white/30">{o.product} · {formatPrice(o.amount)}</p>
                </div>
                <span className={`rounded-full px-3 py-1 font-mono text-[0.5rem] font-bold uppercase ${
                  o.status === "delivered" ? "bg-lime/15 text-lime" :
                  o.status === "shipped" ? "bg-white/5 text-white/50" :
                  o.status === "confirmed" ? "bg-white/5 text-white/50" :
                  o.status === "cancelled" ? "bg-white/5 text-white/30" :
                  "bg-lime/15 text-lime"
                }`}>
                  {o.status}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="space-y-4"
        >
          <div className="rounded-2xl border border-white/5 bg-card p-6">
            <h2 className="text-sm font-bold">Low Stock Alerts</h2>
            <div className="mt-4 space-y-3">
              {lowStock.map((p) => (
                <div key={p.id} className="flex items-center justify-between gap-2">
                  <span className="text-sm text-white/70">{p.name}</span>
                  <span className="rounded-full bg-lime/15 px-3 py-1 font-mono text-[0.5rem] font-bold text-lime">
                    {p.stock} left
                  </span>
                </div>
              ))}
              {lowStock.length === 0 && (
                <p className="text-sm text-white/30">All products well stocked</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-card p-6">
            <h2 className="text-sm font-bold">Quick Actions</h2>
            <div className="mt-4 space-y-2">
              {[
                { href: "/admin/products", label: "Add Product", icon: Package },
                { href: "/admin/orders", label: "View Orders", icon: ShoppingCart },
                { href: "/admin/coupons", label: "Create Coupon", icon: AlertTriangle },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-dark/50 px-4 py-3 text-sm text-white/60 transition-colors hover:border-lime/30 hover:text-stitch"
                >
                  <action.icon className="h-4 w-4 text-lime" />
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
