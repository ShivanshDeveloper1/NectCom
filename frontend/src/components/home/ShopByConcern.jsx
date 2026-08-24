import React, { useState } from 'react';
import { concerns, products } from '../../data/mockData';
import { ProductCard } from '../product/ProductCard';
import { Sparkles } from 'lucide-react';

export const ShopByConcern = () => {
  const [activeConcern, setActiveConcern] = useState(concerns[0].name);

  // Filter products matching active concern or fallback to all
  const filteredProducts = products.filter(
    p => p.concern === activeConcern || activeConcern === 'All Concerns'
  );

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-[#2D6A4F] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Targeted Healing
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            Shop by Health Concern
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Select your specific wellness need to discover classical herbal remedies formulated by expert Vaidyas.
          </p>
        </div>

        {/* Pill-style Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {concerns.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveConcern(c.name)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 border shadow-xs ${
                activeConcern === c.name
                  ? 'bg-[#2D6A4F] text-amber-300 border-[#1B4332] shadow-md scale-105'
                  : 'bg-emerald-50/50 text-gray-700 border-emerald-100 hover:bg-emerald-100/60'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${activeConcern === c.name ? 'text-amber-300' : 'text-emerald-600'}`} />
              {c.name}
            </button>
          ))}
        </div>

        {/* Product Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(filteredProducts.length > 0 ? filteredProducts : products.slice(0, 4)).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};
