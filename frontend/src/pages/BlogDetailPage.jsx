import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogs } from '../data/mockData';
import { Calendar, User, ArrowLeft } from 'lucide-react';

export const BlogDetailPage = () => {
  const { id } = useParams();
  const blog = blogs.find(b => b.id.toString() === id) || blogs[0];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container-custom max-w-3xl mx-auto bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm space-y-6">
        <Link to="/blogs" className="inline-flex items-center gap-1 text-xs font-bold text-[#2D6A4F] hover:underline mb-2">
          <ArrowLeft className="w-4 h-4" /> Back to All Articles
        </Link>

        <span className="inline-block bg-emerald-100 text-[#1B4332] text-xs font-bold px-3 py-1 rounded-full uppercase">
          {blog.category}
        </span>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 text-xs text-gray-500 border-y border-gray-100 py-3">
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-emerald-700" /> {blog.date}</span>
          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-emerald-700" /> Vaidya Rajesh Sharma</span>
        </div>

        <div className="aspect-video rounded-2xl overflow-hidden shadow-md">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        <div className="prose text-xs sm:text-sm text-gray-700 leading-relaxed space-y-4 pt-4">
          <p className="font-semibold text-gray-900 text-base">{blog.excerpt}</p>
          <p>
            Ayurveda views every individual as a unique combination of five basic elements: Ether, Air, Fire, Water, and Earth. These combine into three primary bio-energies known as Doshas: Vata (Air & Ether), Pitta (Fire & Water), and Kapha (Water & Earth).
          </p>
          <p>
            Regular use of classical herbs helps maintain Agni (digestive fire), clear Ama (toxic build-up), and ensure long-term vitality.
          </p>
        </div>
      </div>
    </div>
  );
};
