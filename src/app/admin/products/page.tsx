"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit, Trash2, Eye, Plus, X } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { toast } from "@/components/ui/toaster";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  stock: number;
  color: string;
  images: string[];
  badge: string | null;
}

const emptyForm = { name: "", category: "Fitted", price: 0, originalPrice: 0, stock: 0, color: "#0B0B0B", images: ["", "", "", "", ""], badge: "" };

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSave = async () => {
    if (editing) {
      await fetch(`/api/products/${editing.id}`, {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
      toast("Product updated");
    } else {
      await fetch("/api/products", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form),
      });
      toast("Product added");
    }
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    toast("Product deleted");
    fetchProducts();
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ name: p.name, category: p.category, price: p.price, originalPrice: p.originalPrice || 0, stock: p.stock, color: p.color, images: p.images?.length ? p.images : ["", "", "", "", ""], badge: p.badge || "" });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] text-lime">Products</span>
          <h1 className="mt-2 font-display text-3xl">All Products ({products.length})</h1>
        </div>
        <button
          onClick={() => { setEditing(null); setForm(emptyForm); setShowForm(true); }}
          className="rounded-full bg-lime px-6 py-3 text-[0.65rem] font-bold uppercase tracking-wider text-dark transition-all hover:bg-lime/90"
        >
          <Plus className="mr-1.5 inline h-3.5 w-3.5" /> Add Product
        </button>
      </div>

      <motion.div className="mt-8 overflow-hidden rounded-2xl border border-white/5">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 bg-card/80">
              {["Product", "Category", "Price", "Stock", "Badge", "Actions"].map((h) => (
                <th key={h} className="px-5 py-4 text-left font-mono text-[0.55rem] font-bold uppercase tracking-wider text-white/30">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-white/30">Loading...</td></tr>
            ) : products.map((p, i) => (
              <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="border-b border-white/5 transition-colors hover:bg-white/[0.02]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <img src={p.images?.[0] || "/products/product-1.svg"} alt={p.name} className="h-10 w-10 shrink-0 rounded-xl object-cover" />
                    <span className="font-medium">{p.name}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-white/40">{p.category}</td>
                <td className="px-5 py-4 font-mono text-lime">{formatPrice(p.price)}</td>
                <td className="px-5 py-4">
                  <span className={`rounded-full px-3 py-1 font-mono text-[0.5rem] font-bold ${p.stock <= 0 ? "bg-white/5 text-white/30" : p.stock <= 3 ? "bg-lime/15 text-lime" : "bg-white/5 text-white/50"}`}>{p.stock}</span>
                </td>
                <td className="px-5 py-4"><span className="text-xs text-white/40">{p.badge || "—"}</span></td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button className="rounded-full p-2 text-white/30 hover:text-stitch"><Eye className="h-4 w-4" /></button>
                    <button onClick={() => openEdit(p)} className="rounded-full p-2 text-white/30 hover:text-lime"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => handleDelete(p.id)} className="rounded-full p-2 text-white/30 hover:text-white/60"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/10 bg-card p-8 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-display text-xl">{editing ? "Edit Product" : "Add Product"}</h2>
                <button onClick={() => setShowForm(false)} className="rounded-full p-2 text-white/40 hover:text-stitch"><X className="h-5 w-5" /></button>
              </div>
              <div className="space-y-4">
                <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-dark px-4 py-3 text-sm text-stitch outline-none placeholder:text-white/20 focus:border-lime/30" />
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-dark px-4 py-3 text-sm text-stitch outline-none focus:border-lime/30">
                  {["Fitted", "Snapback", "Dad Hat", "Limited"].map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="flex gap-4">
                  <input type="number" placeholder="Price (₹)" value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full rounded-xl border border-white/10 bg-dark px-4 py-3 text-sm text-stitch outline-none placeholder:text-white/20 focus:border-lime/30" />
                  <input type="number" placeholder="Original Price" value={form.originalPrice || ""} onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) })}
                    className="w-full rounded-xl border border-white/10 bg-dark px-4 py-3 text-sm text-stitch outline-none placeholder:text-white/20 focus:border-lime/30" />
                </div>
                <div className="flex gap-4">
                  <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                    className="w-full rounded-xl border border-white/10 bg-dark px-4 py-3 text-sm text-stitch outline-none placeholder:text-white/20 focus:border-lime/30" />
                  <input placeholder="Badge (e.g. New)" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-dark px-4 py-3 text-sm text-stitch outline-none placeholder:text-white/20 focus:border-lime/30" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/30">Images (up to 5)</label>
                  <div className="space-y-2">
                    {form.images.map((url, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input placeholder={`Image ${i + 1} URL`} value={url} onChange={(e) => {
                          const newImages = [...form.images];
                          newImages[i] = e.target.value;
                          setForm({ ...form, images: newImages });
                        }} className="flex-1 rounded-xl border border-white/10 bg-dark px-4 py-3 text-sm text-stitch outline-none placeholder:text-white/20 focus:border-lime/30" />
                        {url && <img src={url} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover border border-white/5" />}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-white/30">Color: {form.color}</label>
                  <input type="color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="ml-3 h-8 w-16 cursor-pointer rounded border border-white/10 bg-transparent" />
                </div>
                <button onClick={handleSave}
                  className="mt-2 flex w-full items-center justify-center rounded-full bg-lime py-4 text-[0.75rem] font-bold uppercase tracking-wider text-dark transition-all hover:bg-lime/90">
                  {editing ? "Update Product" : "Add Product"}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
