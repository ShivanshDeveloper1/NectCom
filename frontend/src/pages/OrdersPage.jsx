import React from 'react';
import { Truck, Package, Clock, CheckCircle2 } from 'lucide-react';

export const OrdersPage = () => {
  const mockOrders = [
    {
      id: 'AYU-849204',
      date: 'July 25, 2026',
      total: 749,
      status: 'In Transit',
      items: ['DiabaCare Herbal Juice (1000ml)', 'Triphala Gut Churna (250g)']
    },
    {
      id: 'AYU-731902',
      date: 'June 10, 2026',
      total: 399,
      status: 'Delivered',
      items: ['Maha Bhringraj Hair Growth Oil (200ml)']
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container-custom max-w-4xl mx-auto space-y-6">
        <h1 className="font-heading text-3xl font-bold text-gray-900">Your Orders & Tracking</h1>

        <div className="space-y-4">
          {mockOrders.map(order => (
            <div key={order.id} className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-3 gap-2 text-xs">
                <div>
                  <span className="text-gray-400">Order ID:</span>{' '}
                  <span className="font-bold text-gray-900">#{order.id}</span>
                </div>
                <div className="text-gray-400">Placed on {order.date}</div>
                <span className={`font-bold px-3 py-1 rounded-full text-[11px] ${
                  order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <p className="font-bold text-gray-800">Items:</p>
                <ul className="list-disc list-inside text-gray-600">
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="font-bold text-gray-900 text-sm">Total: ₹{order.total}</span>
                <button className="bg-emerald-50 text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-amber-300 font-bold px-4 py-2 rounded-xl transition-colors">
                  Track Shipment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
