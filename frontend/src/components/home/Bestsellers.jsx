import React, { useRef } from 'react';
import { ProductCard } from '../product/ProductCard';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';

export const Bestsellers = ({ products = [] }) => {
  const scrollRef = useRef(null);

  // Filter bestsellers from live DB data
  const bestsellers = products.filter(p => p.isBestseller === true);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollLeft + scrollAmount, behavior: 'smooth' });
    }
  };

  const displayProducts = bestsellers.length > 0 ? bestsellers : products;

  return (
    <section className="py-16 bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/20">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10">
          <div>
            <span className="inline-flex items-center gap-1 text-xs font-bold tracking-widest text-amber-700 uppercase bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              <Award className="w-3.5 h-3.5" /> Customer Favorites
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              Our Bestsellers
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Top-rated Ayurvedic formulations loved by over 50,000+ households across India.
            </p>
          </div>

          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-full bg-white border border-emerald-200 hover:bg-[#2D6A4F] hover:text-white shadow-xs transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-full bg-white border border-emerald-200 hover:bg-[#2D6A4F] hover:text-white shadow-xs transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory"
        >
          {displayProducts.map(p => (
            <div key={p._id || p.id} className="w-[280px] sm:w-[320px] shrink-0 snap-start">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};