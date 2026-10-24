"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Inbox,
  CalendarCheck,
  FileSpreadsheet,
  GraduationCap,
  Sparkles,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Stethoscope,
  UserCheck,
  Globe,
  X
} from "lucide-react";
import { Role } from "@/lib/types";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  allowedRoles: Role[];
}

interface AdminSidebarProps {
  onClose?: () => void;
}

export default function AdminSidebar({ onClose }: AdminSidebarProps = {}) {
  const pathname = usePathname();
  const router = useRouter();
  const [userRole, setUserRole] = useState<Role>("ADMIN");
  const [userName, setUserName] = useState<string>("Staff Member");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUserRole(data.user.role);
          setUserName(data.user.name);
        }
      })
      .catch(() => {});
  }, []);

  const navItems: NavItem[] = [
    {
      name: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      allowedRoles: ["ADMIN", "SPECIALIST", "STAFF"]
    },
    {
      name: "Students",
      href: "/admin/students",
      icon: Users,
      allowedRoles: ["ADMIN", "SPECIALIST", "STAFF"]
    },
    {
      name: "Enquiries",
      href: "/admin/enquiries",
      icon: Inbox,
      allowedRoles: ["ADMIN", "STAFF", "SPECIALIST"]
    },
    {
      name: "Appointments",
      href: "/admin/appointments",
      icon: CalendarCheck,
      allowedRoles: ["ADMIN", "STAFF", "SPECIALIST"]
    },
    {
      name: "Assessments & Reports",
      href: "/admin/assessments",
      icon: FileSpreadsheet,
      allowedRoles: ["ADMIN", "SPECIALIST"] // Restricted from STAFF
    },
    {
      name: "Programs",
      href: "/admin/programs",
      icon: GraduationCap,
      allowedRoles: ["ADMIN", "SPECIALIST", "STAFF"]
    },
    {
      name: "SEO Management",
      href: "/admin/seo",
      icon: Globe,
      allowedRoles: ["ADMIN", "SPECIALIST", "STAFF"]
    }
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  const visibleNavItems = navItems.filter((item) =>
    item.allowedRoles.includes(userRole)
  );

  return (
    <aside className="w-full h-full bg-slate-900 text-slate-300 flex flex-col justify-between overflow-y-auto min-h-screen">
      <div>
        {/* Brand */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" onClick={onClose} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-400 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                HUNKY DORY
              </span>
              <p className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                Staff & Admin
              </p>
            </div>
          </Link>

          {/* Close button for mobile drawer */}
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden cursor-pointer transition-colors"
            aria-label="Close sidebar drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Role Tag */}
        <div className="px-4 pt-4">
          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              {userRole === "ADMIN" ? (
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              ) : userRole === "SPECIALIST" ? (
                <Stethoscope className="w-4 h-4 text-emerald-400" />
              ) : (
                <UserCheck className="w-4 h-4 text-sky-400" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{userName}</p>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Role: <span className="text-amber-400">{userRole}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5" aria-label="Admin Navigation">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-amber-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer controls */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          href="/"
          target="_blank"
          onClick={onClose}
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View Public Website</span>
        </Link>

        <button
          onClick={handleLogout}
          type="button"
          className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
