import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartDrawer = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalCount, isDrawerOpen, setIsDrawerOpen } = useContext(CartContext);
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 bg-[#1B4332] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-heading text-lg font-bold">Your Ayurvedic Cart ({totalCount})</h2>
            </div>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-1 rounded-lg hover:bg-emerald-800 text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#2D6A4F] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-lg font-bold text-gray-900">Your cart is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Explore our range of classical herbal formulations and add natural remedies to your cart.
                </p>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="inline-block bg-[#2D6A4F] text-amber-300 font-bold px-6 py-2.5 rounded-xl text-xs uppercase"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl border border-gray-100 bg-slate-50 hover:bg-white transition-colors relative group"
                >
                  <img
                    src={item.image || (item.images && item.images[0])}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg shrink-0 border border-gray-200"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="pr-6">
                      <h4 className="font-semibold text-xs text-gray-900 line-clamp-1">{item.name}</h4>
                      <span className="text-xs font-bold text-[#1B4332] block mt-0.5">₹{item.price}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-bold text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-200 bg-slate-50 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-700">
                    {totalPrice >= 499 ? 'FREE' : '₹50'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span className="text-[#1B4332]">₹{totalPrice >= 499 ? totalPrice : totalPrice + 50}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-100/70 p-2.5 rounded-lg">
                <ShieldCheck className="w-4 h-4 shrink-0 text-[#2D6A4F]" />
                <span>100% Authentic Products & Free Returns Guaranteed</span>
              </div>

              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  navigate('/checkout');
                }}
                className="w-full bg-[#2D6A4F] hover:bg-[#1B4332] text-amber-300 font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};