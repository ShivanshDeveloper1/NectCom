import React from 'react';
import { Wrench, HardHat, ArrowLeft, RefreshCw, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-52 sm:w-72 h-52 sm:h-72 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Card */}
      <div className="max-w-xl w-full text-center z-10 bg-slate-900/80 backdrop-blur-md border border-slate-800 p-6 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl shadow-2xl">
        
        {/* Animated Icon Badge */}
        <div className="relative inline-flex mb-6 sm:mb-8">
          <div className="p-3.5 sm:p-4 bg-indigo-600/20 rounded-2xl border border-indigo-500/30 text-indigo-400">
            <HardHat className="w-10 h-10 sm:w-12 sm:h-12 animate-bounce" />
          </div>
          <div className="absolute -bottom-2 -right-2 p-1.5 sm:p-2 bg-slate-800 border border-slate-700 rounded-xl text-amber-400">
            <Wrench className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          Under Active Development
        </div>

        {/* Heading & Subtitle */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight font-heading">
          Dashboard Coming Soon
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm lg:text-base leading-relaxed mb-6 sm:mb-8">
          We are currently crafting an awesome dashboard analytics experience for you. This module will be live shortly!
        </p>

        {/* Progress Bar Display */}
        <div className="bg-slate-800/60 p-3.5 sm:p-4 rounded-xl border border-slate-800 mb-6 sm:mb-8">
          <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-400" /> System Build Status
            </span>
            <span className="text-indigo-400 font-bold">75%</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: '75%' }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigate('/admin/products/upload')}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go to Upload Product
          </button>

          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto px-5 sm:px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs sm:text-sm rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Refresh Status
          </button>
        </div>

      </div>

      {/* Footer Watermark */}
      <p className="mt-6 sm:mt-8 text-xs text-slate-600 z-10 text-center">
        Uhealthpharma &bull; E-Commerce Platform
      </p>
    </div>
  );
};

export default DashboardPage;