import React from 'react';
import { Smartphone, Download, Star } from 'lucide-react';

export const AppDownloadBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#2D6A4F] to-[#1B4332] text-white relative overflow-hidden my-12 rounded-3xl mx-4 sm:mx-8 shadow-2xl">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
            <Smartphone className="w-4 h-4" /> Download Official App
          </span>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold leading-tight">
            Get ₹100 Off Your First Order On Uhealthpharma App
          </h2>

          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Track orders in real-time, get instant doctor video consultations, set daily herbal dose reminders, and access app-exclusive flash sales.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-5 py-3 rounded-2xl border border-white/20 shadow-lg transition-transform hover:scale-105">
              <Download className="w-6 h-6 text-amber-400" />
              <div className="text-left">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">GET IT ON</span>
                <span className="text-sm font-bold block leading-none">Google Play</span>
              </div>
            </button>

            <button className="flex items-center gap-3 bg-black hover:bg-gray-900 text-white px-5 py-3 rounded-2xl border border-white/20 shadow-lg transition-transform hover:scale-105">
              <Download className="w-6 h-6 text-amber-400" />
              <div className="text-left">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">DOWNLOAD ON THE</span>
                <span className="text-sm font-bold block leading-none">App Store</span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-200 pt-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <span>4.8 Rating with 100,000+ App Downloads</span>
          </div>
        </div>

        {/* Mockup visual */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-64 h-96 bg-gray-900 border-4 border-emerald-400/40 rounded-[40px] shadow-2xl p-4 flex flex-col justify-between overflow-hidden">
            <div className="w-20 h-4 bg-emerald-950 rounded-full mx-auto mb-4" />
            <div className="bg-emerald-900/60 rounded-2xl p-4 text-center space-y-3 border border-emerald-500/30">
              <div className="w-12 h-12 rounded-full bg-amber-400 text-gray-900 mx-auto flex items-center justify-center font-bold text-lg shadow-md">
                🌿
              </div>
              <h4 className="font-heading font-bold text-sm text-white">Uhealthpharma</h4>
              <p className="text-[10px] text-emerald-200">100% Authentic Ayurvedic Wellness</p>
              <div className="bg-amber-400 text-gray-900 font-bold text-xs py-2 rounded-xl">
                Claim ₹100 Coupon
              </div>
            </div>
            <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};
