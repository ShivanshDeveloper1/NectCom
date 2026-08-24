import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, CheckCircle, ArrowRight, Shield } from 'lucide-react';

export const ConsultationCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 via-emerald-50/50 to-white border-y border-emerald-100">
      <div className="container-custom grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2D6A4F] text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Stethoscope className="w-4 h-4" /> Free Doctor Consultation
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            Unsure Which Herbs Suit Your Body Type? Speak With Our Senior Vaidyas
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
            Get personalized Dosha analysis (Nadi Pariksha consultation), dietary regime plans, and tailored herb recommendations directly from certified BAMS Ayurvedic doctors.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Certified BAMS Doctors</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Confidential Video Call</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Customized Herbal Regimen</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col items-center justify-center bg-white p-8 rounded-3xl border border-emerald-200 shadow-xl text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#2D6A4F] flex items-center justify-center shadow-inner">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-gray-900">Book Tele-Consultation</h3>
            <p className="text-xs text-gray-500 mt-1">Free 15-minute video call with Vaidya</p>
          </div>
          <Link
            to="/consultation"
            className="w-full bg-[#2D6A4F] hover:bg-[#1B4332] text-amber-300 font-bold py-3 px-6 rounded-xl shadow-lg transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2"
          >
            Book Appointment Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
