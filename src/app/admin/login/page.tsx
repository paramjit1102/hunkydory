"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  Lock,
  Mail,
  ArrowRight,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Stethoscope,
  UserCheck
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";
  const urlError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    urlError === "unauthorized_clinical_access"
      ? "Access Restricted: Clinical Assessments require Specialist or Administrator credentials."
      : ""
  );

  const fillDemoRole = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError("");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push(from);
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-8 px-6 shadow-xl rounded-3xl sm:px-10 border-2 border-amber-100">
      {/* 3 Quick Role Demo Buttons */}
      <div className="mb-6 space-y-2">
        <p className="text-[11px] font-black uppercase tracking-wider text-slate-500 mb-2">
          Select Role for Quick Testing:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Admin */}
          <button
            type="button"
            onClick={() => fillDemoRole("admin@hunkydory.edu", "Admin@123456")}
            className="p-2.5 rounded-xl border border-purple-200 bg-purple-50/60 hover:bg-purple-100 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 text-purple-800 font-bold text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Admin</span>
            </div>
            <p className="text-[10px] text-purple-600 mt-0.5 truncate">Full Access</p>
          </button>

          {/* Specialist */}
          <button
            type="button"
            onClick={() => fillDemoRole("specialist@hunkydory.edu", "Specialist@123")}
            className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs">
              <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
              <span>Specialist</span>
            </div>
            <p className="text-[10px] text-emerald-600 mt-0.5 truncate">Clinical & Students</p>
          </button>

          {/* Staff */}
          <button
            type="button"
            onClick={() => fillDemoRole("staff@hunkydory.edu", "Staff@123")}
            className="p-2.5 rounded-xl border border-sky-200 bg-sky-50/60 hover:bg-sky-100 text-left transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-1.5 text-sky-800 font-bold text-xs">
              <UserCheck className="w-3.5 h-3.5 text-sky-600" />
              <span>Staff</span>
            </div>
            <p className="text-[10px] text-sky-600 mt-0.5 truncate">Enquiries & Bookings</p>
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Staff Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@hunkydory.edu"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 bg-slate-50/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-sm text-slate-800 bg-slate-50/50"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying Credentials...</span>
            </>
          ) : (
            <>
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-slate-100 text-center">
        <Link
          href="/"
          className="text-xs font-semibold text-slate-500 hover:text-amber-600 transition-colors"
        >
          ← Back to Hunky Dory Public Site
        </Link>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center text-white shadow-md shadow-amber-200">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-800">
            HUNKY DORY
          </span>
        </Link>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Specialist & Staff Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Sign in to access student learning profiles, appointments, clinical assessments, and parent inquiries.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading portal...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
