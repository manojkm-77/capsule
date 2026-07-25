"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { toast } from "@/components/ui/toaster";

interface Drop {
  id: string;
  number: number;
  title: string;
  description: string;
  status: string;
  date: string;
}

export default function AdminDropsPage() {
  const [drops, setDrops] = useState<Drop[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", status: "upcoming", date: "" });

  const fetchDrops = async () => {
    const res = await fetch("/api/drops");
    setDrops(await res.json());
  };

  useEffect(() => { fetchDrops(); }, []);

  const handleAdd = async () => {
    await fetch("/api/drops", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        ...form, number: drops.length + 1,
      }),
    });
    toast("Drop scheduled");
    setShowForm(false);
    setForm({ title: "", description: "", status: "upcoming", date: "" });
    fetchDrops();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Drops</span>
          <h1 className="mt-2 font-display text-3xl">Drop Schedule</h1>
        </div>
        <button onClick={() => setShowForm(true)}
          className="rounded-full bg-lime px-6 py-3 text-[0.65rem] font-bold uppercase tracking-wider text-dark transition-all hover:bg-lime/90">
          <Plus className="mr-1.5 inline h-3.5 w-3.5" /> Schedule Drop
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {drops.map((drop, i) => (
          <motion.div key={drop.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-white/5 bg-card p-6 transition-colors hover:border-white/10">
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

      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-card p-8 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-xl">Schedule Drop</h2>
                <button onClick={() => setShowForm(false)} className="rounded-full p-2 text-white/40 hover:text-stitch"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-dark px-4 py-3 text-sm text-stitch outline-none placeholder:text-white/20 focus:border-lime/30" />
                <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-dark px-4 py-3 text-sm text-stitch outline-none placeholder:text-white/20 focus:border-lime/30" />
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-dark px-4 py-3 text-sm text-stitch outline-none focus:border-lime/30" />
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-dark px-4 py-3 text-sm text-stitch outline-none focus:border-lime/30">
                  <option value="upcoming">Upcoming</option>
                  <option value="live">Live</option>
                  <option value="sold_out">Sold Out</option>
                </select>
                <button onClick={handleAdd}
                  className="mt-2 flex w-full items-center justify-center rounded-full bg-lime py-4 text-[0.75rem] font-bold uppercase tracking-wider text-dark transition-all hover:bg-lime/90">
                  Schedule Drop
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
