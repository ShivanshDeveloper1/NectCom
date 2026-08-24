import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, productCategories, concerns } from '../data/mockData';
import { ProductCard } from '../components/product/ProductCard';
import { Filter, SlidersHorizontal, ChevronDown, RefreshCw } from 'lucide-react';
import { getProducts } from '../services/api';


export const ProductListingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get('category') || '';
  const activeConcern = searchParams.get('concern') || '';
  const activeTag = searchParams.get('tag') || '';
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState('popular');
  // const [currentPage, setCurrentPage] = useState(1);


  const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

  // Filter products
  let filtered = [...products];

  if (activeCategory) {
    filtered = filtered.filter(
      p => p.category.toLowerCase().replace(/\s+/g, '-') === activeCategory || p.category === activeCategory
    );
  }

  if (activeConcern) {
    filtered = filtered.filter(
      p => p.concern.toLowerCase().replace(/\s+/g, '-') === activeConcern || p.concern === activeConcern
    );
  }

  if (activeTag) {
    filtered = filtered.filter(p => p.isBestseller);
  }

  filtered = filtered.filter(p => p.price <= maxPrice);

  // Sort
  if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  const resetFilters = () => {
    setSearchParams({});
    setMaxPrice(1000);
    setSortBy('popular');
  };



  // Fetch products form backends

  useEffect(()=> {
    const fetchProducts =  async()=> {
      try {
           setLoading(true);
      setError('');

      const response = await getProducts();

      console.log('PRODUCT API RESPONSE:', response);

      setProducts(response.data || []);
        
      } catch (error) {
      console.error('FETCH PRODUCTS ERROR:', error);

      setError(
        error.response?.data?.message ||
        error.message ||
        'Failed to load products'
      );
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
        
      
    
  },[])









  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="container-custom">
        {/* Header Breadcrumb */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-gray-900">
            Ayurvedic Products & Formulations
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Showing {filtered.length} authentic products crafted according to classical Ayurvedic Samhitas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Filter */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2 font-bold text-sm text-[#1B4332]">
                  <Filter className="w-4 h-4 text-emerald-700" /> Filters
                </div>
                <button
                  onClick={resetFilters}
                  className="text-[11px] font-semibold text-[#2D6A4F] hover:underline flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Price Filter */}
              <div>
                <h4 className="font-semibold text-xs text-gray-900 mb-2">Max Price: ₹{maxPrice}</h4>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#2D6A4F]"
                />
              </div>

              {/* Concern Filter */}
              <div>
                <h4 className="font-semibold text-xs text-gray-900 mb-2">Health Concern</h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-xs">
                  {concerns.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setSearchParams({ concern: c.id })}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                        activeConcern === c.id
                          ? 'bg-[#2D6A4F] text-amber-300 font-bold'
                          : 'hover:bg-emerald-50 text-gray-700'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="font-semibold text-xs text-gray-900 mb-2">Product Category</h4>
                <div className="space-y-1.5 text-xs">
                  {productCategories.map(cat => (
                    <button
                      key={cat.slug}
                      onClick={() => setSearchParams({ category: cat.slug })}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                        activeCategory === cat.slug
                          ? 'bg-[#2D6A4F] text-amber-300 font-bold'
                          : 'hover:bg-emerald-50 text-gray-700'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-9 space-y-6">
            {/* Top Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-600">
                Found <span className="font-bold text-gray-900">{filtered.length}</span> items
              </span>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="bg-slate-50 border border-gray-200 text-xs font-semibold text-gray-800 rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#2D6A4F]"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Product Cards */}
            {filtered.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl text-center space-y-3 border border-emerald-100">
                <h3 className="font-heading text-lg font-bold text-gray-800">No products match your criteria</h3>
                <p className="text-xs text-gray-500">Try adjusting your filters or price slider.</p>
                <button
                  onClick={resetFilters}
                  className="bg-[#2D6A4F] text-amber-300 font-bold px-4 py-2 rounded-xl text-xs uppercase"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(p => (
                <ProductCard key={p._id || p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};