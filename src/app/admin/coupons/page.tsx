"use client";

import { motion } from "framer-motion";
import { Percent, Edit, Trash2 } from "lucide-react";

const coupons = [
  { code: "WELCOME10", discount: "10% OFF", min: "₹999", usage: 45, expires: "2026-12-31", active: true },
  { code: "DROP004", discount: "15% OFF", min: "₹1,499", usage: 23, expires: "2026-08-15", active: true },
  { code: "FREESHIP", discount: "Free Shipping", min: "₹999", usage: 78, expires: "2026-12-31", active: true },
  { code: "FLAT500", discount: "₹500 OFF", min: "₹2,499", usage: 12, expires: "2026-09-30", active: false },
];

export default function AdminCouponsPage() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Coupons</span>
          <h1 className="mt-2 font-display text-3xl">Discount Codes</h1>
        </div>
        <button className="rounded-full bg-lime px-6 py-3 text-[0.65rem] font-bold uppercase tracking-wider text-dark transition-all hover:bg-lime/90">
          + New Coupon
        </button>
      </div>

      <div className="mt-8 space-y-3">
        {coupons.map((c, i) => (
          <motion.div
            key={c.code}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-wrap items-center gap-6 rounded-2xl border border-white/5 bg-card p-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime/10">
              <Percent className="h-5 w-5 text-lime" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <code className="rounded-lg bg-dark px-3 py-1 font-mono text-sm font-bold text-lime">{c.code}</code>
                <span className={`rounded-full px-3 py-1 font-mono text-[0.5rem] font-bold ${c.active ? "bg-lime/15 text-lime" : "bg-white/5 text-white/30"}`}>
                  {c.active ? "Active" : "Expired"}
                </span>
              </div>
              <p className="mt-2 font-mono text-[0.6rem] text-white/30">
                {c.discount} · Min: {c.min} · {c.usage} uses · Expires: {c.expires}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-full border border-white/10 p-2.5 text-white/30 hover:text-lime"><Edit className="h-4 w-4" /></button>
              <button className="rounded-full border border-white/10 p-2.5 text-white/30"><Trash2 className="h-4 w-4" /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
