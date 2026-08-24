import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { Star, ShoppingBag, Check } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, cart } = useContext(CartContext);

// Works with MongoDB _id as well as mock id
  const isInCart = cart.some(item => (item._id && item._id === product._id) || (item.id && item.id === product.id)); 

  const productIdentifier = product._id || product.slug || product.id;

return ( 
    <div className="group bg-white rounded-2xl border border-emerald-100/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative"> 
      {/* Top Badges */} 
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5"> 
        {product.isBestseller && ( 
          <span className="bg-amber-400 text-gray-900 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-xs"> 
            Bestseller 
          </span> 
        )} 
        {product.originalPrice > product.price && ( 
          <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs"> 
            SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% 
          </span> 
        )} 
      </div> 
 
      {/* Product Image */} 
      <Link to={`/products/${productIdentifier}`} className="block relative aspect-square bg-slate-50 overflow-hidden"> 
        <img 
          src={product.image || (product.images && product.images[0]) || 'https://via.placeholder.com/300'} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" 
        /> 
      </Link> 
 
      {/* Details */} 
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3"> 
        <div> 
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2D6A4F] block mb-1"> 
            {typeof product.category === 'object' ? product.category?.name : (product.category || 'Ayurveda')} 
          </span> 
 
          <Link to={`/products/${productIdentifier}`}> 
            <h3 className="font-heading text-sm font-bold text-gray-900 line-clamp-2 hover:text-[#2D6A4F] transition-colors leading-snug"> 
              {product.name} 
            </h3> 
          </Link> 
 
          {/* Rating */} 
          <div className="flex items-center gap-1 mt-2"> 
            <div className="flex text-amber-400"> 
              <Star className="w-3.5 h-3.5 fill-amber-400" /> 
            </div> 
            <span className="text-xs font-bold text-gray-800">{product.rating || 4.5}</span> 
            <span className="text-[11px] text-gray-400">({product.reviews || 0} reviews)</span> 
          </div> 
        </div> 
 
        {/* Pricing & Add Button */} 
        <div className="pt-2 border-t border-gray-100 flex items-center justify-between"> 
          <div> 
            <div className="flex items-baseline gap-1.5"> 
              <span className="text-base font-bold text-[#1B4332]"> 
                ₹{product.price} 
              </span> 
              {product.originalPrice > product.price && ( 
                <span className="text-xs text-gray-400 line-through"> 
                  ₹{product.originalPrice} 
                </span> 
              )} 
            </div> 
          </div> 
 
          <button 
            onClick={() => addToCart(product, 1)} 
            className={`p-2.5 rounded-xl font-medium transition-all shadow-xs flex items-center gap-1.5 text-xs ${
              isInCart 
                ? 'bg-emerald-100 text-[#1B4332] hover:bg-emerald-200' 
                : 'bg-[#2D6A4F] text-white hover:bg-[#1B4332]' 
            }`}
          > 
            {isInCart ? ( 
              <> 
                <Check className="w-4 h-4 text-[#1B4332]" /> Added 
              </> 
            ) : ( 
              <> 
                <ShoppingBag className="w-4 h-4" /> Add 
              </> 
            )} 
          </button> 
        </div> 
      </div> 
    </div> 
  ); 
};