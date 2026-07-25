"use client";

export default function AdminBlogsPage() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Blogs</span>
          <h1 className="mt-2 font-display text-3xl">Journal</h1>
        </div>
        <button className="rounded-full bg-lime px-6 py-3 text-[0.65rem] font-bold uppercase tracking-wider text-dark">+ New Post</button>
      </div>
      <div className="mt-8 space-y-4">
        {[
          { title: "The Story Behind Court Blue", author: "Riya", date: "2026-07-15", views: 234 },
          { title: "How We Choose Our Drops", author: "Riya", date: "2026-07-10", views: 189 },
          { title: "Behind the Scenes: Drop 004", author: "Team", date: "2026-07-05", views: 312 },
        ].map((post, i) => (
          <div key={i} className="flex flex-wrap items-center gap-6 rounded-2xl border border-white/5 bg-card p-6">
            <div className="flex-1">
              <h3 className="text-sm font-bold">{post.title}</h3>
              <p className="mt-1 font-mono text-[0.6rem] text-white/30">{post.author} · {post.date} · {post.views} views</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/50 hover:text-stitch">Edit</button>
              <button className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/30">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
