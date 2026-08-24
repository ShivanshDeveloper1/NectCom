import React from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../data/mockData';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

export const BlogListPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1 text-xs font-bold tracking-widest text-[#2D6A4F] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <BookOpen className="w-3.5 h-3.5" /> Ayurvedic Wisdom Journal
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            Health & Healing Blogs
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Classical herbal remedies, seasonal routines, and evidence-based Ayurvedic research.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <article key={blog.id} className="bg-white rounded-3xl overflow-hidden border border-emerald-100 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 left-3 bg-[#2D6A4F] text-amber-300 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md shadow-xs">
                    {blog.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-1 text-[11px] text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{blog.date}</span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-gray-900 group-hover:text-[#2D6A4F] transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link to={`/blogs/${blog.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#2D6A4F] hover:underline">
                  Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
