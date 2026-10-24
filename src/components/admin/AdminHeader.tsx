"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, ShieldCheck, Stethoscope, UserCheck, Menu } from "lucide-react";

interface AdminHeaderProps {
  onToggleSidebar?: () => void;
}

export default function AdminHeader({ onToggleSidebar }: AdminHeaderProps = {}) {
  const router = useRouter();
  const [userName, setUserName] = useState("Loading user...");
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState<string>("ADMIN");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUserName(data.user.name);
          setUserEmail(data.user.email);
          setRole(data.user.role);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const getRoleBadge = (roleName: string) => {
    switch (roleName) {
      case "ADMIN":
        return {
          label: "Administrator",
          bg: "bg-purple-100 text-purple-800 border-purple-200",
          icon: <ShieldCheck className="w-3 h-3 text-purple-700" />
        };
      case "SPECIALIST":
        return {
          label: "Specialist Therapist",
          bg: "bg-emerald-100 text-emerald-800 border-emerald-200",
          icon: <Stethoscope className="w-3 h-3 text-emerald-700" />
        };
      case "STAFF":
        return {
          label: "Centre Staff",
          bg: "bg-sky-100 text-sky-800 border-sky-200",
          icon: <UserCheck className="w-3 h-3 text-sky-700" />
        };
      default:
        return {
          label: roleName,
          bg: "bg-slate-100 text-slate-800 border-slate-200",
          icon: <User className="w-3 h-3 text-slate-700" />
        };
    }
  };

  const badge = getRoleBadge(role);
  const initials = userName
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-3.5 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={onToggleSidebar}
          type="button"
          className="p-2 -ml-1 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors lg:hidden cursor-pointer"
          aria-label="Open sidebar navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 sm:px-2.5 py-1 rounded-md border border-amber-200 truncate">
          Admin Portal
        </span>
        <span className="text-xs text-slate-400 hidden md:inline truncate">
          Hunky Dory Special Children Platform
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {/* User Card */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
            {initials || "HD"}
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-slate-800 leading-none">{userName}</p>
            <div className="flex items-center justify-end gap-1.5 mt-1">
              <span
                className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.bg}`}
              >
                {badge.icon}
                <span>{badge.label}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Quick Sign Out */}
        <button
          onClick={handleLogout}
          type="button"
          title="Sign Out"
          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
