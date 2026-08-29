import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Truck, CreditCard, ArrowRight, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

export const CheckoutPage = () => {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [step, setStep] = useState('address'); // 'address' | 'payment' | 'confirmation'
  const [placedOrderId, setPlacedOrderId] = useState(null);
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD'); // Default to COD
  const [isProcessing, setIsProcessing] = useState(false);

  const finalAmount = totalPrice >= 499 ? totalPrice : totalPrice + 50;
  const API_URL = import.meta.env.VITE_API_URL;

  const handleAddressSubmit = e => {
    e.preventDefault();
    setStep('payment');
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const buildOrderPayload = (payMethod, paymentResult = {}) => ({
    orderItems: cart.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image || 'https://via.placeholder.com/150',
      product: item._id
    })),
    shippingAddress: address,
    paymentMethod: payMethod,
    paymentResult,
    totalPrice: finalAmount
  });

  // Handle Online Razorpay Payment Flow
  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    
    if (!res) {
      alert('Razorpay SDK failed to load.');
      setIsProcessing(false);
      return;
    }

    try {
      const result = await axios.post(`${API_URL}/api/payment/create-order`, { amount: finalAmount });
      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_TUiNHmXIGNWwSP',
        amount: amount.toString(),
        currency,
        name: "Uhealthpharma Herbal & Ayurveda",
        description: 'Store Purchase',
        order_id,
        handler: async function (response) {
          try {
            const orderPayload = buildOrderPayload('Razorpay', {
              id: response.razorpay_payment_id,
              status: 'Success',
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            });

            const savedOrder = await axios.post(`${API_URL}/api/orders`, orderPayload);
            setPlacedOrderId(savedOrder.data._id);
            clearCart();
            setStep('confirmation');
          } catch (error) {
            console.error('Order saving failed:', error);
            alert('Payment was successful but order record creation failed. Please contact support.');
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: address.fullName,
          contact: address.phone
        },
        theme: { color: '#1B4332' },
        modal: { ondismiss: () => setIsProcessing(false) }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error);
      alert('Failed to process online payment.');
      setIsProcessing(false);
    }
  };

  // Handle Cash on Delivery Flow
  const handleCODPayment = async () => {
    setIsProcessing(true);
    try {
      const orderPayload = buildOrderPayload('COD');
      const savedOrder = await axios.post(`${API_URL}/api/orders`, orderPayload);
      setPlacedOrderId(savedOrder.data._id);
      clearCart();
      setStep('confirmation');
    } catch (error) {
      console.error('COD Order Error:', error);
      alert('Failed to place Cash on Delivery order.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'Razorpay') {
      handleRazorpayPayment();
    } else {
      handleCODPayment();
    }
  };

  if (step === 'confirmation') {
    return (
      <div className="bg-slate-50 min-h-screen py-16">
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-8 border border-emerald-100 shadow-xl text-center space-y-6">
          <CheckCircle2 className="w-20 h-20 text-emerald-600 mx-auto animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-900">Order Confirmed!</h2>
          <p className="text-sm text-gray-600">
            Thank you for ordering. Your Order ID is <span className="font-bold text-[#1B4332]">#{placedOrderId}</span>.
          </p>
          <div className="bg-emerald-50 p-4 rounded-2xl text-xs text-emerald-800 space-y-1">
            <p className="font-bold">Payment Status:</p>
            <p className="text-sm font-bold text-[#1B4332]">
              {paymentMethod === 'COD' ? 'Cash on Delivery (Pay when parcel arrives)' : 'Paid Online'}
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/orders')}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 rounded-xl text-xs"
            >
              View My Orders
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-[#2D6A4F] hover:bg-[#1B4332] text-amber-300 font-bold py-3 rounded-xl text-xs uppercase"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            {step === 'address' ? (
              <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs space-y-6">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-3 flex items-center gap-2">
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
                        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none"
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
                        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-gray-700 block mb-1">Address Line</label>
                    <input
                      type="text"
                      required
                      value={address.addressLine}
                      onChange={e => setAddress({ ...address, addressLine: e.target.value })}
                      placeholder="House No, Street, Colony"
                      className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none"
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
                        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={address.state}
                        onChange={e => setAddress({ ...address, state: e.target.value })}
                        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-gray-700 block mb-1">Pincode</label>
                      <input
                        type="text"
                        required
                        value={address.pincode}
                        onChange={e => setAddress({ ...address, pincode: e.target.value })}
                        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#2D6A4F] hover:bg-[#1B4332] text-amber-300 font-bold py-3.5 rounded-xl uppercase text-xs flex items-center justify-center gap-2 mt-4"
                  >
                    Proceed to Payment <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs space-y-6">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-3 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-emerald-700" /> Payment Options
                </h3>

                <div className="space-y-3">
                  <label
                    onClick={() => setPaymentMethod('COD')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer ${
                      paymentMethod === 'COD' ? 'border-[#2D6A4F] bg-emerald-50/60 font-bold' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={paymentMethod === 'COD'} readOnly className="accent-[#2D6A4F]" />
                      <div>
                        <span className="text-xs text-gray-900 block font-bold">Cash on Delivery (COD)</span>
                        <span className="text-[11px] text-gray-500">Pay cash upon delivery</span>
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setPaymentMethod('Razorpay')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer ${
                      paymentMethod === 'Razorpay' ? 'border-[#2D6A4F] bg-emerald-50/60 font-bold' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input type="radio" checked={paymentMethod === 'Razorpay'} readOnly className="accent-[#2D6A4F]" />
                      <div>
                        <span className="text-xs text-gray-900 block font-bold">Razorpay Online</span>
                        <span className="text-[11px] text-gray-500">UPI, Cards, NetBanking</span>
                      </div>
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    onClick={() => setStep('address')}
                    className="px-4 py-3 rounded-xl border border-gray-300 font-bold text-xs text-gray-700 hover:bg-gray-100"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 bg-[#2D6A4F] hover:bg-[#1B4332] text-amber-300 font-bold py-3.5 rounded-xl uppercase text-xs disabled:opacity-75"
                  >
                    {isProcessing ? 'Placing Order...' : paymentMethod === 'COD' ? `Place Order (COD ₹${finalAmount})` : `Pay ₹${finalAmount}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs space-y-4">
              <h4 className="text-lg font-bold text-gray-900 border-b pb-3">Order Summary</h4>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {cart.map(item => (
                  <div key={item._id} className="flex justify-between items-center text-xs">
                    <span className="text-gray-800 line-clamp-1 flex-1 pr-2">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t space-y-2 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-emerald-700 font-bold">{totalPrice >= 499 ? 'FREE' : '₹50'}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t">
                  <span>Total Payable</span>
                  <span className="text-[#1B4332] text-base">₹{finalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};