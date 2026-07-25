"use client";

import { motion } from "framer-motion";
import { PenTool, Shield, Scissors } from "lucide-react";

const VALUES = [
  {
    icon: Scissors,
    title: "Stitched, Not Printed",
    description: "Every logo is embroidered. No cheap heat transfers, no peeling after a wash.",
  },
  {
    icon: Shield,
    title: "Built to Last",
    description: "Premium fabrics, reinforced brims, and sweat-wicking bands. Wear them every day.",
  },
  {
    icon: PenTool,
    title: "DM to Cop",
    description: "No cart, no checkout, no data mining. Message us, we sort you out — that's it.",
  },
];

export function AboutBrand() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 py-16 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(215,255,31,0.03),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-20 max-w-2xl"
        >
          <span className="font-mono text-[0.55rem] font-bold uppercase tracking-[0.2em] text-lime">
            About
          </span>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] tracking-tight">
            More Than
            <br />
            <span className="text-lime">Just a Cap</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/40">
            CAPSULE is a Bengaluru-based streetwear brand built for the new India.
            Every piece is designed with intent, stitched with care, and dropped in
            limited quantities. No overproduction, no hype — just quality.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-3xl border border-white/5 bg-card/50 p-5 sm:p-8 transition-all hover:border-lime/10 hover:bg-lime/[0.02]"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-lime/20 bg-lime/5">
                <value.icon className="h-5 w-5 text-lime" />
              </div>
              <h3 className="mb-3 text-lg font-semibold">{value.title}</h3>
              <p className="text-sm leading-relaxed text-white/40">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
