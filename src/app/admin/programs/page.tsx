"use client";

import React, { useState, useEffect } from "react";
import { GraduationCap, CheckCircle2, Sparkles } from "lucide-react";
import { Program } from "@/lib/types";

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/programs")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.programs) setPrograms(data.programs);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Programs & Curricula
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review educational pathways, age ranges, and developmental focal areas offered by Hunky Dory.
        </p>
      </div>

      {/* Program Grid */}
      {loading ? (
        <p className="text-xs text-slate-400 py-8 text-center">Loading programs...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    {program.category || "Developmental"}
                  </span>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {program.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900">
                  {program.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  {program.description}
                </p>

                {program.features && program.features.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Core Modules & Strategies
                    </p>
                    {program.features.map((f, i) => (
                      <p key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{f}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-slate-400">Slug: /{program.slug}</span>
                <span className="font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  Status: {program.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
