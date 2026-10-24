"use client";

import React, { useState } from "react";
import { Sparkles, Heart, Shield, Award, Users, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function AboutSection({ children }: { children?: React.ReactNode } = {}) {
  const [showMore, setShowMore] = useState(false);

  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main About Quote Card */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-50/70 via-[#FFFDF9] to-orange-50/60 p-5 xs:p-8 sm:p-12 border-2 border-amber-200/80 shadow-md">
          <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>About Hunky Dory</span>
            </div>

            <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
              Believing in Strengths. Nurturing Potential.
            </h2>

            <blockquote className="text-base xs:text-lg sm:text-xl md:text-2xl text-slate-700 italic font-medium leading-relaxed border-y border-amber-200/80 py-4 sm:py-6">
              “At Hunky Dory, we believe that every child has unique strengths, abilities and potential. We create a safe, encouraging and engaging learning environment where children can learn at their own pace and develop with confidence.”
            </blockquote>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-1 sm:pt-2">
              <button
                type="button"
                onClick={() => setShowMore(!showMore)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-amber-500"
                aria-expanded={showMore}
              >
                <span>{showMore ? "Show Less" : "Learn More About Our Philosophy"}</span>
                {showMore ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            {/* Expandable Philosophy Details */}
            {showMore && (
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-amber-200/80 text-left grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 animate-in fade-in duration-300">
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-amber-100 shadow-xs space-y-2.5 sm:space-y-3">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2 text-sm sm:text-base">
                    <Heart className="w-5 h-5 text-rose-500 shrink-0" />
                    <span>Dignity & Neurodiversity Affirming</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    We believe differences in learning, sensory processing, and communication are natural variations of human neurodiversity. Our educators meet children where they are with warmth, patience, and dignity.
                  </p>
                </div>

                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-amber-100 shadow-xs space-y-2.5 sm:space-y-3">
                  <h4 className="font-bold text-slate-800 flex items-center gap-2 text-sm sm:text-base">
                    <Shield className="w-5 h-5 text-teal-600 shrink-0" />
                    <span>Sensory-Informed Spaces</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Learning happens best when a child feels regulated and secure. Our centre is built from the ground up to reduce cognitive and sensory fatigue, using warm lighting and flexible calm zones.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 sm:mt-12">
          
          <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Individual Pace</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Instruction that respects each child&apos;s processing speed and learning style.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-teal-50/50 border border-teal-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-teal-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Specialist Team</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Trained special educators, developmental mentors, and caring facilitators.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Holistic Growth</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Nurturing academic confidence, emotional resilience, and daily independence.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-violet-50/50 border border-violet-100 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Family Partnership</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Continuous parent involvement, guidance, and transparent progress updates.
              </p>
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
