import React from 'react';
import { Store, PackagePlus, ClipboardList } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="bg-white max-w-2xl w-full rounded-3xl p-10 border border-slate-200 shadow-xl text-center space-y-6">
        
        {/* Animated Icon Header */}
        <div className="mx-auto bg-indigo-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30 mb-6">
          <Store className="w-10 h-10 text-white" />
        </div>

        {/* Welcome Text */}
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome to uhealthpharma Admin
        </h1>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Here is your command center. Use the sidebar to manage your store, or get started quickly with the links below.
        </p>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-slate-100 mt-8">
          <button 
            onClick={() => navigate('/admin/allorders')}
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 font-semibold transition-colors border border-slate-200 hover:border-indigo-200"
          >
            <ClipboardList className="w-5 h-5" />
            View All Orders
          </button>
          
          <button 
            onClick={() => navigate('/admin/products/upload')}
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 font-semibold transition-colors border border-slate-200 hover:border-emerald-200"
          >
            <PackagePlus className="w-5 h-5" />
            Add New Product
          </button>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;