"use client";

import { ArrowUpRight, MessageCircle, Flame } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] bg-[#080808] text-white overflow-hidden border-b border-zinc-800 flex flex-col justify-between pt-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#CCFF00]/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 pb-12 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-grow">

        <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">

          <div className="inline-flex items-center gap-3 w-fit px-3 py-1.5 bg-zinc-900/90 border border-zinc-700/80 rounded-none backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#CCFF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#CCFF00]"></span>
            </span>
            <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase">
              DROP 04 LIVE — LIMITED 50 UNITS
            </span>
          </div>

          <div className="space-y-1">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] font-sans">
              STITCHED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] via-white to-zinc-400">
                NOT PRINTED.
              </span>
            </h1>
            <p className="font-mono text-zinc-500 text-xs sm:text-sm tracking-wider uppercase pt-2">
              // BENGALURU STREETWEAR CULT • NO CART • NO CHECKOUT
            </p>
          </div>

          <p className="text-zinc-400 text-base sm:text-lg max-w-xl font-normal leading-relaxed">
            Premium heavy-weight headwear engineered for the culture. Embroidery that doesn&apos;t fade. DM directly on WhatsApp to cop your fit.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 bg-[#CCFF00] text-black font-extrabold uppercase px-8 py-4 text-sm tracking-wider hover:bg-white transition-all duration-200 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 fill-black" />
              <span>DM TO COP ON WHATSAPP</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#drops"
              className="inline-flex items-center gap-2 border border-zinc-700 bg-zinc-900/40 text-zinc-300 font-bold uppercase px-6 py-4 text-sm tracking-wider hover:border-white hover:text-white transition-all"
            >
              BROWSE DROPS
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80 max-w-lg font-mono text-xs">
            <div>
              <span className="block text-zinc-500 uppercase">Fabric</span>
              <span className="font-bold text-zinc-200">450 GSM Cotton</span>
            </div>
            <div>
              <span className="block text-zinc-500 uppercase">Detailing</span>
              <span className="font-bold text-[#CCFF00]">3D Puff Embroidery</span>
            </div>
            <div>
              <span className="block text-zinc-500 uppercase">Dispatch</span>
              <span className="font-bold text-zinc-200">Pan-India 24 Hours</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative flex items-center justify-center">

          <div className="relative w-full max-w-md aspect-[4/5] bg-zinc-900 border border-zinc-800 p-4 group overflow-hidden shadow-2xl">

            <div className="absolute top-6 left-6 z-20 bg-black/80 backdrop-blur-md border border-[#CCFF00]/40 text-[#CCFF00] font-mono text-[10px] font-bold tracking-widest px-3 py-1 uppercase flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#CCFF00]" />
              MOST WANTED
            </div>

            <div className="absolute top-6 right-6 z-20 bg-[#CCFF00] text-black font-mono font-black text-sm px-3 py-1 uppercase">
              ₹1,499
            </div>

            <div className="relative w-full h-full bg-zinc-950 border border-zinc-800/50 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 z-10" />

              <img
                src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop"
                alt="Court Black Fitted Cap"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                <div>
                  <p className="text-zinc-400 font-mono text-xs uppercase">Drop 03 / Fitted</p>
                  <h3 className="text-xl font-black uppercase text-white tracking-tight">Court Black Fitted</h3>
                </div>
                <span className="text-xs font-mono text-zinc-400 border border-zinc-700 px-2 py-1 bg-black/60">
                  LOW STOCK
                </span>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-4 -right-2 hidden sm:block bg-[#CCFF00] text-black font-mono font-black text-[11px] tracking-widest px-4 py-2 rotate-3 z-30 shadow-lg uppercase">
            ⚡ 100% Embroidered
          </div>
        </div>

      </div>

      <div className="w-full border-t border-zinc-800 bg-black/80 backdrop-blur-sm py-3 overflow-hidden">
        <div className="flex whitespace-nowrap gap-8 font-mono text-xs font-bold tracking-widest text-zinc-400 uppercase animate-marquee">
          <span>◆ BENGALURU STREETWEAR CULT</span>
          <span>◆ PAN INDIA EXPRESS SHIPPING</span>
          <span>◆ STITCHED NOT PRINTED</span>
          <span>◆ NO CART • DM TO COP</span>
          <span>◆ LIMITED RUN DROPS ONLY</span>
          <span>◆ BENGALURU STREETWEAR CULT</span>
          <span>◆ PAN INDIA EXPRESS SHIPPING</span>
        </div>
      </div>
    </section>
  );
}
