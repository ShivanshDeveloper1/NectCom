import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ProductCard } from '../components/product/ProductCard';
import { getProductByIdOrSlug, getProducts } from '../services/api.js'; // Adjust path to your API service
import { Star, ShoppingBag, Truck, ShieldCheck, Check, Plus, Minus, Leaf, Loader2 } from 'lucide-react';

export const ProductDetailPage = () => {
  const { slug } = useParams();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [added, setAdded] = useState(false);

  // Fetch current product & related items dynamically
  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        setLoading(true);
        setError('');
        
        // 1. Fetch single product details
        const response = await getProductByIdOrSlug(slug); // or getProductById(slug)
        const fetchedProduct = response.data || response;
        setProduct(fetchedProduct);

        // 2. Fetch related items
        const allProductsRes = await getProducts();
        const allProducts = allProductsRes.data || [];
        
        // Filter out current product
        const filtered = allProducts.filter(
          p => (p._id || p.id) !== (fetchedProduct._id || fetchedProduct.id)
        );
        setRelatedProducts(filtered.slice(0, 4));

      } catch (err) {
        console.error('Error fetching product detail:', err);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchDetailData();
    }
  }, [slug]);

  const handleAdd = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-[#2D6A4F] animate-spin" />
        <p className="text-sm font-semibold text-gray-600">Loading details...</p>
      </div>
    );
  }

  // Error / Not Found State
  if (error || !product) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <p className="text-sm text-gray-500 mb-6">{error || "The product you are looking for doesn't exist."}</p>
        <Link to="/products" className="bg-[#2D6A4F] text-white px-6 py-2.5 rounded-xl text-sm font-semibold">
          Back to Shop
        </Link>
      </div>
    );
  }

  // Safely extract category name (handles string or object)
  const categoryName = typeof product.category === 'object' 
    ? product.category?.name 
    : (product.category || 'Ayurveda');

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container-custom">
        {/* Product Details Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-gray-200 shadow-inner relative">
              <img
                src={product.image || (product.images && product.images[0]) || 'https://via.placeholder.com/500'}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isBestseller && (
                <span className="absolute top-4 left-4 bg-amber-400 text-gray-900 text-xs font-extrabold px-3 py-1 rounded-md shadow-md">
                  Bestseller
                </span>
              )}
            </div>
          </div>

          {/* Right Product Info */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
                {categoryName}
              </span>

              <h1 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900">{product.rating || 4.5}</span>
                <span className="text-xs text-gray-400">({product.reviews || 0} Customer Reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-3xl font-extrabold text-[#1B4332]">
                  ₹{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
                {product.originalPrice > product.price && (
                  <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2.5 py-1 rounded-md">
                    Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selector & Add button */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center border border-gray-300 rounded-xl bg-slate-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-gray-600 hover:bg-gray-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-gray-600 hover:bg-gray-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 ${
                    added
                      ? 'bg-emerald-800 text-white'
                      : 'bg-[#2D6A4F] hover:bg-[#1B4332] text-amber-300'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" /> Added to Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Delivery & Trust badges */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 text-xs text-gray-700">
              <div className="flex items-center gap-2 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Free Express Shipping over ₹499</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>100% Herbal & Quality Tested</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info: Description, Ingredients, Reviews */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm space-y-6">
          <div className="flex border-b border-gray-200 gap-6 text-sm font-bold">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 transition-all ${
                activeTab === 'description'
                  ? 'border-b-2 border-[#2D6A4F] text-[#2D6A4F]'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              Description & Benefits
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-3 transition-all ${
                activeTab === 'ingredients'
                  ? 'border-b-2 border-[#2D6A4F] text-[#2D6A4F]'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              Key Ingredients
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 transition-all ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-[#2D6A4F] text-[#2D6A4F]'
                  : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              Reviews ({product.reviews || 0})
            </button>
          </div>

          {activeTab === 'description' && (
            <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
              <p>{product.description}</p>
              <h4 className="font-bold text-gray-900 text-sm">Recommended Dosage:</h4>
              <p>Take 30ml twice daily on an empty stomach or as advised by your Ayurvedic physician.</p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 text-sm">Active Botanical Herbs:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {product.ingredients && product.ingredients.length > 0 ? (
                  product.ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-gray-200 font-semibold text-gray-800">
                      <Leaf className="w-4 h-4 text-emerald-600" />
                      <span>{ing}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">100% Pure Natural Extracts</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Average Rating: {product.rating || 4.5} / 5</h4>
                  <p className="text-xs text-gray-500">Based on verified buyer feedback</p>
                </div>
                <button className="bg-[#2D6A4F] text-amber-300 font-bold px-4 py-2 rounded-xl text-xs">
                  Write Review
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 space-y-6">
            <h3 className="font-heading text-2xl font-bold text-gray-900">
              Frequently Bought Together
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p._id || p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};