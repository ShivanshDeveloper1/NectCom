import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/mockData';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.concern.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative bg-white w-full max-w-3xl mx-auto mt-16 rounded-3xl shadow-2xl p-6 z-10 border border-emerald-100 animate-slideDown">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-emerald-700" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search products, health concerns, or churnas..."
              className="w-full text-base font-medium text-gray-900 focus:outline-none placeholder-gray-400"
            />
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="mt-4 max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-gray-400">
              Type something like "DiabaCare", "Ashwagandha", "Hair Oil", or "Triphala"
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-xs text-gray-500">
              No products found matching "{query}"
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {results.map(p => (
                <Link
                  key={p.id}
                  to={`/products/${p.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 py-3 px-2 hover:bg-emerald-50/60 rounded-xl transition-colors"
                >
                  <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-xs text-gray-900">{p.name}</h4>
                    <span className="text-[10px] text-emerald-700 font-bold uppercase">{p.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#1B4332]">₹{p.price}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 ml-auto mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
