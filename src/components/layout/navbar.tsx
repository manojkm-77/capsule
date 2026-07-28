"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "/shop?sort=popular", label: "Best Sellers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
        "sticky top-0 z-40 h-[80px] transition-all duration-200",
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container-caps flex h-full items-center justify-between">
        <Link href="/" className="relative z-10">
          <span className="text-lg font-bold tracking-tight text-primary">
            CAPSULE
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[10px] px-4 py-2 text-[13px] font-medium text-muted transition-colors hover:text-primary hover:bg-secondary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-0.5">
          <button
            onClick={() => setSearchOpen(true)}
            className="rounded-[10px] p-2.5 text-muted hover:text-primary hover:bg-secondary transition-all"
            aria-label="Search"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </button>
          <Link
            href="/wishlist"
            className="hidden rounded-[10px] p-2.5 text-muted hover:text-primary hover:bg-secondary transition-all sm:block"
            aria-label="Wishlist"
          >
            <Heart className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </Link>
          <Link
            href="/cart"
            className="hidden rounded-[10px] p-2.5 text-muted hover:text-primary hover:bg-secondary transition-all sm:block"
            aria-label="Cart"
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            href="/login"
            className="hidden rounded-[10px] p-2.5 text-muted hover:text-primary hover:bg-secondary transition-all sm:block"
            aria-label="Account"
          >
            <User className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="relative rounded-[10px] p-2.5 text-muted hover:text-primary hover:bg-secondary transition-all sm:hidden"
            aria-label="Cart"
          >
            <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.8} />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-[10px] p-2.5 text-primary hover:bg-secondary transition-all lg:hidden"
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
            className="fixed inset-0 top-[80px] z-30 bg-white lg:hidden"
          >
            <nav className="container-caps flex flex-col gap-1 py-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-[10px] px-4 py-3 text-[15px] text-primary hover:bg-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex items-center gap-4 border-t border-border pt-6">
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
