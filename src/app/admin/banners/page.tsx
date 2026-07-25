"use client";

export default function AdminBannersPage() {
  return (
    <div>
      <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Banners</span>
      <h1 className="mt-2 font-display text-3xl">Storefront Banners</h1>
      <div className="mt-8 space-y-4">
        {[
          { title: "Summer Collection 2026", active: true, expires: "2026-08-31" },
          { title: "Drop 004 Launch", active: true, expires: "2026-08-15" },
          { title: "Monsoon Sale", active: false, expires: "2026-07-31" },
        ].map((banner, i) => (
          <div key={i} className="flex flex-wrap items-center gap-6 rounded-2xl border border-white/5 bg-card p-6">
            <div className="flex-1">
              <h3 className="text-sm font-bold">{banner.title}</h3>
              <p className="mt-1 font-mono text-[0.6rem] text-white/30">Expires: {banner.expires}</p>
            </div>
            <span className={`rounded-full px-4 py-1.5 font-mono text-[0.5rem] font-bold ${banner.active ? "bg-lime/15 text-lime" : "bg-white/5 text-white/30"}`}>
              {banner.active ? "Active" : "Inactive"}
            </span>
            <button className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/50 hover:text-stitch">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
