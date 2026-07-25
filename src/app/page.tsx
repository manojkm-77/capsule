"use client";

import { Hero } from "@/components/home/hero";
import { FeaturedCollection } from "@/components/home/featured-collection";
import { AboutBrand } from "@/components/home/about-brand";
import { FeaturedDrop } from "@/components/home/featured-drop";
import { CommunityGallery } from "@/components/home/community-gallery";
import { Testimonials } from "@/components/home/testimonials";
import { FAQ } from "@/components/home/faq";
import { FinalCTA } from "@/components/home/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <AboutBrand />
      <FeaturedDrop />
      <CommunityGallery />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
