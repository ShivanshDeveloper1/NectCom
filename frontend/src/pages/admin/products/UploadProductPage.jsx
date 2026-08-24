import React, { useState } from 'react';
import { Leaf, Plus, Trash2, PackagePlus, Check, AlertCircle } from 'lucide-react';
import { createProduct } from '../../../services/api';

export const UploadProductPage = () => {
  const initialFormState = {
    name: '',
    slug: '',
    category: '',
    price: '',
    originalPrice: '',
    description: '',
    concern: '',
    isBestseller: false,
    isCombo: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [ingredients, setIngredients] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

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
    if (!selectedFile) {
      setStatus({ type: 'error', message: 'Please select an image file to upload.' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    data.append('imageFile', selectedFile);
    data.append('ingredients', JSON.stringify(ingredients.filter((i) => i.trim() !== '')));

    try {
      await createProduct(data);
      setStatus({ type: 'success', message: 'Product created & image uploaded successfully!' });
      setFormData(initialFormState);
      setSelectedFile(null);
      setIngredients(['']);
    } catch (err) {
      console.error('❌ CREATE PRODUCT ERROR:', err);
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to upload product.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4 sm:p-6 lg:p-10">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-emerald-100 shadow-sm">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 font-heading">Upload New Product</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Add items directly to your store catalog.</p>
          </div>
          <div className="p-2.5 sm:p-3 bg-emerald-50 rounded-xl sm:rounded-2xl text-[#2D6A4F] shrink-0">
            <PackagePlus className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </div>

        {/* Status Messages */}
        {status.message && (
          <div className={`p-3.5 sm:p-4 rounded-2xl border flex items-center gap-3 text-xs sm:text-sm font-semibold ${
            status.type === 'success' 
              ? 'bg-emerald-50 text-[#1B4332] border-emerald-200' 
              : 'bg-rose-50 text-rose-700 border-rose-200'
          }`}>
            {status.type === 'success' ? <Check className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
            <span>{status.message}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-emerald-100 shadow-sm space-y-6 sm:space-y-8">
          
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Target Concern (Optional)</label>
                <input
                  type="text"
                  name="concern"
                  placeholder="e.g. Acne, Anti-Aging, Hair Fall"
                  value={formData.concern}
                  onChange={handleChange}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">URL Slug (Auto-generated)</label>
                <input
                  type="text"
                  name="slug"
                  required
                  placeholder="organic-herbal-tea"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 bg-slate-50 text-gray-600 focus:outline-none focus:border-[#2D6A4F]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Badges */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
              2. Pricing & Flags
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Selling Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  placeholder="499"
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
                  placeholder="699"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="w-full text-sm px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <label className="flex items-center gap-2 text-xs font-bold text-gray-800 cursor-pointer">
                <input
                  type="checkbox"
                  name="isBestseller"
                  checked={formData.isBestseller}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#2D6A4F] accent-[#2D6A4F] rounded border-gray-300"
                />
                Mark as Bestseller
              </label>

              <label className="flex items-center gap-2 text-xs font-bold text-gray-800 cursor-pointer">
                <input
                  type="checkbox"
                  name="isCombo"
                  checked={formData.isCombo}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#2D6A4F] accent-[#2D6A4F] rounded border-gray-300"
                />
                Is Combo Pack
              </label>
            </div>
          </div>

          {/* Section 3: Media & Details */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2D6A4F] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block">
              3. Media & Details
            </h3>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Product Image File</label>
              <input
                type="file"
                accept="image/*"
                required
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
                placeholder="Detailed description of benefits and usage..."
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

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="w-full font-bold py-3.5 sm:py-4 px-6 rounded-xl shadow-lg bg-[#2D6A4F] hover:bg-[#1B4332] text-amber-300 text-xs uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {loading ? 'Uploading Item...' : 'Upload Product to Store'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadProductPage;