"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ShieldCheck,
  Heart,
  Smile,
  BookOpen,
  School,
  Users,
  Palette,
  Eye
} from "lucide-react";
import { CENTRE_HIGHLIGHTS } from "@/lib/constants";

export default function CentreSection({ children }: { children?: React.ReactNode } = {}) {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    { title: "Safe", desc: "Rounded edges, secure spaces, non-toxic sensory resources.", icon: <ShieldCheck className="w-5 h-5 text-amber-600" /> },
    { title: "Supportive", desc: "Distraction-reduced acoustics and comforting tactile textures.", icon: <Heart className="w-5 h-5 text-rose-600" /> },
    { title: "Inclusive", desc: "Wheelchair accessible, neurodiverse and sensory affirming.", icon: <Users className="w-5 h-5 text-teal-600" /> },
    { title: "Child-Friendly", desc: "Warm pastel tones, cozy corners, playful learning nooks.", icon: <Smile className="w-5 h-5 text-amber-600" /> },
    { title: "Learning-Focused", desc: "Designed to optimize focus, independence, and calm engagement.", icon: <BookOpen className="w-5 h-5 text-indigo-600" /> },
  ];

  const currentHighlight = CENTRE_HIGHLIGHTS[activeTab];

  return (
    <section id="centre" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Physical Learning Environment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            About Our Centre
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            A purpose-designed, sensory-friendly haven where children feel secure, regulated, and eager to discover their potential.
          </p>
        </div>

        {/* 5 Core Environment Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {pillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className={`bg-[#FFFDF9] rounded-2xl p-3.5 sm:p-4 border border-amber-100 text-center flex flex-col items-center justify-center space-y-1.5 sm:space-y-2 hover:border-amber-300 transition-all ${
                idx === 4 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white shadow-xs border border-amber-100 flex items-center justify-center shrink-0">
                {pillar.icon}
              </div>
              <h4 className="font-bold text-slate-800 text-xs sm:text-sm">{pillar.title}</h4>
              <p className="text-[10px] sm:text-[11px] text-slate-500 leading-tight">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Interactive Gallery Showcase */}
        <div className="rounded-2xl sm:rounded-3xl border-2 border-amber-200/80 bg-gradient-to-br from-amber-50/40 via-white to-rose-50/30 p-4 xs:p-6 sm:p-10 warm-shadow">
          
          {/* Tabs - Swipeable horizontally on mobile */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-4 sm:pb-6 border-b border-amber-100 -mx-1 px-1 sm:mx-0 sm:px-0 sm:flex-wrap">
            {CENTRE_HIGHLIGHTS.map((item, idx) => (
              <button
                key={item.title}
                onClick={() => setActiveTab(idx)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 whitespace-nowrap active:scale-95 ${
                  activeTab === idx
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-amber-50 border border-slate-200"
                }`}
              >
                {item.category}
              </button>
            ))}
          </div>

          {/* Active Feature Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center pt-6 sm:pt-8">
            {/* Visual Canvas Representation */}
            <div className="lg:col-span-6">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 via-orange-100 to-rose-100 border-2 border-amber-200/60 flex flex-col items-center justify-center p-6 sm:p-8 text-center shadow-inner">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-amber-600 mb-3 sm:mb-4 shrink-0">
                  <School className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-amber-800 bg-white/80 px-3 py-1 rounded-full border border-amber-200">
                  {currentHighlight.tag}
                </span>
                <h4 className="text-lg xs:text-xl sm:text-2xl font-black text-slate-800 mt-2 sm:mt-3">
                  {currentHighlight.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 sm:mt-2 max-w-sm">
                  {currentHighlight.category} zone engineered for low sensory overload and maximal developmental focus.
                </p>
                <div className="mt-3 sm:mt-4 flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-200">
                  <Eye className="w-3.5 h-3.5 shrink-0" />
                  <span>Interactive Centre Gallery Preview</span>
                </div>
              </div>
            </div>

            {/* Explanatory Details */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                {currentHighlight.tag}
              </div>
              <h3 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                {currentHighlight.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-base leading-relaxed">
                {currentHighlight.description}
              </p>

              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-3 pt-2 sm:pt-3">
                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-amber-100 shadow-xs">
                  <p className="text-xs font-bold text-slate-800">Acoustic Balance</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Sound-dampening flooring & panels</p>
                </div>
                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-amber-100 shadow-xs">
                  <p className="text-xs font-bold text-slate-800">Adaptive Seating</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Wobble stools, beanbags & desks</p>
                </div>
                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-amber-100 shadow-xs">
                  <p className="text-xs font-bold text-slate-800">Sensory Regulation</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">Fidget aids, visual timers & calm pods</p>
                </div>
                <div className="p-3 sm:p-3.5 rounded-xl bg-white border border-amber-100 shadow-xs">
                  <p className="text-xs font-bold text-slate-800">Safety Standards</p>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">100% child-safe certified materials</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Optional Subpage Navigation / Actions */}
        {children && (
          <div className="mt-8 sm:mt-10 text-center px-4">
            {children}
          </div>
        )}

      </div>
    </section>
  );
}
