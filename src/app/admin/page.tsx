"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Inbox,
  CalendarCheck,
  GraduationCap,
  ArrowUpRight,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Mail,
  Send,
  Loader2,
  Globe,
  X
} from "lucide-react";
import { Enquiry, Appointment, Student } from "@/lib/types";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalStudents: 4,
    newEnquiries: 1,
    upcomingAppointments: 2,
    activePrograms: 8,
    totalAssessments: 2,
    totalReports: 2
  });
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  // SMTP Test State
  const [showSmtpModal, setShowSmtpModal] = useState(false);
  const [smtpTestEmail, setSmtpTestEmail] = useState("");
  const [smtpLoading, setSmtpLoading] = useState(false);
  const [smtpResult, setSmtpResult] = useState<{ success?: boolean; message?: string; error?: string } | null>(null);

  const handleTestSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSmtpLoading(true);
    setSmtpResult(null);
    try {
      const res = await fetch("/api/admin/test-smtp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testEmail: smtpTestEmail || undefined })
      });
      const data = await res.json();
      if (res.ok) {
        setSmtpResult({ success: true, message: data.message });
      } else {
        setSmtpResult({ success: false, error: data.error || "Failed to verify SMTP connection" });
      }
    } catch (err: any) {
      setSmtpResult({ success: false, error: err.message || "Network request failed" });
    } finally {
      setSmtpLoading(false);
    }
  };

  useEffect(() => {
    async function loadData() {
      try {
        const [statsRes, enqRes, aptRes] = await Promise.all([
          fetch("/api/stats"),
          fetch("/api/enquiries"),
          fetch("/api/appointments")
        ]);

        if (statsRes.ok) {
          const s = await statsRes.json();
          if (s.stats) setStats(s.stats);
        }

        if (enqRes.ok) {
          const e = await enqRes.json();
          if (e.enquiries) setEnquiries(e.enquiries.slice(0, 4));
        }

        if (aptRes.ok) {
          const a = await aptRes.json();
          if (a.appointments) setAppointments(a.appointments.slice(0, 4));
        }
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Welcome back! Here is what is happening at Hunky Dory today.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/seo"
            className="px-3.5 py-2 rounded-xl border border-slate-300 hover:border-amber-400 bg-white hover:bg-amber-50/50 text-slate-700 text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            title="Manage Page SEO, Robots, Sitemap & LLMs"
          >
            <Globe className="w-3.5 h-3.5 text-amber-600" />
            <span>SEO Console</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              setShowSmtpModal(true);
              setSmtpResult(null);
            }}
            className="px-3.5 py-2 rounded-xl border border-slate-300 hover:border-amber-400 bg-white hover:bg-amber-50/50 text-slate-700 text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            title="Test SMTP Email Configuration"
          >
            <Mail className="w-3.5 h-3.5 text-amber-600" />
            <span>Test SMTP</span>
          </button>

          <Link
            href="/admin/students"
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors"
          >
            + Register New Student
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Students */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Enrolled Students
            </p>
            <h3 className="text-3xl font-black text-slate-900 mt-2">
              {stats.totalStudents}
            </h3>
            <span className="text-[11px] font-semibold text-teal-600 mt-1 inline-block">
              Active learning profiles
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* New Enquiries */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              New Enquiries
            </p>
            <h3 className="text-3xl font-black text-slate-900 mt-2">
              {stats.newEnquiries}
            </h3>
            <span className="text-[11px] font-semibold text-amber-600 mt-1 inline-block">
              Require review / follow-up
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Upcoming Assessments
            </p>
            <h3 className="text-3xl font-black text-slate-900 mt-2">
              {stats.upcomingAppointments}
            </h3>
            <span className="text-[11px] font-semibold text-indigo-600 mt-1 inline-block">
              Scheduled this week
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Active Programs */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Active Programs
            </p>
            <h3 className="text-3xl font-black text-slate-900 mt-2">
              {stats.activePrograms}
            </h3>
            <span className="text-[11px] font-semibold text-teal-600 mt-1 inline-block">
              Full curriculum coverage
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Program Engagement & Philosophy Visual Chart */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Student Milestone Distribution Across Key Domains
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Multi-disciplinary tracking across cognitive, sensory, and functional living goals
            </p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Live Centre Progress
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Sensory & Regulation</span>
              <span className="text-amber-600 font-extrabold">88%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "88%" }} />
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Calming strategies & sensory routines</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Speech & Communication</span>
              <span className="text-teal-600 font-extrabold">82%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: "82%" }} />
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Functional AAC & expressive phrasing</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Academic Foundations</span>
              <span className="text-indigo-600 font-extrabold">91%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: "91%" }} />
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Literacy, numeracy & conceptual play</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-2">
              <span>Daily Living Autonomy</span>
              <span className="text-rose-600 font-extrabold">79%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div className="bg-rose-500 h-2.5 rounded-full" style={{ width: "79%" }} />
            </div>
            <p className="text-[10px] text-slate-400 mt-2">Fine motor tasks & self-care sequencing</p>
          </div>
        </div>
      </div>

      {/* Two Columns: Recent Enquiries & Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Enquiries */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Inbox className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900 text-base">Recent Parent Enquiries</h3>
              </div>
              <Link
                href="/admin/enquiries"
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {enquiries.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No enquiries received yet.</p>
              ) : (
                enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-amber-50/40 transition-colors border border-slate-100"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">
                          {enq.childName} <span className="text-xs font-normal text-slate-500">({enq.childAge} yrs)</span>
                        </h4>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Parent: {enq.parentName} • {enq.phone}
                        </p>
                        <p className="text-[11px] font-semibold text-amber-700 mt-1">
                          Program: {enq.program}
                        </p>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          enq.status === "NEW"
                            ? "bg-rose-100 text-rose-800"
                            : enq.status === "CONTACTED"
                            ? "bg-teal-100 text-teal-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-slate-900 text-base">Upcoming Assessment Sessions</h3>
              </div>
              <Link
                href="/admin/appointments"
                className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {appointments.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No upcoming appointments scheduled.</p>
              ) : (
                appointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/30 transition-colors border border-slate-100"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">
                          {apt.childName} <span className="text-xs font-normal text-slate-500">with {apt.parentName}</span>
                        </h4>
                        <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{apt.appointmentDate} at {apt.appointmentTime}</span>
                        </p>
                        <p className="text-[11px] font-semibold text-slate-500 mt-1">
                          Focus: {apt.program}
                        </p>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                          apt.status === "CONFIRMED"
                            ? "bg-teal-100 text-teal-800"
                            : apt.status === "PENDING"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Test SMTP Email Modal */}
      {showSmtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setShowSmtpModal(false)}
              className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Test SMTP Service</h3>
                <p className="text-xs text-slate-500">Verify outgoing email delivery and connection</p>
              </div>
            </div>

            <form onSubmit={handleTestSmtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Recipient Email(s)
                </label>
                <input
                  type="text"
                  value={smtpTestEmail}
                  onChange={(e) => setSmtpTestEmail(e.target.value)}
                  placeholder="care.hunkydory@gmail.com, alerts@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Enter one or multiple comma-separated emails. Leave blank to use configured admin receivers.
                </p>
              </div>

              {smtpResult && (
                <div
                  className={`p-3 rounded-xl text-xs ${
                    smtpResult.success
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
                >
                  <p className="font-bold flex items-center gap-1.5">
                    {smtpResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>{smtpResult.success ? "Success!" : "Notice"}</span>
                  </p>
                  <p className="mt-1 leading-relaxed">
                    {smtpResult.message || smtpResult.error}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSmtpModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={smtpLoading}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {smtpLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Test Email</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
