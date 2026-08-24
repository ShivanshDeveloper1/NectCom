const fs = require('fs');
const path = require('path');

const clientDir = 'c:\\Users\\ganes\\OneDrive\\Desktop\\SaaS\\client';

const files = {
  // --- MOCK DATA ---
  'src/data/mockData.js': `
export const mockData = {
  products: Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    name: \`Ayurvedic Wellness Product \${i + 1}\`,
    price: 499 + (i * 50),
    originalPrice: 699 + (i * 50),
    category: \`Category \${(i % 5) + 1}\`,
    rating: (4 + Math.random()).toFixed(1),
    reviews: Math.floor(Math.random() * 500),
    image: 'https://via.placeholder.com/300x300?text=Product+Image',
    isBestseller: i % 4 === 0,
    concern: \`Concern \${(i % 3) + 1}\`
  })),
  concerns: ['Diabetic Wellness', "Women's Wellness", 'Digestive Wellness', 'Pain Reliever', 'Cardiac Wellness', 'Skin Wellness'],
  categories: ['Juices', 'Churna', 'Capsules', 'Syrups', 'Oils', 'Drops', 'Cosmetics', 'Combos'],
  combos: [
    { id: 101, name: 'Diabetes Care Combo', price: 999, originalPrice: 1299, image: 'https://via.placeholder.com/400x300?text=Combo+1' },
    { id: 102, name: 'Immunity Booster Pack', price: 899, originalPrice: 1199, image: 'https://via.placeholder.com/400x300?text=Combo+2' },
    { id: 103, name: 'Skin Glow Routine', price: 799, originalPrice: 999, image: 'https://via.placeholder.com/400x300?text=Combo+3' },
    { id: 104, name: 'Joint Pain Relief Kit', price: 1099, originalPrice: 1499, image: 'https://via.placeholder.com/400x300?text=Combo+4' }
  ],
  blogs: Array.from({ length: 4 }).map((_, i) => ({
    id: i + 1,
    title: \`The Benefits of Ashwagandha \${i + 1}\`,
    excerpt: 'Discover the ancient secrets of Ayurveda and how it can improve your daily life.',
    image: 'https://via.placeholder.com/400x250?text=Blog+Image',
    tag: 'Wellness'
  }))
};
`,
  // --- CONTEXTS ---
  'src/context/CartContext.jsx': `
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ayurveda_cart');
    if (saved) setCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('ayurveda_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    setIsDrawerOpen(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const updateQuantity = (id, quantity) => setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item));
  const clearCart = () => setCart([]);

  const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalCount, totalPrice, isDrawerOpen, setIsDrawerOpen }}>
      {children}
    </CartContext.Provider>
  );
};
`,
  'src/context/AuthContext.jsx': `
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const loginWithOTP = async (phone) => {
    console.log("OTP sent to", phone);
    return true;
  };

  const verifyOTP = async (phone, otp) => {
    console.log("Verified OTP", otp);
    setUser({ phone, name: "Guest User" });
    setToken("fake-token");
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loginWithOTP, verifyOTP, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
`,
  'src/context/UIContext.jsx': `
import React, { createContext, useState } from 'react';

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <UIContext.Provider value={{ isSearchOpen, setIsSearchOpen, isMobileMenuOpen, setIsMobileMenuOpen, toast, showToast }}>
      {children}
    </UIContext.Provider>
  );
};
`,

  // --- API SERVICE ---
  'src/services/api.js': `
import axios from 'axios';
import { mockData } from '../data/mockData';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000
});

export const getProducts = async () => {
  try {
    const res = await api.get('/products');
    return res.data;
  } catch (err) {
    console.warn("Backend unreachable, using mock data");
    return mockData.products;
  }
};
export default api;
`,

  // --- UI COMPONENTS ---
  'src/components/ui/Button.jsx': `
import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const base = "px-6 py-2 rounded-md font-medium transition-all duration-300 transform active:scale-95";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg",
    secondary: "bg-secondary text-white hover:opacity-90",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white"
  };
  return (
    <button className={\`\${base} \${variants[variant]} \${className}\`} {...props}>
      {children}
    </button>
  );
};
export default Button;
`,
  'src/components/ui/Badge.jsx': `
import React from 'react';
const Badge = ({ text, className = "" }) => (
  <span className={\`text-xs font-semibold px-2 py-1 bg-accent text-white rounded-full \${className}\`}>
    {text}
  </span>
);
export default Badge;
`,
  
  // --- LAYOUT COMPONENTS ---
  'src/components/layout/Navbar.jsx': `
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';
import { CartContext } from '../../context/CartContext';

const Navbar = () => {
  const { totalCount, setIsDrawerOpen } = useContext(CartContext);
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Menu className="lg:hidden cursor-pointer" />
          <Link to="/" className="text-2xl font-heading font-bold text-primary">Krishna's</Link>
        </div>
        <div className="hidden lg:flex gap-8 font-medium">
          <Link to="/products" className="hover:text-primary micro-anim">Shop</Link>
          <Link to="/combos" className="hover:text-primary micro-anim">Combos</Link>
          <Link to="/consult" className="hover:text-primary micro-anim">Consult Vaidya</Link>
        </div>
        <div className="flex items-center gap-6">
          <Search className="cursor-pointer hover:text-primary" />
          <User className="cursor-pointer hover:text-primary" />
          <div className="relative cursor-pointer" onClick={() => setIsDrawerOpen(true)}>
            <ShoppingBag className="hover:text-primary" />
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {totalCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
`,
  'src/components/layout/Footer.jsx': `
import React from 'react';

const Footer = () => (
  <footer className="bg-primary-dark text-white py-12 mt-20">
    <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="font-heading text-xl mb-4 text-secondary">Krishna's Ayurveda</h3>
        <p className="text-sm opacity-80">100% Pure & Authentic Ayurvedic Products.</p>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Quick Links</h4>
        <ul className="space-y-2 text-sm opacity-80">
          <li>Shop</li>
          <li>About Us</li>
          <li>Consultation</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Policies</h4>
        <ul className="space-y-2 text-sm opacity-80">
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
          <li>Refund Policy</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Newsletter</h4>
        <input type="email" placeholder="Your Email" className="w-full p-2 text-gray-900 rounded-md" />
        <button className="mt-2 w-full bg-secondary py-2 rounded-md hover:bg-opacity-90">Subscribe</button>
      </div>
    </div>
  </footer>
);
export default Footer;
`,

  // --- HOME COMPONENTS ---
  'src/components/home/HeroBanner.jsx': `
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary-light to-primary text-white py-24 overflow-hidden">
      <div className="container-custom relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-heading mb-6 animate-fade-in-up">Discover Pure Ayurveda</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">Authentic herbs and holistic remedies for a balanced life.</p>
        <Link to="/products">
          <Button variant="secondary" className="text-lg px-8 py-3">Order Now</Button>
        </Link>
      </div>
    </div>
  );
};
export default HeroBanner;
`,
  'src/components/home/Bestsellers.jsx': `
import React, { useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard';
import { getProducts } from '../../services/api';

const Bestsellers = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    getProducts().then(data => setProducts(data.slice(0, 4)));
  }, []);

  return (
    <section className="py-16 container-custom">
      <h2 className="text-3xl font-heading text-center mb-10 text-primary-dark">Our Bestsellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
export default Bestsellers;
`,

  // --- PRODUCT COMPONENT ---
  'src/components/product/ProductCard.jsx': `
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Button from '../ui/Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-xl micro-anim overflow-hidden group">
      <div className="relative overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
        {product.isBestseller && <span className="absolute top-2 left-2 bg-accent text-white text-xs px-2 py-1 rounded">Bestseller</span>}
      </div>
      <div className="p-4 text-center">
        <h3 className="font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className="font-bold text-lg text-primary">₹{product.price}</span>
          <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
        </div>
        <Button onClick={() => addToCart(product)} className="w-full">Add to Cart</Button>
      </div>
    </div>
  );
};
export default ProductCard;
`,
  // --- CART COMPONENT ---
  'src/components/cart/CartDrawer.jsx': `
import React, { useContext } from 'react';
import { X } from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const CartDrawer = () => {
  const { cart, isDrawerOpen, setIsDrawerOpen, updateQuantity, removeFromCart, totalPrice } = useContext(CartContext);

  if (!isDrawerOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" onClick={() => setIsDrawerOpen(false)} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        <div className="p-4 border-b flex justify-between items-center bg-surface">
          <h2 className="text-xl font-heading font-bold">Your Cart</h2>
          <X className="cursor-pointer" onClick={() => setIsDrawerOpen(false)} />
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">Cart is empty</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-primary font-bold">₹{item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 bg-gray-100 rounded">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 bg-gray-100 rounded">+</button>
                    <button onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500 text-sm">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t bg-gray-50">
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total:</span>
            <span>₹{totalPrice}</span>
          </div>
          <Link to="/checkout" onClick={() => setIsDrawerOpen(false)}>
            <Button className="w-full py-3 text-lg">Proceed to Checkout</Button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default CartDrawer;
`,

  // --- PAGES ---
  'src/pages/HomePage.jsx': `
import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import Bestsellers from '../components/home/Bestsellers';

const HomePage = () => (
  <div>
    <HeroBanner />
    <Bestsellers />
  </div>
);
export default HomePage;
`,
  'src/pages/ProductListingPage.jsx': `
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import { getProducts } from '../services/api';

const ProductListingPage = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-heading text-center mb-12">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
};
export default ProductListingPage;
`,
  'src/pages/CheckoutPage.jsx': `
import React from 'react';

const CheckoutPage = () => (
  <div className="container-custom py-12 min-h-screen">
    <h1 className="text-3xl font-heading mb-8">Checkout</h1>
    <p>Checkout flow will be implemented here.</p>
  </div>
);
export default CheckoutPage;
`,

  // --- APP ---
  'src/App.jsx': `
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { UIProvider } from './context/UIContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <UIProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <CartDrawer />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductListingPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="*" element={<div className="text-center py-20"><h1 className="text-4xl">404 Not Found</h1></div>} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </UIProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
`
};

for (const [filename, content] of Object.entries(files)) {
  fs.mkdirSync(path.dirname(path.join(clientDir, filename)), { recursive: true });
  fs.writeFileSync(path.join(clientDir, filename), content.trim() + '\\n');
}
console.log("React components created successfully.");
