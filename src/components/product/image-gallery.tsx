"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  alt: string;
  badge?: string;
}

export function ImageGallery({ images, alt, badge }: ImageGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [fullscreen, setFullscreen] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!imgRef.current || !isZoomed) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <>
      <div className="flex gap-4">
        <div className="hidden flex-col gap-2 sm:flex">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={cn(
                "h-20 w-20 shrink-0 overflow-hidden rounded-[16px] border-2 transition-all",
                i === selected ? "border-primary" : "border-transparent opacity-50 hover:opacity-100"
              )}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>

        <div className="relative flex-1">
          <div
            ref={imgRef}
            className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-[#F5F5F5] cursor-crosshair"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
            onClick={() => setFullscreen(true)}
          >
            <motion.img
              key={selected}
              src={images[selected]}
              alt={alt}
              className="h-full w-full object-cover transition-transform duration-200"
              style={{
                transform: isZoomed
                  ? `scale(2) translate(${-(zoomPos.x - 50) / 25}%, ${-(zoomPos.y - 50) / 25}%)`
                  : "scale(1)",
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              }}
            />
            <button
              onClick={(e) => { e.stopPropagation(); setFullscreen(true); }}
              className="absolute right-4 top-4 rounded-full bg-secondary/80 p-2.5 text-primary opacity-0 hover:opacity-100 transition-opacity shadow-sm"
            >
              <Maximize2 className="h-4 w-4" strokeWidth={1.8} />
            </button>
          </div>

          {badge && (
            <span className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-secondary">
              {badge}
            </span>
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={() => setSelected((selected - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-secondary/80 p-2.5 text-primary shadow-sm hover:bg-secondary transition-all"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.8} />
              </button>
              <button
                onClick={() => setSelected((selected + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-secondary/80 p-2.5 text-primary shadow-sm hover:bg-secondary transition-all"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar sm:hidden">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={cn(
              "h-14 w-14 shrink-0 overflow-hidden rounded-[12px] border-2 transition-all",
              i === selected ? "border-primary" : "border-transparent opacity-50"
            )}
          >
            <img src={img} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          >
            <motion.img
              key={selected}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={images[selected]}
              alt={alt}
              className="max-h-[90vh] max-w-[90vw] rounded-[22px] object-contain"
            />
            <button
              onClick={() => setFullscreen(false)}
              className="absolute right-6 top-6 rounded-full bg-secondary/10 p-2.5 text-secondary hover:bg-secondary/30 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={1.8} />
            </button>
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setSelected(i); }}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all",
                      i === selected ? "bg-secondary w-6" : "bg-secondary/40"
                    )}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
