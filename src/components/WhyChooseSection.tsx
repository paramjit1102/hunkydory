"use client";

import React from "react";
import { UserCheck, Puzzle, Award, Heart, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";
import { WHY_CHOOSE_US } from "@/lib/constants";

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  UserCheck: <UserCheck className="w-6 h-6" />,
  Puzzle: <Puzzle className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />
};

export default function WhyChooseSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-[#FFFDF9] to-amber-50/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Dedicated Care & Expertise</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose Hunky Dory
          </h2>
          <p className="text-sm sm:text-lg text-slate-600 leading-relaxed font-normal">
            We provide a compassionate, evidence-based haven where every child is celebrated for their unique strengths and supported to reach their full potential.
          </p>
        </div>

        {/* 6 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {WHY_CHOOSE_US.map((item, index) => {
            const icon = iconMap[item.icon] || <Sparkles className="w-6 h-6" />;
            return (
              <div
                key={item.title}
                className="group bg-white rounded-2xl sm:rounded-3xl p-5 xs:p-6 sm:p-8 border-2 border-amber-100/80 warm-shadow warm-card-hover relative flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Index Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.bgColor} group-hover:scale-110 transition-transform shadow-xs`}>
                      {icon}
                    </div>
                    <span className="text-xs font-black text-slate-300 group-hover:text-amber-500 transition-colors">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-amber-700/80">
                  <span>Child-first focus</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Evidence-informed</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
