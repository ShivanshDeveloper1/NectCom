import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { MegaMenu } from './MegaMenu';
import logo from '../../assets/logo.jpeg'
import {
  Search,
  ShoppingCart,
  User,
  Stethoscope,
  ChevronDown,
  Menu,
  X,
  Truck,
  Leaf
} from 'lucide-react';

export const Navbar = ({ onOpenAuth, onOpenSearch }) => {
  const { totalCount, setIsDrawerOpen } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="container-custom py-3.5 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] text-amber-300 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <img src={logo} alt="Logo" />
          </div>
          <div>
            <span className="font-heading text-xl font-bold tracking-tight text-[#1B4332] block leading-none">
              uhealthpharma
            </span>
            <span className="text-[10px] tracking-widest text-emerald-700 font-semibold uppercase block">
              Herbal & Ayurveda
            </span>
          </div>
        </Link>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-gray-700">
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveMegaMenu('categories')}
          >
            <button className="flex items-center gap-1.5 hover:text-[#2D6A4F] transition-colors py-1">
              Shop by Concern <ChevronDown className="w-4 h-4 text-emerald-600" />
            </button>
          </div>

          <div
            className="relative py-2"
            onMouseEnter={() => setActiveMegaMenu('products')}
          >
            <button className="flex items-center gap-1.5 hover:text-[#2D6A4F] transition-colors py-1">
              Products <ChevronDown className="w-4 h-4 text-emerald-600" />
            </button>
          </div>

          <Link to="/products?tag=Combo" className="hover:text-[#2D6A4F] transition-colors">
            Combos
          </Link>
          <Link to="/products?sort=popular" className="hover:text-[#2D6A4F] transition-colors text-amber-700 font-semibold">
            Offers 🔥
          </Link>
          <Link to="/consultation" className="hover:text-[#2D6A4F] transition-colors flex items-center gap-1">
            <Stethoscope className="w-4 h-4 text-emerald-600" /> Consult Vaidya
          </Link>
          <Link to="/blogs" className="hover:text-[#2D6A4F] transition-colors">
            Blog
          </Link>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-full hover:bg-emerald-50 text-gray-700 hover:text-[#2D6A4F] transition-colors"
            title="Search Products"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            to="/orders"
            className="hidden sm:flex p-2 rounded-full hover:bg-emerald-50 text-gray-700 hover:text-[#2D6A4F] transition-colors"
            title="Track Order"
          >
            <Truck className="w-5 h-5" />
          </Link>

          <button
           onClick={() => navigate('/admin')}
            className="flex items-center gap-1.5 p-2 rounded-full hover:bg-emerald-50 text-gray-700 hover:text-[#2D6A4F] transition-colors"
            title={user ? `Logged in as ${user.phone}` : 'Login / Signup'}
          >
            <User className="w-5 h-5" />
            {user && <span className="text-xs font-semibold text-[#2D6A4F] hidden md:inline">Account</span>}
          </button>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="relative p-2.5 rounded-full bg-[#2D6A4F] text-white hover:bg-[#1B4332] transition-colors shadow-sm"
            aria-label="View Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-gray-900 font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs border-2 border-white">
                {totalCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#2D6A4F]"
          >
            {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mega Menus */}
      {activeMegaMenu && (
        <MegaMenu type={activeMegaMenu} onClose={() => setActiveMegaMenu(null)} />
      )}

      {/* Mobile Drawer Navigation */}
      {isMobileNavOpen && (
        <div className="lg:hidden bg-white border-t border-emerald-100 py-4 px-6 space-y-3 shadow-lg">
          <Link
            to="/products"
            onClick={() => setIsMobileNavOpen(false)}
            className="block py-2 text-gray-800 font-medium border-b border-gray-100"
          >
            All Products
          </Link>
          <Link
            to="/products?tag=Combo"
            onClick={() => setIsMobileNavOpen(false)}
            className="block py-2 text-gray-800 font-medium border-b border-gray-100"
          >
            Combo Deals
          </Link>
          <Link
            to="/consultation"
            onClick={() => setIsMobileNavOpen(false)}
            className="block py-2 text-emerald-700 font-semibold border-b border-gray-100"
          >
            Consult by Vaidya
          </Link>
          <Link
            to="/blogs"
            onClick={() => setIsMobileNavOpen(false)}
            className="block py-2 text-gray-800 font-medium"
          >
            Health Blog & Tips
          </Link>
        </div>
      )}
    </header>
  );
};
export default Navbar;