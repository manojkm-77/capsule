"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Search", icon: Search, action: "search" as const },
  { href: "/wishlist", label: "Wishlist", icon: Heart },
  { href: "/cart", label: "Cart", icon: ShoppingBag, count: true as const },
  { href: "/account", label: "Profile", icon: User },
];

export function MobileNav() {
  const pathname = usePathname();
  const { cart, setSearchOpen } = useStore();
  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-secondary/80 backdrop-blur-xl lg:hidden safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-1">
        {LINKS.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;

          if (link.action === "search") {
            return (
              <button
                key={link.label}
                onClick={() => setSearchOpen(true)}
                className="flex flex-col items-center gap-0.5 rounded-[14px] px-4 py-2 transition-colors"
              >
                <Icon className="h-5 w-5 text-muted" strokeWidth={1.8} />
                <span className="text-[10px] text-muted">{link.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "relative flex flex-col items-center gap-0.5 rounded-[14px] px-4 py-2 transition-colors",
                isActive ? "text-primary" : "text-muted"
              )}
            >
              <Icon
                className="h-5 w-5"
                strokeWidth={1.8}
                fill={isActive ? "currentColor" : "none"}
              />
              {link.count && cartCount > 0 && (
                <span className="absolute -right-0.5 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-secondary">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
              <span className="text-[10px]">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
