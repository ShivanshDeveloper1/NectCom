import React from 'react';
import { Link } from 'react-router-dom';
import { blogs } from '../../data/mockData';
import { BookOpen, Calendar, ArrowRight } from 'lucide-react';

export const BlogSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1 text-xs font-bold tracking-widest text-[#2D6A4F] uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <BookOpen className="w-3.5 h-3.5" /> Wisdom & Science
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            Ayurvedic Health Knowledge
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Deep dive into classical Ayurvedic principles, seasonal rituals (Ritucharya), and herbal remedy guides.
          </p>
        </div>

        {/* 4-column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map(blog => (
            <article
              key={blog.id}
              className="group bg-white rounded-2xl border border-emerald-100/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#2D6A4F] text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
                    {blog.category}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{blog.date}</span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-gray-900 group-hover:text-[#2D6A4F] transition-colors line-clamp-2 leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to={`/blogs/${blog.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D6A4F] hover:text-[#1B4332] group/link"
                >
                  Read Full Article <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
