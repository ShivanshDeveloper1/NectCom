import React, { useState, useEffect } from 'react';
import { getProducts, updateProduct } from '../../../services/api'
import { Plus, Trash2, Leaf, AlertCircle, CheckCircle, Edit } from 'lucide-react';

export const EditProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    price: '',
    originalPrice: '',
    description: '',
    isBestseller: false,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [status, setStatus] = useState({ type: '', message: '' });

  // 1. Fetch products for dropdown/selection
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data || []);
      } catch (err) {
        setStatus({ type: 'error', message: 'Failed to fetch existing products.' });
      } finally {
        setFetching(false);
      }
    };
    fetchAll();
  }, []);

  // 2. When a product is selected, populate the form
  const handleSelectProduct = (e) => {
    const id = e.target.value;
    setSelectedProductId(id);
    const item = products.find((p) => p._id === id);

    if (item) {
      setFormData({
        name: item.name || '',
        slug: item.slug || '',
        category: item.category || '',
        price: item.price || '',
        originalPrice: item.originalPrice || '',
        description: item.description || '',
        isBestseller: Boolean(item.isBestseller),
      });
      setIngredients(item.ingredients && item.ingredients.length ? item.ingredients : ['']);
      setCurrentImage(item.image || '');
      setSelectedFile(null);
    } else {
      setFormData({ name: '', slug: '', category: '', price: '', originalPrice: '', description: '', isBestseller: false });
      setIngredients(['']);
      setCurrentImage('');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: type === 'checkbox' ? checked : value };
      if (name === 'name') {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
      }
      return updated;
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredientField = () => setIngredients([...ingredients, '']);
  const removeIngredientField = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProductId) {
      setStatus({ type: 'error', message: 'Please select a product to edit.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (selectedFile) {
      data.append('imageFile', selectedFile);
    }
    data.append('ingredients', JSON.stringify(ingredients.filter((i) => i.trim() !== '')));

    try {
      const res = await updateProduct(selectedProductId, data);
      setStatus({ type: 'success', message: 'Product updated successfully!' });
      
      // Update local dropdown state with new values
      setProducts((prev) =>
        prev.map((p) => (p._id === selectedProductId ? res.data : p))
      );
      if (res.data?.image) setCurrentImage(res.data.image);
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to update product.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Product Selector */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-emerald-100 shadow-sm space-y-3">
        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
          Select Product to Edit
        </label>
        <select
          value={selectedProductId}
          onChange={handleSelectProduct}
          disabled={fetching}
          className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F] bg-slate-50"
        >
          <option value="">-- Choose a product --</option>
          {products.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name} (₹{item.price})
            </option>
          ))}
        </select>
      </div>

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

      {/* Edit Form */}
      {selectedProductId && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-emerald-100 shadow-sm space-y-6 sm:space-y-8"
        >
          {/* Section 1: Basic Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
              1. Basic Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Organic Herbal Tea"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  required
                  placeholder="e.g. Wellness, Skincare"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">URL Slug</label>
              <input
                type="text"
                name="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 bg-slate-50 text-gray-600 focus:outline-none focus:border-[#2D6A4F]"
              />
            </div>
          </div>

          {/* Section 2: Pricing */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
              2. Pricing & Highlights
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Selling Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Original Price (₹) [Optional]</label>
                <input
                  type="number"
                  name="originalPrice"
                  min="0"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="editIsBestseller"
                name="isBestseller"
                checked={formData.isBestseller}
                onChange={handleChange}
                className="w-4 h-4 text-[#2D6A4F] accent-[#2D6A4F] rounded border-gray-300 focus:ring-[#2D6A4F]"
              />
              <label htmlFor="editIsBestseller" className="text-xs font-bold text-gray-800 cursor-pointer">
                Mark as Bestseller Item
              </label>
            </div>
          </div>

          {/* Section 3: Media & Details */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
              3. Media & Content
            </h3>

            {currentImage && (
              <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-gray-200">
                <img src={currentImage} alt="Current" className="w-16 h-16 object-cover rounded-lg" />
                <span className="text-xs text-gray-500 font-medium">Current Image in Cloudinary</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Replace Image File (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-xs sm:text-sm px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2D6A4F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                rows="4"
                required
                value={formData.description}
                onChange={handleChange}
                className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]"
              ></textarea>
            </div>
          </div>

          {/* Section 4: Ingredients */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                4. Key Ingredients
              </h3>
              <button
                type="button"
                onClick={addIngredientField}
                className="text-xs font-bold text-[#2D6A4F] hover:text-[#1B4332] flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Ingredient
              </button>
            </div>

            <div className="space-y-3">
              {ingredients.map((ing, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-gray-200 shrink-0">
                    <Leaf className="w-4 h-4 text-emerald-600" />
                  </div>
                  <input
                    type="text"
                    placeholder={`Ingredient ${index + 1}`}
                    value={ing}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    className="flex-1 text-sm px-3 sm:px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2D6A4F]"
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeIngredientField(index)}
                      className="p-3 text-rose-500 hover:bg-rose-50 rounded-xl transition-all shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="w-full font-bold py-3.5 sm:py-4 px-6 rounded-xl shadow-lg bg-[#2D6A4F] hover:bg-[#1B4332] text-amber-300 text-xs uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {loading ? 'Updating Item...' : 'Save Product Changes'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditProductPage;