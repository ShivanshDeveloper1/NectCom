import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-10 max-w-md w-full border border-emerald-100 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#2D6A4F] flex items-center justify-center mx-auto">
          <Leaf className="w-8 h-8" />
        </div>
        <h2 className="font-heading text-4xl font-bold text-gray-900">404</h2>
        <h3 className="font-heading text-xl font-bold text-gray-800">Page Not Found</h3>
        <p className="text-xs text-gray-500">The page you are looking for does not exist or has been moved.</p>
        <Link
          to="/"
          className="inline-block bg-[#2D6A4F] hover:bg-[#1B4332] text-amber-300 font-bold px-6 py-3 rounded-xl uppercase text-xs tracking-wider shadow-md"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};
