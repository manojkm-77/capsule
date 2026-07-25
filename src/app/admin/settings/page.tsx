"use client";

import { Settings, User, Bell, Shield, Globe, CreditCard } from "lucide-react";

const sections = [
  { icon: User, label: "Profile", desc: "Update your name, email, and avatar." },
  { icon: Bell, label: "Notifications", desc: "Configure email and WhatsApp alerts." },
  { icon: Shield, label: "Security", desc: "Password, 2FA, and session management." },
  { icon: Globe, label: "Storefront", desc: "WhatsApp number, shipping info, SEO." },
  { icon: CreditCard, label: "Payments", desc: "UPI details, COD settings, payouts." },
];

export default function AdminSettingsPage() {
  return (
    <div>
      <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Settings</span>
      <h1 className="mt-2 font-display text-3xl">Studio Settings</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((s) => (
          <div key={s.label} className="rounded-2xl border border-white/5 bg-card p-6 card-hover cursor-pointer">
            <s.icon className="h-5 w-5 text-lime" />
            <h3 className="mt-4 text-sm font-bold">{s.label}</h3>
            <p className="mt-1 text-xs text-white/40">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
