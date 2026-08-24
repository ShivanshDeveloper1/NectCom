import React from 'react';
import { Link } from 'react-router-dom';
import { concerns, productCategories } from '../../data/mockData';
import { ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';

export const MegaMenu = ({ type, onClose }) => {
  if (type === 'categories') {
    return (
      <div
        className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-2xl border-t border-emerald-100 py-8 z-40 transition-all duration-300 animate-fadeIn"
        onMouseLeave={onClose}
      >
        <div className="container-custom grid grid-cols-12 gap-6">
          <div className="col-span-8 grid grid-cols-3 gap-4 border-r border-gray-100 pr-6">
            {concerns.map(item => (
              <Link
                key={item.id}
                to={`/products`}
                onClick={onClose}
                className="group flex items-start p-3 rounded-xl hover:bg-emerald-50/70 transition-all border border-transparent hover:border-emerald-200"
              >
                <div className="p-2.5 rounded-lg bg-emerald-100/70 text-[#2D6A4F] group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors mr-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-[#2D6A4F] text-sm">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="col-span-4 bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] text-white p-6 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <span className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-amber-300 font-semibold mb-2">
                <ShieldCheck className="w-4 h-4" /> Doctor Recommendation
              </span>
              <h3 className="font-heading text-xl font-bold mb-2">Consult with Ayurvedic Vaidya</h3>
              <p className="text-emerald-100 text-xs leading-relaxed mb-4">
                Get personalized herb formulations tailored to your specific Prakriti & health concerns.
              </p>
            </div>
            <Link
              to="/consultation"
              onClick={onClose}
              className="relative z-10 inline-flex items-center justify-center gap-2 bg-amber-400 text-gray-900 font-semibold px-4 py-2.5 rounded-xl hover:bg-amber-300 transition-all text-xs"
            >
              Book Free Consultation <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'products') {
    return (
      <div
        className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-2xl border-t border-emerald-100 py-8 z-40 transition-all duration-300 animate-fadeIn"
        onMouseLeave={onClose}
      >
        <div className="container-custom grid grid-cols-3 gap-6">
          {productCategories.map(cat => (
            <Link
              key={cat.slug}
              to={`/products`}
              onClick={onClose}
              className="group flex items-center p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 transition-all border border-gray-100 hover:border-emerald-200"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-16 h-16 object-cover rounded-lg mr-4 group-hover:scale-105 transition-transform"
              />
              <div>
                <h4 className="font-semibold text-gray-900 group-hover:text-[#2D6A4F] text-base">
                  {cat.name}
                </h4>
                <p className="text-xs text-[#2D6A4F] font-medium mt-1">
                  {cat.count}+ Products Available
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
