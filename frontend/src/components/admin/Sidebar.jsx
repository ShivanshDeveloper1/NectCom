import React, { useState } from 'react';
import {
  LayoutDashboard,
  PackagePlus,
  Boxes,
  ClipboardList,
  PlusCircle,
  Trash2,
  ChevronDown,
  ChevronRight,
  Store,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onCloseMobile }) => {
  const [activeTab, setActiveTab] = useState('upload-product');
  const [openProducts, setOpenProducts] = useState(true);
  const [openOrders, setOpenOrders] = useState(true);

  const navigate = useNavigate();

  const handleUploadClick = () => {
    setActiveTab('upload-product');
    navigate('/admin/products/upload');
    if (onCloseMobile) onCloseMobile();
  };

    const handleDeleteClick = () => {
    setActiveTab('delte-product');
    navigate('/admin/products/delete');
    if (onCloseMobile) onCloseMobile();
  };

  const handleEditProduct = ()=> {
     setActiveTab('edit-product');
    navigate('/admin/products/edit');
    if (onCloseMobile) onCloseMobile();

  }

    const handleVideo = ()=> {
     setActiveTab('edit-product');
    navigate('/admin/videos');
    if (onCloseMobile) onCloseMobile();

  }

  return (
    <aside className="h-screen w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/30">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-white text-lg leading-tight">KrishnaAdmin</h1>
            <p className="text-xs text-slate-400">E-Commerce Panel</p>
          </div>
        </div>
        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="md:hidden p-1 text-slate-400 hover:text-white rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">

        {/* Main Dashboard */}
        <div>
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Main
          </p>

          <button
            disabled
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all opacity-50 cursor-not-allowed"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
        </div>

        {/* Orders Section */}
        <div>
          <div
            className="flex items-center justify-between px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 opacity-50 cursor-not-allowed"
          >
            <span>Orders Management</span>
            {openOrders ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>

          {openOrders && (
            <div className="space-y-1">

              <button
                disabled
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all opacity-50 cursor-not-allowed"
              >
                <div className="flex items-center gap-3">
                  <ClipboardList className="w-5 h-5" />
                  All Orders
                </div>

                <span className="bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded-full border border-slate-700">
                  12
                </span>
              </button>

              <button
                onClick={handleVideo}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all  cursor-pointer"
              >
                <PlusCircle className="w-5 h-5 text-emerald-400" />
                Add New Video
              </button>

            </div>
          )}
        </div>

        {/* Inventory & Product Section */}
        <div>
          <div
            className="flex items-center justify-between px-3 text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2"
          >
            <span>Products & Stock</span>

            {openProducts ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>

          {openProducts && (
            <div className="space-y-1">

              {/* ENABLED BUTTON */}
              <button
                onClick={handleUploadClick}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'upload-product'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'hover:bg-slate-800 hover:text-white'
                }`}
              >
                <PackagePlus className="w-5 h-5 text-indigo-400" />
                Upload Product
              </button>

              <button
               onClick={handleEditProduct}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all  cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Boxes className="w-5 h-5 text-amber-400" />
                  Edit Product
                </div>

                <span className="bg-amber-500/10 text-amber-400 text-xs px-2 py-0.5 rounded-full border border-amber-500/20">
                  Update
                </span>
              </button>

              <button
                onClick={handleDeleteClick}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all  cursor-pointer"
              >
                <Trash2 className="w-5 h-5 text-rose-400" />
                Delete / Remove
              </button>

            </div>
          )}
        </div>

      </div>

    </aside>
  );
};

export default Sidebar;