"use client";

import React, { useState, useEffect } from "react";
import { FileSpreadsheet, Sparkles, User, Calendar, BookOpen, Heart, ArrowRight } from "lucide-react";
import { Assessment, ProgressReport, Student } from "@/lib/types";

export default function AdminAssessmentsPage() {
  const [activeTab, setActiveTab] = useState<"ASSESSMENTS" | "REPORTS">("ASSESSMENTS");
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [reports, setReports] = useState<ProgressReport[]>([]);
  const [students, setStudents] = useState<Record<string, Student>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [asmRes, repRes, stdRes] = await Promise.all([
          fetch("/api/assessments"),
          fetch("/api/progress-reports"),
          fetch("/api/students")
        ]);

        if (asmRes.ok) {
          const d = await asmRes.json();
          setAssessments(d.assessments || []);
        }

        if (repRes.ok) {
          const d = await repRes.json();
          setReports(d.progressReports || []);
        }

        if (stdRes.ok) {
          const d = await stdRes.json();
          const map: Record<string, Student> = {};
          (d.students || []).forEach((s: Student) => {
            map[s.id] = s;
          });
          setStudents(map);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Assessments & Progress Documentation
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Review multidimensional clinical observation notes, milestone reports, and home recommendations.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-slate-200/80 rounded-2xl max-w-sm">
        <button
          onClick={() => setActiveTab("ASSESSMENTS")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === "ASSESSMENTS"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-amber-600" />
          <span>Assessments ({assessments.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("REPORTS")}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === "REPORTS"
              ? "bg-white text-slate-900 shadow-xs"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>Progress Reports ({reports.length})</span>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-xs text-slate-400 py-8 text-center">Loading records...</p>
      ) : activeTab === "ASSESSMENTS" ? (
        <div className="space-y-4">
          {assessments.map((asm) => {
            const student = students[asm.studentId];
            return (
              <div
                key={asm.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-sm">
                      {student ? student.studentName[0] : "S"}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">
                        {student ? student.studentName : `Student ID: ${asm.studentId}`}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Assessment Date: {asm.assessmentDate} • Assessment Ref: {asm.id}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 self-start sm:self-auto">
                    Multidisciplinary Evaluation
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {asm.academicNotes && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                        Academic & Cognitive Profile
                      </p>
                      <p className="text-slate-600 leading-relaxed">{asm.academicNotes}</p>
                    </div>
                  )}

                  {asm.communicationNotes && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                        Communication & Speech
                      </p>
                      <p className="text-slate-600 leading-relaxed">{asm.communicationNotes}</p>
                    </div>
                  )}

                  {asm.sensoryNotes && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                        Sensory & Emotional Regulation
                      </p>
                      <p className="text-slate-600 leading-relaxed">{asm.sensoryNotes}</p>
                    </div>
                  )}

                  {asm.behaviourNotes && (
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                        Social & Behavioural Interactions
                      </p>
                      <p className="text-slate-600 leading-relaxed">{asm.behaviourNotes}</p>
                    </div>
                  )}
                </div>

                {asm.recommendations && (
                  <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs">
                    <p className="font-bold text-teal-900 uppercase tracking-wider text-[10px] mb-1">
                      Lead Specialist Recommendations
                    </p>
                    <p className="text-teal-800 leading-relaxed">{asm.recommendations}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((rep) => {
            const student = students[rep.studentId];
            return (
              <div
                key={rep.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-xs space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-sm">
                      {student ? student.studentName[0] : "S"}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">
                        {student ? student.studentName : `Student ID: ${rep.studentId}`}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Report Date: {rep.reportDate} • Report Ref: {rep.id}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 self-start sm:self-auto">
                    Milestone Progress Report
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px] mb-1">
                      Targeted SMART Goals
                    </p>
                    <p className="text-slate-600 leading-relaxed">{rep.goals}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-teal-50/40 border border-teal-100">
                    <p className="font-bold text-teal-800 uppercase tracking-wider text-[10px] mb-1">
                      Milestones Achieved & Observed Progress
                    </p>
                    <p className="text-teal-900 leading-relaxed">{rep.progress}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-amber-50/40 border border-amber-100">
                    <p className="font-bold text-amber-800 uppercase tracking-wider text-[10px] mb-1">
                      Celebrated Strengths
                    </p>
                    <p className="text-amber-900 leading-relaxed">{rep.strengths}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-rose-50/40 border border-rose-100">
                    <p className="font-bold text-rose-800 uppercase tracking-wider text-[10px] mb-1">
                      Areas for Ongoing Developmental Focus
                    </p>
                    <p className="text-rose-900 leading-relaxed">{rep.areasForImprovement}</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200">
                    <p className="font-bold text-indigo-900 uppercase tracking-wider text-[10px] mb-1">
                      Recommendations for Home & Classroom
                    </p>
                    <p className="text-indigo-800 leading-relaxed">{rep.recommendations}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
