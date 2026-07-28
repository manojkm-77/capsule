"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = {
  Shop: [
    { href: "/shop", label: "All Products" },
    { href: "/collections/fitted", label: "Fitted Caps" },
    { href: "/collections/snapback", label: "Snapbacks" },
    { href: "/collections/dad-hat", label: "Dad Hats" },
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/shop?sale=true", label: "Sale" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/community", label: "Community" },
  ],
  Support: [
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Shipping & Returns" },
    { href: "/contact", label: "Size Guide" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="container-caps py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-bold tracking-tight text-primary">
              CAPS<span className="text-primary/60">ULE</span>
            </Link>
            <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-muted">
              Premium headwear crafted for those who value quality, fit, and design. Every piece is made with care and attention to detail.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener"
                  className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-border text-muted hover:text-primary hover:border-primary transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                {title}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[14px] text-muted transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-border pt-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h4 className="text-[15px] font-semibold">Stay in the loop</h4>
              <p className="mt-1 text-[13px] text-muted">
                Subscribe for exclusive drops, early access, and 10% off your first order.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input placeholder="Enter your email" type="email" />
              </div>
              <Button>
                Subscribe
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-caps flex flex-col items-center justify-between gap-4 py-6 text-[12px] text-muted sm:flex-row">
          <p>&copy; 2026 CAPSULE. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
