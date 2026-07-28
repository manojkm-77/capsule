"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  {
    label: "Collections",
    children: [
      { href: "/collections/fitted", label: "Fitted Caps" },
      { href: "/collections/snapback", label: "Snapbacks" },
      { href: "/collections/dad-hat", label: "Dad Hats" },
      { href: "/collections/limited", label: "Limited Edition" },
    ],
  },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/shop?sale=true", label: "Sale" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const { cart, setCartOpen, setSearchOpen } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 h-[84px] transition-all duration-300",
        scrolled
          ? "bg-secondary/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="container-caps flex h-full items-center justify-between">
        <Link href="/" className="relative z-10">
          <span className="text-xl font-bold tracking-tight text-primary">
            CAPS<span className="text-primary/60">ULE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            if ("children" in link) {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(link.label)}
                  onMouseLeave={() => setMegaOpen(null)}
                >
                  <button className="flex items-center gap-1 rounded-[14px] px-4 py-2 text-[13px] font-medium text-muted transition-colors hover:text-primary hover:bg-[#F5F5F5]">
                    {link.label}
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <AnimatePresence>
                    {megaOpen === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-2 w-56 rounded-[20px] bg-secondary border border-border shadow-lg p-2"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-[14px] px-4 py-2.5 text-[13px] text-muted hover:text-primary hover:bg-[#F5F5F5] transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-[14px] px-4 py-2 text-[13px] font-medium text-muted transition-colors hover:text-primary hover:bg-[#F5F5F5]"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(true)}
            className="rounded-[14px] p-2.5 text-muted hover:text-primary hover:bg-[#F5F5F5] transition-all"
            aria-label="Search"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </button>
          <Link
            href="/wishlist"
            className="hidden rounded-[14px] p-2.5 text-muted hover:text-primary hover:bg-[#F5F5F5] transition-all sm:block"
            aria-label="Wishlist"
          >
            <Heart className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </Link>
          <Link
            href="/login"
            className="hidden rounded-[14px] p-2.5 text-muted hover:text-primary hover:bg-[#F5F5F5] transition-all sm:block"
            aria-label="Account"
          >
            <User className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="relative rounded-[14px] p-2.5 text-muted hover:text-primary hover:bg-[#F5F5F5] transition-all"
            aria-label="Cart"
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary text-[10px] font-bold text-secondary">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-[14px] p-2.5 text-primary hover:bg-[#F5F5F5] transition-all lg:hidden"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-[18px] w-[18px]" strokeWidth={1.8} /> : <Menu className="h-[18px] w-[18px]" strokeWidth={1.8} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[84px] z-30 bg-secondary lg:hidden"
          >
            <nav className="container-caps flex flex-col gap-1 py-6">
              {NAV_LINKS.map((link) => {
                if ("children" in link) {
                  return (
                    <div key={link.label} className="space-y-1">
                      <span className="block px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                        {link.label}
                      </span>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMenuOpen(false)}
                          className="block rounded-[14px] px-4 py-3 text-[15px] text-primary hover:bg-[#F5F5F5] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-[14px] px-4 py-3 text-[15px] text-primary hover:bg-[#F5F5F5] transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="mt-4 flex items-center gap-3 border-t border-border pt-6">
                <Link href="/wishlist" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-[14px] text-muted">
                  <Heart className="h-4 w-4" strokeWidth={1.8} /> Wishlist
                </Link>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-[14px] text-muted">
                  <User className="h-4 w-4" strokeWidth={1.8} /> Sign In
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
