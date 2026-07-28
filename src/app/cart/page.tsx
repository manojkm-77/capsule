"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const subtotal = cart.reduce((a, b) => a + b.price * b.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container-caps py-12">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
        <EmptyState
          icon={<ShoppingBag className="h-16 w-16" strokeWidth={1.8} />}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet."
          action={{ label: "Shop Now", href: "/shop" }}
          secondaryAction={{ label: "View Wishlist", href: "/wishlist" }}
        />
      </div>
    );
  }

  return (
    <div className="container-caps py-12">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <h1 className="mt-6 text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight">Shopping Cart</h1>

      <div className="mt-8 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="space-y-4">
            {cart.map((item) => (
              <motion.div
                key={`${item.id}-${item.size}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-5 rounded-[20px] border border-border p-5"
              >
                <Link href={`/product/${item.id}`} className="h-28 w-28 shrink-0 overflow-hidden rounded-[16px] bg-[#F5F5F5]">
                  <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover" />
                </Link>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex justify-between">
                      <div>
                        <Link href={`/product/${item.id}`} className="text-[15px] font-medium hover:text-muted transition-colors">
                          {item.name}
                        </Link>
                        <p className="mt-0.5 text-[12px] text-muted">Size: {item.size}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted hover:text-sale transition-colors"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.8} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (item.quantity <= 1) removeFromCart(item.id);
                          else updateQuantity(item.id, item.quantity - 1);
                        }}
                        className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-border text-muted hover:text-primary hover:border-primary transition-all"
                      >
                        <Minus className="h-3 w-3" strokeWidth={1.8} />
                      </button>
                      <span className="w-8 text-center text-[15px] font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-border text-muted hover:text-primary hover:border-primary transition-all"
                      >
                        <Plus className="h-3 w-3" strokeWidth={1.8} />
                      </button>
                    </div>
                    <span className="text-[16px] font-semibold">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <Link href="/shop" className="mt-6 inline-flex items-center gap-2 text-[14px] text-muted hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.8} /> Continue Shopping
          </Link>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-[100px] rounded-[20px] border border-border p-6">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-[14px]">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="text-muted">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between text-[16px]">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-6 flex h-[52px] w-full items-center justify-center rounded-[14px] bg-primary text-[14px] font-medium text-secondary transition-all hover:bg-primary/90"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
