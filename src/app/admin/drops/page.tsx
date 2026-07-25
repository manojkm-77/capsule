"use client";

import { motion } from "framer-motion";
import { drops } from "@/lib/data";

export default function AdminDropsPage() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Drops</span>
          <h1 className="mt-2 font-display text-3xl">Drop Schedule</h1>
        </div>
        <button className="rounded-full bg-lime px-6 py-3 text-[0.65rem] font-bold uppercase tracking-wider text-dark transition-all hover:bg-lime/90">
          + Schedule Drop
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {drops.map((drop, i) => (
          <motion.div
            key={drop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-white/5 bg-card p-6 transition-colors hover:border-white/10"
          >
            <div className="flex flex-wrap items-center gap-6">
              <div className="font-display text-3xl text-white/10">{String(drop.number).padStart(2, "0")}</div>
              <div className="flex-1">
                <h3 className="text-sm font-bold">{drop.title}</h3>
                <p className="mt-1 text-xs text-white/40">{drop.description}</p>
                <p className="mt-1.5 font-mono text-[0.6rem] text-white/20">Release: {new Date(drop.date).toLocaleDateString()}</p>
              </div>
              <span className={`rounded-full px-4 py-2 font-mono text-[0.55rem] font-bold uppercase tracking-wider ${
                drop.status === "live" ? "bg-lime/15 text-lime" :
                drop.status === "sold_out" ? "bg-white/5 text-white/30" :
                "bg-white/5 text-white/50"
              }`}>
                {drop.status === "upcoming" ? "Upcoming" : drop.status === "live" ? "Live" : "Sold out"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
