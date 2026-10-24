"use client";

import React, { useState } from "react";
import {
  CalendarCheck,
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  Sparkles,
  Heart
} from "lucide-react";
import { CENTRE_LOCATION, CENTRE_PHONE, CENTRE_EMAIL, BRAND_SERVICES } from "@/lib/constants";

export default function ContactAppointmentSection() {
  const [formType, setFormType] = useState<"ENQUIRY" | "APPOINTMENT">("ENQUIRY");
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{ id: string; message: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    parentName: "",
    childName: "",
    childAge: "",
    phone: "",
    email: "",
    areaCity: "Mohali / Chandigarh Tricity",
    program: "Speech & Language Therapy",
    preferredDate: "",
    preferredTime: "10:00 AM",
    message: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessData(null);
    setLoading(true);

    try {
      if (formType === "ENQUIRY") {
        const res = await fetch("/api/enquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            parentName: formData.parentName,
            childName: formData.childName,
            childAge: Number(formData.childAge) || 5,
            phone: formData.phone,
            email: formData.email,
            program: formData.program,
            message: `${formData.areaCity ? `[City/Area: ${formData.areaCity}] ` : ""}${formData.message}`
          })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Submission failed");

        setSuccessData({
          id: data.enquiry.id,
          message: data.message || "Thank you! Your enquiry has been received."
        });
      } else {
        const res = await fetch("/api/appointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            parentName: formData.parentName,
            childName: formData.childName,
            phone: formData.phone,
            email: formData.email,
            program: formData.program,
            appointmentDate: formData.preferredDate || new Date().toISOString().split("T")[0],
            appointmentTime: formData.preferredTime,
            notes: `${formData.areaCity ? `[City: ${formData.areaCity}, Age: ${formData.childAge}] ` : ""}${formData.message}`
          })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Booking request failed");

        setSuccessData({
          id: data.appointment.id,
          message: data.message || "Your appointment slot has been requested successfully!"
        });
      }

      setFormData({
        parentName: "",
        childName: "",
        childAge: "",
        phone: "",
        email: "",
        areaCity: "Mohali / Chandigarh Tricity",
        program: "Speech & Language Therapy",
        preferredDate: "",
        preferredTime: "10:00 AM",
        message: ""
      });
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#FFFBF5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[11px] sm:text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">Connect With Hunky Dory • {CENTRE_LOCATION}</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Book an Assessment or Enquire
          </h2>
          <p className="text-sm sm:text-lg text-[#15803D] font-bold">
            Every Child. Every Ability. Every Day. A New Step Forward.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Visit us at {CENTRE_LOCATION} or schedule a personalized evaluation with our developmental specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
          
          {/* Left Column: Form Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-10 border-2 border-amber-200 warm-shadow">
            
            {/* Form Mode Selector */}
            <div className="grid grid-cols-1 xs:grid-cols-2 p-1 bg-amber-50 rounded-2xl mb-6 sm:mb-8 border border-amber-200 gap-1.5 xs:gap-0">
              <button
                type="button"
                onClick={() => {
                  setFormType("ENQUIRY");
                  setSuccessData(null);
                  setErrorMessage("");
                }}
                className={`py-2.5 sm:py-3 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  formType === "ENQUIRY"
                    ? "bg-[#EA580C] text-white shadow-sm"
                    : "text-slate-700 hover:text-amber-800"
                }`}
              >
                <Send className="w-4 h-4 shrink-0" />
                <span>General Program Enquiry</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormType("APPOINTMENT");
                  setSuccessData(null);
                  setErrorMessage("");
                }}
                className={`py-2.5 sm:py-3 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                  formType === "APPOINTMENT"
                    ? "bg-[#EA580C] text-white shadow-sm"
                    : "text-slate-700 hover:text-amber-800"
                }`}
              >
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <span>Book Direct Assessment</span>
              </button>
            </div>

            {/* Success Confirmation Alert */}
            {successData && (
              <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-2xl bg-teal-50 border-2 border-teal-200 text-teal-900 space-y-3 animate-in fade-in">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base">Request Successfully Received!</h3>
                    <p className="text-xs text-teal-700">Reference ID: <span className="font-mono font-bold">{successData.id}</span></p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-teal-800 leading-relaxed sm:pl-13">
                  {successData.message} Our team at {CENTRE_LOCATION} will call you directly at the phone number provided within 24 hours.
                </p>
              </div>
            )}

            {/* Error Alert */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-3 text-sm">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="parentName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    required
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="e.g. Jaspreet Kaur"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-base sm:text-sm text-slate-800 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label htmlFor="childName" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                    Child&apos;s Name *
                  </label>
                  <input
                    type="text"
                    id="childName"
                    name="childName"
                    required
                    value={formData.childName}
                    onChange={handleChange}
                    placeholder="e.g. Gurman"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-base sm:text-sm text-slate-800 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="childAge" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                    Child&apos;s Age *
                  </label>
                  <input
                    type="number"
                    id="childAge"
                    name="childAge"
                    min="1"
                    max="18"
                    required
                    value={formData.childAge}
                    onChange={handleChange}
                    placeholder="e.g. 6"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-base sm:text-sm text-slate-800 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 8725002488"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-base sm:text-sm text-slate-800 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label htmlFor="areaCity" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                    Area / City
                  </label>
                  <input
                    type="text"
                    id="areaCity"
                    name="areaCity"
                    value={formData.areaCity}
                    onChange={handleChange}
                    placeholder="e.g. Phase 4, Mohali"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-base sm:text-sm text-slate-800 bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-base sm:text-sm text-slate-800 bg-slate-50/50"
                  />
                </div>

                <div>
                  <label htmlFor="program" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                    Service / Support Required *
                  </label>
                  <select
                    id="program"
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-base sm:text-sm text-slate-800 bg-slate-50/50"
                  >
                    {BRAND_SERVICES.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {formType === "APPOINTMENT" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 animate-in fade-in">
                  <div>
                    <label htmlFor="preferredDate" className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1.5 sm:mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      required={formType === "APPOINTMENT"}
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-white text-base sm:text-sm text-slate-800"
                    />
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className="block text-xs font-bold text-amber-900 uppercase tracking-wider mb-1.5 sm:mb-2">
                      Preferred Time Slot *
                    </label>
                    <select
                      id="preferredTime"
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-amber-200 bg-white text-base sm:text-sm text-slate-800"
                    >
                      <option value="09:30 AM">09:30 AM (Morning Session)</option>
                      <option value="11:30 AM">11:30 AM (Late Morning)</option>
                      <option value="02:30 PM">02:30 PM (Afternoon)</option>
                      <option value="04:30 PM">04:30 PM (Late Afternoon)</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">
                  Message / Tell Us About Your Child
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details about speech, sensory comforts, attention, motor goals..."
                  className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-base sm:text-sm text-slate-800 bg-slate-50/50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 sm:py-4 px-4 rounded-2xl bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#E11D48] text-white font-black text-sm sm:text-base shadow-lg shadow-orange-300/40 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 active:scale-98"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting Your Information...</span>
                  </>
                ) : (
                  <>
                    {formType === "ENQUIRY" ? <Send className="w-5 h-5" /> : <CalendarCheck className="w-5 h-5" />}
                    <span>{formType === "ENQUIRY" ? "Submit Enquiry" : "Confirm Assessment Booking"}</span>
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-500">
                🔒 Privacy Guaranteed: Student and family information is kept strictly confidential.
              </p>
            </form>
          </div>

          {/* Right Column: Contact Details & Visual Map Card */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            
            {/* Centre Contact Information Card */}
            <div className="bg-[#0B1E36] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-2 border-amber-400/50 shadow-xl space-y-6">
              <h3 className="text-lg sm:text-xl font-black text-amber-300 border-b border-slate-700 pb-3 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>Mohali Learning Centre</span>
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Phone className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">DIRECT PHONE</p>
                    <a
                      href={`tel:${CENTRE_PHONE}`}
                      className="text-xl font-black text-white hover:text-emerald-300 transition-colors"
                    >
                      {CENTRE_PHONE}
                    </a>
                    <p className="text-xs text-slate-300">Call for immediate enquiries & tour bookings</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">LOCATION</p>
                    <p className="text-base font-extrabold text-white">{CENTRE_LOCATION}</p>
                    <p className="text-xs text-slate-300">Mohali, Punjab • Convenient parking & ground access</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-sky-400/20 text-sky-300 flex items-center justify-center shrink-0 border border-sky-400/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">EMAIL</p>
                    <p className="text-sm font-semibold text-white">{CENTRE_EMAIL}</p>
                    <p className="text-xs text-slate-300">Responses within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-purple-400/20 text-purple-300 flex items-center justify-center shrink-0 border border-purple-400/30">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">HOURS</p>
                    <p className="text-sm font-semibold text-white">Mon – Sat: 8:30 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Motto callout in card */}
              <div className="pt-3 border-t border-slate-700/80">
                <p className="text-xs italic font-bold text-pink-300">
                  &ldquo;Together, we build better tomorrows.&rdquo;
                </p>
              </div>
            </div>

            {/* Google Maps Visual Card */}
            <div className="rounded-3xl border-2 border-amber-200 bg-white p-6 text-center warm-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 mx-auto flex items-center justify-center text-amber-700 mb-3">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="font-black text-slate-900 text-base">Visit Our Centre in 156, Phase 4, Mohali</h4>
              <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                Purpose-designed sensory facilities, distraction-free therapy suites, and playful learning zones.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 text-xs font-extrabold text-amber-900 border border-amber-300">
                <span>📍 156, Phase 4, Mohali (Punjab)</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
