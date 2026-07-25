"use client";

import { Bell, CheckCheck, AlertCircle } from "lucide-react";

const notifications = [
  { title: "New order received", desc: "Aarav Menon ordered Court Blue Fitted", time: "5m ago", type: "order" },
  { title: "Low stock alert", desc: "Court Blue Fitted has only 2 left", time: "1h ago", type: "alert" },
  { title: "Drop scheduled", desc: "Drop 004 is set for August 1st", time: "3h ago", type: "info" },
  { title: "Payment received", desc: "₹1,499 received from Dev Patel", time: "6h ago", type: "payment" },
  { title: "New customer registered", desc: "Zoya Khan joined", time: "1d ago", type: "info" },
];

export default function AdminNotificationsPage() {
  return (
    <div>
      <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Notifications</span>
      <h1 className="mt-2 font-display text-3xl">Activity Log</h1>
      <div className="mt-8 space-y-3">
        {notifications.map((n, i) => (
          <div key={i} className="flex items-start gap-4 rounded-2xl border border-white/5 bg-card p-5">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
              n.type === "alert" ? "bg-lime/15" : "bg-white/5"
            }`}>
              {n.type === "alert" ? <AlertCircle className="h-5 w-5 text-lime" /> : n.type === "order" ? <Bell className="h-5 w-5 text-lime" /> : <CheckCheck className="h-5 w-5 text-lime" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{n.title}</p>
              <p className="font-mono text-[0.6rem] text-white/30">{n.desc}</p>
            </div>
            <span className="font-mono text-[0.55rem] text-white/20">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
