"use client";

import Link from "next/link";
import { Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = {
  Shop: [
    { href: "/shop", label: "All Products" },
    { href: "/collections/fitted", label: "Fitted Caps" },
    { href: "/collections/snapback", label: "Snapbacks" },
    { href: "/collections/baseball", label: "Baseball Caps" },
    { href: "/collections/dad-hat", label: "Dad Hats" },
    { href: "/collections/beanies", label: "Beanies" },
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/shop?sale=true", label: "Sale" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/community", label: "Community" },
    { href: "/blog", label: "Journal" },
  ],
  Support: [
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Shipping & Returns" },
    { href: "/contact", label: "Size Guide" },
    { href: "/contact", label: "Care Instructions" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Cookie Policy" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container-caps py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="text-lg font-bold tracking-tight text-primary">
              CAPSULE
            </Link>
            <p className="mt-3 text-[13px] leading-relaxed text-muted">
              Premium headwear crafted for those who value quality, fit, and design.
            </p>
            <div className="mt-5 flex gap-2">
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
                  className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] border border-border text-muted hover:text-primary hover:border-primary transition-all"
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
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[13px] text-muted transition-colors hover:text-primary"
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
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div>
              <h4 className="text-[14px] font-semibold">Stay in the loop</h4>
              <p className="mt-1 text-[12px] text-muted">
                Subscribe for exclusive drops and early access.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <Input placeholder="Enter your email" type="email" />
              </div>
              <Button size="sm">
                <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-caps flex flex-col items-center justify-between gap-3 py-5 text-[11px] text-muted sm:flex-row">
          <p>&copy; 2026 CAPSULE. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
