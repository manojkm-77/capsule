"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

const customers = [
  { name: "Aarav Menon", email: "aarav@example.com", phone: "+91 98450 11234", city: "Bengaluru", orders: 3, lastOrder: "2026-07-20" },
  { name: "Ishita Rao", email: "ishita@example.com", phone: "+91 99870 44521", city: "Mumbai", orders: 5, lastOrder: "2026-07-19" },
  { name: "Dev Patel", email: "dev@example.com", phone: "+91 90080 77123", city: "Ahmedabad", orders: 2, lastOrder: "2026-07-18" },
  { name: "Sana Qureshi", email: "sana@example.com", phone: "+91 88790 55210", city: "Delhi", orders: 4, lastOrder: "2026-07-16" },
  { name: "Rohan Nair", email: "rohan@example.com", phone: "+91 90080 77123", city: "Kochi", orders: 1, lastOrder: "2026-07-22" },
  { name: "Meher Singh", email: "meher@example.com", phone: "+91 88790 55210", city: "Chandigarh", orders: 2, lastOrder: "2026-07-15" },
  { name: "Tanvi Shah", email: "tanvi@example.com", phone: "+91 98450 11234", city: "Pune", orders: 3, lastOrder: "2026-07-14" },
  { name: "Zoya Khan", email: "zoya@example.com", phone: "+91 99870 44521", city: "Hyderabad", orders: 6, lastOrder: "2026-07-21" },
];

export default function AdminCustomersPage() {
  return (
    <div>
      <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Customers</span>
      <h1 className="mt-2 font-display text-3xl">All Customers ({customers.length})</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {customers.map((c, i) => (
          <motion.div
            key={c.email}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="rounded-2xl border border-white/5 bg-card p-6 card-hover"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lime/20 font-display text-lg text-lime">
              {c.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <h3 className="mt-4 text-sm font-bold">{c.name}</h3>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 font-mono text-[0.6rem] text-white/30">
                <Mail className="h-3 w-3" /> {c.email}
              </div>
              <div className="flex items-center gap-2 font-mono text-[0.6rem] text-white/30">
                <Phone className="h-3 w-3" /> {c.phone}
              </div>
              <div className="flex items-center gap-2 font-mono text-[0.6rem] text-white/30">
                <MapPin className="h-3 w-3" /> {c.city}
              </div>
              <div className="flex items-center gap-2 font-mono text-[0.6rem] text-white/30">
                <Calendar className="h-3 w-3" /> {c.orders} orders
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
