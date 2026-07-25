"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function GenZHero() {
  return (
    <section className="relative flex min-h-[85vh] sm:min-h-[90vh] flex-col justify-between overflow-hidden bg-dark px-4 sm:px-6 pb-8 sm:pb-12 pt-20 sm:pt-24 text-stitch">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-lime/10 blur-[140px]" />

      <div className="mx-auto flex w-full max-w-7xl items-center justify-between mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3 py-1.5 backdrop-blur-md">
          <span className="h-2 w-2 animate-ping rounded-full bg-lime" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-lime">
            Drop 04 — Aug 01 @ 8:00 PM IST
          </span>
        </div>
        <span className="hidden font-mono text-xs uppercase tracking-widest text-muted sm:block">
          Bengaluru, IN • 12.9716° N
        </span>
      </div>

      <div className="z-10 mx-auto my-auto w-full max-w-7xl">
        <h1 className="mb-4 sm:mb-6 text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.88] tracking-tighter">
          STITCHED <br />
          <span className="bg-gradient-to-r from-lime via-stitch to-muted bg-clip-text text-transparent">
            NOT PRINTED.
          </span>
        </h1>

        <div className="mt-6 sm:mt-8 flex flex-col items-start justify-between gap-6 sm:gap-8 md:flex-row md:items-end">
          <p className="max-w-md text-base sm:text-lg font-medium leading-relaxed text-muted">
            No cart, no checkout, zero bloat. DM directly to cop limited-run
            fitteds &amp; snapbacks built for the culture.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={waLink()}
              target="_blank"
              rel="noopener"
              className="flex items-center gap-3 bg-lime px-8 py-4 text-sm font-black uppercase tracking-wider text-dark shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] transition-all hover:scale-[1.02] hover:bg-stitch active:scale-[0.98]"
            >
              <MessageCircle className="h-5 w-5" />
              <span>DM to Cop on WhatsApp</span>
              <span className="text-lg">→</span>
            </Link>
            <Link
              href="/#drops"
              className="border border-zinc-700 bg-zinc-900/50 px-8 py-4 text-sm font-bold uppercase tracking-wider text-stitch transition-all hover:border-white"
            >
              View Drops
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 w-full overflow-hidden border-y border-zinc-800 bg-black/40 py-3 backdrop-blur-sm">
        <div className="flex animate-marquee gap-8 whitespace-nowrap font-mono text-xs font-bold uppercase tracking-widest text-muted">
          <span>◆ BENGALURU STREETWEAR</span>
          <span>◆ NO CART • NO CHECKOUT</span>
          <span>◆ PAN INDIA SHIPPING</span>
          <span>◆ LIMITED UNITS ONLY</span>
          <span>◆ BENGALURU STREETWEAR</span>
          <span>◆ NO CART • NO CHECKOUT</span>
        </div>
      </div>
    </section>
  );
}

function waLink() {
  return "https://wa.me/918088145310?text=Hey! I want to cop from CAPSULE";
}
