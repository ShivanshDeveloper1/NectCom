import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/cart/CartDrawer';
import { LoginModal } from './components/auth/LoginModal';
import { SearchOverlay } from './components/layout/SearchOverlay';
import { HomePage } from './pages/HomePage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConsultationPage } from './pages/ConsultationPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { OrdersPage } from './pages/OrdersPage';
import { NotFoundPage } from './pages/NotFoundPage';
import NavbarProvider from './providers/NavbarProvider';
import { AdminLayout } from './components/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import UploadProductPage from './pages/admin/products/UploadProductPage';
import StockPage from './pages/admin/products/StockPage';
import AdminOrdersPage from './pages/admin/products/AdminOrdersPage';
import DeleteProductPage from './pages/admin/products/DeleteProductPage';
import EditProductPage from './pages/admin/products/EditProduct';
import { ManageVideosPage } from './pages/admin/ManageVideosPage';
// import logo from '../src/assets/logo.jpeg'




export function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        {/* <img src={logo} alt="Logo" /> */}
        <Router>
          <div className="flex flex-col min-h-screen bg-surface selection:bg-amber-300 selection:text-gray-900">
            {/* Top Announcement Bar */}
            <AnnouncementBar />
            {/* Sticky Header Navbar */}
            <NavbarProvider
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenSearch={() => setIsSearchOpen(true)}
            />
            {/* Main Application Routes */}
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListingPage />} />
                <Route path="/products/:slug" element={<ProductDetailPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/consultation" element={<ConsultationPage />} />
                <Route path="/blogs" element={<BlogListPage />} />
                <Route path="/blogs/:id" element={<BlogDetailPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                
                <Route path="/admin" element={<AdminLayout />} >
                <Route index element={<DashboardPage/>} />
                <Route path="videos" element={<ManageVideosPage />} />
                  <Route path="products/upload" element={<UploadProductPage />} />
  <Route path="products/stock" element={<StockPage />} />
  <Route path="products/delete" element={<DeleteProductPage />} />
  <Route path="products/edit" element={<EditProductPage />} />
  <Route path="orders" element={<AdminOrdersPage />} />
  {/* <Route path="orders/add" element={<AddOrderPage />} /> */}
                </Route >
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
            {/* Global Footer */}
            <Footer />
            {/* Slide-in Cart Drawer */}
            <CartDrawer />
            {/* Mobile OTP Auth Modal */}
            <LoginModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
            {/* Live Search Overlay */}
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;