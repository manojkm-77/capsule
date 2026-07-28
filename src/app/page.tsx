import { Hero } from "@/components/home/hero";
import { Categories } from "@/components/home/categories";
import { FeaturedCollection } from "@/components/home/featured-collection";
import { TrendingProducts } from "@/components/home/trending-products";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { LimitedBanner } from "@/components/home/limited-banner";
import { BestSellers } from "@/components/home/best-sellers";
import { Brands } from "@/components/home/brands";
import { Testimonials } from "@/components/home/testimonials";
import { InstagramGallery } from "@/components/home/instagram-gallery";
import { Newsletter } from "@/components/home/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedCollection />
      <TrendingProducts />
      <NewArrivalsSection />
      <LimitedBanner />
      <BestSellers />
      <Brands />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
