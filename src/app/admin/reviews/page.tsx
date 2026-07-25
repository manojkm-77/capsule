"use client";

import { Star } from "lucide-react";

const reviews = [
  { name: "Rhea Sharma", rating: 5, text: "Best cap I've ever owned. The quality is unmatched.", product: "Court Blue Fitted", date: "2026-07-20" },
  { name: "Kabir Kapoor", rating: 5, text: "Orange snap + white tee combo never misses.", product: "Capsule Orange Snap", date: "2026-07-18" },
  { name: "Ananya Patel", rating: 4, text: "Great quality but runs a bit large.", product: "Court Blue Fitted", date: "2026-07-16" },
  { name: "Vikram Raj", rating: 5, text: "Paper Bone in Goa was the vibe!", product: "Paper Bone Snap", date: "2026-07-14" },
];

export default function AdminReviewsPage() {
  return (
    <div>
      <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Reviews</span>
      <h1 className="mt-2 font-display text-3xl">Customer Reviews ({reviews.length})</h1>
      <div className="mt-8 space-y-4">
        {reviews.map((r, i) => (
          <div key={i} className="rounded-2xl border border-white/5 bg-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex gap-1">
                  {Array.from({ length: r.rating }).map((_, j) => <Star key={j} className="h-4 w-4 fill-lime text-lime" />)}
                </div>
                <p className="mt-2 text-sm text-white/70">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-2 font-mono text-[0.6rem] text-white/30">{r.name} · {r.product} · {r.date}</p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-full border border-lime/20 px-4 py-2 font-mono text-[0.5rem] uppercase text-lime">Approve</button>
                <button className="rounded-full border border-white/10 px-4 py-2 font-mono text-[0.5rem] uppercase text-white/30">Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
