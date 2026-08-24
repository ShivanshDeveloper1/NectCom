import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { TrustBadges } from '../components/home/TrustBadges';
import { ShopByConcern } from '../components/home/ShopByConcern';
import { Bestsellers } from '../components/home/Bestsellers';
import { ShopByCategories } from '../components/home/ShopByCategories';
import { ComboDealSection } from '../components/home/ComboDealSection';
import { AppDownloadBanner } from '../components/home/AppDownloadBanner';
import { BlogSection } from '../components/home/BlogSection';
import { ConsultationCTA } from '../components/home/ConsultationCTA';

export const HomePage = () => {
  return (
    <main className="min-h-screen">
      {/* 1. Hero Banner Carousel */}
      <HeroBanner />

      {/* 2. Trust Badges Marquee Strip */}
      <TrustBadges />

      {/* 3. Shop by Concern Pill Tabs */}
      <ShopByConcern />

      {/* 4. Our Bestsellers Carousel */}
      <Bestsellers />

      {/* 5. Shop by Categories Grid */}
      <ShopByCategories />

      {/* 6. Combo Deals Grid */}
      <ComboDealSection />

      {/* 7. App Download Promo Banner */}
      <AppDownloadBanner />

      {/* 8. Blogs Section Grid */}
      <BlogSection />

      {/* 9. Expert Consultation CTA Banner */}
      <ConsultationCTA />
    </main>
  );
};