"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import Link from "next/link";
import { Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { drops } from "@/lib/data";

const STATUS_MAP: Record<string, { label: string; className: string }> = {
  live: { label: "Live", className: "bg-lime text-dark" },
  sold_out: { label: "Sold Out", className: "bg-white/5 text-white/50" },
  upcoming: { label: "Upcoming", className: "bg-lime/10 text-lime border border-lime/20" },
};

export function FeaturedDrop() {
  return (
    <section id="drops" className="relative overflow-hidden py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ScrollReveal className="mb-10 sm:mb-16 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime/20 bg-lime/5 px-4 py-1.5">
            <Clock className="h-3 w-3 text-lime" />
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-lime">
              Drops
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tight">
            Limited
            <br />
            <span className="text-lime">Drops</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-4">
          {drops.map((drop, i) => {
            const status = STATUS_MAP[drop.status] || STATUS_MAP.upcoming;
            return (
              <ScrollReveal key={drop.id} delay={i * 0.1}>
                <div className="group flex flex-col gap-4 rounded-3xl border border-white/5 bg-card/30 p-5 sm:p-8 transition-all hover:border-white/10 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-6">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/5 bg-dark text-2xl font-bold text-lime">
                      {drop.number}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{drop.title}</h3>
                      <p className="mt-1 text-sm text-white/40">{drop.description}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <span
                          className={`rounded-full px-3 py-1 font-mono text-[0.55rem] font-bold uppercase tracking-wider ${status.className}`}
                        >
                          {status.label}
                        </span>
                        <span className="font-mono text-[0.65rem] text-white/20">{drop.date}</span>
                      </div>
                    </div>
                  </div>
                  {drop.status === "live" && (
                    <Link
                      href="/shop"
                      className="flex items-center gap-2 self-start rounded-full bg-lime px-5 sm:px-6 py-2.5 sm:py-3 text-[0.65rem] sm:text-[0.7rem] font-bold uppercase tracking-wider text-dark transition-all hover:bg-lime/80 sm:self-center"
                    >
                      Shop Drop
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                  {drop.status === "upcoming" && (
                    <div className="flex items-center gap-2 self-start rounded-full border border-lime/20 px-5 sm:px-6 py-2.5 sm:py-3 text-[0.65rem] sm:text-[0.7rem] font-bold uppercase tracking-wider text-lime sm:self-center">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      Notify Me
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
