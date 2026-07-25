"use client";

export default function AdminCategoriesPage() {
  return (
    <div>
      <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Categories</span>
      <h1 className="mt-2 font-display text-3xl">Product Categories</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {["Fitted", "Snapback", "Dad Hat", "Limited", "Collaboration", "Vintage"].map((cat, i) => (
          <div key={cat} className="rounded-2xl border border-white/5 bg-card p-6 card-hover">
            <h3 className="text-sm font-bold">{cat}</h3>
            <p className="mt-2 font-mono text-[0.6rem] text-white/30">{i + 2} products</p>
            <div className="mt-4 flex gap-2">
              <button className="rounded-full border border-white/10 px-4 py-2 font-mono text-[0.5rem] uppercase tracking-wider text-white/40 hover:border-lime/30 hover:text-lime">Edit</button>
              <button className="rounded-full border border-white/10 px-4 py-2 font-mono text-[0.5rem] uppercase tracking-wider text-white/30 hover:bg-white/5">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
