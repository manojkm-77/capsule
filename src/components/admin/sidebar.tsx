"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Package, ShoppingCart, Users, Tag, Percent, BarChart3,
  Image, FileText, Settings, Bell, Shield, Layers, Megaphone,
  Star, ClipboardList, ChevronLeft, PanelRightOpen,
} from "lucide-react";
import { useState } from "react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: Layers },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/inventory", label: "Inventory", icon: ClipboardList },
  { href: "/admin/coupons", label: "Coupons", icon: Percent },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/drops", label: "Drops", icon: Megaphone },
  { href: "/admin/media", label: "Media", icon: Image },
  { href: "/admin/banners", label: "Banners", icon: PanelRightOpen },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/users", label: "Users", icon: Shield },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile header */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-white/5 bg-dark/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/admin" className="font-display text-lg">
          CAPSULE<span className="text-lime">.</span>
        </Link>
        <Link
          href="/"
          className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[0.55rem] uppercase tracking-wider text-white/50"
        >
          View Store
        </Link>
      </div>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-white/5 bg-card transition-all duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/5 p-5">
          {!collapsed && (
            <Link href="/admin" className="font-display text-xl">
              CAPSULE<span className="text-lime">.</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-full p-2 text-white/30 hover:text-stitch hidden lg:block"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          {NAV.map((item) => {
            const active = item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all mb-0.5",
                  active
                    ? "bg-lime text-dark shadow-lg shadow-lime/20"
                    : "text-white/40 hover:bg-white/5 hover:text-stitch",
                  collapsed && "justify-center px-0"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/5 p-4">
          {!collapsed && (
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-[0.6rem] font-bold uppercase tracking-wider text-white/50 transition-all hover:border-white/30 hover:text-stitch"
            >
              View Storefront
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
