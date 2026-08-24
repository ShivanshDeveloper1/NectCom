import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Instagram, Facebook, Youtube, Twitter, Mail, Phone, MapPin, Send } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#1B4332] text-white pt-16 pb-8 border-t-4 border-amber-400">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-emerald-800/60">
          {/* Col 1: About Us */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-amber-400 text-gray-900 flex items-center justify-center font-bold">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-heading text-lg font-bold text-amber-200">
                Krishna's Herbal
              </span>
            </div>
            <p className="text-xs text-emerald-100/80 leading-relaxed mb-4">
              Bringing authentic classical Ayurvedic wisdom to modern living with 100% pure, unadulterated herbal formulations since 2007.
            </p>
            <div className="flex space-x-3 text-amber-300">
              <a href="https://www.instagram.com/uhpayurveda" className="p-2 rounded-lg bg-emerald-900/60 hover:bg-amber-400 hover:text-gray-900 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-emerald-900/60 hover:bg-amber-400 hover:text-gray-900 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-emerald-900/60 hover:bg-amber-400 hover:text-gray-900 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-emerald-900/60 hover:bg-amber-400 hover:text-gray-900 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Your Account */}
          <div>
            <h4 className="font-heading font-semibold text-amber-300 text-sm tracking-wider uppercase mb-4">
              Your Account
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80">
              <li><Link to="/orders" className="hover:text-amber-300 transition-colors">Track Orders</Link></li>
              <li><Link to="/orders" className="hover:text-amber-300 transition-colors">Order History</Link></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Ayurvedic Rewards Club</a></li>
              <li><Link to="/consultation" className="hover:text-amber-300 transition-colors">Doctor Consultation</Link></li>
            </ul>
          </div>

          {/* Col 3: Policies */}
          <div>
            <h4 className="font-heading font-semibold text-amber-300 text-sm tracking-wider uppercase mb-4">
              Policies
            </h4>
            <ul className="space-y-2.5 text-xs text-emerald-100/80">
              <li><a href="#" className="hover:text-amber-300 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Quality Assurance & Lab Reports</a></li>
            </ul>
          </div>

          {/* Col 4: Contact & Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-amber-300 text-sm tracking-wider uppercase mb-4">
              Get In Touch
            </h4>
            <div className="space-y-2.5 text-xs text-emerald-100/80 mb-4">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400" /> +91 1800-123-HERB
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" /> support@krishnasherbal.com
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" /> Herbal Park, Rajasthan, India
              </p>
            </div>
          </div>

          {/* Col 5: Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-amber-300 text-sm tracking-wider uppercase mb-4">
              Stay Connected
            </h4>
            <p className="text-xs text-emerald-100/80 mb-3">
              Subscribe for Ayurvedic wellness tips & secret offers.
            </p>
            <form onSubmit={e => e.preventDefault()} className="flex">
              <input
                type="email"
                placeholder="Enter email..."
                className="bg-emerald-950/80 border border-emerald-700 text-xs px-3 py-2 rounded-l-lg text-white placeholder-emerald-400 focus:outline-none focus:border-amber-400 w-full"
              />
              <button type="submit" className="bg-amber-400 hover:bg-amber-300 text-gray-900 px-3 rounded-r-lg font-bold">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Marketplace presence */}
        <div className="py-6 border-b border-emerald-800/40 flex flex-wrap items-center justify-between gap-4 text-xs text-emerald-200">
          <span className="font-semibold text-amber-300">Also Available At:</span>
          <div className="flex flex-wrap gap-4 font-bold tracking-wider opacity-80">
            <span>AMAZON</span>
            <span>FLIPKART</span>
            <span>TATA 1MG</span>
            <span>PHARMEASY</span>
            <span>NYKAA</span>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 text-center text-xs text-emerald-200/70">
          © {new Date().getFullYear()} Krishna's Herbal & Ayurveda. All rights reserved. Built with React & Node.js.
        </div>
      </div>
    </footer>
  );
};