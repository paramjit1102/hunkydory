"use client";

import React from "react";
import Link from "next/link";
import {
  Sun,
  Heart,
  Phone,
  MapPin,
  CalendarCheck,
  Compass,
  Sparkles,
  Zap,
  Puzzle,
  BookOpen,
  MessageSquare,
  Smile,
  Activity,
  Dumbbell,
  Palette,
  Music,
  Users,
  Trophy
} from "lucide-react";
import {
  BRAND_SERVICES,
  CREATIVE_ACTIVITIES,
  CENTRE_LOCATION,
  CENTRE_PHONE,
  MOTTO_HEART,
  MOTTO_CLOSING
} from "@/lib/constants";

export default function Hero() {
  return (
    <section id="home" className="relative pt-6 pb-12 sm:pb-16 bg-brand-canvas overflow-hidden">
      
      {/* Decorative Handprints in top right corner */}
      <div className="absolute top-2 right-4 opacity-75 hidden sm:flex items-center gap-1.5 pointer-events-none">
        <span className="text-3xl text-green-500 transform -rotate-12">✋</span>
        <span className="text-3xl text-pink-500 transform rotate-6">✋</span>
        <span className="text-3xl text-sky-500 transform -rotate-6">✋</span>
        <span className="text-3xl text-amber-500 transform rotate-12">✋</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Left Banner Title & Right Services Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Authentic Brand Title & Motto */}
          <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
            
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="text-sm sm:text-base font-black tracking-widest uppercase text-[#451a03]">
                EVERYTHING IS
              </span>
              <div className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center shadow-md animate-spin-slow">
                <Sun className="w-6 h-6 text-amber-700" />
              </div>
            </div>

            {/* Large 3D Bubble "HUNKY DORY" Title */}
            <div className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none select-none">
              <div className="flex items-center justify-center lg:justify-start gap-0.5 sm:gap-1">
                <span className="bubble-letter text-[#0284c7]">H</span>
                <span className="bubble-letter text-[#f59e0b]">U</span>
                <span className="bubble-letter text-[#16a34a]">N</span>
                <span className="bubble-letter text-[#ef4444]">K</span>
                <span className="bubble-letter text-[#06b6d4]">Y</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-0.5 sm:gap-1 mt-1">
                <span className="bubble-letter text-[#7c3aed]">D</span>
                <span className="bubble-letter text-[#f97316]">O</span>
                <span className="bubble-letter text-[#ec4899]">R</span>
                <span className="bubble-letter text-[#f43f5e]">Y</span>
              </div>
            </div>

            {/* Yellow Ribbon: SPECIAL CHILDREN CENTER */}
            <div className="pt-2 flex justify-center lg:justify-start">
              <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#FDE047] border-2 border-amber-300 shadow-sm text-slate-900 font-extrabold text-xs xs:text-sm sm:text-base uppercase tracking-wider max-w-full">
                <span className="text-rose-500 shrink-0">❤️</span>
                <span className="truncate">SPECIAL CHILDREN CENTER</span>
                <span className="text-rose-500 shrink-0">❤️</span>
              </div>
            </div>

            {/* Core Mission Tagline */}
            <div className="pt-2 space-y-1">
              <p className="text-base sm:text-xl md:text-2xl font-black text-[#15803D] leading-snug">
                Every Child. Every Ability. Every Day. A New Step Forward.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                Supporting every child&apos;s unique learning, speech, motor, and sensory development in a warm, welcoming centre at <strong>{CENTRE_LOCATION}</strong>.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-3">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#E11D48] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-98"
              >
                <CalendarCheck className="w-4 h-4 shrink-0" />
                <span>Book an Assessment</span>
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-2xl bg-white hover:bg-amber-50 text-slate-800 font-bold text-xs sm:text-sm border-2 border-amber-200 transition-all shadow-xs active:scale-98"
              >
                <Compass className="w-4 h-4 text-[#0284C7] shrink-0" />
                <span>Explore All Services</span>
              </Link>
            </div>

            {/* Silhouette Playful Garden Strip */}
            <div className="relative pt-6 max-w-md mx-auto lg:mx-0">
              <div className="h-10 rounded-2xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 flex items-center justify-around px-2 sm:px-4 text-white text-sm sm:text-base shadow-sm">
                <span title="Inclusion & Wheelchair Mobility">♿</span>
                <span>🌸</span>
                <span title="Happy Children">🧒</span>
                <span>🌼</span>
                <span title="Tree of Life">🌳</span>
                <span>🌷</span>
                <span title="Joyful Play">👧</span>
                <span>🌻</span>
              </div>
            </div>

          </div>

          {/* Right Column: Exact "OUR SERVICES" Colorful Badges Board */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Services Card with Brand Purple Header */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 xs:p-6 sm:p-7 border-2 border-amber-200 shadow-lg relative">
              
              {/* Header Ribbon */}
              <div className="text-center mb-5 sm:mb-6">
                <Link
                  href="/services"
                  className="inline-block px-5 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-black text-xs sm:text-base uppercase tracking-wider shadow-sm transition-colors"
                >
                  OUR SERVICES
                </Link>
              </div>

              {/* 2-Column Grid of 10 Service Pill Buttons matching the banner */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-3">
                {BRAND_SERVICES.map((s) => (
                  <Link
                    key={s.name}
                    href="/services"
                    className={`${s.color} ${s.text} py-2.5 px-3 rounded-xl sm:rounded-2xl flex items-center gap-2 font-extrabold text-[11px] sm:text-xs tracking-wide shadow-sm hover:scale-102 hover:shadow-md transition-all border border-white/20`}
                  >
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </span>
                    <span className="truncate">{s.name}</span>
                  </Link>
                ))}
              </div>

              {/* Creative Activities Bar */}
              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-slate-100">
                <div className="text-center mb-3 sm:mb-4">
                  <span className="inline-block px-4 sm:px-5 py-1 sm:py-1.5 rounded-full bg-[#15803D] text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-wider shadow-xs">
                    CREATIVE ACTIVITIES
                  </span>
                </div>

                <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center">
                  {CREATIVE_ACTIVITIES.map((act) => (
                    <div key={act.name} className="flex flex-col items-center">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${act.color} text-white flex items-center justify-center shadow-xs mb-1 hover:scale-110 transition-transform`}>
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <span className="text-[8px] sm:text-[9px] font-bold text-slate-700 leading-tight">
                        {act.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Banner Card (Matching Deep Navy Footer Strip in the Image) */}
        <div className="mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl bg-[#0B1E36] text-white p-5 sm:p-8 shadow-xl border-2 border-amber-400/40">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
            
            {/* Puzzle Heart Motto */}
            <div className="md:col-span-4 flex items-center gap-3.5 sm:gap-4">
              {/* Colorful 4-piece Puzzle Heart */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-pink-500 via-amber-400 to-sky-400 p-1 flex items-center justify-center shadow-md shrink-0">
                <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white" />
              </div>
              <div>
                <p className="font-extrabold text-xs xs:text-sm sm:text-base text-amber-300 leading-snug">
                  {MOTTO_HEART}
                </p>
                <p className="text-[10px] sm:text-[11px] text-slate-300 mt-0.5">
                  Child-Centred Holistic Development
                </p>
              </div>
            </div>

            {/* Mohali Address */}
            <div className="md:col-span-3 flex items-center gap-3 border-y md:border-y-0 md:border-x border-slate-700/80 py-3 md:py-0 md:px-4">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
              </div>
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-amber-400 tracking-wider">ADDRESS</span>
                <p className="font-extrabold text-xs sm:text-sm text-white">{CENTRE_LOCATION}</p>
              </div>
            </div>

            {/* Direct Contact Phone */}
            <div className="md:col-span-3 flex items-center gap-3">
              <a
                href={`tel:${CENTRE_PHONE}`}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-md transition-colors"
                aria-label={`Call ${CENTRE_PHONE}`}
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-pulse" />
              </a>
              <div>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold text-emerald-400 tracking-wider">CONTACT US</span>
                <a
                  href={`tel:${CENTRE_PHONE}`}
                  className="block font-black text-base sm:text-xl text-white hover:text-amber-300 transition-colors"
                >
                  {CENTRE_PHONE}
                </a>
              </div>
            </div>

            {/* Closing Script Quote */}
            <div className="md:col-span-2 text-center md:text-right pt-2 md:pt-0">
              <p className="text-xs sm:text-sm italic font-bold text-pink-300">
                &ldquo;{MOTTO_CLOSING}&rdquo;
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
