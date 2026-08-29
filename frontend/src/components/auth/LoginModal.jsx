import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { X, Phone, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LoginModal = ({ isOpen, onClose }) => {
  const { loginWithOTP, verifyOTP } = useContext(AuthContext);
  const [step, setStep] = useState('phone'); // 'phone' | 'otp' | 'success'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (phone.length < 10) return;
    setLoading(true);
    await loginWithOTP(phone);
    setLoading(false);
    setStep('otp');
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) return;
    setLoading(true);
    await verifyOTP(phone, fullOtp);
    setLoading(false);
    setStep('success');
    setTimeout(() => {
      onClose();
      setStep('phone');
      setPhone('');
      setOtp(['', '', '', '', '', '']);
    }, 1500);
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-xs" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl z-10 border border-emerald-100 animate-scaleUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'phone' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#2D6A4F] flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-gray-900">Mobile Login / Signup</h3>
              <p className="text-xs text-gray-500">Enter your 10-digit mobile number to receive an instant OTP.</p>
            </div>

            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">Mobile Number</label>
                <div className="flex rounded-xl border border-gray-300 overflow-hidden focus-within:border-[#2D6A4F] focus-within:ring-2 focus-within:ring-emerald-100">
                  <span className="bg-gray-100 text-gray-700 font-bold text-xs px-3.5 flex items-center border-r border-gray-300">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit number"
                    className="w-full px-3.5 py-3 text-sm focus:outline-none text-gray-900 font-semibold"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={phone.length < 10 || loading}
                className="w-full bg-[#2D6A4F] hover:bg-[#1B4332] text-amber-300 font-bold py-3.5 rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider disabled:opacity-50"
              >
                {loading ? 'Sending OTP...' : 'Send OTP Code'}
              </button>
            </form>

            <div className="flex items-center gap-1.5 text-[11px] text-gray-400 justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>We never spam or share your personal contact details.</span>
            </div>
          </div>
        )}

        {step === 'otp' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h3 className="font-heading text-2xl font-bold text-gray-900">Verify OTP Code</h3>
              <p className="text-xs text-gray-500">
                Enter the 6-digit OTP sent to <span className="font-bold text-gray-900">+91 {phone}</span>
              </p>
            </div>

            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="flex justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(idx, e.target.value)}
                    className="w-12 h-12 text-center text-lg font-bold border border-gray-300 rounded-xl focus:border-[#2D6A4F] focus:ring-2 focus:ring-emerald-100 focus:outline-none bg-slate-50"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={otp.join('').length < 6 || loading}
                className="w-full bg-[#2D6A4F] hover:bg-[#1B4332] text-amber-300 font-bold py-3.5 rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider"
              >
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setStep('phone')}
                className="text-xs font-semibold text-[#2D6A4F] hover:underline"
              >
                Change mobile number
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="font-heading text-2xl font-bold text-gray-900">Login Successful!</h3>
            <p className="text-xs text-gray-500">Welcome to Uhealthpharma Herbal & Ayurveda</p>
          </div>
        )}
      </div>
    </div>
  );
};
