"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import {
  Heart, Share2, Minus, Plus,
  Truck, Shield, RotateCcw, Star, Check, ShoppingBag
} from "lucide-react";
import { products } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { toast } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Accordion } from "@/components/ui/accordion";
import { ProductGrid } from "@/components/common/product-grid";
import { ImageGallery } from "@/components/product/image-gallery";
import { Tabs } from "@/components/ui/tabs";
import { ReviewCard } from "@/components/common/review-card";
import { SectionTitle } from "@/components/ui/section-title";

const SIZES = ["S", "M", "L", "XL"];

function getRecentlyViewed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("capsule_recently") || "[]");
  } catch { return []; }
}

function addRecentlyViewed(id: string) {
  if (typeof window === "undefined") return;
  const prev = getRecentlyViewed().filter((i) => i !== id);
  const updated = [id, ...prev].slice(0, 6);
  localStorage.setItem("capsule_recently", JSON.stringify(updated));
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const { addToCart, cart, wishlist, toggleWishlist } = useStore();
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => { if (product) addRecentlyViewed(product.id); }, [product?.id]);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!product) {
    return (
      <div className="container-caps py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link href="/shop" className="mt-4 inline-flex text-[14px] text-muted hover:text-primary">
          Back to shop
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);
  const inCart = cart.find((i) => i.id === product.id)?.quantity || 0;
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity,
      images: product.images,
    });
    toast("Added to cart");
  };

  const recentlyViewedIds = getRecentlyViewed().filter((i) => i !== product.id);
  const recentlyViewed = recentlyViewedIds
    .map((i) => products.find((p) => p.id === i))
    .filter(Boolean) as typeof products;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <div className="container-caps py-8">
        <Breadcrumb items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/shop" },
          { label: product.name },
        ]} />

        <div className="mt-8 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ImageGallery
              images={product.images}
              alt={product.name}
              badge={product.badge}
            />
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[100px]">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                {product.category}
              </span>
              <h1 className="mt-2 text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight tracking-tight">
                {product.name}
              </h1>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn("h-4 w-4", i < (product.rating || 4) ? "text-primary fill-primary" : "text-border")}
                      strokeWidth={1.8}
                    />
                  ))}
                  <span className="ml-1.5 text-[12px] text-muted">({product.reviewCount || 128})</span>
                </div>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-[15px] text-muted line-through">{formatPrice(product.originalPrice)}</span>
                    <span className="rounded-full bg-sale/10 px-3 py-0.5 text-[12px] font-semibold text-sale">
                      -{discount}%
                    </span>
                  </>
                )}
              </div>

              <div className="mt-8">
                <p className="text-[13px] font-medium">Size</p>
                <div className="mt-2 flex gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "flex h-11 w-14 items-center justify-center rounded-[14px] border text-[14px] font-medium transition-all",
                        selectedSize === size
                          ? "border-primary bg-primary text-secondary"
                          : "border-border text-muted hover:border-primary hover:text-primary"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-[13px] font-medium">Quantity</p>
                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-border text-muted hover:text-primary hover:border-primary transition-all"
                  >
                    <Minus className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                  <span className="w-8 text-center text-[16px] font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-border text-muted hover:text-primary hover:border-primary transition-all"
                  >
                    <Plus className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Button variant="primary" size="lg" onClick={handleAddToCart} className="w-full">
                  <ShoppingBag className="h-5 w-5" strokeWidth={1.8} />
                  {inCart > 0 ? `Add Another (${inCart})` : "Add to Cart"}
                </Button>
                <div className="flex gap-3">
                  <Button variant="secondary" size="md" className="flex-1">
                    Buy Now
                  </Button>
                  <button
                    onClick={() => { toggleWishlist(product.id); toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist"); }}
                    className={cn(
                      "flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border transition-all",
                      isWishlisted
                        ? "border-sale text-sale"
                        : "border-border text-muted hover:text-primary hover:border-primary"
                    )}
                  >
                    <Heart className="h-5 w-5" strokeWidth={1.8} fill={isWishlisted ? "currentColor" : "none"} />
                  </button>
                  <button className="flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border border-border text-muted hover:text-primary hover:border-primary transition-all">
                    <Share2 className="h-5 w-5" strokeWidth={1.8} />
                  </button>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-3 rounded-[20px] border border-border bg-secondary p-4">
                {[
                  { icon: Truck, label: "Free Shipping", sub: "On orders over ₹999" },
                  { icon: Shield, label: "Premium Quality", sub: "100% embroidered" },
                  { icon: RotateCcw, label: "Easy Returns", sub: "Within 7 days" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <item.icon className="mx-auto mb-2 h-5 w-5 text-muted" strokeWidth={1.8} />
                    <p className="text-[11px] font-semibold">{item.label}</p>
                    <p className="text-[10px] text-muted">{item.sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Accordion
                  items={[
                    {
                      title: "Description",
                      content: (
                        <p className="text-[14px] leading-relaxed text-muted">
                          {product.description || "Premium quality cap crafted with attention to detail. Features a structured fit, embroidered design, and adjustable closure for the perfect fit."}
                        </p>
                      ),
                    },
                    {
                      title: "Delivery & Returns",
                      content: (
                        <div className="space-y-2 text-[14px] text-muted">
                          <p>Free shipping on orders over ₹999. Orders ship within 24 hours.</p>
                          <p>Easy returns within 7 days of delivery. Items must be unworn with tags attached.</p>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>

              <div className="mt-8">
                <Tabs
                  tabs={[
                    {
                      id: "reviews",
                      label: `Reviews (${product.reviewCount || 12})`,
                      content: (
                        <div className="space-y-4">
                          {[
                            { id: "1", name: "Rhea S.", rating: 5, date: "2 weeks ago", text: "Absolutely love this cap. The fit is perfect and the quality is unmatched.", helpful: 24 },
                            { id: "2", name: "Kabir K.", rating: 5, date: "1 month ago", text: "Best purchase I've made this year. Looks even better in person.", helpful: 18 },
                            { id: "3", name: "Ananya P.", rating: 4, date: "2 months ago", text: "Great quality and fast shipping. Would buy again.", helpful: 7 },
                          ].map((r) => (
                            <ReviewCard key={r.id} review={r} />
                          ))}
                        </div>
                      ),
                    },
                    {
                      id: "details",
                      label: "Details",
                      content: (
                        <div className="space-y-3 text-[14px] text-muted">
                          <p>Premium structured fit with reinforced front</p>
                          <p>100% cotton sweatband for comfort</p>
                          <p>Adjustable snapback or strapback closure</p>
                          <p>Embroidered logo with high-density thread</p>
                          <p>Curved brim with shape-retaining stitch</p>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <SectionTitle
              title="You May Also Like"
              action={
                <Link href="/shop" className="text-[14px] font-medium text-muted hover:text-primary transition-colors">
                  View All
                </Link>
              }
            />
            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </section>
        )}

        {recentlyViewed.length > 0 && (
          <section className="mt-16 lg:mt-24">
            <SectionTitle title="Recently Viewed" />
            <div className="mt-8">
              <ProductGrid products={recentlyViewed} />
            </div>
          </section>
        )}
      </div>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: showSticky ? 0 : 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-secondary px-4 py-3 lg:bottom-auto lg:top-[84px] lg:border-t-0 lg:border-b lg:bg-secondary/95 lg:backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-[12px] bg-[#F5F5F5]">
              <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <p className="text-[14px] font-medium">{product.name}</p>
              <p className="text-[13px] text-muted">{formatPrice(product.price)}</p>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={handleAddToCart}>
            <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
            {inCart > 0 ? `Add Another (${inCart})` : "Add to Cart"}
          </Button>
        </div>
      </motion.div>
    </>
  );
}
