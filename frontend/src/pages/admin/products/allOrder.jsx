import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Package, Clock, MapPin, Phone, CheckCircle, AlertCircle } from 'lucide-react';

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/orders`);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <p className="text-sm font-semibold text-emerald-800">Loading Orders...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <Package className="w-8 h-8 text-[#2D6A4F]" /> Placed Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-emerald-100 shadow-xs">
            <p className="text-gray-600 text-sm">No orders found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-3xl border border-emerald-100 p-6 shadow-xs space-y-4"
              >
                {/* Header Information */}
                <div className="flex flex-wrap justify-between items-center border-b pb-4 gap-2">
                  <div>
                    <span className="text-xs text-gray-500">Order ID:</span>
                    <p className="text-sm font-bold text-[#1B4332]">#{order._id}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Payment Status Badge */}
                    {order.isPaid ? (
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Paid Online
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Pay on Delivery ({order.paymentMethod})
                      </span>
                    )}

                    {/* Order Status Badge */}
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Items & Address Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                  {/* Item List */}
                  <div className="md:col-span-2 space-y-3">
                    <p className="font-bold text-gray-700 text-sm">Order Items:</p>
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b pb-2">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded-lg border"
                          />
                          <div>
                            <p className="font-semibold text-gray-800">{item.name}</p>
                            <p className="text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address Information */}
                  <div className="bg-slate-50 p-4 rounded-2xl space-y-2 border border-slate-100">
                    <p className="font-bold text-gray-800 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-emerald-700" /> Delivery Address
                    </p>
                    <p className="font-semibold text-gray-900">{order.shippingAddress?.fullName}</p>
                    <p className="text-gray-600 leading-tight">
                      {order.shippingAddress?.addressLine}, {order.shippingAddress?.city},{' '}
                      {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                    </p>
                    <p className="text-gray-700 font-medium flex items-center gap-1 pt-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-700" /> {order.shippingAddress?.phone}
                    </p>
                  </div>
                </div>

                {/* Total Summary */}
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-xs text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block">Total Amount:</span>
                    <span className="text-lg font-bold text-[#1B4332]">₹{order.totalPrice}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};