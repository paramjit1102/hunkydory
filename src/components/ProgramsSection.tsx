"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GraduationCap,
  Baby,
  MessageSquareHeart,
  Sparkles,
  HeartHandshake,
  SunMedium,
  BookOpenCheck,
  Compass,
  ArrowRight,
  CheckCircle2,
  CalendarCheck,
  X,
  Puzzle
} from "lucide-react";
import { CORE_PROGRAMS } from "@/lib/constants";

// Icon mapping
const programIcons: Record<string, React.ReactNode> = {
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  Baby: <Baby className="w-6 h-6" />,
  MessageSquareHeart: <MessageSquareHeart className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6" />,
  SunMedium: <SunMedium className="w-6 h-6" />,
  BookOpenCheck: <BookOpenCheck className="w-6 h-6" />,
  Compass: <Compass className="w-6 h-6" />,
  Puzzle: <Puzzle className="w-6 h-6" />
};

export default function ProgramsSection({ children }: { children?: React.ReactNode } = {}) {
  const [selectedProgram, setSelectedProgram] = useState<(typeof CORE_PROGRAMS)[0] | null>(null);

  return (
    <section id="programs" className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider border border-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Specialised Curricula & Therapy Pathways</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Our Programs & Support Areas
          </h2>
          <p className="text-base sm:text-lg text-[#15803D] font-bold">
            Personalised, child-centred learning tailored for each unique developmental profile.
          </p>
        </div>

        {/* 8 Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_PROGRAMS.map((program) => {
            const icon = programIcons[program.icon] || <Sparkles className="w-6 h-6" />;
            return (
              <div
                key={program.id}
                className="group bg-[#FFFBF5] rounded-3xl p-6 border-2 border-amber-200 hover:border-amber-400 warm-shadow warm-card-hover flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${program.badgeColor || "bg-[#F59E0B]"} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}>
                      {icon}
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 bg-white border border-amber-200 px-2.5 py-1 rounded-full">
                      {program.ageRange}
                    </span>
                  </div>

                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-700">
                    {program.tag}
                  </span>

                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1 mb-2.5 group-hover:text-[#0284C7] transition-colors leading-snug">
                    {program.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {program.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-200/60 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProgram(program)}
                    className="text-xs font-bold text-[#0284C7] hover:underline inline-flex items-center gap-1.5 focus:outline-none"
                  >
                    <span>Curriculum</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <Link
                    href="/contact"
                    className="text-[11px] font-bold text-white bg-[#EA580C] hover:bg-[#C2410C] px-3 py-1.5 rounded-xl shadow-xs transition-colors"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Bar */}
        <div className="mt-10 sm:mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-8 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-[#0B1E36] hover:bg-[#162D4A] text-white font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all"
          >
            <span>Schedule an Individual Evaluation at Mohali Centre</span>
            <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" />
          </Link>
          {children}
        </div>

        {/* Modal */}
        {selectedProgram && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in"
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full p-5 sm:p-8 border-2 border-amber-300 shadow-2xl relative max-h-[88vh] overflow-y-auto">
              <button
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4 pr-8">
                <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${selectedProgram.badgeColor} text-white flex items-center justify-center shadow-sm shrink-0`}>
                  {programIcons[selectedProgram.icon] || <Sparkles className="w-6 h-6" />}
                </div>
                <div>
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-700">
                    {selectedProgram.tag} • {selectedProgram.ageRange}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                    {selectedProgram.name}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-5 sm:mb-6">
                {selectedProgram.description}
              </p>

              <div className="space-y-3 mb-5 sm:mb-6 bg-amber-50/70 p-3.5 sm:p-4 rounded-2xl border border-amber-200">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                  Key Focus Areas & Strategies
                </h4>
                <ul className="space-y-2">
                  {selectedProgram.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 text-center"
                >
                  Close
                </button>
                <Link
                  href="/contact"
                  onClick={() => setSelectedProgram(null)}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm text-center"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Enquire For This Program</span>
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
