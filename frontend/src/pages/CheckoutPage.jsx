import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { ShieldCheck, Truck, CreditCard, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CheckoutPage = () => {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [step, setStep] = useState('address'); // 'address' | 'payment' | 'confirmation'
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddressSubmit = e => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      setStep('confirmation');
    }, 1500);
  };

  if (step === 'confirmation') {
    return (
      <div className="bg-slate-50 min-h-screen py-16">
        <div className="container-custom max-w-xl mx-auto bg-white rounded-3xl p-8 border border-emerald-100 shadow-xl text-center space-y-6">
          <CheckCircle2 className="w-20 h-20 text-emerald-600 mx-auto animate-bounce" />
          <h2 className="font-heading text-3xl font-bold text-gray-900">Order Confirmed!</h2>
          <p className="text-xs text-gray-600 leading-relaxed">
            Thank you for ordering from Krishna's Herbal & Ayurveda. Your order <span className="font-bold text-[#1B4332]">#AYU-849204</span> has been successfully placed.
          </p>
          <div className="bg-emerald-50 p-4 rounded-2xl text-xs text-emerald-800 space-y-1">
            <p className="font-bold">Estimated Delivery Date:</p>
            <p className="text-sm font-bold text-[#1B4332]">3-5 Business Days</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-[#2D6A4F] hover:bg-[#1B4332] text-amber-300 font-bold py-3.5 rounded-xl uppercase text-xs tracking-wider"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container-custom">
        <h1 className="font-heading text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Area */}
          <div className="lg:col-span-7 space-y-6">
            {step === 'address' ? (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-xs space-y-6">
                <h3 className="font-heading text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-emerald-700" /> Shipping Address
                </h3>

                <form onSubmit={handleAddressSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={address.fullName}
                        onChange={e => setAddress({ ...address, fullName: e.target.value })}
                        placeholder="e.g. Ramesh Sharma"
                        className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={address.phone}
                        onChange={e => setAddress({ ...address, phone: e.target.value })}
                        placeholder="10-digit number"
                        className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Address (House No, Street, Colony)</label>
                    <input
                      type="text"
                      required
                      value={address.addressLine}
                      onChange={e => setAddress({ ...address, addressLine: e.target.value })}
                      placeholder="Street address"
                      className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={address.city}
                        onChange={e => setAddress({ ...address, city: e.target.value })}
                        className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={address.state}
                        onChange={e => setAddress({ ...address, state: e.target.value })}
                        className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Pincode</label>
                      <input
                        type="text"
                        required
                        value={address.pincode}
                        onChange={e => setAddress({ ...address, pincode: e.target.value })}
                        className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2D6A4F] hover:bg-[#1B4332] text-amber-300 font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md mt-4 flex items-center justify-center gap-2"
                  >
                    Proceed to Payment <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-xs space-y-6">
                <h3 className="font-heading text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-700" /> Select Payment Method
                </h3>

                <div className="space-y-3">
                  <label
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'razorpay'
                        ? 'border-[#2D6A4F] bg-emerald-50/60 font-bold'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={paymentMethod === 'razorpay'} readOnly className="accent-[#2D6A4F]" />
                      <div>
                        <span className="text-xs text-gray-900 block font-bold">Razorpay Secure Online Payment</span>
                        <span className="text-[11px] text-gray-500">UPI, Credit/Debit Cards, NetBanking, Wallets</span>
                      </div>
                    </div>
                    <span className="text-xs bg-amber-300 text-gray-900 font-extrabold px-2.5 py-1 rounded">FAST</span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#2D6A4F] bg-emerald-50/60 font-bold'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={paymentMethod === 'cod'} readOnly className="accent-[#2D6A4F]" />
                      <div>
                        <span className="text-xs text-gray-900 block font-bold">Cash on Delivery (COD)</span>
                        <span className="text-[11px] text-gray-500">Pay cash upon parcel arrival</span>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    onClick={() => setStep('address')}
                    className="px-4 py-3 rounded-xl border border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-100"
                  >
                    Back to Address
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 bg-[#2D6A4F] hover:bg-[#1B4332] text-amber-300 font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-md"
                  >
                    {isProcessing ? 'Processing Order...' : `Pay ₹${totalPrice >= 499 ? totalPrice : totalPrice + 50}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs space-y-4">
              <h4 className="font-heading text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
                Order Summary ({cart.length} items)
              </h4>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-xs">
                    <span className="text-gray-800 line-clamp-1 flex-1 pr-2">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-emerald-700 font-bold">{totalPrice >= 499 ? 'FREE' : '₹50'}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total Payable</span>
                  <span className="text-[#1B4332] text-base">₹{totalPrice >= 499 ? totalPrice : totalPrice + 50}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};