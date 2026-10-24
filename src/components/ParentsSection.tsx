"use client";

import React from "react";
import Link from "next/link";
import {
  MessageCircle,
  FileCheck2,
  Home,
  CalendarCheck,
  Sparkles,
  PhoneCall,
  HeartHandshake
} from "lucide-react";
import { PARENT_PILLARS } from "@/lib/constants";

const parentIcons: Record<string, React.ReactNode> = {
  MessageCircle: <MessageCircle className="w-6 h-6 text-amber-600" />,
  FileCheck2: <FileCheck2 className="w-6 h-6 text-teal-600" />,
  Home: <Home className="w-6 h-6 text-rose-600" />,
  CalendarCheck: <CalendarCheck className="w-6 h-6 text-indigo-600" />,
  Sparkles: <Sparkles className="w-6 h-6 text-amber-600" />
};

export default function ParentsSection() {
  return (
    <section id="parents" className="py-12 sm:py-16 md:py-24 bg-[#FFFDF9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column: Heading and Narrative */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5 text-rose-600" />
              <span>Parent Partnership</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Supporting Parents. Empowering Children.
            </h2>

            <p className="text-sm sm:text-lg text-slate-600 leading-relaxed font-normal">
              You are the most important person in your child&apos;s world. We partner with parents every step of the way—offering empathy, actionable strategies, and transparent milestone tracking so you never feel alone on this journey.
            </p>

            <div className="pt-1 sm:pt-2">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-98"
              >
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span>Talk to Our Team</span>
              </Link>
            </div>
          </div>

          {/* Right Column: 5 Pillars Cards */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            {PARENT_PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="bg-white rounded-2xl p-4 xs:p-5 sm:p-6 border-2 border-amber-100/80 hover:border-amber-300 warm-shadow transition-all flex items-start gap-3 sm:gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0">
                  {parentIcons[pillar.icon] || <Sparkles className="w-6 h-6 text-amber-600" />}
                </div>

                <div>
                  <h3 className="font-bold text-slate-800 text-base sm:text-lg">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
