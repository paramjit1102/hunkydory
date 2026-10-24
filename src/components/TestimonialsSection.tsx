"use client";

import React from "react";
import { Star, Quote, Sparkles, Heart } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export default function TestimonialsSection({ children }: { children?: React.ReactNode } = {}) {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 text-amber-600" />
            <span>Parent Experiences</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Voices of Trust & Gratitude
          </h2>
          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed font-normal">
            Real feedback from families whose children have discovered confidence, joy, and meaningful progress with Hunky Dory.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {TESTIMONIALS.map((item, index) => (
            <div
              key={index}
              className="bg-[#FFFDF9] rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-amber-100/90 hover:border-amber-300 warm-shadow warm-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-amber-200" />
                </div>

                <blockquote className="text-sm text-slate-700 leading-relaxed italic mb-6">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <div className="pt-4 border-t border-amber-100/60">
                <p className="text-xs font-bold text-slate-850 text-slate-800">
                  — {item.parentName}
                </p>
                <p className="text-[11px] font-semibold text-amber-700 mt-0.5">
                  {item.tag}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="mt-10 sm:mt-12 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Names and specific personal identifiers are protected to safeguard family privacy.</span>
        </div>

        {/* Optional Subpage Navigation / Actions */}
        {children && (
          <div className="mt-8 text-center px-4">
            {children}
          </div>
        )}

      </div>
    </section>
  );
}
