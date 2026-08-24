import React, { useState } from 'react';
import { X, ShieldAlert, Truck, PhoneCall } from 'lucide-react';

export const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#1B4332] text-white text-xs py-2 px-4 relative z-50 overflow-hidden border-b border-[#2D6A4F]">
      <div className="container-custom flex justify-between items-center">
        <div className="flex items-center space-x-6 animate-pulse mx-auto sm:mx-0">
          <span className="flex items-center gap-1 font-medium text-amber-200">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            Beware of fake calls & unauthorized sellers!
          </span>
          <span className="hidden md:flex items-center gap-1 text-emerald-100">
            <Truck className="w-3.5 h-3.5 text-emerald-300" />
            FREE Express Delivery on all Ayurvedic orders over ₹499
          </span>
          <span className="hidden lg:flex items-center gap-1 text-emerald-100">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
            Free Doctor Consultation: +91 1800-123-HERB
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-300 hover:text-white transition-colors p-1"
          aria-label="Close Announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
