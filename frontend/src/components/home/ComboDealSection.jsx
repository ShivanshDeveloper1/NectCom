import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Tag, ShoppingBag } from 'lucide-react';

export const ComboDealSection = ({ products = [] }) => {
  const { addToCart } = useContext(CartContext);

  // 1. Filter out only the products where isCombo is true
  const combos = products.filter(product => product.isCombo === true);

  // 2. If there are no combos, don't show the section at all
  if (combos.length === 0) return null;

  return (
    <section className="py-16 bg-[#1B4332] text-white relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1 text-xs font-bold tracking-widest text-amber-300 uppercase bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/40">
            <Tag className="w-3.5 h-3.5" /> Value Bundles
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mt-2">
            Ayurvedic Combo Deals
          </h2>
          <p className="text-sm text-emerald-100 mt-2">
            Save up to 35% on curated holistic treatment packs designed for 30-day course completeness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {combos.map((combo) => (
            <div
              key={combo._id}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-emerald-400/30 hover:border-amber-400/60 transition-all duration-300 flex flex-col sm:flex-row gap-6 shadow-xl group"
            >
              <div className="w-full sm:w-48 h-48 rounded-2xl overflow-hidden relative shrink-0">
                <img
                  src={combo.image}
                  alt={combo.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {combo.discountPercent > 0 && (
                  <span className="absolute top-2 left-2 bg-amber-400 text-gray-900 font-extrabold text-xs px-2.5 py-1 rounded-md shadow-md">
                    SAVE {combo.discountPercent}%
                  </span>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {combo.name}
                  </h3>
                  <p className="text-xs text-emerald-100/90 leading-relaxed mt-2">
                    {combo.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-emerald-500/30 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-amber-300">
                      ₹{combo.price}
                    </span>
                    {combo.originalPrice > 0 && (
                      <span className="text-xs text-emerald-200 line-through ml-2">
                        ₹{combo.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      addToCart(
                        {
                          id: combo._id,
                          name: combo.name,
                          price: combo.price,
                          originalPrice: combo.originalPrice,
                          image: combo.image,
                        },
                        1
                      )
                    }
                    className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-5 py-2.5 rounded-xl shadow-lg transition-all text-xs"
                  >
                    <ShoppingBag className="w-4 h-4" /> Shop Combo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};