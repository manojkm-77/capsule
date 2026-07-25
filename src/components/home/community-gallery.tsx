"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Camera, Image } from "lucide-react";

const GALLERY = [
  { label: "Street Style Bengaluru", user: "@captown" },
  { label: "Night Market Fit", user: "@night.caps" },
  { label: "Rooftop Session", user: "@rooftop.fit" },
  { label: "Mumbai Local Flex", user: "@mumbai.street" },
  { label: "Goa Beach Rotation", user: "@goa.vibes" },
  { label: "Pune Indie Vibe", user: "@pune.stories" },
  { label: "Delhi Cuff Parade", user: "@delhi.street" },
  { label: "Chennai Sunset", user: "@chennai.rotates" },
];

export function CommunityGallery() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ScrollReveal className="mb-10 sm:mb-16 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lime/20 bg-lime/5 px-4 py-1.5">
            <Camera className="h-3 w-3 text-lime" />
            <span className="text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-lime">
              Community
            </span>
          </div>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tight">
            Worn by
            <br />
            <span className="text-lime">You</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {GALLERY.map((item, i) => (
            <ScrollReveal key={item.user} delay={i * 0.05}>
              <div className="group relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl bg-card">
                <div
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, #0B0B0B, #1a1a1a${(i % 3) + 5}, #0D0D0D)`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-5 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="mt-1 text-xs text-white/40">{item.user}</p>
                </div>
                <div className="absolute right-3 top-3 rounded-full bg-lime/20 p-2 backdrop-blur-sm">
                  <Image className="h-4 w-4 text-lime" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
