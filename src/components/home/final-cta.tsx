"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 py-16 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(215,255,31,0.05),transparent_60%)]" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <ScrollReveal>
          <span className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-lime">
            Let's Go
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tight">
            Ready to
            <br />
            <span className="text-lime">Cop?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/40">
            No cart, no checkout. Just DM us on WhatsApp and we'll sort you out.
            Stitched, limited, yours.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={waLink("Hey! I want to order from CAPSULE")}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 sm:px-8 py-3.5 sm:py-4 text-[0.7rem] sm:text-[0.75rem] font-bold uppercase tracking-wider text-dark transition-all hover:bg-lime/80"
            >
              <MessageCircle className="h-4 w-4" />
              DM to Cop
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 sm:px-8 py-3.5 sm:py-4 text-[0.7rem] sm:text-[0.75rem] font-bold uppercase tracking-wider text-stitch transition-all hover:border-lime/50"
            >
              Browse Collection
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function waLink(text: string) {
  return `https://wa.me/918088145310?text=${encodeURIComponent(text)}`;
}
