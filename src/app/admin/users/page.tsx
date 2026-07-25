"use client";

import { Shield, UserCog } from "lucide-react";

const users = [
  { name: "Riya Sharma", email: "riya@capsule.in", role: "Admin", status: "Active", lastActive: "Just now" },
  { name: "Arjun Mehta", email: "arjun@capsule.in", role: "Editor", status: "Active", lastActive: "2h ago" },
  { name: "Priya Kapoor", email: "priya@capsule.in", role: "Viewer", status: "Inactive", lastActive: "5d ago" },
];

export default function AdminUsersPage() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Users</span>
          <h1 className="mt-2 font-display text-3xl">Team Members</h1>
        </div>
        <button className="rounded-full bg-lime px-6 py-3 text-[0.65rem] font-bold uppercase tracking-wider text-dark">+ Invite</button>
      </div>
      <div className="mt-8 space-y-4">
        {users.map((u, i) => (
          <div key={u.email} className="flex flex-wrap items-center gap-6 rounded-2xl border border-white/5 bg-card p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime/20 font-display text-lg text-lime">
              {u.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold">{u.name}</h3>
              <p className="font-mono text-[0.6rem] text-white/30">{u.email}</p>
            </div>
            <span className="rounded-full border border-white/10 px-4 py-1.5 font-mono text-[0.5rem] uppercase text-white/50">{u.role}</span>
            <span className={`rounded-full px-4 py-1.5 font-mono text-[0.5rem] font-bold ${u.status === "Active" ? "bg-lime/15 text-lime" : "bg-white/5 text-white/30"}`}>
              {u.status}
            </span>
            <span className="font-mono text-[0.55rem] text-white/20">{u.lastActive}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
