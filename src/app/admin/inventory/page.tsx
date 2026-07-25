"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/data";
import { AlertTriangle, CheckCircle } from "lucide-react";

export default function AdminInventoryPage() {
  return (
    <div>
      <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Inventory</span>
      <h1 className="mt-2 font-display text-3xl">Stock Management</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-card p-6">
          <p className="text-2xl font-bold text-lime">{products.filter((p) => p.stock > 10).length}</p>
          <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-wider text-white/30">Well Stocked</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-card p-6">
          <p className="text-2xl font-bold text-lime">{products.filter((p) => p.stock > 0 && p.stock <= 10).length}</p>
          <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-wider text-white/30">Low Stock</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-card p-6">
          <p className="text-2xl font-bold text-white/30">{products.filter((p) => p.stock <= 0).length}</p>
          <p className="mt-1 font-mono text-[0.55rem] uppercase tracking-wider text-white/30">Out of Stock</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {products.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-card/50 p-5"
          >
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl" style={{ background: `linear-gradient(135deg, ${p.color}, #0B0B0B)` }} />
              <div>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="font-mono text-[0.55rem] text-white/30">SKU: CAP-{String(p.id).padStart(3, "0")}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/30 hover:text-stitch">-</button>
                <span className="w-8 text-center font-mono text-sm">{p.stock}</span>
                <button className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/30 hover:text-stitch">+</button>
              </div>
              {p.stock <= 3 ? <AlertTriangle className="h-4 w-4 text-lime" /> : <CheckCircle className="h-4 w-4 text-lime" />}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
