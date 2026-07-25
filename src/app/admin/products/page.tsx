"use client";

import { motion } from "framer-motion";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Products</span>
          <h1 className="mt-2 font-display text-3xl">All Products ({products.length})</h1>
        </div>
        <button className="rounded-full bg-lime px-6 py-3 text-[0.65rem] font-bold uppercase tracking-wider text-dark transition-all hover:bg-lime/90">
          + Add Product
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 overflow-hidden rounded-2xl border border-white/5"
      >
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 bg-card/80">
              {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                <th key={h} className="px-5 py-4 text-left font-mono text-[0.55rem] font-bold uppercase tracking-wider text-white/30">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <motion.tr
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-white/5 transition-colors hover:bg-white/[0.02]"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 shrink-0 rounded-xl" style={{ background: `linear-gradient(135deg, ${p.color}, #0B0B0B)` }} />
                    <span className="font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-white/40">{p.category}</td>
                <td className="px-5 py-4 font-mono text-lime">{formatPrice(p.price)}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-3 py-1 font-mono text-[0.5rem] font-bold ${
                    p.stock <= 0 ? "bg-white/5 text-white/30" :
                    p.stock <= 3 ? "bg-lime/15 text-lime" :
                    "bg-white/5 text-white/50"
                  }`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-lime/15 px-3 py-1 font-mono text-[0.5rem] font-bold text-lime">
                    Active
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button className="rounded-full p-2 text-white/30 hover:text-stitch"><Eye className="h-4 w-4" /></button>
                    <button className="rounded-full p-2 text-white/30 hover:text-lime"><Edit className="h-4 w-4" /></button>
                    <button className="rounded-full p-2 text-white/30 hover:text-white/60"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
