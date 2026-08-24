import React, { useState } from 'react';
import { Stethoscope, Calendar, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';

export const ConsultationPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    concern: 'Digestive & Metabolic Wellness',
    date: '',
    timeSlot: '10:00 AM - 11:00 AM',
    notes: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container-custom max-w-4xl mx-auto">
        <div className="text-center space-y-3 mb-10">
          <span className="inline-flex items-center gap-1 text-xs font-bold tracking-widest text-[#2D6A4F] uppercase bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            <Stethoscope className="w-4 h-4" /> Tele-Ayurveda Clinic
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900">
            Book Free Doctor Consultation
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            Schedule a 1-on-1 confidential video call with a certified Ayurvedic Vaidya (BAMS) to understand your Prakriti and get customized herbal prescriptions.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-xl text-center space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="font-heading text-2xl font-bold text-gray-900">Appointment Booked!</h3>
            <p className="text-xs text-gray-600">
              Our clinic receptionist will send you a WhatsApp video call link for <span className="font-bold text-gray-900">{formData.date} ({formData.timeSlot})</span>.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-xl space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">WhatsApp Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit number"
                    className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Primary Concern</label>
                  <select
                    value={formData.concern}
                    onChange={e => setFormData({ ...formData, concern: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-none bg-white font-medium"
                  >
                    <option>Diabetic Glucose Control</option>
                    <option>Digestive & Metabolic Wellness</option>
                    <option>Women's Hormonal Balance</option>
                    <option>Joint & Muscle Pain</option>
                    <option>Hair Fall & Scalp Health</option>
                    <option>Skin Hyperpigmentation</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Preferred Time Slot</label>
                  <select
                    value={formData.timeSlot}
                    onChange={e => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-none bg-white font-medium"
                  >
                    <option>10:00 AM - 11:00 AM</option>
                    <option>02:00 PM - 03:00 PM</option>
                    <option>05:00 PM - 06:00 PM</option>
                    <option>07:00 PM - 08:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Brief Symptoms / Medical History (Optional)</label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Mention any ongoing medication or specific symptoms..."
                  className="w-full p-3 rounded-xl border border-gray-300 focus:border-[#2D6A4F] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2D6A4F] hover:bg-[#1B4332] text-amber-300 font-bold py-3.5 rounded-xl uppercase tracking-wider text-xs shadow-lg"
              >
                Confirm Doctor Appointment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
