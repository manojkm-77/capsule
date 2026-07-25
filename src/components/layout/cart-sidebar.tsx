"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice, waLink } from "@/lib/utils";

export function CartSidebar() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQuantity } = useStore();
  const total = cart.reduce((a, b) => a + b.price * b.quantity, 0);
  const message = cart.map((i) => `${i.name} (${i.size}) x${i.quantity}`).join(", ");

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-dark shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="font-display text-xl">Cart ({cart.length})</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full p-2 text-white/50 hover:text-stitch"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center pt-20 text-center">
                  <ShoppingBag className="mb-4 h-12 w-12 text-white/20" />
                  <p className="text-sm text-white/40">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex gap-4 rounded-2xl border border-white/5 bg-card/50 p-4"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold">{item.name}</h3>
                        <p className="mt-0.5 text-xs text-white/40">{item.size}</p>
                        <p className="mt-1 font-mono text-sm text-lime">
                          {formatPrice(item.price)}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            onClick={() => {
                              if (item.quantity <= 1) removeFromCart(item.id);
                              else updateQuantity(item.id, item.quantity - 1);
                            }}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-stitch"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-mono">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-stitch"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="self-start text-xs text-white/30 hover:text-lime"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t border-white/10 px-6 py-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-white/50">Total</span>
                  <span className="font-display text-xl">{formatPrice(total)}</span>
                </div>
                <a
                  href={waLink(
                    `Hi! I want to order:\n${message}\n\nTotal: ${formatPrice(total)}`
                  )}
                  target="_blank"
                  rel="noopener"
                  className="flex w-full items-center justify-center rounded-full bg-lime py-4 text-[0.75rem] font-bold uppercase tracking-wider text-dark transition-all hover:bg-lime/80"
                >
                  Order on WhatsApp
                </a>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
