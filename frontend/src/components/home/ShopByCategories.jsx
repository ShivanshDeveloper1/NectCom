import React from 'react';
import { Link } from 'react-router-dom';
import { productCategories } from '../../data/mockData';
import { ArrowRight } from 'lucide-react';

export const ShopByCategories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#2D6A4F] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Formulation Types
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            Shop by Categories
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Explore authentic herbal juices, fine churnas, high-potency extracts, and soothing tailas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productCategories.map(cat => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden border border-emerald-100/80 bg-slate-50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-bold text-amber-300 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-amber-400/30">
                  {cat.count}+ Items
                </span>
              </div>

              <div className="p-5 flex items-center justify-between bg-white">
                <div>
                  <h3 className="font-heading text-lg font-bold text-gray-900 group-hover:text-[#2D6A4F] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-gray-500">Explore Collection</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-50 group-hover:bg-[#2D6A4F] text-[#2D6A4F] group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
