"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  HeartHandshake,
  SearchCheck,
  MapPin,
  Lightbulb,
  LineChart,
  Trophy,
  Sparkles,
  PartyPopper
} from "lucide-react";
import { LEARNING_APPROACH_STEPS } from "@/lib/constants";

const stepIcons: Record<string, React.ReactNode> = {
  HeartHandshake: <HeartHandshake className="w-6 h-6" />,
  SearchCheck: <SearchCheck className="w-6 h-6" />,
  MapPin: <MapPin className="w-6 h-6" />,
  Lightbulb: <Lightbulb className="w-6 h-6" />,
  LineChart: <LineChart className="w-6 h-6" />,
  Trophy: <Trophy className="w-6 h-6" />
};

export default function ApproachSection({ children }: { children?: React.ReactNode } = {}) {
  const [celebrated, setCelebrated] = useState(false);

  const triggerCelebration = () => {
    setCelebrated(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback if canvas not available
    }
    setTimeout(() => setCelebrated(false), 3000);
  };

  return (
    <section id="approach" className="py-12 sm:py-16 md:py-24 bg-[#FFFDF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Structured & Child-Centred</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Learning Approach
          </h2>
          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed font-normal">
            A continuous, collaborative loop designed to unlock confidence and meet every child at their individual stage of developmental readiness.
          </p>
        </div>

        {/* 6 Steps Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 relative">
          {LEARNING_APPROACH_STEPS.map((step, idx) => {
            const icon = stepIcons[step.icon] || <Sparkles className="w-6 h-6" />;
            return (
              <div
                key={step.step}
                className="relative bg-white rounded-2xl sm:rounded-3xl p-5 xs:p-6 sm:p-7 border-2 border-amber-100 warm-shadow warm-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 text-white font-extrabold flex items-center justify-center text-xs sm:text-sm shadow-sm">
                      {step.step}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 sm:px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
                      {step.badge}
                    </span>
                  </div>

                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 sm:mb-4 shrink-0">
                    {icon}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
                    {step.step}. {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-100 text-[11px] font-medium text-slate-400">
                  Step {idx + 1} of 6 in our journey
                </div>
              </div>
            );
          })}
        </div>

        {/* Central Philosophy Banner */}
        <div className="mt-10 sm:mt-16 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 sm:p-10 text-white text-center shadow-xl shadow-amber-200/50">
          <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              Guiding Principle
            </span>
            <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-snug">
              “Every small step is a big achievement.”
            </h3>
            <p className="text-white/90 text-xs sm:text-base font-normal leading-relaxed">
              Whether it&apos;s sustaining eye contact, writing a letter, holding a pencil, or asking for help—every single milestone is honoured with pride.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={triggerCelebration}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-amber-700 hover:bg-amber-50 font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-white"
              >
                <PartyPopper className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{celebrated ? "Hooray! 🎉 We Celebrate Together!" : "Celebrate Small Steps (Click Me!)"}</span>
              </button>
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
