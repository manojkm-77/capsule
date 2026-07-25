"use client";

import Link from "next/link";

export function Footer() {
  const links = {
    Shop: [
      { href: "/shop", label: "All Products" },
      { href: "/shop?category=fitted", label: "Fitted" },
      { href: "/shop?category=snapback", label: "Snapbacks" },
      { href: "/shop?category=dad-hat", label: "Dad Hats" },
    ],
    Company: [
      { href: "/about", label: "About" },
      { href: "/community", label: "Community" },
      { href: "/contact", label: "Contact" },
    ],
    Support: [
      { href: "/#faq", label: "FAQ" },
      { href: "/contact", label: "Shipping" },
      { href: "/contact", label: "Returns" },
    ],
    Social: [
      { href: "#", label: "Instagram" },
      { href: "#", label: "Twitter" },
      { href: "#", label: "YouTube" },
    ],
  };

  return (
    <footer className="border-t border-white/5 bg-dark/50">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="font-display text-2xl tracking-wider">
              CAPSULE<span className="text-lime">.</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/40">
              Premium caps for the culture. Stitched not printed. Based in Bengaluru, India.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={waLink("Hey CAPSULE!")}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 rounded-full bg-lime px-5 py-3 text-[0.7rem] font-bold uppercase tracking-wider text-dark transition-all hover:bg-lime/80"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-4 font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white/30">
                {title}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-white/50 transition-colors hover:text-stitch"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/5 px-6 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-[0.7rem] text-white/30 md:flex-row">
          <p>© 2026 CAPSULE. All rights reserved.</p>
          <p>Bengaluru, India — Fitted, not basic.</p>
        </div>
      </div>
    </footer>
  );
}

function waLink(text: string) {
  return `https://wa.me/919999999999?text=${encodeURIComponent(text)}`;
}
