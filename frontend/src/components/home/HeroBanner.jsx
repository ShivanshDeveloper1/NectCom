import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShieldCheck, ArrowRight } from 'lucide-react';
import ayurved from '../../assets/03.jpg'
import ayurve from '../../assets/04.jpg'
import ayurvm from '../../assets/08.jpg'

const slides = [
  {
    id: 1,
    tagline: '100% Classical Ayurvedic Formulation',
    title: 'Natural Blood Glucose Control with DiabaCare Juice',
    subtitle: 'Cold-pressed Karela, Jamun & Gurmar extract engineered for cellular insulin sensitivity.',
    buttonText: 'Order Now',
    buttonLink: '/products/diabacare-herbal-juice-1000ml',
    badge: 'Save 20% Today',
    bgGradient: 'from-[#1B4332] via-[#2D6A4F] to-[#081c15]',
    image: ayurved
  },
  {
    id: 2,
    tagline: 'Authentic Kshirpak Ayurvedic Taila',
    title: 'Stop Hair Fall & Promote Dense Root Growth',
    subtitle: 'Enriched with pure Bhringraj, Brahmi, and Amla processed in virgin sesame oil.',
    buttonText: 'Shop Hair Care',
    buttonLink: '/products?category=hair-care',
    badge: 'Highest Rated',
    bgGradient: 'from-[#2D6A4F] via-[#1B4332] to-[#132a13]',
    image: ayurve
  },
  {
    id: 3,
    tagline: 'Kashmiri Saffron Night Beauty Secret',
    title: 'Kumkumadi Radiance Glow Elixir',
    subtitle: 'Fade stubborn pigmentation & restore natural youthful luminescence overnight.',
    buttonText: 'Explore Kumkumadi',
    buttonLink: '/products/kumkumadi-radiant-glow-face-serum-30ml',
    badge: 'Pure Saffron',
    bgGradient: 'from-[#386641] via-[#2D6A4F] to-[#1f3622]',
   image: ayurvm
  }
];

export const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gray-900 text-white">
      <div className={`bg-gradient-to-r ${slide.bgGradient} transition-all duration-700 py-16 md:py-24`}>
        <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              {slide.tagline}
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white drop-shadow-md">
              {slide.title}
            </h1>

            <p className="text-emerald-100 text-sm sm:text-lg max-w-2xl leading-relaxed font-light">
              {slide.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to={slide.buttonLink}
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-gray-900 font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-amber-400/20 transition-all text-sm uppercase tracking-wider group"
              >
                {slide.buttonText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-xs text-amber-200 bg-black/30 px-4 py-2 rounded-lg border border-amber-400/30">
                ⭐ 4.9/5 Rating by 10,000+ Customers
              </span>
            </div>
          </div>

          {/* Slide Visual */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-emerald-400/20 group">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4 bg-amber-400 text-gray-900 font-bold text-xs px-3 py-1.5 rounded-full shadow-md">
                {slide.badge}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Navigation Buttons */}
      <button
        onClick={() => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-emerald-700 text-white backdrop-blur-sm transition-all"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => setCurrentSlide((currentSlide + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 hover:bg-emerald-700 text-white backdrop-blur-sm transition-all"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentSlide ? 'bg-amber-400 w-8' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
};