import React, { useState, useEffect } from 'react';
import { getProducts, getVideos } from '../services/api.js';

import { HeroBanner } from '../components/home/HeroBanner';
import { TrustBadges } from '../components/home/TrustBadges';
import { ShopByConcern } from '../components/home/ShopByConcern';
import { Bestsellers } from '../components/home/Bestsellers';
import { ShopByCategories } from '../components/home/ShopByCategories';
import { ComboDealSection } from '../components/home/ComboDealSection';
import { AppDownloadBanner } from '../components/home/AppDownloadBanner';
import { BlogSection } from '../components/home/BlogSection';
import { ConsultationCTA } from '../components/home/ConsultationCTA';
import { InstagramVideos } from '../components/home/InstagramVideos.jsx';

export const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const [prodRes, vidRes] = await Promise.allSettled([getProducts(), getVideos()]);

      if (prodRes.status === 'fulfilled') {
        const prodData = prodRes.value;
        const productList = Array.isArray(prodData) 
          ? prodData 
          : (Array.isArray(prodData?.data) ? prodData.data : []);
        setProducts(productList);
      } else {
        console.error('❌ Failed to load products:', prodRes.reason);
      }

      if (vidRes.status === 'fulfilled') {
        const vidData = vidRes.value;
        const videoList = Array.isArray(vidData) 
          ? vidData 
          : (Array.isArray(vidData?.data) ? vidData.data : []);
        setVideos(videoList);
      } else {
        console.error('❌ Failed to load videos:', vidRes.reason);
      }
    } catch (error) {
      console.error('❌ Unexpected fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <HeroBanner />
      <TrustBadges />
      <ShopByConcern products={products} />
      <Bestsellers products={products} />
      <ShopByCategories products={products} />
      <InstagramVideos videos={videos} />
      <ComboDealSection products={products} />
      <AppDownloadBanner />
      <BlogSection />
      <ConsultationCTA />
    </main>
  );
};