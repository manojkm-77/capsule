"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ScrollReveal className="mb-10 sm:mb-16 max-w-2xl">
          <span className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-lime">
            Testimonials
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tight">
            What Our
            <br />
            <span className="text-lime">Community Says</span>
          </h2>
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.id} delay={i * 0.08}>
              <div className="group rounded-3xl border border-white/5 bg-card/50 p-5 sm:p-8 transition-all hover:border-lime/10 hover:bg-lime/[0.02]">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`h-3.5 w-3.5 ${
                        idx < t.rating ? "text-lime fill-lime" : "text-white/10"
                      }`}
                    />
                  ))}
                </div>
                <p className="mb-6 text-sm leading-relaxed text-white/70">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/5 bg-card text-[0.55rem] font-bold text-lime">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-white/30">
                      {t.handle} · {t.location}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
