"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { MapPin, Scissors, Shield, PenTool, Camera, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const STATS = [
  { icon: Scissors, value: "5,000+", label: "Caps Stitched" },
  { icon: MapPin, value: "25+", label: "Cities Delivered" },
  { icon: Shield, value: "99%", label: "Positive Feedback" },
  { icon: PenTool, value: "50+", label: "5-Star Reviews" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 sm:mb-20 max-w-3xl"
      >
        <span className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-lime">
          About
        </span>
        <h1 className="mt-4 font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.85] tracking-tight">
          Built in
          <br />
          <span className="text-lime">Bengaluru.</span>
          <br />
          Worn Everywhere.
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-white/40">
          CAPSULE started with a simple idea — make caps that actually fit, actually last, and
          actually look good. No dropshipping, no print-on-demand. Every piece is designed,
          sampled, and stitched with partner workshops in India.
        </p>
      </motion.div>

      <div className="mb-12 sm:mb-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-3xl border border-white/5 bg-card/50 p-8 text-center transition-all hover:border-lime/10"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-lime/20 bg-lime/5">
              <stat.icon className="h-5 w-5 text-lime" />
            </div>
            <p className="font-display text-3xl text-lime">{stat.value}</p>
            <p className="mt-2 text-xs text-white/40">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <ScrollReveal>
          <div className="rounded-3xl border border-white/5 bg-card/50 p-6 sm:p-10">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">
              Our <span className="text-lime">Process</span>
            </h2>
            <div className="mt-6 space-y-5">
              {[
                { step: "01", title: "Design", desc: "Every cap starts as a sketch. We obsess over proportions, stitch density, and fabric feel." },
                { step: "02", title: "Sample", desc: "We work with partner workshops to build samples. Fit, finish, and feel get tested before production." },
                { step: "03", title: "Drop", desc: "Limited quantities, no restocks. Each drop is intentional — once it's gone, it's gone." },
              ].map((item) => (
                <div key={item.step} className="flex gap-5">
                  <span className="font-mono text-lg font-bold text-lime">{item.step}</span>
                  <div>
                    <h3 className="text-sm font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-white/40">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="rounded-3xl border border-white/5 bg-card/50 p-6 sm:p-10">
            <h2 className="font-display text-2xl sm:text-3xl tracking-tight">
              Join the <span className="text-lime">Community</span>
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/40">
              Follow us on Instagram for drop previews, community spotlights, and behind-the-scenes
              from the workshop. Tag us for a feature.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="#"
                className="flex items-center gap-3 rounded-2xl border border-white/5 p-4 transition-colors hover:bg-white/5"
              >
                <Camera className="h-5 w-5 text-lime" />
                <span className="text-sm font-medium">@capsule.caps</span>
                <ArrowRight className="ml-auto h-4 w-4 text-white/30" />
              </Link>
              <Link
                href={waLink("Hey CAPSULE!")}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 rounded-2xl border border-white/5 p-4 transition-colors hover:bg-white/5"
              >
                <MessageCircle className="h-5 w-5 text-lime" />
                <span className="text-sm font-medium">Chat on WhatsApp</span>
                <ArrowRight className="ml-auto h-4 w-4 text-white/30" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

function waLink(text: string) {
  return `https://wa.me/918088145310?text=${encodeURIComponent(text)}`;
}
