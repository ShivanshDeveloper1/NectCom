import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../../../services/api'; // adjust import path as needed
import { Trash2, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

const DeleteProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });

  // Fetch products on component mount
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts();
      setProducts(response.data || []);
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Failed to fetch products.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle deletion
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    setDeletingId(id);
    setStatus({ type: '', message: '' });

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setStatus({ type: 'success', message: `"${name}" was deleted successfully.` });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.response?.data?.message || 'Failed to delete product.'
      });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-emerald-100 shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Delete Products</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Manage store catalog and remove discontinued items.
          </p>
        </div>
        <button
          onClick={fetchProducts}
          disabled={loading}
          className="flex items-center gap-2 text-xs font-bold text-[#2D6A4F] bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 rounded-xl border border-emerald-200 transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh List
        </button>
      </div>

      {/* Status Alert */}
      {status.message && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
            status.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="py-20 text-center text-gray-500 font-medium">
          Loading products...
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-emerald-100 text-gray-500">
          No products found in store inventory.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* Product Image */}
                <div className="h-44 w-full bg-slate-100 rounded-xl overflow-hidden relative border border-gray-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                      No Image Available
                    </div>
                  )}
                  {item.isBestseller && (
                    <span className="absolute top-2 left-2 text-[10px] font-bold uppercase tracking-wider text-[#2D6A4F] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      Bestseller
                    </span>
                  )}
                </div>

                {/* Details */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D6A4F] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {item.category || 'General'}
                  </span>
                  <h3 className="text-base font-bold text-gray-800 mt-2 line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Price & Action */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-base font-bold text-gray-900">₹{item.price}</span>
                  {item.originalPrice > 0 && (
                    <span className="text-xs text-gray-400 line-through ml-2">
                      ₹{item.originalPrice}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(item._id, item.name)}
                  disabled={deletingId === item._id}
                  className="p-2.5 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition-all disabled:opacity-50 flex items-center gap-1.5 text-xs font-bold"
                >
                  <Trash2 className="w-4 h-4" />
                  {deletingId === item._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeleteProductPage;