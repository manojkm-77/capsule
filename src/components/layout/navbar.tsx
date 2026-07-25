"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/#drops", label: "Drops" },
  { href: "/#collections", label: "Collections" },
  { href: "/community", label: "Community" },
  { href: "/about", label: "About" },
  { href: "/#faq", label: "FAQ" },
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
        "sticky top-0 z-40 transition-all duration-500",
        scrolled
          ? "bg-dark/90 backdrop-blur-2xl border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="relative z-10">
          <span className="font-display text-2xl tracking-wider">
            CAPSULE<span className="text-lime">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-white/60 transition-colors hover:text-stitch"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setSearchOpen(true)}
            className="rounded-full p-2 text-white/50 transition-colors hover:text-stitch"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <Link
            href="/contact"
            className="hidden rounded-full p-2 text-white/50 transition-colors hover:text-stitch lg:block"
            aria-label="Contact"
          >
            <User className="h-4 w-4" />
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            className="relative rounded-full p-2 text-white/50 transition-colors hover:text-stitch"
            aria-label="Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-lime text-[0.55rem] font-bold text-dark">
                {cartCount}
              </span>
            )}
          </button>
          <Link
            href={waLink("Hey! I want to order from CAPSULE")}
            target="_blank"
            rel="noopener"
            className="hidden rounded-full bg-lime px-5 py-2.5 text-[0.7rem] font-bold uppercase tracking-wider text-dark transition-all hover:bg-lime/80 lg:block"
          >
            Order Now
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full p-2 text-stitch lg:hidden"
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5 bg-dark px-6 pb-8 pt-4 lg:hidden"
          >
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-semibold uppercase tracking-[0.1em] text-white/70 transition-colors hover:text-stitch"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={waLink("Hey! I want to order from CAPSULE")}
                target="_blank"
                rel="noopener"
                className="mt-2 inline-flex w-fit rounded-full bg-lime px-6 py-3 text-[0.7rem] font-bold uppercase tracking-wider text-dark"
                onClick={() => setMenuOpen(false)}
              >
                Order on WhatsApp
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function waLink(text: string) {
  return `https://wa.me/919999999999?text=${encodeURIComponent(text)}`;
}
