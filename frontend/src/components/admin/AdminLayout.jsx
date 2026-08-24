import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, Store } from "lucide-react";
import Sidebar from "./Sidebar";

export const AdminLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950">
      
      {/* Mobile Top Header */}
      <header className="md:hidden bg-slate-900 border-b border-slate-800 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
            <Store className="w-5 h-5" />
          </div>
          <span className="font-bold text-white text-base">uhealthpharmaAdmin</span>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Backdrop overlay for mobile drawer */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 h-full w-64 shrink-0 transition-transform duration-300 ease-in-out ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <Sidebar onCloseMobile={() => setIsMobileOpen(false)} />
      </aside>

      {/* Admin Page Content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};