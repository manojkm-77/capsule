"use client";

import { BarChart3 } from "lucide-react";

export default function AdminReportsPage() {
  return (
    <div>
      <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Reports</span>
      <h1 className="mt-2 font-display text-3xl">Export & Reports</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "Sales Report", desc: "Monthly revenue breakdown with comparisons." },
          { title: "Inventory Report", desc: "Stock levels and reorder recommendations." },
          { title: "Customer Report", desc: "Acquisition, retention, and lifetime value." },
          { title: "Order Report", desc: "Order volume, status distribution, and trends." },
          { title: "Tax Report", desc: "GST breakdown and invoice summaries." },
          { title: "Custom Report", desc: "Build your own report with custom metrics." },
        ].map((r, i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-card p-6 card-hover cursor-pointer">
            <BarChart3 className="h-5 w-5 text-lime" />
            <h3 className="mt-4 text-sm font-bold">{r.title}</h3>
            <p className="mt-2 text-xs text-white/40">{r.desc}</p>
            <button className="mt-4 rounded-full border border-white/10 px-4 py-2 font-mono text-[0.5rem] uppercase tracking-wider text-white/40 hover:text-lime">
              Download CSV
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
