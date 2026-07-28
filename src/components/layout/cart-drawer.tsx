"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQuantity } = useStore();
  const total = cart.reduce((a, b) => a + b.price * b.quantity, 0);

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/40"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[450px] flex-col bg-secondary shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="text-lg font-semibold">Cart ({cart.length})</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-[14px] p-2 text-muted hover:text-primary hover:bg-[#F5F5F5] transition-all"
              >
                <X className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center pt-20 text-center">
                  <ShoppingBag className="mb-4 h-12 w-12 text-muted/30" strokeWidth={1.8} />
                  <p className="text-[15px] font-medium text-muted">Your cart is empty</p>
                  <p className="mt-1 text-[13px] text-muted/60">Add some items to get started.</p>
                  <Button
                    variant="primary"
                    className="mt-6"
                    onClick={() => { setCartOpen(false); }}
                    href="/shop"
                  >
                    Shop Now
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.size}`}
                      className="flex gap-4 rounded-[20px] border border-border p-4"
                    >
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-[16px] bg-[#F5F5F5]">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-[14px] font-medium">{item.name}</h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-muted hover:text-sale transition-colors"
                            >
                              <Trash2 className="h-4 w-4" strokeWidth={1.8} />
                            </button>
                          </div>
                          <p className="mt-0.5 text-[12px] text-muted">{item.size}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                if (item.quantity <= 1) removeFromCart(item.id);
                                else updateQuantity(item.id, item.quantity - 1);
                              }}
                              className="flex h-8 w-8 items-center justify-center rounded-[12px] border border-border text-muted hover:text-primary hover:border-primary transition-all"
                            >
                              <Minus className="h-3 w-3" strokeWidth={1.8} />
                            </button>
                            <span className="w-6 text-center text-[14px] font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-[12px] border border-border text-muted hover:text-primary hover:border-primary transition-all"
                            >
                              <Plus className="h-3 w-3" strokeWidth={1.8} />
                            </button>
                          </div>
                          <span className="text-[14px] font-semibold">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-border px-6 py-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-muted">Subtotal</span>
                    <span className="font-medium">{formatPrice(total)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[14px]">
                    <span className="text-muted">Shipping</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-3 text-[16px]">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">{formatPrice(total)}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="flex h-[52px] w-full items-center justify-center rounded-[14px] bg-primary text-[14px] font-medium text-secondary transition-all hover:bg-primary/90"
                >
                  Checkout
                </Link>
                <button
                  onClick={() => setCartOpen(false)}
                  className="flex w-full items-center justify-center text-[13px] text-muted hover:text-primary transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
