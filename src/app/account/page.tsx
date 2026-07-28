"use client";

import { motion } from "framer-motion";
import { Package, Heart, MapPin, Settings, LogOut, CreditCard, Clock } from "lucide-react";
import Link from "next/link";
import { orders, formatPrice, formatDate } from "@/lib/data";

const SIDEBAR = [
  { icon: Package, label: "Orders", href: "/orders", active: true },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: MapPin, label: "Addresses", href: "/addresses" },
  { icon: CreditCard, label: "Payment Methods", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
];

const STATS = [
  { icon: Package, value: "3", label: "Total Orders" },
  { icon: Clock, value: "1", label: "In Transit" },
  { icon: Heart, value: "4", label: "Wishlist" },
];

export default function AccountPage() {
  return (
    <div className="container-caps py-12">
      <div className="grid gap-8 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="sticky top-[100px] rounded-[20px] border border-border p-4">
            <div className="mb-6 px-3 pt-2">
              <p className="font-semibold">John Doe</p>
              <p className="text-[12px] text-muted">john@example.com</p>
            </div>
            <nav className="space-y-1">
              {SIDEBAR.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-[14px] px-3 py-2.5 text-[14px] transition-colors ${
                    item.active ? "bg-[#F5F5F5] font-medium" : "text-muted hover:text-primary hover:bg-[#F5F5F5]"
                  }`}
                >
                  <item.icon className="h-4 w-4" strokeWidth={1.8} />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 border-t border-border pt-4">
              <button className="flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-[14px] text-muted hover:text-primary hover:bg-[#F5F5F5] transition-colors">
                <LogOut className="h-4 w-4" strokeWidth={1.8} /> Sign Out
              </button>
            </div>
          </div>
        </aside>

        <div className="lg:col-span-9">
          <h1 className="text-2xl font-bold tracking-tight">My Account</h1>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[20px] border border-border p-5"
              >
                <stat.icon className="h-5 w-5 text-muted" strokeWidth={1.8} />
                <p className="mt-3 text-2xl font-bold">{stat.value}</p>
                <p className="text-[13px] text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <div className="mt-4 space-y-3">
              {orders.slice(0, 3).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-[16px] border border-border p-4"
                >
                  <div>
                    <p className="text-[14px] font-medium">{order.product}</p>
                    <p className="text-[12px] text-muted">{order.id} &middot; {formatDate(order.date)}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[14px] font-semibold">{formatPrice(order.amount)}</span>
                    <p className="text-[11px] uppercase tracking-wider text-muted">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
