"use client";

export default function AdminMediaPage() {
  return (
    <div>
      <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Media</span>
      <h1 className="mt-2 font-display text-3xl">Media Library</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl border border-white/5 bg-card">
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-lime/20 to-dark/50">
              <span className="font-display text-4xl text-white/10">{i + 1}</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-dark/60 opacity-0 transition-opacity group-hover:opacity-100">
              <button className="rounded-full border border-white/20 px-4 py-2 text-xs text-stitch backdrop-blur">Select</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
