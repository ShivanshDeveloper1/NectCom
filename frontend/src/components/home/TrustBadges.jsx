// import React from 'react';
// import { ShieldCheck, Leaf, Truck, Award, RotateCcw } from 'lucide-react';

// const badges = [
//   { icon: ShieldCheck, text: '100% Secure Payments' },
//   { icon: Leaf, text: '100% Pure & Authentic Herbs' },
//   { icon: Truck, text: 'Free Delivery Above ₹499' },
//   { icon: Award, text: 'ISO & GMP Certified Lab' },
//   { icon: RotateCcw, text: 'Hassle-Free 7 Day Returns' }
// ];

// export const TrustBadges = () => {
//   return (
//     <div className="bg-[#2D6A4F] text-amber-100 py-4 border-y border-emerald-700/60 overflow-hidden shadow-inner">
//       <div className="container-custom flex items-center justify-around flex-wrap gap-4 text-xs font-semibold uppercase tracking-wider">
//         {badges.map((b, idx) => {
//           const Icon = b.icon;
//           return (
//             <div key={idx} className="flex items-center gap-2.5 px-3 py-1 bg-emerald-900/40 rounded-full border border-emerald-600/40 shadow-xs hover:scale-105 transition-transform">
//               <Icon className="w-4 h-4 text-amber-400" />
//               <span>{b.text}</span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };


import React from 'react';
import { ShieldCheck, Leaf, Truck, Award, RotateCcw } from 'lucide-react';

const badges = [
  { icon: ShieldCheck, text: '100% Secure Payments' },
  { icon: Leaf, text: '100% Pure & Authentic Herbs' },
  { icon: Truck, text: 'Free Delivery Above ₹499' },
  { icon: Award, text: 'ISO & GMP Certified Lab' },
  { icon: RotateCcw, text: 'Hassle-Free 7 Day Returns' }
];

export const TrustBadges = () => {
  // Inner helper component to keep code DRY (Don't Repeat Yourself)
  const BadgeTrack = () => (
    <div className="flex items-center gap-8 px-4 text-xs font-semibold uppercase tracking-wider animate-infinite-marquee shrink-0">
      {badges.map((b, idx) => {
        const Icon = b.icon;
        return (
          <div 
            key={idx} 
            className="flex items-center gap-2.5 px-4 py-1.5 bg-emerald-900/40 rounded-full border border-emerald-600/40 shadow-xs hover:scale-105 transition-transform"
          >
            <Icon className="w-4 h-4 text-amber-400" />
            <span>{b.text}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="bg-[#2D6A4F] text-amber-100 py-4 border-y border-emerald-700/60 overflow-hidden shadow-inner w-full group">
      {/* Outer track runner */}
      <div className="flex whitespace-nowrap overflow-hidden width-max">
        <BadgeTrack />
        <BadgeTrack />
      </div>

      {/* Global CSS Injection for seamless looping */}
      <style>{`
        @keyframes infiniteScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-infinite-marquee {
          animation: infiniteScroll 20s linear infinite;
        }
        /* Pauses the entire row smoothly when hovering anywhere on the banner */
        .group:hover .animate-infinite-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
